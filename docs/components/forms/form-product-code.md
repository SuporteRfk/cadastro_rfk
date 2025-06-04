# 📁 Documentação do Componente `FormProductCode`

## 📁 Localização
`/components/form/form-product-code.components.tsx`

---

## 📊 Visão Geral

O componente `FormProductCode` é responsável por renderizar os campos relacionados aos **códigos de identificação de produtos**, incluindo:

- Código de barras principal (GTIN)
- Código de barras secundário (fardo, unitário, etc.)
- Código SAIB (sistema interno)

É altamente configurável e adaptável ao tipo de formulário utilizado.

---

## 🧩 Props Aceitas

| Prop                 | Tipo                                               | Descrição                                                                 |
|----------------------|----------------------------------------------------|---------------------------------------------------------------------------|
| `mode`               | `"editing"` \| `"viewing"` \| `"reviewing"`       | Define o modo do campo (editável, visualização ou revisão).               |
| `methods`            | `UseFormReturn<T>`                                | Objeto do `react-hook-form` com métodos do formulário.                    |
| `showOnlyCodeSaib`   | `boolean`                                          | Se verdadeiro, renderiza apenas o campo `código_saib`.                    |
| `showSecondCodeBar`  | `boolean`                                          | Controla a exibição do segundo campo de código de barras.                 |
| `configSecondCodeBar`| `"formPaThird" \| "formPABurden" \| "formPaUnitary"` | Define o rótulo, placeholder e campo do segundo código de barras.         |

---

## 🧠 Campos Renderizados

### 1. `codigo_barras` (GTIN)
- Renderizado se `showOnlyCodeSaib` for `false`
- Componente: `Input`
- Ícone: `Barcode`

### 2. Segundo código de barras (`segundo_codigo_barras`, `codigo_barras_unitario`, `codigo_barras_fardo`)
- Renderizado se `showSecondCodeBar === true`
- Campo dinâmico baseado em `configSecondCodeBar`

### 3. `codigo_saib`
- Sempre renderizado (exceto se `showOnlyCodeSaib === true`)
- Campo opcional
- Ícone: `Computer`

---

## 🔧 Comportamento Interno

- Renderiza campos em linha com `FormSection`
- Usa `SafeReviewField` para controle de modo (visualização, revisão, edição)
- Campos opcionais são definidos via `props` para adaptar o componente a múltiplos contextos

---

## 🔗 Conexões

- `Input`: componente base para campos de texto
- `SafeReviewField`: controla modo de exibição dos campos
- `ConfigSecondCodeBar`: dicionário interno com rótulos, placeholders e nomes para campos secundários

---

## 💻 Exemplo de Uso

```tsx
<FormProductCode
  methods={methods}
  mode="editing"
  showSecondCodeBar={true}
  configSecondCodeBar="formPABurden"
/>
```

---

## 🧠 Por que usar este componente?

- 📦 Agrupa logicamente os identificadores de produto
- 🧩 É altamente reutilizável com base em configuração
- 🔐 Adapta-se dinamicamente ao tipo de formulário e ao modo de uso
