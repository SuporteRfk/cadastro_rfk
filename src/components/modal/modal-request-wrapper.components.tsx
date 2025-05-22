import { IPaymentCondition } from "@/features/payment-condition/interface/payment-condition";
import { IIndirectProducts } from "@/features/indirect-products/interface/indirect-products";
import { IUnitMeasure } from "@/features/unit-measure/interface/unit-measure";
import { IPACopacker } from "@/features/pa-copacker/interface/pa-copacker";
import { FormStateType, IViewRequest, StatusRequest } from "@/interfaces";
import { IPAUnitary } from "@/features/pa-unitary/interface/pa-unitary";
import { IPABurden } from "@/features/pa-burden/interface/pa-burden";
import { ISupplier } from "@/features/suppliers/interface/supplier";
import { IPAThird } from "@/features/pa-third/interface/pa-third";
import { getRequestDetailsService } from "@/services/supabase";
import { IInsumo } from "@/features/insumos/interface/insumos";
import { IClient } from "@/features/client/interface/client";
import { handleApiError, applyMasks } from "@/utils";
import { useEffect, useState } from "react";


interface ModalRequestWrapperProps{
    FormComponent: React.ComponentType<{
        defaultValue: any;
        mode: FormStateType;
        isChange: boolean;
        loadingModal:boolean;
        setReasonFieldReview:  React.Dispatch<React.SetStateAction<{[key: string]: string;}>>
        reasonFieldReview: {[key: string]: string };
        setLoadingModal: React.Dispatch<React.SetStateAction<boolean>>;
        status: StatusRequest;
        setMode:React.Dispatch<React.SetStateAction<FormStateType>>
        viewRequestId: number;
    }>;
    request: IViewRequest;
    mode: FormStateType;
    isTheRouteOfChange: boolean;
    setLoadingModal: React.Dispatch<React.SetStateAction<boolean>>;
    loadingModal:boolean;
    setMode:React.Dispatch<React.SetStateAction<FormStateType>>
}

export const ModalRequestWrapper = ({FormComponent, request, mode, isTheRouteOfChange, setLoadingModal,loadingModal, setMode}:ModalRequestWrapperProps) => {
    
    const [defaultValuesRequest, setDefaultValuesRequest] = useState<
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
            | null
    >(null);

    const [reasonFieldReview, setReasonFieldReview] = useState<{ [key: string]: string }>(request.motivo_recusa ? request.motivo_recusa : {});

    const getDetailRequest = async() => {
        try {
            setLoadingModal(true);
            const response = await getRequestDetailsService(request.id_fk, request.tabela_origem);
            const processedResponse = applyMasks(response);
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
        <FormComponent 
            defaultValue={defaultValuesRequest} 
            mode={mode} 
            isChange={isTheRouteOfChange} 
            loadingModal={loadingModal}
            setReasonFieldReview={setReasonFieldReview}
            reasonFieldReview={reasonFieldReview}
            setLoadingModal={setLoadingModal}
            status={request.status}
            setMode={setMode}
            viewRequestId={request.id}
        />
    );
};