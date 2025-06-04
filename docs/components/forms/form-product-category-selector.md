# 📁 Documentação do Componente `FormProductCategorySelector`

## 📁 Localização
`/components/form/form-product-category-selector.components.tsx`

---

## 📊 Visão Geral

O componente `FormProductCategorySelector` é responsável por renderizar os campos relacionados à **classificação do produto**, permitindo a seleção de:

- Família do produto
- Grupo do produto
- Tipo do produto

Essas classificações são geralmente utilizadas para **categorizar produtos** de forma hierárquica e facilitar relatórios, agrupamentos ou buscas no sistema.

---

## 🧩 Props Aceitas

| Prop      | Tipo                            | Descrição                                                     |
|-----------|----------------------------------|----------------------------------------------------------------|
| `mode`    | `"editing"` \| `"viewing"` \| `"reviewing"` | Define o modo do formulário.                              |
| `family`  | `string[]`                      | Lista de opções disponíveis para o campo "Família do produto". |
| `group`   | `string[]`                      | Lista de opções disponíveis para o campo "Grupo do produto".   |
| `type`    | `string[]`                      | Lista de opções disponíveis para o campo "Tipo do produto".    |
| `methods` | `UseFormReturn<T>`              | Objeto do `react-hook-form` contendo métodos e estados.        |

---

## 🧠 Campos Renderizados

### 1. `codigo_familia`
- Componente: `InputSelect`
- Label: "Família do produto"
- Fonte: `props.family`
- Controlado via `SafeReviewField`

### 2. `codigo_grupo`
- Componente: `InputSelect`
- Label: "Grupo do produto"
- Fonte: `props.group`
- Controlado via `SafeReviewField`

### 3. `tipo`
- Componente: `InputSelect`
- Label: "Tipo do produto"
- Fonte: `props.type`
- Controlado via `SafeReviewField`

Todos os campos respeitam o modo definido (`mode`) para ficarem editáveis ou apenas visuais.

---

## 🔗 Conexões

- `InputSelect`: componente de seleção com rótulo e opções
- `SafeReviewField`: permite renderização condicional por modo
- `FormSection`: layout padronizado para seções de formulário

---

## 💻 Exemplo de Uso

```tsx
<FormProductCategorySelector
  mode="editing"
  methods={methods}
  family={["F01", "F02"]}
  group={["G01", "G02"]}
  type={["T01", "T02"]}
/>
```

---

## 🧠 Por que usar este componente?

- 🧩 Organiza de forma modular os campos de categoria do produto
- 🔄 Altamente reutilizável com base nas props recebidas
- 🔐 Controla modos de visualização e revisão com `SafeReviewField`
