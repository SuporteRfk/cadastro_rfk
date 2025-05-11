# Documentação do Componente `FormProductPackagingInfo`;

## 📁 Localização

`/components/forms/form-product-packaging-info.components.ts`

## 📊 Visão Geral

O componente `FormValidity` é utilizado para exibir e editar informações relacionadas à **validade do produto** e **lotes**. Ele contém campos para selecionar o **tipo de prazo**, **prazo de validade**, **lote econômico** e **lote mínimo**. O componente é integrado ao `react-hook-form` para o gerenciamento do estado do formulário e validação.

## 🔎 Detalhes Técnicos

### Dependências:
- `react-hook-form:` Para integração com o gerenciamento de formulários.
- `InputSelect`, `Input`:  Componentes de input utilizados para renderizar os campos de entrada.
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

## 🎨 Funcionamento

Este componente lida com quatro campos principais:

1. **Tipo de Prazo**:
   - Campo de **seleção** para escolher o tipo de prazo relacionado ao produto. A lista de opções é fornecida pelo **`ValidityPeriod`**.
   - O campo é desabilitado quando o **`mode`** é **"viewing"** ou **"reviewing"**, permitindo apenas visualização.

2. **Prazo de Validade**:
   - Campo de entrada para o **prazo de validade** do produto.
   - O campo é desabilitado para edição quando o **`mode`** é **"viewing"** ou **"reviewing"**, tornando-o apenas para leitura.

3. **Lote Econômico**:
   - Campo de entrada para o **lote econômico** do produto.
   - O campo também está desabilitado para edição quando o **`mode`** é **"viewing"** ou **"reviewing"**.

4. **Lote Mínimo**:
   - Campo de entrada para o **lote mínimo** do produto.
   - O campo é tratado da mesma forma que os outros, desabilitado para edição quando o **`mode`** é **"viewing"** ou **"reviewing"**.

### Desabilitação de Campos:
- Os campos de entrada podem ser desabilitados dependendo do valor da prop `mode`. Se `mode` for **"viewing"** ou **"reviewing"**, os campos se tornam **somente leitura** e não podem ser editados.

### Integração com `react-hook-form`:
- O componente usa `react-hook-form` para controlar o estado do formulário e a validação dos campos. Ele utiliza os métodos `register` e `formState.errors` para associar os campos aos dados do formulário e exibir as mensagens de erro de validação.

## 💡 Exemplo de Uso

```tsx
<FormValidity
  mode="editing"
  methods={methods}
/>
```
