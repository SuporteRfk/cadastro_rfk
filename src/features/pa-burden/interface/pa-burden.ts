
import { GroupCodePABurden, FamilyCodePABurden, TypeCodeoPABurden } from "./pa-burden-enum";
import {CategoryPackaging, Trail, ValidityPeriod} from "@/interfaces";

export interface IPABurden {
    id: number;
    criado_em: string;
    email: string;
    nome_solicitante: string;
    whatsapp: string;
    descricao_curta:string;
    codigo_saib?: number | null;
    codigo_familia: FamilyCodePABurden,
    codigo_grupo: GroupCodePABurden,
    tipo: TypeCodeoPABurden,
    unidade_medida: string;
    peso_bruto: number;
    peso_liquido: number;
    rastro: Trail;
    codigo_barras?: number | null;
    nome_cientifico: string;
    sabor: string;
    profundidade_fardo: number;
    altura_fardo: number;
    largura_fardo: number;
    marca: string;
    tamanho_embalagem: string;
    tipo_embalagem: string;
    codigo_barras_unitario?: number | null;
    lastro: number;
    paletizacao: number;
    profundidade_unitario: number;
    altura_unitario: number;
    largura_unitario: number;
    ncm: string;
    tipo_prazo: ValidityPeriod;
    prazo_validade: number;
    cest?: string | null;
    grupo_tributario?: number | null;
    armazem_padrao?: string | null;
    lote_economico?: string | null;
    lote_minimo?: string | null;
    id_usr_keycloak: string;
    vasilhame?: string | null;
    garrafeira?: string | null;
    categoria_embalagem?: CategoryPackaging | null;    
}

export interface IPABurdenRegister extends Omit<IPABurden, "id"> {}