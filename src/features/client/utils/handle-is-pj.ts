import { PfOrPj } from "@/interfaces";


export const handleIsPJ = (fisica_juridica:string):boolean => {
        return fisica_juridica === PfOrPj.JURIDICO;
};