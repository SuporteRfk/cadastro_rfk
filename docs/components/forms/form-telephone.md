# Documentação do Componente `FormTelephone`;

## 📁 Localização

`/components/forms/form-telephone.components.ts`

## 📊 Visão Geral

O `FormTelephone` é um componente de formulário reutilizável, criado para gerenciar e exibir múltiplos campos de telefone (principal e opcionais) com máscaras aplicadas. Ele é integrado ao React Hook Form, utilizando useFormReturn para controle do estado do formulário. O componente usa `InputWithMask` para formatar os números de telefone com a máscara apropriada.

## 🔎 Detalhes Técnicos

### Dependências:
- `react-hook-form`: Para integração com o gerenciamento de formulários.
- `InputWithMask`: Componente de input com máscara dinâmica para formatar os números de telefone.
- `react-icons/fa6` e `lucide-react`: Bibliotecas de ícones usadas para representar o WhatsApp e o telefone.

# ⚙️ Propriedades

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

# 🎨 Funcionamento

Este componente lida com quatro campos principais de telefone:

### Telefone Principal:
- Campo de entrada para o telefone principal do usuário.
- O campo utiliza o ícone do WhatsApp e uma máscara dinâmica para o número de telefone.
- O campo é somente leitura nos modos `"viewing"` e `"reviewing"`, e editável no modo `"editing"`.

### Telefone 2 Opcional:
- Campo de entrada para o telefone 2 (opcional).
- O campo também utiliza o ícone do WhatsApp e máscara dinâmica.
- A exibição ou edição depende do `mode`.

### Telefone 3 Opcional:
- Campo de entrada para o telefone 3 (opcional).
- O campo utiliza o ícone de telefone e máscara dinâmica.
- Como os outros campos, a exibição depende do `mode`.

### Telefone 4 Opcional:
- Campo de entrada para o telefone 4 (opcional).
- O campo utiliza o ícone de telefone e máscara dinâmica.
- O comportamento é similar aos outros campos, com controle pelo `mode`.

# Desabilitação de Campos
Os campos de entrada podem ser desabilitados dependendo do valor da prop `mode`. Se `mode` for `"viewing"` ou `"reviewing"`, os campos se tornam somente leitura e não podem ser editados.

# Integração com react-hook-form
O componente está completamente integrado ao `react-hook-form` para o gerenciamento de estado do formulário e validação. Ele utiliza os métodos `formState.errors` para exibir as mensagens de erro de validação.


## 💡 Exemplo de Uso

```tsx
<FormTelephone
  mode="editing"
  methods={methods}
/>
```

## Explicação:
- `mode="editing"`: O componente está no modo de edição, permitindo que os campos sejam editados.
- `methods={methods}`: O objeto retornado pelo useForm do react-hook-form é passado para o componente para gerenciar o estado do formulário.

### 🚀 Observações:
- **Campos Condicionais**: O componente usa o mode para determinar quando os campos estarão em modo de leitura e quando poderão ser editados.
- **Validação e Erros**: O componente usa o react-hook-form para validação de campos. Se houver um erro de validação, a mensagem de erro será exibida abaixo de cada campo.
- **Flexibilidade**: O componente é reutilizável e pode ser facilmente integrado a outros formulários que precisem de campos de telefone.

### 🚫 Limitações

O componente não lida com validação complexa de número de telefone (como validação de DDD válido).  

Para garantir o bom preenchimento dos números de telefone, é necessário garantir que a entrada do usuário siga o formato esperado pelas máscaras dinâmicas.