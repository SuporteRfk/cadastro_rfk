import { supabaseApi } from "@/services/supabase/connection-supabase-api";
import { IClientRegisterSupabase } from "../interface/client";

// Cadastrar dados do cliente 
export const insertClientService = async (data: IClientRegisterSupabase): Promise<void> => {
    const {error} = await supabaseApi
        .from("cad_clientes")
        .insert(data)
    
    if(error){
        throw new Error(`Erro no insertClientService: ${error.message}`);
    }
};