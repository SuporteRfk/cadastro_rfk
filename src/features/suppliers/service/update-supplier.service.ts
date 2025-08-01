import { supabaseApi } from "@/services/supabase/connection-supabase-api";
import { ISupplierRegisterSupabase } from "../interface/supplier";


//Atualizar Fornecedores 
export const upsertSupplierService = async(id:number, data:ISupplierRegisterSupabase):Promise<void> => {
    const {id_usr_keycloak, ...dataUpdate} = data;
    const {error} = await supabaseApi
        .from("cad_fornecedores")
        .update(dataUpdate)
        .eq("id", id)
        
    if(error){
        throw new Error(`Erro na atualização do fornecedor: ${error.message}`);
    }
};