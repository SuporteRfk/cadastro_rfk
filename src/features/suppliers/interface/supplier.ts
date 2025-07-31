import { SupplierType, SupplierTpj } from "./supplier-enum";
import { OptionYesNo, PfOrPj } from "@/interfaces";

export interface ISupplier {
    id: number;
    criado_em: string;
    email: string;
    nome_solicitante: string;
    whatsapp: string;
    tipo: SupplierType;
    cnpj_cpf: string;
    razao_social: string;
    nome_fantasia?: string | null;
    tpj?: SupplierTpj | null          ;
    cnae?: string | null;
    inscricao_estadual?: string | null;
    inscricao_municipal?: string | null;
    optante_simples?: OptionYesNo | null;
    contribuinte?: OptionYesNo | null;
    email_fornecedor?: string | null;
    telefone_1: string;
    telefone_2?: string | null;
    telefone_3?: string | null;
    telefone_4?: string | null;
    cep: string;
    endereco: string;
    bairro: string;
    numero: string;
    complemento?: string | null;
    municipio: string;
    estado: string;
    produtor_rural: OptionYesNo;
    id_usr_keycloak: string;
};

export interface ISupplierRegisterForm extends Omit<ISupplier, 'id'> {
    fisica_juridica: PfOrPj;
}

export interface ISupplierRegisterSupabase extends Omit<ISupplier, 'id'> {}

