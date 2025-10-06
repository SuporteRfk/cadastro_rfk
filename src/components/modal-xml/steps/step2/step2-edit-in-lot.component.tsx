import { IndirectProducStep2 } from "@/features/indirect-products/interface/indirect-products";
import { ApplyInfoProductsIndirectInLot } from "@/features/indirect-products/components";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { SquarePen as EditIcon} from "lucide-react";



interface Step2EditInLotProps<T extends IndirectProducStep2> {
    methods: UseFormReturn<T>;
    onSubmit: (data: IndirectProducStep2) => void;
    disable: boolean;
};

export const Step2EditInLot = ({methods, onSubmit, disable}:Step2EditInLotProps<IndirectProducStep2>) => {
    return (
        <FormProvider {...methods}>
            <div className="w-full bg-accent/5 py-2 px-4 rounded-sm border border-accent/80">
                <div className="flex items-center gap-2">
                    <div className="rounded-full bg-accent/15 flex items-center justify-center h-8 w-8">
                        <EditIcon size={18} className="text-accent"/>
                    </div>
                    <div>
                        <h3 className="text-text-strong text-base">Editar Produtos Selecionados</h3>
                        <p className="text-text-medium text-sm">Preencha os campos abaixo para aplicar aos produtos selecionados na tabela</p>
                    </div>
                </div>
                {/* Formulário */}
                <ApplyInfoProductsIndirectInLot methods={methods} onSubmit={onSubmit} disable={disable}/>
            </div>
        </FormProvider>
    );
};