import { Upload, FileText as FileIcon, Trash2 as DeleteIcon } from "lucide-react";
import { Toastify } from "@/components/toastify.components";
import { XmlIndirectProduct, XmlInfo } from "@/interfaces";
import { Dispatch, useRef, useState } from "react";
import * as XLSX from "xlsx";


interface Step1UploadXmlCsvExcelProps {
    setXmlInfos: Dispatch<React.SetStateAction<XmlInfo[]>>;
    xmlInfos: XmlInfo[];
    items: XmlIndirectProduct[];
    setItems: Dispatch<React.SetStateAction<XmlIndirectProduct[]>>;
};


const accept = `
    .xml,
    .csv,
    .xls,
    .xlsx,
    text/xml,
    text/csv,
    application/xml,
    application/vnd.ms-excel,
    application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
`;


export const Step1UploadXmlCsvExcel = ({setXmlInfos, xmlInfos, items, setItems}:Step1UploadXmlCsvExcelProps) => {
    const [dragging, setDragging] = useState<boolean>(false); 

    const inputRef = useRef<HTMLInputElement>(null);
    let existingKeys: Set<string>;

    // valida se é XML ou CSV/Excel
    const isSupportedFile  = (file: File):boolean => {
        const hasValidExtension = /\.(xml|csv|xlsx?)$/i.test(file.name);
        const hasValidMimeType = /(xml|excel|spreadsheet|csv|text)/i.test(file.type);

        return hasValidExtension || hasValidMimeType;
    };

    // Ler texto de uma tag <tag> dentro de um elemento (XML)
    const tagText = (parent: Element | null | undefined, tag: string):string => {
        return parent?.getElementsByTagName(tag)[0]?.textContent?.trim() || ""
    };
    
    // parse da NF e extrair os itens (XML)
    const parseXmlToProducts = (xmlText:string, idFile:string): XmlIndirectProduct[] => {
        const counterId = items.length;
        const doc = new DOMParser().parseFromString(xmlText, "application/xml");
        const dets = Array.from(doc.getElementsByTagName("det"))
        return dets.map((det, i) => {
            const prod = det.getElementsByTagName("prod")[0] || null;
            const name = tagText(prod, "xProd");
            const nameFormated = name.replace(/[@+*]/g, "");
            const ncm = tagText(prod, "NCM");
            const unit = tagText(prod, "uTrib") || tagText(prod, "uCom");
            return { 
                id: counterId+i+1, 
                name:nameFormated, 
                ncm, 
                unit_measure: unit, 
                idFile: idFile, 
                status: "Pendente"
            };
        })
    };

    //parse dos items do CSV/Excel
    const parseCsvExcelToProducts = async (file:File, idFile: string):Promise<XmlIndirectProduct[]> => {
        const counterId = items.length;
               
        const data = await file.arrayBuffer(); // criar buffer do arquivo
        const workbook = XLSX.read(data, {type: "array"}); // criar o worbook 
        const firstSheetName = workbook.SheetNames[0]; // pegar nome da primeira planina
        const worksheet = workbook.Sheets[firstSheetName]; // pegar a planilha pelo nome
        const rows: any[] = XLSX.utils.sheet_to_json(worksheet,{header: 1, defval: "", blankrows: true, range: 0 }) // le tudo como array de arrays.
        const headerRowIndex = rows.findIndex((r: any) => Array.isArray(r) && (r.includes("Descrição ") || r.includes("NCM")))
        
        if(headerRowIndex === -1){
            Toastify({
                type: "error",
                message: "Arquivo Excel/CSV está incorreto, não segue o padrão exigido",
                position: "top-right",
                duration: 6000
            });
            throw new Error("Cabeçalho não encontrado.");
        };

        //planilha do excel    
        const sheet: any[] = XLSX.utils.sheet_to_json<Record<string, any>>(worksheet, { defval: "", range: headerRowIndex});

        const products:XmlIndirectProduct[] = sheet.map((row: any, i: number) => {
            const name = row["Descrição Curta "] || row["Descrição Curta"] || row["Descrição "] || row["Descrição"] || "";
            const ncm = row["NCM"] || "";
            const unit = row["Unidade"] || row["Unid"] || row["Uni"] || "";
            const diameter = row["Diam/pot"] || row["Diam/pot "] || "";
            return {
                id: counterId + i + 1,
                idFile,
                name: `${name} ${diameter}`,
                ncm,
                unit_measure: unit,
                status: "Pendente"
            };
        });
        
        
        return products
    };


    //Processar arquivo baseado no tipo
    const processFile = async (file:File, idFile:string): Promise<XmlIndirectProduct[]> => {
        if(file.name.toLocaleLowerCase().endsWith('.xml') && file.type.includes('xml')){
            const text = await file.text()
            return parseXmlToProducts(text, idFile);
        } else {
            return parseCsvExcelToProducts(file, idFile);
        }
    };
    
    //Função central para lidar com o upload do arquivo xml
    const addFiles = async (fileList: FileList | File[]) => {
        const arrFiles = Array.from(fileList); 
        
        if(!fileList || fileList.length === 0) return;

        // Validar se algum algum arquivo não é xml, se tiver cancela tudo.
        const fileInvalid = arrFiles.find(file => !isSupportedFile(file));
        if(fileInvalid){
            Toastify({
                type: "error",
                message: "Selecione apenas arquivos XML, CSV ou Excel. Operação cancelada.",
                position: "top-right",
            });
            return;
        };


        // evitar duplicidade de arquivos pelo par+nome
        existingKeys = new Set(xmlInfos.map((info) => `${info.file.name}#${info.file.size}`));
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
                const extracted = await processFile(file, `${file.name}#${file.size}`)
                // registrar os itens
                setItems((prev) => [...prev, ...extracted]);

                // registar informações da nf/xml
                setXmlInfos((prev) => [
                    ...prev,
                    {id: `${file.name}#${file.size}`, file: file, itemsCount: extracted.length, name: file.name }
                ])
            } catch(error) {
                console.log(error)
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
        existingKeys.clear()
        Toastify({
            type: "success",
            message: "Itens removidos",
            position: "top-right",
            duration: 4000
        })
    };

    //Remover item especifico
    const removeItem = (id:string):void => {
        inputRef.current!.value = ''
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
                    Upload do XML ou CSV/Excel
                </h3>
                <p className="text-text-neutral text-sm text-center">
                    Selecione o arquivo XML, CSV ou arquivo de Excel para importar os produtos
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
                        Arraste o arquivo ou clique para selecionar
                    </p>
                    <p className="text-text-neutral text-xs">
                        Apenas arquivos XML,CSV,XLS,XLSX são aceitos
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