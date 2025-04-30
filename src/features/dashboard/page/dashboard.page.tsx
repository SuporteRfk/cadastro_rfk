import { PageLayout } from "@/components";
import { MomentCoffe } from "@/components/moment-coffe.components";


export const DashboardPage = () => {
    return ((
        <PageLayout>
            <MomentCoffe mensagem="Olá, seja bem-vindo ao sistema!" />
        </PageLayout>
    ))
};