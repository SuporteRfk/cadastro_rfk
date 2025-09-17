import { OptionYesNo, PfOrPj } from "@/interfaces";
import { ClientType, ClientTpj } from "./client-enum";

export interface IClient {
    id: number;
    criado_em: string;
    whatsapp: string;
    nome_solicitante: string;
    email: string;
    tipo: ClientType;
    fisica_juridica: PfOrPj;
    cnpj_cpf: string;
    razao_social: string;
    nome_fantasia?:string | null;
    cnae?: string | null;
    endereco: string;
    numero: string;
    bairro: string;
    complemento?:string | null;
    estado: string;
    municipio: string;
    cep: string;
    telefone_1: string;
    telefone_2?: string | null; 
    telefone_3?: string | null;
    telefone_4?: string | null;
    inscricao_estadual?: string | null;
    inscricao_municipal?: string | null; 
    email_cliente?:string | null;
    endereco_cobranca?: string | null;
    numero_cobranca?:string | null;
    bairro_cobranca?: string | null;
    complemento_cobranca?:string | null;
    estado_cobranca?: string | null;
    municipio_cobranca?: string | null;
    cep_cobranca?: string | null;
    tpj: ClientTpj;
    contribuinte?: OptionYesNo | null;
    optante_simples?: OptionYesNo | null;
    destaca_ie?: OptionYesNo | null;
    id_usr_keycloak: string;
    nome_contato?: string | null;
    rota_atendimento?: number | null;
    ramo_atividade?: string | null;
    data_abertura_nascimento?: string | null;
};

export interface IClientRegisterForm extends Omit<IClient, "id">{
    mesmo_endereco_cobranca?: "sim" | "não";
};

export interface IClientRegisterSupabase extends Omit<IClient, "id">{}