export enum OptionYesNo {
    SIM = "1 - SIM",
    NAO = "2 - NAO"
};

export enum Sectors {
    ADM = "Administrativo",
    MANUTENCAO = "Manutenção",
    LOGISTICA = "Logística",
    QUALIDADE = "Qualidade",
    MKT = "Marketing",
    FABRICA = "Fábrica",
    TI = "T.I",
    COMPRAS = "Compras",
};

//Rastro 
export enum Trail{
    LOTE="L - LOTE",
    SUBLOTE="S - SUBLOTE",
    NAO_UTILIZA="N - NÃO UTILIZA"
};

export enum ValidityPeriod {
    HORAS="H - HORAS",
    DIAS="D - DIAS",
    SEMANAS="S - SEMANA",
    MES="M - MÊS",
    ANO="A - ANO"
};

export enum ConverterType{
    DIVISOR="D - DIVISOR",
    MULTIPLICADOR="M - MULTIPLICADOR"
};

export type FormStateType = 'editing' | 'viewing' | 'reviewing' | 'denied';

export enum  PfOrPj {
   FISICO = "F - FISICA",
   JURIDICO = "J - JURIDICA"
};


export enum CategoryPackaging {
    RETORNAVEL = "R - RETORNAVEL",
    DESCARTAVEL = "D - DESCARTAVEL"
};
  