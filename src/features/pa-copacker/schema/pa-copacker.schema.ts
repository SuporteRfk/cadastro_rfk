import { FamilyCodePACopacker, GroupCodePACopacker , TypeCodeoPACopacker } from "../interface/pa-copacker-enum";
import { IPACopackerRegister } from "../interface/pa-copacker";
import { Trail } from "@/interfaces";
import * as yup from "yup";


export const paCopackerRegisterSchema: yup.ObjectSchema<IPACopackerRegister> = yup.object<IPACopackerRegister>().shape({
    criado_em: yup.string().required("Data é obrigatório"),
    email: yup.string().email("Insira um e-mail valido").required("E-mail é obrigatório"),
    nome_solicitante: yup.string().required("Por favor, informe seu nome"),
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
        .notRequired(),
    codigo_familia: yup.string()
        .oneOf(Object.values(FamilyCodePACopacker))
        .required("Informar a família, caso não saiba solicitar ao setor fiscal"),
    codigo_grupo: yup.string()
        .oneOf(Object.values(GroupCodePACopacker))
        .required("Por favor, informe o grupo ao qual pertence o produto"),
    tipo: yup.string()
        .oneOf(Object.values(TypeCodeoPACopacker))
        .required("Por favor, informe o tipo do produto"),   
    unidade_medida: yup.string().required("Por favor, informe por extenso a unidade de medida. Ex: UNIDADE (UN)"), 
    peso_bruto: yup.number().required('Por favor, informar o peso bruto do copacker'),
    peso_liquido: yup.number().required('Por favor, informar o peso liquído do copacker'),
    rastro: yup.string().oneOf(Object.values(Trail)).required("Por favor, informe o rastro do copacker"),  
    codigo_barras:yup.number()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        ) 
        .required("Insira o código de barras gtin da nota fiscal"),
    nome_cientifico: yup.string().required("Insira o nome científico do produto"),
    sabor: yup.string().required("Insira o sabor do produto"),
    profundidade_fardo:yup.number()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        )   
        .notRequired(),
    altura_fardo:yup.number()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        )
        .notRequired(),
    largura_fardo:yup.number()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        )   
        .notRequired(),
    marca: yup.string().required("Por favor, informe a marca do produto"),
    tamanho_embalagem: yup.string().required("Por favor, informe a embalagem do produto"),
    tipo_embalagem: yup.string().required("Por favor, informe o tipo de embalagem"),
    lastro: yup.number()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        )   
        .notRequired(),
    paletizacao: yup.number()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        )   
        .notRequired(),
    largura_outro: yup.number()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        )   
        .notRequired(),
    altura_outro: yup.number()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        )   
        .notRequired(),
    profundidade_outro: yup.number()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        )   
        .notRequired(),
    ncm: yup.string()
        .transform((value) => value.replace(/[\s.]/g, ""))
        .matches(/^\d{8}$/, "Informe um NCM válido de 8 dígitos. Ex: 8430.10.80")
        .required("Por favor, informe o NCM"),
    cest:yup.string()
        .transform((value) => value.replace(/[\s.]/g, ""))
        .matches(/^\d{7}$/, "Informe um CEST válido de 7 dígitos. Ex: 84.301.80")
        .notRequired(),
    grupo_tributario: yup.number()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        )   
        .notRequired(),
    armazem_padrao: yup.string()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        )  
        .nullable()
        .notRequired()    
});
