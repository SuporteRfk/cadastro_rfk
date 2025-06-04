# 📁 Documentação do Componente `FormWeights`

## 📁 Localização
`/components/form/form-weights.components.tsx`

---

## 📊 Visão Geral

O componente `FormWeights` é responsável por capturar os valores de **peso bruto e peso líquido** de um item ou insumo. Ele se adapta aos modos `editing`, `viewing` e `reviewing`, garantindo consistência na exibição e edição dos dados.

---

## 🧩 Props Aceitas

| Prop      | Tipo                          | Descrição                                         |
|-----------|-------------------------------|--------------------------------------------------|
| `mode`    | `"editing"` \| `"viewing"` \| `"reviewing"` | Define o comportamento dos campos.       |
| `methods` | `UseFormReturn<T>`            | Objeto do `react-hook-form` usado para controle. |

---

## ⚖️ Campos Renderizados

| Campo         | Nome do Field | Componente | Ícone  | Modo de Controle          |
|---------------|----------------|-------------|--------|----------------------------|
| Peso Bruto    | `peso_bruto`   | `InputDecimal` | `Weight` (lucide) | `SafeReviewField`         |
| Peso Líquido  | `peso_liquido` | `InputDecimal` | `Weight` (lucide) | `SafeReviewField`         |

Ambos os campos:
- Possuem placeholders e labels descritivos.
- Mostram mensagens de erro em caso de falhas de validação.
- Respeitam o modo do formulário (read-only se não estiver em `editing`).

---

## 🔗 Conexões

- `InputDecimal`: Campo de entrada decimal personalizado.
- `SafeReviewField`: Alterna entre edição, visualização e revisão.
- `FormSection`: Agrupa os campos horizontalmente.
- `lucide-react`: Ícones de peso (`Weight`).

---

## 💻 Exemplo de Uso

```tsx
<FormWeights
  mode="editing"
  methods={methods}
/>
```

---

## 🧠 Por que usar este componente?

- ⚖️ Agrupa os pesos em um único bloco reutilizável.
- 🔁 Adapta-se ao estado do formulário com precisão.
- 🧼 Ajuda a manter consistência visual e validação centralizada.
