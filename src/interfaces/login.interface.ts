export interface ILoginRequest {
    username: string;
    password: string;
}

export interface ILoginResponseSuccess {
    access_token: string;
    expires_in: number;
    'not-before-policy': number;
    refresh_expires_in: number;
    refresh_token: string;
    scope: string;
    session_state: string;
    token_type: string;
}

