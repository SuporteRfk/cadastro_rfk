# 📁 Documentação do Componente `FormBusinessNames`

## 📁 Localização
`/components/form/form-business-names.components.tsx`

---

## 📊 Visão Geral

O `FormBusinessNames` é um componente responsável por exibir os campos de **Razão Social** e **Nome Fantasia** de uma empresa no formulário de cadastro de cliente ou fornecedor.

Utiliza renderização condicional com base no modo atual (`editing`, `viewing`, `reviewing`), permitindo que os campos sejam apenas visualizados ou editados conforme o fluxo do sistema.

---

## 🧩 Props Aceitas

| Prop      | Tipo                            | Descrição                                                |
|-----------|----------------------------------|------------------------------------------------------------|
| `mode`    | `"editing"` \| `"viewing"` \| `"reviewing"` | Define o modo de exibição do formulário.                  |
| `methods` | `UseFormReturn<T>`              | Objeto do `react-hook-form` com métodos e estados do formulário. |

---

## 🧠 Campos Renderizados

### 1. Razão Social (`razao_social`)
- Componente: `Input`
- Ícone: `BriefcaseBusiness` (lucide-react)
- Validação com base no `react-hook-form`

### 2. Nome Fantasia (`nome_fantasia`)
- Componente: `Input`
- Ícone: `Factory` (lucide-react)

Ambos são encapsulados em `SafeReviewField` para adaptar seu comportamento com base no modo (`mode`), permitindo:

| Mode         | Comportamento               |
|--------------|-----------------------------|
| `editing`    | Campo editável              |
| `viewing`    | Campo somente leitura       |
| `reviewing`  | Campo somente leitura       |

---

## 🧱 Layout

- Os campos são renderizados lado a lado em telas maiores usando `xl:flex-row`
- Utiliza `FormSection` para manter consistência visual

---

## 🔗 Conexões

- `Input`: componente base de entrada
- `SafeReviewField`: renderiza campo com suporte a leitura e revisão
- `FormSection`: componente de agrupamento e layout visual

---

## 💻 Exemplo de Uso

```tsx
<FormBusinessNames
  mode="editing"
  methods={methods}
/>
```

---

## 🧠 Por que usar este componente?

- 🧩 Modulariza os campos mais comuns de identificação empresarial
- 🔐 Garante consistência visual e funcional em modos de visualização e revisão
- ♻️ Facilita reuso e manutenção dentro de formulários mais complexos
