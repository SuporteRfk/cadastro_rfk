import { updateRequestService } from "@/services/supabase/update-request.service";
import { FormStateType, StatusRequest } from "@/interfaces";
import { formatText, handleApiError } from "@/utils";
import { Toastify } from "@/components";
import { AuthContext } from "@/context";
import { useContext } from "react";

interface UseEditRequestParams<T> {
  viewRequestId  : number;
  setLoadingModal:React.Dispatch<React.SetStateAction<boolean>>;
  status: StatusRequest;
  setMode:React.Dispatch<React.SetStateAction<FormStateType>>;
  updateFunction: (id: number, data: T) => Promise<void>; // sua função específica de update
};

export const useEditRequest = <T> ({setLoadingModal, setMode, status, updateFunction, viewRequestId }:UseEditRequestParams<T>) => {
  const {user} = useContext(AuthContext);

  const handleEdit = async (tableRequestId:number, data: T) => {
    try {
      setLoadingModal(true);
      await updateFunction(tableRequestId, data);

      await updateRequestService({
        solicitacao_id: viewRequestId,
        status: status,
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

