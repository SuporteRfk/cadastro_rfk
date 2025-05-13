import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { FormStateType, ValidityPeriod } from "@/interfaces";
import { FormSection } from "./form-section.components";
import { Input, InputSelect } from "../inputs";
import {
    Clock as ValidityIcon,
    PackageMinus as BatchesMinimumIcon,
    Boxes as BatchesEconomicIcon
} from "lucide-react";


interface FormTelephoneProps<T extends FieldValues> {
    mode?: FormStateType; // 'editing' | 'viewing' | 'reviewing';
    methods: UseFormReturn<T>;   
}

export const FormTelephone = <T extends FieldValues>({mode, methods}:FormTelephoneProps<T>) => {
    return(
        <FormSection className="mt-2 lg:mt-3 lg:flex-row gap-4">
            {/* Tipo do prazo */}
            <div></div>
        </FormSection>
    );
};