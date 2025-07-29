
import { FamilyCodeInsumos, GroupCodeInsumos, TypeCodeoInsumos } from "./insumos-enum";
import {Trail, ConverterType} from "@/interfaces";

export interface IInsumo {
    id: number;
    criado_em: string;
    email: string;
    nome_solicitante: string;
    whatsapp: string;
    descricao_curta:string;
    codigo_saib?: number | null;
    codigo_familia: FamilyCodeInsumos,
    codigo_grupo: GroupCodeInsumos,
    tipo: TypeCodeoInsumos,
    unidade_medida: string;
    segunda_unidade_medida?:string | null;
    ncm: string;
    fator_conversor: number;
    tipo_conversor: ConverterType;
    peso_bruto: number;
    peso_liquido: number;
    rastro: Trail;
    subgrupo?:string; 
    alternativo_produto?:string | null;
    empresa?: string; 
    fator_conversor_alternativo?: number | null;
    tipo_conversor_alternativo?: ConverterType | null;
    nome_cientifico?: string | null;
    id_usr_keycloak: string;    
}

export interface IInsumoRegister extends Omit<IInsumo, 'id'>{}