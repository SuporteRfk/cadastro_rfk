import {  ClipboardPen as RequestChangeIcon} from "lucide-react";
import { RequestTable } from "@/components/table";
import { useContext, useEffect } from "react";
import { RequestContext } from "@/context";
import { PageLayout } from "@/components";

export function RequestChangePage() {
   const {filter, setFilter} = useContext(RequestContext);
   
   useEffect(() => {
      setFilter({
         offset: 0,
         indexLimit: filter?.indexLimit || 10,
      });
   }, []);
    
  return (
     <PageLayout>
        <RequestTable titlePage="Solicitar Alteração" iconForm={RequestChangeIcon}/>
     </PageLayout>
  );
}


   