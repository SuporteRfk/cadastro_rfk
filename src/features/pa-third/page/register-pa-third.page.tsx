import { FormLayout, FormSection, Input, InputDecimal, InputSelect, InputWithMask, PageLayout, SubTitleForm, Toastify } from "@/components";
import { FamilyCodePAThird, GroupCodePAThird , TypeCodePAThird } from "../interface/pa-third-enum";
import { insertPATerceiroService } from "../service/insert-pa-third.service";
import { paThirdRegisterSchema } from "../schema/pa-third.schema";
import { IPAThirdRegister } from "../interface/pa-third";
import { MdPallet as PalletIcon } from "react-icons/md";
import { yupResolver } from "@hookform/resolvers/yup";
import {Building as PAThirdIcon} from "lucide-react";
import { TbNumber as NCMIcon} from "react-icons/tb";
import { ConverterType, Trail } from "@/interfaces";
import { useForm } from "react-hook-form";
import { handleApiError } from "@/utils";
import { useState } from "react";
import {
    ClipboardPenLine as DescriptionIcon,
    Computer as CodeSaibIcon,
    Ruler as UnitMeasureIcon,
    Weight as KgIcon,
    Landmark as TaxIcon,
    Cherry as FlavorIcon,
    Crown as MarkIcon,
    Atom as CientificoIcon,
    Barcode as CodeBarIcon,
    Warehouse as StorageIcon,
    Box as packagingTypeIcon,
    Expand as packagingSizeIcon,
    Group as SubGroupIcon
} from "lucide-react";

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
                {/* Sessão de descrição do P.A */}
                <div>
                    {/* Descrição*/}
                    <Input    
                        label="Descrição Curta" 
                        name="descricao_curta"
                        register={methods.register("descricao_curta")}
                        error={methods.formState.errors.descricao_curta?.message} 
                        placeholder="Descrição breve do fardo"
                        type="text"
                        icon={DescriptionIcon}
                    />
                    <p className="ml-1 my-1 text-text-neutral text-sm">
                        Regra para Descrição, seguir a ordem: <span className="text-medium/80 font-semibold">Tipo do produto - Marca - Sabor - Tamanho - Descartável/Retornável</span>
                    </p>
                    <p className="ml-1 my-1 text-text-neutral text-sm">
                        Abreviação para produtos com dois nomes, Ex: <span className="text-medium/80 font-semibold">Vinho Tinto</span>, colocar primeira letra do primeiro e segundo nome. <span className="text-medium/80 font-semibold">Ex: VT</span>
                    </p>
                    <p className="ml-1 my-1 text-text-neutral text-sm">
                        produtos com um nome, Ex: <span className="text-medium/80 font-semibold">Espumante</span>, abreviar utilizando as 3 primeiras letras. <span className="text-medium/80 font-semibold">Ex: ESP</span>
                    </p>
                </div>

                {/* Codigos de baras */}
                <FormSection className="sm:flex-row gap-4">
                    {/* Primeiro Codigo de barras */}
                    <Input    
                        label="Código de barras" 
                        name="codigo_barras"
                        register={methods.register("codigo_barras")}
                        error={methods.formState.errors.codigo_barras?.message} 
                        placeholder="Insira o código de barras"
                        type="number"
                        icon={CodeBarIcon}
                    />
                    {/* Segundo codigo de barras */}
                    <Input    
                        label="Código de barras (Segundo)" 
                        name="segundo_codigo_barras"
                        register={methods.register("segundo_codigo_barras")}
                        error={methods.formState.errors.segundo_codigo_barras?.message} 
                        placeholder="Insira o segundo código de barras"
                        type="number"
                        icon={CodeBarIcon}
                        
                    />
                </FormSection>

                 {/* Nome Ciêntifico*/}
                 <div>
                    <Input    
                        label="Nome Científico (Descrição completa)" 
                        name="nome_cientifico"
                        register={methods.register("nome_cientifico")}
                        error={methods.formState.errors.nome_cientifico?.message} 
                        placeholder="Descrição completa do nome nome cientifíco"
                        type="text"
                        icon={CientificoIcon}
                    />
                    <p className="ml-1 text-text-neutral text-sm">
                        Como preencher, seguir a ordem: <span className="text-medium/80 font-semibold">Tipo do produto - Marca - Sabor - Tamanho - Descartável/Retornável</span>
                    </p>
                    <p className="ml-1 mt-1 text-accent font-medium text-sm">
                        Ex: REFRIGERANTE REFRIKO GUARANA 6X2LT - DESCARTÁVEL
                    </p>
                </div>

                {/* Sessão de tipo, familia e grupo */}
                <FormSection className="mt-2 md:mt-3 md:flex-row gap-4">
                    {/* Família */}
                    <InputSelect
                        label="Familia do Terceiro" 
                        name="codigo_familia"
                        error={methods.formState.errors.codigo_familia?.message} 
                        placeholder="Selecione a família"
                        options={Object.values(FamilyCodePAThird)}
                        selectLabel="Código da família"
                    />
                    {/* Grupo */}
                    <InputSelect
                        label="Grupo do Terceiro" 
                        name="codigo_grupo"
                        error={methods.formState.errors.codigo_grupo?.message} 
                        placeholder="Selecione o grupo"
                        options={Object.values(GroupCodePAThird)}
                        selectLabel="Código do grupo"
                    />
                    {/* Tipo */}
                    <InputSelect
                        label="Tipo do Terceiro"
                        selectLabel="Tipos"
                        options={Object.values(TypeCodePAThird)}
                        name="tipo"
                        error={methods.formState.errors.tipo?.message}
                        placeholder="Selecione o tipo"
                    />
                </FormSection>

                {/* Sessão das Unidades de Medidas */}
                <FormSection className="mt-2 md:mt-3 md:flex-row gap-4">
                    {/* Unidade de medida*/}
                    <Input    
                        label="Unidade de Medida" 
                        name="unidade_medida"
                        register={methods.register("unidade_medida")}
                        error={methods.formState.errors.unidade_medida?.message} 
                        placeholder="Como vendemos por extenso. Ex: Unidade(UN)"
                        type="text"
                        icon={UnitMeasureIcon}
                    />
                    {/* Segunda unidade de medida*/}
                    <Input    
                        label="Segunda Unidade de Medida" 
                        name="segunda_undiade_medida"
                        register={methods.register("segunda_undiade_medida")}
                        error={methods.formState.errors.segunda_undiade_medida?.message} 
                        placeholder="Como compramos por extenso. Ex: Unidade(UN)"
                        type="text"
                        icon={UnitMeasureIcon}
                    />
                </FormSection>

                {/* Sessão de sabor e marca */}
                <FormSection className="mt-2 md:mt-3 md:flex-row gap-4">
                    {/* Sabor */}
                    <Input    
                        label="Sabor do Fardo" 
                        name="sabor"
                        register={methods.register("sabor")}
                        error={methods.formState.errors.sabor?.message} 
                        placeholder="Por favor, insira o sabor"
                        type="text"
                        icon={FlavorIcon}
                    />
                    {/* Marca */}
                    <Input    
                        label="Marca do Fardo" 
                        name="marca"
                        register={methods.register("marca")}
                        error={methods.formState.errors.marca?.message} 
                        placeholder="Por favor, insira a marca"
                        type="text"
                        icon={MarkIcon}
                    />
                </FormSection>

                {/* Sessão de informações de tributos */}
                <FormSection className="mb-1 mt-2 md:mt-3 md:flex-row gap-4">
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
                    {/* Grupo Tributário  | Tax Group*/}
                    <Input    
                        label="Grupo Tributário" 
                        name="grupo_tributario"
                        register={methods.register("grupo_tributario")}
                        error={methods.formState.errors.grupo_tributario?.message} 
                        placeholder="Insira o grupo tributário do produto"
                        type="number"
                        icon={TaxIcon}
                    />
                    {/* codido saib*/}
                    <Input    
                        label="Código Saib (opcional)" 
                        name="codigo_saib"
                        register={methods.register("codigo_saib")}
                        error={methods.formState.errors.codigo_saib?.message} 
                        placeholder="Código do fardo na saib"
                        type="number"
                        icon={CodeSaibIcon}
                    />
                </FormSection>

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

                <SubTitleForm title="Peso e Medidas"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={KgIcon}/>
                {/* Sessão de Conversor e Rastro */}
                <FormSection className=" mt-2 md:mt-3 md:flex-row gap-4">
                    {/* Fator Conversão */}
                    <Input    
                        label="Fator Conversão" 
                        name="fator_conversor"
                        register={methods.register("fator_conversor")}
                        error={methods.formState.errors.fator_conversor?.message} 
                        placeholder="Informe quantas unidades por caixa"
                        type="number"
                        icon={PalletIcon}
                    />
                    {/* Tipo Conversor  */}
                    <InputSelect
                        label="Tipo de Conversor"
                        selectLabel="Conversores"
                        options={Object.values(ConverterType)}
                        name="tipo_conversor"
                        error={methods.formState.errors.tipo_conversor?.message}
                        placeholder="Selecione o conversor"
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

                {/* Sessão de pesos */}
                <FormSection className="mt-2 md:mt-3 md:flex-row gap-4">
                    {/* peso bruto | gross weight */}
                    <InputDecimal  
                        Icon={KgIcon}  
                        name="peso_bruto"
                        label="Peso Bruto" 
                        placeholder="Peso Bruto do fardo"
                        error={methods.formState.errors.peso_bruto?.message} 
                    />
                    {/* peso líquido | net weight */}
                    <InputDecimal  
                        Icon={KgIcon}  
                        name="peso_liquido"
                        label="Peso Líquido" 
                        placeholder="Peso Líquido do fardo"
                        error={methods.formState.errors.peso_liquido?.message} 
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
                            valueInitial="055 - REVENDA"
                        />
                        {/* Tamanho Embalagem */}
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