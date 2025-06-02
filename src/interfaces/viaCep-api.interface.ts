export interface IResponseViaCep {
    cep: string;
    logradouro: string;
    complemento: string;
    unidade: string;
    bairro: string;
    localidade: string;
    uf: string;
    estado: string;
    regiao: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
}
      
export interface IAddress {
    cep: string;
    endereco: string;
    complemento: string;
    bairro: string;
    municipio: string;
    estado: string;
    numero: string;
}
