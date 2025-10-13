export interface IIndirectProductSimilarity {
    id: string;
    criado_em: string;
    similaridade: boolean;
    id_produto_totvs: string;
    familia_produto: string;
    grupo_produto: string;
    tipo_produto: string;
    unidade_produto: string;
    id_cad_produto_indireto: number;
    descricao_produto: string;
    produto_ncm:string;
    ativo: boolean;
};


export const FamilyDescriptions:Record<string, string> = {
    "30": "30 - INSUMOS NAO PRODUTIVOS",
    "31": "31 - MATERIAL DE CONSUMO",
    "32": "32 - PRODUTOS MANUTENCAO INDUSTRIAL",
    "33": "33 - PRODUTOS MANUTENCAO DE FROTAS",
    "36": "36 - SUBPRODUTO",
    "37": "37 - IMOBILIZADO",
    "39": "39 - MERCADORIA DE REVENDA"
};

export const GroupDescriptions:Record<string, string> = {
    "0115" : "0115 - VASILHAMES (VIDRO)",
    "0116" : "0116 - CAIXAS",
    "0124" : "0124 - CANTONEIRA/ SEPARADOR DE CAMADAS/ BAGS",
    "0127" : "0127 - ETIQUETAS",
    "0200" : "0200 - INSUMOS NAO PRODUTIVOS",
    "0201" : "0201 - HIGIENIZACAO",
    "0202" : "0202 - MEIOS FILTRANTES",
    "0203" : "0203 - COLAS/ ADESIVOS",
    "0204" : "0204 - ETIQUETAS/ RIBBON",
    "0205" : "0205 - LENHA",
    "0206" : "0206 - DATADORA",
    "0300" : "0300 - MATERIAL DE CONSUMO",
    "0301" : "0301 - FARMACIA",
    "0302" : "0302 - MATERIAL DE LABORATORIO",
    "0303" : "0303 - INFORMATICA",
    "0304" : "0304 - MERCADO",
    "0305" : "0305 - COMBUSTIVEL",
    "0306" : "0306 - MATERIAL DE ESCRITORIO",
    "0307" : "0307 - MATERIAL DE CONSTRUCAO",
    "0308" : "0308 - UNIFORMES E EPIS",
    "0309" : "0309 - BENEFICIOS PRODUTOS",
    "0310" : "0310 - PECAS FROTAS",
    "0311" : "0311 - PECAS INDUSTRIA/ LABORATORIO", 
    "0312" : "0312 - ATIVOS GIRO",
    "0313" : "0313 - BRINDES", 
    "0314" : "0314 - RESIDUOS RECICLAVEIS", 
    "0316" : "0316 - LANCHES E REFEICOES",
    "0317" : "0317 - ENERGIA",
    "0318" : "0318 - MATERIAL MARKETING",
    "0319" : "0319 - CLICHE",
    "0320" : "0320 - ELETROPORTATES",
    "0321" : "0321 - MANUTENCAO PREDIAL",
    "0500" : "0500 - ATIVOS IMOBILIZADOS",
    "0501" : "0501 - MAQUINAS E EQUIPAMENTOS",
    "0502" : "0502 - GELADEIRA",
    "0503" : "0503 - VEICULO",
    "0504" : "0504 - TERRENO",
    "0505" : "0505 - EDIFICACOES E BENFEITORIAS",
    "0506" : "0506 - MOVEIS E UTENSILIOS",
    "0507" : "0507 - COMPUTADORES E PERIFERICOS",
    "0508" : "0508 - FERRAMENTAS E ACESSORIOS",
    "0600" : "0600 - SUBPRODUTOS"
};

export const TypeDescription:Record<string,string> = {
    "MC": "07-MC MATERIAL DE CONSUMO",
    "AI": "08-AI ATIVO IMOBILIZADO",
    "SP": "05-SP SUBPRODUTO",
    "ME": "00-ME MERCADORIA",
    "PI": "06-PI PRODUTO EM PROCESSO"
};








    
    
    



