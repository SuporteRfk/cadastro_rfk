import { UseFormRegisterReturn, useFormContext } from "react-hook-form";
import { mask as applyMask, unMask } from 'remask';
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";

interface InputMaskProps {
    name: string;
    label?: string;
    maskType?: "whatsapp" | "cpf" | "cnpj" | "phone" | "custom" | "dynamic";
    customMask?: string;
    error?: string;
    Icon: LucideIcon | IconType;
    readOnly?: boolean;
    register?: UseFormRegisterReturn;
    onBlur?: () => void;
    widthContainer?: string;
  }


/**
 * Componente reutilizável de input com máscara.
 * Integra com React Hook Form usando useFormContext.
 * Suporta máscaras para cpf, cnpj, telefone, whatsapp e customizadas.
 */
export const InputWithMask = ({ name, label, maskType = "custom", customMask = "", Icon, error, readOnly = false ,onBlur, widthContainer="w-full"}:InputMaskProps) => {
      
      const { setValue, watch } = useFormContext();
  
      const value = watch(name) ?? "";
  
      const masks: Record<string, string | string[]> = {
        whatsapp: ["99", "+55(99)9", "+55(99) 9 9999-9999"],
        cpf: "999.999.999-99",
        dynamic: ["99", "(99)9", "(99) 9999-9999", "+55(99) 9 9999-9999"],
        phone: "(99) 9999-9999",
        cnpj: "99.999.999/9999-99",
        custom: customMask,
      };
  
      const placeholders: Record<string, string> = {
        whatsapp: "+55(XX) 9 XXXX-XXXX",
        phone: "(XX) XXXX-XXXX",
        cpf: "999.999.999-99",
        dynamic: "(XX) XXXX-XXXX",
        cnpj: "99.999.999/9999-99",
        custom: customMask,
      };
  
      const mask = masks[maskType] || customMask;
      const placeholder = placeholders[maskType] || customMask;
      
     
      const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const originalValue = unMask(e.target.value);
        const maskedValue = applyMask(originalValue, mask);
        setValue(name, maskedValue);
      };

   

      return (
        <div className={`${widthContainer} flex flex-col gap-1 relative my-1.5`}>
          {label && (
            <label htmlFor={name} className="text-sm font-medium pl-0.5 text-text-medium">
              {label}
            </label>
          )}

            <div className="relative">
                {Icon && <Icon className="absolute left-2 top-[7px]" color="var(--text-color-strong)" size={20} />}
            
                <input 
                  id={name}
                  value={value}
                  onChange={handleChange}
                  className={`
                    w-full h-8 pl-8 pr-3 rounded-lg text-sm no-spinner 
                    border ${error ? 'border-error' : 'border-border'}
                    focus:outline-hidden ${error ? 'focus:border-error focus:ring-error' : 'focus:border-accent focus:ring-1 focus:ring-accent'}
                    ${readOnly ? 'cursor-not-allowed text-text-medium/75 bg-white-default/65' : 'cursor-text bg-white-default text-text-medium'}    
                  `}
                  placeholder={placeholder}
                  readOnly={readOnly}
                  onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
                  onBlur={onBlur}    
                />
            </div>
            {error && <span className="text-error/80 text-xs pl-1">{error}</span>}
        </div>
      );
    }

