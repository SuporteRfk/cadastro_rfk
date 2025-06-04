import { Info } from "lucide-react";

interface FormObservationDeniedFildProps{
    observation: string;
    setObservation: React.Dispatch<React.SetStateAction<string>>;
    error?: string | null;
};

export const FormObservationDeniedFild = ({observation, setObservation, error}:FormObservationDeniedFildProps) => {
    return (
        <div className="border-t border-border mt-4">
            <h3 className="flex gap-2 my-2 text-text-medium font-semibold">
                <Info color="var(--color-error)" strokeWidth={2} />
                Informe o motivo de negar essa solicitação:
            </h3>
            <textarea
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
                className="w-full h-[100px] rounded-md border border-border bg-neutral/10 outline-none p-2 text-sm text-text-neutral placeholder:text-text-medium"
                placeholder="Descreva o motivo"
            />
            {error && <p className="pl-2 text-error text-sm mt-1 font-medium">{error}</p>}
        </div>
    );
};