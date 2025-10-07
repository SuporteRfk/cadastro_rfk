import { LucideIcon } from "lucide-react";

interface ResumeCardProps {
  title: string;
  value: number;
  color: "green" | "yellow" | "gray";
  icon: LucideIcon;
  onClick?: () => void;
}

export const ResumeCard = ({ title, value, color, icon:Icon, onClick }: ResumeCardProps) => {
    const bgMap = {
        gray: "bg-neutral-50 hover:bg-gray-200",
        yellow: "bg-neutral-50 hover:bg-yellow-200",
        green: "bg-neutral-50 hover:bg-green-200",
    };

    const borderMap = {
        gray: "hover:border-gray-600",
        yellow: "hover:border-yellow-600",
        green: "hover:border-green-600",
    };

    const textMap = {
        gray: "text-gray-800",
        yellow: "text-yellow-800",
        green: "text-green-800",
    };

    return (
        <div 
            onClick={onClick}
            className={`
                flex flex-col items-center justify-center px-10 py-3 gap-1
                rounded-sm border shadow-md shadow-neutral/80 cursor-pointer transition-all
                ${bgMap[color]}  ${textMap[color]} ${borderMap[color]}
            `}
        >
            <Icon className="w-5 h-5"/>
            <h4 className="text-sm font-semibold">{title}</h4>
            <p className="text-xl font-bold text-text-medium">{value}</p>
        </div>
    );
};
