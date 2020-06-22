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


export class CreateProjectRequest {
    /**
    * The name of the first project.
    */
    'projectName': string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "projectName",
            "baseName": "projectName",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return CreateProjectRequest.attributeTypeMap;
    }
}
