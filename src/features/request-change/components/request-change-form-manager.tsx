import { FormActionsButtonsRequest, FormInfoChangeRequest, FormLayout, FormObservationDeniedFild, LoadingModal, RequestDeniedInfo, SubTitleForm, Toastify } from "@/components";
import { useDeniedRequest, useEditRequest, useObservationDenied, useReviewRequest } from "@/hooks";
import { updateRequestChangeService } from "../service/update-request-change.service";
import { IRequestChange, IRequestChangeRegister } from "../interface/request-change";
import { requestChangeSchema } from "../schema/request-change.shema";
import { FormStateType, StatusRequest } from "@/interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useReview } from "@/context";
import {
    ClipboardPen as RequestChangeIcon,
} from "lucide-react";

interface RequestChangeFormManagerProps{
    defaultValue: IRequestChange;
    mode: FormStateType;
    isChange: boolean;
    loadingModal: boolean;
    setLoadingModal: React.Dispatch<React.SetStateAction<boolean>>;
    status: StatusRequest;
    setMode:React.Dispatch<React.SetStateAction<FormStateType>>
    viewRequestId:number;
    obervationRequest: string | null;
    setStatusLocal: React.Dispatch<React.SetStateAction<StatusRequest>>;
};

export const RequestChangeFormManager = ({defaultValue, mode, isChange, loadingModal, setLoadingModal, status, setMode, viewRequestId, obervationRequest,setStatusLocal}:RequestChangeFormManagerProps) => {
    if(loadingModal){
        return <LoadingModal/> 
    };

    const methods= useForm<IRequestChangeRegister>({
        defaultValues: defaultValue,
        resolver: yupResolver(requestChangeSchema)
    });


    // Hook para lidar com editar a form
    const { handleEdit } = useEditRequest<IRequestChangeRegister>({
        setLoadingModal,
        setMode,
        status,
        viewRequestId,
        updateFunction: updateRequestChangeService,
        setStatusLocal
    });

    // Hooks para lidar com negar a solicitação
    const denyRequest = useDeniedRequest(); // salvar no supabase
    const { errorObservation, observationDenied, reset ,setObservationDenied ,validate} = useObservationDenied(); // lidar com a observação, salvar/apagar


    //Hook para lidar com o modo de revisão e contexto da revisão para lidar com campos vazios
    const reviewRequest = useReviewRequest(); // salvar no supabase
    const {hasEmptyReasons, setShowError} = useReview(); // funçao para verificar se existem campos vazios no modo revisão

     // Função para saber qual função irá chamar no botão de salvar, dependendo o modo.
    const handleConfirm = async (data: IRequestChangeRegister) => {
        //modo edição
        if(mode === "editing"){
            await handleEdit(defaultValue.id, data);
        } else if (mode === "denied"){
            //modo negado
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
            });
        } else {
            console.warn("Modo não tratado: ", mode)
        }
    };

    return (
        <FormLayout 
            titleForm={`Alteraçao de Cadastro - #${defaultValue?.id}`} 
            iconForm={RequestChangeIcon}
            showButtonsDefault={false}   
            loading={loadingModal} 
            methods={methods}
            mode={mode}
        >
            {/* Sessão para mostrar a obervação quando a solicitação for negada */}
                {(mode === "viewing" && status === StatusRequest.NEGADO && obervationRequest) && (
                    <RequestDeniedInfo observation={obervationRequest}/>
                )}
            
            {/* Subtitulo */}
            <SubTitleForm title="Dados para Alteração"  styleLine="border-t-3 border-dashed border-strong/10 mt-4"/>
            
            <FormInfoChangeRequest methods={methods} mode={mode}/>

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
                onConfirm={(data) => handleConfirm( data as IRequestChangeRegister)}
            />
        </FormLayout>
    );
};


