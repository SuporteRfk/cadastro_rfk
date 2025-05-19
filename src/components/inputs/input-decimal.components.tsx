
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
    decimalScale?:number;
    readOnly?: boolean;
}


export const InputDecimal =({Icon, name, error, label, placeholder, decimalScale=10, readOnly=false}:IInputDecimalProps) => {
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
        <div className="w-full flex flex-col gap-1 relative my-1.5">
            
            {label && 
                <label 
                    htmlFor={name}
                    className="text-sm font-medium pl-0.5 text-text-medium"
                >
                        {label}
                </label>
            }
            <CurrencyFormat
                className={`
                    w-full min-w-0 max-w-full h-8 rounded-lg px-8 mb-1 bg-white-default no-spinner text-sm
                    border ${error ? 'border-error ' : 'border-border'} 
                    focus:outline-hidden ${error ? 'focus:border-error focus:ring-error' : 'focus:border-accent focus:ring-1 focus:ring-accent'}    
                    ${readOnly ? 'cursor-not-allowed text-text-medium/75 bg-white-default/65' : 'cursor-text bg-white-default text-text-medium'}
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
                readOnly={readOnly}
            />
            {Icon && (
              <Icon className="absolute left-2 top-[31px] text-gray-400" size={20} color="var(--text-color-strong)" />
            )}
            {error && <p className="text-error/80 text-xs pl-1">{error}</p>}
        </div>
    )
};