# Documentação do Componente `InputWithMask`

## 📁 Localização
`src/components/inputs/input-with-mask.components.tsx`

## 📊 Visão Geral
Componente reutilizável de **input com máscara** integrado ao **React Hook Form**, com suporte a vários formatos (CPF, CNPJ, telefone, WhatsApp e customizado). É responsável por controlar a digitação do usuário dentro de um formato específico e comunicar essas alterações ao estado do formulário.


## 🔎 Detalhamento Linha a Linha e Funcionamento

### Importações
```ts
import { UseFormRegisterReturn, useFormContext } from "react-hook-form";
import InputMask from "react-input-mask-next";
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";
import { forwardRef } from "react";
```
- `useFormContext`: Hook do React Hook Form que permite acessar funções como `setValue`, `watch`, `trigger`, etc., sem passar props manualmente.
- `InputMask`: Biblioteca que permite aplicar máscaras visuais ao campo de input.
- `LucideIcon` / `IconType`: Para uso de ícones decorativos.
- `forwardRef`: Permite que o componente aceite refs externas, necessário para interoperação com RHF e bibliotecas externas.

---


### Interface das Propriedades
```ts
interface InputMaskProps {
  name: string;
  label?: string;
  maskType?: "whatsapp" | "cpf" | "cnpj" | "phone" | "custom";
  customMask?: string;
  error?: string;
  Icon: LucideIcon | IconType;
  readOnly?: boolean;
  register?: UseFormRegisterReturn;
  onBlur?: () => void;
}
```

- `name`: **Obrigatório**. Nome do campo dentro do RHF.
- `label`: Rótulo exibido acima do campo.
- `maskType`: Tipo de máscara predefinida. Pode ser um dos valores listados.
- `customMask`: String de máscara personalizada, usada quando `maskType = custom`.
- `error`: Mensagem de erro a ser exibida abaixo do input.
- `Icon`: Componente de ícone a ser exibido dentro do input (ex: telefone).
- `readOnly`: Define se o input está apenas para leitura.
- `register`: Registro opcional com RHF (não utilizado diretamente, pois usamos `setValue`).
- `onBlur`: Função disparada quando o input perde o foco.

---

### Execução do Componente
```tsx
const { setValue, watch } = useFormContext();
const value = watch(name) ?? "";
```
- `watch(name)`: Observa o valor atual do campo.
- `?? ""`: Garante que o valor nunca seja `undefined` (evita warning de input controlado).
- `setValue(name, value)`: Atualiza manualmente o campo dentro do RHF sempre que o usuário digita.

---

### Definição das Máscaras e Placeholders
```ts
const masks: Record<string, string> = { ... }
const placeholders: Record<string, string> = { ... }
```
- Ambos os objetos associam o `maskType` escolhido a um valor de máscara ou placeholder.
- Ex: `maskType: "cpf"` gera máscara `999.999.999-99`.

---

### Renderização
```tsx
<InputMask
  id={name}
  mask={mask}
  value={value}
  onChange={(e) => setValue(name, e.target.value)}
  onBlur={onBlur}
  readOnly={readOnly}
  placeholder={placeholder}
  ref={ref as any}
  className="..."
/>
```

- `mask`: Máscara usada.
- `value`: Valor do campo (controlado via `watch`).
- `onChange`: Quando o usuário digita, RHF é atualizado com `setValue`.
- `onBlur`: Pode ser usado para trigger de validação ou formatação externa.
- `ref={ref as any}`: Necessário para compatibilidade com o `forwardRef` e evitar erros de tipo com InputMask.
- `className`: Classe do Tailwind com estados dinâmicos baseados em `error` e `readOnly`.

---

### Exibição do Erro
```tsx
{error && <span className="text-error/80 text-xs mt-1 pl-1">{error}</span>}
```
Renderiza a mensagem de erro, se existir.



## ⚖️ Regras de Uso
- Sempre utilize `name` igual ao campo do `useForm()`.
- Ideal para uso com formulários que exigem dados formatados (telefone, cpf, cnpj).
- Não usar `register` nesse componente, pois ele é controlado manualmente via `setValue` e `watch`.
- Para inicializações vindas de banco ou API, apenas certifique-se que `defaultValues` esteja preenchido corretamente no `useForm()`.


## 💻 Exemplo de Uso
```tsx
<InputWithMask
  name="cnpj"
  label="CNPJ"
  maskType="cnpj"
  Icon={BuildingIcon}
  error={errors?.cnpj?.message}
  onBlur={() => trigger("cnpj")}
/>
```

## 🧪 Validações
- As validações devem ser feitas no schema do Yup (ex: tamanho mínimo, obrigatoriedade, etc.).
- Para acionar validações no blur, use `onBlur={() => trigger('campo')}`.


## 🚫 Limitações
- Não suporta máscaras dinâmicas baseadas em valor (ex: CPF ou CNPJ juntos).
- Não integra diretamente com `Controller` (porque é um input controlado manualmente).