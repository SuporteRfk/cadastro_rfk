import { FormLayout, FormObservationDeniedFild, FormPalletizingTrackingConversion, FormProductAttributes, FormProductCategorySelector, FormProductCode, FormProductContainer, FormProductDescription, FormProductDimensions, FormProductPackagingInfo, FormValidity, FormWeights, SubTitleForm, } from "@/components/form";
import { FamilyCodePAUnitary, GroupCodePAUnitary, TypeCodeoPAUnitary } from "../interface/pa-unitary-enum";
import { useDeniedRequest, useObservationDenied, useEditRequest, useReviewRequest} from "@/hooks";
import { FormActionsButtonsRequest } from "@/components/form/form-actions-buttons-request";
import { updatePAUnitaryService } from "../service/update-pa-unitary.service";
import { LoadingModal, RequestDeniedInfo, Toastify } from "@/components";
import { IPAUnitary, IPAUnitaryRegister } from "../interface/pa-unitary";
import { paUnitaryRegisterSchema } from "../schema/pa-unitary.schema";
import { FormStateType, StatusRequest } from "@/interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
    Box as UnitaryIcon,
    Warehouse as StorageIcon,
    Weight as KgIcon,
    Clock as ValidityIcon,
} from "lucide-react";
import { useReview } from "@/context";



interface PAUnitaryFormManagerProps{
    defaultValue: IPAUnitary;
    mode: FormStateType;
    loadingModal: boolean;
    setLoadingModal: React.Dispatch<React.SetStateAction<boolean>>;
    status: StatusRequest;
    setMode:React.Dispatch<React.SetStateAction<FormStateType>>
    viewRequestId: number;
    obervationRequest: string | null;
    setStatusLocal: React.Dispatch<React.SetStateAction<StatusRequest>>;
    showParentCode?: boolean;
}

export const PAUnitaryFormManager = ({defaultValue, mode, loadingModal, setLoadingModal, status, setMode, viewRequestId, obervationRequest, setStatusLocal}:PAUnitaryFormManagerProps) => {
        
    if(loadingModal){
        return <LoadingModal/> 
    }
    
    const methods= useForm<IPAUnitaryRegister>({
        defaultValues: defaultValue,
        resolver: yupResolver(paUnitaryRegisterSchema)
    });

    
    // Hook para lidar com editar a form
    const { handleEdit } = useEditRequest<IPAUnitaryRegister>({
        setLoadingModal,
        setMode,
        status,
        viewRequestId,
        updateFunction: updatePAUnitaryService,
        setStatusLocal
    });

    // Hooks para lidar com negar a solicitação
    const denyRequest = useDeniedRequest(); // salvar no supabase
    const { errorObservation, observationDenied, reset ,setObservationDenied ,validate} = useObservationDenied(); // lidar com a observação, salvar/apagar
    

    //Hook para lidar com o modo de revisão e contexto da revisão para lidar com campos vazios
    const reviewRequest = useReviewRequest(); // salvar no supabase
    const {hasEmptyReasons, setShowError} = useReview(); // funçao para verificar se existem campos vazios no modo revisão

    // Função para saber qual função irá chamar no botão de salvar, dependendo o modo.
    const handleConfirm = async (data: IPAUnitaryRegister) => {
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
            titleForm={`P.A Unitário - #${defaultValue?.id}`} 
            iconForm={UnitaryIcon}
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
            <SubTitleForm title="Dados do P.A Unitário"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={UnitaryIcon}/>
            {/* Sessão de descrição do P.A */}
            <FormProductDescription methods={methods} mode={mode}/>
            
            {/* Sessão do código de barras e código saib */}
            <FormProductCode methods={methods} showSecondCodeBar configSecondCodeBar="formPaUnitary" mode={mode}/>

            {/* Sessão do tipo, grupo e família */}
            <FormProductCategorySelector 
                methods={methods} 
                family={Object.values(FamilyCodePAUnitary)}
                group={Object.values(GroupCodePAUnitary)}
                type={Object.values(TypeCodeoPAUnitary)}
                mode={mode}
            />
            
            {/* Sessão de atributos (unidades de medida, ncm, sabor, marca, grupo tributário e cest), codigo do produto pai */}
            <FormProductAttributes methods={methods} showFlavorAndMark showCestAndTax labelMarkAndFlavor="Unitário" showParentCode mode={mode}/>

            {/* Sessão de Peso e Medidas */}
            <SubTitleForm title="Peso e Medidas"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={KgIcon}/>
            
            {/* Sessão de paletizao, rastro e lastro */}
            <FormPalletizingTrackingConversion methods={methods} showConverters={false} mode={mode}/>

            {/* Sessão Pesos */}
            <FormWeights methods={methods} mode={mode}/>

            {/* Sessão de dimenssões (peso, altura e largura) */}
            <FormProductDimensions methods={methods} configSecondDimensions="formPaUnitary" mode={mode}/>

            {/* Sessão Armazenagem */}
            <SubTitleForm title="Armazenagem e Embalagem"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={StorageIcon}/>
            <FormProductPackagingInfo methods={methods} mode={mode}/>

            {/* Vasilhame/Garrafeira e categoria de embalagem */}
            <FormProductContainer methods={methods} mode={mode}/>

            {/* Sessão Validade */}
            <SubTitleForm title="Validade e Lote"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={ValidityIcon}/>
            <FormValidity methods={methods} mode={mode}/>

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
                onConfirm={(data) => handleConfirm(data as IPAUnitaryRegister)}
            />
        </FormLayout>
        
    );
};