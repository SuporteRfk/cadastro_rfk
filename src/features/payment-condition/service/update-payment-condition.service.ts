import { supabaseApi } from "@/services/supabase/connection-supabase-api";
import { IPaymentConditionRegister } from "../interface/payment-condition";


//Atualizar Condicao de Pagamento 
export const updatePaymentConditionService =async(id:number,dataUpdate:IPaymentConditionRegister):Promise<void> =>{
    const {error} = await supabaseApi
        .from("cad_condicao_pagamento")
        .update({
            condicao_pagamento: dataUpdate.condicao_pagamento
        })
        .eq("id", id)

    if(error){
        throw new Error(`Erro na atualização da condição de pagamento: ${error.message}`);
    }
}