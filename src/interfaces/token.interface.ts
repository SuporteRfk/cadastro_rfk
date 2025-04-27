export interface ITokenRefresh {
    aud: string; 
    azp: string;
    exp: number;
    iat: number;
    iss: string;
    jti: string;
    scope: string;
    sid: string;
    sub: string;
    typ: string;
};

export interface ITokenBearer {
    acr: string; 
    "allowed-origins": string[];
    aud: string;
    azp: string;
    distinguished:string;
    email: string;
    email_verified: boolean;
    exp: number;
    family_name: string;
    given_name:string;
    groups:string[];
    iat: number;
    iss: string;
    jti: string;
    name: string;
    preferred_username:string;
    realm_access: {
        roles: string[];
    };
    resource_access: IResourceAccess;
    scope: string;
    sid: string;
    sub: string;
    typ: string;
};


export interface IResourceAccess {
    [client: string]: {
        roles: string[];
    };
};

export interface IRefreshTokenResponseSucess{
    access_token: string;
    expires_in: number;
    refresh_expires_in: number;
    refresh_token: string;
    token_type: string;
    id_token: string;
    "not-before-policy": number;
    session_state: string;
    scope: string;
};