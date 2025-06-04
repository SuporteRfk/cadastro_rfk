# 📁 Documentação do Utilitário (`applyMasks`)

### 📁 Localização

`/utils/apply-masks.utils.ts`

---

## 📊 Visão Geral

O `applyMasks` é uma função utilitária que aplica **máscaras de formatação** a campos específicos de um objeto, como CPF, CNPJ, telefones e NCM. Ele é baseado na biblioteca `remask` e permite personalização das máscaras por campo.

---

## 📦 Parâmetros

```ts
applyMasks<T extends object>(
  data: T,
  masksForApply?: MaskMap
): T
```

| Parâmetro        | Tipo                         | Descrição                                                                 |
|------------------|------------------------------|---------------------------------------------------------------------------|
| `data`           | `object`                     | Objeto original contendo os dados que devem ser mascarados.              |
| `masksForApply`  | `MaskMap` (opcional)         | Objeto com campos e suas respectivas máscaras. Se omitido, usa o padrão. |

---

## 🧱 Estrutura Interna

- Máscaras padrão (`defaultMapMasks`) incluem:
  - `whatsapp`: `["+99(99)9 9999-9999"]`
  - `cnpj_cpf`: `["999.999.999-99", "99.999.999/9999-99"]`
  - `telefone_1` a `telefone_4`: `["(99) 9999-9999", "+99(99)9 9999-9999"]`
  - `ncm`: `["9999.99.99"]`
  - `cest`: `["99.999.99"]`

- A função:
  1. Clona o objeto `data`
  2. Itera sobre os campos definidos no `maskMap`
  3. Se o valor for uma `string` não vazia, aplica a máscara correspondente
  4. Retorna novo objeto com os campos mascarados

---

## 💻 Exemplo de Uso

```ts
const rawData = {
  nome: "João",
  whatsapp: "41999999999",
  cnpj_cpf: "12345678901"
};

const masks = {
  whatsapp: ["+99(99)9 9999-9999"],
  cnpj_cpf: ["999.999.999-99"]
};

const formatted = applyMasks(rawData, masks);

/* Resultado:
{
  nome: "João",
  whatsapp: "+55(41)9 9999-9999",
  cnpj_cpf: "123.456.789-01"
}
*/
```

---

## ⚖️ Regras de Uso

- A máscara só será aplicada se o campo for `string` e tiver valor.
- Os campos não definidos no `maskMap` permanecerão inalterados.
- Use com cuidado em contextos de `formatação visual`, não para persistência.

---

## 🔗 Dependências

- [`remask`](https://www.npmjs.com/package/remask): biblioteca para aplicação de máscaras com múltiplos formatos.

---

## 🧠 Por que usar esse utilitário?

- 🔁 Reutiliza lógica de formatação em múltiplos pontos da aplicação
- 📦 Centraliza máscaras usadas por campos sensíveis
- 🚀 Melhora a legibilidade e usabilidade de dados de entrada e saída
