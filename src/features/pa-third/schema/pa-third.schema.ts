import { FamilyCodePAThird, GroupCodePAThird , TypeCodePAThird } from "../interface/pa-third-enum";
import { IPAThirdRegister } from "../interface/pa-third";
import { ConverterType, Trail } from "@/interfaces";
import * as yup from "yup";


export const paThirdRegisterSchema: yup.ObjectSchema<IPAThirdRegister> = yup.object<IPAThirdRegister>().shape({
    criado_em: yup.string()
        .required("Data é obrigatório"),
    email: yup.string()
        .email("Insira um e-mail valido")
        .transform((value) => value?.toLowerCase())
        .required("E-mail é obrigatório"),
    nome_solicitante: yup.string()
        .transform((value) => value?.toLowerCase())
        .required("Por favor, informe seu nome"),
    whatsapp: yup.string()
        .transform((value) => value.replace(/[\s()-]/g, ""))
        .min(14, 'Por favor, insira um número válido, Ex: +55 (11) 9 9999-0000')
        .matches(/^\+?\d{12,13}$/, "Número inválido")
        .required("Por favor, informe o seu número do whatsapp com o DDD"),
    descricao_curta: yup.string()
        .max(50,"Informe uma descrição curta com no máximo 50 caracteres")
        .required("Por favor, informe uma descrição curta para o produto"),   
    codigo_saib:yup.number()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        )   
        .nullable()
        .notRequired(),
    codigo_familia: yup.string()
        .oneOf(Object.values(FamilyCodePAThird))
        .required("Informar a família, caso não saiba solicitar ao setor fiscal"),
    codigo_grupo: yup.string()
        .oneOf(Object.values(GroupCodePAThird))
        .required("Por favor, informe o grupo ao qual pertence o produto"),
    tipo: yup.string()
        .oneOf(Object.values(TypeCodePAThird))
        .required("Por favor, informe o tipo do produto"),  
    unidade_medida: yup.string()
        .required("Por favor, informe a unidade de como VENDEMOS, por extenso a unidade de medida. Ex: UNIDADE (UN)"), 
    segunda_unidade_medida: yup.string()
        .required("Por favor, informe a unidade de como COMPRAMOS, por extenso a unidade de medida. Ex: UNIDADE (UN)"),
    fator_conversor: yup.number()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        ) 
        .required("Por favor, informe quantas unidades tem na caixa"),
    tipo_conversor:yup.string()
        .oneOf(Object.values(ConverterType))
        .required("Por favor, informe o tipo de conversor"),
    armazem_padrao:yup.string()
        .oneOf(Object.values(['055 - REVENDA']))
        .required("Por favor, informe o armazem padrão"),
    peso_bruto: yup.number()
        .required('Por favor, informar o peso bruto'),
    peso_liquido: yup.number()
        .required('Por favor, informar o peso liquído'),  
    rastro: yup.string()
        .oneOf(Object.values(Trail))
        .required("Por favor, informe o rastro"), 
    lastro: yup.number()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        )   
        .required("Por favor, informe o lastro"),
    paletizacao: yup.number()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        )   
    .required("Por favor, informe a paletização"),
    codigo_barras:yup.number()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        ) 
        .required("Informe o código de barras"),  
    segundo_codigo_barras:yup.number()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        ) 
        .required("Informe o segundo código de barras"),  
    nome_cientifico: yup.string()
        .required("Insira o nome científico do produto"),  
    sub_grupo: yup.string()
        .required("Informe o fornecedor de quem compramos"),
    sabor: yup.string()
        .required("Insira o sabor do produto"), 
    marca: yup.string()
        .required("Por favor, informe a marca do produto"),
    tamanho_embalagem: yup.string()
        .required("Por favor, informe a embalagem do produto"),
    tipo_embalagem: yup.string()
        .required("Por favor, informe o tipo de embalagem"),
    ncm: yup.string()
        .transform((value) => value.replace(/[\s.]/g, ""))
        .matches(/^\d{8}$/, "Informe um NCM válido de 8 dígitos. Ex: 8430.10.80")
        .required("Por favor, informe o NCM"),
    cest:yup.string()
        .transform((value) => value.replace(/[\s.]/g, ""))
        .matches(/^\d{7}$/, "Informe um CEST válido de 7 dígitos. Ex: 84.301.80")
        .required("Por favor, informe o CEST"),
    grupo_tributario: yup.number()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        )   
        .nullable()
        .notRequired(),
    id_usr_keycloak: yup.string().required()
});