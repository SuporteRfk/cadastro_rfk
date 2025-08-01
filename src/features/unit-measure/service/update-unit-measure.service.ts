import { supabaseApi } from "@/services/supabase/connection-supabase-api";
import { IUnitMeasureRegister } from "../interface/unit-measure";



export const updateUnitMeasureService = async (id:number, data:IUnitMeasureRegister):Promise<void> => {
    const {id_usr_keycloak, ...dataUpdate} = data;
    const {error} = await supabaseApi
        .from("cad_unidade_medida")
        .update(dataUpdate)
        .eq("id", id)

        
    if(error){
        throw new Error(`Erro na atualização da unidade de medida: ${error.message}`);
    }
}