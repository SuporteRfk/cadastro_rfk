
import { 
    FamilyCodeIndirectProducts, 
    GroupCodeIndirectProducts_30, 
    GroupCodeIndirectProducts_31, 
    GroupCodeIndirectProducts_32, 
    GroupCodeIndirectProducts_33 ,
    GroupCodeIndirectProducts_36, 
    GroupCodeIndirectProducts_37, 
    GroupCodeIndirectProducts_39, 
    TypeCodeIndirectProducts 
} from "./indirect-products-enum";

import {Sectors} from "@/interfaces";

export interface IIndirectProducts {
    id: number;
    criado_em: string;
    nome_solicitante: string;
    email: string;
    whatsapp: string;
    setor: Sectors;
    descricao_curta:string;
    descricao_uso:string;
    codigo_familia: FamilyCodeIndirectProducts;
    codigo_grupo: GroupCodeIndirectProducts_30 
        | GroupCodeIndirectProducts_31 
        | GroupCodeIndirectProducts_32
        | GroupCodeIndirectProducts_33
        | GroupCodeIndirectProducts_36
        | GroupCodeIndirectProducts_37
        | GroupCodeIndirectProducts_39;
    tipo: TypeCodeIndirectProducts;
    unidade_medida: string;
    ncm: string;
    id_usr_keycloak: string;
}

export type IIndirectProductsRegister = Omit<IIndirectProducts, "id">;


export type IndirectProducStep2 = Pick<IIndirectProducts, "descricao_uso" | "codigo_familia" | "codigo_grupo" | "tipo">;

