import { PaymentConditionFormManager } from "@/features/payment-condition/components/payment-condition-form-manager";
import { ModalRequestWrapper } from "./modal-request-wrapper.components";
import { FormStateType, IViewRequest } from "@/interfaces";


interface ModalRequestRouterProps {
    request: IViewRequest;
    mode: FormStateType;
    setLoadingModal: React.Dispatch<React.SetStateAction<boolean>>
    isTheRouteOfChange: boolean;
    loadingModal:boolean;
    setMode:React.Dispatch<React.SetStateAction<FormStateType>>;
}
const DummyForm = () => <div>Teste Dummy</div>;

export const ModalRequestRouter = ( {request, mode, setLoadingModal,isTheRouteOfChange, loadingModal, setMode}:ModalRequestRouterProps) => {
    
    switch (request.tabela_origem) {
        case "cad_condicao_pagamento":
            return <ModalRequestWrapper 
                        request={request} 
                        FormComponent={PaymentConditionFormManager} 
                        mode={mode} 
                        isTheRouteOfChange={isTheRouteOfChange} 
                        setLoadingModal={setLoadingModal}
                        loadingModal={loadingModal}
                        setMode={setMode}
                    />
        case "cad_unidade_medida":
            return <DummyForm/>
        case "cad_produtos_indiretos":
            return <DummyForm/>
        case "cad_pa_unitario":
            return <DummyForm/>
        case "cad_pa_fardo":
            return <DummyForm/>
        case "cad_pa_terceiro":
            return <DummyForm/>
        case "cad_pa_copacker":
            return <DummyForm/>
        case "cad_insumos":
            return <DummyForm/>
        case "cad_clientes":
            return <DummyForm/>
        case "cad_fornecedires":
            return <DummyForm/>
        default:
            return (
                <div className="text-sm text-muted-foreground italic">
                    Tipo de solicitação não suportado: {request.tipo}
                </div>
            );
    }
};


