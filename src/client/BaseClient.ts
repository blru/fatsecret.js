import axios, { Axios } from "axios";
import { APIError, APIErrorCode } from "./APIError";

interface ICredentials {
    clientId: string;
    clientSecret: string;
    scope: ("basic" | "premier" | "barcode" | "localization")[];
}

export interface IOptions {
    credentials: ICredentials;
}

export default class BaseClient {
    private readonly options: IOptions;
    private readonly OAUTH_URL = "https://oauth.fatsecret.com/connect/token";
    public readonly API_URL = "https://platform.fatsecret.com/rest/server.api";

    private readonly axios: Axios;

    constructor(options: IOptions) {
        // set options 
        this.options = options;

        // create an axios client instance
        this.axios = axios.create({});

        // setup interceptor to handle refreshing token on error
        this.axios.interceptors.response.use(async response => {
            // get error from response
            const originalRequest: any = response.config;
            const responseError = response.data.error;

            // if error attempt to handle error
            if (responseError) {
                if (
                    [APIErrorCode.INVALID_TOKEN, APIErrorCode.MISSING_OAUTH_PARAMETERS].includes(responseError.code) && // is a token error
                    !originalRequest._retry // request hasn't already been retried
                ) {
                    // add _retry to request to prevent retrying infinitely
                    originalRequest._retry = true;

                    // attempt to re-authenticate
                    await this.refreshToken();

                    // retry request
                    return this.axios.request(originalRequest);
                }

                // else, throw error
                throw new APIError(responseError.code, responseError.message)
            };

            // else, return response
            return response;
        });
    }

    async refreshToken() {
        // extract credentials
        const { credentials } = this.options;

        // create request form data body
        const formData = new URLSearchParams({
            "grant_type": "client_credentials",
            "scope": credentials.scope.join(" ")
        });

        // send request
        const response = await this.axios.post(this.OAUTH_URL, formData,
            {
                auth: {
                    username: credentials.clientId,
                    password: credentials.clientSecret
                },
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
            }
        );

        // create access token
        const accessToken = "Bearer " + response.data["access_token"];

        // set authorization header to access token
        this.axios.defaults.headers.common.Authorization = accessToken;

        return;
    }

    async doRequest(method?: string, params?: any) {
        return this.axios.post(this.API_URL, {}, {
            params: {
                method: method,
                format: "json",
                ...params
            }
        });
    }
}