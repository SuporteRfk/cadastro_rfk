import { FormAddress, FormActionsButtonsRequest, FormBusinessNames, FormLayout, FormRegistrationIdentification, FormTaxIdentification, FormTelephone, SubTitleForm, FormObservationDeniedFild } from "@/components/form";
import { InputRadio, LoadingModal, RequestDeniedInfo, Toastify } from "@/components";
import { useDeniedRequest, useEditRequest, useObservationDenied, useReviewRequest } from "@/hooks";
import { upsertClientService } from "../service/update-client.service";
import { clientRegisterFormSchema } from "../schema/client.schema";
import { IClient, IClientRegisterForm } from "../interface/client";
import { ClientTpj, ClientType } from "../interface/client-enum";
import { FormStateType, StatusRequest } from "@/interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { handleIsPJ } from "../utils/handle-is-pj";
import { useForm } from "react-hook-form";
import {
    MapPinned as ZipCodeIcon,
    LocateFixed as BillingAddressIcon,
    Users as UsersIcon
} from "lucide-react";
import { useState } from "react";
import { useReview } from "@/context";


interface ClientFormManagerProps{
    defaultValue: IClient;
    mode: FormStateType;
    loadingModal: boolean;
    setLoadingModal: React.Dispatch<React.SetStateAction<boolean>>;
    status: StatusRequest;
    setMode:React.Dispatch<React.SetStateAction<FormStateType>>
    viewRequestId: number;
    obervationRequest: string | null;
    setStatusLocal: React.Dispatch<React.SetStateAction<StatusRequest>>;
}

export const ClientFormManager = ({defaultValue, mode, loadingModal,setLoadingModal, status, setMode, viewRequestId, obervationRequest, setStatusLocal}:ClientFormManagerProps) => {
    
    if(loadingModal){
        return <LoadingModal/> 
    }
    
    const [loadingLocal, setLoadingLocal] = useState(false);    

    
    const methods= useForm<IClientRegisterForm>({
        defaultValues: defaultValue,
        resolver: yupResolver(clientRegisterFormSchema)
    });

    
    // Hook para lidar com editar a form
    const { handleEdit } = useEditRequest<IClientRegisterForm>({
        setLoadingModal: setLoadingLocal,
        setMode,
        status,
        viewRequestId,
        updateFunction: upsertClientService,
        setStatusLocal
    });


    const isBillingAddressValue = methods.watch("mesmo_endereco_cobranca");
    const fisicaJuridicaValue = methods.watch("fisica_juridica");


    // Hooks para lidar com negar a solicitação
    const denyRequest = useDeniedRequest(); // salvar no supabase
    const { errorObservation, observationDenied, reset ,setObservationDenied ,validate} = useObservationDenied(); // lidar com a observação, salvar/apagar
    
    //Hook para lidar com o modo de revisão e contexto da revisão para lidar com campos vazios
    const reviewRequest = useReviewRequest(); // salvar no supabase
    const {hasEmptyReasons, setShowError} = useReview(); // funçao para verificar se existem campos vazios no modo revisão


    // Função para saber qual função irá chamar no botão de salvar, dependendo o modo.
    const handleConfirm = async (data: IClientRegisterForm) => {
        if(mode === "editing"){
            if(data.mesmo_endereco_cobranca === "sim"){
                data = {
                    ...data,
                    endereco_cobranca: null,
                    numero_cobranca: null,
                    bairro_cobranca: null,
                    complemento_cobranca: null,
                    estado_cobranca: null,
                    municipio_cobranca: null,
                    cep_cobranca: null,
                };
            }
            const {mesmo_endereco_cobranca, ...dataRegister} = data;
            await handleEdit(defaultValue.id, dataRegister as IClientRegisterForm);

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
            titleForm={`Cliente - #${defaultValue?.id}`} 
            iconForm={UsersIcon}
            mode={mode}
            showButtonsDefault={false}            
        >
            {/* Sessão para mostrar a obervação quando a solicitação for negada */}
            {(mode === "viewing" && status === StatusRequest.NEGADO && obervationRequest) && (
                <RequestDeniedInfo
                    observation={obervationRequest}
                />
            )}

            {/* SubTitulo Dados do cliente*/}
            <SubTitleForm title="Dados do Cliente"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={UsersIcon}/>
         
            
            {/* Sessão de Identificação do cliente (CNPJ/CPF, tipo do cliente)*/}
            <FormRegistrationIdentification 
                methods={methods} 
                typeForm="client" 
                setLoading={setLoadingLocal} 
                optionsForType={Object.values(ClientType)}
                mode={mode}
            />

            {/* Sessão de razão social e nome fantasia */}
            <FormBusinessNames methods={methods} mode={mode}/>

            {/* Sessão de identificação jurifica (CNAE, I.E, OPTANTE e Email do cliente) */}
            <FormTaxIdentification 
                methods={methods} 
                optionsTpj={Object.values(ClientTpj)}
                typeForm="client"
                isPj={handleIsPJ(fisicaJuridicaValue)}
                mode={mode}
            />
            
            {/* Sessão telefones */}
            <FormTelephone methods={methods}  mode={mode}/>
            
           {/* SubTitulo Endereço */}
            <div className="flex flex-col sm:flex-row justify-between border-t-3 border-dashed border-strong/10 mt-4">
                <SubTitleForm title="Endereço" icon={ZipCodeIcon}/>
                <InputRadio
                    options={[{label: "Sim", value: 'sim'}, {label: "Não", value: 'não'}]}
                    name="mesmo_endereco_cobranca"
                    label="O endereço para cobrança é o mesmo"
                    register={methods.register("mesmo_endereco_cobranca")}
                    error={methods.formState.errors.mesmo_endereco_cobranca?.message}
                />
            </div>
            {/* Sessão endereço */}
            <FormAddress methods={methods} setLoading={setLoadingLocal} mode={mode}/>
            
            {/* Sessão endereço cobrança */}
            {isBillingAddressValue === "não" &&
                <>                        
                    <SubTitleForm title="Endereço Cobrança" icon={BillingAddressIcon} styleLine="border-t-3 border-dashed border-strong/10 mt-4"/>
                    <FormAddress methods={methods} setLoading={setLoadingLocal} isBillingAddress mode={mode}/>
                </>
            }

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
                onConfirm={(data) => handleConfirm(data as IClientRegisterForm)}
            />
        </FormLayout>
        
    );          
};


