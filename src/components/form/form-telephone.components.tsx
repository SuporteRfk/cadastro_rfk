import { FieldValues, UseFormReturn } from "react-hook-form";
import { FormStateType } from "@/interfaces";
import { FormSection } from "./form-section.components";
import { InputWithMask } from "../inputs";
import { 
    FaWhatsapp as WhatsAppIcon,
} from "react-icons/fa6";
import {
    Phone as TelephoneIcon,
} from "lucide-react";
import { SafeReviewField } from "../review-field/safe-review-field.components";



interface FormTelephoneProps<T extends FieldValues> {
    mode?: FormStateType; // 'editing' | 'viewing' | 'reviewing';
    methods: UseFormReturn<T>;   
}

export const FormTelephone = <T extends FieldValues>({mode, methods}:FormTelephoneProps<T>) => {
         
    return(
        <FormSection className="mt-2 lg:mt-3 lg:flex-row gap-4">
            {/* Telefone */}
            <SafeReviewField field="telefone_1" mode={mode || "viewing"}>
                <InputWithMask 
                    name="telefone_1"
                    error={methods.formState.errors.telefone_1?.message as string | undefined}
                    label="Telefone Principal"
                    Icon={WhatsAppIcon}
                    maskType="dynamic"
                    readOnly={mode === 'viewing' || mode === 'reviewing'}
                />    
            </SafeReviewField>
            {/* Telefone 2 Opcional*/}    
            <SafeReviewField field="telefone_2" mode={mode || "viewing"}>
                <InputWithMask 
                    name="telefone_2"
                    error={methods.formState.errors.telefone_2?.message as string | undefined}
                    label="Telefone 2 opcional"
                    Icon={WhatsAppIcon}
                    maskType={"dynamic"}
                    readOnly={mode === 'viewing' || mode === 'reviewing'}
                />  
            </SafeReviewField>
            {/* Telefone 3 Opcional */}
            <SafeReviewField field="telefone_3" mode={mode || "viewing"}>
                <InputWithMask 
                    name="telefone_3"
                    error={methods.formState.errors.telefone_3?.message as string | undefined}
                    label="Telefone 3 opcional"
                    Icon={TelephoneIcon}
                    maskType="dynamic"
                    readOnly={mode === 'viewing' || mode === 'reviewing'}
                /> 
            </SafeReviewField>
            {/* Telefone 4 Opcional */}
            <SafeReviewField field="nome_fantasia" mode={mode || "viewing"}>
                <InputWithMask 
                    name="telefone_4"
                    error={methods.formState.errors.telefone_4?.message as string | undefined}
                    label="Telefone 4 opcional"
                    Icon={TelephoneIcon}
                    maskType="dynamic"
                    readOnly={mode === 'viewing' || mode === 'reviewing'}
                /> 
            </SafeReviewField>
     
        </FormSection>
    );
};


  