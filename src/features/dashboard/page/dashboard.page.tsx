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
    console.log(user)
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
              <div className="w-full p-2 mt-12">
                <LoadingSkelleton numberLines={filter?.indexLimit || 10}/>
              </div>
            ): (totalRequest === 0) ?(
              <div className="w-full h-full flex items-center justify-center">
                <MomentCoffe mensagem="Olá, seja bem-vindo ao sistema!" />
              </div>
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