import { Upload, FileText as FileIcon, Trash2 as DeleteIcon } from "lucide-react";
import { Toastify } from "@/components/toastify.components";
import { XmlIndirectProduct, XmlInfo } from "@/interfaces";
import { Dispatch, useRef, useState } from "react";


interface Step1UploadXmlProps {
    setXmlInfos: Dispatch<React.SetStateAction<XmlInfo[]>>;
    xmlInfos: XmlInfo[];
    items: XmlIndirectProduct[];
    setItems: Dispatch<React.SetStateAction<XmlIndirectProduct[]>>;
};


const accept = ".xml,application/xml,text/xml";


export const Step1UploadXml = ({setXmlInfos, xmlInfos, items, setItems}:Step1UploadXmlProps) => {
    const [dragging, setDragging] = useState<boolean>(false); 

    const inputRef = useRef<HTMLInputElement>(null);

    // valida se é XML, por extensão .xml OU por MIME contendo "xml"
    const isXmlFile = (file: File):boolean => {
        return (
            /\.xml$/i.test(file.name)  // garante extensão .xml (case-insensitive).
            || /xml/i.test(file.type) // alguns navegadores preenchem type como application/xml ou text/xml. Se qualquer um dos dois bater, é válido.
        ); 
    };

    // Ler texto de uma tag <tag> dentro de um elemento
    const tagText = (parent: Element | null | undefined, tag: string):string => {
        return parent?.getElementsByTagName(tag)[0]?.textContent?.trim() || ""
    };
    
    // parse da NF e extrair os itens
    const parseNFeToProducts = (xmlText:string, idFile:string): XmlIndirectProduct[] => {
        const counterId = items.length;
        const doc = new DOMParser().parseFromString(xmlText, "application/xml");
        const dets = Array.from(doc.getElementsByTagName("det"))
        return dets.map((det, i) => {
            const prod = det.getElementsByTagName("prod")[0] || null;
            const name = tagText(prod, "xProd");
            const nameFormated = name.replace(/[@+*]/g, "");
            const ncm = tagText(prod, "NCM");
            const unit = tagText(prod, "uTrib") || tagText(prod, "uCom");
            return { id: counterId+i+1, name:nameFormated, ncm, unit_measure: unit, idFile: idFile, status: "Pendente"};
        })
    };
    
    //Função central para lidar com o upload do arquivo xml
    const addFiles = async (fileList: FileList | File[]) => {
        const arrFiles = Array.from(fileList); 
        
        if(!fileList || fileList.length === 0) return;

        // Validar se algum algum arquivo não é xml, se tiver cancela tudo.
        const fileInvalid = arrFiles.find(file => !isXmlFile(file));
        if(fileInvalid){
            Toastify({
                type: "error",
                message: "Selecione apenas arquivos XML. Operação cancelada.",
                position: "top-right",
            });
            return;
        };


        // evitar duplicidade de arquivos pelo par+nome
        const existingKeys = new Set(xmlInfos.map((info) => `${info.file.name}#${info.file.size}`));
        const newFiles = arrFiles.filter((f) => !existingKeys.has(`${f.name}#${f.size}`));
        if(!newFiles.length || newFiles.length === 0){
            Toastify({
                type: "info",
                message: "Esses arquivos já estão na lista, nenhum novo item foi adicionado.",
                position: "top-right",
                style: {
                    background: "#7dd3fc",
                    color: "#1f2937"
                },
                duration: 5000
            });
            return;
        };

        //processar arquivo por arquivo
        for (const file of newFiles){
            try {
                const text = await file.text()
                const extracted = parseNFeToProducts(text, `${file.name}#${file.size}`);
                // registrar os itens
                setItems((prev) => [...prev, ...extracted]);

                // registar informações da nf/xml
                setXmlInfos((prev) => [
                    ...prev,
                    {id: `${file.name}#${file.size}`, file: file, itemsCount: extracted.length, name: file.name }
                ])
            } catch {
                Toastify({
                    type: "error",
                    message: `Falha ao ler o arquivo ${file.name}.`,
                    position: "top-right",
                });
            }
        };
    };

    //Função para apagar todos itens e arquivos
    const clearAll = ():void => {
        setXmlInfos([])
        setItems([])
        Toastify({
            type: "success",
            message: "Itens removidos",
            position: "top-right",
            duration: 4000
        })
    };

    //Remover item especifico
    const removeItem = (id:string):void => {
        // remover o arquivo
        setXmlInfos((prev) => prev.filter((file) => file.id !== id));
        // remove os itens que vieram dele
        setItems((prev) => prev.filter((item) => item.idFile !== id));
        Toastify({
            type: "success",
            position: "top-right",
            message: "Item removido",
            duration: 4000
        })
    };

    return (
        <div className="w-full p-4 flex flex-col justify-center items-center">
            {/* instruções texto */}
            <div className="flex flex-col gap-2 justify-center items-center">
                <h3 className="text-text-strong text-2xl font-semibold">
                    Upload do XML da NFe
                </h3>
                <p className="text-text-neutral text-sm text-center">
                    Selecione o arquivo XML da Nota Fiscal Eletrônica para importar os produtos
                </p>
            </div>

            {/* drop e drag */}
            <div
                onDragOver={(e) => {
                    e.preventDefault()
                    setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={async (e) => {
                    e.preventDefault();
                    setDragging(false);
                    await addFiles(e.dataTransfer.files)
                }}
                onClick={() => inputRef.current?.click()} // dispara o clique no input escondido
                className={`
                    mt-4 w-full max-w-4xl min-h-40 rounded-md border-2 border-dashed cursor-pointer
                    flex items-center justify-center p-8 text-center transition shadow
                    ${dragging ? "border-[var(--color-accent)] bg-[color:var(--color-accent)]/5" : "border-[color:var(--color-border)] bg-white"}  
                `}
                aria-label="Área para soltar arquivo XML ou clicar para selecionar"
            >
                <div className="flex flex-col items-center gap-2">
                    {/* Ícone opcional: use o que preferir */}
                    <Upload/>
                    <p className="text-text-medium font-medium">
                        Arraste o arquivo XML ou clique para selecionar
                    </p>
                    <p className="text-text-neutral text-xs">
                        Apenas arquivos XML são aceitos
                    </p>
                </div>

                {/* input escondido que realmente seleciona o arquivo */}
                <input
                    ref={inputRef}
                    type="file"
                    accept={accept}
                    className="hidden"
                    onChange={(e) => {
                        if (e.target.files) addFiles(e.target.files);
                    }}
                    multiple
                />
            </div>
            
            {/* Card para mostrar os arquivos que subiram */}
            {xmlInfos.length > 0 && (
                <div className="flex flex-col w-full max-h-96 mt-3 p-2">
                    
                    <button 
                        className="cursor-pointer self-end flex items-center text-text-neutral text-sm hover:underline"
                        onClick={clearAll}
                    >
                        Limpar tudo
                    </button>

                    <div className="mt-2 space-y-2 overflow-auto max-h-[clamp(14rem,40vh,28rem)] xl:max-h-none xl:overflow-visible pr-1">
                        {xmlInfos.map(xml => {
                            return (
                                <div key={xml.id} className="my-1 w-full rounded-md border bg-white px-4 py-3 flex items-center justify-between shadow">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <FileIcon className="shrink-0 text-accent"/>
                                        <div className="flex-1 min-w-0" title={xml.name}>
                                            <p className="text-[15px] font-medium truncate text-text-medium">{xml.name}</p>
                                            <p className="text-text-neutral text-[14px] truncate">{xml.itemsCount} {xml.itemsCount === 1 ? "Item encontrado" : "Itens encontrados"}</p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        className="cursor-pointer"
                                        title="Remover Xml"
                                        onClick={() => removeItem(xml.id)}
                                    >
                                        <DeleteIcon className="text-error" size={20}/>
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                    <p className="self-end text-sm mt-2 text-text-strong">{items.length} itens extraídos</p>
                </div>
            )}
        </div>
    )
};