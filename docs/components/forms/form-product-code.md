# Documentação do Componente `FormProductCode`;

## 📁 Localização

`/components/forms/form-product-code.components.ts`

## 📊 Visão Geral

O componente `FormProductCode` é utilizado para exibir os campos de **código de barras** e **código SAIB** de um produto. Ele permite o gerenciamento desses dados em diferentes formulários, com a capacidade de exibir dinamicamente o **segundo código de barras** ou somente o **código saib** com base na configuração do formulário. O componente é integrado com o `react-hook-form` para o gerenciamento de formulários e validações.

### Dependências:

- `react-hook-form:` Para integração com o gerenciamento de formulários.
- `InputSelect`: Para renderizar os campos de seleção (select).
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
- **Descrição**: O objeto retornado pelo `useForm` do `react-hook-form`. Contém os métodos e o estado do formulário, como o `register` e o `formState.errors`, usados para associar os campos aos dados do formulário e para validação.

### `showSecondCodeBar` (opcional)
- **Tipo**: `boolean`
- **Descrição**: Se definido como `true`, o componente exibirá o campo **"Segundo Código de Barras"**. Caso contrário, esse campo será ocultado.

### `showOnlyCodeSaib` (opcional)
- **Tipo**: `boolean`
- **Descrição**: Se definido como `true`, apenas o campo **"Código Saib"** será exibido. O campo **"Código de Barras GTIN"** e o **"Segundo Código de Barras"** serão ocultados.

### `configSecondCodeBar` (opcional)
- **Tipo**: `keyof typeof ConfigSecondCodeBar`
- **Descrição**: A chave que define qual configuração será aplicada ao campo **"Segundo Código de Barras"**. As opções são:
  - `"formPaThird"`: Para o campo de código de barras no formulário `formPaThird`.
  - `"formPABurden"`: Para o campo de código de barras no formulário `formPABurden`.
  - `"formPaUnitary"`: Para o campo de código de barras no formulário `formPaUnitary`.


## 🎨 Funcionamento

Este componente lida com três campos principais:

1. **Código de Barras GTIN**:
   - Campo de entrada para o **código de barras** do produto.
   - Esse campo é exibido por padrão, mas pode ser ocultado se `showOnlyCodeSaib` for `true`.

2. **Segundo Código de Barras**:
   - Campo de entrada para o **segundo código de barras** do produto. Esse campo será exibido apenas se `showSecondCodeBar` for `true`.
   - O **rótulo** e o **nome de registro** para esse campo são dinamicamente definidos com base na configuração passada via `configSecondCodeBar`.

3. **Código SAIB**:
   - Campo de entrada para o **código SAIB** do produto.
   - Esse campo está sempre visível, independentemente das outras configurações.

### Configuração Dinâmica de "Segundo Código de Barras":
- As configurações para o **segundo código de barras** são baseadas em um objeto de configuração **`ConfigSecondCodeBar`**, que define o **rótulo**, **placeholder** e **nome de registro** para cada tipo de formulário.
- Quando a chave `configSecondCodeBar` é passada, o componente exibe o campo de acordo com a configuração associada (exemplo: `formPaThird`, `formPABurden`, etc.).

### Desabilitação de Campos:
- Os campos podem ser desabilitados dependendo do valor de `mode`. Se `mode` for **"viewing"** ou **"reviewing"**, os campos de entrada se tornarão somente leitura.

## 💡 Exemplo de Uso

```tsx
<FormProductCode
  mode="editing"
  methods={methods}
  showSecondCodeBar={true}
  configSecondCodeBar="formPaUnitary" // Configuração para o segundo código de barras
/>
```