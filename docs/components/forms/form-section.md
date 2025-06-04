# 📁 Documentação do Componente `FormSection`

## 📁 Localização
`/components/form/form-section.components.tsx`

---

## 📊 Visão Geral

O `FormSection` é um componente **container auxiliar** que organiza grupos de campos dentro de um formulário. Ele facilita o alinhamento e o espaçamento entre campos relacionados, seja em colunas ou em linhas.

---

## 🧩 Props Aceitas

| Prop       | Tipo             | Descrição                                        |
|------------|------------------|--------------------------------------------------|
| `children` | `ReactNode`      | Elementos filhos que serão agrupados.           |
| `className`| `string` (opcional) | Classes CSS adicionais para personalização.  |

---

## 🧱 Estrutura

```tsx
<div className="w-full flex flex-col {className}">
  {children}
</div>
```

Geralmente usado com classes como `flex-row`, `gap-4`, `mt-4`, etc. para alinhar campos horizontalmente ou ajustar espaçamentos.

---

## 💻 Exemplo de Uso

```tsx
<FormSection className="sm:flex-row gap-4">
  <Input ... />
  <Input ... />
</FormSection>
```

---

## 🔗 Conexões

- Usado frequentemente em conjunto com `FormLayout` e `SubTitleForm`.
- Atua como bloco visual para campos como `Input`, `DateInput`, `InputSelect`.

---

## 🧠 Por que usar este componente?

- 🧱 Padroniza o layout entre blocos de inputs.
- 🔁 Facilita manutenção e alinhamento em formulários complexos.
- 📦 Permite reutilização de estrutura com consistência visual.
