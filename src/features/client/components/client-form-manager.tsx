import { FormAddress, FormBusinessNames, FormLayout, FormRegistrationIdentification, FormTaxIdentification, FormTelephone, InputRadio, LoadingModal, SubTitleForm } from "@/components";
import { FormActionsButtonsRequest } from "@/components/form/form-actions-buttons-request";
import { upsertClientService } from "../service/update-client.service";
import { clientRegisterFormSchema } from "../schema/client.schema";
import { IClient, IClientRegisterForm } from "../interface/client";
import { useEditRequest } from "@/hooks/use-edit-request.hooks";
import { FormStateType, StatusRequest } from "@/interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
    MapPinned as ZipCodeIcon,
    LocateFixed as BillingAddressIcon,
    Users as UsersIcon
} from "lucide-react";

import { useState } from "react";
import { ClientTpj, ClientType } from "../interface/client-enum";
import { handleIsPJ } from "../utils/handle-is-pj";




interface ClientFormManagerProps{
    defaultValue: IClient;
    mode: FormStateType;
    isChange: boolean;
    loadingModal: boolean;
    setReasonFieldReview:  React.Dispatch<React.SetStateAction<{[key: string]: string;}>>
    reasonFieldReview: {[key: string]: string };
    setLoadingModal: React.Dispatch<React.SetStateAction<boolean>>;
    status: StatusRequest;
    setMode:React.Dispatch<React.SetStateAction<FormStateType>>
    viewRequestId: number;
}

export const ClientFormManager = ({defaultValue, mode, isChange, loadingModal, setReasonFieldReview, reasonFieldReview, setLoadingModal, status, setMode, viewRequestId}:ClientFormManagerProps) => {
    
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
        updateFunction: upsertClientService
    });


    const isBillingAddressValue = methods.watch("mesmo_endereco_cobranca");
    const fisicaJuridicaValue = methods.watch("fisica_juridica");


    console.log(defaultValue)

    return(
        <FormLayout 
            methods={methods} 
            loading={loadingLocal} 
            titleForm={`Cliente - #${defaultValue?.id}`} 
            iconForm={UsersIcon}
            mode={mode}
            showButtonsDefault={false}            
        >
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

            {/* Botões de salvar / cancelar */}
            <FormActionsButtonsRequest
                methods={methods}
                mode={mode}
                setMode={setMode}
                onConfirm={(data) => {
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
                    handleEdit(defaultValue.id, dataRegister as IClientRegisterForm)
                }}
            />
        </FormLayout>
        
    );
};


