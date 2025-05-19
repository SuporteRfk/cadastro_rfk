import { FieldValues, UseFormReturn } from "react-hook-form";
import { FormStateType } from "@/interfaces";
import { FormSection } from "./form-section.components";
import {  InputDecimal } from "../inputs";
import {
    Weight as KgIcon,
} from "lucide-react";


interface FormWeightsProps<T extends FieldValues> {
    mode?: FormStateType; // 'editing' | 'viewing' | 'reviewing';
    methods: UseFormReturn<T>;   
}

export const FormWeights = <T extends FieldValues>({mode, methods}:FormWeightsProps<T>) => {
    return(
        <FormSection className="mt-2 lg:mt-3 lg:flex-row gap-4">
            {/* Peso Bruto */}
            <InputDecimal  
                Icon={KgIcon}  
                name="peso_bruto"
                label="Peso Bruto" 
                placeholder="Peso Bruto do insumo"
                error={methods.formState.errors.peso_bruto?.message as string | undefined}
                readOnly={mode === 'viewing' || mode === 'reviewing'}
            />
            {/* peso líquido*/}
            <InputDecimal  
                Icon={KgIcon}  
                name="peso_liquido"
                label="Peso Líquido" 
                placeholder="Peso Líquido do insumo"
                error={methods.formState.errors.peso_liquido?.message  as string | undefined} 
                readOnly={mode === 'viewing' || mode === 'reviewing'}
            />
        </FormSection>
    );
};