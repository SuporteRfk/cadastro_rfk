import { FormLayout, PageLayout } from "@/components";
import {Users as UsersIcon} from "lucide-react";

export const RegisterClientPage = () => {
    return(
        <PageLayout>
            <FormLayout titleForm="Cadastro de Cliente" iconForm={UsersIcon}>
         
            </FormLayout>
        </PageLayout>
    );
};