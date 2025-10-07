import { indirectProductsStep2Schema } from "@/features/indirect-products/schema/indirect-products-step2.schema";
import { IndirectProducStep2 } from "@/features/indirect-products/interface/indirect-products";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../ui";
import { Step2EditInLot } from "./step2-edit-in-lot.component";
import { TableXml } from "./table-xml/table-xml.components";
import { Filter, XmlIndirectProduct } from "@/interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dispatch, useState } from "react";
import { useForm } from "react-hook-form";




interface Step2Props {
    setItemsOk: Dispatch<React.SetStateAction<XmlIndirectProduct[]>>;
    setItems: Dispatch<React.SetStateAction<XmlIndirectProduct[]>>;
    items: XmlIndirectProduct[];
    itemsOk: XmlIndirectProduct[];
    filter: Filter;
};


export const Step2 = ({setItemsOk, setItems, items, itemsOk, filter}:Step2Props) => {
    const [checkItems, setCheckItems] = useState<XmlIndirectProduct[]>([]);
    const [idColor, setIdColor] = useState(1);


    const itemsPending = items.filter(item => item.status === "Pendente");


    
    const methods= useForm<IndirectProducStep2>({
        resolver: yupResolver(indirectProductsStep2Schema),
        defaultValues: {codigo_familia: undefined, codigo_grupo: undefined, tipo: undefined, descricao_uso: "" }
    });

    const onSubmit = (data: IndirectProducStep2):void => {
        const currentIdColor = idColor;
        // Passo 1: mapeia todos os checkItems (selecionados)
        // criando novos objetos com os valores aplicados do formulário
        const itemsFormated = checkItems.map((item) => {
            return {
                ...item,
                codigo_familia: data.codigo_familia,
                codigo_grupo: data.codigo_grupo,
                descricao_uso: data.descricao_uso,
                tipo: data.tipo,
                status: "Ok" as XmlIndirectProduct["status"],
                loteColorId: currentIdColor
            };
        });

        // Passo 2: atualiza o estado "items" (todos os produtos)
        // - se o item foi alterado, substitui pelo novo
        // - senão mantém como estava
        // - no final, coloca os pendentes primeiro, e os OK depois (só pra exibir bonitinho)
        setItems(prev => {
            
            const updated = prev.map(item => {
            const found = itemsFormated.find(updated => updated.id === item.id);
                return found ? found : item; // substitui se tiver versão nova
            });
            
            // separa em pendentes e ok
            const pendentes = updated.filter(i => i.status === "Pendente");
            const ok = updated.filter(i => i.status === "Ok");
            
            // junta pendentes + ok (reordenando visualmente)
            return [...pendentes, ...ok];
        });

        // Passo 3: atualiza o estado "itemsOk" (só os produtos OK)
        setItemsOk(prev => {
            // cria um Map para poder substituir
            const byId = new Map(prev.map(i => [i.id, i]));
            
            // sobrescreve os itens aplicados (mesmo que já existam)
            for (const item of itemsFormated){
                byId.set(item.id, item);
            };

            return Array.from(byId.values());
        });
        
        //Passo 4: incrementa o id da cor
        setIdColor(prev => prev  === 6 ? 1 : prev + 1);

        // Passo 5: limpa os campos e a seleção
        setCheckItems([]);
        methods.reset();
        
    };
    
        
    return (
        <Tabs defaultValue={filter} className="px-4 py-2 h-full w-full">
            {/* header step 2 */}
            {/* título + subtítulo */}
            <div className="min-w-0">
                <h3 className="text-lg text-text-medium truncate">Revisar e Completar Dados</h3>
            </div>

            {/* Tabs Menu */}
            <TabsList className="w-full overflow-x-auto !justify-start !flex-nowrap scrollbar-none">
                <TabsTrigger value={"All" as Filter}>Todos ({items.length})</TabsTrigger>
                <TabsTrigger value={"OK" as Filter}>OK ({itemsOk.length})</TabsTrigger>
                <TabsTrigger value={"Pending" as Filter}>Pendente ({itemsPending.length})</TabsTrigger>
                <TabsTrigger value={"Selected" as Filter}>Selecionados ({checkItems.length})</TabsTrigger>
            </TabsList>
            
            {/* Edição em lote */}
            <Step2EditInLot methods={methods} onSubmit={onSubmit} disable={checkItems.length === 0}/>
            
            <p className="text-text-neutral text-sm">
                {checkItems.length} items selecionados
            </p>

            <TabsContent value={"All" as Filter}>
                <TableXml 
                    checkItems={checkItems} 
                    setCheckItems={setCheckItems} 
                    data={items} 
                    blockCheck
                    canSelectRow={(item) => item.status === "Pendente"}
                />
            </TabsContent>

            <TabsContent value={"OK" as Filter}>
                <TableXml 
                    checkItems={checkItems} 
                    setCheckItems={setCheckItems} 
                    data={itemsOk}
                    canSelectRow={(item) => item.status === "Ok"}

                />
            </TabsContent>
            
            <TabsContent value={"Pending" as Filter}>
                <TableXml 
                    checkItems={checkItems} 
                    setCheckItems={setCheckItems} 
                    data={itemsPending}
                     canSelectRow={() => true}
                />
            </TabsContent>
            
            <TabsContent value={"Selected" as Filter}>
                <TableXml 
                    checkItems={checkItems} 
                    setCheckItems={setCheckItems} 
                    data={checkItems}
                    canSelectRow={() => true}
                />
            </TabsContent>
        </Tabs>
    );
};