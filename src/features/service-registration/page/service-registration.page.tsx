import { FormLayout, FormProductCategorySelector, PageLayout, SubTitleForm, Toastify } from "@/components";
import { FamilyCodeService, GroupCodeService, TypeCodeService } from "../interface/service-enum";
import { insertServiceRegistration } from "../service/insert-service-registration.service";
import { FormDescriptionService } from "@/components/form/form-description-service";
import { serviceRegistrationSchema } from "../schema/service-registration.schema";
import { IServiceRegister } from "../interface/service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { handleApiError } from "@/utils";
import { useState } from "react";
import {
        Wrench as ServiceIcon,
} from "lucide-react";

export function ServiceRegistrationPage() {
    const [loading, setLoading] = useState<boolean>(false);

    const methods = useForm<IServiceRegister>({
        resolver: yupResolver(serviceRegistrationSchema),
    });
    
    const onSubmit = async (data: IServiceRegister) => {
        
        try {
            setLoading(true);
            await insertServiceRegistration(data);
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
                titleForm="Cadastro de Serviço" 
                iconForm={ServiceIcon}
                methods={methods}
                loading={loading}
                onSubmit={onSubmit}
            >
                {/* Subtitulo */}
                <SubTitleForm title="Dados do Serviço"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={ServiceIcon}/>
                
                {/* Código e descrição do serviço */}
                <FormDescriptionService methods={methods}/>
                
                {/* Tipo , Grupo E Familia do serviço */}
                <FormProductCategorySelector 
                    methods={methods} 
                    family={Object.values(FamilyCodeService)}
                    group={Object.values(GroupCodeService)}
                    type={Object.values(TypeCodeService)}
                />
            </FormLayout>
        </PageLayout>
    );
}


   