import { RequestPendingPage, RequestApprovedPage, RequestDeniedPage, RequestRevisionPage } from "@/features/request/pages";
import { RegisterIndirectProducts } from "@/features/indirect-products/page/register-indirect-products.page";
import { RegisterPaymentCondition } from "@/features/payment-condition/page/register-payment-codition.page";
import { RegisterUnitMeasure } from "@/features/unit-measure/page/register-unit-measure.page";
import { RegisterPACopacker } from "@/features/pa-copacker/page/register-pa-copacker.page";
import { RegisterPAUnitary } from "@/features/pa-unitary/page/register-pa-unitary.page";
import { RequestChangePage } from "@/features/request-change/page/request-change.page";
import { RegisterPABurden } from "@/features/pa-burden/page/register-pa-burden.page";
import { RegisterSupplier } from "@/features/suppliers/page/register-supplier.page";
import { RegisterPAThird } from "@/features/pa-third/page/register-pa-third.page";
import { RegisterClientPage } from "@/features/client/page/register-client.page";
import { RegisterInsumo } from "@/features/insumos/page/register-insumo.page";
import { DashboardPage } from "@/features/dashboard/page/dashboard.page";
import { LoginPage } from "@/features/login/page/login.page";
import { ServiceRegistrationPage } from "@/features/service-registration/page/service-registration.page";


// Arquivo para organiar as rotas do sistema

export const privateRoutes = [
    {path: "/dashboard", element: DashboardPage},
    {path: "/cadastro/cliente", element: RegisterClientPage},
    {path: "/cadastro/condicao-pagamento", element: RegisterPaymentCondition},
    {path: "/cadastro/fornecedores", element: RegisterSupplier},
    {path: "/cadastro/servico", element: ServiceRegistrationPage},
    {path: "/cadastro/insumos", element: RegisterInsumo},
    {path: "/cadastro/pa-copacker", element: RegisterPACopacker},
    {path: "/cadastro/pa-fardo", element: RegisterPABurden},
    {path: "/cadastro/pa-terceiro", element: RegisterPAThird},
    {path: "/cadastro/pa-unitario", element: RegisterPAUnitary},
    {path: "/cadastro/produtos-indiretos", element: RegisterIndirectProducts},
    {path: "/cadastro/unidade-medida", element: RegisterUnitMeasure},
    {path: "/solicitar-alteracao", element: RequestChangePage},
    {path: "/solicitacoes/pendentes", element: RequestPendingPage},
    {path: "/solicitacoes/em-revisao", element: RequestRevisionPage},
    {path: "/solicitacoes/negadas", element: RequestDeniedPage},
    {path: "/solicitacoes/aprovadas", element: RequestApprovedPage}
];

export const publicRoutes = [
    {path: "/", element: LoginPage},
    {path: "/login", element: LoginPage}
]

