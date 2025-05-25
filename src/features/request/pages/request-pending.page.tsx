import {  FilePlus2 as PendingRequestIcon} from "lucide-react";
import { RequestTable } from "@/components/table";
import { useContext, useEffect } from "react";
import { StatusRequest } from "@/interfaces";
import { RequestContext } from "@/context";
import { PageLayout } from "@/components";

export function RequestPendingPage() {
   const {filter, setFilter} = useContext(RequestContext);
   
   useEffect(() => {
      setFilter({
        status: StatusRequest.PENDENTE,
        offset: 0,
        indexLimit: filter?.indexLimit || 10,
      });
   }, []);
    
  return (
     <PageLayout>
        <RequestTable titlePage="Solicitações Pendentes" iconForm={PendingRequestIcon} fixedFilter={{status: StatusRequest.PENDENTE}}/>
     </PageLayout>
  );
}


   