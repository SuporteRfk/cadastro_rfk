import { FieldValues, UseFormReturn } from "react-hook-form";
import { FormSection } from "./form-section.components";
import { FormStateType } from "@/interfaces";
import { InputDecimal } from "../inputs";
import {
    Move3D as DepthIcon,
    MoveHorizontal as WidthIcon,
    MoveVertical as HeightIcon
} from "lucide-react";


const ConfigSecondDimensions = {
    formCopacker: {
      depth: {
          label: "Profundidade (outro)",
          placeholder: "Medida da profundidade",
          nameRegister: "profundidade_outro",
      },
      width:{
        label:"Largura (outro)",
        placeholder: "Medida da largura",
        nameRegister: "largura_outro"
      },
      height:{
        label:"Altura (outro)",
        placeholder: "Medida da altura",
        nameRegister: "altura_outro"
      }
    },
    formPABurden: {
        depth: {
            label: "Profundidade Unitário",
            placeholder: "Medida da profundidade da unidade",
            nameRegister: "profundidade_unitario",
        },
        width:{
          label:"Largura Unitário",
          placeholder: "Medida da largura da unidade",
          nameRegister: "largura_unitario"
        },
        height:{
          label:"Altura Unitário",
          placeholder: "Medida da altura da unidade",
          nameRegister: "altura_unitario"
        }
    },
    formPaUnitary: {
        depth: {
            label: "Profundidade Unitário",
            placeholder: "Medida da profundidade da unidade",
            nameRegister: "profundidade_unitario",
        },
        width:{
          label:"Largura Unitário",
          placeholder: "Medida da largura da unidade",
          nameRegister: "largura_unitario"
        },
        height:{
          label:"Altura Unitário",
          placeholder: "Medida da altura da unidade",
          nameRegister: "altura_unitario"
        }
    }
  };



interface FormProductDimensionsProps<T extends FieldValues> {
    mode?: FormStateType; // 'editing' | 'viewing' | 'reviewing';
    methods: UseFormReturn<T>;
    configSecondDimensions: keyof typeof ConfigSecondDimensions
}

export const FormProductDimensions = <T extends FieldValues>({mode, methods, configSecondDimensions}:FormProductDimensionsProps<T>) => {
    
    // Recuperando as configurações do tipo ConfigSecondCodeBar com base no tipo do form
    const config = ConfigSecondDimensions[configSecondDimensions];
    
    return(
          <div className={`flex flex-col w-full ${configSecondDimensions === "formPaUnitary" && "flex-col-reverse"}`}>
             {/* Profundidade, Largura e Altura */}
             <FormSection className="sm:flex-row gap-4 w-full">
                    {/* Profundidade */}
                    <InputDecimal  
                        Icon={DepthIcon}  
                        name="profundidade_fardo"
                        label="Profundidade do fardo" 
                        placeholder="Medida da profundidade do fardo"
                        error={methods.formState.errors.profundidade_fardo?.message as string | undefined} 
                        readOnly={mode === 'viewing' || mode === 'reviewing'}
                    />
                    {/* Largura */}
                    <InputDecimal  
                        Icon={WidthIcon}  
                        name="largura_fardo"
                        label="Largura do fardo" 
                        placeholder="Medida da largura do fardo"
                        error={methods.formState.errors.largura_fardo?.message as string | undefined}
                        readOnly={mode === 'viewing' || mode === 'reviewing'} 
                    />
                    {/* Altura */}
                    <InputDecimal  
                        Icon={HeightIcon}  
                        name="altura_fardo"
                        label="Altura do fardo" 
                        placeholder="Medida da altura do fardo"
                        error={methods.formState.errors.altura_fardo?.message as string | undefined}
                        readOnly={mode === 'viewing' || mode === 'reviewing'} 
                    />
                </FormSection>

                {/* Sessão das segundas dimnesõesdo produto */}
                <FormSection className="sm:flex-row gap-4 w-full">
                    {/* Profundidade */}
                    <InputDecimal  
                        Icon={DepthIcon}  
                        name={config.depth.nameRegister}
                        label={config.depth.label} 
                        placeholder={config.depth.placeholder}
                        error={methods.formState.errors[config.depth.nameRegister]?.message as string | undefined} 
                        readOnly={mode === 'viewing' || mode === 'reviewing'} 
                    />
                    {/* Largura */}
                    <InputDecimal  
                        Icon={WidthIcon}  
                        name={config.width.nameRegister}
                        label={config.width.label} 
                        placeholder={config.width.placeholder}
                        error={methods.formState.errors[config.width.nameRegister]?.message  as string | undefined}  
                        readOnly={mode === 'viewing' || mode === 'reviewing'} 
                    />
                    {/* Altura */}
                    <InputDecimal  
                        Icon={HeightIcon}  
                        name={config.height.nameRegister}
                        label={config.height.label}
                        placeholder={config.height.placeholder}
                        error={methods.formState.errors[config.height.nameRegister]?.message as string | undefined} 
                        readOnly={mode === 'viewing' || mode === 'reviewing'} 
                    />
                </FormSection>
          </div>
        
    );
};