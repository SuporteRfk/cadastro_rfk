export interface IViewRequest {
    id: number;
    criado_em: string;
    atualizado_em: string | null;
    tipo: TypeRequest;
    operacao: OperationRequest;
    tabela_origem: string;
    status: StatusRequest;
    observacao: string;
    motivo_recusa: { [campo: string]: string } | null;
    solicitantes_alteracao: {
        nome: string;
        solicitado_em: string;
        solicitacao_status: StatusRequest;
    }[] | null;
    alteracoes: {
        [campo: string]: {
            de: any;
            para: any;
        }
    } | null;
    nome_solicitante: string;
    email: string;
    id_usr_keycloak: string;
    whatsapp: string;
    id_fk: number;
};


// interface para fazer requisições na view de solicitações/ usado para filtro
export interface IQueryRequest {
    status?: StatusRequest | null;
    tipo?: string | null;
    data?: string | null;
    operacao? : OperationRequest | null;
    nome_solicitante?:string | null;
    email?: string | null;
    indexLimit?: number | null;
    offset?: number | null;
    idKeycloack?: string | null;
}


export enum StatusRequest {
    PENDENTE='Pendente',
    REVISAO='Em Revisão',
    NEGADO='Negado',
    APROVADO='Aprovado',
}

export enum OperationRequest {
    NOVO="novo cadastro",
    ALTERACAO="alteração"
}

export enum TypeRequest {
    CLIENT="Clientes",
    PAYMENT_CONDITION="Condição Pagamento",
    SUPPLIER="Fornecedores",
    INSUMOS="Insumos",
    PA_COPACKER="PA Copacker",
    PA_BURDEN="PA Fardo",
    PA_UNITARY="PA Unitário",
    PA_THIRD="PA Terceiro",
    INDIRECT_PRODUCTS="Produtos Indiretos",
    UNIT_MEASURE="Unidade de Medida",
    CHANGE_REQUEST="Alteração",
    SERVICE="Serviço"
};


export interface IUpdateRequest {
    solicitacao_id: number;
    status: StatusRequest,
    novo_solicitante?:{
        nome: string;
        data: string;
        departamento: string;
        operacao: string;
    },
    observacao?: string;
    motivo_recusa?: {
        [key: string]: string;
    }
};