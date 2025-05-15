
import { SupplierTpj, SupplierType } from '../interface/supplier-enum';
import { ISupplierRegisterForm } from '../interface/supplier';
import { OptionYesNo, PfOrPj } from '@/interfaces';
import * as yup from 'yup';


export const supplierRegisterSchema:yup.ObjectSchema<ISupplierRegisterForm> = yup.object<ISupplierRegisterForm>().shape({
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
    fisico_juridico: yup.string()
        .oneOf(Object.values(PfOrPj))
        .required("Por favor selecione o tipo de cadastro"),
    cnpj_cpf: yup.string()
        .transform((value) => value.replace(/\D/g, ""))
        .required("Por favor informe o CNPJ/CPF"),
    tipo: yup.string()
        .oneOf(Object.values(SupplierType))
        .required("Por favor selecione o tipo de fornecedor"),
    produtor_rural: yup.string()
        .oneOf(Object.values(OptionYesNo))
        .required("Informe se é produtor rural o fornecedor"),
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
    tpj: yup.string()
        .oneOf(Object.values(SupplierTpj))
        .required("Por favor selecione o tipo de pessoa jurídica"),
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
    contribuinte: yup.string()
        .oneOf(Object.values(OptionYesNo))
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        )   
        .nullable()
        .notRequired(),
    email_fornecedor: yup.string()
        .email("Insira um e-mail valido")
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
    telefone_1: yup.string()
        .transform((value) => value.replace(/[\s()-]/g, ""))
        .min(14, 'Por favor insira um número válido, Ex: +55 (11) 9 9999-0000')
        .matches(/^\+?\d{12,13}$/, "Número inválido")
        .required("Por favor informe um número de telefone/whatsapp principal"),
    telefone_2: yup.string()
        .notRequired()
        .nullable()
        .transform((value) => value.replace(/[\s()-]/g, null))
        .test("valid-telefone_2", "Por favor insira um número válido, Ex: +55 (11) 9 9999-0000", (value) => {
            if (!value) return true; // Se for null ou vazio, passa | If it's null or empty, pass
            return /^\+?\d{12,13}$/.test(value); // Valida apenas se houver um valor | Validate only if there is a value
        }),
    telefone_3: yup.string()
        .notRequired()
        .nullable()
        .transform((value) => value.replace(/[\s()-]/g, null))
        .test("valid-telefone_3", "Por favor insira um telefone fixo válido, Ex: (11) 3456-7890", (value) => {
            if (!value) return true; // Se for null ou vazio, passa | If it's null or empty, pass
            return /^\d{10}$/.test(value); // Valida apenas se houver um valor | Validate only if there is a value
        }),
    telefone_4: yup.string()
        .notRequired()
        .nullable()
        .transform((value) => value.replace(/[\s()-]/g, null))
        .test("valid-telefone_4", "Por favor insira um telefone fixo válido, Ex: (11) 3456-7890", (value) => {
            if (!value) return true; // Se for null ou vazio, passa | If it's null or empty, pass
            return /^\d{10}$/.test(value); // Valida apenas se houver um valor | Validate only if there is a value
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
        .required("Por favor selecione o estado"),
    municipio: yup.string()
        .required("Por favor selecione o município"),
    cep: yup.string()
        .required("Por favor informe o CEP"),
});






