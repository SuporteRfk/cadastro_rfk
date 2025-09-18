
import { FamilyCodePAUnitary, GroupCodePAUnitary, TypeCodeoPAUnitary} from "./pa-unitary-enum";
import {CategoryPackaging, Trail, ValidityPeriod} from "@/interfaces";

export interface IPAUnitary {
    id: number;
    criado_em: string;
    email: string;
    nome_solicitante: string;
    whatsapp: string;
    descricao_curta:string;
    codigo_saib?: number | null;
    codigo_familia: FamilyCodePAUnitary,
    codigo_grupo: GroupCodePAUnitary,
    tipo: TypeCodeoPAUnitary,
    unidade_medida: string;
    peso_bruto: number;
    peso_liquido: number;
    rastro: Trail;
    codigo_barras?: number | null;
    nome_cientifico: string;
    sabor: string;
    profundidade_unitario: number;
    altura_unitario: number;
    largura_unitario: number;
    marca: string;
    tamanho_embalagem: string;
    tipo_embalagem: string;
    codigo_barras_fardo?: number | null;
    lastro: number;
    paletizacao: number;
    profundidade_fardo: number;
    altura_fardo: number;
    largura_fardo: number;
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
    codigo_produto_pai?: string | null;
}   

export interface IPAUnitaryRegister extends Omit<IPAUnitary, "id"> {}