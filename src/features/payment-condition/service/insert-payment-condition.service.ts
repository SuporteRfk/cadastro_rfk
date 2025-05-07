import { IPaymentConditionRegister } from "../interface/payment-condition";
import { supabaseApi } from "@/services/supabase/connection-supabase-api";

export const insertPaymentConditionService = async(data:IPaymentConditionRegister):Promise<void> => {
    const {error} = await supabaseApi
        .from("cad_condicao_pagamento")
        .insert(data)

    if(error){
        throw new Error(`Erro no inserCadCondicaoPagamento: ${error.message}`);
    }
};