import { FormLayout, PageLayout, FormSection, FormProductPackagingInfo, Input, InputDecimal, InputWithMask, Toastify, SubTitleForm, FormProductCategorySelector, FormProductDescription, FormProductCode, FormValidity, FormWeights, FormPalletizingTrackingConversion } from "@/components";
import { FamilyCodePABurden, GroupCodePABurden, TypeCodeoPABurden } from "../interface/pa-burden-enum";
import { insertPABurdenService } from "../service/insert-pa-burden.service";
import { paBurdenRegisterSchema } from "../schema/pa-burden.schema";
import { IPABurdenRegister } from "../interface/pa-burden";
import { yupResolver } from "@hookform/resolvers/yup";
import { TbNumber as NCMIcon} from "react-icons/tb";
import { useForm } from "react-hook-form";
import { handleApiError } from "@/utils";
import { useState } from "react";
import {
    Boxes as BurdenIcon,
    Ruler as UnitMeasureIcon,
    Weight as KgIcon,
    Landmark as TaxIcon,
    Cherry as FlavorIcon,
    Crown as MarkIcon,
    Move3D as DepthIcon,
    MoveHorizontal as WidthIcon,
    MoveVertical as HeightIcon,
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
                </FormSection>

                {/* Sessão de Peso e Medidas */}
                <SubTitleForm title="Peso e Medidas"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={KgIcon}/>
                
                {/* Sessão de paletizao, rastro e lastro */}
                <FormPalletizingTrackingConversion methods={methods} showConverters={false}/>

                {/* Sessão Pesos */}
                <FormWeights methods={methods}/>

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

                 {/* Profundidade, Largura e Altura Unitario*/}
                 <FormSection className="sm:flex-row gap-4 w-full">
                    {/* Profundidade */}
                    <InputDecimal  
                        Icon={DepthIcon}  
                        name="profundidade_unitario"
                        label="Profundidade Unitário" 
                        placeholder="Medida da profundidade do fardo"
                        error={methods.formState.errors.profundidade_unitario?.message} 
                    />
                    {/* Largura */}
                    <InputDecimal  
                        Icon={WidthIcon}  
                        name="largura_unitario"
                        label="Largura Unitário" 
                        placeholder="Medida da largura do fardo"
                        error={methods.formState.errors.largura_unitario?.message} 
                    />
                    {/* Altura */}
                    <InputDecimal  
                        Icon={HeightIcon}  
                        name="altura_unitario"
                        label="Altura Unitário" 
                        placeholder="Medida da altura do fardo"
                        error={methods.formState.errors.altura_unitario?.message} 
                    />
                </FormSection>

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