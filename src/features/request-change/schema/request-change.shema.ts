import { IRequestChangeRegister } from '../interface/request-change';
import * as yup from 'yup';
import { ITypeRequestChange } from '../interface/request-change-enum';


export const requestChangeSchema:yup.ObjectSchema<IRequestChangeRegister> = yup.object().shape({
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
    tipo: yup.string()
        .oneOf(Object.values(ITypeRequestChange))
        .required("Escolha o tipo da alteração"),
    nome_cadastro: yup.string()
        .required("Informe o nome do cadastro"),
    documento_ou_codigo: yup.string()
        .required("Informe o docume"),
    observacao: yup.string().notRequired(),
    aba_alteracao: yup.string()
        .required("Informe a aba de alteração"),
    alteracao: yup.string()
        .required("Informe a alteração desejada"),
    id_usr_keycloak: yup.string().required()
});


