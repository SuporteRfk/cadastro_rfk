import { FormLayout, PageLayout } from "@/components";
import {Banknote as PaymentCoonditionIcon} from "lucide-react";

export const RegisterPaymentCondition = () => {
    return(
        <PageLayout>
            <FormLayout titleForm="Condição de Pagamento" iconForm={PaymentCoonditionIcon}>
         
            </FormLayout>
        </PageLayout>
    );
};