import { FormLayout, FormProductAttributes, FormProductCategorySelector, FormProductDescription, PageLayout, SubTitleForm, Toastify } from "@/components";
import { FamilyCodeIndirectProducts, TypeCodeIndirectProducts} from "../interface/indirect-products-enum";
import { useGroupSelectorIndirectProduct } from "../hook/use-group-selector-indirect-product";
import { insertIndirectProductsService } from "../service/insert-indirect-products.service";
import { indirectProductsRegisterSchema } from "../schema/indirect-products.schema";
import { IIndirectProductsRegister } from "../interface/indirect-products";
import { PackageCheck as IndirectProductsIcon } from "lucide-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { handleApiError } from "@/utils";
import { useState } from "react";


export const RegisterIndirectProducts = () => {
    const [loading, setLoading] = useState(false);

    const methods = useForm<IIndirectProductsRegister>({
        resolver: yupResolver(indirectProductsRegisterSchema),
    });

    const group = useGroupSelectorIndirectProduct(methods);

   
    const onSubmit = async (data: IIndirectProductsRegister) => {
        try {
            setLoading(true);
            await insertIndirectProductsService(data);
            Toastify({
                type: "success",
                message: "Solicitação realizada com sucesso!",
            });
            methods.reset();
        } catch (error) {
            handleApiError(error, "Erro ao cadastrar produto indireto")
        }finally{
            setLoading(false);
        }
    };

    return(
        <PageLayout>
            <FormLayout 
                titleForm="Produtos Indiretos" 
                iconForm={IndirectProductsIcon} 
                showSector
                loading={loading}
                methods={methods}
                onSubmit={onSubmit}
            >
                <SubTitleForm title="Dados do Produto Indireto"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={IndirectProductsIcon}/>
                
                {/* Sessão de descrição do produto */}
                <FormProductDescription methods={methods} viewKeyUseProduct viewKeyNameScientific={false}/>
                             
                {/* Sessão do tipo, familia e grupo do PA */}
                <FormProductCategorySelector 
                    family={Object.values(FamilyCodeIndirectProducts)}
                    group={Object.values(group)}
                    type={Object.values(TypeCodeIndirectProducts)}
                    methods={methods}
                />

                {/* Sessão de atributos (unidades de medida e ncm) */}
                <FormProductAttributes methods={methods}/>

            </FormLayout>
        </PageLayout>
    );
};