# Documentação do Componente `InputWithMask`

## 📁 Localização
`src/components/inputs/input-with-mask.components.tsx`

## 📊 Visão Geral
Componente reutilizável de **input com máscara** integrado ao **React Hook Form**, com suporte a vários formatos (CPF, CNPJ, telefone, WhatsApp e customizado).  Utiliza a biblioteca `remask` para aplicação das máscaras e manipulação dos valores. O componente oferece flexibilidade para personalizar máscaras e funciona bem em formulários com dados formatados.



## 🔎 Detalhamento Linha a Linha e Funcionamento

### Importações
```ts
import { UseFormRegisterReturn, useFormContext } from "react-hook-form";
import { mask as applyMask, unMask } from 'remask';
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";
import { forwardRef } from "react";
```
- `useFormContext`: Hook do React Hook Form que permite acessar funções como `setValue`, `watch`, `trigger`, etc., sem passar props manualmente.
- `remask`: Biblioteca utilizada para aplicar e remover máscaras de entrada.
- `mask` e `unMask`: Funções da biblioteca remask para aplicar e remover a máscara do valor do campo.
- `LucideIcon` / `IconType`: Para uso de ícones decorativos.

---


### Interface das Propriedades
```ts
interface InputMaskProps {
  name: string;
  label?: string;
  maskType?: "whatsapp" | "cpf" | "cnpj" | "phone" | "custom"  | "dynamic";;
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
- O objeto `masks` associa cada tipo de máscara (`maskType`) a uma string ou um array de strings, dependendo da necessidade (ex: `whatsapp`, `phone`, `cpf`).
- O objeto `placeholders` define os placeholders a serem exibidos no campo de entrada, baseado no tipo de máscara selecionado.

---

### Aplicação das máscara 
```tsx
const mask = masks[maskType] || customMask;
const placeholder = placeholders[maskType] || customMask;

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const originalValue = unMask(e.target.value);
  const maskedValue = applyMask(originalValue, mask);
  setValue(name, maskedValue);
};

```
- `mask`: Seleciona a máscara apropriada para o tipo de dado.
- `placeholder`: Define o placeholder com base no tipo de máscara.
- `handleChange`: A função que é chamada a cada mudança no campo de input. 
  - Ela utiliza `unMask` para remover a máscara do valor.
  - E o `applyMask` para aplicar a máscara selecionada.
  - Depois então atualiza o valor no formulário com `setValue`.

---

### Renderização
```tsx
<input
  id={name}
  value={value}
  onChange={handleChange}
  className="..."
  placeholder={placeholder}
  readOnly={readOnly}
  onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
/>
```

- `value`: Valor do campo (controlado via `watch`).
- `onChange`: Chama a função `handleChange` para atualizar o valor com a máscara.
- `onBlur`: Pode ser usado para trigger de validação ou formatação externa.
- `readOnly`:  Se `true`, o campo será somente leitura e não permitirá alterações..
- `className`: Classe do Tailwind com estados dinâmicos baseados em `error` e `readOnly`.
- `onKeyDown`: Impede que o usuário submeta o formulário ao pressionar **"Enter"** dentro do campo.

---

### Exibição do Erro
```tsx
{error && <span className="text-error/80 text-xs mt-1 pl-1">{error}</span>}
```
Renderiza a mensagem de erro, se existir.



## ⚖️ Regras de Uso
- Utilize `name` igual ao nome do campo no `useForm()` para que o componente funcione corretamente com o **React Hook Form**.
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