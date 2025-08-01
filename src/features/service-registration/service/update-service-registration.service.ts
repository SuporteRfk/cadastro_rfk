import { supabaseApi } from "@/services/supabase/connection-supabase-api";
import { IServiceRegister } from "../interface/service";


export const updateServiceRegistrationService = async (id:number, data:IServiceRegister):Promise<void> => {
    const {id_usr_keycloak, ...dataUpdate} = data;
    const {error} = await supabaseApi
        .from("cad_servico")
        .update(dataUpdate)
        .eq("id", id)

        
    if(error){
        throw new Error(`Erro na atualização do cadastro de serviço: ${error.message}`);
    };
}