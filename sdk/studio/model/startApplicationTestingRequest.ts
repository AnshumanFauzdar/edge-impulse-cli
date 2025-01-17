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


export class StartApplicationTestingRequest {
    /**
    * The label used to signify background noise in the impulse
    */
    'backgroundNoiseLabel': string;
    /**
    * Any other labels that should be considered equivalent to background noise
    */
    'otherNoiseLabels'?: Array<string>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "backgroundNoiseLabel",
            "baseName": "backgroundNoiseLabel",
            "type": "string"
        },
        {
            "name": "otherNoiseLabels",
            "baseName": "otherNoiseLabels",
            "type": "Array<string>"
        }    ];

    static getAttributeTypeMap() {
        return StartApplicationTestingRequest.attributeTypeMap;
    }
}

