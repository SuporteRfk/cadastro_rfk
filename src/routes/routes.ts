import { LoginPage } from "@/features/login/page/login.page";


// Arquivo para organiar as rotas do sistema

export const privateRoutes = [
    {path: "/dashboard", element: "teste"},
    {path: "/cadastro/cliente", element: "teste"},
    {path: "/cadastro/condicao-pagamento", element: "teste"},
    {path: "/cadastro/fornecedores", element: "teste"},
    {path: "/cadastro/insumos", element: "teste"},
    {path: "/cadastro/pa-copacker", element: "teste"},
    {path: "/cadastro/pa-fardo", element: "teste"},
    {path: "/cadastro/pa-terceiro", element: "teste"},
    {path: "/cadastro/pa-unitario", element: "teste"},
    {path: "/cadastro/produtos-indiretos", element: "teste"},
    {path: "/cadastro/unidade-medida", element: "teste"}
];

export const publicRoutes = [
    {path: "/login", element: LoginPage}
]

