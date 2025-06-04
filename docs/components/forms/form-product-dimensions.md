# 📁 Documentação do Componente `FormProductDimensions`

## 📁 Localização
`/components/form/form-product-dimensions.components.tsx`

---

## 📊 Visão Geral

O componente `FormProductDimensions` é responsável por renderizar os campos de **dimensões físicas do produto**, contemplando:

- Medidas do **fardo** (profundidade, largura e altura)
- Medidas alternativas (chamadas de "segunda dimensão") que variam conforme o tipo de formulário (`copacker`, `unitário`, etc.)

O componente utiliza um sistema de configuração (`ConfigSecondDimensions`) que adapta dinamicamente os labels e os campos renderizados conforme o contexto de uso.

---

## 🧩 Props Aceitas

| Prop                   | Tipo                            | Descrição                                                                 |
|------------------------|----------------------------------|---------------------------------------------------------------------------|
| `mode`                 | `"editing"` \| `"viewing"` \| `"reviewing"` | Define o modo do componente (editável ou visual).            |
| `methods`              | `UseFormReturn<T>`              | Objeto do `react-hook-form` com controle dos campos.                      |
| `configSecondDimensions` | `"formCopacker"` \| `"formPABurden"` \| `"formPaUnitary"` | Chave para selecionar o conjunto de labels e campos da "segunda dimensão".|

---

## ⚙️ Comportamento Interno

- As dimensões do **fardo** são sempre exibidas.
  - Campos: `profundidade_fardo`, `largura_fardo`, `altura_fardo`
- As **segundas dimensões** são renderizadas com base na prop `configSecondDimensions`.
  - Labels e nomes dos campos são definidos dinamicamente via `ConfigSecondDimensions`

### 📦 ConfigSecondDimensions

```ts
{
  formCopacker: {
    profundidade_outro, largura_outro, altura_outro
  },
  formPABurden: {
    profundidade_unitario, largura_unitario, altura_unitario
  },
  formPaUnitary: {
    profundidade_unitario, largura_unitario, altura_unitario
  }
}
```

Cada configuração define:
- `label`: texto do campo
- `placeholder`: dica do campo
- `nameRegister`: nome do campo no formulário

---

## 🔗 Conexões

- `InputDecimal`: campo numérico com controle de casas decimais
- `SafeReviewField`: alterna entre modo de edição ou visualização
- `FormSection`: estrutura responsiva para layout dos campos
- Ícones: `Move3D`, `MoveHorizontal`, `MoveVertical` (representam profundidade, largura e altura)

---

## 💻 Exemplo de Uso

```tsx
<FormProductDimensions
  mode="editing"
  methods={methods}
  configSecondDimensions="formCopacker"
/>
```

---

## 🧠 Por que usar este componente?

- 📦 Modulariza toda a lógica de dimensões do produto
- 🧠 Adapta-se dinamicamente ao tipo de produto via config
- 🔄 Evita repetição de código e melhora reutilização
- 🔐 Garante consistência de experiência entre modos de formulário
