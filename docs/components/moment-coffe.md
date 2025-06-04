# 📁 Documentação do Componente `MomentCoffe`

## 📁 Localização
`/components/moment-coffe.components.tsx`

---

## 📊 Visão Geral

O `MomentCoffe` é um componente visual usado para exibir mensagens amigáveis, geralmente em estados vazios de páginas (ex: nenhuma solicitação pendente).

Ele combina ícones, uma mensagem central e uma ilustração leve para transmitir que "está tudo certo" no momento.

---

## 🔧 Props Aceitas

| Prop         | Tipo        | Descrição                                                                 | Padrão |
|--------------|-------------|---------------------------------------------------------------------------|--------|
| `mensagem`   | `string`    | Mensagem principal que será exibida no centro do componente               | —      |
| `applyColor` | `boolean`   | Define se o fundo branco e sombra serão aplicados                        | `true` |

---

## 🎨 Composição Visual

- Ícone: `Coffee` da lib `lucide-react`
- Mensagem central em destaque (`<h2>`)
- Submensagem em cinza claro
- Emoji `☕` com animação `bounce`

---

### 🎨 Estilos Dinâmicos

O componente aplica classes extras de estilo somente se `applyColor` for `true`:

```tsx
${applyColor && "shadow-lg bg-white"}
```

Isso permite reutilizar o componente em contextos com ou sem fundo.

---

## ⚖️ Regras de Uso

- Ideal para telas de estado vazio ou mensagens de sucesso
- Pode ser reutilizado em qualquer layout que deseje transmitir leveza
- A mensagem passada por prop deve ser curta e direta

---

## 💻 Exemplo de Uso

```tsx
import { MomentCoffe } from "@/components/moment-coffe.components";

<MomentCoffe mensagem="Nenhuma solicitação pendente no momento" />
```

---

## 🧠 Por que usar este componente?

- 🧼 Melhora a experiência do usuário em páginas sem conteúdo
- 🎯 Facilita a padronização de mensagens de estado
- ⚙️ Reutilizável com controle visual (`applyColor`)
