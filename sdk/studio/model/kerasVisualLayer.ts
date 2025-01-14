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

import { KerasVisualLayerTunableParams } from './kerasVisualLayerTunableParams';

export class KerasVisualLayer {
    'type': KerasVisualLayerTypeEnum;
    /**
    * Number of neurons or filters in this layer (only for dense, conv1d, conv2d) or in the final conv2d layer (only for transfer layers)
    */
    'neurons'?: number;
    /**
    * Kernel size for the convolutional layers (only for conv1d, conv2d)
    */
    'kernelSize'?: number;
    /**
    * Fraction of input units to drop (only for dropout) or in the final layer dropout (only for transfer layers)
    */
    'dropoutRate'?: number;
    /**
    * Number of columns for the reshape operation (only for reshape)
    */
    'columns'?: number;
    /**
    * Number of convolutional layers before the pooling layer (only for conv1d, conv2d)
    */
    'stack'?: number;
    'enabled'?: boolean;
    'tunableParams'?: Array<KerasVisualLayerTunableParams>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "type",
            "baseName": "type",
            "type": "KerasVisualLayerTypeEnum"
        },
        {
            "name": "neurons",
            "baseName": "neurons",
            "type": "number"
        },
        {
            "name": "kernelSize",
            "baseName": "kernelSize",
            "type": "number"
        },
        {
            "name": "dropoutRate",
            "baseName": "dropoutRate",
            "type": "number"
        },
        {
            "name": "columns",
            "baseName": "columns",
            "type": "number"
        },
        {
            "name": "stack",
            "baseName": "stack",
            "type": "number"
        },
        {
            "name": "enabled",
            "baseName": "enabled",
            "type": "boolean"
        },
        {
            "name": "tunableParams",
            "baseName": "tunableParams",
            "type": "Array<KerasVisualLayerTunableParams>"
        }    ];

    static getAttributeTypeMap() {
        return KerasVisualLayer.attributeTypeMap;
    }
}


export type KerasVisualLayerTypeEnum = 'dense' | 'conv1d' | 'conv2d' | 'reshape' | 'flatten' | 'dropout' | 'batchNormalization' | 'transfer_mobilenetv2_a35' | 'transfer_mobilenetv2_a1' | 'transfer_mobilenetv2_a05' | 'transfer_mobilenetv2_160_a1' | 'transfer_mobilenetv2_160_a75' | 'transfer_mobilenetv2_160_a5' | 'transfer_mobilenetv2_160_a35' | 'transfer_mobilenetv1_a25_d100' | 'transfer_mobilenetv1_a2_d100' | 'transfer_mobilenetv1_a1_d100' | 'transfer_kws_mobilenetv1_a1_d100' | 'transfer_kws_mobilenetv2_a35_d100' | 'object_ssd_mobilenet_v2_fpnlite_320x320' | 'fomo_mobilenet_v2_a01';
export const KerasVisualLayerTypeEnumValues: string[] = ['dense', 'conv1d', 'conv2d', 'reshape', 'flatten', 'dropout', 'batchNormalization', 'transfer_mobilenetv2_a35', 'transfer_mobilenetv2_a1', 'transfer_mobilenetv2_a05', 'transfer_mobilenetv2_160_a1', 'transfer_mobilenetv2_160_a75', 'transfer_mobilenetv2_160_a5', 'transfer_mobilenetv2_160_a35', 'transfer_mobilenetv1_a25_d100', 'transfer_mobilenetv1_a2_d100', 'transfer_mobilenetv1_a1_d100', 'transfer_kws_mobilenetv1_a1_d100', 'transfer_kws_mobilenetv2_a35_d100', 'object_ssd_mobilenet_v2_fpnlite_320x320', 'fomo_mobilenet_v2_a01'];
