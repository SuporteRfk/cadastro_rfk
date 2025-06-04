# Documentação do `ReviewField`

## 📁 Localização
`/src/components/review-field/review-field.components.tsx`

## 📊 Visão Geral

O componente `ReviewField` permite que campos de formulários entrem em **modo de revisão**, onde o revisor pode marcar campos específicos, adicionar comentários e visualizar posteriormente os motivos de revisão.

É um recurso essencial para fluxos de aprovação ou revisão colaborativa de dados, sendo altamente integrado ao `ReviewContext`.

## 🔎 Detalhes Técnicos

### 🎯 Props Recebidas

| Prop      | Tipo             | Descrição                                                                 |
|-----------|------------------|--------------------------------------------------------------------------|
| `children`| `ReactNode`      | O campo de formulário a ser envolvido (ex: input, select, etc).          |
| `field`   | `string`         | Identificador único do campo (chave para salvar/recuperar o motivo).     |
| `mode`    | `FormStateType`  | Estado atual do formulário: `viewing`, `editing`, `reviewing`, etc.     |

---

### 🧠 Lógica Interna

- A revisão é visível apenas no modo `reviewing` ou `viewing` (com motivo registrado).
- Quando marcado para revisão, exibe uma `textarea` onde o revisor insere o motivo.
- Se o motivo estiver vazio e `showError` estiver ativo no contexto, exibe mensagem de erro.
- Em `viewing`, exibe um aviso visual com o motivo da revisão (alerta amarelo).

```tsx
const showTextarea = mode === "reviewing" && isFieldInReview(field);
const isViewAndHasReason = mode === "viewing" && reviewFields[field];
```

---

### 📦 Interação com o Contexto

- `useReview()` provê:
  - `isFieldInReview(field)`
  - `setFieldReview(field, motivo)`
  - `reviewFields` (mapa de motivos)
  - `showError` (controle global de erro em revisões)

---

### ✅ Comportamentos importantes

- Marca/desmarca o campo com um `Checkbox`.
- Salva dinamicamente o motivo digitado.
- Oferece botão para apagar a revisão de um campo.

---

## ⚖️ Regras de Uso

- Deve ser utilizado dentro de um `ReviewProvider`.
- Ideal para qualquer campo de formulário passível de revisão.
- `field` deve ser único por formulário para evitar conflitos.

---

## 💻 Exemplo de Uso

```tsx
<ReviewField mode={mode} field="nome">
  <Input name="nome" />
</ReviewField>
```

---

## 📚 Integração com o contexto

- Totalmente dependente do `ReviewContext` para funcionar corretamente.
- Usa o contexto para marcar campos, armazenar razões e gerenciar estados globais.



