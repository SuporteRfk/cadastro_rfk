import { FamilyDescriptions, GroupDescriptions, IIndirectProductSimilarity, TypeDescription } from "@/features/indirect-products/interface/indirect-products-similarity";
import { TbNumber as NCMIcon} from "react-icons/tb";
import { mask as applyMask } from "remask";
import {
  PackageCheck,
  Barcode,
  Ruler,
  Grid,
  Layers,
  Tag,
} from "lucide-react";

interface IModalSimilarityCardProps {
    item: IIndirectProductSimilarity;
};

export const ModalSimilarityCard = ({item}:IModalSimilarityCardProps) => {
    const family = FamilyDescriptions[item.familia_produto];
    const group = GroupDescriptions[item.grupo_produto];
    const type = TypeDescription[item.tipo_produto];

    return (
        <div className="border-l-4 border border-neutral/50 border-l-accent rounded-md p-4 shadow-sm hover:shadow-md hover:scale-[102%] bg-white hover:bg-slate-50 text-sm transition-all">
            
            {/* Título e Código */}
            <div className="flex justify-between items-start">
                <h3 className="text-base font-semibold text-text-strong flex items-center gap-2">
                   <PackageCheck size={18} className="text-text-strong" />
                   {item.descricao_produto}
                </h3>
                
                <span className="text-xs text-text-neutral flex items-center gap-1">
                    <Barcode size={14} /> Cod: {item.id_produto_totvs}
                </span>
            </div>
             
            {/* NCM */}
            <p className="text-xs text-text-medium/80 flex items-center gap-1">
                <NCMIcon size={18} className="text-text-medium" />
                NCM: {applyMask(item.produto_ncm, ["9999.99.99"])}
            </p>
                        
            <div className="flex flex-col gap-1 text-sm mt-2">               
                <p className="flex items-center gap-1 text-text-medium font-medium">
                    <Ruler size={14}/>
                    Unidade: 
                    <span className="font-normal text-text-neutral">{item.unidade_produto}</span>
                </p>
                
                <p className="flex items-center gap-1 text-text-medium font-medium">
                    <Grid size={14}/>
                    Família:
                    <span className="font-normal text-text-neutral">{family}</span> 
                </p>
                <p className="flex items-center gap-1 text-text-medium font-medium">
                    <Layers size={14}/>
                    Grupo:
                    <span className="font-normal text-text-neutral">{group}</span> 
                </p>
                <p className="flex items-center gap-1 text-text-medium font-medium">
                    <Tag size={14}/>
                    Tipo:
                    <span className="font-normal text-text-neutral">{type}</span> 
                </p>
            </div>
        </div>
    )
};
