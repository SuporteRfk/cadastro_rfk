import { IPaymentCondition, IPaymentConditionRegister } from "../interface/payment-condition";
import { updatePaymentConditionService } from "../service/update-payment-condition.service";
import { FormActionsButtonsRequest } from "@/components/form/form-actions-buttons-request";
import { FormLayout, FormSection, Input, LoadingModal, SubTitleForm } from "@/components";
import { PaymentConditionSchema } from "../schema/payment-condition.shema";
import { useEditRequest } from "@/hooks/use-edit-request.hooks";
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
}

export const PaymentConditionFormManager = ({defaultValue, mode, isChange, loadingModal, setReasonFieldReview, reasonFieldReview, setLoadingModal, status, setMode, viewRequestId}:PaymentConditionFormManagerProps) => {
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
    


    
    return(
        <FormLayout 
            methods={methods} 
            loading={loadingModal} 
            titleForm={`Condição de Pagamento - #${defaultValue?.id}`} 
            iconForm={PaymentCoonditionIcon}
            mode={mode}
            showButtonsDefault={false}            
        >
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

            {/* Botões de salvar / cancelar */}
            <FormActionsButtonsRequest
                methods={methods}
                mode={mode}
                setMode={setMode}
                onConfirm={(data) => handleEdit(defaultValue.id, data as IPaymentConditionRegister)}
            />
        </FormLayout>
        
    );
};