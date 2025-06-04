import { IIndirectProductsRegister } from "../interface/indirect-products";
import { UseFormReturn } from "react-hook-form";
import {
  GroupCodeIndirectProducts_30,
  GroupCodeIndirectProducts_31,
  GroupCodeIndirectProducts_32,
  GroupCodeIndirectProducts_33,
  GroupCodeIndirectProducts_36,
  GroupCodeIndirectProducts_37,
  GroupCodeIndirectProducts_39,
  FamilyCodeIndirectProducts
} from "../interface/indirect-products-enum";
import { useEffect, useState } from "react";


  


export const useGroupSelectorIndirectProduct = (methods: UseFormReturn<IIndirectProductsRegister>):
        | typeof GroupCodeIndirectProducts_30
        | typeof GroupCodeIndirectProducts_31 
        | typeof GroupCodeIndirectProducts_32
        | typeof GroupCodeIndirectProducts_33
        | typeof GroupCodeIndirectProducts_36
        | typeof GroupCodeIndirectProducts_37
        | typeof GroupCodeIndirectProducts_39
        | string[]  => {
    
    const fallbackGroup = ["Selecione uma família"];
    
    const [group, setGroup] = useState<
        | typeof GroupCodeIndirectProducts_30
        | typeof GroupCodeIndirectProducts_31 
        | typeof GroupCodeIndirectProducts_32
        | typeof GroupCodeIndirectProducts_33
        | typeof GroupCodeIndirectProducts_36
        | typeof GroupCodeIndirectProducts_37
        | typeof GroupCodeIndirectProducts_39
        | typeof fallbackGroup
    >(fallbackGroup);
  
    const groupFamilyMap = {
      [FamilyCodeIndirectProducts.IMOBILIZADO]: GroupCodeIndirectProducts_37,
      [FamilyCodeIndirectProducts.INSUMOS_NAO_PRODUTIVOS]: GroupCodeIndirectProducts_30,
      [FamilyCodeIndirectProducts.MATERIAL_CONSUMO]: GroupCodeIndirectProducts_31,
      [FamilyCodeIndirectProducts.MERCADORIA_REVENDA]: GroupCodeIndirectProducts_39,
      [FamilyCodeIndirectProducts.PRODUTO_MANUTENCAO_FROTAS]: GroupCodeIndirectProducts_33,
      [FamilyCodeIndirectProducts.PRODUTO_MANUTENCAO_INDUSTRIAL]: GroupCodeIndirectProducts_32,
      [FamilyCodeIndirectProducts.SUBPRODUTO]: GroupCodeIndirectProducts_36,
    };


    const selectedFamilyValue = methods.watch("codigo_familia");

    useEffect(() => {
      const family = groupFamilyMap[selectedFamilyValue]; 
      setGroup(family || fallbackGroup);
    },[selectedFamilyValue])

    return group;

};



