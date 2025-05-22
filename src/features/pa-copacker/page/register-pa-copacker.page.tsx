import { FormLayout, FormProductCategorySelector, FormProductCode, FormPalletizingTrackingConversion, FormProductDescription, FormWeights, PageLayout, SubTitleForm, Toastify, FormProductDimensions, FormProductAttributes } from "@/components";
import { FamilyCodePACopacker, GroupCodePACopacker , TypeCodeoPACopacker } from "../interface/pa-copacker-enum";
import { insertPACopackerService } from "../service/insert-pa-copacker.service";
import { paCopackerRegisterSchema } from "../schema/pa-copacker.schema";
import { IPACopackerRegister } from "../interface/pa-copacker";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { handleApiError } from "@/utils";
import { useState } from "react";
import {
    Weight as KgIcon,
    Warehouse as StorageIcon,
    PackageOpen as PAIcon
} from "lucide-react";
import { FormProductPackagingInfo } from "@/components/form/form-product-packaging-info.components";

export const RegisterPACopacker = () => {
    const [loading, setLoading] = useState<boolean>(false);


    const methods = useForm<IPACopackerRegister>({
        resolver: yupResolver(paCopackerRegisterSchema),
    });

    const onSubmit = async (data: IPACopackerRegister) => {
        try {
            setLoading(true);
            await insertPACopackerService(data);
            Toastify({
                type: "success",
                message: "Solicitação realizado com sucesso",
            })
            methods.reset();
        } catch (error) {
            handleApiError(error, "Erro ao registar o copacker")
        }finally{
            setLoading(false);
        }
    };

    return(
        <PageLayout>
            <FormLayout 
                titleForm="P.A Copacker" 
                iconForm={PAIcon}
                methods={methods}
                loading={loading}
                onSubmit={onSubmit}
            >
                <SubTitleForm title="Dados do P.A Copacker"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={PAIcon}/>
                
                {/* Sessão de descrição/nome Científico do P.A */}
                <FormProductDescription methods={methods} />

                {/* Sessão do código saib e código de barras*/}
                <FormProductCode methods={methods} />

                {/* Sessão do tipo, familia e grupo do PA */}
                <FormProductCategorySelector 
                    family={Object.values(FamilyCodePACopacker)}
                    group={Object.values(GroupCodePACopacker)}
                    type={Object.values(TypeCodeoPACopacker)}
                    methods={methods}
                />

                {/* Sessão de atributos (unidades de medida, ncm, sabor, marca, grupo tributário e cest) */}
                <FormProductAttributes methods={methods} showFlavorAndMark showCestAndTax labelMarkAndFlavor="Copacker"/>

                {/* Sessão de Peso e Medidas */}
                <SubTitleForm title="Peso e Medidas"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={KgIcon}/>
               
                {/* Sessão de paletizao, rastro e lastro */}
                <FormPalletizingTrackingConversion methods={methods} showConverters={false}/>

                {/* Sessão Pesos */}
                <FormWeights methods={methods}/>
                
                {/* Sessão de dimenssões (peso, altura e largura) */}
                <FormProductDimensions methods={methods} configSecondDimensions="formCopacker"/>
                               
                {/* Sessão Armazenagem */}
                <SubTitleForm title="Armazenagem e Embalagem"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={StorageIcon}/>
                <FormProductPackagingInfo methods={methods}/>
                
            </FormLayout>
        </PageLayout>
    );
};