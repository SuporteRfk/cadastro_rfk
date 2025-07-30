import { PaymentConditionFormManager } from "@/features/payment-condition/components/payment-condition-form-manager";
import { IndirectProductsFormManager } from "@/features/indirect-products/components/indirect-products-form-manager";
import { RequestChangeFormManager } from "@/features/request-change/components/request-change-form-manager";
import { UnitMeasureFormManager } from "@/features/unit-measure/components/unit-measure-form-manager";
import { PACopackerFormManager } from "@/features/pa-copacker/components/pa-copacker-form-manager";
import { PAUnitaryFormManager } from "@/features/pa-unitary/components/pa-unitary-form-manager";
import { SuppliersFormManager } from "@/features/suppliers/components/suppliers-form-manager";
import { PABurdenFormManager } from "@/features/pa-burden/components/pa-burden-form-manager";
import { PAThirdFormManager } from "@/features/pa-third/components/pa-third-form-manager";
import { InsumoFormManager } from "@/features/insumos/components/insumos-form-manager";
import { ClientFormManager } from "@/features/client/components/client-form-manager";
import { ModalRequestWrapper } from "./modal-request-wrapper.components";
import { FormStateType, IViewRequest, StatusRequest } from "@/interfaces";


interface ModalRequestRouterProps {
    request: IViewRequest;
    mode: FormStateType;
    setLoadingModal: React.Dispatch<React.SetStateAction<boolean>>
    isTheRouteOfChange: boolean;
    loadingModal:boolean;
    setMode:React.Dispatch<React.SetStateAction<FormStateType>>;
    setStatusLocal: React.Dispatch<React.SetStateAction<StatusRequest>>
}

export const ModalRequestRouter = ( {request, mode, setLoadingModal,isTheRouteOfChange, loadingModal, setMode, setStatusLocal}:ModalRequestRouterProps) => {
    console.log(request)
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
                        setStatusLocal={setStatusLocal}
                    />
        case "cad_unidade_medida":
            return <ModalRequestWrapper
                        request={request}
                        FormComponent={UnitMeasureFormManager}
                        mode={mode} 
                        isTheRouteOfChange={isTheRouteOfChange} 
                        setLoadingModal={setLoadingModal}
                        loadingModal={loadingModal}
                        setMode={setMode}
                        setStatusLocal={setStatusLocal}
                    />
        case "cad_produtos_indiretos": 
            return <ModalRequestWrapper
                        request={request}
                        FormComponent={IndirectProductsFormManager}
                        mode={mode} 
                        isTheRouteOfChange={isTheRouteOfChange} 
                        setLoadingModal={setLoadingModal}
                        loadingModal={loadingModal}
                        setMode={setMode}
                        setStatusLocal={setStatusLocal}
                    />
        case "cad_pa_unitario":
            return <ModalRequestWrapper
                        request={request}
                        FormComponent={PAUnitaryFormManager}
                        mode={mode} 
                        isTheRouteOfChange={isTheRouteOfChange} 
                        setLoadingModal={setLoadingModal}
                        loadingModal={loadingModal}
                        setMode={setMode}
                        setStatusLocal={setStatusLocal}
                    />
        case "cad_pa_fardo": 
            return <ModalRequestWrapper
                        request={request}
                        FormComponent={PABurdenFormManager}
                        mode={mode} 
                        isTheRouteOfChange={isTheRouteOfChange} 
                        setLoadingModal={setLoadingModal}
                        loadingModal={loadingModal}
                        setMode={setMode}
                        setStatusLocal={setStatusLocal}
                    />
        case "cad_pa_terceiro": 
            return <ModalRequestWrapper
                        request={request}
                        FormComponent={PAThirdFormManager}
                        mode={mode} 
                        isTheRouteOfChange={isTheRouteOfChange} 
                        setLoadingModal={setLoadingModal}
                        loadingModal={loadingModal}
                        setMode={setMode}
                        setStatusLocal={setStatusLocal}
                    />
        case "cad_pa_copacker":
            return <ModalRequestWrapper
                        request={request}
                        FormComponent={PACopackerFormManager}
                        mode={mode} 
                        isTheRouteOfChange={isTheRouteOfChange} 
                        setLoadingModal={setLoadingModal}
                        loadingModal={loadingModal}
                        setMode={setMode}
                        setStatusLocal={setStatusLocal}
                    />
        case "cad_insumos":
            return <ModalRequestWrapper
                        request={request}
                        FormComponent={InsumoFormManager}
                        mode={mode} 
                        isTheRouteOfChange={isTheRouteOfChange} 
                        setLoadingModal={setLoadingModal}
                        loadingModal={loadingModal}
                        setMode={setMode}
                        setStatusLocal={setStatusLocal}
                    />
        case "cad_clientes":
            return <ModalRequestWrapper
                        request={request}
                        FormComponent={ClientFormManager}
                        mode={mode} 
                        isTheRouteOfChange={isTheRouteOfChange} 
                        setLoadingModal={setLoadingModal}
                        loadingModal={loadingModal}
                        setMode={setMode}
                        setStatusLocal={setStatusLocal}
                    />
        case "cad_fornecedores": 
            return <ModalRequestWrapper
                        request={request}
                        FormComponent={SuppliersFormManager}
                        mode={mode} 
                        isTheRouteOfChange={isTheRouteOfChange} 
                        setLoadingModal={setLoadingModal}
                        loadingModal={loadingModal}
                        setMode={setMode}
                        setStatusLocal={setStatusLocal}
                    />
        case "cad_alteracao": 
            return <ModalRequestWrapper
                        request={request}
                        FormComponent={RequestChangeFormManager}
                        mode={mode} 
                        isTheRouteOfChange={isTheRouteOfChange} 
                        setLoadingModal={setLoadingModal}
                        loadingModal={loadingModal}
                        setMode={setMode}
                        setStatusLocal={setStatusLocal}
                    />
        
        default:
            return (
                <div className="text-sm text-muted-foreground italic">
                    Tipo de solicitação não suportado: {request.tipo}
                </div>
            );
    }
};


