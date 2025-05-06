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
        <div className={`flex flex-col w-full ${maxWidth} gap-1`}>
            <p className="text-text-medium pl-1">{label}</p>
            <div className="flex flex-col gap-2">
                <Select onValueChange={handleSelectChange} value={selectedValue} disabled={disabled}>
                    <SelectTrigger id={name} className={error && "border-red-400"}>
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
                {error && <p className="text-sm text-error">{error}</p>}
            </div>
        </div>
    );
}

