import { ClientTpj, ClientType } from '../interface/client-enum';
import { IClientRegisterForm } from '../interface/client';
import { OptionYesNo, PfOrPj } from '@/interfaces';
import * as yup from 'yup';

export const clientRegisterFormSchema:yup.ObjectSchema<IClientRegisterForm> = yup.object<IClientRegisterForm>().shape({
    criado_em: yup.string()
        .required("Data é obrigatório"),
    email: yup.string()
        .email("Insira um e-mail valido")
        .required("E-mail é obrigatório"),
    whatsapp: yup.string()
        .transform((value) => value.replace(/[\s()-]/g, ""))
        .min(14, 'Por favor insira um número válido, Ex: +55 (11) 9 9999-0000')
        .matches(/^\+?\d{12,13}$/, "Número inválido")
        .required("Por favor informe o número do whatsapp com o DDD"),
    nome_solicitante: yup.string()
        .required("Por favor informe seu nome"),
    tipo: yup.string()
        .oneOf(Object.values(ClientType))
        .required("Por favor selecione o tipo de cliente"),
    fisica_juridica: yup.string()
        .oneOf(Object.values(PfOrPj))
        .required("Selecione o tipo de cadastro"),
    cnpj_cpf: yup.string()
        .transform((value) => value.replace(/\D/g, ""))
        .required("Por favor informe o CNPJ/CPF"),
    razao_social: yup.string()
        .required("Por favor informe a razão social"),
    nome_fantasia: yup.string()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        )   
        .nullable()
        .notRequired(),
    cnae: yup.string()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        )   
        .nullable()
        .notRequired(),
    telefone_1: yup.string()
        .transform((value) => value ? value.replace(/[\s()-]/g, "") : "")
        .matches(/^\+?\d{10,13}$/, "Por favor insira um número válido, Ex: +55 (11) 9 9999-0000")
        .required("Por favor informe um número de telefone/whatsapp principal"),
    telefone_2: yup.string()
        .notRequired()
        .nullable()
        .transform((value) => value ? value.replace(/[\s()-]/g, "") : "")
        .test("valid-telefone_2", "Por favor insira um número válido, Ex: +55 (11) 9 9999-0000", value => {
        if (!value) return true;
        return /^\+?\d{10,13}$/.test(value);
        }),
    telefone_3: yup.string()
        .notRequired()
        .nullable()
        .transform((value) => value ? value.replace(/[\s()-]/g, "") : "")
        .test("valid-telefone_3", "Por favor insira um telefone fixo válido, Ex: (11) 3456-7890", value => {
        if (!value) return true;
        return /^\+?\d{10,13}$/.test(value);
        }),
    telefone_4: yup.string()
        .notRequired()
        .nullable()
        .transform((value) => value ? value.replace(/[\s()-]/g, "") : "")
        .test("valid-telefone_4", "Por favor insira um telefone fixo válido, Ex: (11) 3456-7890", value => {
        if (!value) return true;
        return /^\+?\d{10,13}$/.test(value);
        }),
    inscricao_estadual: yup.string()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        )   
        .nullable()
        .notRequired(),
    inscricao_municipal: yup.string()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        )   
        .nullable()
        .notRequired(),    
    email_cliente: yup.string()
        .email("Insira um e-mail valido")
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        )   
        .nullable()
        .notRequired(),
    tpj: yup.string()
        .oneOf(Object.values(ClientTpj))
        .required("Por favor selecione o tipo de pessoa jurídica"),
    contribuinte: yup.string()
        .oneOf(Object.values(OptionYesNo))
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        )   
        .nullable()
        .notRequired(),
    optante_simples: yup.string()
        .oneOf(Object.values(OptionYesNo))
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        )   
        .nullable()
        .notRequired(),
    destaca_ie: yup.mixed<OptionYesNo>()
        .when("fisica_juridica", ([fisica_juridica], schema) =>{
            if(fisica_juridica === PfOrPj.JURIDICO){
                return schema
                    .oneOf(Object.values(OptionYesNo))
                    .required("Por favor selecione a opção");
            }else{
                return schema.notRequired().nullable()
            }
        }),
    endereco: yup.string()
        .required("Por favor informe o endereço"),
    numero: yup.string()
        .required("Informe o número"),
    bairro: yup.string()
        .required("Por favor informe o bairro"),
    complemento: yup.string()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        )   
        .nullable()
        .notRequired(),
    estado: yup.string()
        .required("Por favor, informe o estado"),
    municipio: yup.string()
        .required("Por favor, informe o município"),
    cep: yup.string()
        .required("Por favor, informe o CEP"),
    mesmo_endereco_cobranca: yup.string()
        .oneOf(["sim", "não"])
        .required("Por favor selecione a opção"),
    endereco_cobranca: yup.string()
        .when('mesmo_endereco_cobranca', ([value]) => {
        return value === "não" 
            ? yup.string().required("Por favor informe o endereço de cobrança")
            : yup.string().nullable().notRequired()
    }),
    numero_cobranca: yup.string()
        .when('mesmo_endereco_cobranca', ([value]) => {
        return value === "não" 
            ? yup.string().required("Informe o número")
            : yup.string().nullable().notRequired()
    }),
    bairro_cobranca: yup.string().when('mesmo_endereco_cobranca', ([value]) => {
        return value === "não" 
            ? yup.string().required("Por favor informe o bairro de cobrança")
            : yup.string().nullable().notRequired()
    }),
    complemento_cobranca: yup.string()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        )   
        .nullable()
        .notRequired(),
    estado_cobranca: yup.string().when('mesmo_endereco_cobranca', ([value]) => {
        return value === "não" 
        ? yup.string().required("Por favor informe o estado de cobrança")
        : yup.string().nullable().notRequired()
    }),
    municipio_cobranca: yup.string().when('mesmo_endereco_cobranca', ([value]) => {
        return value === "não" 
        ? yup.string().required("Por favor informe o município de cobrança")
        : yup.string().nullable().notRequired()
    }),
    cep_cobranca: yup.string().when('mesmo_endereco_cobranca', ([value] ) => {
        return value === "não" 
        ? yup.string().required("Por favor informe o CEP")
        : yup.string().nullable().notRequired()
    }),    
});






