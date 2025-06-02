import { MenuItem } from "@/interfaces";
import {
    UserCheck as PeopleServicesIcon,
    Factory as SuppliersIcon,
    Users as UsersIcon,
    PackageOpen as PAIcon,
    Layers as CopackerIcon,
    Boxes as BurdenIcon,
    Box as UnitaryIcon,
    Building as PAThirdIcon,
    Blocks as MaterialsIcon,
    Droplet as InsumoIcon,
    PackageCheck as IndirectProductsIcon,
    Settings as SettingsDefaultIcon,
    Banknote as PaymentCoonditionIcon,
    Ruler as UnitMeasureIcon,
    ClipboardPen as RequestChangeIcon,
    FileStack as RequestIcon,
    FilePlus2 as PendingRequestIcon,
    FilePenLine as RevisionRequestIcon,
    FileX2 as DeniedRequestIcon,
    FileCheck2 as ApprovedRequestIcon,
    House as HomeIcon,
} from "lucide-react";



export const menuCommon:MenuItem[] =[
    {
        label: "Home",
        icon: HomeIcon,
        path: "/dashboard"
    },
    {
        label: "Pessoas e Serviços",
        icon: PeopleServicesIcon,
        children: [
            {label: "Cad. Clientes",path: "/cadastro/cliente",icon: UsersIcon},
            {label: "Cad. Fornecedores",path: "/cadastro/fornecedores",icon: SuppliersIcon},
        ]
    },
    {
        label: "Produtos Acabados (PA)",
        icon: PAIcon,
        children: [
            {label: "Cad. PA Copacker", path: "/cadastro/pa-copacker" , icon:CopackerIcon},
            {label: "Cad. PA Fardo", path:"/cadastro/pa-fardo", icon: BurdenIcon},
            {label: "Cad. PA Unitário", path:"/cadastro/pa-unitario", icon:UnitaryIcon},
            {label: "Cad. PA Terceiros", path:"/cadastro/pa-terceiro", icon: PAThirdIcon},
        ]
    },
    {
        label: "Materiais e Insumos",
        icon: MaterialsIcon,
        children: [
            {label: "Cad. Produtos Indiretos", path: "/cadastro/produtos-indiretos", icon: IndirectProductsIcon},
            {label: "Cad. Insumos", path: "/cadastro/insumos", icon: InsumoIcon}
        ]
    },
    {
        label: "Configuração de Padrões",
        icon: SettingsDefaultIcon,
        children: [
            {label: "Cad. Unidade de Medida", path: "/cadastro/unidade-medida", icon: UnitMeasureIcon},
            {label: "Cad. Condição de Pagamento", path: "/cadastro/condicao-pagamento", icon: PaymentCoonditionIcon},
        ]
    },
    {
        label: "Solicitar Alteração",
        icon: RequestChangeIcon,
        path: "/solicitar-alteracao"
    }
];


export const menuController :MenuItem[] = [
    {
        label: "Painel Solicitações",
        icon: RequestIcon,
        children: [
            { label: "Pendentes", path: "/solicitacoes/pendentes", icon: PendingRequestIcon },
            { label: "Revisão", path: "/solicitacoes/em-revisao", icon: RevisionRequestIcon },
            { label: "Negado", path: "/solicitacoes/negadas", icon: DeniedRequestIcon },
            { label: "Aprovado", path: "/solicitacoes/aprovadas", icon: ApprovedRequestIcon },
        ]
    }
]