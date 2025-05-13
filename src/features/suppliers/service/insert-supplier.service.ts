import { supabaseApi } from "@/services/supabase/connection-supabase-api";
import { ISupplierRegister } from "../interface/supplier";


//Cadastrar Fornecedores 
export const insertSupplierService = async(data:ISupplierRegister):Promise<void> => {
    const {error} = await supabaseApi
        .from("cad_fornecedores")
        .insert(data)

    if(error){
        throw new Error(`Erro no insertSupplierService: ${error.message}`);
    }
};