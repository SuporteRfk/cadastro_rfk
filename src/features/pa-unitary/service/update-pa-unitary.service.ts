import { supabaseApi } from "@/services/supabase/connection-supabase-api";
import { IPAUnitaryRegister } from "../interface/pa-unitary";

export const updatePAUnitaryService = async (id:number, data:IPAUnitaryRegister):Promise<void> => {
    const {error} = await supabaseApi
        .from("cad_pa_unitario")
        .update(data)
        .eq("id", id)

        
    if(error){
        throw new Error(`Erro na atualização do unitário: ${error.message}`);
    }
}