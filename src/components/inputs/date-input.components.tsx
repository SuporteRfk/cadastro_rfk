
import { useFormContext, UseFormRegisterReturn } from "react-hook-form";
import { CalendarDays as CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface DateInputProps {
    name: string;
    label: string;
    register?: UseFormRegisterReturn;
    error?: string;
    mode?: "cadastro" | "visualizacao";
};

export const DateInput = ({name,label,register,error,mode = "visualizacao"}: DateInputProps) => {
    const [currentDate, setCurrentDate] = useState<string>("");
    const {watch, trigger} = useFormContext();
    const value = watch(name);

       
    useEffect(() => {
            if (mode === "cadastro" && !value) {
                const now = new Date();
                // Ajuste para o fuso horário local
                const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
                // Formata para YYYY-MM-DDTHH:MM (para input datetime-local)
                const formattedDate = localDate.toISOString().slice(0, 16);
                setCurrentDate(formattedDate);
            } else if (value){
                const iso = new Date(value).toISOString();
                const formatted = iso.slice(0, 16);
                setCurrentDate(formatted);
            }
        }, [mode, trigger]);
    
    return(
        <div className="flex flex-col w-full max-w-full sm:max-w-[200px] relative">
            {label && (
                <label htmlFor={name} className="text-text-medium pl-1">
                    {label}
                </label>
            )}
            <input
                id={name}
                type={"datetime-local"}
                value={currentDate}
                {...register}
                className={`
                    w-full h-10 rounded-lg pl-8 mb-2 cursor-not-allowed text-text-medium/75 bg-white-default/65
                    border ${error ? "border-error" : "border-border"} 
                    focus:outline-hidden ${error ? "focus:border-error focus:ring-error" : "focus:border-accent focus:ring-1 focus:ring-accent"}
                    
                `}
                readOnly={true}
            />
            <CalendarIcon className="absolute left-2 top-[33px]" size={20} color="var(--text-color-strong)" />
            {error && <span className="text-sm text-error">{error}</span>}
        </div>
    )
};
