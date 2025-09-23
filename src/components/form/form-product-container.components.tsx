import { SafeReviewField } from "../review-field/safe-review-field.components";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { FormSection } from "./form-section.components";
import { CategoryPackaging, FormStateType } from "@/interfaces";
import { Input, InputSelect } from "../inputs";
import {
    Milk as CaskIcon,
    PackageOpen as CellaretIcon
} from "lucide-react";


interface FormProductContainerProps<T extends FieldValues> {
    mode?: FormStateType; // 'editing' | 'viewing' | 'reviewing';
    methods: UseFormReturn<T>;   
}

export const FormProductContainer = <T extends FieldValues>({mode, methods}:FormProductContainerProps<T>) => {
    return(
        <FormSection className="mt-2 md:mt-3 lg:flex-row gap-4">       
            {/* Código do vasilhame */}
            <SafeReviewField field="vasilhame" mode={mode || "viewing"}>
                <Input    
                    label="Cod. Vasilhame" 
                    name="vasilhame"
                    register={methods.register("vasilhame" as Path<T>)}
                    error={methods.formState.errors.vasilhame?.message as string | undefined} 
                    placeholder="cod vasilhame"
                    type="text"
                    icon={CaskIcon}
                    readOnly={mode === 'viewing' || mode === 'reviewing' || mode === 'fiscal'}
                />
            </SafeReviewField>
          
            {/* Código da Garrafeira */}
            <SafeReviewField field="garrafeira" mode={mode || "viewing"}>
                <Input    
                    label="Cod. Garrafeira" 
                    name="garrafeira"
                    register={methods.register("garrafeira" as Path<T>)}
                    error={methods.formState.errors.garrafeira?.message as string | undefined} 
                    placeholder="cod garrafeira"
                    type="text"
                    icon={CellaretIcon}
                    readOnly={mode === 'viewing' || mode === 'reviewing' || mode === 'fiscal'}
                />
            </SafeReviewField>
            {/* Categoria da Embalagem */}
            <SafeReviewField field="categoria_embalagem" mode={mode || "viewing"}>
                <InputSelect
                    name="categoria_embalagem"
                    placeholder="Retornavel / Descartavel"
                    disabled={mode === 'viewing' || mode === 'reviewing' || mode === 'fiscal'}
                    error={methods.formState.errors.categoria_embalagem?.message as string | undefined}
                    options={Object.values(CategoryPackaging)}
                    label="Categoria Embalagem"
                />
            </SafeReviewField>
        </FormSection>
    );
};

