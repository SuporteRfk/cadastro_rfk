# Documentação do Componente `FormProductDimensions`;

## 📁 Localização

`/components/forms/form-product-dimensions.components.ts`

## 📊 Visão Geral

O componente `FormProductDimensions` é utilizado para exibir e editar as **dimensões** do produto, incluindo **profundidade**, **largura** e **altura**. Este componente é flexível, permitindo que diferentes tipos de dimensões sejam exibidos de acordo com o contexto (como **unitário**, **fardo**, ou **copacker**). Ele é integrado ao `react-hook-form` para o gerenciamento do estado do formulário e validação.

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

### `configSecondDimensions` (obrigatório)
- **Tipo**: `keyof typeof ConfigSecondDimensions`
- **Descrição**: Especifica o tipo de configuração de dimensões a ser utilizada. Isso determina quais campos de **profundidade**, **largura** e **altura** serão exibidos, com base no tipo de formulário (ex.: **formCopacker**, **formPABurden**, **formPaUnitary**).

## 🎨 Funcionamento

Este componente lida com três conjuntos principais de campos de **dimensões**:

1. **Dimensões principais (fardo)**:
   - **Profundidade**, **Largura** e **Altura** do fardo, com ícones representando cada medida (**Profundidade**, **Largura** e **Altura**).
   - Esses campos estão sempre visíveis e são controlados pelo `react-hook-form`.

2. **Segundas dimensões**:
   - Dependendo da configuração escolhida (passada por `configSecondDimensions`), os campos de **profundidade**, **largura** e **altura** de outro tipo de produto (ex: unitário, copacker) serão exibidos.
   - As propriedades como **label**, **placeholder** e **nameRegister** são configuráveis dinamicamente com base no tipo de configuração fornecido.

### Desabilitação de Campos:
- Os campos de entrada podem ser desabilitados dependendo do valor da prop `mode`. Se `mode` for **"viewing"** ou **"reviewing"**, os campos se tornam **somente leitura** e não podem ser editados.

### Integração com `react-hook-form`:
- O componente usa `react-hook-form` para controlar o estado do formulário e a validação dos campos. Ele utiliza os métodos `register` e `formState.errors` para associar os campos aos dados do formulário e exibir as mensagens de erro de validação.

## 💡 Exemplo de Uso

```tsx
<FormProductDimensions
  mode="editing"
  methods={methods}
  configSecondDimensions="formPaUnitary" // Configuração para as dimensões do tipo "unitário"
/>
```

### Explicação:
- `mode="editing"`: O componente está no modo de edição, permitindo que os campos sejam editados.
- `methods={methods}`: O objeto retornado pelo useForm do react-hook-form é passado para o componente para gerenciar o estado do formulário.
- `configSecondDimensions="formPaUnitary"`: Aplica um flex-rol-reverse para mostrar primeiro os inputs relacionadas a unidiade e depois o fardo, pois essa é a unica diferença do `form-pa-burden (fardos)` para o `form-pa-unitary (unidades)`