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

import localVarRequest = require('request');
import http = require('http');

/* tslint:disable:no-unused-locals */
import { AddOrganizationDeployBlockResponse } from '../model/addOrganizationDeployBlockResponse';
import { AddOrganizationTransformationBlockRequest } from '../model/addOrganizationTransformationBlockRequest';
import { AddOrganizationTransformationBlockResponse } from '../model/addOrganizationTransformationBlockResponse';
import { GenericApiResponse } from '../model/genericApiResponse';
import { ListOrganizationDeployBlocksResponse } from '../model/listOrganizationDeployBlocksResponse';
import { ListOrganizationTransformationBlocksResponse } from '../model/listOrganizationTransformationBlocksResponse';
import { UpdateOrganizationTransformationBlockRequest } from '../model/updateOrganizationTransformationBlockRequest';

import { ObjectSerializer, Authentication, VoidAuth } from '../model/models';
import { HttpBasicAuth, ApiKeyAuth, OAuth } from '../model/models';

import { HttpError, RequestFile } from './apis';

let defaultBasePath = 'https://studio.edgeimpulse.com/v1';

// ===============================================
// This file is autogenerated - Please do not edit
// ===============================================

export enum OrganizationBlocksApiApiKeys {
    ApiKeyAuthentication,
    JWTAuthentication,
}

export class OrganizationBlocksApi {
    protected _basePath = defaultBasePath;
    protected defaultHeaders : any = {};
    protected _useQuerystring : boolean = false;

    protected authentications = {
        'default': <Authentication>new VoidAuth(),
        'ApiKeyAuthentication': new ApiKeyAuth('header', 'x-api-key'),
        'JWTAuthentication': new ApiKeyAuth('cookie', 'jwt'),
    }

    constructor(basePath?: string);
    constructor(basePathOrUsername: string, password?: string, basePath?: string) {
        if (password) {
            if (basePath) {
                this.basePath = basePath;
            }
        } else {
            if (basePathOrUsername) {
                this.basePath = basePathOrUsername
            }
        }
    }

    set useQuerystring(value: boolean) {
        this._useQuerystring = value;
    }

    set basePath(basePath: string) {
        this._basePath = basePath;
    }

    get basePath() {
        return this._basePath;
    }

    public setDefaultAuthentication(auth: Authentication) {
        this.authentications.default = auth;
    }

    public setApiKey(key: OrganizationBlocksApiApiKeys, value: string) {
        (this.authentications as any)[OrganizationBlocksApiApiKeys[key]].apiKey = value;
    }

    /**
     * Adds a deploy block.
     * @summary Add deploy block
     * @param organizationId Organization ID
     * @param name 
     * @param dockerContainer 
     * @param description 
     * @param cliArguments 
     * @param requestsCpu 
     * @param requestsMemory 
     * @param limitsCpu 
     * @param limitsMemory 
     * @param photo 
     * @param integrateUrl 
     */
    public async addOrganizationDeployBlock (organizationId: number, name: string, dockerContainer: string, description: string, cliArguments: string, requestsCpu?: number, requestsMemory?: number, limitsCpu?: number, limitsMemory?: number, photo?: RequestFile, integrateUrl?: string, options: {headers: {[name: string]: string}} = {headers: {}}) : Promise<{ response: http.IncomingMessage; body: AddOrganizationDeployBlockResponse;  }> {
        const localVarPath = this.basePath + '/api/organizations/{organizationId}/deploy'
            .replace('{' + 'organizationId' + '}', encodeURIComponent(String(organizationId)));
        let localVarQueryParameters: any = {};
        let localVarHeaderParams: any = (<any>Object).assign({}, this.defaultHeaders);
        const produces = ['application/json'];
        // give precedence to 'application/json'
        if (produces.indexOf('application/json') >= 0) {
            localVarHeaderParams.Accept = 'application/json';
        } else {
            localVarHeaderParams.Accept = produces.join(',');
        }
        let localVarFormParams: any = {};

        // verify required parameter 'organizationId' is not null or undefined
        if (organizationId === null || organizationId === undefined) {
            throw new Error('Required parameter organizationId was null or undefined when calling addOrganizationDeployBlock.');
        }

        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new Error('Required parameter name was null or undefined when calling addOrganizationDeployBlock.');
        }

