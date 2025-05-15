import { FormAddress, FormLayout, FormRegistrationIdentification, FormTelephone, InputRadio, PageLayout, SubTitleForm, Toastify } from "@/components";
import { ClientTpj ,ClientType } from "../interface/client-enum";
import { IClientRegisterForm } from "../interface/client";
import { yupResolver } from "@hookform/resolvers/yup";
import {Users as UsersIcon} from "lucide-react";
import { useForm } from "react-hook-form";
import { clientRegisterFormSchema } from "../schema/client.schema";
import { useState } from "react";
import { insertClientService } from "../service/insert-client.service";
import { handleApiError } from "@/utils";
import {
    MapPinned as ZipCodeIcon,
    LocateFixed as BillingAddressIcon
} from "lucide-react";


export const RegisterClientPage = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const methods = useForm<IClientRegisterForm>({
        resolver: yupResolver(clientRegisterFormSchema)
    });

    const onSubmit = async (data:IClientRegisterForm) => {
        const {mesmo_endereco_cobranca, ...dataRegister} = data;
        try {
            setLoading(true);
            await insertClientService(dataRegister);
            Toastify({
                type: "success",
                message: "Solicitação realizada com sucesso"
            })
        } catch (error) {
            handleApiError(error, "Erro ao cadastrar cliente")
        } finally {
            setLoading(false);
        }
    };


    const isBillingAddressValue = methods.watch("mesmo_endereco_cobranca");

    return(
        <PageLayout>
            <FormLayout 
                titleForm="Cadastro de Cliente" 
                iconForm={UsersIcon}
                methods={methods}
                loading={loading}
                onSubmit={onSubmit}
            >
                {/* SubTitulo Dados do cliente*/}
                <SubTitleForm title="Dados do Cliente"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={UsersIcon}/>
                {/* Sessão de Identificação do cliente (CNPJ/CPF, tipo do cliente)*/}
                <FormRegistrationIdentification 
                    methods={methods} 
                    typeForm="client" 
                    setLoading={setLoading} 
                    optionsForType={Object.values(ClientType)}/>

                {/* Sessão telefones */}
                <FormTelephone methods={methods}/>
                

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
                <FormAddress methods={methods} setLoading={setLoading}/>
                
                {/* Sessão endereço cobrança */}
                {isBillingAddressValue === "não" &&
                    <>                        
                        <SubTitleForm title="Endereço Cobrança" icon={BillingAddressIcon} styleLine="border-t-3 border-dashed border-strong/10 mt-4"/>
                        <FormAddress methods={methods} setLoading={setLoading} isBillingAddress/>
                    </>
                }
            </FormLayout>
        </PageLayout>
    );
};