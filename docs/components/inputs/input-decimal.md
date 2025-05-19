# Documentação do Componente `InputDecimal`

## 📁 Localização
`src/components/inputs/input-decimal.components.tsx`

## 📊 Visão Geral
O componente `InputDecimal` é utilizado para capturar valores decimais com formatação de moeda. Ele integra o `react-hook-form` para gerenciamento de formulários e utiliza a biblioteca `react-currency-format` para garantir uma formatação adequada dos valores.

## ⚙️ Propriedades

- **`name`**: 
  - **Tipo**: `string`
  - **Descrição**: O nome do campo no formulário. Este nome será utilizado pelo `react-hook-form` para identificar o campo.
  - **Exemplo**: `"valor"`

- **`label`**: 
  - **Tipo**: `string` (opcional)
  - **Descrição**: O rótulo que será exibido ao lado do campo de entrada. Caso não seja fornecido, o campo será exibido sem rótulo.
  - **Exemplo**: `"Valor a ser pago"`

- **`error`**:
  - **Tipo**: `string` (opcional)
  - **Descrição**: A mensagem de erro a ser exibida se o campo não passar na validação.
  - **Exemplo**: `"Campo obrigatório"`

- **`Icon`**: 
  - **Tipo**: `LucideIcon | IconType`
  - **Descrição**: Um ícone que será exibido ao lado do campo de entrada. Pode ser um ícone da biblioteca `lucide-react` ou `react-icons`.
  - **Exemplo**: `SomeIcon`

- **`placeholder`**: 
  - **Tipo**: `string`
  - **Descrição**: O texto que aparecerá dentro do campo como sugestão de preenchimento.
  - **Exemplo**: `"Digite o valor"`

- **`decimalScale`**: 
  - **Tipo**: `number` (opcional)
  - **Padrão**: `10`
  - **Descrição**: O número de casas decimais que o valor deve ter. O valor padrão é `10`.
  - **Exemplo**: `2`

## 🔍 Comportamento

- O campo não permite valores negativos, garantindo que o valor inserido seja sempre positivo.
- A formatação de valores é feita automaticamente, com separadores de milhares (`.`) e decimais (`,`), seguindo o padrão brasileiro.
- O componente integra-se diretamente com o `react-hook-form`, atualizando o valor no formulário sempre que o usuário altera o valor no campo de entrada.
- Se o valor do campo no formulário for vazio ou `undefined`, o campo é limpo automaticamente.
- Caso haja um erro de validação, a mensagem de erro será exibida abaixo do campo, com destaque em vermelho.

## 💡 Exemplo de Uso

```tsx
<InputDecimal
  name="valor"
  label="Valor"
  placeholder="Digite o valor"
  Icon={SomeIcon}
  decimalScale={2}
  error="O valor é obrigatório"
/>
```

## 🚀 Observações

Este componente foi projetado para ser reutilizável e configurável, permitindo que você o utilize facilmente em diversas partes do sistema onde seja necessário capturar e formatar valores monetários ou decimais.  

