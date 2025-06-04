# 📁 Documentação do Componente `Button`

## 📁 Localização
`/components/button/button.components.tsx`

---

## 📊 Visão Geral

O componente `Button` é um botão reutilizável e altamente configurável, utilizado amplamente na aplicação. Ele oferece:

- ✅ Suporte a `loading`
- ✅ Controle de `disabled`
- ✅ Estilização via `variant`
- ✅ Inclusão de ícones
- ✅ Acessibilidade via `title` e `aria-label`

---

## 🔧 Props Aceitas

| Prop         | Tipo                                                                                            | Descrição                                                       |
|--------------|-------------------------------------------------------------------------------------------------|-----------------------------------------------------------------|
| `text`       | `string`                                                                                        | Texto exibido no botão                                          |
| `isLoading`  | `boolean` (opcional)                                                                            | Exibe um spinner de carregamento                               |
| `disabled`   | `boolean` (opcional)                                                                            | Desabilita o botão manualmente                                  |
| `variant`    | `"primary" \| "secondary" \| "ghost" \| "danger" \| "outline" \| "outlineDanger" \| "active"`    | Define o estilo visual do botão                                 |
| `sizeWidth`  | `string` (opcional, default: `"w-full"`)                                                        | Controla a largura com classe utilitária                        |
| `iconInText` | `React.ElementType` (opcional)                                                                  | Ícone opcional antes do texto                                   |
| `styleIcon`  | `{ size?: number; color?: string }` (opcional, default: `{ size: 20, color: 'var(--color-strong)' }`) | Define o estilo do ícone                                 |
| `title`      | `string` (opcional)                                                                             | Define o `title` do botão para acessibilidade                  |
| `roudend`    | `string` (opcional, default: `"rounded-lg"`)                                                    | Define o raio das bordas (aceita classes como `rounded-xl`)     |
| `...rest`    | `ButtonHTMLAttributes<HTMLButtonElement>`                                                       | Todas as props nativas do `<button>`                            |


## 🎨 Variantes Visuais

Os estilos são definidos com base em `variant`:

```ts
const variantStyles = {
  primary: "bg-accent/80 text-white-default hover:bg-accent",
  secondary: "bg-medium/50 text-text-medium hover:bg-gray-300 border-transparent",
  ghost: "bg-transparent text-text-strong hover:bg-neutral/10",
  danger: "bg-error text-white-default hover:bg-red-600",
  outline: "bg-transparent hover:bg-accent border-2 border-accent text-accent hover:text-white-default",
  outlineDanger: "bg-transparent hover:bg-error/80 border-2 border-error text-error hover:text-white-default",
  active: "bg-[#138496] text-white-default border-2 border-[#138496]"
};
```


## 🔁 Comportamento

- Quando `isLoading = true`, exibe `<Loader2 className="animate-spin" />` no lugar do conteúdo
- Quando `disabled = true` ou `isLoading = true`, aplica classes de desativação:

```tsx
disabled || isLoading
  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
  : variantStyles[variant]
```


## 🔐 Acessibilidade

- Usa `title` para tooltip
- Define automaticamente `aria-label={title || text}`


## 💻 Exemplo de Uso

```tsx
<Button 
  text="Salvar"
  variant="primary"
  iconInText={SaveIcon}
  styleIcon={{ size: 18, color: "#fff" }}
  isLoading={false}
  title="Salvar alterações"
  onClick={handleSave}
/>
```


## ⚖️ Regras de Uso

- Sempre defina `text` como conteúdo principal do botão
- Use `variant` conforme o contexto visual e semântico da interface
- Combine `iconInText` com `styleIcon` para padronizar ícones
- `isLoading` deve ser usado para evitar interações duplas
- Prefira `title` para acessibilidade ao invés de `aria-*` manual


Este botão é o padrão visual da aplicação. Evite criar variações manuais fora deste componente.
