import { FormLayout, FormSection, Input, InputSelect, PageLayout, SubTitleForm, Toastify, InputWithMask, InputDecimal, FormProductCategorySelector } from "@/components";
import { FamilyCodeInsumos, GroupCodeInsumos , TypeCodeoInsumos } from "../interface/insumos-enum";
import { insertInsumosService } from "../service/insert-insumo.service";
import { insumosRegisterSchema } from "../schema/insumos.schema";
import { IInsumoRegister } from "../interface/insumos";
import { yupResolver } from "@hookform/resolvers/yup";
import { TbNumber as NCMIcon} from "react-icons/tb";
import { useForm } from "react-hook-form";
import { handleApiError } from "@/utils";
import { useState } from "react";
import {
    Droplet as InsumoIcon,
    NotebookText as InsumoSubTitleIcon,
    ClipboardPenLine as DescriptionIcon,
    Computer as CodeSaibIcon,
    Ruler as UnitMeasureIcon,
    Scale as ConverterWeightSubTitleIcon,
    Weight as KgIcon,
    Variable as ConverterIcon,
    Group as GroupIcon,
    Vault as ProductAlternativeIcon,
    Building2 as EnterpriseIcon,
    Atom as ScientificIcon
} from "lucide-react";
import { ConverterType, Trail } from "@/interfaces";

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
                <SubTitleForm title="Dados do Insumo"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={InsumoSubTitleIcon}/>
                {/* sessão da descrição do insumo */}
                <FormSection className="sm:flex-row gap-4">
                    {/* descrição curta */}
                    <Input    
                        label="Descrição Curta" 
                        name="descricao_curta"
                        register={methods.register("descricao_curta")}
                        error={methods.formState.errors.descricao_curta?.message} 
                        placeholder="Descrição breve do insumo"
                        type="text"
                        icon={DescriptionIcon}
                    />
                    
                    {/* Codigo saib */}
                    <Input    
                        label="Código Saib (opcional)" 
                        name="codigo_saib"
                        register={methods.register("codigo_saib")}
                        error={methods.formState.errors.codigo_saib?.message} 
                        placeholder="Código do insumo na saib"
                        type="number"
                        icon={CodeSaibIcon}
                    />
                </FormSection>
             
                {/* Sessão do tipo, familia e grupo do PA */}
                <FormProductCategorySelector 
                    family={Object.values(FamilyCodeInsumos)}
                    group={Object.values(GroupCodeInsumos)}
                    type={Object.values(TypeCodeoInsumos)}
                    methods={methods}
                />
                
                 {/* Sessão da unidades de medida e NCM*/}
                 <FormSection className="md:flex-row gap-1 md:gap-4 md:mt-3">
                    {/* Unidade de medida*/}
                    <Input    
                        label="Unidade de Medida" 
                        name="unidade_medida"
                        register={methods.register("unidade_medida")}
                        error={methods.formState.errors.unidade_medida?.message} 
                        placeholder="Unidade de medida por extenso. Ex: Unidade(UN)"
                        type="text"
                        icon={UnitMeasureIcon}
                    />
                    {/* segunda unidade de medida*/}
                    <Input    
                        label="Segunda unidade de Medida" 
                        name="segunda_unidade_medida"
                        register={methods.register("segunda_unidade_medida")}
                        error={methods.formState.errors.segunda_unidade_medida?.message} 
                        placeholder="Unidade de medida por extenso. Ex: Unidade(UN)"
                        type="text"
                        icon={UnitMeasureIcon}
                    />
                    {/* NCM */}
                    <InputWithMask
                        label="NCM" 
                        name="ncm"
                        maskType="custom"
                        error={methods.formState.errors.ncm?.message} 
                        Icon={NCMIcon}
                        customMask="9999.99.99"
                    />
                 </FormSection>
                 
                 {/* Nome Ciêntifico */}
                 <Input    
                    label="Nome Científico" 
                    name="nome_cientifico"
                    register={methods.register("nome_cientifico")}
                    error={methods.formState.errors.nome_cientifico?.message} 
                    placeholder="Descrição completa do nome nome cientifíco"
                    type="text"
                    icon={ScientificIcon}
                />

                {/* Informações de conversores e peso */}
                <SubTitleForm title="Conversores e Peso"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={ConverterWeightSubTitleIcon}/>
                {/* Sessão dos conversores, peso e rastro */}
                <FormSection className="xl:flex-row gap-1 md:gap-4 md:mt-3">
                    {/* Fator conversor */}
                    <InputDecimal  
                        Icon={ConverterIcon}  
                        name="fator_conversor"
                        label="Fator Conversor" 
                        placeholder="Fator conversor do insumo"
                        error={methods.formState.errors.fator_conversor?.message} 
                    />
                    {/* Tipo de conversor*/}
                    <InputSelect
                        label="Tipo de conversor"
                        selectLabel="Conversores"
                        options={Object.values(ConverterType)}
                        name="tipo_conversor"
                        error={methods.formState.errors.tipo_conversor?.message}
                        placeholder="Selecione o conversor"
                    />
                     {/* peso bruto */}
                    <InputDecimal  
                        Icon={KgIcon}  
                        name="peso_bruto"
                        label="Peso Bruto" 
                        placeholder="Peso Bruto do insumo"
                        error={methods.formState.errors.peso_bruto?.message} 
                    />
                    {/* peso líquido*/}
                    <InputDecimal  
                        Icon={KgIcon}  
                        name="peso_liquido"
                        label="Peso Líquido" 
                        placeholder="Peso Líquido do insumo"
                        error={methods.formState.errors.peso_liquido?.message} 
                    />
                    {/* Rastro */}
                    <InputSelect
                        label="Rastro"
                        selectLabel="Tipo de Rastro"
                        options={Object.values(Trail)}
                        name="rastro"
                        error={methods.formState.errors.rastro?.message}
                        placeholder="Selecione o rastro"
                    />
                </FormSection>

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