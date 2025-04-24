# Documentação do Componente `Button`

## 📁 Localização
`/components/button.components.tsx`

## 📊 Visão Geral

O componente `Button` é reutilizável e responsável por renderizar um botão estilizado com diferentes variantes, tamanhos e estados. Ele pode ser usado em toda a aplicação e é compatível com qualquer tipo de interação.

- ✅ Suporte a loading (`isLoading`)
- ✅ Controle de estados (`disabled`)
- ✅ Estilização via variantes (`primary`, `secondary`, `ghost`, etc.)
- ✅ Possibilidade de inserir ícones

## 🔎 Detalhes de Implementação

### `...rest` nas Props
O componente extende `ButtonHTMLAttributes<HTMLButtonElement>`, o que permite o uso de qualquer prop nativa de `<button>`. O uso de `...rest` garante que essas props adicionais sejam aplicadas corretamente:
```tsx
<button
  onClick={onClick}
  {...rest} // Aplica qualquer outra prop (type, name, aria-*, etc)
>
```

### Variantes e Estilização
As variantes são definidas por meio do objeto `variantStyles`, que mapeia estilos CSS para tipos diferentes de botão:

```tsx
const variantStyles = {
  primary: "bg-accent text-white-default hover:bg-accent-hover",
  secondary: "bg-medium/60 text-gray-700 hover:bg-gray-300",
  ghost: "bg-transparent text-text-strong hover:bg-neutral/10",
  danger: "bg-error text-white-default hover:bg-red-600",
  outline: "bg-transparent border-2 border-accent text-accent hover:bg-accent hover:text-white-default"
};
```

### Estado de Carregamento (Loading)
O estado `isLoading` renderiza um spinner animado no lugar do conteúdo normal:

```tsx
{isLoading ? (
  <Loader2 className="animate-spin h-5 w-5" />
) : (
  <>
    {Icon && <Icon size={styleIcon.size} color={styleIcon.color} />}
    {text}
  </>
)}
```

## ✨ Props Aceitas

| Prop         | Tipo                                                                                            | Descrição                                                       |
|--------------|-------------------------------------------------------------------------------------------------|-----------------------------------------------------------------|
| `text`       | `string`                                                                                        | Texto exibido dentro do botão                                   |
| `isLoading`  | `boolean` (opcional)                                                                            | Exibe spinner de carregamento                                   |
| `sizeWidth`  | `string` (opcional, default: `w-full`)                                                          | Classe personalizada de largura (ex: `w-full`, `w-[200px]`)     |
| `iconInText` | `React.ElementType` (opcional)                                                                  | Ícone opcional ao lado do texto                                 |
| `styleIcon`  | `{ size?: number; color?: string }` (opcional, default: { size:`20`,color:`var(color-strong)`}) | Define tamanho e cor do ícone                                   |
| `variant`    | `primary` | `secondary` | `ghost` | `danger` | `outline` (opcional, default: `primary`)         | Define o estilo visual do botão                                 |
| `title`      | `string` (opcional)                                                                             | Define atributo `title` (tooltip e acessibilidade)              |
| `roudend`    | `string` (opcional, default: `rounded-lg`)                                                      | Define as bordas do botão (ex: `rounded-xl`, `rounded-full`)    |

Além dessas, todas as props nativas de `<button>` também são aceitas por conta do uso de `ButtonHTMLAttributes`.

## ⚖️ Regras de Uso

- Sempre utilize `text` para o texto principal do botão.
- Use `variant` para definir a intenção visual (primário, secundário, alerta, etc).
- Prefira `title` para acessibilidade ao invés de `aria-label` manual.
- `isLoading` desativa automaticamente o clique e mostra um loading spinner.

## 💻 Exemplo de Uso
```tsx
<Button 
  text="Salvar"
  variant="primary"
  iconInText={SaveIcon}
  styleIcon={{ size: 18, color: "#fff" }}
  isLoading={false}
  onClick={handleSave}
/>
```

---

Este componente deve ser usado como botão padrão em toda a aplicação. Evite criar variações soltas ou duplicar estilos manualmente fora dele.