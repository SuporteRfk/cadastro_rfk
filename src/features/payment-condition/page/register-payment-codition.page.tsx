import { FormLayout, FormSection, Input, PageLayout, SubTitleForm, Toastify } from "@/components";
import { IPaymentConditionRegister } from "../interface/payment-condition";
import { PaymentConditionSchema } from "../schema/payment-condition.shema";
import {Banknote as PaymentCoonditionIcon} from "lucide-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
    Landmark as TitleFormIcon,
    CircleDollarSign as PaymentIcon
} from "lucide-react";
import { useState } from "react";
import { insertPaymentConditionService } from "../service/insert-payment-condition.service";
import { handleApiError } from "@/utils";


export const RegisterPaymentCondition = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const methods= useForm<IPaymentConditionRegister>({
        resolver: yupResolver(PaymentConditionSchema),       
    });

  

    const onSubmit = async (data: IPaymentConditionRegister) => {
        try {
            setLoading(true)
            await insertPaymentConditionService(data);
            Toastify({
                type: "success",
                message: "Solicitação realizado com sucesso!"
            })
            methods.reset()
        } catch (error) {
            handleApiError(error, 'Erro ao cadastrar condição de pagamento') 
        } finally { 
            setLoading(false)
        }
    }

    return(
        <PageLayout>
            <FormLayout 
                titleForm="Condição de Pagamento" 
                iconForm={PaymentCoonditionIcon} 
                methods={methods}
                onSubmit={onSubmit}
                loading={loading}
            >
                <SubTitleForm title="Nova Condição de Pagamento"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={TitleFormIcon}/>
                 <FormSection className="sm:flex-row gap-4">
                    <Input
                        label="Condição de pagamento" 
                        name="condicao_pagamento"
                        register={methods.register("condicao_pagamento")}
                        error={methods.formState.errors.condicao_pagamento?.message as string | undefined}
                        placeholder="Digite a condição de pagamento"
                        icon={PaymentIcon}
                    />
                 </FormSection>
            </FormLayout>
        </PageLayout>
    );
};