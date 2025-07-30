import { FormInfoChangeRequest, FormLayout, PageLayout, SubTitleForm, Toastify } from "@/components";
import { insertRequestChangeService } from "../service/insert-request-change.service";
import { IRequestChangeRegister } from "../interface/request-change";
import { requestChangeSchema } from "../schema/request-change.shema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { handleApiError } from "@/utils";
import { useState } from "react";
import {
    ClipboardPen as RequestChangeIcon,
} from "lucide-react";

export function RequestChangePage() {
    const [loading, setLoading] = useState<boolean>(false);

    const methods = useForm<IRequestChangeRegister>({
        resolver: yupResolver(requestChangeSchema),
    });
    
    const onSubmit = async (data: IRequestChangeRegister) => {
        console.log(data)
        try {
            setLoading(true);
            await insertRequestChangeService(data);
            Toastify({
                type: "success",
                message: "Solicitação realizado com sucesso",
            })
            methods.reset();
        } catch (error) {
            handleApiError(error, "Erro ao registar a solicitação de cadastro")
        }finally{
            setLoading(false);
        }
    };
    
    return (
        <PageLayout>
            <FormLayout 
                titleForm="Alteraçao de Cadastro" 
                iconForm={RequestChangeIcon}
                methods={methods}
                loading={loading}
                onSubmit={onSubmit}
            >
                {/* Subtitulo */}
                <SubTitleForm title="Dados para Alteração"  styleLine="border-t-3 border-dashed border-strong/10 mt-4"/>
                
                <FormInfoChangeRequest methods={methods}/>
            </FormLayout>
        </PageLayout>
    );
}


   