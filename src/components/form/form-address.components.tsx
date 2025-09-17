import { SafeReviewField } from "../review-field/safe-review-field.components";
import { consultationCepService } from "@/services/viaCep-api/get-cep.service";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import { FormSection } from "./form-section.components";
import { Input, InputWithMask } from "../inputs";
import { FormStateType } from "@/interfaces";
import { useEffect, useState } from "react";
import { unMask } from 'remask';
import {
    MapPinned as ZipCodeIcon,
    Map as StateIcon,
    MapPinHouse as AddressIcon,
    MapPinPlus as ComplementIcon,
} from "lucide-react";



interface FormAddressProps<T extends FieldValues> {
    mode?: FormStateType; // 'editing' | 'viewing' | 'reviewing';
    methods: UseFormReturn<T>;   
    isBillingAddress?: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    shouldIgnoreInitialZipCodeSearch?: boolean; // se true, não faz a busca inicial do CEP
}

export const FormAddress = <T extends FieldValues>({mode, methods, isBillingAddress=false, setLoading, shouldIgnoreInitialZipCodeSearch=false}:FormAddressProps<T>) => {
    const [hasUserManuallyChangedZip, setHasUserManuallyChangedZip] = useState(false); // Para evitar a busca automática do CEP quando o usuário já digitou algo

    const zipCodeValue = methods.watch(isBillingAddress ? "cep_cobranca" as Path<T> : "cep" as Path<T>);
    const zipCodeWithoutMask = zipCodeValue ? unMask(zipCodeValue) : "";
    
    // Configuração dos campos
    const fieldConfig = {
        zip: {
            name: isBillingAddress ? "cep_cobranca" : "cep",
            error: methods.formState.errors[isBillingAddress ? "cep_cobranca" : "cep"]?.message as string | undefined,
        },
        state: {
            name: isBillingAddress ? "estado_cobranca" : "estado",
            error: methods.formState.errors[isBillingAddress ? "estado_cobranca" : "estado"]?.message as string | undefined,
        },
        city: {
            name: isBillingAddress ? "municipio_cobranca" : "municipio",
            error: methods.formState.errors[isBillingAddress ? "municipio_cobranca" : "municipio"]?.message as string | undefined,
        },
        address:{
            name: isBillingAddress ? "endereco_cobranca" : "endereco",
            error: methods.formState.errors[isBillingAddress ? "endereco_cobranca" : "endereco"]?.message as string | undefined,
        },
        number: {
            name: isBillingAddress ? "numero_cobranca" : "numero",
            error: methods.formState.errors[isBillingAddress ? "numero_cobranca" : "numero"]?.message as string | undefined,
        },
        district: {
            name: isBillingAddress ? "bairro_cobranca" : "bairro",
            error: methods.formState.errors[isBillingAddress ? "bairro_cobranca" : "bairro"]?.message as string | undefined,
        },
        complement: {
            name: isBillingAddress ? "complemento_cobranca" : "complemento",
            error: methods.formState.errors[isBillingAddress ? "complemento_cobranca" : "complemento"]?.message as string | undefined,
        }

    };


    const getAddressData = async (zipCode:string) => {
        try {
            setLoading(true);
            const address = await consultationCepService(zipCode);
            
            // 🔒 Se todos os campos forem undefined ou nulos, não faz nada
            const isEmpty = Object.values(address).every((value) => value === undefined || value === null || value === "");

            if (isEmpty) {
                console.warn("CEP inválido ou não encontrado. Endereço não preenchido.");
                return; // 🛑 não seta nada
            }


            if(address){
                methods.setValue(fieldConfig.zip.name as Path<T>, address.cep as PathValue<T, Path<T>>);
                methods.setValue(fieldConfig.address.name as Path<T>, address.endereco as PathValue<T, Path<T>>);
                methods.setValue(fieldConfig.district.name as Path<T>, address.bairro as PathValue<T, Path<T>>);
                methods.setValue(fieldConfig.complement.name as Path<T>, address.complemento as PathValue<T, Path<T>>);
                methods.setValue(fieldConfig.state.name as Path<T>, address.estado as PathValue<T, Path<T>>);
                methods.setValue(fieldConfig.city.name as Path<T>, address.municipio as PathValue<T, Path<T>>);
                
                const number = methods.getValues(fieldConfig.number.name as Path<T>);
                if(!number){
                    methods.setValue(fieldConfig.number.name as Path<T>, address.numero as PathValue<T, Path<T>>);
                }
            }

        } catch (error) {
            console.error("Erro ao consultar cep: ",error)
        } finally{
            setLoading(false);
        }

    }

    
    
    useEffect(() => {
        const zipHas8Digits = zipCodeWithoutMask?.length === 8;
        
        if (!zipHas8Digits) {
            // Se apagou ou está incompleto, considera que o usuário está modificando o CEP
            setHasUserManuallyChangedZip(true);
            return;
        };

        // Se não precisa ignorar, sempre busca
        if (zipHas8Digits && !shouldIgnoreInitialZipCodeSearch) {
            getAddressData(zipCodeWithoutMask);
            return;
        }

        // if (zipCodeWithoutMask?.length === 8) {
        //     getAddressData(zipCodeWithoutMask)
        // }

        // Se deve ignorar a primeira busca, mas o usuário modificou depois, então busca
        if (shouldIgnoreInitialZipCodeSearch && hasUserManuallyChangedZip && zipHas8Digits) {
            getAddressData(zipCodeWithoutMask);
        };
    }, [zipCodeValue]);
   

    return( 
        <div className="w-full flex flex-col">
            <FormSection className="lg:flex-row gap-4">
                {/* Telefone */}
                {/* CEP */}
                <SafeReviewField field={fieldConfig.zip.name} mode={mode || "viewing"}>
                    <InputWithMask    
                        name={fieldConfig.zip.name}
                        error={fieldConfig.zip.error}
                        maskType="custom"
                        customMask={"99999-999"}
                        label="CEP"
                        Icon={ZipCodeIcon}  
                        readOnly={mode === 'viewing' || mode === 'reviewing'}                        
                    />
                </SafeReviewField>
            
                {/* Estado */}
                <SafeReviewField field={fieldConfig.state.name} mode={mode || "viewing"}>
                    <Input    
                        label="Estado" 
                        name={fieldConfig.state.name}
                        register={methods.register(fieldConfig.state.name as Path<T>)}
                        error={fieldConfig.state.error} 
                        placeholder="Insira o estado"
                        type="text"
                        icon={StateIcon}
                        readOnly={mode === 'viewing' || mode === 'reviewing'} 
                    />
                </SafeReviewField>
                
                {/* Munucípio */}
                <SafeReviewField field={fieldConfig.city.name} mode={mode || "viewing"}>
                    <Input    
                        label="Municipio" 
                        name={fieldConfig.city.name}
                        register={methods.register(fieldConfig.city.name as Path<T>)}
                        error={fieldConfig.city.error} 
                        placeholder="Insira o municipio"
                        type="text"
                        icon={StateIcon}
                        readOnly={mode === 'viewing' || mode === 'reviewing'} 
                    />
                </SafeReviewField>
            </FormSection>
            
            {/* Sessão endereço e número */}
            <FormSection className="lg:flex-row gap-4">
                {/* Endereço */}
                <SafeReviewField field={fieldConfig.address.name} mode={mode || "viewing"}>
                    <Input    
                        label="Endereço" 
                        name={fieldConfig.address.name}
                        register={methods.register(fieldConfig.address.name as Path<T>)}
                        error={fieldConfig.address.error} 
                        placeholder="Insira o endereço"
                        type="text"
                        icon={AddressIcon}
                        maxCaractere={150}
                        readOnly={mode === 'viewing' || mode === 'reviewing'} 
                    />
                </SafeReviewField>
                {/* Número */}
                <SafeReviewField field={fieldConfig.number.name} mode={mode || "viewing"}>
                    <Input    
                        label="Número" 
                        name={fieldConfig.number.name}
                        register={methods.register(fieldConfig.number.name as Path<T>)}
                        error={fieldConfig.number.error} 
                        placeholder="Nº"
                        type="text"
                        icon={AddressIcon}
                        readOnly={mode === 'viewing' || mode === 'reviewing'} 
                        widthContainer="w-[150px]"
                    />
                </SafeReviewField>
            </FormSection>

            {/* Sessão */}
            <FormSection className="lg:flex-row gap-4">
                {/* Bairro */}
                <SafeReviewField field={fieldConfig.district.name} mode={mode || "viewing"}>
                    <Input    
                        label="Bairro" 
                        name={fieldConfig.district.name}
                        register={methods.register(fieldConfig.district.name as Path<T>)}
                        error={fieldConfig.district.error} 
                        placeholder="Insira o bairro"
                        type="text"
                        icon={AddressIcon}
                        readOnly={mode === 'viewing' || mode === 'reviewing'} 
                        maxCaractere={100}
                    />
                </SafeReviewField>
                {/* Complemento */}
                <SafeReviewField field={fieldConfig.complement.name} mode={mode || "viewing"}>
                    <Input    
                        label="Complemento" 
                        name={fieldConfig.complement.name}
                        register={methods.register(fieldConfig.complement.name as Path<T>)}
                        error={fieldConfig.complement.error} 
                        placeholder="Insira o complemento"
                        type="text"
                        icon={ComplementIcon}
                        readOnly={mode === 'viewing' || mode === 'reviewing'} 
                        maxCaractere={120}
                    />
                </SafeReviewField>
            </FormSection>
        </div>

        
    );
};


  