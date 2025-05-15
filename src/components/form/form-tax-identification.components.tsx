import { FormStateType, OptionYesNo } from "@/interfaces";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Input, InputSelect } from "../inputs";
import { FormSection } from "./form-section.components";
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
                {/* Tipo de Pessoa Jurídica */}
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
            </FormSection>

            
            {/* Inscrições (estadual e municipal) */}
            <FormSection className="xl:flex-row gap-1 md:gap-4 md:mt-3">
                {/* Inscrição Estadual */}
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
                {/* Inscrição Municipal */}
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
                {/* é contribuinte */}
                <InputSelect
                    label="Contribuinte"
                    options={Object.values(OptionYesNo)}
                    name="contribuinte"
                    error={methods.formState.errors.contribuinte?.message as string | undefined}
                    placeholder="SIM / NÃO"
                    maxWidth="md:max-w-[500px]"
                    disabled={mode === 'viewing' || mode === 'reviewing'}
                />      
            </FormSection>
            
            {/* Email do cliente, optante e se destaca I.E */}
            <FormSection className="xl:flex-row gap-1 md:gap-4 md:mt-3">
                {/* Email do cliente */}
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
                {/* Optante pelo simples */}
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
                {/* Destaca I.E caso seja CNPJ e seja cadastro do cliente*/}
                {(isPj && typeForm ==="client") && 
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
                }   
            </FormSection>
        </div>
    );
};