import { useFormContext, UseFormRegisterReturn } from "react-hook-form";
import { useEffect, useState } from "react";
import { LucideIcon } from "lucide-react";
import {IconType} from "react-icons";

interface InputProps {
    name: string;
    label?: string;
    placeholder?: string;
    type?: string;
    register?: UseFormRegisterReturn;
    error?: string;
    icon?: LucideIcon | IconType;
    valueInitial?: string;
    maxCaractere?: number;
    readOnly?: boolean;
    widthContainer?: string;
    useUppercase?:boolean;
  }

export const Input = ({name,label,placeholder,type = "text",register,error,icon: Icon,valueInitial="", maxCaractere,readOnly = false,widthContainer="w-full", useUppercase=true}:InputProps) => {
    const [value, setValue] = useState(valueInitial);
    const { watch } = useFormContext();
    const valueInputForm = watch(name) ?? "";
    
    // Atualiza o state interno quando muda o valor inicial (ex: reset de formulário)
    useEffect(() => {
        setValue(valueInitial);    
    }, [valueInitial, valueInputForm]);  

    return(
        <div className={`${widthContainer} flex flex-col gap-1 relative my-1.5`}>
            {label && 
                <label 
                    htmlFor={name} 
                    className="text-sm font-medium pl-0.5 text-text-medium"
                >
                    {label}
                </label>
            }   
            <div className="relative">
                {Icon && <Icon className="absolute left-2 top-[7px]" color="var(--text-color-strong)" size={20} />}

                <input
                    id={name}
                    {...register}
                    type={type}
                    name={name}
                    defaultValue={value.toUpperCase()}
                    onChange={(e) => setValue(e.target.value.toUpperCase())}
                    placeholder={placeholder}
                    maxLength={maxCaractere}
                    readOnly={readOnly}
                    onWheel={type === "number" ? (e) => e.currentTarget.blur() : undefined}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            const form = e.currentTarget.form;
                            const index = Array.prototype.indexOf.call(form, e.currentTarget);
                            const nextInput = form!.elements[index + 1];
                            if (nextInput) (nextInput as HTMLElement).focus();
                        }
                    }}
                    
                        className={`
                        w-full h-8 pl-10 pr-3 rounded-lg text-sm no-spinner ${useUppercase && 'uppercase'}
                        border ${error ? 'border-error' : 'border-border'}
                        focus:outline-hidden ${error ? 'focus:border-error focus:ring-error' : 'focus:border-accent focus:ring-1 focus:ring-accent'}
                        ${readOnly ? 'cursor-not-allowed text-text-medium/75 bg-white-default/65' : 'cursor-text bg-white-default text-text-medium'}
                    `}
                />
            </div>
            {error && <p className="text-error/80 text-xs mt-1 pl-1">{error}</p>}
        </div>
    );
};

