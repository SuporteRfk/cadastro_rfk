import { supabaseApi } from "@/services/supabase/connection-supabase-api";
import { IServiceRegister } from "../interface/service";


//Cadastrar novos serviços
export const insertServiceRegistration = async(data:IServiceRegister):Promise<void> => {
    
    const {error} = await supabaseApi
        .from("cad_servico")
        .insert(data)

    if(error){
        throw new Error(`Erro no insertServiceRegistration: ${error.message}`);
    }
};