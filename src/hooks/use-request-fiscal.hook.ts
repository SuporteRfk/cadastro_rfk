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

export const useRequestFiscal = () => {
  const {user} = useContext(AuthContext);
  
    
    const handleFiscalRequest = async ({setLoadingModal, setMode, viewRequestId, setStatusLocal }:UseRequestApproveParams) => { 
        try {
            setLoadingModal(true);
            await updateRequestService({
            solicitacao_id: viewRequestId,
            status: StatusRequest.FISCAL,
            novo_solicitante: {
                data: formatText(new Date(),"data"),
                departamento: user?.departaments || 'departamento',
                nome: user?.fullName || "usuario padrão",
                operacao: "Enviado para o Fiscal"
            }
            })

            Toastify({
                type: "success",
                message: "Solicitação enviada para o fiscal!"
            })

            setMode("viewing");
            setStatusLocal(StatusRequest.FISCAL);
        } catch (error) {
            handleApiError(error,"Erro para atualizar a solicitação");
        }finally{
            setLoadingModal(false); 
        }
    }

    return handleFiscalRequest;
};

