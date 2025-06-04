import { Button } from "../button/button.components";
import { UseFormReturn } from "react-hook-form";
import { FormStateType } from "@/interfaces";

import { FieldValues } from "react-hook-form";
import { ModalContext } from "@/context";
import { useContext } from "react";

interface FormActionButtonsRequestProps<T extends FieldValues> {
  mode: FormStateType;
  setMode: (mode: FormStateType) => void;
  methods: UseFormReturn<T>;
  modalKey?: string;
  confirmMessage?: string;
  onConfirm: (data: T) => void;
  saveButtonLabel?: string;
  cancelButtonLabel?: string;
}


export const FormActionsButtonsRequest = <T extends FieldValues> ({
  mode,
  setMode,
  methods,
  modalKey = "CONFIRM_ACTION",
  confirmMessage = "Você tem certeza que deseja salvar?",
  onConfirm,
  saveButtonLabel = "Salvar",
  cancelButtonLabel = "Cancelar"
}:FormActionButtonsRequestProps<T>) => {
  const { openModal } = useContext(ModalContext);
  
  if (mode === "viewing") return null;

  return (
      <div className="w-full flex my-2 gap-3 justify-end">
        <Button
          text={cancelButtonLabel}
          variant="secondary"
          sizeWidth="w-[120px]"
          onClick={() => setMode("viewing")}
        />
        <Button
          text={saveButtonLabel}
          variant="primary"
          sizeWidth="w-[120px]"
          onClick={methods.handleSubmit((validatedData: T) => {
            openModal(modalKey, {
              message: confirmMessage,
              onConfirm: () => onConfirm(validatedData),
            });
          })}
        />
      </div>
  );
};