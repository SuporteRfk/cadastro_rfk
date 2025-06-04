import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { FormStateType, ValidityPeriod } from "@/interfaces";
import { FormSection } from "./form-section.components";
import { Input, InputSelect } from "../inputs";
import {
    Clock as ValidityIcon,
    PackageMinus as BatchesMinimumIcon,
    Boxes as BatchesEconomicIcon
} from "lucide-react";
import { SafeReviewField } from "../review-field/safe-review-field.components";


interface FormValidityProps<T extends FieldValues> {
    mode?: FormStateType; // 'editing' | 'viewing' | 'reviewing';
    methods: UseFormReturn<T>;   
}

export const FormValidity = <T extends FieldValues>({mode, methods}:FormValidityProps<T>) => {
    return(
        <FormSection className="mt-2 lg:mt-3 lg:flex-row gap-4">
            {/* Tipo do prazo */}
            <SafeReviewField field="tipo_prazo" mode={mode || "viewing"}>
                <InputSelect
                    label="Tipo de Prazo"
                    selectLabel="Prazos"
                    options={Object.values(ValidityPeriod)}
                    name="tipo_prazo"
                    error={methods.formState.errors.tipo_prazo?.message as string | undefined}
                    placeholder="Selecione o tipo de prazo"
                    disabled={mode === 'viewing' || mode === 'reviewing'}
                />
            </SafeReviewField>

            {/* Prazo Validade */}
            <SafeReviewField field="prazo_validade" mode={mode || "viewing"}>
                <Input    
                    label="Prazo de validade" 
                    name="prazo_validade"
                    register={methods.register("prazo_validade" as Path<T>)}
                    error={methods.formState.errors.prazo_validade?.message as string | undefined} 
                    placeholder="Informe a validade"
                    type="number"
                    icon={ValidityIcon}
                    readOnly={mode === 'viewing' || mode === 'reviewing'}
                />
            </SafeReviewField>

            {/* Lotes Economico*/}
            <SafeReviewField field="lote_economico" mode={mode || "viewing"}>
                <Input    
                    label="Lote econômico" 
                    name="lote_economico"
                    register={methods.register("lote_economico" as Path<T>)}
                    error={methods.formState.errors.lote_economico?.message  as string | undefined} 
                    placeholder="Informe o lote econômico"
                    type="text"
                    icon={BatchesEconomicIcon}
                    readOnly={mode === 'viewing' || mode === 'reviewing'}
                />
            </SafeReviewField>
            
            {/* Lotes Minimo */}
            <SafeReviewField field="lote_minimo" mode={mode || "viewing"}>
                <Input    
                    label="Lote mínimo" 
                    name="lote_minimo"
                    register={methods.register("lote_minimo" as Path<T>)}
                    error={methods.formState.errors.lote_minimo?.message  as string | undefined} 
                    placeholder="Informe o lote mínimo"
                    type="text"
                    icon={BatchesMinimumIcon}
                    readOnly={mode === 'viewing' || mode === 'reviewing'}
                />
            </SafeReviewField>
        </FormSection>
    );
};