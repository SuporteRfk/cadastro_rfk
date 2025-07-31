import { supabaseApi } from "@/services/supabase/connection-supabase-api";
import { IServiceRegister } from "../interface/service";


export const updateServiceRegistrationService = async (id:number, data:IServiceRegister):Promise<void> => {
    const {error} = await supabaseApi
        .from("cad_servico")
        .update(data)
        .eq("id", id)

        
    if(error){
        throw new Error(`Erro na atualização do cadastro de serviço: ${error.message}`);
    };
}