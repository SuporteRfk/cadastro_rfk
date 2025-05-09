import { FormLayout, FormSection, Input, InputDecimal, InputSelect, InputWithMask, PageLayout, SubTitleForm, Toastify } from "@/components";
import { FamilyCodePACopacker, GroupCodePACopacker , TypeCodeoPACopacker } from "../interface/pa-copacker-enum";
import { insertPACopackerService } from "../service/insert-pa-copacker.service";
import { paCopackerRegisterSchema } from "../schema/pa-copacker.schema";
import { IPACopackerRegister } from "../interface/pa-copacker";
import { MdPallet as PalletIcon } from "react-icons/md";
import { yupResolver } from "@hookform/resolvers/yup";
import { TbNumber as NCMIcon} from "react-icons/tb";
import {PackageOpen as PAIcon} from "lucide-react";
import { useForm } from "react-hook-form";
import { handleApiError } from "@/utils";
import { Trail } from "@/interfaces";
import { useState } from "react";
import {
    ClipboardPenLine as DescriptionIcon,
    Computer as CodeSaibIcon,
    Ruler as UnitMeasureIcon,
    Weight as KgIcon,
    Landmark as TaxIcon,
    Cherry as FlavorIcon,
    Crown as MarkIcon,
    Layers as BallastIcon,
    Atom as ScientificIcon,
    Barcode as CodeBarIcon,
    Move3D as DepthIcon,
    MoveHorizontal as WidthIcon,
    MoveVertical as HeightIcon,
    Warehouse as StorageIcon,
    Box as packagingTypeIcon,
    Expand as packagingSizeIcon
} from "lucide-react";

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
                
                {/* Sessão de descrição do P.A */}
                <FormSection className="sm:flex-row gap-4 w-full">
                    {/* Descrição */}
                    <Input    
                        label="Descrição Curta" 
                        name="descricao_curta"
                        register={methods.register("descricao_curta")}
                        error={methods.formState.errors.descricao_curta?.message} 
                        placeholder="Descrição breve do copacker"
                        type="text"
                        icon={DescriptionIcon}
                    />
                    {/* Codigo de barras*/}
                    <Input    
                        label="Código de barras GTIN" 
                        name="codigo_barras"
                        register={methods.register("codigo_barras")}
                        error={methods.formState.errors.codigo_barras?.message} 
                        placeholder="Insira o código de barras da nota fiscal"
                        type="number"
                        icon={CodeBarIcon}
                    />
                </FormSection>

                {/* Nome Cientifico*/}
                <Input    
                    label="Nome Científico" 
                    name="nome_cientifico"
                    register={methods.register("nome_cientifico")}
                    error={methods.formState.errors.nome_cientifico?.message} 
                    placeholder="Descrição completa do nome nome cientifíco"
                    type="text"
                    icon={ScientificIcon}
                />

                {/* Sessão do tipo, familia e grupo do PA */}
                <FormSection className="mt-2 md:mt-3 md:flex-row gap-4">
                    {/* Familia */}
                    <InputSelect
                        label="Família do Copacker" 
                        name="codigo_familia"
                        error={methods.formState.errors.codigo_familia?.message} 
                        placeholder="Selecione a família"
                        options={Object.values(FamilyCodePACopacker)}
                        selectLabel="Código da família"
                    />
                    {/* Grupo */}
                    <InputSelect
                        label="Grupo do Copacker" 
                        name="codigo_grupo"
                        error={methods.formState.errors.codigo_grupo?.message} 
                        placeholder="Selecione o grupo"
                        options={Object.values(GroupCodePACopacker)}
                        selectLabel="Código do grupo"
                    />
                    {/* Tipo */}
                    <InputSelect
                        label="Tipo de Copacker"
                        selectLabel="Tipos"
                        options={Object.values(TypeCodeoPACopacker)}
                        name="tipo"
                        error={methods.formState.errors.tipo?.message}
                        placeholder="Selecione o tipo"
                    />
                </FormSection>

                {/* Sessão de Medida, Marcar e Sabor */}
                <FormSection className="mt-2 md:mt-3 md:flex-row gap-4">
                    {/* Unidade de medida */}
                    <Input    
                        label="Unidade de Medida" 
                        name="unidade_medida"
                        register={methods.register("unidade_medida")}
                        error={methods.formState.errors.unidade_medida?.message} 
                        placeholder="Unidade de medida por extenso. Ex: Unidade(UN)"
                        type="text"
                        icon={UnitMeasureIcon}
                    />
                    {/* Sabor */}
                    <Input    
                        label="Sabor do PA Copacker" 
                        name="sabor"
                        register={methods.register("sabor")}
                        error={methods.formState.errors.sabor?.message} 
                        placeholder="Por favor, insira o sabor"
                        type="text"
                        icon={FlavorIcon}
                    />
                    {/* Marca*/}
                    <Input    
                        label="Marca do PA Copacker" 
                        name="marca"
                        register={methods.register("marca")}
                        error={methods.formState.errors.marca?.message} 
                        placeholder="Por favor, insira a marca"
                        type="text"
                        icon={MarkIcon}
                    />
                </FormSection>

                {/* Sessão de códigos tributários e código do saib */}
                <FormSection className="mt-2 md:mt-3 md:flex-row gap-4">
                    {/* NCM */}
                    <InputWithMask   
                        label="NCM" 
                        name="ncm"
                        maskType="custom"
                        error={methods.formState.errors.ncm?.message} 
                        Icon={NCMIcon}
                        customMask="9999.99.99"   
                    />
                    {/* CEST */}
                    <InputWithMask   
                        label="CEST" 
                        name="cest"
                        maskType="custom"
                        error={methods.formState.errors.cest?.message} 
                        Icon={NCMIcon}
                        customMask="99.999.99"   
                    />
                    {/* Grupo Tributário */}
                    <Input    
                        label="Grupo Tributário" 
                        name="grupo_tributario"
                        register={methods.register("grupo_tributario")}
                        error={methods.formState.errors.grupo_tributario?.message} 
                        placeholder="Insira o grupo tributário do produto"
                        type="number"
                        icon={TaxIcon}
                    />
                    {/* codido saib */}
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

                {/* Sessão de Peso e Medidas */}
                <SubTitleForm title="Peso e Medidas"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={KgIcon}/>
                <FormSection className="mt-2 md:mt-3 md:flex-row gap-4">
                    {/* paletizacao | palletizing */}
                    <Input    
                        label="Paletização" 
                        name="paletizacao"
                        register={methods.register("paletizacao")}
                        error={methods.formState.errors.paletizacao?.message} 
                        placeholder="Informe a paletização"
                        type="number"
                        icon={PalletIcon}
                    />
                    {/* lastro | ballast*/}
                    <Input    
                        label="Lastro" 
                        name="lastro"
                        register={methods.register("lastro")}
                        error={methods.formState.errors.lastro?.message} 
                        placeholder="Informe o lastro"
                        type="number"
                        icon={BallastIcon}
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

                {/* Sessão Pesos */}
                <FormSection className="mt-2 md:mt-3 md:flex-row gap-4">
                    {/* Peso Bruto */}
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
                </FormSection>
                
                {/* Profundidade, Largura e Altura */}
                <FormSection className="sm:flex-row gap-4 w-full">
                    {/* Profundidade */}
                    <InputDecimal  
                        Icon={DepthIcon}  
                        name="profundidade_fardo"
                        label="Profundidade do fardo" 
                        placeholder="Medida da profundidade do fardo"
                        error={methods.formState.errors.profundidade_fardo?.message} 
                    />
                    {/* Largura */}
                    <InputDecimal  
                        Icon={WidthIcon}  
                        name="largura_fardo"
                        label="Largura do fardo" 
                        placeholder="Medida da largura do fardo"
                        error={methods.formState.errors.largura_fardo?.message} 
                    />
                    {/* Altura */}
                    <InputDecimal  
                        Icon={HeightIcon}  
                        name="altura_fardo"
                        label="Medida da altura do fardo" 
                        placeholder="Peso Líquido do insumo"
                        error={methods.formState.errors.altura_fardo?.message} 
                    />
                </FormSection>
                
                {/* Profundidade, Largura e Altura OUTRO*/}
                <FormSection className="sm:flex-row gap-4 w-full">
                    {/* Profundidade */}
                    <InputDecimal  
                        Icon={DepthIcon}  
                        name="profundidade_fardo"
                        label="Profundidade (outro)" 
                        placeholder="Medida da profundidade do fardo"
                        error={methods.formState.errors.profundidade_fardo?.message} 
                    />
                    {/* Largura */}
                    <InputDecimal  
                        Icon={WidthIcon}  
                        name="largura_fardo"
                        label="Largura (outro)" 
                        placeholder="Medida da largura do fardo"
                        error={methods.formState.errors.largura_fardo?.message}  
                    />
                    {/* Altura */}
                    <InputDecimal  
                        Icon={HeightIcon}  
                        name="altura_fardo"
                        label="Altura (outro)" 
                        placeholder="Medida da altura do fardo"
                        error={methods.formState.errors.altura_fardo?.message} 
                    />
                </FormSection>

                
                {/* Sessão Armazenagem */}
                <SubTitleForm title="Armazenagem e Embalagem"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={StorageIcon}/>
                <FormSection className="mt-2 md:mt-3 md:flex-row gap-4">
                     {/* Armazém | Storage */}
                     <Input    
                            label="Armazém Padrão" 
                            name="armazem_padrao"
                            register={methods.register("armazem_padrao")}
                            error={methods.formState.errors.armazem_padrao?.message} 
                            placeholder="Informe o armazém"
                            type="text"
                            icon={StorageIcon}
                        />
                        {/*  */}
                        <Input    
                            label="Tamanho da Embalagem" 
                            name="tamanho_embalagem"
                            register={methods.register("tamanho_embalagem")}
                            error={methods.formState.errors.tamanho_embalagem?.message} 
                            placeholder="Informe o tamanho da embalagem"
                            type="text"
                            icon={packagingSizeIcon}
                        />
                        {/*  tipo embalagem |packaging type*/}
                        <Input    
                            label="Tipo de Embalagem" 
                            name="tipo_embalagem"
                            register={methods.register("tipo_embalagem")}
                            error={methods.formState.errors.tipo_embalagem?.message} 
                            placeholder="Informe o tipo de embalagem"
                            type="text"
                            icon={packagingTypeIcon}
                        />
                </FormSection>

            </FormLayout>
        </PageLayout>
    );
};