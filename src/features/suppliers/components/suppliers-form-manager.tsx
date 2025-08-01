import { FormActionsButtonsRequest, FormAddress, FormBusinessNames, FormLayout, FormObservationDeniedFild, FormRegistrationIdentification, FormTaxIdentification, FormTelephone, SubTitleForm } from "@/components/form";
import { useDeniedRequest, useEditRequest, useObservationDenied, useReviewRequest } from "@/hooks";
import { upsertSupplierService } from "../service/update-supplier.service";
import { LoadingModal, RequestDeniedInfo, Toastify } from "@/components";
import { ISupplier, ISupplierRegisterForm } from "../interface/supplier";
import { SupplierTpj, SupplierType } from "../interface/supplier-enum";
import { supplierRegisterSchema } from "../schema/supplier.schema";
import { FormStateType, StatusRequest } from "@/interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
    MapPinned as ZipCodeIcon,
     Factory as SuppliersIcon
} from "lucide-react";
import { useState } from "react";
import { useReview } from "@/context";


interface SuppliersFormManagerProps{
    defaultValue: ISupplier;
    mode: FormStateType;
    loadingModal: boolean;
    setLoadingModal: React.Dispatch<React.SetStateAction<boolean>>;
    status: StatusRequest;
    setMode:React.Dispatch<React.SetStateAction<FormStateType>>
    viewRequestId: number;
    obervationRequest: string | null;
    setStatusLocal: React.Dispatch<React.SetStateAction<StatusRequest>>;
}

export const SuppliersFormManager = ({defaultValue, mode, loadingModal, setLoadingModal, status, setMode, viewRequestId, obervationRequest, setStatusLocal}:SuppliersFormManagerProps) => {
    
    if(loadingModal){
        return <LoadingModal/> 
    }
    
    const [loadingLocal, setLoadingLocal] = useState(false);    
        
    const methods= useForm<ISupplierRegisterForm>({
        defaultValues: defaultValue,
        resolver: yupResolver(supplierRegisterSchema)
    });

    
    // Hook para lidar com editar a form
    const { handleEdit } = useEditRequest<ISupplierRegisterForm>({
        setLoadingModal: setLoadingLocal,
        setMode,
        status,
        viewRequestId,
        updateFunction: upsertSupplierService,
        setStatusLocal
    });

    // Hooks para lidar com negar a solicitação
    const denyRequest = useDeniedRequest(); // salvar no supabase
    const { errorObservation, observationDenied, reset ,setObservationDenied ,validate} = useObservationDenied(); // lidar com a observação, salvar/apagar

    
    //Hook para lidar com o modo de revisão e contexto da revisão para lidar com campos vazios
    const reviewRequest = useReviewRequest(); // salvar no supabase
    const {hasEmptyReasons, setShowError} = useReview(); // funçao para verificar se existem campos vazios no modo revisão
    
    // Função para saber qual função irá chamar no botão de salvar, dependendo o modo.
    const handleConfirm = async (data: ISupplierRegisterForm) => {
        if(mode === "editing"){
            const {fisica_juridica, ...dataRegister} = data;
            await handleEdit(defaultValue.id, dataRegister as ISupplierRegisterForm);
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
            loading={loadingLocal} 
            titleForm={`Fornecedor - #${defaultValue?.id}`} 
            iconForm={SuppliersIcon}
            mode={mode}
            showButtonsDefault={false}            
        >   

            {/* Sessão para mostrar a obervação quando a solicitação for negada */}
            {(mode === "viewing" && status === StatusRequest.NEGADO && obervationRequest) && (
                <RequestDeniedInfo
                    observation={obervationRequest}
                />
            )}

            {/* SubTitulo Dados do fornecedor */}
            <SubTitleForm title="Dados do Fornecedor"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={SuppliersIcon}/>
         
            
           {/* Sessão de Identificação do cliente (CNPJ/CPF, tipo do cliente)*/}
            <FormRegistrationIdentification 
                methods={methods} 
                typeForm="supplier" 
                setLoading={setLoadingLocal}
                optionsForType={Object.values(SupplierType)}
                mode={mode}
            />
            
            {/* Sessão de razão social e nome fantasia */}
            <FormBusinessNames methods={methods} mode={mode}/>

            {/* Sessão de identificação jurifica (CNAE, I.E, OPTANTE e Email do cliente) */}
            <FormTaxIdentification 
                methods={methods} 
                optionsTpj={Object.values(SupplierTpj)}
                typeForm="supplier"
                mode={mode}
            />
            
            {/* Sessão telefones */}
            <FormTelephone methods={methods} mode={mode}/>
            
            {/* SubTitulo Endereço */}
            <SubTitleForm title="Endereço"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={ZipCodeIcon}/>
            {/* Sessão endereço */}
            <FormAddress methods={methods} setLoading={setLoadingLocal} mode={mode}/>

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
                onConfirm={(data) => handleConfirm(data as ISupplierRegisterForm)}
            />
        </FormLayout>
        
    );
};


