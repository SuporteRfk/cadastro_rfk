import { updateRequestService } from "@/services/supabase/update-request.service";
import { FormStateType, StatusRequest } from "@/interfaces";
import { formatText, handleApiError } from "@/utils";
import { Toastify } from "@/components";
import { AuthContext } from "@/context";
import { useContext } from "react";
import { useLocation } from "react-router-dom";

interface UseEditRequestParams<T> {
  viewRequestId  : number;
  setLoadingModal:React.Dispatch<React.SetStateAction<boolean>>;
  status: StatusRequest;
  setMode:React.Dispatch<React.SetStateAction<FormStateType>>;
  updateFunction: (id: number, data: T) => Promise<void>; // sua função específica de update
  setStatusLocal: React.Dispatch<React.SetStateAction<StatusRequest>>;
};

export const useEditRequest = <T> ({setLoadingModal, setMode, status, updateFunction, viewRequestId, setStatusLocal }:UseEditRequestParams<T>) => {
  const {user} = useContext(AuthContext);
  const location = useLocation();
  const pathName = location.pathname;
  // Lógica utilizada para manter o status somente se for o usuario da controladoria, na rota de revisão editando alguma informação
  // Qualquer outra rota, em uma solicitação que está em revisão, foi presumido que está concertando o erro e saindo de revisão para PENDENTE novamente. 
  const maintainStatus = pathName === "/solicitacoes/em-revisao" && user?.access_approver;
  const setStatus = maintainStatus ? status : StatusRequest.PENDENTE;

  const handleEdit = async (tableRequestId:number, data: T) => {
    try {
      setLoadingModal(true);
      await updateFunction(tableRequestId, data);

      await updateRequestService({
        solicitacao_id: viewRequestId,
        status: setStatus,
        novo_solicitante: {
            data: formatText(new Date(),"data"),
            departamento: user?.departaments || 'departamento',
            nome: user?.fullName || "usuario padrão",
            operacao: "Editar solicitação"
        }
      })
   
      Toastify({
        type: "success",
        message: "Solicitação atualizada!"
      })

      setMode("viewing");
      setStatusLocal(setStatus);
    } catch (error) {
       handleApiError(error,"Erro para atualizar a edição");
    }finally{
      setLoadingModal(false);
    }
  }

  


  return {
    handleEdit
  };
};

