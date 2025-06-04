import { ILoginRequest, ILoginResponseSuccess } from "@/interfaces";
import { keycloakApi } from "./connection-keycloak";
import { getHeaders } from "@/utils";

let headers = getHeaders();

export const Login = async (dataLogin:ILoginRequest):Promise<ILoginResponseSuccess> => {
    const params = new URLSearchParams();
    params.append("grant_type", "password");
    params.append("client_id", import.meta.env.VITE_KEYCLOAK_CLIENT_ID as string); 
    params.append("username", dataLogin.username);
    params.append("password", dataLogin.password);
    params.append("scope", "openid");

    const response = await keycloakApi.post("/token", params, headers);
  
    return response.data;
};