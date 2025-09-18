import { FormLayout, PageLayout, FormProductPackagingInfo, Toastify, SubTitleForm, FormProductCategorySelector, FormProductDescription, FormProductCode, FormValidity, FormWeights, FormPalletizingTrackingConversion, FormProductDimensions, FormProductAttributes, FormProductContainer } from "@/components";
import { FamilyCodePABurden, GroupCodePABurden, TypeCodeoPABurden } from "../interface/pa-burden-enum";
import { insertPABurdenService } from "../service/insert-pa-burden.service";
import { paBurdenRegisterSchema } from "../schema/pa-burden.schema";
import { IPABurdenRegister } from "../interface/pa-burden";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { handleApiError } from "@/utils";
import { useState } from "react";
import {
    Boxes as BurdenIcon,
    Weight as KgIcon,
    Warehouse as StorageIcon,
    Clock as ValidityIcon,
} from "lucide-react";

export const RegisterPABurden = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const methods = useForm<IPABurdenRegister>({
        resolver: yupResolver(paBurdenRegisterSchema)
    });

    const onSubmit = async (data:IPABurdenRegister) => {
        try {
            setLoading(true);
            await insertPABurdenService(data);
            Toastify({
                type: "success",
                message: "Solicitação realizada com sucesso!"
            })
            methods.reset();
        } catch (error) {
            handleApiError(error, "Erro ao cadastrar p.a fardo")
        }finally{
            setLoading(false)
        }
    };

    return(
        <PageLayout>
            <FormLayout 
                titleForm="P.A Fardo" 
                iconForm={BurdenIcon}
                loading={loading}
                methods={methods}
                onSubmit={onSubmit}
            >
                <SubTitleForm title="Dados do P.A Fardo"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={BurdenIcon}/>
                {/* Sessão de descrição do P.A */}
                <FormProductDescription methods={methods} />

                {/* Sessão do código saib e códigos de barras */}
                <FormProductCode methods={methods} showSecondCodeBar configSecondCodeBar="formPABurden"/>

                {/* Sessão do tipo, familia e grupo do PA */}
                <FormProductCategorySelector 
                    family={Object.values(FamilyCodePABurden)}
                    group={Object.values(GroupCodePABurden)}
                    type={Object.values(TypeCodeoPABurden)}
                    methods={methods}
                />
           
                {/* Sessão de atributos (unidades de medida, ncm, sabor, marca, grupo tributário e cest) */}
                <FormProductAttributes methods={methods} showFlavorAndMark showCestAndTax labelMarkAndFlavor="Fardo"/>

                {/* Sessão de Peso e Medidas */}
                <SubTitleForm title="Peso e Medidas"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={KgIcon}/>
                
                {/* Sessão de paletizao, rastro e lastro */}
                <FormPalletizingTrackingConversion methods={methods} showConverters={false}/>

                {/* Sessão Pesos */}
                <FormWeights methods={methods}/>

                {/* Sessão de dimenssões (peso, altura e largura) */}
                <FormProductDimensions methods={methods} configSecondDimensions="formPABurden"/>
                
                {/* Sessão Armazenagem */}
                <SubTitleForm title="Armazenagem e Embalagem"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={StorageIcon}/>
                <FormProductPackagingInfo methods={methods}/>
                
                {/* Vasilhame/Garrafeira e categoria de embalagem */}
                <FormProductContainer methods={methods}/>

                {/* Sessão Validade */}
                <SubTitleForm title="Validade e Lote"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={ValidityIcon}/>
                <FormValidity methods={methods}/>

            </FormLayout>
        </PageLayout>
    );
};