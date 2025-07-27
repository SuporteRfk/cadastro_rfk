
import { useFormContext, UseFormRegisterReturn } from "react-hook-form";
import { CalendarDays as CalendarIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface DateInputProps {
    name: string;
    label: string;
    register?: UseFormRegisterReturn;
    error?: string;
    mode?: "cadastro" | "visualizacao";
};

export const DateInput = ({name,label,register,error,mode = "visualizacao"}: DateInputProps) => {
    const [currentDate, setCurrentDate] = useState<string>("");
    const {watch, setValue} = useFormContext();
    const value = watch(name);
    const initialized = useRef(false);        
       
    useEffect(() => {
        if (!initialized.current) {
            if (mode === "cadastro" && !value) {
                const now = new Date();
                // Ajuste para o fuso horário local
                const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
                // Formata para YYYY-MM-DDTHH:MM (para input datetime-local)
                const formattedDate = localDate.toISOString().slice(0, 16);
                setCurrentDate(formattedDate);
                setValue(name, formattedDate);
            } else if (value){
                const date = new Date(value);
                const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
                const formatted = localDate.toISOString().slice(0, 16);
                setCurrentDate(formatted);
            }
            initialized.current = true;
        }
    }, [mode, value]);
    
    return(
        <div className="w-full max-w-full flex flex-col gap-1 my-1.5 sm:max-w-[200px] relative ">
            {label && (
                <label htmlFor={name} className="text-sm font-medium pl-0.5 text-text-medium">
                    {label}
                </label>
            )}
            <input
                id={name}
                type={"datetime-local"}
                value={currentDate}
                {...register}
                className={`
                    w-full h-8 rounded-lg pl-8 cursor-not-allowed text-text-medium/75 bg-white-default/65 text-sm
                    border ${error ? "border-error" : "border-border"} 
                    focus:outline-hidden ${error ? "focus:border-error focus:ring-error" : "focus:border-accent focus:ring-1 focus:ring-accent"}
                    
                `}
                readOnly={true}
            />
            <CalendarIcon className="absolute left-2 top-[30px]" size={20} color="var(--text-color-strong)" />
            {error && <p className="text-error/80 text-xs pl-1">{error}</p>}
        </div>
    )
};
