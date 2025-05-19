import { supabaseApi } from "@/services/supabase/connection-supabase-api";
import { IPAThirdRegister } from "../interface/pa-third";

//Cadastrar PA Terceiro 
export const insertPATerceiroService = async (data:IPAThirdRegister):Promise<void> => {
    const {error} = await supabaseApi
        .from("cad_pa_terceiro")
        .insert(data)
    
    if(error){
        throw new Error(`Erro no insertPATerceiro: ${error.message}`);
    }
};