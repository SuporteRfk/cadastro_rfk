import {IndirectProducStep2} from "../interface/indirect-products";
import {
    FamilyCodeIndirectProducts, 
    GroupCodeIndirectProducts_30, 
    GroupCodeIndirectProducts_31, 
    GroupCodeIndirectProducts_32, 
    GroupCodeIndirectProducts_33, 
    GroupCodeIndirectProducts_36, 
    GroupCodeIndirectProducts_37, 
    GroupCodeIndirectProducts_39,
    TypeCodeIndirectProducts
} from "../interface/indirect-products-enum";
import * as yup from "yup";



export const indirectProductsStep2Schema: yup.ObjectSchema<IndirectProducStep2> = yup.object<IndirectProducStep2>().shape({
  descricao_uso: yup.string()
    .transform((value) => value?.toUpperCase())
    .max(100,"Descrição de no máximo 100 caracteres")
    .required("Por favor, informe para que o produto será utilizado"),
  codigo_familia: yup.string()
    .oneOf(Object.values(FamilyCodeIndirectProducts))
    .required("Informar a família, caso não saiba solicitar ao setor fiscal"),
  codigo_grupo: yup.string()
    .oneOf([
        ...Object.values(GroupCodeIndirectProducts_30),
        ...Object.values(GroupCodeIndirectProducts_31),
        ...Object.values(GroupCodeIndirectProducts_32),
        ...Object.values(GroupCodeIndirectProducts_33),
        ...Object.values(GroupCodeIndirectProducts_36),
        ...Object.values(GroupCodeIndirectProducts_37),
        ...Object.values(GroupCodeIndirectProducts_39),
    ])
    .required("Por favor, informe o grupo ao qual pertence o produto"), 
  tipo: yup.string()
    .oneOf(Object.values(TypeCodeIndirectProducts))
    .required("Por favor, informe o tipo do produto"),  
});


