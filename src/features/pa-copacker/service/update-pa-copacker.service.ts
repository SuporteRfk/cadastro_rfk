import { supabaseApi } from "@/services/supabase/connection-supabase-api";
import { IPACopackerRegister } from "../interface/pa-copacker";




export const updatePACopackerService = async (id:number, data:IPACopackerRegister):Promise<void> => {
    const {id_usr_keycloak, ...dataUpdate} = data;
    const {error} = await supabaseApi
        .from("cad_pa_copacker")
        .update(dataUpdate)
        .eq("id", id)

        
    if(error){
        throw new Error(`Erro na atualização do copacker: ${error.message}`);
    }
}