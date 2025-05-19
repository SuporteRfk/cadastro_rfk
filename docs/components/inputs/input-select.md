# Documentação do Componente `InputSelect`

## 📁 Localização
`src/components/inputs/input-select.components.tsx`

## 📊 Visão Geral

Componente reutilizável de select integrado ao React Hook Form, com suporte a um conjunto de opções e controle visual de erro. Ele usa o estado interno para armazenar o valor selecionado e **informa o React Hook Form** sobre as alterações, garantindo que os dados sejam mantidos no estado do formulário.

## 🔎 Detalhamento Linha a Linha e Funcionamento

### Importações
```tsx
import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel
} from "@/components/ui/select";
```

- `useFormContext`: Hook do React Hook Form que permite acessar funções como `setValue`, `watch`, `getValues`, etc., sem passar props manualmente.
- `useEffect` e `useState`: Usados para controlar o estado local e sincronizar o valor selecionado.
- `Select`, `SelectContent`, `SelectItem`, etc.: Componentes que fazem parte da UI do select, provavelmente da biblioteca shadcn/ui.

### Interface das Propriedades
```tsx
interface IInputSelectProps {
  name: string;
  label?: string;
  selectLabel?: string;
  placeholder: string;
  error?: string;
  options: string[];
  maxWidth?: string;
  disabled?: boolean;
}
```
- `name`: Obrigatório. Nome do campo dentro do RHF.
- `label`: Rótulo exibido acima do campo.
- `selectLabel`: Rótulo opcional dentro do dropdown para categorizar as opções.
- `placeholder`: Texto auxiliar exibido quando o campo está vazio.
- `error`: Mensagem de erro a ser exibida abaixo do input.
- `options`: Lista de opções que serão exibidas no dropdown.
- `maxWidth`: Largura máxima do campo (usando Tailwind, o padrão é `max-w-full`).
- `disabled`: Indica se o campo deve ser desabilitado, o que impede a interação com o select.

### Execução do Componente
```tsx
const { setValue, watch, getValues } = useFormContext();
```
- `setValue(name, value)`: Atualiza o valor do campo dentro do estado do formulário no React Hook Form.
- `watch(name)`: Escuta o valor atual do campo.
- `getValues(name)`: Retorna o valor atual do campo, usado para iniciar o valor no `useState`.

### Atualização do valor selecionado

```tsx
const [selectedValue, setSelectedValue] = useState(getValues(name) || "");
```
- O estado local `selectedValue` é usado para armazenar o valor do `Select`, sendo inicializado com o valor do formulário `(getValues(name))`.

### Sincronização do valor com `useEffect`

```tsx
useEffect(() => {
  setSelectedValue(value ?? "");
}, [value]);
```

- A sincronização entre o estado local e o valor do formulário é feita com `useEffect`. O efeito dispara sempre que o value `(vindo do watch)` muda, garantindo que o valor exibido no `Select` esteja sempre alinhado com o estado do formulário.

### Função de mudança do valor

```tsx
const handleSelectChange = (value: string) => {
  setSelectedValue(value);
  setValue(name, value); // Atualiza o valor no react-hook-form
};
```

- Quando o usuário altera o valor do `Select`, o estado local `selectedValue` é atualizado, e o valor do formulário também é atualizado com `setValue(name, value)`.

### Renderização do Componente

```tsx
    <Select onValueChange={handleSelectChange} value={selectedValue} disabled={disabled}>
        <SelectTrigger id={name} className={`
            ${error && "border-red-400"}
            ${disabled ? "bg-gray-100 cursor-not-allowed text-gray-500" : ""}
        `}>
            <SelectValue placeholder={placeholder}/>
        </SelectTrigger>
        <SelectContent>
            <SelectGroup >
                <SelectLabel>{selectLabel}</SelectLabel>
                {options.map((options, i)=>(
                    <div className="" key={i}>
                        <SelectItem value={options} >{options}</SelectItem>
                    </div>
                ))}
            </SelectGroup>
        </SelectContent>
    </Select>
```

- `onValueChange`: A função que é chamada quando o usuário escolhe uma opção.
- `value`: O valor do `Select`, controlado pelo estado `selectedValue`.
- `disabled`: Se `true`, o `Select` ficará desabilitado e o usuário não poderá interagir com ele.
- `SelectTrigger`: A parte visível do `Select`, onde o usuário vê o valor selecionado.
- `SelectValue`: Exibe o valor selecionado ou o `placeholder` caso não haja valor.
- `SelectContent`: Contém as opções do `Select`.
- `SelectItem`: Representa cada item dentro do dropdown, mapeado a partir de `options`.

### Exibição de erro

```tsx
{error && <p className="text-sm text-error">{error}</p>}
```

- Se houver erro de validação (passado como prop), ele será exibido abaixo do `Select`.

## ⚖️ Regras de Uso

- Utilize `name` igual ao campo do `useForm()`.
- O campo `disabled` pode ser passado diretamente para desabilitar o `Select`, impedindo a interação do usuário.
- A prop `error` deve ser usada para mostrar mensagens de erro após a validação.
- Ideal para campos de seleção com várias opções em formulários de cadastro ou edição de dados.
- **Não é necessário usar `register()` diretamente** com este componente, já que o valor é controlado manualmente com `setValue` e `watch`.
- Caso deseje usar `readOnly` ao invés de `disabled`, isso pode ser feito com controle visual (sem usar disabled diretamente).

## 💻 Exemplo de Uso

```tsx
<InputSelect
  name="estado"
  label="Estado"
  selectLabel="Selecione um estado"
  placeholder="Escolha"
  options={["SP", "RJ", "MG", "ES"]}
  error={errors?.estado?.message}
  disabled={false}
/>
```

## 🧪 Validações

- As validações devem ser feitas no schema do Yup (ex: obrigatoriedade, validade do valor).


## 🚫 Limitações

- Não suporta máscaras ou comportamentos dinâmicos (como o campo InputWithMask).