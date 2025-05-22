import { IIndirectProducts } from "@/features/indirect-products/interface/indirect-products";
import { IPaymentCondition } from "@/features/payment-condition/interface/payment-condition";
import { IUnitMeasure } from "@/features/unit-measure/interface/unit-measure";
import { IPACopacker } from "@/features/pa-copacker/interface/pa-copacker";
import { IPAUnitary } from "@/features/pa-unitary/interface/pa-unitary";
import { IPABurden } from "@/features/pa-burden/interface/pa-burden";
import { ISupplier } from "@/features/suppliers/interface/supplier";
import { IPAThird } from "@/features/pa-third/interface/pa-third";
import { IInsumo } from "@/features/insumos/interface/insumos";
import { IClient } from "@/features/client/interface/client";
import { supabaseApi } from "./connection-supabase-api";

// buscar detalhes de uma solicitacao ||  fetch details of a request
export const getRequestDetailsService = async (idFk:number, table:string):Promise<
    | IClient 
    | IPaymentCondition
    | ISupplier
    | IUnitMeasure
    | IInsumo
    | IIndirectProducts
    | IPACopacker
    | IPABurden
    | IPAThird
    | IPAUnitary
> => {

    const {data, error} = await supabaseApi
        .from(table)
        .select('*')
        .eq("id", idFk)
        .single()
    
    if(error){
        throw new Error(`Erro na getSolicitacao: ${error.message}`);
    }     
    
    return data;
};
