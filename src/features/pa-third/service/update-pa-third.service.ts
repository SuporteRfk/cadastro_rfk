import { supabaseApi } from "@/services/supabase/connection-supabase-api";
import { IPAThirdRegister } from "../interface/pa-third";

export const updatePAThirdService = async (id:number, data:IPAThirdRegister):Promise<void> => {
    const {error} = await supabaseApi
        .from("cad_pa_terceiro")
        .update(data)
        .eq("id", id)

        
    if(error){
        throw new Error(`Erro na atualização do pa terceiro: ${error.message}`);
    }
}