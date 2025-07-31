import { supabaseApi } from "@/services/supabase/connection-supabase-api";
import { IRequestChangeRegister } from "../interface/request-change";

export const updateRequestChangeService = async (id:number, data:IRequestChangeRegister):Promise<void> => {
    const {error} = await supabaseApi
        .from("cad_alteracao")
        .update(data)
        .eq("id", id)

        
    if(error){
        throw new Error(`Erro na atualização da solicitação de alteração: ${error.message}`);
    };
}