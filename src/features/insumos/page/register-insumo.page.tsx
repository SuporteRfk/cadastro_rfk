import { FormLayout, FormSection, Input, InputSelect, PageLayout, SubTitleForm, Toastify, FormPalletizingTrackingConversion, InputDecimal, FormProductCategorySelector, FormProductDescription, FormProductCode, FormWeights, FormProductAttributes } from "@/components";
import { FamilyCodeInsumos, GroupCodeInsumos , TypeCodeoInsumos } from "../interface/insumos-enum";
import { insertInsumosService } from "../service/insert-insumo.service";
import { insumosRegisterSchema } from "../schema/insumos.schema";
import { IInsumoRegister } from "../interface/insumos";
import { yupResolver } from "@hookform/resolvers/yup";
import { ConverterType } from "@/interfaces";
import { useForm } from "react-hook-form";
import { handleApiError } from "@/utils";
import { useState } from "react";
import {
    Droplet as InsumoIcon,
    NotebookText as InsumoSubTitleIcon,
    Scale as ConverterWeightSubTitleIcon,
    Group as GroupIcon,
    Vault as ProductAlternativeIcon,
    Building2 as EnterpriseIcon,
    Variable as ConverterIcon,
} from "lucide-react";


export const RegisterInsumo = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const methods = useForm<IInsumoRegister>({
        resolver: yupResolver(insumosRegisterSchema)
    });

    const onSubmit = async (data: IInsumoRegister) => {
        try {
            setLoading(true)
            await insertInsumosService(data);
            Toastify({
                type: "success",
                message: "Solicitação realizado com sucesso!"
            })
            methods.reset()
        } catch (error) {
            handleApiError(error, 'Erro ao cadastrar insumo') 
        } finally { 
            setLoading(false)
        }
    };

    return(
        <PageLayout>
            <FormLayout 
                titleForm="Insumos" 
                iconForm={InsumoIcon} 
                loading={loading}
                onSubmit={onSubmit}
                methods={methods}
            >
                {/* Sessão dos dados do insumo */}
                <SubTitleForm title="Dados do Insumo"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={InsumoSubTitleIcon}/>
                
                {/* sessão da descrição do insumo e nome Científico*/}
                <FormProductDescription methods={methods}/>
                
             
                {/* Sessão do tipo, familia e grupo do PA */}
                <FormProductCategorySelector 
                    family={Object.values(FamilyCodeInsumos)}
                    group={Object.values(GroupCodeInsumos)}
                    type={Object.values(TypeCodeoInsumos)}
                    methods={methods}
                />
                {/* Sessão de atributos (unidades de medida e ncm) */}
                <FormProductAttributes methods={methods} showSecondUnitMeasure/>
                 
                {/* Sessão do código saib */}
                <FormProductCode methods={methods} showOnlyCodeSaib/>

                {/* Titulo - Conversores e peso */}
                <SubTitleForm title="Conversores e Peso"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={ConverterWeightSubTitleIcon}/>
                
                {/* Sessão dos conversores e rastro */}
                <FormPalletizingTrackingConversion methods={methods} showConverters/>

                {/* Sessão Pesos */}
                <FormWeights methods={methods}/>

                {/* Informações de subgrupo */}
                <SubTitleForm title="SubGrupo e produto alternativo"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={GroupIcon}/>
                
                
                {/* SubGrupo */}
                <Input    
                    label="Sub Grupo" 
                    name="subgrupo"
                    register={methods.register("subgrupo")}
                    error={methods.formState.errors.subgrupo?.message} 
                    placeholder="Preencher no caso de rótulos ou preformas"
                    type="text"
                    icon={GroupIcon}
                />

                {/* Sessão de produto alternativo e empresa */}
                <FormSection className="xl:flex-row gap-1 md:gap-4 md:mt-3">
                    {/* Produto alternativo*/}
                    <Input    
                        label="Alternativo" 
                        name="alternativo_produto"
                        register={methods.register("alternativo_produto")}
                        error={methods.formState.errors.alternativo_produto?.message} 
                        placeholder="Produto alternativo"
                        type="text"
                        icon={ProductAlternativeIcon}
                    />
                    {/* empresa */}
                    <Input    
                        label="Empresa" 
                        name="empresa"
                        register={methods.register("empresa")}
                        error={methods.formState.errors.empresa?.message} 
                        placeholder="Preencher caso exista produto alternativo"
                        type="text"
                        icon={EnterpriseIcon}
                    />
                </FormSection>
                
                {/* Fator e Tipo de conversor alternativo*/}
                <FormSection className="xl:flex-row gap-1 md:gap-4 md:mt-3">
                    {/* Fator conversor alternativo |factor converter alternative*/}
                    <InputDecimal  
                        Icon={ConverterIcon}  
                        name="fator_conversor_alternativo"
                        label="Fator do produto alternativo" 
                        placeholder="Fator conversor alternativo"
                        error={methods.formState.errors.fator_conversor_alternativo?.message} 
                    />
                    {/* Tipo de conversor alternativo |Type converter alternative*/}
                    <InputSelect
                        label="Conversor do produto alternativo"
                        selectLabel="Conversores"
                        options={Object.values(ConverterType)}
                        name="tipo_conversor_alternativo"
                        error={methods.formState.errors.tipo_conversor_alternativo?.message}
                        placeholder="Selecione o conversor"
                    />
                </FormSection>
            </FormLayout>
        </PageLayout>
    );
};