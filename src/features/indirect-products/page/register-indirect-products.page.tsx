import { FormLayout, PageLayout } from "@/components";
import { PackageCheck as IndirectProductsIcon } from "lucide-react";

export const RegisterIndirectProducts = () => {
    return(
        <PageLayout>
            <FormLayout titleForm="Produtos Indiretos" iconForm={IndirectProductsIcon} showSector>
         
            </FormLayout>
        </PageLayout>
    );
};