import { SafeReviewField } from "../review-field/safe-review-field.components";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { FormStateType, OptionYesNo } from "@/interfaces";
import { FormSection } from "./form-section.components";
import { Input, InputSelect } from "../inputs";
import {
    ClipboardList as CnaeIcon,
    Binary as RegistrationsIcon,
    Mail as EmailIcon,
} from "lucide-react";


interface FormTaxIdentificationProps<T extends FieldValues> {
    mode?: FormStateType; // 'editing' | 'viewing' | 'reviewing';
    methods: UseFormReturn<T>;
    optionsTpj: string[];
    typeForm: "client" | "supplier";
    isPj?: boolean;
}

export const FormTaxIdentification = <T extends FieldValues>({mode, methods, optionsTpj, typeForm, isPj=false}:FormTaxIdentificationProps<T>) => {
    const configEmailField = {
        name: typeForm === "client" ? "email_cliente" : "email_fornecedor",
        label: typeForm === "client" ? "Email do Cliente" : "Email do Fornecedor"
    } 
    
    return(
        <div className="w-full flex flex-col">
            {/* Sessão CNAE e Tipo de pessoa jurídica */}
            <FormSection className="xl:flex-row gap-1 md:gap-4 md:mt-3">
                {/* CNAE */}
                <SafeReviewField field="cnae" mode={mode || "viewing"}>
                    <Input    
                        label="CNAE" 
                        name="cnae"
                        register={methods.register("cnae" as Path<T>)}
                        error={methods.formState.errors.cnae?.message as string | undefined} 
                        placeholder="Insira o CNAE"
                        type="text"
                        icon={CnaeIcon}
                        readOnly={mode === 'viewing' || mode === 'reviewing'}
                    />
                </SafeReviewField>
                {/* Tipo de Pessoa Jurídica */}
                <SafeReviewField field="tpj" mode={mode || "viewing"}>
                    <InputSelect
                        label="TPJ"
                        selectLabel="Tipo de Pessoa Jurídica"
                        options={Object.values(optionsTpj)}
                        name="tpj"
                        error={methods.formState.errors.tpj?.message as string | undefined}
                        placeholder="Selecione o tipo de pessoa jurídica"
                        maxWidth="md:max-w-[500px]"
                        disabled={mode === 'viewing' || mode === 'reviewing'}
                    />                      
                </SafeReviewField>
            </FormSection>

            
            {/* Inscrições (estadual e municipal) */}
            <FormSection className="xl:flex-row gap-1 md:gap-4 md:mt-3">
                {/* Inscrição Estadual */}
                <SafeReviewField field="inscricao_estadual" mode={mode || "viewing"}>
                    <Input    
                        label="Inscrição Estadual" 
                        name="inscricao_estadual"
                        register={methods.register("inscricao_estadual" as Path<T>)}
                        error={methods.formState.errors.inscricao_estadual?.message as string | undefined} 
                        placeholder="Insira a inscrição estadual"
                        type="text"
                        icon={RegistrationsIcon}
                        readOnly={mode === 'viewing' || mode === 'reviewing'}
                        maxCaractere={14}
                    />
                </SafeReviewField>
                {/* Inscrição Municipal */}
                <SafeReviewField field="inscricao_municipal" mode={mode || "viewing"}>
                    <Input    
                        label="Inscrição Municipal" 
                        name="inscricao_municipal"
                        register={methods.register("inscricao_municipal" as Path<T>)}
                        error={methods.formState.errors.inscricao_municipal?.message as string | undefined} 
                        placeholder="Insira a inscrição municipal"
                        type="text"
                        icon={RegistrationsIcon}
                        readOnly={mode === 'viewing' || mode === 'reviewing'}
                        maxCaractere={14}
                    />
                </SafeReviewField>
                {/* é contribuinte */}
                <SafeReviewField field="contribuinte" mode={mode || "viewing"}>
                    <InputSelect
                        label="Contribuinte"
                        options={Object.values(OptionYesNo)}
                        name="contribuinte"
                        error={methods.formState.errors.contribuinte?.message as string | undefined}
                        placeholder="SIM / NÃO"
                        maxWidth="md:max-w-[500px]"
                        disabled={mode === 'viewing' || mode === 'reviewing'}
                    />      
                </SafeReviewField>
            </FormSection>
            
            {/* Email do cliente, optante e se destaca I.E */}
            <FormSection className="xl:flex-row gap-1 md:gap-4 md:mt-3">
                {/* Email do cliente */}
                <SafeReviewField field={configEmailField.name} mode={mode || "viewing"}>
                    <Input    
                        label={configEmailField.label}
                        name={configEmailField.name}
                        register={methods.register(configEmailField.name as Path<T>)}
                        error={methods.formState.errors[configEmailField.name]?.message as string | undefined} 
                        placeholder="Insira o email do cliente"
                        type="text"
                        icon={EmailIcon}
                        readOnly={mode === 'viewing' || mode === 'reviewing'}
                    />
                </SafeReviewField>
                {/* Optante pelo simples */}
                <SafeReviewField field="optante_simples" mode={mode || "viewing"}>
                    <InputSelect
                        name="optante_simples"  
                        error={methods.formState.errors.optante_simples?.message as string | undefined}
                        placeholder="SIM / NÃO"
                        maxWidth="md:max-w-[500px]"
                        label="Optante pelo simples"
                        selectLabel="Optante pelo simples"
                        options={Object.values(OptionYesNo)}
                        disabled={mode === 'viewing' || mode === 'reviewing'}
                    /> 
                </SafeReviewField>
                {/* Destaca I.E caso seja CNPJ e seja cadastro do cliente*/}
                {(isPj && typeForm ==="client") && 
                    <SafeReviewField field="destaca_ie" mode={mode || "viewing"}>
                        <InputSelect
                            name="destaca_ie"  
                            error={methods.formState.errors.destaca_ie?.message as string | undefined}
                            placeholder="SIM / NÃO"
                            maxWidth="md:max-w-[500px]"
                            label="Destaca I.E"
                            selectLabel="Se tiver Inscrição Estadual é SIM, caso constrário NÃO."
                            options={Object.values(OptionYesNo)}
                            disabled={mode === 'viewing' || mode === 'reviewing'}
                    /> 
                    </SafeReviewField>
                }   
            </FormSection>
        </div>
    );
};