import { RegisterPaymentCondition } from "@/features/payment-condition/page/register-payment-codition.page";
import { RegisterUnitMeasure } from "@/features/unit-measure/page/register-unit-measure.page";
import { RegisterPACopacker } from "@/features/pa-copacker/page/register-pa-copacker.page";
import { RegisterPAUnitary } from "@/features/pa-unitary/page/register-pa-unitary.page";
import { RegisterPABurden } from "@/features/pa-burden/page/register-pa-burden.page";
import { RegisterSupplier } from "@/features/suppliers/page/register-supplier.page";
import { RegisterClientPage } from "@/features/client/page/register-client.page";
import { DashboardPage } from "@/features/dashboard/page/dashboard.page";
import { LoginPage } from "@/features/login/page/login.page";
import { RegisterPAThird } from "@/features/pa-third/page/register-pa-third.page";


// Arquivo para organiar as rotas do sistema

export const privateRoutes = [
    {path: "/dashboard", element: DashboardPage},
    {path: "/cadastro/cliente", element: RegisterClientPage},
    {path: "/cadastro/condicao-pagamento", element: RegisterPaymentCondition},
    {path: "/cadastro/fornecedores", element: RegisterSupplier},
    {path: "/cadastro/insumos", element: "teste"},
    {path: "/cadastro/pa-copacker", element: RegisterPACopacker},
    {path: "/cadastro/pa-fardo", element: RegisterPABurden},
    {path: "/cadastro/pa-terceiro", element: RegisterPAThird},
    {path: "/cadastro/pa-unitario", element: RegisterPAUnitary},
    {path: "/cadastro/produtos-indiretos", element: "teste"},
    {path: "/cadastro/unidade-medida", element: RegisterUnitMeasure},
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

