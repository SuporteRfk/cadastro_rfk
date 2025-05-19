import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { FormSection } from "./form-section.components";
import { FormStateType } from "@/interfaces";
import { Input } from "../inputs";
import {
    Box as packagingTypeIcon,
    Warehouse as StorageIcon,
    Expand as packagingSizeIcon,
} from "lucide-react";


interface FormProductPackagingInfoProps<T extends FieldValues> {
    mode?: FormStateType; // 'editing' | 'viewing' | 'reviewing';
    methods: UseFormReturn<T>;
    valueInitialStorage?: string;
   
}

export const FormProductPackagingInfo = <T extends FieldValues>({mode, methods, valueInitialStorage}:FormProductPackagingInfoProps<T>) => {
    return(
        <FormSection className="mt-2 md:mt-3 md:flex-row gap-4">
             {/* Armazém */}
             <Input    
                label="Armazém Padrão" 
                name="armazem_padrao"
                register={methods.register("armazem_padrao" as  Path<T>)}
                error={methods.formState.errors.armazem_padrao?.message as string | undefined} 
                placeholder="Informe o armazém"
                type="text"
                icon={StorageIcon}
                valueInitial={valueInitialStorage ?? valueInitialStorage}
                readOnly={mode === 'viewing' || mode === 'reviewing'}
            />

            {/* Tamanho Embalagem */}
            <Input    
                label="Tamanho da Embalagem" 
                name="tamanho_embalagem"
                register={methods.register("tamanho_embalagem" as  Path<T>)}
                error={methods.formState.errors.tamanho_embalagem?.message as string | undefined} 
                placeholder="Informe o tamanho da embalagem"
                type="text"
                icon={packagingSizeIcon}
                readOnly={mode === 'viewing' || mode === 'reviewing'}
            />
           
            {/*  tipo embalagem*/}
            <Input    
                label="Tipo de Embalagem" 
                name="tipo_embalagem"
                register={methods.register("tipo_embalagem" as Path<T>)}
                error={methods.formState.errors.tipo_embalagem?.message as string | undefined} 
                placeholder="Informe o tipo de embalagem"
                type="text"
                icon={packagingTypeIcon}
                readOnly={mode === 'viewing' || mode === 'reviewing'}
            />
        </FormSection>
    );
};