import { flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../../../ui";
import { XmlIndirectProduct } from "@/interfaces";
import { getColumnsXml } from "./columns-table";
import { Dispatch, useState } from "react";


interface TableXmlProps {
    data: XmlIndirectProduct[];
    checkItems: XmlIndirectProduct[];
    setCheckItems: Dispatch<React.SetStateAction<XmlIndirectProduct[]>>;
    blockCheck?: boolean;
    canSelectRow: (item: XmlIndirectProduct) => boolean;
    setItems: Dispatch<React.SetStateAction<XmlIndirectProduct[]>>;
    setItemsOk: Dispatch<React.SetStateAction<XmlIndirectProduct[]>>;
};

export const TableXml = ({data, checkItems, setCheckItems, blockCheck=false, canSelectRow, setItems, setItemsOk}:TableXmlProps) => {
    const [sorting, setSorting] = useState<SortingState>([]);
        
    const [editItemId, setEditItemId] = useState<number|null>(null);
    const [editValue, setEditValue] = useState<string>("");
    
    const columns = getColumnsXml({
        data, 
        checkItems, 
        setCheckItems, 
        blockCheck, 
        canSelectRow, 
        editItemId, 
        setEditItemId, 
        editValue, 
        setEditValue, 
        setItems, 
        setItemsOk
    });
    
    const table = useReactTable({ 
            columns,
            data,
            getCoreRowModel: getCoreRowModel(),
            getSortedRowModel: getSortedRowModel(), // habilita ordenação
            state: {
                sorting
            },
            onSortingChange: setSorting // atualiza o estado ao clicar na coluna 
    });

    const colorsRows = [
        "bg-white", // branco
        "bg-lime-50",
        "bg-blue-100",
        "bg-lime-200",
        "bg-green-100",
        "bg-emerald-50",
        "bg-blue-200",
    ];
        
    return (
        <div className="rounded-sm border border-neutral overflow-auto">
            <Table className="w-full border border-neutral rounded-2xl text-sm border-collapse">
                {/* header */}
                <TableHeader className="bg-neutral/50 text-center">
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <TableCell key={header.id} className="border border-strong/50 px-2 py-1">
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                {/* body */}
                <TableBody>
                    {table.getRowModel().rows.map(row => {
                        const isSelected = checkItems.some(item => item.id === row.original.id);

                        return (
                            <TableRow 
                                key={row.id}
                                className={`transition-colors border border-strong ${isSelected && "bg-accent/20"} hover:bg-accent/30 ${colorsRows[row.original.loteColorId || 0] }`}
                            >
                                {row.getVisibleCells().map((cell, i) => (
                                    <TableCell key={cell.id} className={`${(i === 0 || i === row.getVisibleCells().length - 1) && "text-center"} border border-strong/20`}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        )}
                    )}
                </TableBody>
            </Table>
        </div>
    )
};