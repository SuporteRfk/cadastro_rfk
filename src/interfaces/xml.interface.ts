import { FamilyCodeIndirectProducts, GroupCodeIndirectProducts_30, GroupCodeIndirectProducts_31, GroupCodeIndirectProducts_32, GroupCodeIndirectProducts_33, GroupCodeIndirectProducts_36, GroupCodeIndirectProducts_37, GroupCodeIndirectProducts_39, TypeCodeIndirectProducts } from "@/features/indirect-products/interface/indirect-products-enum";

export type StatusItemXml = "Ok"  | "Pendente" | "Descartado";

export type XmlInfo = {
    id: string; 
    file: File; 
    name: string; 
    itemsCount: number
};

export type XmlIndirectProduct = {
    id: number;
    ncm: string; 
    unit_measure: string; 
    name: string;
    idFile: string;
    status: StatusItemXml;
    descricao_uso?:string;
    codigo_familia?: FamilyCodeIndirectProducts;
    codigo_grupo?: GroupCodeIndirectProducts_30 
        | GroupCodeIndirectProducts_31 
        | GroupCodeIndirectProducts_32
        | GroupCodeIndirectProducts_33
        | GroupCodeIndirectProducts_36
        | GroupCodeIndirectProducts_37
        | GroupCodeIndirectProducts_39;
    tipo?: TypeCodeIndirectProducts;
    loteColorId?: number;
};




