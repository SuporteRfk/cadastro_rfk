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
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline" | "active";
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
    styleIcon = {size: 20 , color: 'var(--color-strong)'}, 
    title,
    roudend="rounded-lg",
    ...rest
}: ButtonProps) => {
    
    const variantStyles = {
        primary: "bg-accent/80 text-white-default hover:bg-accent ",
        secondary: "bg-medium/50 text-text-medium hover:bg-gray-300 border-transparent",
        ghost: "bg-transparent text-text-strong hover:bg-neutral/10",
        danger: "bg-error text-white-default hover:bg-red-600",
        outline: "bg-transparent hover:bg-accent border-2 border-accent text-accent hover:text-white-default",
        active: "bg-[#138496] text-white-default border-2 border-[#138496]"
    };
    
    const style = variantStyles[variant];

  return (
    <button
      onClick={onClick}
      className={` flex items-center cursor-pointer justify-center outline-none gap-2 ${roudend} px-4 py-2 text-sm font-semibold transition duration-200 ${
        disabled || isLoading ? "bg-gray-300 text-gray-500 cursor-not-allowed" : style
      } ${sizeWidth}`}
      title={title}
      aria-label={title || text}
      {...rest}
      disabled={disabled || isLoading}
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
