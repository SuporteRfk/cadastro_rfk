import {IIndirectProductsRegister} from "../interface/indirect-products";
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
import { Sectors } from "@/interfaces";
import * as yup from "yup";



export const indirectProductsRegisterSchema: yup.ObjectSchema<IIndirectProductsRegister> = yup.object<IIndirectProductsRegister>().shape({
  criado_em: yup.string()
    .required("Data é obrigatório"),
  nome_solicitante: yup.string()
    .transform((value) => value?.toLowerCase())
    .required("Por favor, informe seu nome"),
  email: yup.string()
    .email("Insira um e-mail valido")
    .transform((value) => value?.toLowerCase())
    .required("E-mail é obrigatório"), 
  whatsapp: yup.string()
    .transform((value) => value.replace(/[\s()-]/g, ""))
    .min(14, 'Por favor, insira um número válido, Ex: +55 (11) 9 9999-0000')
    .matches(/^\+?\d{12,13}$/, "Número inválido")
    .required("Por favor, informe o seu número do whatsapp com o DDD"),
  setor: yup.string()
    .oneOf(Object.values(Sectors))
    .required("Por favor, informe seu setor"),   
  descricao_curta: yup.string()
    .max(50,"Informe uma descrição curta com no máximo 50 caracteres")
    .required("Por favor, informe uma descrição curta para o produto"),
  descricao_uso: yup.string()
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
  unidade_medida: yup.string()
    .required("Por favor, informe por extenso a unidade de medida. Ex: UNIDADE (UN)"),   
  ncm: yup.string()
    .transform((value) => value.replace(/[\s.]/g, ""))
    .matches(/^\d{8}$/, "Informe um NCM válido de 8 dígitos. Ex: 8430.10.80")
    .required("Por favor, informe o NCM"),
});


