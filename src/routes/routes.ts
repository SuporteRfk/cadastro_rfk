import { RegisterClientPage } from "@/features/client/page/register-client.page";
import { DashboardPage } from "@/features/dashboard/page/dashboard.page";
import { LoginPage } from "@/features/login/page/login.page";


// Arquivo para organiar as rotas do sistema

export const privateRoutes = [
    {path: "/dashboard", element: DashboardPage},
    {path: "/cadastro/cliente", element: RegisterClientPage},
    {path: "/cadastro/condicao-pagamento", element: "teste"},
    {path: "/cadastro/fornecedores", element: "teste"},
    {path: "/cadastro/insumos", element: "teste"},
    {path: "/cadastro/pa-copacker", element: RegisterClientPage},
    {path: "/cadastro/pa-fardo", element: "teste"},
    {path: "/cadastro/pa-terceiro", element: "teste"},
    {path: "/cadastro/pa-unitario", element: "teste"},
    {path: "/cadastro/produtos-indiretos", element: "teste"},
    {path: "/cadastro/unidade-medida", element: "teste"},
    {path: "/solicitar-alteracao", element: RegisterClientPage},
    {path: "/solicitacoes/pendentes", element: "teste"},
    {path: "/solicitacoes/em-revisao", element: "teste"},
    {path: "/solicitacoes/negadas", element: "teste"},
    {path: "/solicitacoes/aprovadas", element: "teste"}
];

export const publicRoutes = [
    {path: "/", element: LoginPage},
    {path: "/login", element: LoginPage}
]

