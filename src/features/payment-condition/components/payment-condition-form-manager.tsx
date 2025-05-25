import { FormLayout, FormSection, SubTitleForm, FormActionsButtonsRequest, FormObservationDeniedFild } from "@/components/form";
import { IPaymentCondition, IPaymentConditionRegister } from "../interface/payment-condition";
import { updatePaymentConditionService } from "../service/update-payment-condition.service";
import { useEditRequest, useDeniedRequest, useObservationDenied } from "@/hooks";
import { Input, LoadingModal, RequestDeniedInfo, Toastify } from "@/components";
import { PaymentConditionSchema } from "../schema/payment-condition.shema";
import {  } from "@/components/form/form-actions-buttons-request";
import { FormStateType, StatusRequest } from "@/interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
    Landmark as TitleFormIcon,
    CircleDollarSign as PaymentIcon,
    Banknote as PaymentCoonditionIcon
} from "lucide-react";




interface PaymentConditionFormManagerProps{
    defaultValue: IPaymentCondition;
    mode: FormStateType;
    isChange: boolean;
    loadingModal: boolean;
    setReasonFieldReview:  React.Dispatch<React.SetStateAction<{[key: string]: string;}>>
    reasonFieldReview: {[key: string]: string };
    setLoadingModal: React.Dispatch<React.SetStateAction<boolean>>;
    status: StatusRequest;
    setMode:React.Dispatch<React.SetStateAction<FormStateType>>
    viewRequestId:number;
    obervationRequest: string | null;
}

export const PaymentConditionFormManager = ({defaultValue, mode, isChange, loadingModal, setReasonFieldReview, reasonFieldReview, setLoadingModal, status, setMode, viewRequestId, obervationRequest}:PaymentConditionFormManagerProps) => {
    if(loadingModal){
        return <LoadingModal/> 
    }
  
  
    const methods= useForm<IPaymentConditionRegister>({
        defaultValues: defaultValue,
        resolver: yupResolver(PaymentConditionSchema)
    });


    //Hook para lidar com ediçao do formulário
    const {handleEdit} = useEditRequest<IPaymentConditionRegister>({
        setLoadingModal,
        setMode,
        status,
        viewRequestId,
        updateFunction: updatePaymentConditionService
    })
    
    // Hooks para lidar com negar a solicitação
        const denyRequest = useDeniedRequest(); // salvar no supabase
        const { errorObservation, observationDenied, reset ,setObservationDenied ,validate} = useObservationDenied(); // lidar com a observação, salvar/apagar
        
    // Função para saber qual função irá chamar no botão de salvar, dependendo o modo.
    const handleConfirm = async (data: IPaymentConditionRegister) => {
        if(mode === "editing"){
            await handleEdit(defaultValue.id, data);
        } else if (mode === "denied"){
            if(!validate()){
                Toastify({
                    type: "warning",
                    message:"Informa o motivo"
                })
                return;
            };
            await denyRequest({
                viewRequestId,
                setLoadingModal,
                setMode,
                observation: observationDenied
            })
            reset();
        } else {
            console.warn("Modo não tratado: ", mode)
        }
    };

    
    return(
        <FormLayout 
            methods={methods} 
            loading={loadingModal} 
            titleForm={`Condição de Pagamento - #${defaultValue?.id}`} 
            iconForm={PaymentCoonditionIcon}
            mode={mode}
            showButtonsDefault={false}            
        >
            {/* Sessão para mostrar a obervação quando a solicitação for negada */}
            {(mode === "viewing" && status === StatusRequest.NEGADO && obervationRequest) && (
                <RequestDeniedInfo
                    observation={obervationRequest}
                />
            )}
            
            <SubTitleForm title="Nova Condição de Pagamento"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={TitleFormIcon}/>
            <FormSection className="sm:flex-row gap-4 pb-2">
                <Input
                    label="Condição de pagamento" 
                    name="condicao_pagamento"
                    register={methods.register("condicao_pagamento")}
                    error={methods.formState.errors.condicao_pagamento?.message as string | undefined}
                    placeholder="Digite a condição de pagamento"
                    icon={PaymentIcon}
                    readOnly={mode !== "editing"}
                />
            </FormSection>

            {/* Sessão para informar o motivo que está negando a solicitação */}
            {mode === "denied" && (
                <FormObservationDeniedFild
                    observation={observationDenied}
                    setObservation={setObservationDenied}
                    error={errorObservation}
                />
            )}

            {/* Botões de salvar / cancelar */}
            <FormActionsButtonsRequest
                methods={methods}
                mode={mode}
                setMode={setMode}
                onConfirm={(data) => handleConfirm(data as IPaymentConditionRegister)}
            />
        </FormLayout>
        
    );
};