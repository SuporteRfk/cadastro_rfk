import { useState } from "react";

export const useObservationDenied = () => {
    const [observationDenied, setObservationDenied] = useState<string>("");
    const [errorObservation, setErrorObservation] = useState<string | null>(null);

    const validate = () => {
        if(!observationDenied.trim()){
            setErrorObservation("Por favor, informe o motivo por negar essa solicitação")
            return false;
        }
        setErrorObservation(null);
        return true;
    };

    const reset = () => {
        setErrorObservation(null);
        setObservationDenied("");
    };

    return {
        observationDenied,
        setObservationDenied,
        errorObservation,
        validate,
        reset
    };
};