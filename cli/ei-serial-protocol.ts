import { SerialConnector } from "./serial-connector";
import Path from 'path';
import { EventEmitter } from 'tsee';

const CON_PREFIX = '\x1b[34m[SER]\x1b[0m';

export enum EiSerialWifiSecurity {
    EI_SECURITY_NONE         = 0x0,      /*!< open access point */
    EI_SECURITY_WEP          = 0x1,      /*!< phrase conforms to WEP */
    EI_SECURITY_WPA          = 0x2,      /*!< phrase conforms to WPA */
    EI_SECURITY_WPA2         = 0x3,      /*!< phrase conforms to WPA2 */
    EI_SECURITY_WPA_WPA2     = 0x4,      /*!< phrase conforms to WPA/WPA2 */
    EI_SECURITY_PAP          = 0x5,      /*!< phrase conforms to PPP authentication context */
    EI_SECURITY_CHAP         = 0x6,      /*!< phrase conforms to PPP authentication context */
    EI_SECURITY_EAP_TLS      = 0x7,      /*!< phrase conforms to EAP-TLS */
    EI_SECURITY_PEAP         = 0x8,      /*!< phrase conforms to PEAP */
    EI_SECURITY_UNKNOWN      = 0xFF,     /*!< unknown/unsupported security in scan results */
}

export interface EiSerialDeviceConfig {
    info: {
        id: string;
        type: string;
        atCommandVersion: {
            major: number;
            minor: number;
            patch: number;
        };
    };
    sensors: {
        name: string;
        maxSampleLengthS: number;
        frequencies: number[];
    }[];
    wifi: {
        present: boolean;
        ssid: string;
        password: string;
        security: EiSerialWifiSecurity;
        connected: boolean;
    };
    sampling: {
        label: string;
        interval: number;
        length: number;
        hmacKey: string;
    };
    upload: {
        apiKey: string;
        host: string;
        path: string;
    };
    management: {
        url: string;
        connected: boolean;
        lastError: string;
    };
}

export interface EiSerialWifiNetwork {
    ssid: string;
    security: EiSerialWifiSecurity;
    securityString: string;
    rssi: number;
    line: string;
}

export type EiStartSamplingResponse = EventEmitter<{
    samplingStarted: () => void,
    processing: () => void,
    uploading: () => void,
    readingFromDevice: () => void,
    done: (ev: EiSerialDone) => void,
    error: (ex: string) => void
}>;

export interface EiSerialDoneFs { filename: string; onDeviceFileName: string; file?: Buffer; }
export interface EiSerialDoneBuffer {
    filename: string;
    onDeviceFileName: string;
    file: Buffer;
    label: string;
}

export type EiSerialDone = EiSerialDoneFs | EiSerialDoneBuffer;

export default class EiSerialProtocol {
    private _serial: SerialConnector;
    private _config: EiSerialDeviceConfig | undefined;

    /**
     *
     * @param serial An instance of the serial connector
     */
    constructor(serial: SerialConnector) {
        this._serial = serial;
    }

    async onConnected() {
        // tslint:disable-next-line:no-floating-promises
        this._serial.write(Buffer.from('b\r', 'ascii'));

        await this.waitForSerialSequence(Buffer.from([ 0x3e, 0x20 ]), 5000);
    }

    async clearConfig() {
        await this.execCommand('AT+CLEARCONFIG', 10000);
    }

