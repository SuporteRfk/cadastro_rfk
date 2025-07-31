
import { FamilyCodeService, GroupCodeService, TypeCodeService } from '../interface/service-enum';
import { IServiceRegister } from '../interface/service';
import * as yup from 'yup';


export const serviceRegistrationSchema:yup.ObjectSchema<IServiceRegister> = yup.object().shape({
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
    id_usr_keycloak: yup.string()
        .required(),
    codigo_familia: yup.string()
        .oneOf(Object.values(FamilyCodeService))
        .required("Informar a família, caso não saiba solicitar ao setor fiscal"),
    codigo_grupo: yup.string()
        .oneOf(Object.values(GroupCodeService))
        .required("Por favor, informe o grupo ao qual pertence o produto"),
    tipo: yup.string()
        .oneOf(Object.values(TypeCodeService))
        .required("Por favor, informe o tipo do produto"), 
    descricao: yup.string()
        .required("Informe a descrição do serviço"),
    codigo_servico: yup.string()
        .required("Informe o código do serviço")
});
    
