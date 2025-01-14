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


export class UploadCustomBlockRequest {
    'tar':{ fieldname: string, originalname: string, encoding: string, mimetype: string, buffer: Buffer, size: number }[];
    'type': UploadCustomBlockRequestTypeEnum;
    'blockId': number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "tar",
            "baseName": "tar",
            "type": "RequestFile"
        },
        {
            "name": "type",
            "baseName": "type",
            "type": "UploadCustomBlockRequestTypeEnum"
        },
        {
            "name": "blockId",
            "baseName": "blockId",
            "type": "number"
        }    ];

    static getAttributeTypeMap() {
        return UploadCustomBlockRequest.attributeTypeMap;
    }
}


export type UploadCustomBlockRequestTypeEnum = 'transform' | 'deploy' | 'dsp';
export const UploadCustomBlockRequestTypeEnumValues: string[] = ['transform', 'deploy', 'dsp'];
