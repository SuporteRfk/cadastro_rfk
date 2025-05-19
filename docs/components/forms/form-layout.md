# Documentação do Componente `FormLayout`;

## 📁 Localização

`/components/forms/form-layout.components.ts`

## 📊 Visão Geral

O `FormLayout`  é um componente reutilizável e flexível para construção de formulários em várias páginas da aplicação. Ele utiliza o React Hook Form. Ele permite a utilização de campos dinâmicos, tipagem forte e validação externa via yup. O componente é flexível para ser utilizado em diversos contextos e pode ser facilmente estendido com campos personalizados.
O componente é configurado no componente `pai`, onde o esquema de `validação com yup` e os `methods` também é passado.


## 🔎 Detalhes Técnicos

### Dependências:

- **React Hook Form** (`FormProvider`): Para o gerenciamento de estado do formulário.
- **YUP**: Yup para validação externa no componente pai.
- **lucide-react e react-icons**: Ícones de UI (para exibição de ícones nos campos).
- **React Context (AuthContext e Modal)**: Para obter dados do usuário logado (nome e e-mail) e exibir modal nas ações dos botões.

### Propriedades (PROPS):

- `onSubmit`:
  - **Tipo**: `(data: T) => void`.
  - **Descrição**: Função chamada quando o formulário é enviado. Recebe os dados do formulário como argumento.
- `children`: 
  - **Tipo**: `ReactNode`.
  - **Descrição**: Campos dinâmicos que serão renderizados dentro do formulário. Eles são passados como elementos filhos do componente.
- `formState`:
  - **Tipo**:(`'editing'` | `'viewing' `| `'reviewing'`)
  - **Descrição**: Controla o estado do formulário. Determina se o formulário está em modo de edição, visualização ou revisão. Influencia o comportamento de leitura dos campos (se são editáveis ou somente leitura).
- `showSector`:
  - **Tipo**: `boolean`.
  - **Descrição**: Se `true`, exibe o campo de seleção de "Setor". Caso contrário, o campo não será exibido.
- `titleForm`:
  - **Tipo**: `string`.
  - **Descrição**: Título do formulário que será exibido no topo do formulário.
- `iconForm`:
  - **Tipo**: `LucideIcon`.
  - **Descrição**: Ícone associado ao título do formulário.
- `showButtonsDefault`:
  - **Tipo**: `boolean`.
  - **Descrição**: Controla a exibição dos botões padrão de ação ("Cancelar" e "Salvar"). O padrão é `true`.
- `modalQuestion`:
  - **Tipo**: `{ modalKey: string; message: string }`
  - **Descrição**: Configuração do modal de confirmação que é exibido antes de submeter o formulário. Permite personalizar a chave do modal e a mensagem.
- `onResetStates`:
  - **Tipo**: `() => void`.
  - **Descrição**: Função que pode ser passada para realizar um reset de estados adicionais, caso necessário, ao resetar o formulário.
- `loading`:
  - **Tipo**: `boolean`
  - **Descrição**: Flag que controla a exibição de um componente de loading enquanto o formulário está sendo processado (geralmente ao salvar os dados).
- `methods`:
  - **Tipo**: `UseFormReturn<T>`.
  - **Descrição**: Objeto retornado pela função `useForm` do React Hook Form, que fornece os métodos necessários para manipular o formulário, como `register`, `reset`, `handleSubmit`, entre outros.

## 💻 Como Funciona
1. ***Integração com React Hook Form***:  
    O `FormLayout` é projetado para usar o **React Hook Form** para gerenciamento de estado. O objeto `methods` é passado como propriedade, o que permite que todos os campos dentro do formulário sejam registrados e manipulados pelo **React Hook Form**.
2. ***Validação Externa***:  
   A validação do formulário é realizada no componente pai, onde você pode passar um **schema de validação** (por exemplo, com Yup) usando o `yupResolver` para o React Hook Form. O componente em si não tem dependência direta de validação, permitindo maior flexibilidade.
