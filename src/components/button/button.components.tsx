import { ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  isLoading?: boolean;
  sizeWidth?: string;
  iconInText?: React.ElementType;
  styleIcon?: {
    size?: number;
    color?: string;
  };
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  title?:string;
  roudend?: string;
}

export const Button = ({
    text,
    disabled = false,
    isLoading = false,
    onClick,
    variant = "primary",
    sizeWidth = "w-full",
    iconInText: Icon,
    styleIcon = {size: 20 , color: ''}, 
    title,
    roudend="rounded-lg",
    ...rest
}: ButtonProps) => {
    
    const variantStyles = {
        primary: "bg-accent text-white-default hover:bg-accent-hover",
        secondary: "bg-medium/60 text-gray-700 hover:bg-gray-300 border-transparent",
        ghost: "bg-transparent text-text-strong hover:bg-neutral/10",
        danger: "bg-error text-white-default hover:bg-red-600",
        outline: "bg-transparent hover:bg-accent border-2 border-accent text-accent hover:text-white-default",
    };
    
    const style = variantStyles[variant];

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 ${roudend} px-4 py-2 text-sm font-semibold transition duration-200 ${
        disabled ? "bg-gray-300 text-gray-500 cursor-not-allowed" : style
      } ${sizeWidth}`}
      disabled={disabled || isLoading}
      title={title}
      aria-label={title || text}
      {...rest}
    >
      {isLoading ? (
        <Loader2 className="animate-spin h-5 w-5" />
      ) : (
        <>
          {Icon && <Icon size={styleIcon.size} color={styleIcon.color} />}
          {text}
        </>
      )}
    </button>
  );
};
