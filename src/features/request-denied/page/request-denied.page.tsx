import {  FileX2 as DeniedRequestIcon} from "lucide-react";
import { RequestTable } from "@/components/table";
import { useContext, useEffect } from "react";
import { StatusRequest } from "@/interfaces";
import { RequestContext } from "@/context";
import { PageLayout } from "@/components";

export function RequestDeniedPage() {
   const {filter, setFilter} = useContext(RequestContext);
   
   useEffect(() => {
      setFilter({
        status: StatusRequest.NEGADO,
        offset: 0,
        indexLimit: filter?.indexLimit || 10,
      });
   }, []);
    
  return (
     <PageLayout>
        <RequestTable titlePage="Solicitações Negadas" iconForm={DeniedRequestIcon} fixedFilter={{status: StatusRequest.NEGADO}}/>
     </PageLayout>
  );
}


   