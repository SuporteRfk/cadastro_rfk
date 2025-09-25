import { Button } from "../button/button.components";
import { XmlIndirectProduct } from "@/interfaces";
import { SheetFooter } from "../ui";
import { Dispatch } from "react";
import {
    ArrowRight as NextIcon,
    ArrowLeft as BackIcon
} from "lucide-react";

interface ModalXmlActionsProps{
    step: number;
    setStep: Dispatch<React.SetStateAction<number>>;
    items: XmlIndirectProduct[];
    setItems: Dispatch<React.SetStateAction<XmlIndirectProduct[]>>;
    quantitySteps: number;
};


export const ModalXmlActions = ({items, setItems, setStep, step, quantitySteps}:ModalXmlActionsProps) => {

    return (
        <SheetFooter className="flex flex-row justify-between items-center">
            <Button 
                text="Voltar" 
                sizeWidth="120px"
                variant="outlineSecondary"
                iconInText={BackIcon}
                styleIcon={{size: 18, color:"var(--color-medium)"}}
                disabled={step === 1}
                onClick={() => setStep(step - 1)}
            />
            <Button 
                text="Próximo" 
                sizeWidth="120px"
                iconInText={NextIcon}
                style={{ flexDirection: "row-reverse" }}
                styleIcon={{size: 18, color:"#fff"}}
                onClick={() => setStep(step + 1)}
                disabled={step === quantitySteps || items.length === 0}
            />
        </SheetFooter>
    );
};