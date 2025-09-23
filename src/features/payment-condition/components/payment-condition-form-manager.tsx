import { FormLayout, FormSection, SubTitleForm, FormActionsButtonsRequest, FormObservationDeniedFild } from "@/components/form";
import { IPaymentCondition, IPaymentConditionRegister } from "../interface/payment-condition";
import { updatePaymentConditionService } from "../service/update-payment-condition.service";
import { useEditRequest, useDeniedRequest, useObservationDenied, useReviewRequest } from "@/hooks";
import { Input, LoadingModal, RequestDeniedInfo, SafeReviewField, Toastify } from "@/components";
import { PaymentConditionSchema } from "../schema/payment-condition.shema";
import { FormStateType, StatusRequest } from "@/interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
    Landmark as TitleFormIcon,
    CircleDollarSign as PaymentIcon,
    Banknote as PaymentCoonditionIcon
} from "lucide-react";
import { useReview } from "@/context";




interface PaymentConditionFormManagerProps{
    defaultValue: IPaymentCondition;
    mode: FormStateType;
    loadingModal: boolean;
    setLoadingModal: React.Dispatch<React.SetStateAction<boolean>>;
    status: StatusRequest;
    setMode:React.Dispatch<React.SetStateAction<FormStateType>>
    viewRequestId:number;
    obervationRequest: string | null;
    setStatusLocal: React.Dispatch<React.SetStateAction<StatusRequest>>;
}

export const PaymentConditionFormManager = ({defaultValue, mode, loadingModal, setLoadingModal, status, setMode, viewRequestId, obervationRequest, setStatusLocal}:PaymentConditionFormManagerProps) => {
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
        updateFunction: updatePaymentConditionService,
        setStatusLocal
    })
    
    // Hooks para lidar com negar a solicitação
        const denyRequest = useDeniedRequest(); // salvar no supabase
        const { errorObservation, observationDenied, reset ,setObservationDenied ,validate} = useObservationDenied(); // lidar com a observação, salvar/apagar
    
    //Hook para lidar com o modo de revisão e contexto da revisão para lidar com campos vazios
        const reviewRequest = useReviewRequest(); // salvar no supabase
        const {hasEmptyReasons, setShowError} = useReview(); // funçao para verificar se existem campos vazios no modo revisão

    // Função para saber qual função irá chamar no botão de salvar, dependendo o modo.
    const handleConfirm = async (data: IPaymentConditionRegister) => {
        if(mode === "editing" || mode === "fiscal"){
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
                observation: observationDenied,
                setStatusLocal
            })
            reset();
        } else if (mode === "reviewing"){
            // modo revisão
            if (hasEmptyReasons()) {
                setShowError(true);
                Toastify({
                   type: "warning",
                    message: "Preencha todos os campos de revisão antes de salvar."
                });
                return;
            }
            setShowError(false);
            await reviewRequest({
                setLoadingModal,
                setMode,
                viewRequestId,
                setStatusLocal
            })
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
                <SafeReviewField field="condicao_pagamento" mode={mode || "viewing"}>
                    <Input
                        label="Condição de pagamento" 
                        name="condicao_pagamento"
                        register={methods.register("condicao_pagamento")}
                        error={methods.formState.errors.condicao_pagamento?.message as string | undefined}
                        placeholder="Digite a condição de pagamento"
                        icon={PaymentIcon}
                        readOnly={mode !== "editing"}
                    />
                </SafeReviewField>
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