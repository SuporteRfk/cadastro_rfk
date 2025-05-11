import { FormLayout, FormProductCategorySelector, FormProductCode, FormProductDescription, FormSection, Input, InputDecimal, InputSelect, InputWithMask, PageLayout, SubTitleForm, Toastify } from "@/components";
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
    Ruler as UnitMeasureIcon,
    Weight as KgIcon,
    Landmark as TaxIcon,
    Cherry as FlavorIcon,
    Crown as MarkIcon,
    Warehouse as StorageIcon,
    Group as SubGroupIcon
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
                <FormProductPackagingInfo methods={methods} valueInitialStorage="055 - REVENDA"/>
                
            </FormLayout>
        </PageLayout>
    );
};