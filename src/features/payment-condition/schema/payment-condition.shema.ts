
import { IPaymentConditionRegister } from '../interface/payment-condition';
import * as yup from 'yup';


export const PaymentConditionSchema:yup.ObjectSchema<IPaymentConditionRegister> = yup.object().shape({
    criado_em: yup.string().required("Data é obrigatório"),
    email: yup.string().email("Insira um e-mail valido")
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
    condicao_pagamento: yup.string().required("Por favor informe a nova condição de pagamento que você quer cadastrar"),
    id_usr_keycloak: yup.string().required()
});


