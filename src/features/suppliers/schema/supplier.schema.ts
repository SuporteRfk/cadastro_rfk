
import { SupplierTpj, SupplierType } from '../interface/supplier-enum';
import { ISupplierRegisterForm } from '../interface/supplier';
import { OptionYesNo, PfOrPj } from '@/interfaces';
import * as yup from 'yup';


export const supplierRegisterSchema:yup.ObjectSchema<ISupplierRegisterForm> = yup.object<ISupplierRegisterForm>().shape({
    criado_em: yup.string()
        .required("Data é obrigatório"),
    email: yup.string()
        .email("Insira um e-mail valido")
        .transform((value) => value?.toLowerCase())
        .required("E-mail é obrigatório"), 
    whatsapp: yup.string()
        .transform((value) => value.replace(/[\s()-]/g, ""))
        .min(14, 'Por favor insira um número válido, Ex: +55 (11) 9 9999-0000')
        .matches(/^\+?\d{12,13}$/, "Número inválido")
        .required("Por favor informe o número do whatsapp com o DDD"),
    nome_solicitante: yup.string()
        .transform((value) => value?.toLowerCase())
        .required("Por favor informe seu nome"),
    fisica_juridica: yup.string()
        .oneOf(Object.values(PfOrPj))
        .transform((value) => value?.toUpperCase())
        .required("Por favor selecione o tipo de cadastro"),
    cnpj_cpf: yup.string()
        .transform((value) => value.replace(/\D/g, ""))
        .required("Por favor informe o CNPJ/CPF"),
    tipo: yup.string()
        .oneOf(Object.values(SupplierType))
        .transform((value) => value?.toUpperCase())
        .required("Por favor selecione o tipo de fornecedor"),
    produtor_rural: yup.string()
        .oneOf(Object.values(OptionYesNo))
        .transform((value) => value?.toUpperCase())
        .required("Informe se é produtor rural o fornecedor"),
    razao_social: yup.string()
        .transform((value) => value?.toUpperCase())
        .required("Por favor informe a razão social"),
    nome_fantasia: yup.string()
        .transform((value) =>{
            if(!value) return null;
            return value.toUpperCase();
        })   
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
        .transform((value) => value?.toUpperCase())
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
        .transform((value) =>{
            if(!value) return null;
            return value.toUpperCase();
        })     
        .nullable()
        .notRequired(),
    optante_simples: yup.string()
        .oneOf(Object.values(OptionYesNo))
        .transform((value) =>{
            if(!value) return null;
            return value.toUpperCase();
        })    
        .nullable()
        .notRequired(),
    telefone_1: yup.string()
        .transform((value) => value.replace(/[\s()-]/g, ""))
        .matches(/^\+?\d{10,13}$/, "Por favor insira um número válido, Ex: +55 (11) 9 9999-0000")
        .required("Por favor informe um número de telefone/whatsapp principal"),
    telefone_2: yup.string()
        .notRequired()
        .nullable()
        .transform((value) => value ? value.replace(/[\s()-]/g, "") : "")
        .test("valid-telefone_2", "Por favor insira um número válido, Ex: +55 (11) 9 9999-0000", (value) => {
            if (!value) return true; // Se for null ou vazio, passa 
            return /^\+?\d{10,13}$/.test(value);// Valida apenas se houver um valor 
        }),
    telefone_3: yup.string()
        .notRequired()
        .nullable()
        .transform((value) => value ? value.replace(/[\s()-]/g, "") : "")
        .test("valid-telefone_3", "Por favor insira um telefone fixo válido, Ex: (11) 3456-7890", (value) => {
            if (!value) return true; // Se for null ou vazio, passa 
            return /^\+?\d{10,13}$/.test(value);// Valida apenas se houver um valor 
        }),
    telefone_4: yup.string()
        .notRequired()
        .nullable()
        .transform((value) => value ? value.replace(/[\s()-]/g, "") : "")
        .test("valid-telefone_4", "Por favor insira um telefone fixo válido, Ex: (11) 3456-7890", (value) => {
            if (!value) return true; // Se for null ou vazio, passa
            return /^\+?\d{10,13}$/.test(value);// Valida apenas se houver um valor 
        }),
    endereco: yup.string()
        .transform((value) => value?.toUpperCase())
        .required("Por favor informe o endereço"),
    numero: yup.string()
        .required("Informe o número"),
    bairro: yup.string()
        .transform((value) => value?.toUpperCase())
        .required("Por favor informe o bairro"),
    complemento: yup.string()
        .nullable()
        .transform((value, originalValue) => {
            if (originalValue === "" || value == null) return null;
            return typeof value === "string" ? value.toUpperCase() : value;
        })
        .notRequired(),
    estado: yup.string()
        .transform((value) => value?.toUpperCase())
        .required("Por favor selecione o estado"),
    municipio: yup.string()
        .transform((value) => value?.toUpperCase())
        .required("Por favor selecione o município"),
    cep: yup.string()
        .required("Por favor informe o CEP"),
    id_usr_keycloak: yup.string()
        .required()    
});






