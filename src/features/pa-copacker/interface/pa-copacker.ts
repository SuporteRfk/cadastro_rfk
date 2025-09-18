import { TypeCodeoPACopacker , GroupCodePACopacker, FamilyCodePACopacker} from "./pa-copacker-enum";
import { CategoryPackaging, Trail } from "@/interfaces";


export interface IPACopacker {
    id: number;
    criado_em: string;
    email: string;
    nome_solicitante: string;
    whatsapp: string;
    descricao_curta:string;
    codigo_saib?: number | null;
    codigo_familia: FamilyCodePACopacker,
    codigo_grupo: GroupCodePACopacker,
    tipo: TypeCodeoPACopacker,
    unidade_medida: string;
    peso_bruto: number;
    peso_liquido: number;
    rastro: Trail;
    codigo_barras: number;
    nome_cientifico: string;
    sabor: string;
    profundidade_fardo?: number | null;
    altura_fardo?: number | null;
    largura_fardo?: number | null;
    marca: string;
    tamanho_embalagem: string;
    tipo_embalagem: string;
    lastro?: number | null;
    paletizacao?: number | null;
    largura_outro?: number | null;
    altura_outro?: number | null;
    profundidade_outro?: number | null;
    ncm: string;
    cest?: string | null;
    grupo_tributario?: number | null;
    armazem_padrao?: string | null;
    id_usr_keycloak: string;
    vasilhame?: string | null;
    garrafeira?: string | null;
    categoria_embalagem?: CategoryPackaging | null;
};

export interface IPACopackerRegister extends Omit<IPACopacker, 'id'>{};