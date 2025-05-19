import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { FormStateType, PfOrPj, OptionYesNo } from "@/interfaces";
import { useCNPJSearch } from "@/hooks/use-CNPJ-search.hook";
import { FormSection } from "./form-section.components";
import { InputSelect, InputWithMask } from "../inputs";
import { FileDigit as CpfCnpjIcon} from "lucide-react";
import { useEffect } from "react";
import { unmask } from "remask";


interface FormRegistrationIdentificationProps<T extends FieldValues> {
    mode?: FormStateType; // 'editing' | 'viewing' | 'reviewing';
    methods: UseFormReturn<T>;
    typeForm: "client" | "supplier";
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    optionsForType: string[];
   
}

export const FormRegistrationIdentification = <T extends FieldValues>({mode, methods, typeForm, setLoading, optionsForType}:FormRegistrationIdentificationProps<T>) => {
  
    const typeRegisterValue = methods.watch("fisica_juridica" as Path<T>);
    const cnpjValue = methods.watch("cnpj_cpf" as Path<T>);
    const cnpjWithoutMask = cnpjValue ? unmask(cnpjValue) : ""; 
   

    const searchCnpj = async (cnpj: string) => {
        await useCNPJSearch({cnpjValue:cnpj , methods:methods, setLoading:setLoading, form: typeForm});
    };

    useEffect(() => {
        if(typeRegisterValue === PfOrPj.JURIDICO && cnpjWithoutMask.length === 14){
            searchCnpj(cnpjWithoutMask)
        }
    },[cnpjWithoutMask])
    
    return(
        <FormSection className="mt-2 md:mt-3 md:flex-row gap-4">
            {/* Tipo de cadastro (PF ou PJ)*/}
            <InputSelect
                label="Tipo de Cadastro"
                name="fisica_juridica"
                options={Object.values(PfOrPj)}
                placeholder="PF ou PJ"
                error={methods.formState.errors.fisica_juridica?.message as string | undefined}
                maxWidth="max-w-[140px]"
                disabled={mode === 'viewing' || mode === 'reviewing'}
            />
            {/* CPF/CNPJ */}
            <InputWithMask
                label={typeRegisterValue === PfOrPj.FISICO ? "CPF" : "CNPJ"}
                Icon={CpfCnpjIcon}
                name="cnpj_cpf"
                error={methods.formState.errors.cnpj_cpf?.message as string | undefined}
                maskType={typeRegisterValue === PfOrPj.FISICO? "cpf": "cnpj"}
                readOnly={(mode === 'viewing' || mode === 'reviewing') || !typeRegisterValue}
                widthContainer="min-w-[190px] max-w-[190px]"
            />
            {/* Tipo */}
            <InputSelect
                label="Tipo"
                name="tipo"
                placeholder="Escolha um tipo"
                options={optionsForType}
                error={methods.formState.errors.tipo?.message as string | undefined}
                disabled={mode === 'viewing' || mode === 'reviewing'}
            />
            {/* Apenas para Fornecedor */}
            {/* Produtor Rural */}
            {typeForm === "supplier" && 
                <InputSelect
                    label="Produtor Rural"
                    name="produtor_rural"
                    placeholder="É produtor Rural?"
                    options={Object.values(OptionYesNo)}
                    error={methods.formState.errors.produtor_rural?.message as string | undefined}
                    disabled={mode === 'viewing' || mode === 'reviewing'}
                />
            }
        </FormSection>
    );
};

