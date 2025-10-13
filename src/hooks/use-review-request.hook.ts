import { updateRequestService } from "@/services/supabase/update-request.service";
import { FormStateType, StatusRequest } from "@/interfaces";
import { formatText, handleApiError } from "@/utils";
import { Toastify } from "@/components";
import { AuthContext, useReview } from "@/context";
import { useContext } from "react";

interface UseReviewRequestParams {
  viewRequestId  : number;
  setLoadingModal:React.Dispatch<React.SetStateAction<boolean>>;
  setMode:React.Dispatch<React.SetStateAction<FormStateType>>;
  setStatusLocal: React.Dispatch<React.SetStateAction<StatusRequest>>;
};

export const useReviewRequest = () => {
  const {user} = useContext(AuthContext);
  const {reviewFields} = useReview();
    
    const handleReviewRequest = async ({setLoadingModal, setMode, viewRequestId, setStatusLocal }:UseReviewRequestParams) => { 
        try {
            setLoadingModal(true);
            await updateRequestService({
            solicitacao_id: viewRequestId,
            status: StatusRequest.REVISAO,
            observacao: "Existem campos a serem revisados",
            motivo_recusa: reviewFields,
            novo_solicitante: {
                data: formatText(new Date(),"data"),
                departamento: user?.departaments || 'departamento',
                nome: user?.fullName || "usuario padrão",
                operacao: "Enviar para revisão a solicitação"
            }
            })

            Toastify({
                type: "success",
                message: "Solicitação atualizada!"
            })

            setMode("viewing");
            setStatusLocal(StatusRequest.REVISAO);
        } catch (error) {
            handleApiError(error,"Erro para atualizar a solicitação");
        }finally{
            setLoadingModal(false); 
        }
    }

    return handleReviewRequest;
};

