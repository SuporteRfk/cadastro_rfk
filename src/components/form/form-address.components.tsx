import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import { consultationCepService } from "@/services/viaCep-api/get-cep.service";
import { FormSection } from "./form-section.components";
import { Input, InputWithMask } from "../inputs";
import { FormStateType } from "@/interfaces";
import { useEffect } from "react";
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
}

export const FormAddress = <T extends FieldValues>({mode, methods, isBillingAddress=false, setLoading}:FormAddressProps<T>) => {
    
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
            
            if(address){
                methods.setValue(fieldConfig.zip.name as Path<T>, address.cep as PathValue<T, Path<T>>);
                methods.setValue(fieldConfig.address.name as Path<T>, address.endereco as PathValue<T, Path<T>>);
                methods.setValue(fieldConfig.district.name as Path<T>, address.bairro as PathValue<T, Path<T>>);
                methods.setValue(fieldConfig.complement.name as Path<T>, address.complemento as PathValue<T, Path<T>>);
                methods.setValue(fieldConfig.state.name as Path<T>, address.estado as PathValue<T, Path<T>>);
                methods.setValue(fieldConfig.city.name as Path<T>, address.municipio as PathValue<T, Path<T>>);
            }

        } catch (error) {
            console.error("Erro ao consultar cep: ",error)
        } finally{
            setLoading(false);
        }

    }
    
    useEffect(() => {
      
        if (zipCodeWithoutMask?.length === 8) {
            getAddressData(zipCodeWithoutMask)
        }
    }, [zipCodeValue]);
   

    return( 
        <div className="w-full flex flex-col">
            <FormSection className="lg:flex-row gap-4">
                {/* Telefone */}
                {/* CEP */}
                <InputWithMask    
                    name={fieldConfig.zip.name}
                    error={fieldConfig.zip.error}
                    maskType="custom"
                    customMask={"99999-999"}
                    label="CEP"
                    Icon={ZipCodeIcon}  
                    readOnly={mode === 'viewing' || mode === 'reviewing'}                        
                />
            
                {/* Estado */}
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
                {/* Munucípio */}
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
            </FormSection>
            
            {/* Sessão endereço e número */}
            <FormSection className="lg:flex-row gap-4">
                {/* Endereço */}
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
                {/* Número */}
                <Input    
                    label="Número" 
                    name={fieldConfig.number.name}
                    register={methods.register(fieldConfig.number.name as Path<T>)}
                    error={fieldConfig.number.error} 
                    placeholder="Nº"
                    type="number"
                    icon={AddressIcon}
                    readOnly={mode === 'viewing' || mode === 'reviewing'} 
                    widthContainer="w-[150px]"
                />
            </FormSection>

            {/* Sessão */}
            <FormSection className="lg:flex-row gap-4">
                {/* Bairro */}
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
                {/* Complemento */}
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
            </FormSection>
        </div>

        
    );
};


  