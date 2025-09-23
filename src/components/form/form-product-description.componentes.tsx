import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { FormSection } from "./form-section.components";
import { FormStateType } from "@/interfaces";
import { Input } from "../inputs";
import {
    ClipboardPenLine as DescriptionIcon,
    Atom as ScientificIcon,
} from "lucide-react";
import { SafeReviewField } from "../review-field/safe-review-field.components";


interface FormProductCategorySelectorProps<T extends FieldValues> {
    mode?: FormStateType; // 'editing' | 'viewing' | 'reviewing';
    methods: UseFormReturn<T>;
    viewInstructions?: boolean;
    viewKeyUseProduct?: boolean;
    viewKeyNameScientific?: boolean;
}

export const FormProductDescription = <T extends FieldValues>({mode, methods, viewInstructions=false, viewKeyUseProduct=false, viewKeyNameScientific=true}:FormProductCategorySelectorProps<T>) => {
    return(
        <FormSection className={viewInstructions? "flex-col" : "mt-2 md:mt-3 md:flex-row gap-4"}>
            {/* Descrição*/}
            <SafeReviewField field="descricao_curta" mode={mode || "viewing"}>
                <Input    
                    label="Descrição Curta" 
                    name="descricao_curta"
                    register={methods.register("descricao_curta" as Path<T>)}
                    error={methods.formState.errors.descricao_curta?.message as string | undefined} 
                    placeholder="Descrição breve do fardo"
                    type="text"
                    icon={DescriptionIcon}
                    readOnly={mode === 'viewing' || mode === 'reviewing' || mode === 'fiscal'}
                />
            </SafeReviewField>
           
           {/* Mostrar instruções para preencher a descrição */}
           {viewInstructions && 
                <div className="mb-3">
                    <p className="ml-1 my-1 text-text-neutral text-[12px]">
                        Regra para Descrição, seguir a ordem: <span className="text-medium/80 font-semibold">Tipo do produto - Marca - Sabor - Tamanho - Descartável/Retornável</span>
                    </p>
                    <p className="ml-1 my-1 text-text-neutral text-[12px]">
                        Abreviação para produtos com dois nomes, Ex: <span className="text-medium/80 font-semibold">Vinho Tinto</span>, colocar primeira letra do primeiro e segundo nome. <span className="text-medium/80 font-semibold">Ex: VT</span>
                    </p>
                    <p className="ml-1 my-1 text-text-neutral text-[12px]">
                        produtos com um nome, Ex: <span className="text-medium/80 font-semibold">Espumante</span>, abreviar utilizando as 3 primeiras letras. <span className="text-medium/80 font-semibold">Ex: ESP</span>
                    </p>
                </div>
            }

            {/* Uso do produto*/}
            {viewKeyUseProduct &&
                <SafeReviewField field="descricao_uso" mode={mode || "viewing"}>
                    <Input    
                        label="Uso do produto" 
                        name="descricao_uso"
                        register={methods.register("descricao_uso" as Path<T>)}
                        error={methods.formState.errors.descricao_uso?.message as string | undefined} 
                        placeholder="Para que o produto será utilizado"
                        type="text"
                        icon={DescriptionIcon}
                        readOnly={mode === 'viewing' || mode === 'reviewing' || mode === 'fiscal'}
                    />
                </SafeReviewField>
            }

            {/* Nome Científico*/}
            {viewKeyNameScientific && (
                <>
                    <SafeReviewField field="nome_cientifico" mode={mode || "viewing"}>
                        <Input    
                            label="Nome Científico" 
                            name="nome_cientifico"
                            register={methods.register("nome_cientifico" as Path<T>)}
                            error={methods.formState.errors.nome_cientifico?.message as string | undefined} 
                            placeholder="Descrição completa do nome cientifíco"
                            type="text"
                            icon={ScientificIcon}
                            readOnly={mode === 'viewing' || mode === 'reviewing' || mode === 'fiscal'}
                        />
                    </SafeReviewField>
                    {/* mostrar instruções para preenchimento do nome científico */}
                    {viewInstructions && 
                        <div className="mb-3">
                            <p className="ml-1 text-text-neutral text-[12px]">
                                Como preencher, seguir a ordem: <span className="text-medium/80 font-semibold">Tipo do produto - Marca - Sabor - Tamanho - Descartável/Retornável</span>
                            </p>
                            <p className="ml-1 mt-1 text-accent font-medium text-[12px]">
                                Ex: REFRIGERANTE REFRIKO GUARANA 6X2LT - DESCARTÁVEL
                            </p>
                        </div>
                    }
                </>
            
                
            )}
                
        </FormSection>
    );
};