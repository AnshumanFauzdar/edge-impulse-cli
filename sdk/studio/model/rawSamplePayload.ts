/**
 * Edge Impulse API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { Sensor } from './sensor';

/**
* Sensor readings and metadata
*/
export class RawSamplePayload {
    /**
    * Unique identifier for this device. **Only** set this when the device has a globally unique identifier (e.g. MAC address).
    */
    'deviceName'?: string;
    /**
    * Device type, for example the exact model of the device. Should be the same for all similar devices.
    */
    'deviceType': string;
    /**
    * The frequency of the data in this file (in milliseconds). E.g. for 100Hz fill in `10` (new data every 10 ms.). You can use a float here if you need the precision.
    */
    'intervalMs': number;
    /**
    * Array with sensor axes
    */
    'sensors': Array<Sensor>;
    /**
    * Array of sensor values. One array item per interval, and as many items in this array as there are sensor axes. This type is returned if there are multiple axes. 
    */
    'values': Array<Array<number>>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "deviceName",
            "baseName": "device_name",
            "type": "string"
        },
        {
            "name": "deviceType",
            "baseName": "device_type",
            "type": "string"
        },
        {
            "name": "intervalMs",
            "baseName": "interval_ms",
            "type": "number"
        },
        {
            "name": "sensors",
            "baseName": "sensors",
            "type": "Array<Sensor>"
        },
        {
            "name": "values",
            "baseName": "values",
            "type": "Array<Array<number>>"
        }    ];

    static getAttributeTypeMap() {
        return RawSamplePayload.attributeTypeMap;
    }
}
