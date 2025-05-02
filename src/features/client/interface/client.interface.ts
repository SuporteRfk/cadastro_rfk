import { OptionYesNo } from "@/interfaces";
import { ClientPFOrPJ, ClientType, ClientTpj } from "./client-enum";

export interface IClient {
    id: number;
    criado_em: string;
    whatsapp: string;
    nome_solicitante: string;
    email: string;
    tipo: ClientType;
    fisica_juridica: ClientPFOrPJ;
    cnpj_cpf: string;
    nome_razao_social: string;
    nome_fantasia?:string;
    cnae?: string;
    endereco: string;
    bairro: string;
    complemento?:string;
    estado: string;
    municipio: string;
    cep: string;
    telefone_1: string;
    telefone_2?: string;
    telefone_3?: string;
    telefone_4?: string;
    inscricao_estadual?: string;
    inscricao_municipal?: string;
    email_cliente?:string;
    endereco_cobranca?: string;
    bairro_cobranca?: string;
    complemento_cobranca?:string;
    estado_cobranca?: string;
    municipio_cobranca?: string;
    cep_cobranca?: string;
    tpj: ClientTpj;
    contribuinte?: OptionYesNo;
    optante_simples?: OptionYesNo;
    destaca_ie?: OptionYesNo;
};

export interface IClienteRegisterForm extends Omit<IClient, "id">{
    mesmo_endereco_cobranca?: "sim" | "nao";
};

export interface IClienteRegisterSupabase extends Omit<IClient, "id">{}