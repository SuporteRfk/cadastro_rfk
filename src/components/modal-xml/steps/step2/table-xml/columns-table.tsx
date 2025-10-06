import {PackageCheck as CheckIcon} from "lucide-react";
import { XmlIndirectProduct } from "@/interfaces";
import { ColumnDef } from "@tanstack/react-table";
import { Badge, Checkbox } from "@/components/ui";
import { mask as applyMask } from 'remask';
import { Dispatch } from "react";

interface getColumnsXmlProps {
    checkItems: XmlIndirectProduct[];
    setCheckItems: Dispatch<React.SetStateAction<XmlIndirectProduct[]>>;
    data: XmlIndirectProduct[];
    blockCheck: boolean;
    canSelectRow: (item: XmlIndirectProduct) => boolean;
};

export const getColumnsXml = ({checkItems, setCheckItems, data, blockCheck, canSelectRow}:getColumnsXmlProps):ColumnDef<XmlIndirectProduct>[] => [
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
        header: "Produto",
        cell: info => info.getValue()
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

  
