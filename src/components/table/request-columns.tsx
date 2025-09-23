import { ColumnDef } from "@tanstack/react-table";
import { IViewRequest } from "@/interfaces";
import { Badge } from "../ui";
import { 
    MessageSquareText as OpenObservationIcon,
    Eye as OpenModalIcon,
    Hash as IdIcon,
    Calendar1 as DateIcon,
    CircleUser as RequesterIcon,
    Tag as TypeIcon
} from "lucide-react";

interface getRequestColumnsProps {
    onToggleObservation: (id: number) => void;
    observationOpenId: number | null;
    onOpenModal: (request: IViewRequest) => void;
}


const styleBadge = {
    "Pendente": "pending",
    "Em Revisão": "review",
    "Negado": "denied",
    "Aprovado": "approved",
    "alteração": "change",
    "novo cadastro": "new register",
    "Fiscal": "fiscal"
} as const;

export const getRequestColumns = ({
    onToggleObservation, 
    observationOpenId, 
    onOpenModal
}:getRequestColumnsProps):ColumnDef<IViewRequest>[] => [
    {
        accessorKey: "id",
        header: "#Id",
        cell: info =>{ 
            return(
                <span className="w-full flex items-center justify-center gap-0.5">
                    <IdIcon size={13} color="var(--color-neutral)"/>
                    {info.getValue() as string}
                </span>
            )
        }
    },
    {
        accessorKey: "criado_em",
        header: "Data",
        cell: info => {
            const dateFormated = new Date(info.getValue() as string).toLocaleDateString("pt-BR")

            return(
                <span className="flex items-center justify-between">
                    <DateIcon size={13} color="var(--color-neutral)" />
                    {dateFormated}
                </span>
            )
        }
    },
    {
        accessorKey: "nome_solicitante",
        header: "Solicitante",
        cell: info => {
            return(
                <span className="flex items-center justify-between">
                    <RequesterIcon size={13} color="var(--color-neutral)"/>
                    {info.getValue() as string}
                </span>
            )
        }
    },
    {
        accessorKey: "tipo",
        header: "Tipo",
        cell: info => { 
            return(
                <span className="w-full flex items-center justify-between gap-0.5">
                    <TypeIcon size={13} color="var(--color-neutral)"/>
                    {info.getValue() as string}
                </span>
            )
        }
    },
    {
        accessorKey: "operacao",
        header: "Operação",
        cell: info => {
            const operation = info.getValue() as string;
            const variant = styleBadge[operation as keyof typeof styleBadge]
            return (
                <span className="flex justify-center items-center">
                    <Badge variant={variant}>{operation}</Badge>
                </span>
            );
        }
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: info => {
            const status = info.getValue() as string;
            const variant = styleBadge[status as keyof typeof styleBadge];
            return (
                <span className="flex justify-center items-center">
                    <Badge variant={variant} className="w-[100px]">{status}</Badge>
                </span>
            );
        }
    },
    {
        id: "acoes",
        header: "",
        cell: ({row}) => (
            <div className="flex gap-2 items-center justify-center">
                <button                   
                    onClick={() => onToggleObservation(row.original.id)}                   
                    className={`
                        transition-colors cursor-pointer
                        ${observationOpenId === row.original.id ? 'text-blue-600' : 'text-info/60 hover:text-info'}
                    `}
                    title="Ver Observação"
                >
                    <OpenObservationIcon size={20}/>
                </button>

                <button 
                    onClick={() => onOpenModal(row.original)} 
                    className="cursor-pointer"
                    title="Ver Solicitação"
                >
                    <OpenModalIcon size={20}/>
                </button>
            </div>
        )
    }
];



