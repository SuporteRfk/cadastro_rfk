import { FormLayout, FormProductCategorySelector, FormProductCode, FormPalletizingTrackingConversion, FormProductDescription, FormSection, FormWeights, Input, InputWithMask, PageLayout, SubTitleForm, Toastify, FormProductDimensions } from "@/components";
import { FamilyCodePACopacker, GroupCodePACopacker , TypeCodeoPACopacker } from "../interface/pa-copacker-enum";
import { insertPACopackerService } from "../service/insert-pa-copacker.service";
import { paCopackerRegisterSchema } from "../schema/pa-copacker.schema";
import { IPACopackerRegister } from "../interface/pa-copacker";
import { yupResolver } from "@hookform/resolvers/yup";
import { TbNumber as NCMIcon} from "react-icons/tb";
import {PackageOpen as PAIcon} from "lucide-react";
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
} from "lucide-react";
import { FormProductPackagingInfo } from "@/components/form/form-product-packaging-info.components";

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
                
                {/* Sessão de descrição/nome Científico do P.A */}
                <FormProductDescription methods={methods} />

                {/* Sessão do código saib e código de barras*/}
                <FormProductCode methods={methods} />

                {/* Sessão do tipo, familia e grupo do PA */}
                <FormProductCategorySelector 
                    family={Object.values(FamilyCodePACopacker)}
                    group={Object.values(GroupCodePACopacker)}
                    type={Object.values(TypeCodeoPACopacker)}
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
                
                {/* Sessão de dimenssões (peso, altura e largura) */}
                <FormProductDimensions methods={methods} configSecondDimensions="formCopacker"/>
                               
                {/* Sessão Armazenagem */}
                <SubTitleForm title="Armazenagem e Embalagem"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={StorageIcon}/>
                <FormProductPackagingInfo methods={methods}/>
                
            </FormLayout>
        </PageLayout>
    );
};