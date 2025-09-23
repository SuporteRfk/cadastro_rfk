import { FileBadge as RequestFiscalIcon} from "lucide-react";
import { RequestTable } from "@/components/table";
import { useContext, useEffect } from "react";
import { StatusRequest } from "@/interfaces";
import { AuthContext, RequestContext } from "@/context";
import { PageLayout } from "@/components";
import { useNavigate } from "react-router-dom";

export function RequestFiscalPage() {
   const {filter, setFilter} = useContext(RequestContext);
   const {user} = useContext(AuthContext);
   const navigate = useNavigate();

   //rota permitida apenas para usuários com acesso de aprovador
   useEffect(() => {
   if (user && (!user.access_approver && !user.access_fiscal)) {
      navigate("/notfound", { replace: true });
   }
   }, [user, navigate]);

   useEffect(() => {
      setFilter({
         offset: 0,
         indexLimit: filter?.indexLimit || 10,
         status: StatusRequest.FISCAL
      });
   }, []);
   
   if (!user || (!user.access_approver && !user.access_fiscal)) return null;
   return (
     <PageLayout>
        <RequestTable titlePage="Solicitações ao Fiscal" iconForm={RequestFiscalIcon} fixedFilter={{status:StatusRequest.FISCAL}} isApprover={user.access_approver || user.access_fiscal}/>
     </PageLayout>
  );
}


   