import { IRequestCNPJResponse } from "@/interfaces";
import { brasilApi } from "./connection-brasil-api";
import { getHeaders } from "@/utils";

// Buscar dados do CNPJ.
export const searchCNPJService = async (cnpj: string):Promise<IRequestCNPJResponse> => {
    const headers = getHeaders("application/json");
    const response = await brasilApi.get(`/cnpj/v1/${cnpj}`, headers);
    return response.data   
}


