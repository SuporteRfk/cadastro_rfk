# 📁 Documentação do Componente `FormActionsButtonsRequest`

## 📁 Localização
`/components/form/form-actions-buttons-request.components.tsx`

---

## 📊 Visão Geral

O `FormActionsButtonsRequest` é um componente de botões de ação para formulários, responsável por gerenciar o **salvamento de dados com confirmação** e a **volta ao modo de visualização** (`viewing`). Ele se integra ao `ModalContext` para exibir um modal de confirmação antes de executar a função `onConfirm`.

---

## 🧩 Props Aceitas

| Prop               | Tipo                                       | Descrição |
|--------------------|--------------------------------------------|-----------|
| `mode`             | `"editing"` \| `"viewing"` \| `"reviewing"`| Define o estado atual do formulário. |
| `setMode`          | `(mode: FormStateType) => void`            | Altera o modo de exibição. |
| `methods`          | `UseFormReturn<T>`                         | Objeto de controle do `react-hook-form`. |
| `modalKey`         | `string` (opcional)                        | Chave para identificar o modal aberto. |
| `confirmMessage`   | `string` (opcional)                        | Mensagem do modal de confirmação. |
| `onConfirm`        | `(data: T) => void`                        | Função executada após confirmação. |
| `saveButtonLabel`  | `string` (opcional, padrão: "Salvar")      | Texto do botão de salvar. |
| `cancelButtonLabel`| `string` (opcional, padrão: "Cancelar")    | Texto do botão de cancelar. |

---

## ⚙️ Comportamento

- Quando `mode === "viewing"`, o componente **não renderiza** nada.
- Renderiza dois botões:
  - **Cancelar:** volta ao modo de visualização (`setMode("viewing")`)
  - **Salvar:** executa `handleSubmit` do `react-hook-form`, e ao submeter com sucesso, **abre um modal de confirmação** via `ModalContext`. Ao confirmar, chama `onConfirm` com os dados validados.

---

## 🔗 Conexões

- `ModalContext`: Usado para abrir o modal de confirmação.
- `react-hook-form`: Utilizado para obter e validar os dados do formulário.
- `Button`: Componente reutilizável de botão.

---

## 💻 Exemplo de Uso

```tsx
<FormActionsButtonsRequest
  mode={mode}
  setMode={setMode}
  methods={methods}
  onConfirm={(data) => salvarRequisicao(data)}
/>
```

---

## 🧠 Por que usar este componente?

- 🔒 Garante que dados só são salvos após confirmação explícita do usuário.
- 🔁 Promove consistência de layout e comportamento em formulários com ações sensíveis.
- 📦 Encapsula a lógica de controle de modo, envio e modal em um único lugar.
