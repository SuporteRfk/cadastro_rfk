
import CurrencyFormat from "react-currency-format/lib/currency-format";
import { useFormContext } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { LucideIcon } from "lucide-react";
import {IconType} from "react-icons"

export interface IInputDecimalProps {
    name: string;
    label?: string;
    error?: string;
    Icon: LucideIcon | IconType;
    placeholder: string;
    decimalScale?:number
}


export const InputDecimal =({Icon, name, error, label, placeholder, decimalScale=10}:IInputDecimalProps) => {
    const { setValue , watch} = useFormContext(); 
    const [internalValue, setInternalValue] = useState<string>("");

    const watchedValue = watch( name );

    useEffect(() => {
        // Se o valor do campo no formulário for vazio ou undefined, reseta o input
        if (watchedValue === "" || watchedValue === undefined || watchedValue === null)  {
            setInternalValue(""); 
        }
      }, [watchedValue]);

    return (
        <div className="flex flex-col w-full max-w-full min-w-0 relative">
            
            {label && 
                <label 
                    htmlFor={name}
                    className="text-text-medium pl-1"
                >
                        {label}
                </label>
            }
            <CurrencyFormat
                className={`
                    w-full min-w-0 max-w-full h-10 rounded-lg px-8 mb-2 bg-white-default no-spinner
                    border ${error ? 'border-error ' : 'border-border'} 
                    focus:outline-hidden ${error ? 'focus:border-error focus:ring-error' : 'focus:border-accent focus:ring-1 focus:ring-accent'}    
                `}
                decimalSeparator=","
                thousandSeparator="."
                decimalScale={decimalScale}
                allowNegative={false}   
                placeholder={placeholder} 
                onValueChange={(values) => {
                    setInternalValue(values.formattedValue)
                    setValue(name, values.value); // Atualiza o valor no Hook Form (mantendo apenas número puro)
                }}
                name={name}
                value={internalValue }
            />
            {Icon && (
              <Icon className="absolute left-2 top-[34px] text-gray-400" size={20} color="var(--text-color-strong)" />
            )}
            {error && <span className="text-sm text-error">{error}</span>}
        </div>
    )
};