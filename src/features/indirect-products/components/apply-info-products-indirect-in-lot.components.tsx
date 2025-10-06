import { FamilyCodeIndirectProducts, TypeCodeIndirectProducts } from "../interface/indirect-products-enum";
import { useGroupSelectorIndirectProductInLot } from "../hook/use-group-selector-indirect-product";
import { Button, FormProductCategorySelector, Input } from "@/components";
import { IndirectProducStep2 } from "../interface/indirect-products";
import { ClipboardPenLine as DescriptionIcon } from "lucide-react";
import { Separator } from "@radix-ui/react-select";
import { UseFormReturn } from "react-hook-form";
import { Check} from "lucide-react";

interface ApplyInfoProductsIndirectInLotProps<T extends IndirectProducStep2>  {
    methods: UseFormReturn<T>;
    onSubmit: (data: IndirectProducStep2) => void;
    disable: boolean;
}


export const ApplyInfoProductsIndirectInLot = ({methods, onSubmit, disable}:ApplyInfoProductsIndirectInLotProps<IndirectProducStep2>) => {
  
    const group = useGroupSelectorIndirectProductInLot(methods);

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <Input    
                label="Uso do produto" 
                name="descricao_uso"
                register={methods.register("descricao_uso")}
                error={methods.formState.errors.descricao_uso?.message as string | undefined} 
                placeholder="Para que o produto será utilizado"
                type="text"
                icon={DescriptionIcon}
            />
            {/* Sessão do tipo, familia e grupo do PA */}
            <FormProductCategorySelector 
                family={Object.values(FamilyCodeIndirectProducts)}
                group={Object.values(group)}
                type={Object.values(TypeCodeIndirectProducts)}
                methods={methods}
            />

            <Separator className="bg-accent h-[1px] w-full mt-4"/>
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center p-2 mt-4">
                <p className="text-text-medium text-sm">Selecione produtos na tabela para editar em lote</p>
                <Button 
                    text="Aplicar aos Selecionados"
                    iconInText={Check}
                    styleIcon={{
                        color: "#fff",
                        size: 18
                    }}
                    sizeWidth="w-fit"
                    onClick={methods.handleSubmit(onSubmit)}
                    disabled={disable}
                />
            </div>
        </form>
    )
};