import {IndirectProducStep3} from "../interface/indirect-products";
import { Sectors } from "@/interfaces";
import * as yup from "yup";



export const indirectProductsStep3Schema: yup.ObjectSchema<IndirectProducStep3> = yup.object<IndirectProducStep3>().shape({
  criado_em: yup.string()
    .required("Data é obrigatório"),
  nome_solicitante: yup.string()
    .transform((value) => value?.toLowerCase())
    .required("Por favor, informe seu nome"),
  email: yup.string()
    .email("Insira um e-mail valido")
    .transform((value) => value?.toLowerCase())
    .required("E-mail é obrigatório"), 
  whatsapp: yup.string()
    .transform((value) => value.replace(/[\s()-]/g, ""))
    .min(14, 'Por favor, insira um número válido, Ex: +55 (11) 9 9999-0000')
    .matches(/^\+?\d{12,13}$/, "Número inválido")
    .required("Por favor, informe o seu número do whatsapp com o DDD"),
  setor: yup.string()
    .oneOf(Object.values(Sectors))
    .required("Por favor, informe seu setor"), 
  id_usr_keycloak: yup.string()
    .required()    
});


