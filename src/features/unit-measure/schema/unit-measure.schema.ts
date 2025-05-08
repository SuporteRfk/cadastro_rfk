import { IUnitMeasureRegister } from '../interface/unit-measure';
import * as yup from 'yup';


export const unitMeasureSchema:yup.ObjectSchema<IUnitMeasureRegister> = yup.object().shape({
    criado_em: yup.string().required("Data é obrigatório"),
    email: yup.string().email("Insira um e-mail valido").required("E-mail é obrigatório"),
    whatsapp: yup.string()
        .transform((value) => value.replace(/[\s()-]/g, ""))
        .min(14, 'Por favor insira um número válido, Ex: +55 (11) 9 9999-0000')
        .matches(/^\+?\d{12,13}$/, "Número inválido")
        .required("Por favor informe o número do whatsapp com o DDD"),
    nome_solicitante: yup.string().required("Por favor informe seu nome"),
    unidade_medida: yup.string().required("Por favor informe a nova unidade de medida que você quer cadastrar"),
    descricao_unidade: yup.string().max(300, 'No máximo 300 caracteres').required("Por favor descreva sobre a unidade de medida")
});


