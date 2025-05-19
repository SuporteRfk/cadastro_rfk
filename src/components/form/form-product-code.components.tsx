import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { FormSection } from "./form-section.components";
import { FormStateType } from "@/interfaces";
import { Input } from "../inputs";
import {
    Barcode as CodeBarIcon,
    Computer as CodeSaibIcon,
} from "lucide-react";


const ConfigSecondCodeBar = {
    formPaThird: {
      label: "Código de barras (Segundo)",
      placeholder: "Segundo código de barras",
      nameRegister: "segundo_codigo_barras",
    },
    formPABurden: {
      label: "Código de barras (Unitário)",
      placeholder: "Código de barras da unidade",
      nameRegister: "codigo_barras_unitario",
    },
    formPaUnitary: {
      label: "Código de barras (Fardo)",
      placeholder: "Código de barras do fardo",
      nameRegister: "codigo_barras_fardo",
    }
  };


interface FormProductCodeProps<T extends FieldValues> {
    mode?: FormStateType; // 'editing' | 'viewing' | 'reviewing';
    methods: UseFormReturn<T>;
    showSecondCodeBar?: boolean;
    showOnlyCodeSaib?: boolean;
    configSecondCodeBar?: keyof typeof ConfigSecondCodeBar
}


export const FormProductCode =<T extends FieldValues>({
    showOnlyCodeSaib=false, 
    showSecondCodeBar=false,
    methods,
    mode,
    configSecondCodeBar
}:FormProductCodeProps<T>)=> {

    // Recuperando as configurações do tipo ConfigSecondCodeBar com base no tipo do form
    const config = configSecondCodeBar ? ConfigSecondCodeBar[configSecondCodeBar] : null;


    return(
        <FormSection className="sm:flex-row gap-4 w-full">
            {/* código de barras */}
            {!showOnlyCodeSaib && 
                <>
                    <Input    
                        label="Código de barras GTIN" 
                        name="codigo_barras"
                        register={methods.register("codigo_barras" as Path<T>)}
                        error={methods.formState.errors.codigo_barras?.message as string | undefined} 
                        placeholder="Código de barras da nota fiscal"
                        type="number"
                        icon={CodeBarIcon}
                        readOnly={mode === 'viewing' || mode === 'reviewing'}
                    />
                    {/* segundo código de barras */}
                    {showSecondCodeBar &&
                        <Input    
                            label={config!.label} 
                            name={config!.nameRegister}
                            register={methods.register(config!.nameRegister as Path<T>)}
                            error={methods.formState.errors[config!.nameRegister]?.message as string | undefined} 
                            placeholder={config!.placeholder}
                            type="number"
                            icon={CodeBarIcon}
                            readOnly={mode === 'viewing' || mode === 'reviewing'}
                        />
                    }
                </>
            }
            {/* codido saib */}
            <Input    
                label="Código Saib (opcional)" 
                name="codigo_saib"
                register={methods.register("codigo_saib" as Path<T>) }
                error={methods.formState.errors.codigo_saib?.message as string | undefined} 
                placeholder="Código do saib"
                type="number"
                icon={CodeSaibIcon}
                readOnly={mode === 'viewing' || mode === 'reviewing'}
            />
        </FormSection>
    );
};  