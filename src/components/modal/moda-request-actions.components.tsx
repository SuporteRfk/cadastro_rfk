import { IViewRequest, FormStateType, StatusRequest } from "@/interfaces";
import { Button } from "../button/button.components";
import { AuthContext } from "@/context";
import { useContext} from "react";
import {
    Pencil as EditIcon,
    CheckCheck as ApproverIcon,
    PencilRuler as ReviewIcon,
    OctagonMinus as DeniedIcon
} from "lucide-react";



interface ModalRequestActionsProps {
  request: IViewRequest;
  setMode: React.Dispatch<React.SetStateAction<FormStateType>>
  mode: FormStateType;
  isTheRouteOfChange: boolean;
}

export const ModalRequestActions = ({ request, mode, setMode, isTheRouteOfChange }: ModalRequestActionsProps) => {
  const { user } = useContext(AuthContext);
  
  const isUserApprover = user?.access_approver;
  const isPending = request.status === StatusRequest.PENDENTE;
  const isReview = request.status === StatusRequest.REVISAO;
  const isApprover = request.status === StatusRequest.APROVADO;
  const requestEmail = request.email;

  
  const handleReleaseEdit = ():boolean => {
    if(isUserApprover) return true; 
    
    if(isTheRouteOfChange){
        return isPending || isReview || isApprover
     }
     if(!isTheRouteOfChange){
        return (user?.email === requestEmail && request.status !== StatusRequest.NEGADO) ;
     }

     return false
  }
  
 
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
                            onClick={() => console.log("aprovandoooo")}
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
