import { supabaseApi } from "@/services/supabase/connection-supabase-api";
import { IPAUnitaryRegister } from "../interface/pa-unitary";

//Cadastrar PA Unitario 
export const insertPAUnitaryService = async (data:IPAUnitaryRegister):Promise<void> => {
    const {error} = await supabaseApi
        .from("cad_pa_unitario")
        .insert(data)
    
    if(error){
        throw new Error(`Erro no insertPAUnitario: ${error.message}`);
    }
};