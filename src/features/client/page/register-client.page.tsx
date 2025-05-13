import { ClientPFOrPJ, ClientTpj ,ClientType } from "../interface/client-enum";
import { IClientRegisterForm } from "../interface/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormLayout, FormTelephone, PageLayout, SubTitleForm, Toastify } from "@/components";
import {Users as UsersIcon} from "lucide-react";
import { useForm } from "react-hook-form";
import { clientRegisterFormSchema } from "../schema/client.schema";
import { useState } from "react";
import { insertClientService } from "../service/insert-client.service";
import { handleApiError } from "@/utils";

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
            <FormTelephone methods={methods}/>

            </FormLayout>
        </PageLayout>
    );
};