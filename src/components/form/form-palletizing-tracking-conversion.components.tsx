import { ConverterType, FormStateType, Trail } from "@/interfaces";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Input, InputDecimal, InputSelect } from "../inputs";
import { FormSection } from "./form-section.components";
import { MdPallet as PalletIcon } from "react-icons/md";
import {
    Variable as ConverterIcon,
    Layers as BallastIcon,
} from "lucide-react";


interface FormPalletizingTrackingConversionProps<T extends FieldValues> {
    mode?: FormStateType; // 'editing' | 'viewing' | 'reviewing';
    methods: UseFormReturn<T>;
    showConverters: boolean;
}

export const FormPalletizingTrackingConversion = <T extends FieldValues>({mode, methods, showConverters}:FormPalletizingTrackingConversionProps<T>) => {
    return(
        <FormSection className="xl:flex-row gap-1 md:gap-4 md:mt-3">
           {showConverters ? (
                <>
                    {/* Fator conversor */}
                    <InputDecimal  
                        Icon={ConverterIcon}  
                        name="fator_conversor"
                        label="Fator Conversor" 
                        placeholder="Fator conversor do insumo"
                        error={methods.formState.errors.fator_conversor?.message as string | undefined} 
                        readOnly={mode === 'viewing' || mode === 'reviewing'}
                    />
                    {/* Tipo de conversor*/}
                    <InputSelect
                        label="Tipo de conversor"
                        selectLabel="Conversores"
                        options={Object.values(ConverterType)}
                        name="tipo_conversor"
                        error={methods.formState.errors.tipo_conversor?.message as string | undefined}
                        placeholder="Selecione o conversor"
                        disabled={mode === 'viewing' || mode === 'reviewing'}
                    />
                </>
           ): (
               <>
                    {/* paletizacao*/}
                    <Input    
                        label="Paletização" 
                        name="paletizacao"
                        register={methods.register("paletizacao" as Path<T>)}
                        error={methods.formState.errors.paletizacao?.message as string | undefined} 
                        placeholder="Informe a paletização"
                        type="number"
                        icon={PalletIcon}
                        readOnly={mode === 'viewing' || mode === 'reviewing'}
                    />
                    {/* lastro */}
                    <Input    
                        label="Lastro" 
                        name="lastro"
                        register={methods.register("lastro"  as Path<T>)}
                        error={methods.formState.errors.lastro?.message as string | undefined} 
                        placeholder="Informe o lastro"
                        type="number"
                        icon={BallastIcon}
                        readOnly={mode === 'viewing' || mode === 'reviewing'}
                    />
                </>
           )}
           {/* Rastro */}
           <InputSelect
               label="Rastro"
               selectLabel="Tipo de Rastro"
               options={Object.values(Trail)}
               name="rastro"
               error={methods.formState.errors.rastro?.message as string | undefined}
               placeholder="Selecione o rastro"
               disabled={mode === 'viewing' || mode === 'reviewing'}
           />
        </FormSection>
    );
};