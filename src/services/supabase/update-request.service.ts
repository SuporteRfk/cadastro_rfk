import { supabaseApi } from "./connection-supabase-api";
import { IUpdateRequest } from "@/interfaces";

// Atualizar Solicitação
export const updateRequestService = async (dataUpdate: IUpdateRequest) => {

    if (dataUpdate.novo_solicitante) {
        const {error: RPCError} = await supabaseApi
            .rpc("updateEditSolicitacao", {
                novo_solicitante: dataUpdate.novo_solicitante,
                solicitacao_id: dataUpdate.solicitacao_id
        })

        if(RPCError){
            throw new Error(`Erro na RPC: ${RPCError.message}`);
        }
    }

    const {error} = await supabaseApi
        .from("solicitacoes")
        .update({
            status: dataUpdate.status,
            observacao: dataUpdate.observacao || null,
            motivo_recusa: dataUpdate.motivo_recusa || null,
            alteracoes: dataUpdate.alteracao || null
        })
        .eq("id", dataUpdate.solicitacao_id)

    if(error){
        throw new Error(`Erro na atualização da tabela: ${error.message}`);
    }
};




