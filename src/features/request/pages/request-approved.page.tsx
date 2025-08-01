import { FileCheck2 as ApprovedRequestIcon} from "lucide-react";
import { RequestTable } from "@/components/table";
import { useContext, useEffect } from "react";
import { StatusRequest } from "@/interfaces";
import { AuthContext, RequestContext } from "@/context";
import { PageLayout } from "@/components";
import { useNavigate } from "react-router-dom";

export function RequestApprovedPage() {
   const {filter, setFilter} = useContext(RequestContext);
   const {user} = useContext(AuthContext);
   const navigate = useNavigate();

   //rota permitida apenas para usuários com acesso de aprovador
   useEffect(() => {
   if (user && !user.access_approver) {
      navigate("/notfound", { replace: true });
   }
   }, [user, navigate]);
 

   useEffect(() => {
      setFilter({
         offset: 0,
         indexLimit: filter?.indexLimit || 10,
         status: StatusRequest.APROVADO
      });
   }, []);
   
   if (!user || !user.access_approver) return null;
   return (
     <PageLayout>
        <RequestTable titlePage="Solicitações Aprovadas" iconForm={ApprovedRequestIcon} fixedFilter={{status:StatusRequest.APROVADO}} isApprover={user.access_approver}/>
     </PageLayout>
   );
}


   