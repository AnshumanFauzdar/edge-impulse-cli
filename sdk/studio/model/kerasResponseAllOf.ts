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

import { AugmentationPolicyImageEnum } from './augmentationPolicyImageEnum';
import { AugmentationPolicySpectrogram } from './augmentationPolicySpectrogram';
import { DependencyData } from './dependencyData';
import { KerasModelTypeEnum } from './kerasModelTypeEnum';
import { KerasVisualLayer } from './kerasVisualLayer';

export class KerasResponseAllOf {
    'dependencies': DependencyData;
    /**
    * Whether the block is trained
    */
    'trained': boolean;
    'name': string;
    /**
    * The type of Keras block (keras, keras-transfer-image, keras-regression). Each behaves differently.
    */
    'type'?: KerasResponseAllOfTypeEnum;
    /**
    * The Keras script. This script might be empty if the mode is visual.
    */
    'script': string;
    /**
    * Minimum confidence rating required for the neural network. Scores below this confidence are tagged as uncertain.
    */
    'minimumConfidenceRating': number;
    'selectedModelType': KerasModelTypeEnum;
    /**
    * The mode (visual or expert) to use for editing this network.
    */
    'mode': KerasResponseAllOfModeEnum;
    /**
    * The visual layers (if in visual mode) for the neural network. This will be an empty array when in expert mode.
    */
    'visualLayers': Array<KerasVisualLayer>;
    /**
    * Number of training cycles. If in expert mode this will be 0.
    */
    'trainingCycles': number;
    /**
    * Learning rate (between 0 and 1). If in expert mode this will be 0.
    */
    'learningRate': number;
    'augmentationPolicyImage': AugmentationPolicyImageEnum;
    'augmentationPolicySpectrogram'?: AugmentationPolicySpectrogram;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "dependencies",
            "baseName": "dependencies",
            "type": "DependencyData"
        },
        {
            "name": "trained",
            "baseName": "trained",
            "type": "boolean"
        },
        {
            "name": "name",
            "baseName": "name",
            "type": "string"
        },
        {
            "name": "type",
            "baseName": "type",
            "type": "KerasResponseAllOfTypeEnum"
        },
        {
            "name": "script",
            "baseName": "script",
            "type": "string"
        },
        {
            "name": "minimumConfidenceRating",
            "baseName": "minimumConfidenceRating",
            "type": "number"
        },
        {
            "name": "selectedModelType",
            "baseName": "selectedModelType",
            "type": "KerasModelTypeEnum"
        },
        {
            "name": "mode",
            "baseName": "mode",
            "type": "KerasResponseAllOfModeEnum"
        },
        {
            "name": "visualLayers",
            "baseName": "visualLayers",
            "type": "Array<KerasVisualLayer>"
        },
        {
            "name": "trainingCycles",
            "baseName": "trainingCycles",
            "type": "number"
        },
        {
            "name": "learningRate",
            "baseName": "learningRate",
            "type": "number"
        },
        {
            "name": "augmentationPolicyImage",
            "baseName": "augmentationPolicyImage",
            "type": "AugmentationPolicyImageEnum"
        },
        {
            "name": "augmentationPolicySpectrogram",
            "baseName": "augmentationPolicySpectrogram",
            "type": "AugmentationPolicySpectrogram"
        }    ];

    static getAttributeTypeMap() {
        return KerasResponseAllOf.attributeTypeMap;
    }
}


export type KerasResponseAllOfTypeEnum = 'keras' | 'keras-transfer-image' | 'keras-regression';
export const KerasResponseAllOfTypeEnumValues: string[] = ['keras', 'keras-transfer-image', 'keras-regression'];

export type KerasResponseAllOfModeEnum = 'visual' | 'expert';
export const KerasResponseAllOfModeEnumValues: string[] = ['visual', 'expert'];
