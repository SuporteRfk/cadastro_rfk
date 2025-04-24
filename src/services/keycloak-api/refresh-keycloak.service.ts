import { IRefreshTokenResponseSucess } from "@/interfaces";
import { keycloakApi } from "./connection-keycloak";
import { getHeaders } from "@/utils";


let headers = getHeaders();

export const RefreshToken = async(refreshToken: string):Promise<IRefreshTokenResponseSucess> => {
    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("client_id", import.meta.env.VITE_KEYCLOAK_CLIENT_ID as string); 
    params.append("refresh_token", refreshToken)

    const response = await keycloakApi.post("/token", params, headers);
    return response.data;
};