    async getConfig() {
        let data = await this.execCommand('AT+CONFIG?');

        let config = <EiSerialDeviceConfig>{ info: { }, wifi: { }, sampling: { }, upload: { }, management: { } };
        config.sensors = [];
        config.info.atCommandVersion = { major: 1, minor: 0, patch: 0 };
        config.wifi.present = true;

        let section: 'info' | 'sensors' | 'wifi' | 'sampling' | 'upload' | 'management' | undefined;

        for (let line of data.split('\n').map(l => l.trim()).filter(l => !!l)) {
            if (line.indexOf('= Device info =') > -1) {
                section = 'info';
                continue;
            }
            if (line.indexOf('= Sensors =') > -1) {
                section = 'sensors';
                continue;
            }
            if (line.indexOf('= WIFI =') > -1) {
                section = 'wifi';
                continue;
            }
            if (line.indexOf('= Sampling parameters =') > -1) {
                section = 'sampling';
                continue;
            }
            if (line.indexOf('= Upload settings =') > -1) {
                section = 'upload';
                continue;
            }
            if (line.indexOf('= Remote management =') > -1) {
                section = 'management';
                continue;
            }
            if (!section) {
                continue;
            }

            let [ key, ...valueArr ] = line.split(':').map(v => v.trim());
            let value = valueArr.join(':');
            key = key.toLowerCase();

            if (section === 'info') {
                if (key === 'id') {
                    config.info.id = value; continue;
                }
                if (key === 'type') {
                    config.info.type = value; continue;
                }
                if (key === 'at version') {
                    let [ major, minor, patch ] = value.split('.').map(n => Number(n));

                    config.info.atCommandVersion = { major, minor, patch }; continue;
                }
            }
            if (section === 'sensors') {
                // there are two formats here... either the new format:
                // Name: Built-in accelerometer, Max sample length: 300s, Frequencies: [62.50Hz, 100.00Hz]
                // or the old format which only lists the name...

                let newFormat = line.match(/^Name\:\s?([^,]+),\s?Max sample length\:\s?([^,]+)s\s?,\s?Frequencies\:\s?\[(.*)\]\s?$/);
                if (newFormat && newFormat.length === 4) {
                    let [ _, name, maxSampleLengthS, frequencies ] = newFormat;
                    config.sensors.push({
                        name: name,
                        maxSampleLengthS: Number(maxSampleLengthS),
                        frequencies: frequencies.split(',').map(f => f.replace('Hz', '').trim()).map(f => Number(f))
                    });
                }
                else {
                    if (line.trim() === 'Built-in accelerometer') {
                        config.sensors.push({
                            name: line.trim(),
                            maxSampleLengthS: 5 * 60,
                            frequencies: [ 62.5, 100 ]
                        });
                    }
                    else if (line.trim() === 'Built-in microphone') {
                        config.sensors.push({
                            name: line.trim(),
                            maxSampleLengthS: 1 * 60,
                            frequencies: [ 16000 ]
                        });
                    }
                    else {
                        throw new Error('Cannot parse sensor line: ' + line);
                    }
                }
                continue;
            }
            if (section === 'wifi') {
                if (key === 'present') {
                    config.wifi.present = value === '1' ? true : false; continue;
                }
                if (key === 'ssid') {
                    config.wifi.ssid = value; continue;
                }
                if (key === 'password') {
                    config.wifi.password = value; continue;
                }
                if (key === 'security') {
                    config.wifi.security = Number(value); continue;
                }
                if (key === 'connected') {
                    config.wifi.connected = value === '1'; continue;
                }
                if (key === 'mac') {
                    continue;
                }
            }
            if (section === 'sampling') {
                if (key === 'label') {
                    config.sampling.label = value; continue;
                }
                if (key === 'interval') {
                    config.sampling.interval = Number(value.replace(' ms.', '')); continue;
                }
                if (key === 'length') {
                    config.sampling.length = Number(value.replace(' ms.', '')); continue;
                }
                if (key === 'hmac key') {
                    config.sampling.hmacKey = value; continue;
                }
            }
            if (section === 'upload') {
                if (key === 'api key') {
                    config.upload.apiKey = value; continue;
                }
                if (key === 'host') {
                    config.upload.host = value; continue;
                }
                if (key === 'path') {
                    config.upload.path = value; continue;
                }
            }
            if (section === 'management') {
                if (key === 'url') {
                    config.management.url = value; continue;
                }
                if (key === 'connected') {
                    config.management.connected = value === '1'; continue;
                }
                if (key === 'last error') {
                    config.management.lastError = value; continue;
                }
            }

            console.warn(CON_PREFIX, 'Unhandled configuration option', section, key, value);
        }

        this._config = config;

        return config;
    }

    async setUploadSettings(apiKey: string, url: string) {
        let res = await this.execCommand('AT+UPLOADSETTINGS=' + apiKey + ',' + url);
        // console.log(CON_PREFIX, 'upload res', Buffer.from(res, 'utf8').toString('hex'));
        if (res.indexOf('OK') === -1) {
            throw new Error('Failed to set upload settings: ' + res);
        }
    }

    async setUploadHost(host: string) {
        let res = await this.execCommand('AT+UPLOADHOST=' + host);
        // console.log(CON_PREFIX, 'upload res', res);
        if (res.indexOf('OK') === -1) {
            throw new Error('Failed to set upload host: ' + res);
        }
    }

    async setSampleSettings(label: string, interval: number, length: number, hmacKey: string) {
        let res = await this.execCommand(`AT+SAMPLESETTINGS=${label},${interval},${length},${hmacKey}`);
        if (res.indexOf('OK') === -1) {
            throw new Error('Failed to set sample settings: ' + res);
        }

        if (this._config) {
            this._config.sampling.label = label;
            this._config.sampling.interval = interval;
            this._config.sampling.length = length;
            this._config.sampling.hmacKey = hmacKey;
        }
    }

    async setWifi(ssid: string, password: string, security: EiSerialWifiSecurity) {
        let res = await this.execCommand(`AT+WIFI=${ssid},${password},${Number(security)}`, 10000);
        // console.log(CON_PREFIX, 'setWifi reply', res);
        if (res.indexOf('OK') === -1) {
            throw new Error('Failed to set sample settings: ' + res);
        }
    }

