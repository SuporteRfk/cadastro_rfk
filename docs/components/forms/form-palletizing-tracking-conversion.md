# Documentação do Componente `FormPalletizingTrackinkConversion`;

## 📁 Localização

`/components/forms/form-palletizing-tracking-conversion.components.ts`

## 📊 Visão Geral

O componente `FormPalletizingTrackingConversion` é utilizado para exibir e editar informações relacionadas à **paletização**, **lastro**, **rastro** e **conversão** (fator e tipo de conversor) de um produto. Ele oferece flexibilidade no que diz respeito à exibição de campos de conversão ou de embalagem, dependendo da necessidade do formulário. O componente é integrado ao `react-hook-form` para o gerenciamento do estado do formulário e validação.

## 🔎 Detalhes Técnicos

### Dependências:

- `react-hook-form:` Para integração com o gerenciamento de formulários.
- `InputSelect`, `Input`, `InputDecimal`: Para renderizar os campos de seleção (select).
- `FormSection`: Componente de formulário que serve como container


## ⚙️ Propriedades

### `mode` (opcional)
- **Tipo**: `FormStateType`
- **Descrição**: Define o modo de exibição dos campos. Dependendo do valor de `mode`, os campos podem estar desabilitados para edição.
  - **Valores possíveis**:
    - `"editing"`: Campos habilitados para edição.
    - `"viewing"`: Campos desabilitados, apenas visualização.
    - `"reviewing"`: Campos desabilitados, apenas revisão de dados.

### `methods` (obrigatório)
- **Tipo**: `UseFormReturn<T>`
- **Descrição**: O objeto retornado pelo `useForm` do `react-hook-form`. Contém os métodos e o estado do formulário, como `register`, `formState.errors`, etc., usados para associar os campos aos dados do formulário e realizar a validação.

### `showConverters` (opcional)
- **Tipo**: `boolean`
- **Descrição**: Controla a exibição dos campos de **conversão** (fator e tipo de conversor). Quando `showConverters` é **`true`**, os campos de conversão são exibidos. Caso contrário, os campos de **paletização** e **lastro** são exibidos.

## 🎨 Funcionamento

Este componente lida com três tipos de campos:

1. **Fator Conversor** (quando `showConverters` é `true`):
   - Campo de entrada para o **fator conversor** do produto. 
   - O campo é desabilitado para edição quando o `mode` é **"viewing"** ou **"reviewing"**.

2. **Tipo de Conversor** (quando `showConverters` é `true`):
   - Campo de seleção para o **tipo de conversor**.
   - A lista de opções é fornecida pela enumeração `ConverterType`.

3. **Paletização** (quando `showConverters` é `false`):
   - Campo de entrada para a **paletização** do produto. 
   - O campo é desabilitado para edição quando o `mode` é **"viewing"** ou **"reviewing"**.

4. **Lastro** (quando `showConverters` é `false`):
   - Campo de entrada para o **lastro** do produto. 
   - O campo é desabilitado para edição quando o `mode` é **"viewing"** ou **"reviewing"**.

5. **Rastro** (sempre visível):
   - Campo de seleção para o **tipo de rastro**.
   - A lista de opções é fornecida pela enumeração `Trail`.
   - Esse campo está sempre visível, independentemente do valor de `showConverters`.

### Desabilitação de Campos:
- Os campos de entrada podem ser desabilitados dependendo do valor da prop `mode`. Se `mode` for **"viewing"** ou **"reviewing"**, os campos se tornam **somente leitura** e não podem ser editados.

### Integração com `react-hook-form`:
- O componente usa `react-hook-form` para controlar o estado do formulário e a validação dos campos. Ele utiliza os métodos `register` e `formState.errors` para associar os campos aos dados do formulário e exibir as mensagens de erro de validação.

## 💡 Exemplo de Uso

```tsx
<FormPalletizingTrackingConversion
  mode="editing"
  methods={methods}
  showConverters={true} // Exibe os campos de conversão
/>
```

