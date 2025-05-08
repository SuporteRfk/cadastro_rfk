import { FormLayout, FormSection, Input, InputSelect, PageLayout, SubTitleForm, Toastify, InputWithMask } from "@/components";
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
    Variable as ConversorIcon,
    Group as SubGrupoIcon,
    Vault as ProdutoAlterntivoIcon,
    Building2 as EmpresaIcon,
    Atom as ScientificIcon
} from "lucide-react";
import { Trail } from "@/interfaces";

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
                {/* Sessão do tipo do insumo (familia, grupo e tipo) */}
                <FormSection className="md:mt-3 md:flex-row gap-4">
                     {/* familia do insumo*/}
                     <InputSelect    
                        label="Família do Insumo" 
                        name="codigo_familia"
                        error={methods.formState.errors.codigo_familia?.message} 
                        placeholder="Selecione a família"
                        options={Object.values(FamilyCodeInsumos)}
                        selectLabel="Código da família"
                    />
                    {/* Grupo do insumo */}
                    <InputSelect    
                        label="Grupo do Insumo" 
                        name="codigo_grupo"
                        error={methods.formState.errors.codigo_grupo?.message} 
                        placeholder="Selecione o grupo"
                        options={Object.values(GroupCodeInsumos)}
                        selectLabel="Código do grupo"
                    />
                    {/* Tipo de insumo */}
                    <InputSelect
                        label="Tipo de Insumo"
                        selectLabel="Tipos"
                        options={Object.values(TypeCodeoInsumos)}
                        name="tipo"
                        error={methods.formState.errors.tipo?.message}
                        placeholder="Selecione o tipo"
                    />
                </FormSection>
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
            </FormLayout>
        </PageLayout>
    );
};