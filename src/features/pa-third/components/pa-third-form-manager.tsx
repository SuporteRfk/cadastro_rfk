import { FormLayout, FormActionsButtonsRequest, FormPalletizingTrackingConversion, FormProductAttributes, FormProductCategorySelector, FormProductCode, FormProductDescription, FormProductPackagingInfo, FormWeights, SubTitleForm, FormObservationDeniedFild, FormProductContainer } from "@/components/form";
import { FamilyCodePAThird, GroupCodePAThird, TypeCodePAThird } from "../interface/pa-third-enum";
import { useDeniedRequest, useObservationDenied, useEditRequest, useReviewRequest } from "@/hooks";
import { Input, LoadingModal, RequestDeniedInfo, SafeReviewField, Toastify } from "@/components";
import { updatePAThirdService } from "../service/update-pa-third.service";
import { IPAThird , IPAThirdRegister} from "../interface/pa-third";
import { paThirdRegisterSchema } from "../schema/pa-third.schema";
import { FormStateType, StatusRequest } from "@/interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
    Weight as KgIcon,
    Warehouse as StorageIcon,
    Group as SubGroupIcon,
    Building as PAThirdIcon
} from "lucide-react";
import { useReview } from "@/context";



interface PAThirdFormManagerProps{
    defaultValue: IPAThird;
    mode: FormStateType;
    loadingModal: boolean;
    setLoadingModal: React.Dispatch<React.SetStateAction<boolean>>;
    status: StatusRequest;
    setMode:React.Dispatch<React.SetStateAction<FormStateType>>
    viewRequestId: number;
    obervationRequest: string | null;
    setStatusLocal: React.Dispatch<React.SetStateAction<StatusRequest>>;
}

export const PAThirdFormManager = ({defaultValue, mode, loadingModal, setLoadingModal, status, setMode, viewRequestId, obervationRequest,setStatusLocal}:PAThirdFormManagerProps) => {
        
    if(loadingModal){
        return <LoadingModal/> 
    }
   
    const methods= useForm<IPAThirdRegister>({
        defaultValues: defaultValue,
        resolver: yupResolver(paThirdRegisterSchema)
    });

    
    // Hook para lidar com editar a form
    const { handleEdit } = useEditRequest<IPAThirdRegister>({
        setLoadingModal,
        setMode,
        status,
        viewRequestId,
        updateFunction: updatePAThirdService,
        setStatusLocal
    });

    // Hooks para lidar com negar a solicitação
    const denyRequest = useDeniedRequest(); // salvar no supabase
    const { errorObservation, observationDenied, reset ,setObservationDenied ,validate} = useObservationDenied(); // lidar com a observação, salvar/apagar
    
    //Hook para lidar com o modo de revisão e contexto da revisão para lidar com campos vazios
    const reviewRequest = useReviewRequest(); // salvar no supabase
    const {hasEmptyReasons, setShowError} = useReview(); // funçao para verificar se existem campos vazios no modo revisão
    
    
    // Função para saber qual função irá chamar no botão de salvar, dependendo o modo.
    const handleConfirm = async (data: IPAThirdRegister) => {
        if(mode === "editing" || mode === "fiscal"){
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
            titleForm={`P.A Terceiro - #${defaultValue?.id}`} 
            iconForm={PAThirdIcon}
            mode={mode}
            showButtonsDefault={false}            
        >
            {/* Sessão para mostrar a obervação quando a solicitação for negada */}
            {(mode === "viewing" && status === StatusRequest.NEGADO && obervationRequest) && (
                <RequestDeniedInfo
                    observation={obervationRequest}
                />
            )}

            <SubTitleForm title="Dados do P.A Terceiro"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={PAThirdIcon}/>            
            {/* Sessão de descrição/nome Científico do P.A */}
            <FormProductDescription methods={methods} viewInstructions mode={mode}/>
            
            {/* Sessão do código saib e código de barras*/}
            <FormProductCode methods={methods} showSecondCodeBar configSecondCodeBar="formPaThird" mode={mode}/>

            {/* Sessão do tipo, familia e grupo do PA */}
            <FormProductCategorySelector 
                family={Object.values(FamilyCodePAThird)}
                group={Object.values(GroupCodePAThird)}
                type={Object.values(TypeCodePAThird)}
                methods={methods}
                mode={mode}
            />

            {/* Sessão de atributos (unidades de medida, ncm, sabor, marca, grupo tributário e cest), codigo do pai */}
            <FormProductAttributes methods={methods} showSecondUnitMeasure showFlavorAndMark showCestAndTax showParentCode mode={mode}/>

            {/* SubGrupo do produto */}
            <SafeReviewField field="sub_grupo" mode={mode || "viewing"}>
                <Input
                    register={methods.register("sub_grupo")}
                    name="sub_grupo"
                    error={methods.formState.errors.sub_grupo?.message}
                    label="Sub Grupo"
                    type="text"
                    placeholder="Fornecedor de quem compramos"
                    icon={SubGroupIcon}
                    readOnly={mode !== "editing"}
                />
            </SafeReviewField>

            {/* Sessão de pesos e medidas */}
            <SubTitleForm title="Peso e Medidas"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={KgIcon}/>
            
            {/* Sessão de Conversor e Rastro */}
            <FormPalletizingTrackingConversion methods={methods} showConverters mode={mode} isPaThird/>

            {/* Sessão Pesos */}
            <FormWeights methods={methods} mode={mode}/>

            {/* Sessão Armazenagem */}
            <SubTitleForm title="Armazenagem e Embalagem"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={StorageIcon}/>
            <FormProductPackagingInfo methods={methods} valueInitialStorage="055 - REVENDA" mode={mode}/>

            {/* Vasilhame/Garrafeira e categoria de embalagem */}
            <FormProductContainer methods={methods} mode={mode}/>

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
                onConfirm={(data) => handleConfirm( data as IPAThirdRegister)}
            />
        </FormLayout>
        
    );
};