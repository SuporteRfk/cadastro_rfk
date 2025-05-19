import { supabaseApi } from "@/services/supabase/connection-supabase-api";
import { IPABurdenRegister } from "../interface/pa-burden";

//Cadastrar PA Fardo 
export const insertPABurdenService = async (data:IPABurdenRegister):Promise<void> => {
    const {error} = await supabaseApi
        .from("cad_pa_fardo")
        .insert(data)
    
    if(error){
        throw new Error(`Erro no insertCadPAFardoService: ${error.message}`);
    }
};