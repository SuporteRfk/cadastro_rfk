
export interface IUnitMeasure {
    id: number;
    criado_em: string;
    email: string;
    whatsapp: string;
    nome_solicitante: string;
    unidade_medida: string;
    descricao_unidade: string;
    id_usr_keycloak: string;    
};

export interface IUnitMeasureRegister extends Omit <IUnitMeasure,'id'>{};