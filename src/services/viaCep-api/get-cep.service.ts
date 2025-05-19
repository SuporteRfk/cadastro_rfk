
import { IAddress, IResponseViaCep } from "@/interfaces";
import { viaCepApi } from "./connection-viaCep-api";
import { getHeaders } from "@/utils";


export const consultationCepService = async (cep: string):Promise<IAddress> => {
    let headers = getHeaders("application/json")
      
    const response = await viaCepApi.get(`${cep}/json`, headers)
    return formatResponseCep(response.data)
}

const formatResponseCep = (response:IResponseViaCep) => {
    return {
        cep: response.cep,
        endereco: response.logradouro,
        complemento: response.complemento,
        bairro: response.bairro,
        municipio: response.localidade,
        estado: response.uf,
    }
};