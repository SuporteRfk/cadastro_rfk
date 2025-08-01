import { ModalRequestActions } from "./moda-request-actions.components";
import { ModalRequestRouter } from "./modal-request-router.components";
import { FormStateType, IViewRequest, StatusRequest } from "@/interfaces";
import {X as CloseIcon} from "lucide-react";
import { useContext, useState } from "react";
import { Badge } from "../ui";
import { RequestContext } from "@/context";

interface ModalRequestProps {
  onClose: () => void;
  request: IViewRequest;
}

const styleBadge = {
    "Pendente": "pending",
    "Em Revisão": "review",
    "Negado": "denied",
    "Aprovado": "approved"
} as const;

export const ModalRequest = ({ onClose, request }: ModalRequestProps) => {
    const [mode, setMode] = useState<FormStateType>("viewing");
    const [loadingModal, setLoadingModal] = useState<boolean>(false);
    const [statusLocal,setStatusLocal] = useState<StatusRequest>(request.status);
    const {getRequest, filter} = useContext(RequestContext);
    


    return (
        <div className="fixed inset-0 z-50 bg-neutral/40 flex items-center justify-center">
            
                <div 
                    className="bg-white w-full max-w-6xl rounded-md shadow-lg min-h-[80%] max-h-[95vh] relative flex flex-col"
                    // style={{ minHeight: loadingModal ? "80%" : "auto" }}
                >
                    <div className="flex flex-col text-center sm:text-left p-4">
                        {/* Header */}
                        <div className="flex items-center justify-between w-full ">
                            {/* Título */}
                            <p className="flex flex-row items-center gap-2 text-lg font-bold text-text-strong">
                                Solicitação #{request.id}
                                <Badge variant={styleBadge[statusLocal]} className="w-[100px] mr-4">{statusLocal}</Badge>
                            </p>
                            
                            {/* Botão de fechar */}
                            <div className="bg-error/40 p-1 rounded-lg cursor-pointer" onClick={()=>{
                                onClose();
                                if(statusLocal !== request.status){
                                    getRequest(filter!); // Atualiza a lista de solicitações se o status foi alterado
                                };
                            }}>
                                <CloseIcon className="text-error"/>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Detalhes da Solicitação
                        </p>
                    </div>    
                    {/* Formulário dinâmico */}
                    <div className="overflow-y-auto px-4 flex-1" style={{ maxHeight: "calc(95vh - 160px)" }}>
                        <ModalRequestRouter 
                            request={request} 
                            mode={mode} 
                            setLoadingModal={setLoadingModal} 
                            loadingModal={loadingModal}
                            setMode={setMode}
                            setStatusLocal={setStatusLocal}
                        />
                    </div>
                        
                    {/* Ações (editar, aprovar, etc.) */}
                    {(!loadingModal && mode === "viewing") && 
                        <ModalRequestActions 
                            request={request} 
                            mode={mode} 
                            setMode={setMode} 
                            setloadingModal={setLoadingModal}
                            setStatusLocal={setStatusLocal}
                        />
                    }
                </div>
            
        </div>
       
    );
};

