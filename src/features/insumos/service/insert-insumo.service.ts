import { supabaseApi } from "@/services/supabase/connection-supabase-api";
import { IInsumoRegister } from "../interface/insumos";


//Cadastrar insumos 
export const insertInsumosService = async (data:IInsumoRegister):Promise<void> => {
    const {error} = await supabaseApi
        .from("cad_insumos")
        .insert(data)

    if(error){
        throw new Error(`Erro no insertInsumosService: ${error.message}`);
    }
};