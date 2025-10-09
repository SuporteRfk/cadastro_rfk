import { IIndirectProductSimilarity } from "../interface/indirect-products-similarity";
import { supabaseApi } from "@/services/supabase/connection-supabase-api";

//Cadastrar Produtos Indiretos 
export const getSimilarityService = async (id:number):Promise<IIndirectProductSimilarity[]> => {
    const {data, error} = await supabaseApi
        .from("produtos_indiretos_similares")
        .select("*")
        .eq("id_cad_produto_indireto", id)
        .eq("similaridade", true)

     
    if(error){
        console.log(`Erro na busca dos produtos similares: ${error.message}`)
        throw new Error(`Erro na busca dos produtos similares: ${error.message}`);
    }

    return data;
};