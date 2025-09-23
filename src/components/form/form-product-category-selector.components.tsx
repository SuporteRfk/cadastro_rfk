import { FieldValues, UseFormReturn } from "react-hook-form";
import { FormSection } from "./form-section.components";
import { FormStateType } from "@/interfaces";
import { InputSelect } from "../inputs";
import { SafeReviewField } from "../review-field/safe-review-field.components";


interface FormProductCategorySelectorProps<T extends FieldValues> {
    mode?: FormStateType; // 'editing' | 'viewing' | 'reviewing';
    family: string[];
    group: string[];
    type: string[];
    methods: UseFormReturn<T>;
}

export const FormProductCategorySelector = <T extends FieldValues>({mode, family, group, type, methods}:FormProductCategorySelectorProps<T>) => {
    return(
        <FormSection className="mt-2 md:mt-3 md:flex-row gap-4">
             {/* Familia */}
                <SafeReviewField field="codigo_familia" mode={mode || "viewing"}>
                    <InputSelect
                        label="Família do produto" 
                        name="codigo_familia"
                        error={methods.formState.errors.codigo_familia?.message as string | undefined} 
                        placeholder="Selecione a família"
                        options={Object.values(family)}
                        selectLabel="Código da família"
                        disabled={mode === 'viewing' || mode === 'reviewing' || mode === 'fiscal'}
                    />
                </SafeReviewField>
                {/* Grupo */}
                <SafeReviewField field="codigo_grupo" mode={mode || "viewing"}>
                    <InputSelect
                        label="Grupo do produto" 
                        name="codigo_grupo"
                        error={methods.formState.errors.codigo_grupo?.message as string | undefined} 
                        placeholder="Selecione o grupo"
                        options={Object.values(group)}
                        selectLabel="Código do grupo"
                        disabled={mode === 'viewing' || mode === 'reviewing' || mode === 'fiscal'}
                    />
                </SafeReviewField>
                {/* Tipo */}
                <SafeReviewField field="tipo" mode={mode || "viewing"}>
                    <InputSelect
                        label="Tipo do produto"
                        selectLabel="Tipos"
                        options={Object.values(type)}
                        name="tipo"
                        error={methods.formState.errors.tipo?.message as string | undefined}
                        placeholder="Selecione o tipo"
                        disabled={mode === 'viewing' || mode === 'reviewing' || mode === 'fiscal'}
                    />
                </SafeReviewField>
        </FormSection>
    );
};