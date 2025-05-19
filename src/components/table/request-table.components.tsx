import { RequestTablePagination } from "./request-table-pagination.components";
import { RequestTableFilter } from "./request-table-filter.components";
import { RequestTableHeader } from "./request-table-header.components";
import { getCoreRowModel, useReactTable} from "@tanstack/react-table"; 
import { RequestTableBody } from "./request-table-body.components";
import { LoadingSkelleton } from "../loading-skelleton.components";
import { IQueryRequest, IViewRequest } from "@/interfaces";
import { useContext, useEffect, useState } from "react";
import { getRequestColumns } from "./request-columns";
import { RequestContext } from "@/context";
import { LucideIcon } from "lucide-react";
import { Table} from "../ui"


interface RequestTableProps {
    titlePage : string;
    iconForm : LucideIcon;
    showFilterDash?: boolean;
    fixedFilter?: Partial<IQueryRequest>;
}


export const RequestTable = ({titlePage, iconForm:IconForm, showFilterDash=true, fixedFilter}:RequestTableProps) => {
    const {loadingSkelleton, request, setFilter, filter} = useContext(RequestContext);
    
    useEffect(()=> {
        setFilter({
            offset: 0,
            indexLimit: 10,
        });
    },[])
   
    const [observationOpenId, setObservationOpenId] = useState<number | null>(null);
    // Estado para os filtros | State for Filters
 
    


    //controle do modal || control modal
    const [modalOpen, setModalOpen] = useState<boolean>(false);
  


    
    // Mostrar observacao | show obversavao
    const onToggleObservation = (id: number) => {
        setObservationOpenId(prev => prev === id ? null : id);
    };
  

    // Abrir modal | open modal
    const onOpenModal = (solicitacao: IViewRequest) => {
        
        setModalOpen(true);
    };


    const table = useReactTable({ 
        columns: getRequestColumns({onToggleObservation, observationOpenId, onOpenModal}),
        data: request,
        getCoreRowModel: getCoreRowModel(),
    })

    return(
        <div className="flex flex-col w-full">
            {/* Titulo do Formulário */}
            <h1 className="p-3 text-xl text-text-strong font-bold mt-3 flex gap-2 items-center">
                {<IconForm size={20}/>}
                {titlePage}
            </h1>
            {/* Mostrar o loading skelleton */}
            {
                loadingSkelleton ? (
                    <LoadingSkelleton numberLines={filter?.indexLimit || 10}/>
                ) : (
                    <div className="h-full w-full flex flex-col justify-between bg-white-default rounded-lg border border-border">
                        {showFilterDash && <RequestTableFilter fixedFilter={fixedFilter}/>}
                        <div className="flex-1 overflow-y-auto rounded-sm bg-white">
                            <Table className="min-w-ful">    
                                <RequestTableHeader table={table}/>
                                <RequestTableBody table={table} observationOpenId={observationOpenId}/>
                            </Table>
                        </div>
                        <RequestTablePagination
                            onChangePage={(page) => {
                                setFilter(prev => ({ ...prev ?? {}, offset: page * (prev?.indexLimit ?? 10)}));
                            }}
                            onChangePageSize={(size) => {
                                setFilter(prev => ({ ...prev!, indexLimit: size, offset: 0 }));
                            }}
                        />
                    </div>
                )
            }
        </div>
    )
};




