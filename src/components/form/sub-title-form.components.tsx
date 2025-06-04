import { ClipboardList, LucideIcon } from "lucide-react";

export interface ISubTitleFormProps {
    title: string;
    styleLine?: string;
    icon?: LucideIcon;
};



export const SubTitleForm = ({title, styleLine, icon:Icon}:ISubTitleFormProps) => {
    return (
        <div className={`${styleLine} flex gap-2 items-center`}>
            {Icon ? <Icon size={20}/> : <ClipboardList size={20}/>}
            <h3 className="my-4 font-bold text-text-strong">{title}</h3>
        </div>
    );
};
