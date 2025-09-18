import { FormStateType } from "@/interfaces";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Input, InputWithMask } from "../inputs";
import { FormSection } from "./form-section.components";
import {
    CalendarDays as DateIcon,
    UserCheck as ContactNameIcon,
    Route,
    BriefcaseBusiness as BusinessIcon 
} from "lucide-react";
import { SafeReviewField } from "../review-field/safe-review-field.components";


interface FormInfoExtraClientProps<T extends FieldValues> {
    mode?: FormStateType; // 'editing' | 'viewing' | 'reviewing';
    methods: UseFormReturn<T>;
}

export const FormInfoExtraClient = <T extends FieldValues>({mode, methods}:FormInfoExtraClientProps<T>) => {
    return(
        <FormSection className="xl:flex-row gap-1 md:gap-4 md:mt-2">
            {/* Nome Contato */}
            <SafeReviewField field="razao_social" mode={mode || "viewing"}>
                <Input    
                    label="Nome para contato" 
                    name="nome_contato"
                    register={methods.register("nome_contato" as Path<T>)}
                    error={methods.formState.errors.nome_contato?.message as string | undefined} 
                    placeholder="Informe um nome para contato"
                    type="text"
                    icon={ContactNameIcon}
                    readOnly={mode === 'viewing' || mode === 'reviewing'}
                />
            </SafeReviewField>
            {/* Data de abertura ou nascimento */}
            <SafeReviewField field="nome_fantasia" mode={mode || "viewing"}>
                <InputWithMask    
                    label="Data Abertura/Nascimento" 
                    name="data_abertura_nascimento"
                    register={methods.register("data_abertura_nascimento" as Path<T>)}
                    error={methods.formState.errors.data_abertura_nascimento?.message as string | undefined} 
                    maskType="custom"
                    customMask="99/99/9999"
                    Icon={DateIcon}
                    readOnly={mode === 'viewing' || mode === 'reviewing'}
                />
            </SafeReviewField>
            {/* Rota de atendimento*/}
            <SafeReviewField field="rota_atendimento" mode={mode || "viewing"}>
                <Input    
                    label="Rota de atendimento" 
                    placeholder="Informe a rota de atendimento"
                    name="rota_atendimento"
                    register={methods.register("rota_atendimento" as Path<T>)}
                    error={methods.formState.errors.rota_atendimento?.message as string | undefined} 
                    type="number"                  
                    icon={Route}
                    readOnly={mode === 'viewing' || mode === 'reviewing'}
                />
            </SafeReviewField>
            {/* Ramo atividade*/}
            <SafeReviewField field="ramo_atividade" mode={mode || "viewing"}>
                <Input    
                    label="Ramo de atividade" 
                    placeholder="Informe o ramo de atividade do cliente"
                    name="ramo_atividade"
                    register={methods.register("ramo_atividade" as Path<T>)}
                    error={methods.formState.errors.ramo_atividade?.message as string | undefined} 
                    type="text"                  
                    icon={BusinessIcon}
                    readOnly={mode === 'viewing' || mode === 'reviewing'}
                />
            </SafeReviewField>
        </FormSection>
    );
};