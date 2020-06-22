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


export class CreateDeviceRequest {
    /**
    * Globally unique device identifier (e.g. MAC address)
    */
    'deviceId': string;
    /**
    * Device type, for example the exact model of the device. Should be the same for all similar devices
    */
    'deviceType': string;
    /**
    * Whether to throw an error when this device already exists.
    */
    'ifNotExists': boolean;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "deviceId",
            "baseName": "deviceId",
            "type": "string"
        },
        {
            "name": "deviceType",
            "baseName": "deviceType",
            "type": "string"
        },
        {
            "name": "ifNotExists",
            "baseName": "ifNotExists",
            "type": "boolean"
        }    ];

    static getAttributeTypeMap() {
        return CreateDeviceRequest.attributeTypeMap;
    }
}
