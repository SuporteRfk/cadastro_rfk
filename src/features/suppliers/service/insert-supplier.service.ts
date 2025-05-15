import { supabaseApi } from "@/services/supabase/connection-supabase-api";
import { ISupplierRegisterSupabase } from "../interface/supplier";


//Cadastrar Fornecedores 
export const insertSupplierService = async(data:ISupplierRegisterSupabase):Promise<void> => {
    const {error} = await supabaseApi
        .from("cad_fornecedores")
        .insert(data)

    if(error){
        throw new Error(`Erro no insertSupplierService: ${error.message}`);
    }
};