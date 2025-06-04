# 📁 Documentação do Componente `FormValidity`

## 📁 Localização
`/components/form/form-validity.components.tsx`

---

## 📊 Visão Geral

O componente `FormValidity` gerencia campos relacionados à **validade do produto** e parâmetros de **lotes mínimos e econômicos**. Ele se adapta aos modos `editing`, `viewing` e `reviewing`, garantindo consistência na exibição e edição dos dados.

---

## 🧩 Props Aceitas

| Prop      | Tipo                          | Descrição                                         |
|-----------|-------------------------------|--------------------------------------------------|
| `mode`    | `"editing"` \| `"viewing"` \| `"reviewing"` | Define o comportamento dos campos.       |
| `methods` | `UseFormReturn<T>`            | Objeto do `react-hook-form` usado para controle. |

---

## 🧪 Campos Renderizados

| Campo                 | Nome do Field     | Componente     | Ícone              |
|----------------------|-------------------|----------------|--------------------|
| Tipo de Prazo        | `tipo_prazo`      | `InputSelect`  | —                  |
| Prazo de Validade    | `prazo_validade`  | `Input`        | `Clock`            |
| Lote Econômico       | `lote_economico`  | `Input`        | `Boxes`            |
| Lote Mínimo          | `lote_minimo`     | `Input`        | `PackageMinus`     |

Todos os campos usam `SafeReviewField` para alternar entre os modos de exibição e edição, e exibem erros de validação via `formState.errors`.

---

## 🔗 Conexões

- `Input`, `InputSelect`: Campos personalizados para entrada de dados e seleção.
- `SafeReviewField`: Alterna entre edição, visualização e revisão.
- `FormSection`: Agrupa os campos horizontalmente.
- Ícones do `lucide-react`: `Clock`, `Boxes`, `PackageMinus`.
- Enum `ValidityPeriod` (do projeto): Preenche as opções de `tipo_prazo`.

---

## 💻 Exemplo de Uso

```tsx
<FormValidity
  mode="editing"
  methods={methods}
/>
```

---

## 🧠 Por que usar este componente?

- 🧪 Centraliza informações de validade e lotes do produto
- 🔁 Facilita manutenção e reutilização de lógica em diferentes formulários
- 🧼 Garante consistência visual e integração total com `react-hook-form`
