import { supabaseApi } from "@/services/supabase/connection-supabase-api";
import { IUnitMeasureRegister } from "../interface/unit-measure";


//Cadastrar Unidade de Medida 
export const insertUnitMeasureService = async (data:IUnitMeasureRegister):Promise<void> => {
    const {error} = await supabaseApi
        .from("cad_unidade_medida")
        .insert(data)
    
    if(error){
        throw new Error(`Erro no insertUnitMeasureService: ${error.message}`);
    }
};