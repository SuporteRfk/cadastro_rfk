# 📁 Documentação do Componente `FormProductDescription`

## 📁 Localização
`/components/form/form-product-description.componentes.tsx`

---

## 📊 Visão Geral

O componente `FormProductDescription` é responsável por renderizar campos relacionados à **descrição do produto**, seu **uso** e **nome científico**, com opção de exibir instruções de preenchimento para padronização e clareza dos dados inseridos.

---

## 🧩 Props Aceitas

| Prop                   | Tipo                            | Descrição                                                                 |
|------------------------|----------------------------------|-----------------------------------------------------------------------------|
| `mode`                 | `"editing"` \| `"viewing"` \| `"reviewing"` | Define o modo de uso do formulário.                                   |
| `methods`              | `UseFormReturn<T>`              | Objeto do `react-hook-form` com métodos de controle de campos.            |
| `viewInstructions`     | `boolean`                        | Exibe instruções de preenchimento dos campos.                             |
| `viewKeyUseProduct`    | `boolean`                        | Controla a exibição do campo "Uso do Produto".                            |
| `viewKeyNameScientific`| `boolean`                        | Controla a exibição do campo "Nome Científico".                           |

---

## 🧠 Campos Renderizados

| Campo              | Tipo   | Ícone              | Visibilidade                        |
|--------------------|--------|--------------------|-------------------------------------|
| descricao_curta    | `Input`| `ClipboardPenLine` | Sempre                              |
| descricao_uso      | `Input`| `ClipboardPenLine` | Condicional (`viewKeyUseProduct`)   |
| nome_cientifico    | `Input`| `Atom`             | Condicional (`viewKeyNameScientific`)|

Todos os campos são renderizados dentro de `SafeReviewField`, que define se o campo estará editável ou somente leitura com base no `mode`.

---

## ℹ️ Instruções Renderizadas

Se `viewInstructions` for verdadeiro:

- Exibe orientações padronizadas para preenchimento da descrição e nome científico.
- Ex: Abreviação com 2 letras (VT) para “Vinho Tinto” e 3 letras (ESP) para nomes únicos como “Espumante”.

---

## 🔗 Conexões

- `Input`: componente base de entrada de dados
- `SafeReviewField`: renderiza o campo com base no modo de formulário
- `FormSection`: estrutura responsiva do layout
- Ícones `ClipboardPenLine` e `Atom` da biblioteca `lucide-react`

---

## 💻 Exemplo de Uso

```tsx
<FormProductDescription
  mode="editing"
  methods={methods}
  viewInstructions={true}
  viewKeyUseProduct={true}
  viewKeyNameScientific={true}
/>
```

---

## 🧠 Por que usar este componente?

- 🧩 Agrupa campos descritivos e científicos em um único componente reutilizável
- 📝 Garante padronização com instruções embutidas
- 🔐 Adapta-se a diferentes modos de uso com `SafeReviewField`
- 🔄 Flexível: renderiza somente os campos necessários com base em `props`
