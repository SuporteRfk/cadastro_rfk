import { ModalRequestActions } from "./moda-request-actions.components";
import { ModalRequestRouter } from "./modal-request-router.components";
import { FormStateType, IViewRequest } from "@/interfaces";
import {X as CloseIcon} from "lucide-react";
import { useState } from "react";
import { Badge } from "../ui";

interface ModalRequestProps {
  onClose: () => void;
  request: IViewRequest;
  isTheRouteOfChange: boolean;
}

const styleBadge = {
    "Pendente": "pending",
    "Em Revisão": "review",
    "Negado": "denied",
    "Aprovado": "approved"
} as const;

export const ModalRequest = ({ onClose, request, isTheRouteOfChange }: ModalRequestProps) => {
    const [mode, setMode] = useState<FormStateType>("viewing");
    const [loadingModal, setLoadingModal] = useState<boolean>(false);


    return (
        <div className="fixed inset-0 z-50 bg-neutral/40 flex items-center justify-center">
            
                <div className="bg-white w-full max-w-5xl rounded-md shadow-lg h-full max-h-[90vh] relative ">
                    <div className="flex flex-col space-y-1.5 text-center sm:text-left p-4">
                        {/* Header */}
                        <div className="flex items-center justify-between w-full ">
                            {/* Título */}
                            <p className="flex flex-row items-center gap-2 text-lg font-bold text-text-strong">
                                Solicitação #{request.id}
                                <Badge variant={styleBadge[request.status]} className="w-[100px] mr-4">{request.status}</Badge>
                            </p>
                            
                            {/* Botão de fechar */}
                            <div className="bg-error/40 p-1 rounded-lg cursor-pointer" onClick={onClose}>
                                <CloseIcon className="text-error"/>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Detalhes da Solicitação
                        </p>
                    </div>    
                    {/* Formulário dinâmico */}
                    <ModalRequestRouter 
                        request={request} 
                        mode={mode} 
                        setLoadingModal={setLoadingModal} 
                        isTheRouteOfChange={isTheRouteOfChange} 
                        loadingModal={loadingModal}
                        setMode={setMode}
                    />
                        
                    {/* Ações (editar, aprovar, etc.) */}
                    {!loadingModal && 
                        <ModalRequestActions request={request} mode={mode} setMode={setMode} isTheRouteOfChange={isTheRouteOfChange}/>
                    }
                </div>
            
        </div>
       
    );
};