3. ***Campos Dinâmicos***:  
   Campos dinâmicos podem ser passados como filhos do componente através da propriedade children. Isso permite que o `FormLayout` seja reutilizado em diversos formulários com diferentes conjuntos de campos.
4. ***Botões de Ação***:  
  O formulário inclui dois botões padrão:
  - `Cancelar`: Restaura o formulário para seus valores iniciais.
  - `Salvar`: Valida os dados e chama a função onSubmit quando o formulário for validado.
  <br>      
  A validação e submissão dos dados do formulário são feitas através do método handleSubmit do React Hook Form.
5. ***Campos Padrão***:  
 O `FormLayout` inclui alguns campos padrão, como:
  - **Nome do solicitante**: Usando o componente `Input`.
  - **Data da solicitação**: Usando o componente `DateInput`.
  - **E-mail**: Usando o componente `Input`.
  - **WhatsApp**: Usando o componente `InputWithMask`.
6. ***Componentes de Máscara de Entrada***:  
  O `InputWithMask` é utilizado para aplicar máscaras em campos como **WhatsApp, CPF, CNPJ,** entre outros


## ⚖️ Regras de uso

- Campos Obrigatórios e Preenchíveis: Dependendo do estado do formulário (formState), campos podem ser somente leitura ou editáveis. Quando `formState` é `"viewing"` ou `"reviewing"`, campos ficam desabilitados para edição.
- Validação de Dados: O Yup realiza a validação automática dos campos de acordo com o schema passado, e erros de validação são armazenados e apresentados no formulário.
- Uso Dinâmico de Campos: Use a propridade `children` para passar campos adicionais ou específicos para o formulário. O componente `FormLayout` é altamente reutilizável e flexível, permitindo que diferentes formulários compartilhem a mesma estrutura, mas com campos e lógicas diferentes.

## 💻 Exemplo de Uso

```tsx
import { FormLayout, FormSection, Input, PageLayout, SubTitleForm, Toastify } from "@/components";
import { IPaymentConditionRegister } from "../interface/payment-condition";
import { PaymentConditionSchema } from "../schema/payment-condition.shema";
import {Banknote as PaymentCoonditionIcon} from "lucide-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
    Landmark as TitleFormIcon,
    CircleDollarSign as PaymentIcon
} from "lucide-react";
import { useState } from "react";
import { insertPaymentConditionService } from "../service/insert-payment-condition.service";
import { handleApiError } from "@/utils";


export const RegisterPaymentCondition = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const methods= useForm<IPaymentConditionRegister>({
        resolver: yupResolver(PaymentConditionSchema),       
    });

  

    const onSubmit = async (data: IPaymentConditionRegister) => {
        console.log(data)
    }

    return(
        <PageLayout>
            <FormLayout 
                titleForm="Condição de Pagamento" 
                iconForm={PaymentCoonditionIcon} 
                methods={methods}
                onSubmit={onSubmit}
                loading={loading}
            >
                <SubTitleForm title="Nova Condição de Pagamento"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={TitleFormIcon}/>
                 <FormSection className="sm:flex-row gap-4">
                    <Input
                        label="Condição de pagamento" 
                        name="condicao_pagamento"
                        register={methods.register("condicao_pagamento")}
                        error={methods.formState.errors.condicao_pagamento?.message as string | undefined}
                        placeholder="Digite a condição de pagamento"
                        icon={PaymentIcon}
                    />
                 </FormSection>
            </FormLayout>
        </PageLayout>
    );
};

```


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


## 💡 Considerações Finais

Este componente `FormLayout` oferece uma abordagem modular e reutilizável para a construção de formulários. A flexibilidade de passar campos dinamicamente através de `children` e o uso de React Hook Form e Yup permite criar formulários complexos com validação robusta, sem complicação.

