import { IPaymentCondition } from "@/features/payment-condition/interface/payment-condition";
import { IIndirectProducts } from "@/features/indirect-products/interface/indirect-products";
import { IServiceRegistration } from "@/features/service-registration/interface/service";
import { IRequestChange } from "@/features/request-change/interface/request-change";
import { FormStateType, IViewRequest, PfOrPj, StatusRequest } from "@/interfaces";
import { IUnitMeasure } from "@/features/unit-measure/interface/unit-measure";
import { setPjOrPfSuppliers } from "@/features/suppliers/utils/set-pj-or-pf";
import { IPACopacker } from "@/features/pa-copacker/interface/pa-copacker";
import { IPAUnitary } from "@/features/pa-unitary/interface/pa-unitary";
import { IPABurden } from "@/features/pa-burden/interface/pa-burden";
import { ISupplier } from "@/features/suppliers/interface/supplier";
import { IPAThird } from "@/features/pa-third/interface/pa-third";
import { getRequestDetailsService } from "@/services/supabase";
import { IInsumo } from "@/features/insumos/interface/insumos";
import { IClient } from "@/features/client/interface/client";
import { handleApiError, applyMasks } from "@/utils";
import { useEffect, useState } from "react";
import { ReviewProvider } from "@/context";

type EntityTypes =
  | IClient 
  | IPaymentCondition
  | ISupplier
  | IUnitMeasure
  | IInsumo
  | IIndirectProducts
  | IPACopacker
  | IPABurden
  | IPAThird
  | IPAUnitary
  | IRequestChange
  | IServiceRegistration;


type Extended<T> = T & Record<string, any>;


interface ModalRequestWrapperProps{
    FormComponent: React.ComponentType<{
        defaultValue: any;
        mode: FormStateType;
        isChange: boolean;
        loadingModal:boolean;
        setLoadingModal: React.Dispatch<React.SetStateAction<boolean>>;
        status: StatusRequest;
        setMode:React.Dispatch<React.SetStateAction<FormStateType>>
        viewRequestId: number;
        obervationRequest: string | null;
        setStatusLocal: React.Dispatch<React.SetStateAction<StatusRequest>>
    }>;
    request: IViewRequest;
    mode: FormStateType;
    isTheRouteOfChange: boolean;
    setLoadingModal: React.Dispatch<React.SetStateAction<boolean>>;
    loadingModal:boolean;
    setMode:React.Dispatch<React.SetStateAction<FormStateType>>
    setStatusLocal: React.Dispatch<React.SetStateAction<StatusRequest>>
}

export const ModalRequestWrapper = ({FormComponent, request, mode, isTheRouteOfChange, setLoadingModal,loadingModal, setMode, setStatusLocal}:ModalRequestWrapperProps) => {
    
    const [defaultValuesRequest, setDefaultValuesRequest] = useState<Extended<EntityTypes> | null>(null)
    
    const getDetailRequest = async() => {
        try {
            setLoadingModal(true);
            const response = await getRequestDetailsService(request.id_fk, request.tabela_origem);
            let processedResponse = applyMasks(response);
            
            // condição para adicionar no form do fornecedor o tipo de pessoa , na hora da solicitação
            if(request.tabela_origem === "cad_fornecedores"){
                const supplier = processedResponse as ISupplier;
                const typePjOrPf = setPjOrPfSuppliers(supplier.cnpj_cpf);
                
                processedResponse = {
                    ...supplier,
                    fisica_juridica: typePjOrPf
                } as ISupplier & { fisica_juridica: PfOrPj };
            }

            if(request.tabela_origem === "cad_clientes"){
                const client = processedResponse as IClient;
                const hasBillingAddress = client.cep_cobranca !== null;
                processedResponse = {
                    ...client,
                    mesmo_endereco_cobranca:  hasBillingAddress ? "não" : "sim"
                } as IClient & {mesmo_endereco_cobranca: "sim" | "não"}
            }
            setDefaultValuesRequest(processedResponse);
        } catch (error) {
            handleApiError(error, "Erro a buscar detalhes da solicitação")
        }finally {
            setLoadingModal(false);
        }
    }

    useEffect(() => {
        getDetailRequest()
    },[request, mode])


    return(
        <ReviewProvider initialValue={request.motivo_recusa ?? undefined}>
            <FormComponent 
                defaultValue={defaultValuesRequest} 
                mode={mode} 
                isChange={isTheRouteOfChange} 
                loadingModal={loadingModal}
                setLoadingModal={setLoadingModal}
                status={request.status}
                setMode={setMode}
                viewRequestId={request.id}
                obervationRequest={request.observacao}
                setStatusLocal={setStatusLocal}
            />
        </ReviewProvider>
    );
};