# Documentação do Componente `FormWeights`;

## 📁 Localização

`/components/forms/form-weights.components.ts`

## 📊 Visão Geral

O componente `FormWeights` é utilizado para exibir e editar as informações de **peso bruto** e **peso líquido** de um insumo. Ele é integrado ao `react-hook-form` para o gerenciamento do estado do formulário e validação, permitindo uma experiência de preenchimento de dados fluida e eficiente.

## 🔎 Detalhes Técnicos

### Dependências:
- `react-hook-form:` Para integração com o gerenciamento de formulários.
- `InputDecimal`: Componente de input utilizado para renderizar os campos de entrada de valores numéricos.
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

Este componente lida com dois campos principais:

1. **Peso Bruto**:
   - Campo de entrada para o **peso bruto** do insumo.
   - O campo é desabilitado para edição quando `mode` é **"viewing"** ou **"reviewing"**, tornando-o somente leitura.
   - O ícone utilizado para esse campo é o **ícone de peso** (`KgIcon`).

2. **Peso Líquido**:
   - Campo de entrada para o **peso líquido** do insumo.
   - Como o campo de **peso bruto**, ele também é desabilitado para edição no modo **"viewing"** ou **"reviewing"**.
   - O ícone utilizado para esse campo também é o **ícone de peso** (`KgIcon`).

### Desabilitação de Campos:
- Os campos de entrada podem ser desabilitados dependendo do valor da prop `mode`. Se `mode` for **"viewing"** ou **"reviewing"**, os campos se tornam **somente leitura** e não podem ser editados.

### Integração com `react-hook-form`:
- O componente usa `react-hook-form` para controlar o estado do formulário e a validação dos campos. Ele utiliza os métodos `register` e `formState.errors` para associar os campos aos dados do formulário e exibir as mensagens de erro de validação.

## 💡 Exemplo de Uso

```tsx
<FormWeights
  mode="editing"
  methods={methods}
/>
```

