import { LucideIcon } from "lucide-react";
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
    Droplet as InputIcon,
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
} from "lucide-react";

type MenuItem = {
    label: string;
    icon: LucideIcon; // Tipo dos ícones
    path?: string;    // Se for um link direto
    children?: { 
        label: string; 
        path: string;
        icon: LucideIcon; 
    }[]; // Se tiver submenu
};
  

export const menuComum:MenuItem[] =[
    {
        label: "Pessoas e Serviços",
        icon: PeopleServicesIcon,
        children: [
            {label: "Cadastro Clientes",path: "/cadastro/cliente",icon: UsersIcon},
            {label: "Cadastro Fornecedores",path: "/cadastro/cliente",icon: SuppliersIcon},
        ]
    },
    {
        label: "Produtos Acabados (PA)",
        icon: PAIcon,
        children: [
            {label: "Cadastro PA Copacker", path: "/cadastro/pa-copacker" , icon:CopackerIcon},
            {label: "Cadastro PA Fardo (próprio e ind)", path:"/cadastro/pa-fardo", icon: BurdenIcon},
            {label: "Cadastro PA Unitário (próprio e ind)", path:"/cadastro/pa-unitario", icon:UnitaryIcon},
            {label: "Cadastro PA Terceiros", path:"/cadastro/pa-terceiro", icon: PAThirdIcon},
        ]
    },
    {
        label: "Materiais e Insumos",
        icon: MaterialsIcon,
        children: [
            {label: "Cadastro Produtos Indiretos", path: "/cadastro/produtos-indiretos", icon: IndirectProductsIcon},
            {label: "Cadastro Insumos", path: "/cadastro/insumos", icon: InputIcon}
        ]
    },
    {
        label: "Configuração de Padrões",
        icon: SettingsDefaultIcon,
        children: [
            {label: "Cadastro Unidade de Medida", path: "/cadastro/unidade-medida", icon: UnitMeasureIcon},
            {label: "Cadastro Condição de Pagamento", path: "/cadastro/condicao-pagamento", icon: PaymentCoonditionIcon},
        ]
    },
    {
        label: "Solicitar Alteração",
        icon: RequestChangeIcon,
        path: "/solicitar-alteracao"
    }
];


export const menuControladoria:MenuItem[] = [
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