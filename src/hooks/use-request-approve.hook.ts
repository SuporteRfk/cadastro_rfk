import { updateRequestService } from "@/services/supabase/update-request.service";
import { FormStateType, StatusRequest } from "@/interfaces";
import { formatText, handleApiError } from "@/utils";
import { Toastify } from "@/components";
import { AuthContext } from "@/context";
import { useContext } from "react";

interface UseRequestApproveParams {
  viewRequestId  : number;
  setLoadingModal:React.Dispatch<React.SetStateAction<boolean>>;
  setMode:React.Dispatch<React.SetStateAction<FormStateType>>;
  setStatusLocal: React.Dispatch<React.SetStateAction<StatusRequest>>;
};

export const useRequestApprove = () => {
  const {user} = useContext(AuthContext);
  
    
    const handleApproveRequest = async ({setLoadingModal, setMode, viewRequestId, setStatusLocal }:UseRequestApproveParams) => { 
        try {
            setLoadingModal(true);
            await updateRequestService({
            solicitacao_id: viewRequestId,
            status: StatusRequest.APROVADO,
            novo_solicitante: {
                data: formatText(new Date(),"data"),
                departamento: user?.departaments || 'departamento',
                nome: user?.fullName || "usuario padrão",
                operacao: "Aprovar solicitação"
            }
            })

            Toastify({
                type: "success",
                message: "Solicitação aprovado!"
            })

            setMode("viewing");
            setStatusLocal(StatusRequest.APROVADO);
        } catch (error) {
            handleApiError(error,"Erro para atualizar a solicitação");
        }finally{
            setLoadingModal(false); 
        }
    }

    return handleApproveRequest;
};

