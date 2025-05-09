# Documentação do Componente `FormProductCategorySelector`;

## 📁 Localização

`/components/forms/form-product-category-selector.components.ts`

## 📊 Visão Geral

O componente `FormProductCategorySelector` é utilizado para agrupar os campos de seleção de **Família**, **Grupo** e **Tipo** de produto em um único formulário. Ele integra o `react-hook-form` para o gerenciamento do estado do formulário e permite o controle de interação com os campos com base no modo de exibição (edição, visualização ou revisão).

## 🔎 Detalhes Técnicos

### Dependências:

- `react-hook-form:` Para integração com o gerenciamento de formulários.
- `InputSelect`: Para renderizar os campos de seleção (select).
- `FormSection`: Componente de formulário que serve como container

### Propriedades (PROPS):

### `mode` (opcional)
- **Tipo**: `FormStateType`
- **Descrição**: Determina o modo de exibição do formulário. Dependendo do valor de `mode`, os campos podem ser desabilitados para edição.
  - **Valores possíveis**:
    - `"editing"`: Modo de edição. Os campos estão habilitados para edição.
    - `"viewing"`: Modo de visualização. Os campos estão desabilitados para edição.
    - `"reviewing"`: Modo de revisão. Os campos estão desabilitados para edição.

### `family` (obrigatório)
- **Tipo**: `string[]`
- **Descrição**: Uma lista de opções para o campo "Família do Fardo". O componente recebe essas opções como uma lista de strings que será exibida nas opções do seletor de família.

### `group` (obrigatório)
- **Tipo**: `string[]`
- **Descrição**: Uma lista de opções para o campo "Grupo do Fardo". O componente recebe essas opções como uma lista de strings que será exibida nas opções do seletor de grupo.

### `type` (obrigatório)
- **Tipo**: `string[]`
- **Descrição**: Uma lista de opções para o campo "Tipo de Fardo". O componente recebe essas opções como uma lista de strings que será exibida nas opções do seletor de tipo.

### `methods` (obrigatório)
- **Tipo**: `UseFormReturn<T>`
- **Descrição**: O objeto retornado pelo `useForm` do `react-hook-form`, que contém os métodos e o estado do formulário. Esse objeto é usado para associar os campos aos dados do formulário e controlar o comportamento dos campos (como validação e exibição de erros).

## 💻 Como Funciona

Este componente agrupa três campos de seleção relacionados ao produto em um único bloco visual:

1. **Família do Fardo**:
   - Campo de seleção que permite escolher a família do fardo.
   - Recebe as opções através da prop `family`.

2. **Grupo do Fardo**:
   - Campo de seleção que permite escolher o grupo do fardo.
   - Recebe as opções através da prop `group`.

3. **Tipo de Fardo**:
   - Campo de seleção que permite escolher o tipo do fardo.
   - Recebe as opções através da prop `type`.

Os campos são renderizados dentro de um componente `FormSection`, que organiza os campos em uma estrutura flexível para garantir uma boa exibição em diferentes tamanhos de tela.

### Desabilitação de Campos:
- O componente utiliza a prop `mode` para determinar se os campos devem estar habilitados ou desabilitados. Se o modo for **"viewing"** ou **"reviewing"**, os campos serão desabilitados para edição, evitando que o usuário faça alterações.

### Exibição de Erros:
- O componente exibe mensagens de erro abaixo de cada campo, que são fornecidas pelo `react-hook-form` através do objeto `methods.formState.errors`. Caso haja algum erro de validação para o campo, a mensagem de erro será exibida.


## ⚖️ Regras de Uso

- **Campos Obrigatórios e Preenchíveis**: Dependendo do valor de `mode`, os campos podem ser somente leitura ou editáveis. Quando `mode` é `"viewing"` ou `"reviewing"`, os campos ficam desabilitados para edição.
- **Validação de Dados**: A validação dos campos é realizada automaticamente usando o schema do Yup. Erros de validação são armazenados e exibidos abaixo de cada campo.
- **Uso Dinâmico de Campos**: O componente é configurável e permite a passagem de listas de opções para os campos. Você pode personalizar facilmente os campos de "Família", "Grupo" e "Tipo" passando diferentes listas de valores como props.


## 💻 Exemplo de Uso

```tsx
<FormProductCategorySelector
  mode="editing"
  family={["Família 1", "Família 2", "Família 3"]}
  group={["Grupo 1", "Grupo 2", "Grupo 3"]}
  type={["Tipo 1", "Tipo 2", "Tipo 3"]}
  methods={methods}
/>
```

### Explicação:
O exemplo acima mostra como utilizar o componente `FormProductCategorySelector` em um formulário.

- O modo é definido como `"editing"`, o que permite que os campos sejam editáveis.
- As opções de `família`, `grupo` e `tipo` são passadas como listas de strings.
- O objeto `methods`, que contém a lógica do react-hook-form, é passado para o componente para associar os campos ao formulário.