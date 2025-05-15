import { FormStateType } from "@/interfaces";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Input } from "../inputs";
import { FormSection } from "./form-section.components";
import {
    BriefcaseBusiness as RegisteredNameIcon,
    Factory as DoingBusinessIcon,
} from "lucide-react";


interface FormBusinessNamesProps<T extends FieldValues> {
    mode?: FormStateType; // 'editing' | 'viewing' | 'reviewing';
    methods: UseFormReturn<T>;
}

export const FormBusinessNames = <T extends FieldValues>({mode, methods}:FormBusinessNamesProps<T>) => {
    return(
        <FormSection className="xl:flex-row gap-1 md:gap-4 md:mt-3">
            {/* Razão Social */}
            <Input    
                label="Razão Social" 
                name="razao_social"
                register={methods.register("razao_social" as Path<T>)}
                error={methods.formState.errors.nome_razao_social?.message as string | undefined} 
                placeholder="Digite a razão social"
                type="text"
                icon={RegisteredNameIcon}
                readOnly={mode === 'viewing' || mode === 'reviewing'}
            />
            {/* Nome Fantasia */}
            <Input    
                label="Nome Fantasia" 
                name="nome_fantasia"
                register={methods.register("nome_fantasia" as Path<T>)}
                error={methods.formState.errors.nome_fantasia?.message as string | undefined} 
                placeholder="Digite o nome fantasia"
                type="text"
                icon={DoingBusinessIcon}
                readOnly={mode === 'viewing' || mode === 'reviewing'}
            />
        </FormSection>
    );
};