import { FormActionsButtonsRequest, FormLayout, FormSection, SubTitleForm, FormObservationDeniedFild } from "@/components/form";
import { useDeniedRequest, useEditRequest, useObservationDenied, useReviewRequest } from "@/hooks";
import { Input, LoadingModal, RequestDeniedInfo, SafeReviewField, Toastify } from "@/components";
import { updateUnitMeasureService } from "../service/update-unit-measure.service";
import { IUnitMeasure, IUnitMeasureRegister } from "../interface/unit-measure";
import { unitMeasureSchema } from "../schema/unit-measure.schema";
import { FormStateType, StatusRequest } from "@/interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { 
    Ruler as UnitMeasureIcon,
    PencilRuler as UnitMeasureSubTitleIcon
} from "lucide-react";
import { useReview } from "@/context";


interface PaymentConditionFormManagerProps{
    defaultValue: IUnitMeasure;
    mode: FormStateType;
    loadingModal: boolean;
    setLoadingModal: React.Dispatch<React.SetStateAction<boolean>>;
    status: StatusRequest;
    setMode:React.Dispatch<React.SetStateAction<FormStateType>>
    viewRequestId: number;
    obervationRequest: string | null;
    setStatusLocal: React.Dispatch<React.SetStateAction<StatusRequest>>;
}

export const UnitMeasureFormManager = ({defaultValue, mode, loadingModal, setLoadingModal, status, setMode, viewRequestId, obervationRequest, setStatusLocal}:PaymentConditionFormManagerProps) => {   
    if(loadingModal){
        return <LoadingModal/> 
    }
  
    
    const methods= useForm<IUnitMeasureRegister>({
        defaultValues: defaultValue,
        resolver: yupResolver(unitMeasureSchema)
    });

    
    // Hook para lidar com editar a form
    const { handleEdit } = useEditRequest<IUnitMeasureRegister>({
        setLoadingModal,
        setMode,
        status,
        viewRequestId,
        updateFunction: updateUnitMeasureService,
        setStatusLocal
    });

    // Hooks para lidar com negar a solicitação
    const denyRequest = useDeniedRequest(); // salvar no supabase
    const { errorObservation, observationDenied, reset ,setObservationDenied ,validate} = useObservationDenied(); // lidar com a observação, salvar/apagar
    

    //Hook para lidar com o modo de revisão e contexto da revisão para lidar com campos vazios
    const reviewRequest = useReviewRequest(); // salvar no supabase
    const {hasEmptyReasons, setShowError} = useReview(); // funçao para verificar se existem campos vazios no modo revisão

    // Função para saber qual função irá chamar no botão de salvar, dependendo o modo.
    const handleConfirm = async (data: IUnitMeasureRegister) => {
        if(mode === "editing" || mode === "fiscal"){
            // modo edição da solicitação
            await handleEdit(defaultValue.id, data);
        } else if (mode === "denied"){
            // modo negar solicitação
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
                observation: observationDenied,
                setStatusLocal
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
                viewRequestId,
                setStatusLocal
            })
        } else {
            console.warn("Modo não tratado: ", mode)
        }
    };
        
    return(
        <FormLayout 
            methods={methods} 
            loading={loadingModal} 
            titleForm={`Unidade de Medida - #${defaultValue?.id}`} 
            iconForm={UnitMeasureSubTitleIcon}
            mode={mode}
            showButtonsDefault={false}            
        >   
            {/* Sessão para mostrar a obervação quando a solicitação for negada */}
            {(mode === "viewing" && status === StatusRequest.NEGADO && obervationRequest) && (
                <RequestDeniedInfo
                    observation={obervationRequest}
                />
            )}

            <SubTitleForm title="Dados da Unidade de Medida"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={UnitMeasureSubTitleIcon}/>
            <FormSection className="sm:flex-row gap-4 pb-2">
                    
                    <SafeReviewField field="unidade_medida" mode={mode}>
                        <Input    
                            label="Unidade de Medida" 
                            name="unidade_medida"
                            register={methods.register("unidade_medida")}
                            error={methods.formState.errors.unidade_medida?.message} 
                            placeholder="Digita a unidade de medida"
                            type="text"
                            icon={UnitMeasureIcon}
                            readOnly={mode !== "editing"}
                        />
                    </SafeReviewField>
                    <SafeReviewField field="descricao_unidade" mode={mode}>
                        <Input    
                            label="Descrição da Unidade" 
                            name="descricao_unidade"
                            register={methods.register("descricao_unidade")}
                            error={methods.formState.errors.descricao_unidade?.message} 
                            placeholder="Descreva sobre ela"
                            type="text"
                            icon={UnitMeasureSubTitleIcon}
                            readOnly={mode !== "editing"}
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
                onConfirm={(data) => handleConfirm(data)}
            />
        </FormLayout>
        
    );
};