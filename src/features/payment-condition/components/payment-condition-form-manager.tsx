import { Button, FormLayout, FormSection, Input, LoadingModal, SubTitleForm, Toastify } from "@/components";
import { IPaymentCondition, IPaymentConditionRegister } from "../interface/payment-condition";
import { updatePaymentConditionService } from "../service/update-payment-condition.service";
import { updateRequestService } from "@/services/supabase/update-request.service";
import { PaymentConditionSchema } from "../schema/payment-condition.shema";
import { FormStateType, StatusRequest } from "@/interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { formatText, handleApiError } from "@/utils";
import { useForm } from "react-hook-form";
import { AuthContext, ModalContext} from "@/context";
import {
    Landmark as TitleFormIcon,
    CircleDollarSign as PaymentIcon,
    Banknote as PaymentCoonditionIcon
} from "lucide-react";
import { useContext} from "react";



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
}

export const PaymentConditionFormManager = ({defaultValue, mode, isChange, loadingModal, setReasonFieldReview, reasonFieldReview, setLoadingModal, status, setMode}:PaymentConditionFormManagerProps) => {
    const {user} = useContext(AuthContext);
    const {openModal} = useContext(ModalContext);
    if(loadingModal){
        return <LoadingModal/> 
    }
  
  
    const methods= useForm<IPaymentConditionRegister>({
        defaultValues: defaultValue,
        resolver: yupResolver(PaymentConditionSchema)
    });


    const handleEditRequet = async (data:IPaymentConditionRegister) => {
        console.log(data)
        try {
            setLoadingModal(true);
            await updatePaymentConditionService(defaultValue.id,data);
            await updateRequestService({
                solicitacao_id: defaultValue.id,
                status: status,
                novo_solicitante: {
                    data: formatText(new Date(),"data"),
                    departamento: user?.departaments || 'departamento',
                    nome: user?.fullName || "usuario padrão",
                    operacao: "Editar solicitação"
                }
            })
            Toastify({
                type: "success",
                message: "Solicitação atualizada!"
            })
            setMode("viewing");
        } catch (error) {
            handleApiError(error,"Erro para atualizar a edição");
        } finally {
            setLoadingModal(false);
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

            {mode !== "viewing" &&
                <div className="w-full flex my-2 gap-3 justify-end ">
                    <Button
                        text="Cancelar"
                        variant="secondary"
                        sizeWidth="w-[120px]"
                        onClick={() => setMode("viewing")}
                    />
                    <Button
                        text="Salvar"
                        variant="primary"
                        sizeWidth="w-[120px]"
                        onClick={methods.handleSubmit((validatedData) => {
                                    openModal(
                                        "MANAGER_FORM",
                                        {
                                            message: "Você tem certeza que deseja salvar essa parada?",
                                            onConfirm: () => {
                                                
                                                    handleEditRequet(validatedData as IPaymentConditionRegister);
                                                
                                            },
                                        
                                        }
                                    )
                                })}
                    />
                </div>
            }
        </FormLayout>
        
    );
};