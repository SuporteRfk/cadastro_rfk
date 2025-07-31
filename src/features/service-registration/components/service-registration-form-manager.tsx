import { FormActionsButtonsRequest, FormLayout, FormObservationDeniedFild, FormProductCategorySelector, LoadingModal, RequestDeniedInfo, SubTitleForm, Toastify } from "@/components";
import { useDeniedRequest, useEditRequest, useObservationDenied, useReviewRequest } from "@/hooks";
import { IServiceRegister, IServiceRegistration } from "../interface/service";
import { FormStateType, StatusRequest } from "@/interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useReview } from "@/context";
import {
     Wrench as ServiceIcon,
} from "lucide-react";
import { serviceRegistrationSchema } from "../schema/service-registration.schema";
import { FormDescriptionService } from "@/components/form/form-description-service";
import { FamilyCodeService, GroupCodeService, TypeCodeService } from "../interface/service-enum";
import { updateServiceRegistrationService } from "../service/update-service-registration.service";

interface RequestChangeFormManagerProps{
    defaultValue: IServiceRegistration;
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

export const ServiceRegistrationFormManager = ({defaultValue, mode, isChange, loadingModal, setLoadingModal, status, setMode, viewRequestId, obervationRequest,setStatusLocal}:RequestChangeFormManagerProps) => {
    if(loadingModal){
        return <LoadingModal/> 
    };

    const methods= useForm<IServiceRegister>({
        defaultValues: defaultValue,
        resolver: yupResolver(serviceRegistrationSchema)
    });


    // Hook para lidar com editar a form
    const { handleEdit } = useEditRequest<IServiceRegister>({
        setLoadingModal,
        setMode,
        status,
        viewRequestId,
        updateFunction: updateServiceRegistrationService,
        setStatusLocal
    });

    // Hooks para lidar com negar a solicitação
    const denyRequest = useDeniedRequest(); // salvar no supabase
    const { errorObservation, observationDenied, reset ,setObservationDenied ,validate} = useObservationDenied(); // lidar com a observação, salvar/apagar

    //Hook para lidar com o modo de revisão e contexto da revisão para lidar com campos vazios
    const reviewRequest = useReviewRequest(); // salvar no supabase
    const {hasEmptyReasons, setShowError} = useReview(); // funçao para verificar se existem campos vazios no modo revisão

     // Função para saber qual função irá chamar no botão de salvar, dependendo o modo.
    const handleConfirm = async (data: IServiceRegister) => {
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
            console.warn("Modo review: ", mode)
        } else {
            console.warn("Modo não tratado: ", mode)
        }
    };

    return (
        <FormLayout 
            titleForm={`Cadastro de Serviço - #${defaultValue?.id}`} 
            iconForm={ServiceIcon}
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
            <SubTitleForm title="Dados do Serviço"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={ServiceIcon}/>
                
            {/* Código e descrição do serviço */}
            <FormDescriptionService methods={methods} mode={mode}/>
            
            {/* Tipo , Grupo E Familia do serviço */}
            <FormProductCategorySelector 
                methods={methods} 
                family={Object.values(FamilyCodeService)}
                group={Object.values(GroupCodeService)}
                type={Object.values(TypeCodeService)}
                mode={mode}
            />

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
                onConfirm={(data) => handleConfirm( data as IServiceRegister)}
            />
        </FormLayout>
    );
};


