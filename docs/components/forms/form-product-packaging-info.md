# 📁 Documentação do Componente `FormProductPackagingInfo`

## 📁 Localização
`/components/form/form-product-packaging-info.components.tsx`

---

## 📊 Visão Geral

O componente `FormProductPackagingInfo` é responsável por renderizar campos relacionados às **informações de embalagem do produto**, incluindo:

- Armazém padrão
- Tamanho da embalagem
- Tipo de embalagem

O componente adapta-se aos modos de uso (`editing`, `viewing`, `reviewing`) e respeita o controle de formulário via `react-hook-form`.

---

## 🧩 Props Aceitas

| Prop                  | Tipo                            | Descrição                                                              |
|-----------------------|----------------------------------|------------------------------------------------------------------------|
| `mode`                | `"editing"` \| `"viewing"` \| `"reviewing"` | Define o modo atual do componente.                         |
| `methods`             | `UseFormReturn<T>`              | Objeto de controle do `react-hook-form`.                              |
| `valueInitialStorage` | `string`                        | Valor inicial (pré-preenchido) do campo "Armazém Padrão".             |

---

## 🧠 Campos Renderizados

### 1. `armazem_padrao`
- Label: "Armazém Padrão"
- Tipo: `Input`
- Ícone: `Warehouse`
- Pode receber valor inicial via `valueInitialStorage`
- ReadOnly em modos `viewing` ou `reviewing`

### 2. `tamanho_embalagem`
- Label: "Tamanho da Embalagem"
- Tipo: `Input`
- Ícone: `Expand`
- Modo controlado por `SafeReviewField`

### 3. `tipo_embalagem`
- Label: "Tipo de Embalagem"
- Tipo: `Input`
- Ícone: `Box`
- Campo de preenchimento livre

---

## 🔗 Conexões

- `Input`: componente de campo de entrada
- `SafeReviewField`: alterna entre modos de edição, visualização e revisão
- `FormSection`: estrutura visual em colunas flexíveis
- Ícones: `Warehouse`, `Expand`, `Box` da `lucide-react`

---

## 💻 Exemplo de Uso

```tsx
<FormProductPackagingInfo
  mode="editing"
  methods={methods}
  valueInitialStorage="Armazém Central"
/>
```

---

## 🧠 Por que usar este componente?

- 📦 Agrupa campos de embalagem em um único bloco reutilizável
- 🔐 Respeita diferentes estados de formulário com `SafeReviewField`
- 🎯 Otimiza a experiência do usuário com ícones e placeholders semânticos
