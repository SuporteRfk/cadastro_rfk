import { SafeReviewField } from "../review-field/safe-review-field.components";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { FormSection } from "./form-section.components";
import { FormStateType } from "@/interfaces";
import { Input} from "../inputs";
import {
    Computer as CodServiceIcon,
    FilePenLine as DescriptionIcon,
} from "lucide-react";



interface FormDescriptionServiceProps<T extends FieldValues> {
    mode?: FormStateType; // 'editing' | 'viewing' | 'reviewing';
    methods: UseFormReturn<T>;
}

export const FormDescriptionService = <T extends FieldValues>({mode, methods}:FormDescriptionServiceProps<T>) => {
     

    return(
        <FormSection className="flex lg:flex-row gap-4">
                <SafeReviewField field="descricao" mode={mode || "viewing"}>
                    <Input
                        label="Descricao do Serviço" 
                        name="descricao"
                        register={methods.register("descricao" as Path<T>)}
                        error={methods.formState.errors.descricao?.message as string | undefined} 
                        placeholder="Descrição do serviço"
                        readOnly={mode === 'viewing' || mode === 'reviewing'}
                        icon={DescriptionIcon}
                    /> 
                </SafeReviewField>
                <SafeReviewField field="codigo_servico" mode={mode || "viewing"}>
                    <Input
                        label="Código do Serviço" 
                        name="codigo_servico"
                        register={methods.register("codigo_servico" as Path<T>)}
                        error={methods.formState.errors.codigo_servico?.message as string | undefined} 
                        placeholder="Informe o código do serviço"
                        readOnly={mode === 'viewing' || mode === 'reviewing'}
                        icon={CodServiceIcon}
                    />
                </SafeReviewField>    
        </FormSection>
    );
};