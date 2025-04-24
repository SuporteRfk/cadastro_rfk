import { UseFormRegisterReturn } from "react-hook-form";
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
  }

export const Input = ({name,label,placeholder,type = "text",register,error,icon: Icon,valueInitial = "", maxCaractere,readOnly = false,}:InputProps) => {
    const [value, setValue] = useState(valueInitial);
    
    // Atualiza o state interno quando muda o valor inicial (ex: reset de formulário)
    useEffect(() => {
        setValue(valueInitial);
    }, [valueInitial]);  

    return(
        <div className="w-full flex flex-col gap-1 relative">
            {label && 
                <label 
                    htmlFor={name} 
                    className="text-sm font-medium mb-1 text-text-medium"
                >
                    {label}
                </label>
            }   
            <div className="relative">
                {Icon && <Icon className="absolute left-2 top-3" color="var(--text-color-strong)" size={20} />}

                <input
                    id={name}
                    {...register}
                    type={type}
                    name={name}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={placeholder}
                    maxLength={maxCaractere}
                    readOnly={readOnly}
                    className={`
                        w-full h-10 pl-10 pr-3 rounded-lg text-sm no-spinner bg-white-default
                        border ${error ? 'border-error' : 'border-border'}
                        focus:outline-hidden ${error ? 'focus:border-error focus:ring-error' : 'focus:border-accent focus:ring-1 focus:ring-accent'}
                        ${readOnly ? 'cursor-not-allowed text-text-medium/85' : 'cursor-text'}
                    `}
                />
            </div>
        </div>
    );
};



// // 📁 src/components/ui/Input.tsx

// import { LucideIcon } from "lucide-react";

// interface InputProps {
//   name: string;
//   label: string;
//   register: ReturnType<typeof import("react-hook-form").useForm>["register"];
//   error?: string;
//   type?: string;
//   readOnly?: boolean;
//   icon?: LucideIcon;
//   defaultValue?: string;
// }

// export const Input = ({
//   name,
//   label,
//   register,
//   error,
//   type = "text",
//   readOnly = false,
//   icon: Icon,
//   defaultValue,
// }: InputProps) => {
//   return (
//     <div className="w-full space-y-1">
//       <label htmlFor={name} className="text-sm font-medium text-text-strong">
//         {label}
//       </label>
//       <div className="relative">
//         {Icon && (
//           <Icon className="absolute left-2 top-2.5 text-neutral-600" size={18} />
//         )}
//         <input
//           id={name}
//           {...register(name)}
//           name={name}
//           type={type}
//           defaultValue={defaultValue}
//           readOnly={readOnly}
//           className={`w-full h-10 rounded-md border ${
//             error ? "border-error" : "border-border"
//           } bg-white pl-9 pr-3 text-sm text-text-strong placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary`}
//         />
//       </div>
//       {error && <p className="text-xs text-error">{error}</p>}
//     </div>
//   );
// };
