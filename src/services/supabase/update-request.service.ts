import { supabaseApi } from "./connection-supabase-api";
import { IUpdateRequest } from "@/interfaces";

// Atualizar Solicitação
export const updateRequestService = async (dataUpdate: IUpdateRequest) => {
    
    if (dataUpdate.novo_solicitante) {
        
        const {error: RPCError} = await supabaseApi
            .rpc("updateEditSolicitacao", {
                motivo_recusa_valor: dataUpdate.motivo_recusa || null,
                novo_solicitante: dataUpdate.novo_solicitante,
                observacao_valor: dataUpdate.observacao || null,
                solicitacao_id: dataUpdate.solicitacao_id,
                status_valor: dataUpdate.status
        })  

        if(RPCError){
            console.log(RPCError)
            throw new Error(RPCError.message);
        }
    }

};




