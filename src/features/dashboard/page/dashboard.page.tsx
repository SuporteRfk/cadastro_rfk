import { MomentCoffe } from "@/components/moment-coffe.components";
import { LoadingSkelleton, PageLayout } from "@/components";
import { AuthContext, RequestContext } from "@/context";
import { RequestTable } from "@/components/table";
import {House as DashIcon} from "lucide-react";
import { useContext, useEffect} from "react";


export const DashboardPage = () => {
    const {filter, setFilter, totalRequest, loadingSkelleton} = useContext(RequestContext);
    const {user, isLoading} = useContext(AuthContext);
    
    
    
    useEffect(() => {
        if(!user) return;
        
        if(!user.access_approver){
            setFilter({ offset: 0, indexLimit: filter?.indexLimit || 10, email: user.email, idKeycloack: user.id_keycloak });
        } else{
            setFilter({ offset: 0, indexLimit: filter?.indexLimit || 10});
        }
    }, [user]);

    return ((
        <PageLayout>
            { (loadingSkelleton || isLoading || !user) ? (
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
                iconForm={DashIcon} 
                fixedFilter={!user.access_approver ? {email: user.email} : undefined}
              />
            )}
        </PageLayout>
    ))
};