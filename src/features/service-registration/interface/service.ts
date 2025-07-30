import { FamilyCodeService, GroupCodeService, TypeCodeService } from "./service-enum";


export interface IServiceRegistration {
    id: number;
    criado_em: string;
    nome_solicitante:string;
    email: string;
    id_usr_keycloak: string;
    whatsapp: string;
    codigo_familia: FamilyCodeService;
    codigo_grupo: GroupCodeService;
    tipo: TypeCodeService;
    descricao: string;
    codigo_servico:string;
};


export interface IServiceRegister extends Omit <IServiceRegistration,'id'>{};