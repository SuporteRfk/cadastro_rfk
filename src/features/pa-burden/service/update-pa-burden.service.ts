import { supabaseApi } from "@/services/supabase/connection-supabase-api";
import { IPABurdenRegister } from "../interface/pa-burden";





export const updatePABurdenService = async (id:number, data:IPABurdenRegister):Promise<void> => {
    const {error} = await supabaseApi
        .from("cad_pa_fardo")
        .update(data)
        .eq("id", id)

        
    if(error){
        throw new Error(`Erro na atualização do fardo: ${error.message}`);
    }
}