import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel
  } from "@/components/ui/select";


interface IInputSelectProps {
    name: string;
    label?: string; 
    selectLabel?: string;
    placeholder: string;
    error?: string;
    options: string[];
    maxWidth?: string;
    disabled?: boolean;
}


export const InputSelect = ({name,label, selectLabel, placeholder, error, options, maxWidth="max-w-full", disabled=false}:IInputSelectProps) => {
    const { setValue, watch, getValues } = useFormContext();

    // Estado local para armazenar o valor selecionado
    const [selectedValue, setSelectedValue] = useState(getValues(name) || "");
    
    const value = watch(name);
    useEffect(() => {
      setSelectedValue(value ?? "");
    }, [value]);   

     // Atualiza o estado e informa o react-hook-form
     const handleSelectChange = (value: string) => {
        setSelectedValue(value);
        setValue(name, value); // 🚀 Atualizando o valor no react-hook-form
    };

    return (
        <div className={`w-full flex flex-col gap-1 relative my-1.5 ${maxWidth}`}>
            <p className="text-sm font-medium pl-0.5 text-text-medium">{label}</p>
            <div className="flex flex-col gap-2">
                <Select onValueChange={handleSelectChange} value={selectedValue} disabled={disabled}>
                    <SelectTrigger id={name} className={`
                        ${error && "border-red-400"}
                        ${disabled ? "bg-neutral/30 cursor-not-allowed text-gray-500" : ""}
                    `}>
                        <SelectValue placeholder={placeholder}/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup >
                            <SelectLabel>{selectLabel}</SelectLabel>
                            {options.map((options, i)=>(
                                <div className="" key={i}>
                                    <SelectItem value={options} >{options}</SelectItem>
                                </div>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                {error && <p className="text-error/80 text-xs pl-1">{error}</p>}
            </div>
        </div>
    );
}

