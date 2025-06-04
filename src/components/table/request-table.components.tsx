import { RequestTablePagination } from "./request-table-pagination.components";
import { RequestTableFilter } from "./request-table-filter.components";
import { RequestTableHeader } from "./request-table-header.components";
import { getCoreRowModel, useReactTable} from "@tanstack/react-table"; 
import { RequestTableBody } from "./request-table-body.components";
import { LoadingSkelleton } from "../loading-skelleton.components";
import { IQueryRequest, IViewRequest } from "@/interfaces";
import { useContext, useState } from "react";
import { getRequestColumns } from "./request-columns";
import { RequestContext } from "@/context";
import { LucideIcon } from "lucide-react";
import { ModalRequest } from "../modal";
import { Table} from "../ui"
import { useLocation } from "react-router-dom";


interface RequestTableProps {
    titlePage : string;
    iconForm : LucideIcon;
    showFilterDash?: boolean;
    fixedFilter?: Partial<IQueryRequest>;
}


export const RequestTable = ({titlePage, iconForm:IconForm, showFilterDash=true, fixedFilter}:RequestTableProps) => {
    const {loadingSkelleton, request, setFilter, filter} = useContext(RequestContext);
    const location = useLocation();

       
    const [observationOpenId, setObservationOpenId] = useState<number | null>(null);  
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedRequest, setSelectedRequest] = useState<IViewRequest | null>(null);

    // verificar se o usuários está na rota de solicitar alteração
    const isTheRouteOfChange = location.pathname === "/solicitar-alteracao";

    // Mostrar observacao | show obversavao
    const onToggleObservation = (id: number) => {
        setObservationOpenId(prev => prev === id ? null : id);
    };
  

    // Abrir modal | open modal
    const onOpenModal = (request: IViewRequest) => {
        setSelectedRequest(request);
        setModalOpen(true);
    };


    const table = useReactTable({ 
        columns: getRequestColumns({onToggleObservation, observationOpenId, onOpenModal}),
        data: request,
        getCoreRowModel: getCoreRowModel(),
    })

    return(
        <div className="flex flex-col w-full h-screen max-h-[calc(100vh-124px)] lg:max-h-[calc(100vh-64px)]">
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
                    <>
                        {modalOpen && 
                            <ModalRequest 
                                request={selectedRequest!}
                                isTheRouteOfChange={isTheRouteOfChange} 
                                onClose={() => {
                                    setModalOpen(false);
                                    setSelectedRequest(null);
                                }}/>
                        }
                        <div className="min-h-full w-full flex flex-col justify-between bg-white-default rounded-lg border border-border">
                            {showFilterDash && <RequestTableFilter fixedFilter={fixedFilter}/>}
                            <div className="flex-1 overflow-auto h-full rounded-sm bg-white">
                                <Table className="min-w-full">    
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
                    </>
                )
            }
        </div>
    )
};




