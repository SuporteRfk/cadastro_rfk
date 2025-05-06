# Documentação do Componente `FormLayout`;

## 📁 Localização

`/components/forms/form-layout.components.ts`

## 📊 Visão Geral

O `FormLayout` é um componente reutilizável e flexível para construção de formulários em várias páginas da aplicação. Ele usa React Hook Form com validação via Yup para gerenciar o estado e a validação do formulário. Este componente permite que os desenvolvedores definam campos de dados solicitantes como nome, e-mail, whatsapp e setor (opcional), e também expõe a possibilidade de adicionar campos dinâmicos por meio de children.

## 🔎 Detalhes Técnicos

### Dependências:

- React Hook Form (`useForm`, `FormProvider`): Para o gerenciamento de estado do formulário.
- Yup: Para a validação de dados.
- **lucide-react e react-icons**: Ícones de UI (para exibição de ícones nos campos).
- **React Context (AuthContext)**: Para obter dados do usuário logado (nome e e-mail).

### Propriedades:

- `schema` (`yup.AnyObjectSchema`): Schema de validação do formulário, criado com o Yup.
- `onSubmit` (`(data: T) => void`): Função a ser chamada quando o formulário for submetido, com os dados do formulário.
- `children` (`ReactNode`): Campos dinâmicos que podem ser passados para o formulário, permitindo adicionar campos extras ou específicos.
- `formState` (`'editing'` | `'viewing' `| `'reviewing'`): Define o estado do formulário (edição, visualização, revisão), influenciando a interação com os campos (por exemplo, campos somente leitura no estado "viewing").
- `defaultValues` (`Partial<T>`): Valores iniciais para os campos do formulário.
- `showSector` (`boolean`): Flag opcional para mostrar ou esconder o campo "Setor" no formulário.
- `titleForm` (`string`): Título exibido na parte superior do formulário.
- `iconForm` (`LucideIcon`): Ícone para ser exibido ao lado do título do formulário.

## ⚖️ Regras de Uso

- Campos Obrigatórios e Preenchíveis: Dependendo do estado do formulário (formState), campos podem ser somente leitura ou editáveis. Quando `formState` é `"viewing"` ou `"reviewing"`, campos ficam desabilitados para edição.
- Validação de Dados: O Yup realiza a validação automática dos campos de acordo com o schema passado, e erros de validação são armazenados e apresentados no formulário.
- Uso Dinâmico de Campos: Use a propriedade `children` para passar campos adicionais ou específicos para o formulário. O componente `FormLayout` é altamente reutilizável e flexível, permitindo que diferentes formulários compartilhem a mesma estrutura, mas com campos e lógicas diferentes.

## 💻 Exemplo de Uso

```tsx
import { clienteRegisterFormSchema } from './schemas/cliente.schema';
import { FormLayout } from '../components/forms/FormLayout';
import { InputWithMask } from '../components/inputs/input-with-mask.components';

const CadastroClientePage = () => {
  const onSubmit = (data) => {
    console.log("Cadastro de Cliente:", data);
  };

  return (
    <FormLayout
      schema={clienteRegisterFormSchema}
      onSubmit={onSubmit}
      formState="editing"
      titleForm="Cadastro de Cliente"
      iconForm={UserIcon}
      showSector={true}
    >
      {/* Campos específicos para cadastro */}
      <InputWithMask
        name="cnpj_cpf"
        label="CNPJ/CPF"
        maskType="cnpj"
      />
      {/* Outros campos específicos */}
    </FormLayout>
  );
};
```

### Explicação:
- `titleForm`: "Cadastro de Cliente" será exibido como título do formulário.
- `iconForm`: O ícone UserIcon será mostrado ao lado do título.
- `showSector`: O campo de Setor será exibido, pois showSector={true} foi passado.
- `Campos adicionais`: No exemplo, passamos um campo extra CNPJ/CPF para cadastro.

### Campos Adicionais
Você pode adicionar campos adicionais, como um campo de CNPJ/CPF, passando-os dentro de `children`:
```tsx
<FormLayout
  schema={schema}
  onSubmit={onSubmit}
  titleForm="Cadastro de Cliente"
  iconForm={UserIcon}
>
  <Input name="cnpj" label="CNPJ" />
  {/* Mais campos aqui */}
</FormLayout>

```
Isso permite que o formulário seja altamente reutilizável para diferentes fluxos de dados, sem duplicar a estrutura de layout e validação.

## Customizações Adicionais
- Campos Condicionais: Você pode fazer com que campos, como o campo Setor, sejam exibidos ou não com base em certas condições, como o estado de `formState`.
- Uso do `useForm`: O useForm da React Hook Form é integrado diretamente no componente, mantendo o formulário simples e eficaz, além de permitir controle completo sobre a validação e o estado do formulário.

## 💡 Considerações Finais

Este componente `FormLayout` oferece uma abordagem modular e reutilizável para a construção de formulários. A flexibilidade de passar campos dinamicamente através de `children` e o uso de React Hook Form e Yup permite criar formulários complexos com validação robusta, sem complicação.

Se precisar de mais exemplos ou ajustes, estou à disposição!