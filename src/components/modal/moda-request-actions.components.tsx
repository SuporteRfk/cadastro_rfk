import { IViewRequest, FormStateType, StatusRequest } from "@/interfaces";
import { Button } from "../button/button.components";
import { AuthContext, ModalContext } from "@/context";
import { useContext} from "react";
import {
    Pencil as EditIcon,
    CheckCheck as ApproverIcon,
    PencilRuler as ReviewIcon,
    OctagonMinus as DeniedIcon
} from "lucide-react";
import { useRequestApprove } from "@/hooks";



interface ModalRequestActionsProps {
  request: IViewRequest;
  setMode: React.Dispatch<React.SetStateAction<FormStateType>>
  mode: FormStateType;
  setloadingModal: React.Dispatch<React.SetStateAction<boolean>>
  setStatusLocal:React.Dispatch<React.SetStateAction<StatusRequest>>
}

export const ModalRequestActions = ({ request, mode, setMode, setloadingModal,setStatusLocal }: ModalRequestActionsProps) => {
  const { user } = useContext(AuthContext);
  const { openModal } = useContext(ModalContext);

  const isUserApprover = user?.access_approver;
  const isPending = request.status === StatusRequest.PENDENTE;
  const isReview = request.status === StatusRequest.REVISAO;
  const idKeycloack = request.id_usr_keycloak;

  
  const handleReleaseEdit = ():boolean => {
    if(isUserApprover){
        return true; 
    } 

    if(!isUserApprover && idKeycloack === user?.id_keycloak && (isPending || isReview)){
        return true;
    }

    return false
  }
  
  // hook para aprovar a solicitação
   const approveRequest = useRequestApprove();
   
 
  return (
    // <div className="flex items-center justify-end gap-2 w-full absolute z-10 bottom-0 p-4">
    <div className="flex items-center justify-end gap-2 w-full p-4">

            
                {handleReleaseEdit() &&
                    <Button
                        variant={mode=="editing"? "active":"secondary"}
                        text="Editar"
                        onClick={() => setMode("editing")}
                        sizeWidth="w-[110px]"
                        iconInText={EditIcon}
                        styleIcon={{
                            size: 18
                        }}
                    />
                }
                {isUserApprover &&
                    <>
                        <Button
                            variant={mode=="reviewing"? "active":"outline"}
                            text="Revisão"
                            sizeWidth="w-[110px]"
                            onClick={() => setMode("reviewing")}
                            iconInText={ReviewIcon}
                            styleIcon={{
                                size: 18
                            }}
                        />
                        <Button
                            variant={mode=="denied"? "active":"danger"}
                            text="Negar"
                            sizeWidth="w-[110px]"
                            onClick={() => setMode("denied")}
                            iconInText={DeniedIcon}
                            styleIcon={{
                                size: 18
                            }}
                        />
                        <Button
                            variant="primary"
                            text="Aprovar"
                            sizeWidth="w-[110px]"
                            onClick={async () => openModal("approve-request", {
                                message: `Você tem certeza que deseja aprovar a solicitação #${request.id} referente a ${request.tipo}?`,
                                onConfirm: async () => {
                                    await approveRequest({
                                        setLoadingModal: setloadingModal,
                                        setMode: setMode,
                                        viewRequestId: request.id,
                                        setStatusLocal: setStatusLocal
                                    });
                                }
                            })}
                            iconInText={ApproverIcon}
                            styleIcon={{
                                size: 18
                            }}
                        />
                    </>
                }       
    </div>
  );
};

