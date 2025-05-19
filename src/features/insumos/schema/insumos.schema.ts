import {FamilyCodeInsumos, GroupCodeInsumos , TypeCodeoInsumos } from "../interface/insumos-enum";
import { IInsumoRegister} from "../interface/insumos";
import { ConverterType, Trail } from "@/interfaces";
import * as yup from "yup";


export const insumosRegisterSchema: yup.ObjectSchema<IInsumoRegister> = yup.object<IInsumoRegister>().shape({
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
        .oneOf(Object.values(FamilyCodeInsumos))
        .required("Informar a família, caso não saiba solicitar ao setor fiscal"),
    codigo_grupo: yup.string()
        .oneOf(Object.values(GroupCodeInsumos))
        .required("Por favor, informe o grupo ao qual pertence o produto"),
    tipo: yup.string()
        .oneOf(Object.values(TypeCodeoInsumos))
        .required("Por favor, informe o tipo do produto"),   
    unidade_medida: yup.string().required("Por favor, informe por extenso a unidade de medida. Ex: UNIDADE (UN)"), 
    segunda_unidade_medida: yup.string()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        )   
        .nullable()
        .notRequired(),
    ncm: yup.string()
        .transform((value) => value.replace(/[\s.]/g, ""))
        .matches(/^\d{8}$/, "Informe um NCM válido de 8 dígitos. Ex: 8430.10.80")
        .required("Por favor, informe o NCM"),
    fator_conversor: yup.number()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        )   
        .required("Por favor inserir o fator conversor"),
    tipo_conversor: yup.string().oneOf(Object.values(ConverterType)).required("Por favor, informe o tipo de conversor"),
    peso_bruto: yup.number().required('Por favor, informar o peso bruto do insumo'),
    peso_liquido: yup.number().required('Por favor, informar o peso liquído do insumo'),
    rastro: yup.string().oneOf(Object.values(Trail)).required("Por favor, informe o rastro do insumo"),   
    subgrupo: yup.string() 
        .when("codigo_grupo", ([codigo])=>{
            return codigo === GroupCodeInsumos.ROTULOS || codigo === GroupCodeInsumos.PREFORMAS 
                ? yup
                    .string()
                    .required("No caso de rótulos (colocar se é adesivo, BOPP,etc) e prefomas(colocar a gramatura)")
                : yup
                    .string()
                    .transform((value, originalValue) => (originalValue === "" ? null : value))
                    .nullable()
                    .notRequired()
        
        }),
    alternativo_produto: yup.string()
        .transform((value, originalValue) => (originalValue === "" ? null : value))
        .nullable()
        .notRequired(),
    empresa:yup.string()
        .when("alternativo_produto", ([value])=> {
            if(!value) {
                return yup
                    .string()
                    .transform((value, originalValue) => (originalValue === "" ? null : value))
                    .nullable()
                    .notRequired()
            }else{
                return yup
                    .string()
                    .required("Quando tiver um produto alternativo, informar quais empresas ele deverá ser cadastrado")
            }
    }),      
    fator_conversor_alternativo:yup.number()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        ) 
        .notRequired(),
    tipo_conversor_alternativo:yup.string().oneOf(Object.values(ConverterType)).notRequired(),
    nome_cientifico: yup.string()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        )   
        .nullable()
        .notRequired()
});
