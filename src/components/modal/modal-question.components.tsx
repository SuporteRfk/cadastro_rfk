import {TriangleAlert as WarningIcon} from "lucide-react"
import { Button } from "../button/button.components";
import { useClickAway } from "react-use";
import { useRef } from "react";



interface IModalQuestionProps {
    message: string; 
    onConfirm: () => void; 
    onClose: () => void;
}

export const ModalQuestion = ({message, onConfirm, onClose}: IModalQuestionProps) => {
    const ref = useRef(null);
    useClickAway(ref, () => onClose());

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-bg-modal flex items-center justify-center px-4 z-[9999]">
            <div ref={ref} className="flex flex-col justify-between items-center bg-white-default h-fit text-center w-full max-w-md rounded-lg shadow-xl p-4">
                <div className="flex flex-col items-center gap-2">
                    <WarningIcon color="var(--color-warning)" size={70} strokeWidth={2.5}/>
                    <h2 className="text-text-strong text-3xl font-semibold">Atenção</h2>
                </div>
                <p className="text-text-medium font-medium text-base my-5">{message}</p>
                <div className="w-full flex justify-end items-end gap-7 my-2">
                    <Button onClick={onConfirm} text="Sim" variant="outline" type="button"/>
                    <Button onClick={onClose} text="Não" variant="secondary" type="button"/>
                </div>
            </div>
        </div>
    );
};





