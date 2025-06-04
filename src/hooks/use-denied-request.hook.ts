import { updateRequestService } from "@/services/supabase/update-request.service";
import { FormStateType, StatusRequest } from "@/interfaces";
import { formatText, handleApiError } from "@/utils";
import { Toastify } from "@/components";
import { AuthContext } from "@/context";
import { useContext } from "react";

interface UseDeniedRequestParams {
  viewRequestId  : number;
  setLoadingModal:React.Dispatch<React.SetStateAction<boolean>>;
  setMode:React.Dispatch<React.SetStateAction<FormStateType>>;
  observation: string;
  setStatusLocal: React.Dispatch<React.SetStateAction<StatusRequest>>
};

export const useDeniedRequest = () => {
  const {user} = useContext(AuthContext);
    
    const handleDenyRequest = async ({setLoadingModal, setMode, viewRequestId, observation, setStatusLocal}:UseDeniedRequestParams) => { 
        try {
            setLoadingModal(true);
            await updateRequestService({
            solicitacao_id: viewRequestId,
            status: StatusRequest.NEGADO,
            observacao: observation,
            novo_solicitante: {
                data: formatText(new Date(),"data"),
                departamento: user?.departaments || 'departamento',
                nome: user?.fullName || "usuario padrão",
                operacao: "Negar solicitação"
            }
            })

            Toastify({
                type: "success",
                message: "Solicitação atualizada!"
            })

            setMode("viewing");
            setStatusLocal(StatusRequest.NEGADO);
        } catch (error) {
            handleApiError(error,"Erro para atualizar a edição");
        }finally{
            setLoadingModal(false); 
        }
    }

    return handleDenyRequest;
};

