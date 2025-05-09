# Documentação do Componente `FormProductDescription`;

## 📁 Localização

`/components/forms/form-product-description.components.ts`

## 📊 Visão Geral

O componente `FormProductDescription` é utilizado para exibir e editar as informações de descrição e uso de um produto, incluindo a **descrição curta**, **uso do produto** e **nome científico**. Ele é integrado ao `react-hook-form` para gerenciamento de formulário e tem opções para controlar a visibilidade e o comportamento dos campos.

## 🔎 Detalhes Técnicos

### Dependências:

- `react-hook-form:` Para integração com o gerenciamento de formulários.
- `InputSelect`: Para renderizar os campos de seleção (select).
- `FormSection`: Componente de formulário que serve como container

### Propriedades (PROPS):

### `mode` (opcional)
- **Tipo**: `FormStateType`
- **Descrição**: Controla o comportamento dos campos, determinando se estão editáveis ou somente leitura.
  - **Valores possíveis**:
    - `"editing"`: Os campos estão habilitados para edição.
    - `"viewing"`: Os campos estão desabilitados para edição, permitindo somente visualização.
    - `"reviewing"`: Os campos estão desabilitados para edição, permitindo somente revisão.

### `methods` (obrigatório)
- **Tipo**: `UseFormReturn<T>`
- **Descrição**: O objeto retornado pelo `useForm` do `react-hook-form`, que contém os métodos e o estado do formulário. Usado para associar os campos aos dados do formulário e controlar a validação.

### `viewInstructions` (opcional)
- **Tipo**: `boolean`
- **Descrição**: Se definido como `true`, exibe instruções detalhadas sobre como preencher o campo de **descrição curta**. A descrição inclui regras de abreviação e formatação de texto para o campo.
- **OBS**: As instruções são usadas somente na feature `pa-third (PA-Terceiro)`. Mas podem ser expandidas para outras features, com ajustes no componente.

### `viewKeyUseProduct` (opcional)
- **Tipo**: `boolean`
- **Descrição**: Se definido como `true`, exibe o campo **"Uso do Produto"**, permitindo ao usuário preencher o uso do produto.
- **OBS**: Essa chave é usada apenas na feature `indirect-products (Produtos indiretos)`. Mas podem ser expandidas para outras features.


### `viewKeyNameScientific` (opcional)
- **Tipo**: `boolean`
- **Descrição**: Se definido como `true`, exibe o campo **"Nome Científico"**, permitindo ao usuário preencher a descrição completa do nome científico do produto.


## 🎨 Funcionamento

Este componente agrupa três campos de entrada principais:

1. **Descrição Curta**:
   - Campo de entrada que permite ao usuário inserir uma descrição curta do produto. O campo é configurável com **instruções de preenchimento** quando `viewInstructions` é `true`.
   
2. **Uso do Produto**:
   - Campo opcional que permite inserir informações sobre o **uso do produto**. Aparece somente se `viewKeyUseProduct` for `true`.

3. **Nome Científico**:
   - Campo opcional que permite inserir o **nome científico** do produto. Aparece somente se `viewKeyNameScientific` for `true`, e pode exibir **instruções de preenchimento** quando `viewInstructions` for `true`.

### Controle de Visibilidade e Edição:
- O componente verifica o valor de `mode` para definir se os campos estarão **habilitados** ou **desabilitados** para edição. Se `mode` for `"viewing"` ou `"reviewing"`, os campos são desabilitados, permitindo apenas visualização.
- A propriedade `readOnly` é usada para garantir que os campos sejam somente leitura no modo de visualização e revisão.

## 💡 Exemplo de Uso

```tsx
<FormProductDescription
  mode="editing"
  methods={methods}
  viewInstructions={true}
  viewKeyUseProduct={true}
  viewKeyNameScientific={true}
/>
```