import { PageLayout } from "@/components";
import { MomentCoffe } from "@/components/moment-coffe.components";
import { RequestTable } from "@/components/table";
import { AuthContext, RequestContext } from "@/context";
import { StatusRequest } from "@/interfaces";
import { useContext, useEffect } from "react";
import {House as DashIcon} from "lucide-react";


export const DashboardPage = () => {
    const {filter, setFilter, totalRequest} = useContext(RequestContext);
    const {user} = useContext(AuthContext);

    const isApprover = user?.access_approver;
    

    useEffect(() => {
        if (!user) return;
      
        if(isApprover) {
            setFilter({
              status: StatusRequest.PENDENTE,
              offset: 0,
              indexLimit: filter?.indexLimit || 10,
            });
        }else {
            setFilter({
              offset: 0,
              indexLimit: filter?.indexLimit || 10,
              email: user.email,
            });
        }
      }, [user, isApprover]);
      

    return ((
        <PageLayout>
            {totalRequest === 0 ?(
              <MomentCoffe mensagem="Olá, seja bem-vindo ao sistema!" />
            ):(
              <RequestTable 
                titlePage={`Bem vindo, ${user?.name}`} 
                showFilterDash={!user?.access_approver} 
                iconForm={DashIcon} 
                fixedFilter={user?.access_approver ? {status:StatusRequest.PENDENTE} :{email: user!.email} }
              />
            )}
        </PageLayout>
    ))
};