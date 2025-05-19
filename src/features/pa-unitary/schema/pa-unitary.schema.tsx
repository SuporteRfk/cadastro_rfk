import { FamilyCodePAUnitary, GroupCodePAUnitary, TypeCodeoPAUnitary } from "../interface/pa-unitary-enum";
import { IPAUnitaryRegister } from "../interface/pa-unitary";
import * as yup from "yup";
import { Trail, ValidityPeriod } from "@/interfaces";


export const paUnitaryRegisterSchema: yup.ObjectSchema<IPAUnitaryRegister> = yup.object<IPAUnitaryRegister>().shape({
    criado_em: yup.string()
        .required("Data é obrigatório"),
    email: yup.string()
        .email("Insira um e-mail valido")
        .required("E-mail é obrigatório"),
    nome_solicitante: yup.string()
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
        .oneOf(Object.values(FamilyCodePAUnitary))
        .required("Informar a família, caso não saiba solicitar ao setor fiscal"),
    codigo_grupo: yup.string()
        .oneOf(Object.values(GroupCodePAUnitary))
        .required("Por favor, informe o grupo ao qual pertence o produto"),
    tipo: yup.string()
        .oneOf(Object.values(TypeCodeoPAUnitary))
        .required("Por favor, informe o tipo do produto"),   
    unidade_medida: yup.string()
        .required("Por favor, informe por extenso a unidade de medida. Ex: UNIDADE (UN)"), 
    peso_bruto: yup.number()
        .required('Por favor, informar o peso bruto do produto unitário'),
    peso_liquido: yup.number()
        .required('Por favor, informar o peso liquído do produto unitário'),  
    rastro: yup.string()
        .oneOf(Object.values(Trail))
        .required("Por favor, informe o rastro do unitário"),    
    codigo_barras:yup.number()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        ) 
        .nullable()
        .notRequired(),  
    nome_cientifico: yup.string()
        .required("Insira o nome científico do produto"),  
    sabor: yup.string()
        .required("Insira o sabor do produto"), 
    profundidade_fardo:yup.number()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        )   
        .required("Por favor, informe a medida de profundidade"),
    altura_fardo:yup.number()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        )   
        .required("Por favor, informe a altura do fardo"),
    largura_fardo:yup.number()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        )   
        .required("Por favor, informe a largura do fardo"),
    marca: yup.string()
        .required("Por favor, informe a marca do produto"),
    tamanho_embalagem: yup.string()
        .required("Por favor, informe a embalagem do produto"),
    tipo_embalagem: yup.string()
        .required("Por favor, informe o tipo de embalagem"),
    codigo_barras_fardo:yup.number()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        ) 
        .nullable()
        .notRequired(), 
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
    profundidade_unitario:yup.number()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        )   
        .required("Por favor, informe a medida de profundidade da unidade"),
    altura_unitario:yup.number()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        )   
        .required("Por favor, informe a altura do unidade"),
    largura_unitario:yup.number()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        )   
        .required("Por favor, informe a largura da unidade"),
    ncm: yup.string()
        .transform((value) => value.replace(/[\s.]/g, ""))
        .matches(/^\d{8}$/, "Informe um NCM válido de 8 dígitos. Ex: 8430.10.80")
        .required("Por favor, informe o NCM"),
    tipo_prazo: yup.string()
        .oneOf(Object.values(ValidityPeriod))
        .required("Por favor, selecione o tipo de prazo"),
    prazo_validade: yup.number()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        )
        .required("Por favor, informe a validade de acordo com o tipo de prazo"), 
    cest:yup.string()
        .transform((value) => value.replace(/[\s.]/g, null))
        .matches(/^\d{7}$/, "Informe um CEST válido de 7 dígitos. Ex: 84.301.80")
        .notRequired(),
    grupo_tributario: yup.number()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        )   
        .nullable()
        .notRequired(),
    armazem_padrao: yup.string()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        )   
        .nullable()
        .notRequired(),
    lote_economico:  yup.string()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        )   
        .nullable()
        .notRequired(),
    lote_minimo: yup.string()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        )   
        .nullable()
        .notRequired(),
});
