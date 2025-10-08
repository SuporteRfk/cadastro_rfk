import { XmlIndirectProduct } from "@/interfaces";
import { ColumnDef } from "@tanstack/react-table";
import { Badge, Checkbox } from "@/components/ui";
import { mask as applyMask } from 'remask';
import { Dispatch } from "react";
import {
    PackageCheck as CheckIcon,    
    ArrowDownUp as SortIcon,
    ArrowDownZA as SortDescIcon,
    ArrowUpAZ as SortAscIcon,
    Pencil as EditName
    
    
} from "lucide-react";

interface getColumnsXmlProps {
    checkItems: XmlIndirectProduct[];
    setCheckItems: Dispatch<React.SetStateAction<XmlIndirectProduct[]>>;
    data: XmlIndirectProduct[];
    blockCheck: boolean;
    canSelectRow: (item: XmlIndirectProduct) => boolean;
    editItemId: number | null;
    setEditItemId: Dispatch<React.SetStateAction<number | null>>;
    editValue: string;
    setEditValue:  Dispatch<React.SetStateAction<string>>;
    setItems: Dispatch<React.SetStateAction<XmlIndirectProduct[]>>;
    setItemsOk: Dispatch<React.SetStateAction<XmlIndirectProduct[]>>;
};

export const getColumnsXml = ({checkItems, setCheckItems, data, blockCheck, canSelectRow, editItemId, setEditItemId,editValue, setEditValue, setItems, setItemsOk}:getColumnsXmlProps):ColumnDef<XmlIndirectProduct>[] => [
    {
        id: 'select',
        header: () => {
            const selectable = data.filter(item => canSelectRow(item));
            const allSelected = selectable.length > 0 && selectable.every((item) => checkItems.some(itemCheck => itemCheck.id === item.id));

            return (
                <Checkbox
                    checked={allSelected}
                    onCheckedChange={(checked) => {
                        if (checked) {
                            setCheckItems(selectable);
                        } else {
                            setCheckItems([]);
                        }
                    }}
                    className="cursor-pointer mr-2"
                />
            )
        },
        cell: ({ row }) => {
            const isChecked = checkItems.some(item => item.id === row.original.id);
            const blockCheckBox = (row.original.status === "Ok" && blockCheck);

            if(blockCheckBox){
                return (
                    <div className='flex justify-center'>
                        <CheckIcon color="#34C759" size={18}/>
                    </div>
                );
            }

            return (
                <div className="flex items-center justify-center">
                    {
                        blockCheckBox ? (
                            <CheckIcon color="#34C759" size={18}/>
                        ) : (
                            <Checkbox
                                checked={isChecked}
                                onCheckedChange={(checked) => {
                                    const current = row.original;
                                    if (checked) {
                                        setCheckItems(prev => [...prev, current]);
                                    } else {
                                        setCheckItems(prev => prev.filter(item => item.id !== current.id));
                                    }
                                }}
                                disabled={blockCheckBox}
                                className="cursor-pointer border border-strong mr-2"     
                            />
                        )
                    }
                </div>
            );
        }
    },
    {
        id: "name",
        accessorKey: "name",
        header: ({column}) => (
            <button
                onClick={() => column.toggleSorting()}
                className="flex items-center justify-between w-full gap-1 font-semibold cursor-pointer"
            >
                Produto 
                {(column.getIsSorted() !== "asc" && column.getIsSorted() !== "desc") && <SortIcon size={18}/>}
                {column.getIsSorted() === "asc" && <SortAscIcon size={18}/>}
                {column.getIsSorted() === "desc" && <SortDescIcon size={18}/>}
            </button>
        ),
        enableSorting: true,
        cell: ({row}) => {
            const isEditing = editItemId === row.original.id;
            
            const saveEdit = () => {    
                setItems(prev => 
                    prev.map(item => 
                        item.id === row.original.id ? {...item, name:editValue} : item
                    )
                );

                setItemsOk(prev => 
                    prev.map(item => 
                        item.id === row.original.id ? {...item, name:editValue} : item
                    )
                );

                setEditItemId(null);
            };

            const editItem = () => {
                setEditItemId(row.original.id)
                setEditValue(row.original.name)
            };

            if (isEditing) {
                return (
                    <input
                        defaultValue={editValue}
                        onChange={(e) => setEditValue(e.target.value.toLocaleUpperCase())}
                        onBlur={() => saveEdit()}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") (e.target as HTMLInputElement).blur(); // força o blur;
                        }}
                        className="border-2 outline-0 focus:border-accent py-[1px] px-2 rounded-sm text-sm w-full"
                        autoFocus
                />
                );
            }
            return (
                <span                    
                    title="Clique no icone do lápis para editar"
                    className="flex items-center justify-between w-full"
                >
                    {row.original.name}
                    <EditName
                        className="cursor-pointer hover:underline"
                        onClick={() => editItem()}
                        size={18}
                    />
                </span>
            )
        }
    },
    {
        id: "ncm",
        accessorKey: "ncm",
        header: "NCM",
        cell: info => applyMask(info.getValue() as string, ["9999.99.99"]),
    },
    {
        id: "unit",
        accessorKey: "unit_measure",
        header: "Unidade",
        cell: info => info.getValue(),
    },
    {
        id: "description",
        accessorKey: "descricao_uso",
        header: "Uso Produto",
        cell: info => {
            const value = info.getValue();
            return (!value || value === "") ? " - " : value
        },
    },
    {
        id: "family_code",
        accessorKey: "codigo_familia",
        header: "Família",
        cell: info => {
            const value = info.getValue();
            return (!value || value === "") ? " - " : value
        },
    },
    {
        id: "group",
        accessorKey: "codigo_grupo",
        header: "Grupo",
        cell: info => {
            const value = info.getValue();
            return (!value || value === "") ? " - " : value
        },
    },
    {
        id: "type",
        accessorKey: "tipo",
        header: "Tipo",
        cell: info => {
            const value = info.getValue();
            return (!value || value === "") ? " - " : value
        },
    },
    {
        id: "status",
        accessorKey: "status",
        header: "Status",
        cell: info => {
            const status = info.getValue();

            return (
                <Badge 
                    className={`
                        border 
                        ${status === "Pendente"? "border-amber-800/20 text-amber-500 bg-amber-500/5" : "border-emerald-600/40 text-emerald-500 bg-emerald-200/25" }
                        w-[86px] px-2 py-1  
                    `}
                >
                    {info.getValue() as string}
                </Badge>
            )
        },
    }
];

  
