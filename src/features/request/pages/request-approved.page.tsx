import { FileCheck2 as ApprovedRequestIcon} from "lucide-react";
import { RequestTable } from "@/components/table";
import { useContext, useEffect } from "react";
import { StatusRequest } from "@/interfaces";
import { RequestContext } from "@/context";
import { PageLayout } from "@/components";

export function RequestApprovedPage() {
   const {filter, setFilter} = useContext(RequestContext);
   
   useEffect(() => {
      setFilter({
         offset: 0,
         indexLimit: filter?.indexLimit || 10,
         status: StatusRequest.APROVADO
      });
   }, []);
    
  return (
     <PageLayout>
        <RequestTable titlePage="Solicitações Aprovadas" iconForm={ApprovedRequestIcon} fixedFilter={{status:StatusRequest.APROVADO}}/>
     </PageLayout>
  );
}


   