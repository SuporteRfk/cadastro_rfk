import { UseFormRegisterReturn } from "react-hook-form";

interface IInputRadioProps{
    options: {
        label: string;
        value: string;
    }[];
    name: string;
    label?: string;
    margin?: string;
    error?: string;
    register: UseFormRegisterReturn;
}

export const InputRadio = ({name, label, options, margin="mb-0", error, register}: IInputRadioProps) => {

    
    
    return (
        <div className="my-2 flex flex-col justify-center items-center text-[13px]">
            <ul className={`flex flex-col sm:flex-row gap-2 ${margin}`}>
                <p className="text-text-medium pl-1 sm:text-nowrap">{label}:</p>
                <div className="flex gap-4 justify-center">
                    {
                        options.map((option, i) => (
                            <li key={i} className="flex items-center gap-2">
                                <label 
                                    htmlFor={option.value}
                                    className="text-text-strong font-bold pl-1 cursor-pointer text-[13px]"
                                >
                                    {option.label}
                                </label>
                                <input 
                                    {...register}
                                    type="radio" 
                                    id={option.value}
                                    value={option.value} 
                                    name={name}
                                    className="w-4 h-4 cursor-pointer appearance-none border border-neutral rounded-sm
                                        checked:border-accent checked:ring-1 checked:ring-accent bg-white-default!
                                        relative flex items-center justify-center transition-all"
                                    />
                            </li>
                        ))    
                    }
                </div>
            </ul>
            {error && <span className="text-sm text-error">{error}</span>}
        </div>
    )
}
