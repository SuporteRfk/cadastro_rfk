import { supabaseApi } from "./connection-supabase-api";


// Contador da quantidade de Solicitações de acordo com o status, pendente e revisão e o total que é a soma de ambas.
export const getCountersRequest = async () => {
    
    const queries = {
      pendingQuantity : supabaseApi.from("vw_solicitacoes_geral")
        .select("*", { head: true, count: "exact" })
        .eq("status", "Pendente"),
  
      reviewQuantity: supabaseApi.from("vw_solicitacoes_geral")
        .select("*", { head: true, count: "exact" })
        .eq("status", "Em Revisão"),

      fiscalQuantity: supabaseApi.from("vw_solicitacoes_geral")
        .select("*", { head: true, count: "exact" })
        .eq("status", "Fiscal"),
    };
  
    const [pending, review, fiscal] = await Promise.all([
      queries.pendingQuantity, queries.reviewQuantity, queries.fiscalQuantity
    ]);
    
    
    return {
      pending: pending.count || 0,
      review: review.count || 0,
      fiscal: fiscal.count || 0,
      total: (pending.count || 0) + (review.count || 0) + (fiscal.count || 0),
    };
};