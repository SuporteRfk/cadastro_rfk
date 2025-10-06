import { Progress, SheetDescription, SheetHeader, SheetTitle } from "../ui";
import {FileText as XmlIcon } from "lucide-react";


interface XmlProgressProps {
    step: number;
    quantitySteps?: number;
};


export const XmlProgress = ({step, quantitySteps=3}:XmlProgressProps) => {
    const progress = Math.round((step * 100) / quantitySteps);

    return (
        <SheetHeader className="px-4 pt-4 pb-1">
            <SheetTitle className="md:text-lg text-text-medium flex gap-1 items-center">
                <XmlIcon size={20} className="text-text-medium"/> Importar Itens via XML (NFe)
            </SheetTitle>
            <SheetDescription className="flex justify-between items-center w-full mt-2">
                <span className="text-text-neutral">Passo {step} de {quantitySteps}</span>
                <span className="text-text-neutral">{progress}% concluído</span>
            </SheetDescription>
            <Progress value={progress} className="w-full mt-2"/>
        </SheetHeader>
    )
};