        // verify required parameter 'dockerContainer' is not null or undefined
        if (dockerContainer === null || dockerContainer === undefined) {
            throw new Error('Required parameter dockerContainer was null or undefined when calling addOrganizationDeployBlock.');
        }

        // verify required parameter 'description' is not null or undefined
        if (description === null || description === undefined) {
            throw new Error('Required parameter description was null or undefined when calling addOrganizationDeployBlock.');
        }

        // verify required parameter 'cliArguments' is not null or undefined
        if (cliArguments === null || cliArguments === undefined) {
            throw new Error('Required parameter cliArguments was null or undefined when calling addOrganizationDeployBlock.');
        }

        (<any>Object).assign(localVarHeaderParams, options.headers);

        let localVarUseFormData = false;

        if (name !== undefined) {
            localVarFormParams['name'] = ObjectSerializer.serialize(name, "string");
        }

        if (dockerContainer !== undefined) {
            localVarFormParams['dockerContainer'] = ObjectSerializer.serialize(dockerContainer, "string");
        }

        if (description !== undefined) {
            localVarFormParams['description'] = ObjectSerializer.serialize(description, "string");
        }

        if (cliArguments !== undefined) {
            localVarFormParams['cliArguments'] = ObjectSerializer.serialize(cliArguments, "string");
        }

        if (requestsCpu !== undefined) {
            localVarFormParams['requestsCpu'] = ObjectSerializer.serialize(requestsCpu, "number");
        }

        if (requestsMemory !== undefined) {
            localVarFormParams['requestsMemory'] = ObjectSerializer.serialize(requestsMemory, "number");
        }

        if (limitsCpu !== undefined) {
            localVarFormParams['limitsCpu'] = ObjectSerializer.serialize(limitsCpu, "number");
        }

        if (limitsMemory !== undefined) {
            localVarFormParams['limitsMemory'] = ObjectSerializer.serialize(limitsMemory, "number");
        }

        if (photo !== undefined) {
            localVarFormParams['photo'] = photo;
        }
        localVarUseFormData = true;

        if (integrateUrl !== undefined) {
            localVarFormParams['integrateUrl'] = ObjectSerializer.serialize(integrateUrl, "string");
        }

