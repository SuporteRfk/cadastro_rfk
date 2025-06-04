import { IIndirectProductsRegister } from "../interface/indirect-products";
import { supabaseApi } from "@/services/supabase/connection-supabase-api";




export const updateIndirectProductsService = async (id:number, data:IIndirectProductsRegister):Promise<void> => {
    const {error} = await supabaseApi
        .from("cad_produtos_indiretos")
        .update(data)
        .eq("id", id)

        
    if(error){
        throw new Error(`Erro na atualização do produto indireto: ${error.message}`);
    }
}