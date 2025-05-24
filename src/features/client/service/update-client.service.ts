import { supabaseApi } from "@/services/supabase/connection-supabase-api";
import { IClientRegisterSupabase } from "../interface/client";

//Atualizar Clientes
export const upsertClientService = async(id:number, data:IClientRegisterSupabase):Promise<void> => {
    const {error} = await supabaseApi
        .from("cad_clientes")
        .update(data)
        .eq("id", id)
        
    if(error){
        throw new Error(`Erro na atualização do cliente: ${error.message}`);
    }
};