        let localVarRequestOptions: localVarRequest.Options = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };

        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.ApiKeyAuthentication.applyToRequest(localVarRequestOptions));

        authenticationPromise = authenticationPromise.then(() => this.authentications.JWTAuthentication.applyToRequest(localVarRequestOptions));

        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    (<any>localVarRequestOptions).formData = localVarFormParams;
                } else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise<{ response: http.IncomingMessage; body: AddOrganizationDeployBlockResponse;  }>((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    } else {
                        body = ObjectSerializer.deserialize(body, "AddOrganizationDeployBlockResponse");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        } else {
                            reject(new HttpError(response, body, response.statusCode));
                        }
                    }
                });
            });
        });
    }
    /**
     * Adds a transformation block.
     * @summary Add transformation block
     * @param organizationId Organization ID
     * @param addOrganizationTransformationBlockRequest 
     */
    public async addOrganizationTransformationBlock (organizationId: number, addOrganizationTransformationBlockRequest: AddOrganizationTransformationBlockRequest, options: {headers: {[name: string]: string}} = {headers: {}}) : Promise<{ response: http.IncomingMessage; body: AddOrganizationTransformationBlockResponse;  }> {
        const localVarPath = this.basePath + '/api/organizations/{organizationId}/transformation'
            .replace('{' + 'organizationId' + '}', encodeURIComponent(String(organizationId)));
        let localVarQueryParameters: any = {};
        let localVarHeaderParams: any = (<any>Object).assign({}, this.defaultHeaders);
        const produces = ['application/json'];
        // give precedence to 'application/json'
        if (produces.indexOf('application/json') >= 0) {
            localVarHeaderParams.Accept = 'application/json';
        } else {
            localVarHeaderParams.Accept = produces.join(',');
        }
        let localVarFormParams: any = {};

        // verify required parameter 'organizationId' is not null or undefined
        if (organizationId === null || organizationId === undefined) {
            throw new Error('Required parameter organizationId was null or undefined when calling addOrganizationTransformationBlock.');
        }

        // verify required parameter 'addOrganizationTransformationBlockRequest' is not null or undefined
        if (addOrganizationTransformationBlockRequest === null || addOrganizationTransformationBlockRequest === undefined) {
            throw new Error('Required parameter addOrganizationTransformationBlockRequest was null or undefined when calling addOrganizationTransformationBlock.');
        }

        (<any>Object).assign(localVarHeaderParams, options.headers);

        let localVarUseFormData = false;

        let localVarRequestOptions: localVarRequest.Options = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: ObjectSerializer.serialize(addOrganizationTransformationBlockRequest, "AddOrganizationTransformationBlockRequest")
        };

        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.ApiKeyAuthentication.applyToRequest(localVarRequestOptions));

        authenticationPromise = authenticationPromise.then(() => this.authentications.JWTAuthentication.applyToRequest(localVarRequestOptions));

        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    (<any>localVarRequestOptions).formData = localVarFormParams;
                } else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise<{ response: http.IncomingMessage; body: AddOrganizationTransformationBlockResponse;  }>((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    } else {
                        body = ObjectSerializer.deserialize(body, "AddOrganizationTransformationBlockResponse");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        } else {
                            reject(new HttpError(response, body, response.statusCode));
                        }
                    }
                });
            });
        });
    }
    /**
     * Deletes a deploy block.
     * @summary Delete deploy block
     * @param organizationId Organization ID
     * @param deployId Deploy block ID.
     */
    public async deleteOrganizationDeployBlock (organizationId: number, deployId: number, options: {headers: {[name: string]: string}} = {headers: {}}) : Promise<{ response: http.IncomingMessage; body: GenericApiResponse;  }> {
        const localVarPath = this.basePath + '/api/organizations/{organizationId}/deploy/{deployId}'
            .replace('{' + 'organizationId' + '}', encodeURIComponent(String(organizationId)))
            .replace('{' + 'deployId' + '}', encodeURIComponent(String(deployId)));
        let localVarQueryParameters: any = {};
        let localVarHeaderParams: any = (<any>Object).assign({}, this.defaultHeaders);
        const produces = ['application/json'];
        // give precedence to 'application/json'
        if (produces.indexOf('application/json') >= 0) {
            localVarHeaderParams.Accept = 'application/json';
        } else {
            localVarHeaderParams.Accept = produces.join(',');
        }
        let localVarFormParams: any = {};

        // verify required parameter 'organizationId' is not null or undefined
        if (organizationId === null || organizationId === undefined) {
            throw new Error('Required parameter organizationId was null or undefined when calling deleteOrganizationDeployBlock.');
        }

        // verify required parameter 'deployId' is not null or undefined
        if (deployId === null || deployId === undefined) {
            throw new Error('Required parameter deployId was null or undefined when calling deleteOrganizationDeployBlock.');
        }

        (<any>Object).assign(localVarHeaderParams, options.headers);

        let localVarUseFormData = false;

        let localVarRequestOptions: localVarRequest.Options = {
            method: 'DELETE',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };

        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.ApiKeyAuthentication.applyToRequest(localVarRequestOptions));

        authenticationPromise = authenticationPromise.then(() => this.authentications.JWTAuthentication.applyToRequest(localVarRequestOptions));

        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    (<any>localVarRequestOptions).formData = localVarFormParams;
                } else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise<{ response: http.IncomingMessage; body: GenericApiResponse;  }>((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    } else {
                        body = ObjectSerializer.deserialize(body, "GenericApiResponse");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        } else {
                            reject(new HttpError(response, body, response.statusCode));
                        }
                    }
                });
            });
        });
    }
    /**
     * Deletes a transformation block.
     * @summary Delete transformation block
     * @param organizationId Organization ID
     * @param transformationId Transformation block ID.
     */
    public async deleteOrganizationTransformationBlock (organizationId: number, transformationId: number, options: {headers: {[name: string]: string}} = {headers: {}}) : Promise<{ response: http.IncomingMessage; body: GenericApiResponse;  }> {
        const localVarPath = this.basePath + '/api/organizations/{organizationId}/transformation/{transformationId}'
            .replace('{' + 'organizationId' + '}', encodeURIComponent(String(organizationId)))
            .replace('{' + 'transformationId' + '}', encodeURIComponent(String(transformationId)));
        let localVarQueryParameters: any = {};
        let localVarHeaderParams: any = (<any>Object).assign({}, this.defaultHeaders);
        const produces = ['application/json'];
        // give precedence to 'application/json'
        if (produces.indexOf('application/json') >= 0) {
            localVarHeaderParams.Accept = 'application/json';
        } else {
            localVarHeaderParams.Accept = produces.join(',');
        }
        let localVarFormParams: any = {};

        // verify required parameter 'organizationId' is not null or undefined
        if (organizationId === null || organizationId === undefined) {
            throw new Error('Required parameter organizationId was null or undefined when calling deleteOrganizationTransformationBlock.');
        }

        // verify required parameter 'transformationId' is not null or undefined
        if (transformationId === null || transformationId === undefined) {
            throw new Error('Required parameter transformationId was null or undefined when calling deleteOrganizationTransformationBlock.');
        }

        (<any>Object).assign(localVarHeaderParams, options.headers);

        let localVarUseFormData = false;

        let localVarRequestOptions: localVarRequest.Options = {
            method: 'DELETE',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };

        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.ApiKeyAuthentication.applyToRequest(localVarRequestOptions));

        authenticationPromise = authenticationPromise.then(() => this.authentications.JWTAuthentication.applyToRequest(localVarRequestOptions));

        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    (<any>localVarRequestOptions).formData = localVarFormParams;
                } else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise<{ response: http.IncomingMessage; body: GenericApiResponse;  }>((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    } else {
                        body = ObjectSerializer.deserialize(body, "GenericApiResponse");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        } else {
                            reject(new HttpError(response, body, response.statusCode));
                        }
                    }
                });
            });
        });
    }
    /**
     * Retrieve all deploy blocks.
     * @summary Get deploy blocks
     * @param organizationId Organization ID
     */
    public async listOrganizationDeployBlocks (organizationId: number, options: {headers: {[name: string]: string}} = {headers: {}}) : Promise<{ response: http.IncomingMessage; body: ListOrganizationDeployBlocksResponse;  }> {
        const localVarPath = this.basePath + '/api/organizations/{organizationId}/deploy'
            .replace('{' + 'organizationId' + '}', encodeURIComponent(String(organizationId)));
        let localVarQueryParameters: any = {};
        let localVarHeaderParams: any = (<any>Object).assign({}, this.defaultHeaders);
        const produces = ['application/json'];
        // give precedence to 'application/json'
        if (produces.indexOf('application/json') >= 0) {
            localVarHeaderParams.Accept = 'application/json';
        } else {
            localVarHeaderParams.Accept = produces.join(',');
        }
        let localVarFormParams: any = {};

        // verify required parameter 'organizationId' is not null or undefined
        if (organizationId === null || organizationId === undefined) {
            throw new Error('Required parameter organizationId was null or undefined when calling listOrganizationDeployBlocks.');
        }

        (<any>Object).assign(localVarHeaderParams, options.headers);

        let localVarUseFormData = false;

        let localVarRequestOptions: localVarRequest.Options = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };

        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.ApiKeyAuthentication.applyToRequest(localVarRequestOptions));

        authenticationPromise = authenticationPromise.then(() => this.authentications.JWTAuthentication.applyToRequest(localVarRequestOptions));

        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    (<any>localVarRequestOptions).formData = localVarFormParams;
                } else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise<{ response: http.IncomingMessage; body: ListOrganizationDeployBlocksResponse;  }>((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    } else {
                        body = ObjectSerializer.deserialize(body, "ListOrganizationDeployBlocksResponse");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        } else {
                            reject(new HttpError(response, body, response.statusCode));
                        }
                    }
                });
            });
        });
    }
    /**
     * Retrieve all transformation blocks.
     * @summary Get transformation blocks
     * @param organizationId Organization ID
     */
    public async listOrganizationTransformationBlocks (organizationId: number, options: {headers: {[name: string]: string}} = {headers: {}}) : Promise<{ response: http.IncomingMessage; body: ListOrganizationTransformationBlocksResponse;  }> {
        const localVarPath = this.basePath + '/api/organizations/{organizationId}/transformation'
            .replace('{' + 'organizationId' + '}', encodeURIComponent(String(organizationId)));
        let localVarQueryParameters: any = {};
        let localVarHeaderParams: any = (<any>Object).assign({}, this.defaultHeaders);
        const produces = ['application/json'];
        // give precedence to 'application/json'
        if (produces.indexOf('application/json') >= 0) {
            localVarHeaderParams.Accept = 'application/json';
        } else {
            localVarHeaderParams.Accept = produces.join(',');
        }
        let localVarFormParams: any = {};

        // verify required parameter 'organizationId' is not null or undefined
        if (organizationId === null || organizationId === undefined) {
            throw new Error('Required parameter organizationId was null or undefined when calling listOrganizationTransformationBlocks.');
        }

        (<any>Object).assign(localVarHeaderParams, options.headers);

        let localVarUseFormData = false;

        let localVarRequestOptions: localVarRequest.Options = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };

        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.ApiKeyAuthentication.applyToRequest(localVarRequestOptions));

        authenticationPromise = authenticationPromise.then(() => this.authentications.JWTAuthentication.applyToRequest(localVarRequestOptions));

        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    (<any>localVarRequestOptions).formData = localVarFormParams;
                } else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise<{ response: http.IncomingMessage; body: ListOrganizationTransformationBlocksResponse;  }>((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    } else {
                        body = ObjectSerializer.deserialize(body, "ListOrganizationTransformationBlocksResponse");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        } else {
                            reject(new HttpError(response, body, response.statusCode));
                        }
                    }
                });
            });
        });
    }
    /**
     * Updates a deploy block. Only values in the body will be updated.
     * @summary Update deploy block
     * @param organizationId Organization ID
     * @param deployId Deploy block ID.
     * @param name 
     * @param dockerContainer 
     * @param description 
     * @param cliArguments 
     * @param requestsCpu 
     * @param requestsMemory 
     * @param limitsCpu 
     * @param limitsMemory 
     * @param photo 
     * @param integrateUrl 
     */
    public async updateOrganizationDeployBlock (organizationId: number, deployId: number, name?: string, dockerContainer?: string, description?: string, cliArguments?: string, requestsCpu?: number, requestsMemory?: number, limitsCpu?: number, limitsMemory?: number, photo?: RequestFile, integrateUrl?: string, options: {headers: {[name: string]: string}} = {headers: {}}) : Promise<{ response: http.IncomingMessage; body: GenericApiResponse;  }> {
        const localVarPath = this.basePath + '/api/organizations/{organizationId}/deploy/{deployId}'
            .replace('{' + 'organizationId' + '}', encodeURIComponent(String(organizationId)))
            .replace('{' + 'deployId' + '}', encodeURIComponent(String(deployId)));
        let localVarQueryParameters: any = {};
        let localVarHeaderParams: any = (<any>Object).assign({}, this.defaultHeaders);
        const produces = ['application/json'];
        // give precedence to 'application/json'
        if (produces.indexOf('application/json') >= 0) {
            localVarHeaderParams.Accept = 'application/json';
        } else {
            localVarHeaderParams.Accept = produces.join(',');
        }
        let localVarFormParams: any = {};

        // verify required parameter 'organizationId' is not null or undefined
        if (organizationId === null || organizationId === undefined) {
            throw new Error('Required parameter organizationId was null or undefined when calling updateOrganizationDeployBlock.');
        }

        // verify required parameter 'deployId' is not null or undefined
        if (deployId === null || deployId === undefined) {
            throw new Error('Required parameter deployId was null or undefined when calling updateOrganizationDeployBlock.');
        }

        (<any>Object).assign(localVarHeaderParams, options.headers);

        let localVarUseFormData = false;

        if (name !== undefined) {
            localVarFormParams['name'] = ObjectSerializer.serialize(name, "string");
        }

        if (dockerContainer !== undefined) {
            localVarFormParams['dockerContainer'] = ObjectSerializer.serialize(dockerContainer, "string");
        }

        if (description !== undefined) {
            localVarFormParams['description'] = ObjectSerializer.serialize(description, "string");
        }

        if (cliArguments !== undefined) {
            localVarFormParams['cliArguments'] = ObjectSerializer.serialize(cliArguments, "string");
        }

        if (requestsCpu !== undefined) {
            localVarFormParams['requestsCpu'] = ObjectSerializer.serialize(requestsCpu, "number");
        }

        if (requestsMemory !== undefined) {
            localVarFormParams['requestsMemory'] = ObjectSerializer.serialize(requestsMemory, "number");
        }

        if (limitsCpu !== undefined) {
            localVarFormParams['limitsCpu'] = ObjectSerializer.serialize(limitsCpu, "number");
        }

        if (limitsMemory !== undefined) {
            localVarFormParams['limitsMemory'] = ObjectSerializer.serialize(limitsMemory, "number");
        }

        if (photo !== undefined) {
            localVarFormParams['photo'] = photo;
        }
        localVarUseFormData = true;

        if (integrateUrl !== undefined) {
            localVarFormParams['integrateUrl'] = ObjectSerializer.serialize(integrateUrl, "string");
        }

        let localVarRequestOptions: localVarRequest.Options = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };

        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.ApiKeyAuthentication.applyToRequest(localVarRequestOptions));

        authenticationPromise = authenticationPromise.then(() => this.authentications.JWTAuthentication.applyToRequest(localVarRequestOptions));

        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    (<any>localVarRequestOptions).formData = localVarFormParams;
                } else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise<{ response: http.IncomingMessage; body: GenericApiResponse;  }>((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    } else {
                        body = ObjectSerializer.deserialize(body, "GenericApiResponse");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        } else {
                            reject(new HttpError(response, body, response.statusCode));
                        }
                    }
                });
            });
        });
    }
    /**
     * Updates a transformation block. Only values in the body will be updated.
     * @summary Update transformation block
     * @param organizationId Organization ID
     * @param transformationId Transformation block ID.
     * @param updateOrganizationTransformationBlockRequest 
     */
    public async updateOrganizationTransformationBlock (organizationId: number, transformationId: number, updateOrganizationTransformationBlockRequest: UpdateOrganizationTransformationBlockRequest, options: {headers: {[name: string]: string}} = {headers: {}}) : Promise<{ response: http.IncomingMessage; body: GenericApiResponse;  }> {
        const localVarPath = this.basePath + '/api/organizations/{organizationId}/transformation/{transformationId}'
            .replace('{' + 'organizationId' + '}', encodeURIComponent(String(organizationId)))
            .replace('{' + 'transformationId' + '}', encodeURIComponent(String(transformationId)));
        let localVarQueryParameters: any = {};
        let localVarHeaderParams: any = (<any>Object).assign({}, this.defaultHeaders);
        const produces = ['application/json'];
        // give precedence to 'application/json'
        if (produces.indexOf('application/json') >= 0) {
            localVarHeaderParams.Accept = 'application/json';
        } else {
            localVarHeaderParams.Accept = produces.join(',');
        }
        let localVarFormParams: any = {};

        // verify required parameter 'organizationId' is not null or undefined
        if (organizationId === null || organizationId === undefined) {
            throw new Error('Required parameter organizationId was null or undefined when calling updateOrganizationTransformationBlock.');
        }

        // verify required parameter 'transformationId' is not null or undefined
        if (transformationId === null || transformationId === undefined) {
            throw new Error('Required parameter transformationId was null or undefined when calling updateOrganizationTransformationBlock.');
        }

        // verify required parameter 'updateOrganizationTransformationBlockRequest' is not null or undefined
        if (updateOrganizationTransformationBlockRequest === null || updateOrganizationTransformationBlockRequest === undefined) {
            throw new Error('Required parameter updateOrganizationTransformationBlockRequest was null or undefined when calling updateOrganizationTransformationBlock.');
        }

        (<any>Object).assign(localVarHeaderParams, options.headers);

        let localVarUseFormData = false;

        let localVarRequestOptions: localVarRequest.Options = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: ObjectSerializer.serialize(updateOrganizationTransformationBlockRequest, "UpdateOrganizationTransformationBlockRequest")
        };

        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.ApiKeyAuthentication.applyToRequest(localVarRequestOptions));

        authenticationPromise = authenticationPromise.then(() => this.authentications.JWTAuthentication.applyToRequest(localVarRequestOptions));

        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    (<any>localVarRequestOptions).formData = localVarFormParams;
                } else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise<{ response: http.IncomingMessage; body: GenericApiResponse;  }>((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    } else {
                        body = ObjectSerializer.deserialize(body, "GenericApiResponse");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        } else {
                            reject(new HttpError(response, body, response.statusCode));
                        }
                    }
                });
            });
        });
    }
}
