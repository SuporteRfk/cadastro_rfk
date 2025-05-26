import { FormActionsButtonsRequest, FormLayout, FormObservationDeniedFild, FormPalletizingTrackingConversion, FormProductAttributes, FormProductCategorySelector, FormProductCode, FormProductDescription, FormSection, FormWeights, SubTitleForm } from "@/components/form";
import { Input, InputDecimal, InputSelect, LoadingModal, RequestDeniedInfo, SafeReviewField, Toastify } from "@/components";
import { FamilyCodeInsumos, GroupCodeInsumos, TypeCodeoInsumos } from "../interface/insumos-enum";
import { useDeniedRequest, useObservationDenied, useEditRequest, useReviewRequest } from "@/hooks";
import { ConverterType, FormStateType, StatusRequest } from "@/interfaces";
import { updateInsumosService } from "../service/update-insumo.service";
import { insumosRegisterSchema } from "../schema/insumos.schema";
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
import { useReview } from "@/context";



interface PaymentConditionFormManagerProps{
    defaultValue: IInsumo;
    mode: FormStateType;
    isChange: boolean;
    loadingModal: boolean;
    setLoadingModal: React.Dispatch<React.SetStateAction<boolean>>;
    status: StatusRequest;
    setMode:React.Dispatch<React.SetStateAction<FormStateType>>
    viewRequestId: number;
    obervationRequest: string | null;
}

export const InsumoFormManager = ({defaultValue, mode, isChange, loadingModal, setLoadingModal, status, setMode, viewRequestId, obervationRequest}:PaymentConditionFormManagerProps) => {
        
    if(loadingModal){
        return <LoadingModal/> 
    }
  
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


    // Hooks para lidar com negar a solicitação
    const denyRequest = useDeniedRequest(); // salvar no supabase
    const { errorObservation, observationDenied, reset ,setObservationDenied ,validate} = useObservationDenied(); // lidar com a observação, salvar/apagar
    
    //Hook para lidar com o modo de revisão e contexto da revisão para lidar com campos vazios
    const reviewRequest = useReviewRequest(); // salvar no supabase
    const {hasEmptyReasons, setShowError} = useReview(); // funçao para verificar se existem campos vazios no modo revisão

    // Função para saber qual função irá chamar no botão de salvar, dependendo o modo.
    const handleConfirm = async (data: IInsumoRegister) => {
        if(mode === "editing"){
            await handleEdit(defaultValue.id, data);
        } else if (mode === "denied"){
            if(!validate()){
                Toastify({
                    type: "warning",
                    message:"Informa o motivo"
                })
                return;
            };
            await denyRequest({
                viewRequestId,
                setLoadingModal,
                setMode,
                observation: observationDenied
            })
            reset();
        } else if (mode === "reviewing"){
            // modo revisão
            if (hasEmptyReasons()) {
                setShowError(true);
                Toastify({
                   type: "warning",
                    message: "Preencha todos os campos de revisão antes de salvar."
                });
                return;
            }
            setShowError(false);
            await reviewRequest({
                setLoadingModal,
                setMode,
                viewRequestId
            })
        } else {
            console.warn("Modo não tratado: ", mode)
        }
    };


    
    return(
        <FormLayout 
            methods={methods} 
            loading={loadingModal} 
            titleForm={`Insumo - #${defaultValue?.id}`} 
            iconForm={InsumoIcon}
            mode={mode}
            showButtonsDefault={false}            
        >   
            {/* Sessão para mostrar a obervação quando a solicitação for negada */}
            {(mode === "viewing" && status === StatusRequest.NEGADO && obervationRequest) && (
                <RequestDeniedInfo
                    observation={obervationRequest}
                />
            )}

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
            <SafeReviewField field="subgrupo" mode={mode || "viewing"}>
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
            </SafeReviewField>
            
            {/* Sessão de produto alternativo e empresa */}
            <FormSection className="xl:flex-row gap-1 md:gap-4 md:mt-3">
                {/* Produto alternativo*/}
                <SafeReviewField field="alternativo_produto" mode={mode || "viewing"}>
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
                </SafeReviewField>
                
                {/* empresa */}
                <SafeReviewField field="empresa" mode={mode || "viewing"}>
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
                </SafeReviewField>
            </FormSection>
                            
            {/* Fator e Tipo de conversor alternativo*/}
            <FormSection className="xl:flex-row gap-1 md:gap-4 md:mt-3">
                {/* Fator conversor alternativo |factor converter alternative*/}
                <SafeReviewField field="fator_conversor_alternativo" mode={mode || "viewing"}>
                    <InputDecimal  
                        Icon={ConverterIcon}  
                        name="fator_conversor_alternativo"
                        label="Fator do produto alternativo" 
                        placeholder="Fator conversor alternativo"
                        error={methods.formState.errors.fator_conversor_alternativo?.message} 
                        readOnly={mode !== "editing"}
                    />
                </SafeReviewField>

                {/* Tipo de conversor alternativo |Type converter alternative*/}
                <SafeReviewField field="tipo_conversor_alternativo" mode={mode || "viewing"}>
                    <InputSelect
                        label="Conversor do produto alternativo"
                        selectLabel="Conversores"
                        options={Object.values(ConverterType)}
                        name="tipo_conversor_alternativo"
                        error={methods.formState.errors.tipo_conversor_alternativo?.message}
                        placeholder="Selecione o conversor"
                        disabled={mode !== "editing"}
                    />
                </SafeReviewField>
            </FormSection>

            {/* Sessão para informar o motivo que está negando a solicitação */}
                {mode === "denied" && (
                    <FormObservationDeniedFild 
                        observation={observationDenied}
                        setObservation={setObservationDenied}
                        error={errorObservation}
                    />
                )}

           {/* Botões de salvar / cancelar */}
            <FormActionsButtonsRequest
                methods={methods}
                mode={mode}
                setMode={setMode}
                onConfirm={(data) => handleConfirm(data as IInsumoRegister)}
            />
        </FormLayout>
        
    );
};