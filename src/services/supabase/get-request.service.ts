import { IQueryRequest, IViewRequest } from "@/interfaces";
import { supabaseApi } from "./connection-supabase-api";



export const getRequestService = async (filter?: IQueryRequest):Promise<{data:IViewRequest[], count:number | null}> => {
    let query = supabaseApi.from("vw_solicitacoes_geral").select('*', { count: 'exact' });

    if(filter?.status){
        query = query.eq("status", filter.status)
    };

    if(filter?.tipo){
        query = query.eq("tipo", filter.tipo)
    };

    if(filter?.email){
        query = query.ilike("email", filter.email)
    };

    if(filter?.nome_solicitante){
        query = query.ilike("nome_solicitante", filter.nome_solicitante)
    };

    if(filter?.operacao){
        query = query.eq("operacao", filter.operacao)
    };

    if(filter?.data){
        query = query.gte("criado_em", `${filter.data} 00:00:00`)
        query = query.lte("criado_em", `${filter.data} 23:59:59`)
    }

    //Paginação 
    if(typeof filter?.offset === "number" && typeof filter?.indexLimit === "number"){
        query = query.range(filter.offset, filter.offset + filter.indexLimit - 1);
    }

    const { data, count, error } = await query.order("id", { ascending: false });

    if(error){
        throw new Error(error.message);
    }
    
    return {data, count};
}