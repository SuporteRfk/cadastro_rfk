import { FilePenLine as RevisionRequestIcon} from "lucide-react";
import { RequestTable } from "@/components/table";
import { useContext, useEffect } from "react";
import { StatusRequest } from "@/interfaces";
import { RequestContext } from "@/context";
import { PageLayout } from "@/components";

export function RequestRevisionPage() {
   const {filter, setFilter} = useContext(RequestContext);
   
   useEffect(() => {
      setFilter({
         offset: 0,
         indexLimit: filter?.indexLimit || 10,
         status: StatusRequest.REVISAO
      });
   }, []);
    
  return (
     <PageLayout>
        <RequestTable titlePage="Solicitações em Revisão" iconForm={RevisionRequestIcon} fixedFilter={{status:StatusRequest.REVISAO}}/>
     </PageLayout>
  );
}


   