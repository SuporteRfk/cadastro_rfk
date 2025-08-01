import { FormLayout, FormActionsButtonsRequest, FormPalletizingTrackingConversion, FormProductAttributes, FormProductCategorySelector, FormProductCode, FormProductDescription, FormProductDimensions, FormProductPackagingInfo, FormWeights, SubTitleForm, FormObservationDeniedFild } from "@/components/form";
import { FamilyCodePACopacker, GroupCodePACopacker, TypeCodeoPACopacker } from "../interface/pa-copacker-enum";
import { useDeniedRequest, useObservationDenied, useEditRequest, useReviewRequest } from "@/hooks";
import { updatePACopackerService } from "../service/update-pa-copacker.service";
import { IPACopackerRegister, IPACopacker } from "../interface/pa-copacker";
import { LoadingModal, RequestDeniedInfo, Toastify } from "@/components";
import { paCopackerRegisterSchema } from "../schema/pa-copacker.schema";
import { FormStateType, StatusRequest } from "@/interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
    Weight as KgIcon,
    Warehouse as StorageIcon,
    PackageOpen as PAIcon
} from "lucide-react";
import { useReview } from "@/context";



interface PACopackerFormManagerProps{
    defaultValue: IPACopacker;
    mode: FormStateType;
    loadingModal: boolean;
    setLoadingModal: React.Dispatch<React.SetStateAction<boolean>>;
    status: StatusRequest;
    setMode:React.Dispatch<React.SetStateAction<FormStateType>>
    viewRequestId: number;
    obervationRequest: string | null;
    setStatusLocal: React.Dispatch<React.SetStateAction<StatusRequest>>;
}

export const PACopackerFormManager = ({defaultValue, mode, loadingModal, setLoadingModal, status, setMode, viewRequestId, obervationRequest,setStatusLocal}:PACopackerFormManagerProps) => {
        
    if(loadingModal){
        return <LoadingModal/> 
    }
  
    const methods= useForm<IPACopackerRegister>({
        defaultValues: defaultValue,
        resolver: yupResolver(paCopackerRegisterSchema)
    });

    
    // Hook para lidar com editar a form
    const { handleEdit } = useEditRequest<IPACopackerRegister>({
        setLoadingModal,
        setMode,
        status,
        viewRequestId,
        updateFunction: updatePACopackerService,
        setStatusLocal
    });

    // Hooks para lidar com negar a solicitação
    const denyRequest = useDeniedRequest(); // salvar no supabase
    const { errorObservation, observationDenied, reset ,setObservationDenied ,validate} = useObservationDenied(); // lidar com a observação, salvar/apagar
   
    //Hook para lidar com o modo de revisão e contexto da revisão para lidar com campos vazios
    const reviewRequest = useReviewRequest(); // salvar no supabase
    const {hasEmptyReasons, setShowError} = useReview(); // funçao para verificar se existem campos vazios no modo revisão
    
    // Função para saber qual função irá chamar no botão de salvar, dependendo o modo.
    const handleConfirm = async (data: IPACopackerRegister) => {
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
            titleForm={`P.A Copacker - #${defaultValue?.id}`} 
            iconForm={PAIcon}
            mode={mode}
            showButtonsDefault={false}            
        >
            {/* Sessão para mostrar a obervação quando a solicitação for negada */}
            {(mode === "viewing" && status === StatusRequest.NEGADO && obervationRequest) && (
                <RequestDeniedInfo
                    observation={obervationRequest}
                />
            )}

            {/* Sessão dos dados do produto indireto */}
            <SubTitleForm title="Dados do P.A Copacker"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={PAIcon}/>
            {/* Sessão de descrição/nome Científico do P.A */}
            <FormProductDescription methods={methods} mode={mode}/>

            {/* Sessão do código saib e código de barras*/}
            <FormProductCode methods={methods} mode={mode}/>

            {/* Sessão do tipo, familia e grupo do PA */}
            <FormProductCategorySelector 
                family={Object.values(FamilyCodePACopacker)}
                group={Object.values(GroupCodePACopacker)}
                type={Object.values(TypeCodeoPACopacker)}
                methods={methods}
                mode={mode}
            />

            {/* Sessão de atributos (unidades de medida, ncm, sabor, marca, grupo tributário e cest) */}
            <FormProductAttributes methods={methods} showFlavorAndMark showCestAndTax labelMarkAndFlavor="Copacker" mode={mode}/>

            {/* Sessão de Peso e Medidas */}
            <SubTitleForm title="Peso e Medidas"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={KgIcon}/>
            
            {/* Sessão de paletizao, rastro e lastro */}
            <FormPalletizingTrackingConversion methods={methods} showConverters={false} mode={mode}/>

            {/* Sessão Pesos */}
            <FormWeights methods={methods} mode={mode}/>
            
            {/* Sessão de dimenssões (peso, altura e largura) */}
            <FormProductDimensions methods={methods} configSecondDimensions="formCopacker" mode={mode}/>
                            
            {/* Sessão Armazenagem */}
            <SubTitleForm title="Armazenagem e Embalagem"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={StorageIcon}/>
            <FormProductPackagingInfo methods={methods} mode={mode}/>

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
                onConfirm={(data) => handleConfirm(data as IPACopackerRegister)}
            />
        </FormLayout>
        
    );
};