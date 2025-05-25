import { FormActionsButtonsRequest, FormLayout, FormSection, SubTitleForm, FormObservationDeniedFild } from "@/components/form";
import { updateUnitMeasureService } from "../service/update-unit-measure.service";
import { useDeniedRequest, useEditRequest, useObservationDenied } from "@/hooks";
import { Input, LoadingModal, RequestDeniedInfo, Toastify } from "@/components";
import { IUnitMeasure, IUnitMeasureRegister } from "../interface/unit-measure";
import { unitMeasureSchema } from "../schema/unit-measure.schema";
import { FormStateType, StatusRequest } from "@/interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { 
    Ruler as UnitMeasureIcon,
    PencilRuler as UnitMeasureSubTitleIcon
} from "lucide-react";


interface PaymentConditionFormManagerProps{
    defaultValue: IUnitMeasure;
    mode: FormStateType;
    isChange: boolean;
    loadingModal: boolean;
    setReasonFieldReview:  React.Dispatch<React.SetStateAction<{[key: string]: string;}>>
    reasonFieldReview: {[key: string]: string };
    setLoadingModal: React.Dispatch<React.SetStateAction<boolean>>;
    status: StatusRequest;
    setMode:React.Dispatch<React.SetStateAction<FormStateType>>
    viewRequestId: number;
    obervationRequest: string | null;
}

export const UnitMeasureFormManager = ({defaultValue, mode, isChange, loadingModal, setReasonFieldReview, reasonFieldReview, setLoadingModal, status, setMode, viewRequestId, obervationRequest}:PaymentConditionFormManagerProps) => {   
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
        updateFunction: updateUnitMeasureService
    });

    // Hooks para lidar com negar a solicitação
    const denyRequest = useDeniedRequest(); // salvar no supabase
    const { errorObservation, observationDenied, reset ,setObservationDenied ,validate} = useObservationDenied(); // lidar com a observação, salvar/apagar
    
    // Função para saber qual função irá chamar no botão de salvar, dependendo o modo.
    const handleConfirm = async (data: IUnitMeasureRegister) => {
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