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

import { ApplicationTestingFalsePositive } from './applicationTestingFalsePositive';

export class ApplicationTestingParameterSetStats {
    'label': string;
    'truePositives': number;
    'falsePositives': number;
    'falseNegatives': number;
    'trueNegatives': number;
    'falsePositiveRate': number;
    'falseNegativeRate': number;
    /**
    * The details of every false positive detection.
    */
    'falsePositiveDetails'?: Array<ApplicationTestingFalsePositive>;
    /**
    * The times in ms at which false negatives occurred. These correspond to specific items in the ground truth.
    */
    'falseNegativeTimes': Array<number>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "label",
            "baseName": "label",
            "type": "string"
        },
        {
            "name": "truePositives",
            "baseName": "truePositives",
            "type": "number"
        },
        {
            "name": "falsePositives",
            "baseName": "falsePositives",
            "type": "number"
        },
        {
            "name": "falseNegatives",
            "baseName": "falseNegatives",
            "type": "number"
        },
        {
            "name": "trueNegatives",
            "baseName": "trueNegatives",
            "type": "number"
        },
        {
            "name": "falsePositiveRate",
            "baseName": "falsePositiveRate",
            "type": "number"
        },
        {
            "name": "falseNegativeRate",
            "baseName": "falseNegativeRate",
            "type": "number"
        },
        {
            "name": "falsePositiveDetails",
            "baseName": "falsePositiveDetails",
            "type": "Array<ApplicationTestingFalsePositive>"
        },
        {
            "name": "falseNegativeTimes",
            "baseName": "falseNegativeTimes",
            "type": "Array<number>"
        }    ];

    static getAttributeTypeMap() {
        return ApplicationTestingParameterSetStats.attributeTypeMap;
    }
}

