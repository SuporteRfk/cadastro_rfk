import { keycloakApi } from "./connection-keycloak";
import { getHeaders } from "@/utils";


let headers = getHeaders();

export const Logout = async (refreshToken: string) => {
    const params = new URLSearchParams();
    params.append("client_id", import.meta.env.VITE_KEYCLOAK_CLIENT_ID as string); 
    params.append("refresh_token", refreshToken);

    const response = await keycloakApi.post("/logout", params, headers);
    return response;
};