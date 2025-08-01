import { IIndirectProductsRegister } from "../interface/indirect-products";
import { supabaseApi } from "@/services/supabase/connection-supabase-api";




export const updateIndirectProductsService = async (id:number, data:IIndirectProductsRegister):Promise<void> => {
    const {id_usr_keycloak, ...dataUpdate} = data;
    const {error} = await supabaseApi
        .from("cad_produtos_indiretos")
        .update(dataUpdate)
        .eq("id", id)

        
    if(error){
        throw new Error(`Erro na atualização do produto indireto: ${error.message}`);
    }
}