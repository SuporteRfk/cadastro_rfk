import { Filter, IUser, XmlIndirectProduct } from "@/interfaces";
import { FileText, Clock, CheckCircle } from "lucide-react";
import { ResumeCard } from "./resumne-card.components";
import { Dispatch } from "react";
import { Step3EditInLot } from "../../../../features/indirect-products/components/step3-edit-in-lot.components";
import { UseFormReturn } from "react-hook-form";
import { IndirectProducStep3 } from "@/features/indirect-products/interface/indirect-products";

interface Step3Props {
    itemsOk: XmlIndirectProduct[];
    itemsPending: XmlIndirectProduct[];
    items: XmlIndirectProduct[];
    setStep: Dispatch<React.SetStateAction<number>>;
    setFilter: Dispatch<React.SetStateAction<Filter>>;
    user: IUser | null;
    methods: UseFormReturn<IndirectProducStep3>;
};


export const Step3 = ({itemsOk, itemsPending, items, setStep, setFilter, user, methods}:Step3Props) => {
    
 
    
    return (
        <div className="flex flex-col items-center justify-center mt-4">
            {/* Header - Titulo */}
            <div className="text-center">
                <h3 className="text-lg font-medium text-text-medium">Resumo da Importação</h3>
                <p className="text-base text-neutral font-[300]">Revise os dados antes de criar as solicitações</p>
            </div>

            {/* Card Relação itens */}
            <div className="w-full h-28 px-4 mt-2 flex items-center justify-start min-[560px]:justify-center gap-8 overflow-x-auto">
                <ResumeCard 
                    color="gray" 
                    title="Importados" 
                    value={items.length} 
                    icon={FileText} 
                    onClick={() => {
                        setStep(2);
                        setFilter("All")
                    }}
                />
                <ResumeCard 
                    color="yellow" 
                    title="Pendentes" 
                    value={itemsPending.length} 
                    icon={Clock} 
                    onClick={() => {
                        setStep(2);
                        setFilter("Pending")
                    }}
                />
                <ResumeCard 
                    color="green" 
                    title="Completos" 
                    value={itemsOk.length} 
                    icon={CheckCircle} 
                    onClick={() => {
                        setStep(2);
                        setFilter("OK")
                    }}
                />
            </div>

            {/* Formulário */}
            <Step3EditInLot methods={methods} user={user}/>

        </div>
    )
};