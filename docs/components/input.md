# Documentação do Componente `Input`

## 📁 Localização

`/components/input/input.components.tsx`

## 📊 Visão Geral

O componente `Input` é reutilizável e projetado para atender diferentes cenários do sistema:

- ✅ Cadastro de dados 
- ✅ Visualização de dados (readonly)
- ✅ Revisão de solicitações (modo revisão com integração a checkbox externa)
- ✅ Edição

## 🔎 Detalhes de Implementação

### Estado interno (`useState`)
O `Input` usa `useState` para manter o valor do input porque:

- O `defaultValue` do React Hook Form **não reage** a alterações posteriores de props.
- É comum que um mesmo formulário receba dados dinâmicos (ex: abrir nova solicitação, editar outra).
- Sem esse controle, o input não atualiza corretamente ao alternar entre dados dinâmicos.

```tsx
const [value, setValue] = useState(valueInitial);

useEffect(() => {
  setValue(valueInitial);
}, [valueInitial]);
```

### Registro com React Hook Form
O componente recebe `register` como prop e aplica no input:

```tsx
<input {...register} ... />
```

Isso permite integração com `react-hook-form` para:
- Captura dos dados no `handleSubmit`
- Validações com `yup`

### Comportamento Visual
- Quando `readOnly` está `true`, o campo é bloqueado e estilizado com cor branca aplicada opacidade na cor de 35%.
- Quando há erro, borda vermelha e mensagem abaixo.

### Props Aceitas

| Prop            | Tipo                                   | Descrição                        |
|-----------------|----------------------------------------|----------------------------------|
| `name`          | `string`                               | Nome do input (para `form`)      |
| `label`         | `string` (opcional)                    | Texto do label exibido acima     |
| `placeholder`   | `string` (opcional)                    | Placeholder dentro do input      |
| `type`          | `string` (default: text)               | Tipo do campo (text, email, etc) |
| `register`      | `UseFormRegisterReturn`                | Registro do React Hook Form      |
| `error`         | `string` (opcional)                    | Mensagem de erro a ser exibida   |
| `icon`          | `LucideIcon` ou `IconType` (opcional)  | Ícone ao lado esquerdo do input  |
| `valueInitial`  | `string` (opcional)                    | Valor inicial dinâmico           |
| `maxCaractere`  | `number` (opcional)                    | Limite máximo de caracteres      |
| `readOnly`      | `boolean` (opcional)                   | Desabilita edição                |

 
## ⚖️ Regras de Uso

- Não usar `defaultValue` diretamente no input.
- Sempre passar `valueInitial` vindo do banco ou do estado pai.
- O componente cuida da atualização com base no modo (`edição`, `visualização`, `revisão`).
- Para modo revisão, o controle extra do campo (textarea + checkbox) deve ser gerenciado fora deste componente.


Se você for usar este componente em um novo campo de formulário, **mantenha os mesmos padrões** e **evite criar variações sem necessidade**.

Para revisão com textarea, use `/components/revisaoCampo` junto ao `Input`. Isso garante a separação de responsabilidades entre input e lógica de controle de revisão.