import { supabaseApi } from "@/services/supabase/connection-supabase-api";
import { IPACopackerRegister } from "../interface/pa-copacker";

//Cadastrar PA Copacker 
export const insertPACopackerService = async (data:IPACopackerRegister):Promise<void> => {

    const {error} = await supabaseApi
        .from("cad_pa_copacker")
        .insert(data)

    if(error){
        throw new Error(`Erro no insertCadPACopacker: ${error.message}`);
    }
};