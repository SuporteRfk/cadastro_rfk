import { FormLayout, FormPalletizingTrackingConversion, FormProductAttributes, FormProductCategorySelector, FormProductCode, FormProductDescription, FormSection, FormWeights, Input, InputDecimal, InputSelect, LoadingModal, SubTitleForm } from "@/components";
import { FamilyCodeInsumos, GroupCodeInsumos, TypeCodeoInsumos } from "../interface/insumos-enum";
import { ConverterType, FormStateType, StatusRequest } from "@/interfaces";
import { updateInsumosService } from "../service/update-insumo.service";
import { insumosRegisterSchema } from "../schema/insumos.schema";
import { useEditRequest } from "@/hooks/use-edit-request.hooks";
import { IInsumo, IInsumoRegister } from "../interface/insumos";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
    Droplet as InsumoIcon,
    NotebookText as InsumoSubTitleIcon,
    Scale as ConverterWeightSubTitleIcon,
    Group as GroupIcon,
    Vault as ProductAlternativeIcon,
    Building2 as EnterpriseIcon,
    Variable as ConverterIcon,
} from "lucide-react";
import { FormActionsButtonsRequest } from "@/components/form/form-actions-buttons-request";



interface PaymentConditionFormManagerProps{
    defaultValue: IInsumo;
    mode: FormStateType;
    isChange: boolean;
    loadingModal: boolean;
    setReasonFieldReview:  React.Dispatch<React.SetStateAction<{[key: string]: string;}>>
    reasonFieldReview: {[key: string]: string };
    setLoadingModal: React.Dispatch<React.SetStateAction<boolean>>;
    status: StatusRequest;
    setMode:React.Dispatch<React.SetStateAction<FormStateType>>
    viewRequestId: number;
}

export const InsumoFormManager = ({defaultValue, mode, isChange, loadingModal, setReasonFieldReview, reasonFieldReview, setLoadingModal, status, setMode, viewRequestId}:PaymentConditionFormManagerProps) => {
        
    if(loadingModal){
        return <LoadingModal/> 
    }
  
    console.log(defaultValue)
    const methods= useForm<IInsumoRegister>({
        defaultValues: defaultValue,
        resolver: yupResolver(insumosRegisterSchema)
    });

    
    // Hook para lidar com editar a form
    const { handleEdit } = useEditRequest<IInsumoRegister>({
        setLoadingModal,
        setMode,
        status,
        viewRequestId,
        updateFunction: updateInsumosService
    });


    


    
    return(
        <FormLayout 
            methods={methods} 
            loading={loadingModal} 
            titleForm={`Insumo - #${defaultValue?.id}`} 
            iconForm={InsumoIcon}
            mode={mode}
            showButtonsDefault={false}            
        >
            {/* Sessão dos dados do insumo */}
            <SubTitleForm title="Dados do Insumo"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={InsumoSubTitleIcon}/>
            {/* sessão da descrição do insumo e nome Científico*/}
            <FormProductDescription methods={methods} mode={mode}/>

            {/* Sessão do tipo, familia e grupo do PA */}
            <FormProductCategorySelector 
                family={Object.values(FamilyCodeInsumos)}
                group={Object.values(GroupCodeInsumos)}
                type={Object.values(TypeCodeoInsumos)}
                methods={methods}
                mode={mode}
            />

            {/* Sessão de atributos (unidades de medida e ncm) */}
            <FormProductAttributes methods={methods} showSecondUnitMeasure mode={mode}/>
                
            {/* Sessão do código saib */}
            <FormProductCode methods={methods} showOnlyCodeSaib mode={mode}/>

            {/* Titulo - Conversores e peso */}
            <SubTitleForm title="Conversores e Peso"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={ConverterWeightSubTitleIcon}/>

            {/* Sessão dos conversores e rastro */}
            <FormPalletizingTrackingConversion methods={methods} showConverters mode={mode}/>
            
            {/* Sessão Pesos */}
            <FormWeights methods={methods} mode={mode}/>
            
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
                readOnly={mode !== "editing"}
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
                    readOnly={mode !== "editing"}
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
                    readOnly={mode !== "editing"}
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
                    readOnly={mode !== "editing"}
                />
                {/* Tipo de conversor alternativo |Type converter alternative*/}
                <InputSelect
                    label="Conversor do produto alternativo"
                    selectLabel="Conversores"
                    options={Object.values(ConverterType)}
                    name="tipo_conversor_alternativo"
                    error={methods.formState.errors.tipo_conversor_alternativo?.message}
                    placeholder="Selecione o conversor"
                    disabled={mode !== "editing"}
                />
            </FormSection>

           {/* Botões de salvar / cancelar */}
            <FormActionsButtonsRequest
                methods={methods}
                mode={mode}
                setMode={setMode}
                onConfirm={(data) => handleEdit(defaultValue.id, data as IInsumoRegister)}
            />
        </FormLayout>
        
    );
};