# Documentação do Componente `FormValidity`;

## 📁 Localização

`/components/forms/form-validity.components.ts`

## 📊 Visão Geral

O componente `FormProductPackagingInfo` é utilizado para exibir e editar informações relacionadas ao **armazenamento** e **embalagem** de um produto. Ele permite que o usuário insira o **armazém padrão**, **tamanho da embalagem** e **tipo de embalagem**, e se integra com o `react-hook-form` para o gerenciamento do estado do formulário e validação.


## 🔎 Detalhes Técnicos

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
- **Descrição**: O objeto retornado pelo `useForm` do `react-hook-form`. Contém os métodos e o estado do formulário, como `register`, `formState.errors`, etc., usados para associar os campos aos dados do formulário e realizar a validação.

### `valueInitialStorage` (opcional)
- **Tipo**: `string`
- **Descrição**: Valor inicial para o campo **"Armazém Padrão"**. Se não fornecido, o valor será vazio. Ele pode ser usado para preencher o campo com um valor inicial.

## 🎨 Funcionamento

Este componente lida com três campos principais:

1. **Armazém Padrão**:
   - Campo de entrada para o **armazém padrão** do produto.
   - O campo é configurado para ser somente leitura quando o modo é **"viewing"** ou **"reviewing"**.
   - O valor inicial de **armazém** pode ser passado através da prop `valueInitialStorage`.

2. **Tamanho da Embalagem**:
   - Campo de entrada para o **tamanho da embalagem**.
   - O campo também se comporta de maneira similar, sendo editável ou somente leitura dependendo do modo.

3. **Tipo de Embalagem**:
   - Campo de entrada para o **tipo de embalagem** do produto.
   - O campo é gerenciado pelo `react-hook-form` e pode ser validado, com as mensagens de erro sendo exibidas se necessário.

### Desabilitação de Campos:
- Os campos de entrada podem ser desabilitados dependendo do valor da prop `mode`. Se `mode` for **"viewing"** ou **"reviewing"**, os campos se tornam **somente leitura** e não podem ser editados.

### Integração com `react-hook-form`:
- O componente está completamente integrado ao `react-hook-form` para o gerenciamento de estado do formulário e validação. Ele utiliza os métodos `register` e `formState.errors` para associar os campos aos dados do formulário e exibir as mensagens de erro de validação.

## 💡 Exemplo de Uso

```tsx
<FormProductPackagingInfo
  mode="editing"
  methods={methods}
  valueInitialStorage="Armazém 01" // Preenche o campo de "Armazém Padrão" com o valor inicial
/>
```

### Explicação:
- `mode="editing"`: O componente está no modo de edição, permitindo que os campos sejam editados.
- `methods={methods}`: O objeto retornado pelo `useForm` do `react-hook-form` é passado para o componente para gerenciar o estado do formulário.
- `valueInitialStorage="Armazém 01"`: Preenche o campo de **"Armazém Padrão"** com um valor inicial.

### 🚀 Observações:
- `Campos Condicionais`: O campo "Armazém Padrão" pode ser preenchido com um valor inicial via a prop valueInitialStorage, o que é útil em formulários de edição.
- `Validação e Erros`: O componente usa o `react-hook-form `para validação de campos. Se houver um erro de validação, a mensagem de erro será exibida abaixo de cada campo.
- `Flexibilidade`: O componente é reutilizável e pode ser facilmente integrado a outros formulários que necessitem de campos relacionados a armazenamento e embalagem de produtos.

