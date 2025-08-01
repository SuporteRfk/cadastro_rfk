import { ITypeRequestChange } from "./request-change-enum";

export interface IRequestChange {
    id: number;
    criado_em: string;
    nome_solicitante:string;
    email: string;
    id_usr_keycloak: string;
    tipo: ITypeRequestChange;
    whatsapp: string;
    nome_cadastro: string;
    documento_ou_codigo: string;
    observacao?:string | null;
    aba_alteracao: string;
    alteracao: string;
};


export interface IRequestChangeRegister extends Omit <IRequestChange,'id'>{};