import { FormLayout, FormSection, Input, PageLayout, SubTitleForm, Toastify } from "@/components";
import { insertUnitMeasureService } from "../service/insert-unit-measure.service";
import { unitMeasureSchema } from "../schema/unit-measure.schema";
import { IUnitMeasureRegister } from "../interface/unit-measure";
import { yupResolver } from "@hookform/resolvers/yup";
import { 
    Ruler as UnitMeasureIcon,
    PencilRuler as UnitMeasureSubTitleIcon
} from "lucide-react";
import { useForm } from "react-hook-form";
import { handleApiError } from "@/utils";
import { useState } from "react";

export const RegisterUnitMeasure = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const methods = useForm<IUnitMeasureRegister>({
        resolver: yupResolver(unitMeasureSchema)
    })

    const onSubmit = async (data: IUnitMeasureRegister) => {
        try {
            setLoading(true)
            await insertUnitMeasureService(data);
            Toastify({
                type: "success",
                message: "Solicitação realizado com sucesso!"
            })
            methods.reset()
        } catch (error) {
            handleApiError(error, 'Erro ao cadastrar unidade de medida') 
        } finally { 
            setLoading(false)
        }
    }

    return(
        <PageLayout>
            <FormLayout 
                titleForm="Unidade de Medida" 
                iconForm={UnitMeasureIcon}
                methods={methods}
                loading={loading}
                onSubmit={onSubmit}
            >
                <SubTitleForm title="Dados da Unidade de Medida"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={UnitMeasureSubTitleIcon}/>
                <FormSection className="sm:flex-row gap-4">
                    <Input    
                        label="Unidade de Medida" 
                        name="unidade_medida"
                        register={methods.register("unidade_medida")}
                        error={methods.formState.errors.unidade_medida?.message} 
                        placeholder="Digita a unidade de medida"
                        type="text"
                        icon={UnitMeasureIcon}
                    />
                    <Input    
                        label="Descrição da Unidade" 
                        name="descricao_unidade"
                        register={methods.register("descricao_unidade")}
                        error={methods.formState.errors.descricao_unidade?.message} 
                        placeholder="Descreva sobre ela"
                        type="text"
                        icon={UnitMeasureSubTitleIcon}
                    />
                </FormSection>
            </FormLayout>
        </PageLayout>
    );
};