    async scanWifi() {
        let ret: EiSerialWifiNetwork[] = [];

        let res = await this.execCommand(`AT+SCANWIFI`, 10000);

        for (let line of res.split('\n').map(l => l.trim()).filter(l => !!l)) {
            // this would be a good candidate for a unit test
            let [ none, ssid, security, rssi ] = line.split(/(?:(?:SSID|Security|RSSI)\:)/)
                .map(l => l.trim()).map(l => l.replace(/[,\:]$/, ''));

            ret.push({
                ssid: ssid,
                security: Number((security.match(/\((\d+)\)/) || [])[1]),
                securityString: security.split(' ')[0],
                rssi: Number(rssi.replace(' dBm', '')),
                line: line
            });
        }

        return ret;
    }

    async setRemoteManagement(url: string) {
        let res = await this.execCommand(`AT+MGMTSETTINGS=${url}`);
        if (res.indexOf('OK') === -1) {
            throw new Error('Failed to set remote management settings: ' + res);
        }
    }

    startSampling(sensor: string | undefined, length: number): EiStartSamplingResponse {
        let cmd = sensor ? 'AT+SAMPLESTART=' + sensor : 'AT+SAMPLESTART';

        let ee = new EventEmitter<{
            samplingStarted: () => void,
            processing: () => void,
            uploading: () => void,
            readingFromDevice: () => void,
            done: (ev: EiSerialDone) => void,
            error: (ex: string) => void
        }>();

        let allListeners = [
            this.getSerialSequenceCallback('Sampling...', length * 3, b => {
                console.log(CON_PREFIX, 'Sampling started');
                ee.emit('samplingStarted');
            }),
            this.getSerialSequenceCallback('Done sampling', length * 3, b => {
                console.log(CON_PREFIX, 'Sampling done');
            }),
            this.getSerialSequenceCallback('Processing...', length * 3, b => {
                console.log(CON_PREFIX, 'Processing started');
                ee.emit('processing');
            }),
            this.getSerialSequenceCallback('Done processing', length * 3, b => {
                console.log(CON_PREFIX, 'Processing done');
            }),
            this.getSerialSequenceCallback('Uploading...', length * 3, b => {
                console.log(CON_PREFIX, 'Uploading started');
                ee.emit('uploading');
            })
        ];

        // tslint:disable-next-line: no-floating-promises
        (async () => {
            try {
                let res = await this.execCommand(cmd, length * 10);

                // console.log('after upload res is', res);

                let fileNameLine = res.split('\n').filter(t => t.indexOf('File name:') > -1)[0];
                if (!fileNameLine) {
                    console.log(CON_PREFIX, 'Could not find file name line in sample response', res);
                    throw new Error('Could not find file name line in sample response ' + res);
                }

                let filename = fileNameLine.split(':').map(s => s.trim())[1];

                // not connected, well, then we'll do it for you
                if (res.indexOf('Not uploading file') > -1) {
                    if (res.indexOf('Used buffer') > -1) {
                        let props = res.match(/from=(\d+).*?to=(\d+).*?/);
                        if (!props) {
                            throw new Error('Device used buffer, but could not parse buffer info ' + res);
                        }

                        if (!this._config) throw new Error('No last known configuration');

                        let [
                            line,
                            from,
                            to,
                        ] = props;

                        ee.emit('readingFromDevice');

                        console.log(CON_PREFIX, 'Device not connected to WiFi directly, reading from buffer (bytes ' +
                            from + ' - ' + to + ')...');

                        let rfa = await this.execCommand('AT+READBUFFER=' + from + ',' + to, length * 10, true);

                        console.log(CON_PREFIX, 'Reading from buffer OK');

                        let rf = Buffer.from(rfa, 'base64');
                        console.log(CON_PREFIX, 'File is', rf.length, 'bytes after decoding');
                        ee.emit('done', {
                            filename: Path.basename(filename),
                            onDeviceFileName: filename,
                            file: rf,
                            label: this._config.sampling.label,
                        });
                    }
                    else {
                        ee.emit('readingFromDevice');

                        console.log(CON_PREFIX, 'Device not connected to WiFi directly, reading ' + filename + '...');

                        let rfa = await this.execCommand('AT+READFILE=' + filename, length * 10, true);

                        console.log(CON_PREFIX, 'Reading ' + filename + ' OK');

                        if (!this._config) throw new Error('No last known configuration');

                        let rf: Buffer;

                        if (this._config.info.atCommandVersion.major === 1 &&
                            this._config.info.atCommandVersion.minor < 2) {
                            rf = Buffer.from(rfa, 'hex');
                        }
                        else {
                            rf = Buffer.from(rfa, 'base64');
                        }
                        console.log(CON_PREFIX, 'File is', rf.length, 'bytes after decoding');
                        ee.emit('done', { filename: Path.basename(filename), onDeviceFileName: filename, file: rf });
                    }
                }
                else {
                    ee.emit('done', { filename: Path.basename(filename), onDeviceFileName: filename });
                }
            }
            catch (ex) {
                ee.emit('error', ex.message || ex.toString());
            }
            finally {
                for (let l of allListeners) {
                    l.cancelListener();
                }
            }
        })();

        return ee;
    }

