import { IndirectProductStep3 } from "@/features/indirect-products/interface/indirect-products";
import { Button } from "../button/button.components";
import { XmlIndirectProduct } from "@/interfaces";
import { UseFormReturn } from "react-hook-form";
import { Dispatch, useContext } from "react";
import { ModalContext } from "@/context";
import { SheetFooter } from "../ui";
import {
    ArrowRight as NextIcon,
    ArrowLeft as BackIcon
} from "lucide-react";

interface ModalXmlActionsProps{
    step: number;
    setStep: Dispatch<React.SetStateAction<number>>;
    items: XmlIndirectProduct[];
    itemsOk: XmlIndirectProduct[];
    quantitySteps: number;
    methods: UseFormReturn<IndirectProductStep3>;
    onSubmit: (data:IndirectProductStep3) => void;
};


export const ModalXmlActions = ({items, itemsOk, setStep, step, quantitySteps, methods, onSubmit}:ModalXmlActionsProps) => {  
    const {openModal} = useContext(ModalContext)
    

    return (
        <SheetFooter className="flex flex-row justify-end items-center w-full">
            <Button 
                text="Voltar" 
                sizeWidth="120px"
                variant="outlineSecondary"
                iconInText={BackIcon}
                styleIcon={{size: 18, color:"var(--color-medium)"}}
                disabled={step === 1}
                onClick={() => setStep(step - 1)}
            />
         
            {quantitySteps === step ? (
                <Button
                    text="Criar Solicitações"
                    sizeWidth="120px"
                    onClick={methods.handleSubmit((data) => {
                        openModal(
                            "CONFIRM_CREATE_REQUESTS",
                            {
                                message: `Confirma a criação de ${itemsOk.length} solicitações?`,
                                onConfirm: () => onSubmit(data)
                            }
                        );
                    })}
                />
            ) : (
                <Button 
                    text="Próximo" 
                    sizeWidth="120px"
                    iconInText={NextIcon}
                    style={{ flexDirection: "row-reverse" }}
                    styleIcon={{size: 18, color:"#fff"}}
                    onClick={() => setStep(step + 1)}
                    disabled={items.length === 0 || (step === 2 && itemsOk.length === 0)}
                />
            )}
        </SheetFooter>
    );
};