import { FormBusinessNames, FormLayout, FormRegistrationIdentification, FormTaxIdentification, FormTelephone, PageLayout, SubTitleForm, Toastify } from "@/components";
import { insertSupplierService } from "../service/insert-supplier.service";
import { SupplierTpj, SupplierType } from "../interface/supplier-enum";
import { supplierRegisterSchema } from "../schema/supplier.schema";
import { ISupplierRegisterForm } from "../interface/supplier";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { handleApiError } from "@/utils";
import { useState } from "react";
import {
    MapPinned as ZipCodeIcon,
     Factory as SuppliersIcon
} from "lucide-react";
import { FormAddress } from "@/components/form/form-address.components";

export const RegisterSupplier = () => {
    const [loading, setLoading] = useState<boolean>(false);
    
    const methods = useForm<ISupplierRegisterForm>({
        resolver: yupResolver(supplierRegisterSchema)
    });

    const onSubmit = async (data:ISupplierRegisterForm) => {
        const {fisica_juridica, ...dataRegister} = data;
        try {
            setLoading(true);
            await insertSupplierService(dataRegister);
            Toastify({
                type: "success",
                message: "Solicitação realizada com sucesso"
            })
            methods.reset();
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
               {/* SubTitulo Dados do fornecedor */}
               <SubTitleForm title="Dados do Fornecedor"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={SuppliersIcon}/>
               
               {/* Sessão de Identificação do cliente (CNPJ/CPF, tipo do cliente)*/}
               <FormRegistrationIdentification 
                    methods={methods} 
                    typeForm="supplier" 
                    setLoading={setLoading}
                    optionsForType={Object.values(SupplierType)}
                />
               
                {/* Sessão de razão social e nome fantasia */}
                <FormBusinessNames methods={methods}/>

                {/* Sessão de identificação jurifica (CNAE, I.E, OPTANTE e Email do cliente) */}
                <FormTaxIdentification 
                    methods={methods} 
                    optionsTpj={Object.values(SupplierTpj)}
                    typeForm="supplier"
                />
                
                {/* Sessão telefones */}
                <FormTelephone methods={methods}/>
                
                {/* SubTitulo Endereço */}
                <SubTitleForm title="Endereço"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={ZipCodeIcon}/>
                {/* Sessão endereço */}
                <FormAddress methods={methods} setLoading={setLoading} />
            </FormLayout>
        </PageLayout>
    );
};