import { FilePenLine as RevisionRequestIcon} from "lucide-react";
import { RequestTable } from "@/components/table";
import { useContext, useEffect } from "react";
import { StatusRequest } from "@/interfaces";
import { AuthContext, RequestContext } from "@/context";
import { PageLayout } from "@/components";
import { useNavigate } from "react-router-dom";

export function RequestRevisionPage() {
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
         status: StatusRequest.REVISAO
      });
   }, []);
   
   if (!user || !user.access_approver) return null;
   return (
     <PageLayout>
        <RequestTable titlePage="Solicitações em Revisão" iconForm={RevisionRequestIcon} fixedFilter={{status:StatusRequest.REVISAO}} isApprover={user.access_approver}/>
     </PageLayout>
  );
}


   