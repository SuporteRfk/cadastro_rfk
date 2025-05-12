import { FormLayout, FormProductCategorySelector, FormProductCode, FormProductPackagingInfo, FormProductDescription, FormValidity, PageLayout, SubTitleForm, Toastify, FormWeights, FormPalletizingTrackingConversion, FormProductDimensions, FormProductAttributes } from "@/components";
import { FamilyCodePAUnitary, GroupCodePAUnitary, TypeCodeoPAUnitary } from "../interface/pa-unitary-enum";
import { insertPAUnitaryService } from "../service/insert-pa-unitary.service";
import { paUnitaryRegisterSchema } from "../schema/pa-unitary.schema";
import { IPAUnitaryRegister } from "../interface/pa-unitary";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { handleApiError } from "@/utils";
import {
    Box as UnitaryIcon,
    Warehouse as StorageIcon,
    Weight as KgIcon,
    Clock as ValidityIcon,
} from "lucide-react";
import { useState } from "react";

export const RegisterPAUnitary = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const methods = useForm<IPAUnitaryRegister>({
        resolver: yupResolver(paUnitaryRegisterSchema)
    });

    const onSubmit = async (data:IPAUnitaryRegister) => {
        try {
            setLoading(true);
            await insertPAUnitaryService(data);
            Toastify({
                type: "success",
                message: "Solicitação realizada com sucesso"
            });
            methods.reset();
        } catch (error) {
            handleApiError(error, "Erro ao cadastrar produto unitário");
        }finally {
            setLoading(false);
        }
    };

    return(
        <PageLayout>
            <FormLayout 
                titleForm="P.A Unitário" 
                iconForm={UnitaryIcon}
                methods={methods}
                loading={loading}
                onSubmit={onSubmit}
            >
                <SubTitleForm title="Dados do P.A Unitário"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={UnitaryIcon}/>
                {/* Sessão de descrição do P.A */}
                <FormProductDescription methods={methods}/>
                
                {/* Sessão do código de barras e código saib */}
                <FormProductCode methods={methods} showSecondCodeBar configSecondCodeBar="formPaUnitary"/>

                {/* Sessão do tipo, grupo e família */}
                <FormProductCategorySelector 
                    methods={methods} 
                    family={Object.values(FamilyCodePAUnitary)}
                    group={Object.values(GroupCodePAUnitary)}
                    type={Object.values(TypeCodeoPAUnitary)}
                />
                
                {/* Sessão de atributos (unidades de medida, ncm, sabor, marca, grupo tributário e cest) */}
                <FormProductAttributes methods={methods} showFlavorAndMark showCestAndTax labelMarkAndFlavor="Unitário"/>

                {/* Sessão de Peso e Medidas */}
                <SubTitleForm title="Peso e Medidas"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={KgIcon}/>
                
                {/* Sessão de paletizao, rastro e lastro */}
                <FormPalletizingTrackingConversion methods={methods} showConverters={false}/>

                {/* Sessão Pesos */}
                <FormWeights methods={methods}/>

                {/* Sessão de dimenssões (peso, altura e largura) */}
                <FormProductDimensions methods={methods} configSecondDimensions="formPaUnitary"/>

                {/* Sessão Armazenagem */}
                <SubTitleForm title="Armazenagem e Embalagem"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={StorageIcon}/>
                <FormProductPackagingInfo methods={methods}/>

                {/* Sessão Validade */}
                <SubTitleForm title="Validade e Lote"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={ValidityIcon}/>
                <FormValidity methods={methods}/>
                     
            </FormLayout>
        </PageLayout>
    );
};