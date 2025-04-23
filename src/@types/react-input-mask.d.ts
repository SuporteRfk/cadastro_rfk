declare module "react-input-mask" {
    import * as React from "react";

    export interface InputMaskProps extends React.InputHTMLAttributes<HTMLInputElement> {
        mask: string;
        maskChar?: string | null;
        alwaysShowMask?: boolean;
        formatChars?: { [key: string]: string };
        beforeMaskedValueChange?: (
            newState: { value: string; selection: { start: number; end: number } },
            oldState: { value: string; selection: { start: number; end: number } },
            userInput: string
        ) => { value: string; selection: { start: number; end: number } } | void;
    }

    const InputMask: React.ForwardRefExoticComponent<InputMaskProps & React.RefAttributes<HTMLInputElement>>;
    export default InputMask;
}
