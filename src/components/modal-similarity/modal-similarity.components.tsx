import { IIndirectProductSimilarity } from "@/features/indirect-products/interface/indirect-products-similarity";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui";
import { ModalSimilarityCard } from "./moda-similarity-card.components";
import { BrainCircuit as BrainIcon} from "lucide-react";
import { Dispatch } from "react";

interface ModalSimilarityProps {
    open: boolean;
    close: Dispatch<React.SetStateAction<boolean>>;
    itemsSimilarity: IIndirectProductSimilarity[]
};


export const ModalSimilarity = ({open, close, itemsSimilarity}:ModalSimilarityProps) => {
    
    return (
        <Sheet open={open} onOpenChange={close}>
            <SheetContent
                side="right-similiraty" 
                className="w-full h-screen max-h-screen bg-white overflow-auto"
            >
                <SheetHeader>
                    <SheetTitle className="text-text-strong">Produtos Similares</SheetTitle>
                <SheetDescription className="flex flex-col gap-2 text-text-medium/90 text-sm">
                   Visualize produtos similares já cadastrados no sistema
                </SheetDescription>
            </SheetHeader>

            <div className="flex flex-col gap-3 px-4">
                <p className="text-sm flex items-center">
                    <BrainIcon className="text-accent w-5 h-5"/>
                    Análise encontrou {itemsSimilarity.length} {itemsSimilarity.length === 1 ? "item semelhante" :"itens semelhantes"}
                </p>
                {itemsSimilarity.map(item => {
                    return (
                        <ModalSimilarityCard item={item} key={item.id_produto_totvs}/>
                    )
                })}
            </div>
            </SheetContent>
        </Sheet>
    )
};