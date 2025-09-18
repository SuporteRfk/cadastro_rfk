import { SafeReviewField } from "../review-field/safe-review-field.components";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { FormSection } from "./form-section.components";
import { TbNumber as NCMIcon} from "react-icons/tb";
import { Input, InputWithMask } from "../inputs";
import { FormStateType } from "@/interfaces";
import {
    Ruler as UnitMeasureIcon,
    Landmark as TaxIcon,
    Crown as MarkIcon,
    Cherry as FlavorIcon,
    GitPullRequestCreateArrow as ParentIcon
} from "lucide-react";


interface FormProductAttributesProps<T extends FieldValues> {
    mode?: FormStateType; // 'editing' | 'viewing' | 'reviewing';
    methods: UseFormReturn<T>;
    showSecondUnitMeasure?: boolean;
    showFlavorAndMark?:boolean;
    showCestAndTax?:boolean;
    labelMarkAndFlavor?: "Fardo" | "Unitário" | "Copacker";
    showParentCode?:boolean;
}

export const FormProductAttributes =<T extends FieldValues>({mode, methods, labelMarkAndFlavor,showSecondUnitMeasure=false, showFlavorAndMark=false, showCestAndTax=false, showParentCode=false}:FormProductAttributesProps<T>) => {
    return (
        <div className="flex flex-col w-full">
            <FormSection className="mt-2 md:mt-3 md:flex-row gap-4">
                {/* Unidade de medida*/}
                <SafeReviewField field="unidade_medida" mode={mode || "viewing"}>
                    <Input    
                        label="Unidade de Medida" 
                        name="unidade_medida"
                        register={methods.register("unidade_medida" as Path<T>)}
                        error={methods.formState.errors.unidade_medida?.message as string | undefined} 
                        placeholder="Unidade de medida por extenso. Ex: Unidade(UN)"
                        type="text"
                        icon={UnitMeasureIcon}
                        readOnly={mode === 'viewing' || mode === 'reviewing'}
                    />
                </SafeReviewField>
                {/* segunda unidade de medida*/}
                {showSecondUnitMeasure &&
                    <SafeReviewField field="segunda_unidade_medida" mode={mode || "viewing"}>
                        <Input    
                            label="Segunda unidade de Medida" 
                            name="segunda_unidade_medida"
                            register={methods.register("segunda_unidade_medida" as Path<T>)}
                            error={methods.formState.errors.segunda_unidade_medida?.message as string | undefined} 
                            placeholder="Unidade de medida por extenso. Ex: Unidade(UN)"
                            type="text"
                            icon={UnitMeasureIcon}
                            readOnly={mode === 'viewing' || mode === 'reviewing'}
                        />
                    </SafeReviewField>
                }
                {/* Código do produto pai */}
                {showParentCode &&
                    <SafeReviewField field="codigo_produto_pai" mode={mode || "viewing"}>
                        <Input
                            name="codigo_produto_pai"
                            error={methods.formState.errors.codigo_produto_pai?.message as string | undefined}
                            register={methods.register("codigo_produto_pai" as Path<T>)}
                            type="text"
                            readOnly={mode === 'viewing' || mode === 'reviewing'}
                            label="Cod. Produto Pai"
                            placeholder="Insira o código do produto pai"
                            icon={ParentIcon}
                        />
                    </SafeReviewField>
                }
                {/* NCM */}
                {/* Quando Cest e o grupo tributário fazem parte do form, este NCM é ocultado e 
                    outro input com NCM é desocultado para ficar junto na mesma sessão */}
                {!showCestAndTax &&
                    <SafeReviewField field="ncm" mode={mode || "viewing"}>
                        <InputWithMask
                            label="NCM" 
                            name="ncm"
                            maskType="custom"
                            error={methods.formState.errors.ncm?.message as string | undefined} 
                            Icon={NCMIcon}
                            customMask="9999.99.99"
                            readOnly={mode === 'viewing' || mode === 'reviewing'}
                        />
                    </SafeReviewField>
                }
            </FormSection>

            {/* Sessão sabor e marca */}
            {showFlavorAndMark && 
                <FormSection className="mt-2 md:mt-3 md:flex-row gap-4">
                    {/* Sabor */}
                    <SafeReviewField field="sabor" mode={mode || "viewing"}>
                        <Input    
                            label={labelMarkAndFlavor? `Sabor do ${labelMarkAndFlavor}` : "Sabor"} 
                            name="sabor"
                            register={methods.register("sabor" as Path<T>)}
                            error={methods.formState.errors.sabor?.message as string | undefined} 
                            placeholder="Por favor, insira o sabor"
                            type="text"
                            icon={FlavorIcon}
                            readOnly={mode === 'viewing' || mode === 'reviewing'}
                        />
                    </SafeReviewField>
                    {/* Marca */}
                    <SafeReviewField field="marca" mode={mode || "viewing"}>
                        <Input    
                            label={labelMarkAndFlavor? `Marca do ${labelMarkAndFlavor}` : "Marca"} 
                            name="marca"
                            register={methods.register("marca" as Path<T>)}
                            error={methods.formState.errors.marca?.message as string | undefined} 
                            placeholder="Por favor, insira a marca"
                            type="text"
                            icon={MarkIcon}
                            readOnly={mode === 'viewing' || mode === 'reviewing'}
                        />
                    </SafeReviewField>
               
                </FormSection>
            }

            {/* Sessão CEST , Grupo Tributário e NCM*/}
            {showCestAndTax && 
                <FormSection className="mt-2 md:mt-3 md:flex-row gap-4">
                    <SafeReviewField field="ncm" mode={mode || "viewing"}>
                        <InputWithMask
                            label="NCM" 
                            name="ncm"
                            maskType="custom"
                            error={methods.formState.errors.ncm?.message as string | undefined} 
                            Icon={NCMIcon}
                            customMask="9999.99.99"
                            readOnly={mode === 'viewing' || mode === 'reviewing'}
                        />
                    </SafeReviewField>
                    {/* CEST */}
                    <SafeReviewField field="cest" mode={mode || "viewing"}>
                        <InputWithMask   
                            label="CEST" 
                            name="cest"
                            maskType="custom"
                            error={methods.formState.errors.cest?.message as string | undefined} 
                            Icon={NCMIcon}
                            customMask="99.999.99"   
                            readOnly={mode === 'viewing' || mode === 'reviewing'}
                        />
                    </SafeReviewField>
                    {/* Grupo Tributário  | Tax Group*/}
                    <SafeReviewField field="grupo_tributario" mode={mode || "viewing"}>
                        <Input    
                            label="Grupo Tributário" 
                            name="grupo_tributario"
                            register={methods.register("grupo_tributario" as Path<T>)}
                            error={methods.formState.errors.grupo_tributario?.message as string | undefined} 
                            placeholder="Insira o grupo tributário do produto"
                            type="number"
                            icon={TaxIcon}
                            readOnly={mode === 'viewing' || mode === 'reviewing'}
                        />
                    </SafeReviewField>
                </FormSection>
            }
        </div>
        
    );
};