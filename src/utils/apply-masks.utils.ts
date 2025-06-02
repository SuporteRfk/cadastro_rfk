import { mask as applyMask } from 'remask';

type MaskMap = {
  [fieldName: string]: string[]; // exemplo: { whatsapp: ['+99(99)9 9999-9999'] }
};

/**
 * Aplica máscaras em campos específicos de um objeto.
 * 
 * @param data Objeto original com os dados
 * @param maskMap Objeto com os campos e suas máscaras
 * @returns Novo objeto com os campos mascarados
 */

const defaultMapMasks = {
    whatsapp: ["+99(99)9 9999-9999"],
    cnpj_cpf: ["999.999.999-99","99.999.999/9999-99"],
    telefone_1: ["(99) 9999-9999", "+99(99)9 9999-9999"],
    telefone_2: ["(99) 9999-9999", "+99(99)9 9999-9999"], 
    telefone_3: ["(99) 9999-9999", "+99(99)9 9999-9999"],
    telefone_4: ["(99) 9999-9999", "+99(99)9 9999-9999"],
    ncm: ["9999.99.99"],
    cest: ["99.999.99"]   
}



export const applyMasks = <T extends object>(data: T, masksForApply?: MaskMap): T =>{
  if (!data) return data;

  const newData: { [key: string]: any } = { ...data };

  const maskMap = masksForApply || defaultMapMasks

  Object.entries(maskMap).forEach(([field, masks]) => {
    const value = (data as any)[field];
    if (typeof value === 'string' && value) {
      newData[field] = applyMask(value, masks);
    }
  });

  return newData as T;
}



/**
 * Aplica máscaras em campos específicos de um objeto.
 *
 * Importante:
 * - A função aplica máscara **somente** nos campos que estão explicitamente definidos no `maskMap`.
 * - Não itera sobre todos os campos do objeto `data`, apenas sobre os campos que precisam ser mascarados.
 * - Para cada campo listado no `maskMap`, a função acessa o valor correspondente no objeto `data`.
 * - Se o valor for uma string não vazia, aplica a máscara usando a função `applyMask`.
 * - Os campos que não estiverem no `maskMap` permanecem inalterados no objeto retornado.
 *
 * Exemplo:
 *   const data = { nome: 'João', whatsapp: '41999999999', cpf: '12345678901' };
 *   const masks = {
 *     whatsapp: ['+99(99)9 9999-9999'],
 *     cpf: ['999.999.999-99']
 *   };
 *   // Só os campos 'whatsapp' e 'cpf' receberão máscara.
 */