    async unlink(file: string) {
        let res = await this.execCommand(`AT+UNLINKFILE=${file}`);
        if (res.trim() !== '') {
            throw new Error('Failed to unlink file: ' + res);
        }
    }

    private sleep(ms: number) {
        return new Promise((res) => setTimeout(res, ms));
    }

    private async execCommand(command: string, timeout: number = 1000, logProgress: boolean = false) {
        command = command + '\r';

        // split it up a bit for pacing
        for (let ix = 0; ix < command.length; ix += 5) {
            // console.log(CON_PREFIX, 'writing', command.substr(ix, 5));
            if (ix !== 0) {
                await this.sleep(20);
            }

            await this._serial.write(Buffer.from(command.substr(ix, 5), 'ascii'));
        }

        let data = await this.waitForSerialSequence(Buffer.from([ 0x3e, 0x20 ]), timeout, logProgress);
        data = this.parseSerialResponse(data);

        if (data.toString('ascii').trim().indexOf('Not a valid AT command') > -1) {
            throw new Error('Error when communicating with device: ' + data.toString('ascii').trim());
        }

        // console.log(CON_PREFIX, 'response from device', /*data.length, data.toString('hex'),*/
        //     data.toString('ascii').trim());

        return data.toString('ascii').trim();
    }

    /**
     * Wait until a certain sequence is seen on the serial port
     * @param seq Buffer with the exact sequence
     * @param timeout Timeout in milliseconds
     */
    private waitForSerialSequence(seq: Buffer, timeout: number, logProgress: boolean = false): Promise<Buffer> {
        let total = 0;
        let nextReport = 10000;

        return new Promise((res, rej) => {
            let buffer = Buffer.from([]);

            let to = setTimeout(() => {
                this._serial.off('data', fn);
                rej('Timeout');
            }, timeout);

            let fn = (data: Buffer) => {
                if (logProgress) {
                    total += data.length;
                    if (total > nextReport) {
                        console.log(CON_PREFIX, 'Received', total, 'bytes');
                        nextReport += 10000;
                    }
                }
                buffer = Buffer.concat([ buffer, data ]);
                if (buffer.indexOf(seq) !== -1) {
                    clearTimeout(to);
                    this._serial.off('data', fn);
                    res(buffer);
                }
            };
            this._serial.on('data', fn);
        });
    }

    /**
     * Wait until a certain sequence is seen on the serial port
     * @param seq Buffer with the exact sequence
     * @param timeout Timeout in milliseconds
     */
    private getSerialSequenceCallback(seqStr: string, timeout: number, callback: (buffer: Buffer) => void) {
        let seq = Buffer.from(seqStr, 'ascii');
        let buffer = Buffer.from([]);

        let to = setTimeout(() => {
            this._serial.off('data', fn);
        }, timeout);

        let fn = (data: Buffer) => {
            buffer = Buffer.concat([ buffer, data ]);
            if (buffer.indexOf(seq) !== -1) {
                clearTimeout(to);
                this._serial.off('data', fn);
                callback(buffer);
            }
        };
        this._serial.on('data', fn);

        return {
            cancelListener: () => this._serial.off('data', fn)
        };
    }

    /**
     * Take the serial response and grab the actual response from the device
     * @param data
     */
    private parseSerialResponse(data: Buffer) {
        // some devices only print \n, not \r\n
        let b = [];
        if (data[0] === 0xa) {
            b.push(0xd);
            b.push(0xa);
        }
        else {
            b.push(data[0]);
        }

        for (let ix = 1; ix < data.length; ix++) {
            if (data[ix] === 0xa && data[ix - 1] !== 0xd) {
                b.push(0xd);
                b.push(0xa);
            }
            else {
                b.push(data[ix]);
            }
        }

        let bdata = Buffer.from(b);

        // skip first and last line
        let first = bdata.indexOf(Buffer.from([ 0x0d, 0x0a ]));
        let last = bdata.lastIndexOf(Buffer.from([ 0x0d, 0x0a ]));

        if (first === last) {
            return bdata.slice(first);
        }
        else {
            return bdata.slice(first, last);
        }
    }
}