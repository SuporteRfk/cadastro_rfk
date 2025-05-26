import { Button } from "../button/button.components";
import { FormStateType } from "@/interfaces";
import { ReactNode, useState } from "react";
import { useReview } from "@/context";
import { X , TriangleAlert} from "lucide-react";
import { Checkbox } from "../ui";


interface ReviewFieldProps {
    children: ReactNode;
    mode: FormStateType;
    field: string;
}


export const ReviewField = ({children, field, mode}:ReviewFieldProps) => {
    const {isFieldInReview, setFieldReview, reviewFields, showError} = useReview();
    const [localValue, setLocalValue] = useState(reviewFields[field] || "");

    const showTextarea = mode === "reviewing" && isFieldInReview(field);
    const isViewAndHasReason = mode === "viewing" && reviewFields[field];
    const showErrorFieldEmpty = showError && isFieldInReview(field) && localValue.trim() === "";

    return(
        <div className="w-full">
            <div className="flex gap-2 items-center">
                {mode === "reviewing" && (
                    <Checkbox
                        checked={isFieldInReview(field)}
                        onCheckedChange={(checked) => {
                            if(checked) setFieldReview(field, "");
                            else setFieldReview(field, null);
                        }}
                        className="mt-5"
                    /> 
                )}
            <div className="w-full">{children}</div>
            </div>
            {showTextarea && (
                <div className="ml-7 flex flex-col items-end gap-2">
                    <textarea
                        placeholder="Descreva o motivo da revisão"
                        value={localValue}
                        onChange={(e) => {
                            setLocalValue(e.target.value);
                            setFieldReview(field, e.target.value);
                        }}
                        className="rounded-lg w-full border border-border outline-none focus:border-accent shadow-sm text-[12px] text-text-neutral p-2"
                    />
                    {showErrorFieldEmpty && (
                        <p className="pl-2 text-error text-sm mt-1 font-medium">
                            Preencha o motivo da revisão.
                        </p>
                    )}
                    <Button
                        text="Apagar revisão"
                        type="button"
                        onClick={() => setFieldReview(field, null)}
                        variant="outlineDanger"
                        iconInText={X}
                        sizeWidth="w-[160px] !py-1 !px-2"
                        styleIcon={{
                            size: 18
                        }}
                    />
                </div>
            )}

            {isViewAndHasReason && (
                <div className="p-2 flex items-center gap-1 rounded-lg w-full border border-warning bg-warning/70 mt-2">
                    <div className="min-w-[20px] flex justify-center">
                        <TriangleAlert size={18} color="var(--color-error)" />
                    </div>
                    <p className="text-[12px] text-error font-semibold leading-snug">
                        {reviewFields[field]}
                    </p>
                </div>
            )}
        </div>
    );
};