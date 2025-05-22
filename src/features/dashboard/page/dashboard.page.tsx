import { LoadingSkelleton, PageLayout } from "@/components";
import { MomentCoffe } from "@/components/moment-coffe.components";
import { RequestTable } from "@/components/table";
import { AuthContext, RequestContext } from "@/context";
import { StatusRequest } from "@/interfaces";
import { useContext, useEffect} from "react";
import {House as DashIcon} from "lucide-react";


export const DashboardPage = () => {
    const {filter, setFilter, totalRequest, loadingSkelleton} = useContext(RequestContext);
    const {user} = useContext(AuthContext);

    useEffect(() => {
           if(!user) return;
   
           if(user.access_approver) {
               setFilter({ offset: 0, indexLimit: 10, status: StatusRequest.PENDENTE });
           } else {
               setFilter({ offset: 0, indexLimit: 10, email: user.email });
           }
    }, [user]);

    return ((
        <PageLayout>
            { loadingSkelleton ? (
              <LoadingSkelleton numberLines={filter?.indexLimit || 10}/>
            ): (totalRequest === 0) ?(
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