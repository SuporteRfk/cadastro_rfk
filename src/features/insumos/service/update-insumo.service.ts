import { supabaseApi } from "@/services/supabase/connection-supabase-api";
import { IInsumoRegister } from "../interface/insumos";


//Atualizar insumos 
export const updateInsumosService = async (id:number, data:IInsumoRegister):Promise<void> => {
    const {id_usr_keycloak, ...dataUpdate} = data; 
    const {error} = await supabaseApi
        .from("cad_insumos")
        .update(dataUpdate)
        .eq("id", id)

        
    if(error){
        throw new Error(`Erro na atualização do insumo: ${error.message}`);
    }
};