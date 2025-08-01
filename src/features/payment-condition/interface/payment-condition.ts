export interface IPaymentCondition {
    id: number;
    criado_em: string;
    email: string;
    whatsapp: string;
    nome_solicitante: string;
    condicao_pagamento: string;
    id_usr_keycloak: string;    
}

export interface IPaymentConditionRegister extends Omit <IPaymentCondition,'id'>{};