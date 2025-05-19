import { IIndirectProductsRegister } from "../interface/indirect-products";
import { supabaseApi } from "@/services/supabase/connection-supabase-api";

//Cadastrar Produtos Indiretos 
export const insertIndirectProductsService = async (data:IIndirectProductsRegister):Promise<void> => {
    const {error} = await supabaseApi
        .from("cad_produtos_indiretos")
        .insert(data)
    
    if(error){
        throw new Error(`Erro no insertProdutosIndiretos: ${error.message}`);
    }
};