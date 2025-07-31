import { supabaseApi } from "@/services/supabase/connection-supabase-api";
import { IRequestChangeRegister } from "../interface/request-change";



//Cadastrar Solicitações de Alterações 
export const insertRequestChangeService = async(data:IRequestChangeRegister):Promise<void> => {
    
    const {error} = await supabaseApi
        .from("cad_alteracao")
        .insert(data)

    if(error){
        throw new Error(`Erro no insertRequestChangeService: ${error.message}`);
    }
};