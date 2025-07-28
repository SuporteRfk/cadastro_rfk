import { FormLayout, FormProductCategorySelector, FormProductCode, FormPalletizingTrackingConversion, FormProductDescription, FormWeights, Input, PageLayout, SubTitleForm, Toastify, FormProductAttributes } from "@/components";
import { FamilyCodePAThird, GroupCodePAThird , TypeCodePAThird } from "../interface/pa-third-enum";
import { insertPATerceiroService } from "../service/insert-pa-third.service";
import { paThirdRegisterSchema } from "../schema/pa-third.schema";
import { IPAThirdRegister } from "../interface/pa-third";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { handleApiError } from "@/utils";
import { useState } from "react";
import {
    Weight as KgIcon,
    Warehouse as StorageIcon,
    Group as SubGroupIcon,
    Building as PAThirdIcon
} from "lucide-react";
import { FormProductPackagingInfo } from "@/components/form/form-product-packaging-info.components";

export const RegisterPAThird = () => {
    const [loading, setLoading] = useState<boolean>(false);
    
    const methods = useForm<IPAThirdRegister>({
        resolver: yupResolver(paThirdRegisterSchema),
    });
    
    const onSubmit = async (data: IPAThirdRegister) => {
        try {
            setLoading(true);
            await insertPATerceiroService(data);
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
                titleForm="P.A Terceiro" 
                iconForm={PAThirdIcon}
                onSubmit={onSubmit}
                methods={methods}
                loading={loading}
            >
                <SubTitleForm title="Dados do P.A Terceiro"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={PAThirdIcon}/>
                
                {/* Sessão de descrição/nome Científico do P.A */}
                <FormProductDescription methods={methods} viewInstructions/>
             
                {/* Sessão do código saib e código de barras*/}
                <FormProductCode methods={methods} showSecondCodeBar configSecondCodeBar="formPaThird"/>

                {/* Sessão do tipo, familia e grupo do PA */}
                <FormProductCategorySelector 
                    family={Object.values(FamilyCodePAThird)}
                    group={Object.values(GroupCodePAThird)}
                    type={Object.values(TypeCodePAThird)}
                    methods={methods}
                />

                {/* Sessão de atributos (unidades de medida, ncm, sabor, marca, grupo tributário e cest) */}
                <FormProductAttributes methods={methods} showSecondUnitMeasure showFlavorAndMark showCestAndTax/>

                {/* SubGrupo do produto */}
                <Input
                    register={methods.register("sub_grupo")}
                    name="sub_grupo"
                    error={methods.formState.errors.sub_grupo?.message}
                    label="Sub Grupo"
                    type="text"
                    placeholder="Fornecedor de quem compramos"
                    icon={SubGroupIcon}
                />

                {/* Sessão de pesos e medidas */}
                <SubTitleForm title="Peso e Medidas"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={KgIcon}/>
                
                {/* Sessão de Conversor e Rastro */}
                <FormPalletizingTrackingConversion methods={methods} showConverters isPaThird/>

                {/* Sessão Pesos */}
                <FormWeights methods={methods}/>

                {/* Sessão Armazenagem */}
                <SubTitleForm title="Armazenagem e Embalagem"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={StorageIcon}/>
                <FormProductPackagingInfo methods={methods} valueInitialStorage="055 - REVENDA"/>
                
            </FormLayout>
        </PageLayout>
    );
};