import { FormLayout, PageLayout, Toastify } from "@/components";
import { insertSupplierService } from "../service/insert-supplier.service";
import { SupplierTpj, SupplierType } from "../interface/supplier-enum";
import { supplierRegisterSchema } from "../schema/supplier.schema";
import { ISupplierRegister } from "../interface/supplier";
import { Factory as SuppliersIcon} from "lucide-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { handleApiError } from "@/utils";
import { useState } from "react";

export const RegisterSupplier = () => {
    const [loading, setLoading] = useState<boolean>(false);
    
    const methods = useForm<ISupplierRegister>({
        resolver: yupResolver(supplierRegisterSchema)
    });

    const onSubmit = async (data:ISupplierRegister) => {
        try {
            setLoading(true);
            await insertSupplierService(data);
            Toastify({
                type: "success",
                message: "Solicitação realizada com sucesso"
            })
        } catch (error) {
            handleApiError(error, "Erro ao cadastrar fornecedor")
        } finally {
            setLoading(false);
        }
    };
    
    return(
        <PageLayout>
            <FormLayout 
                titleForm="Fornecedores" 
                iconForm={SuppliersIcon}
                loading={loading}
                onSubmit={onSubmit}
                methods={methods}
            >
                aoba
            </FormLayout>
        </PageLayout>
    );
};