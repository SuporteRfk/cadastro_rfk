import { FamilyCodePAThird, GroupCodePAThird, TypeCodePAThird} from "./pa-third-enum";
import { Trail, ConverterType, CategoryPackaging} from "@/interfaces";


export interface IPAThird {
    id: number;
    criado_em: string;
    email: string;
    nome_solicitante: string;
    whatsapp: string;
    descricao_curta:string;
    codigo_saib?: number | null;
    codigo_familia: FamilyCodePAThird,
    codigo_grupo: GroupCodePAThird,
    tipo: TypeCodePAThird,
    unidade_medida: string;
    segunda_unidade_medida: string;
    fator_conversor: number;
    tipo_conversor: ConverterType;
    armazem_padrao: string;
    peso_bruto: number;
    peso_liquido: number;
    rastro: Trail;
    lastro: number; 
    paletizacao: number; 
    codigo_barras: number;
    segundo_codigo_barras: number;
    nome_cientifico: string;
    sub_grupo: string;
    sabor: string;
    marca: string;
    tamanho_embalagem: string;
    tipo_embalagem: string;
    ncm: string;
    cest: string;
    grupo_tributario?: number | null;
    id_usr_keycloak: string;
    vasilhame?: string | null;
    garrafeira?: string | null;
    categoria_embalagem?: CategoryPackaging | null;
    codigo_produto_pai?: string | null;
};

export interface IPAThirdRegister extends Omit<IPAThird, 'id'>{};