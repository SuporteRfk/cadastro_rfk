# 📁 Documentação do Hook (`useReviewRequest`)

### 📁 Localização

`/hooks/use-review-request.hook.ts`

---

## 📊 Visão Geral

O `useReviewRequest` é um hook customizado responsável por **enviar uma solicitação para revisão**. Ele atualiza o status da solicitação para `REVISAO`, adiciona a justificativa (campos pendentes) e registra o usuário responsável pela ação.

---

## 📦 Parâmetros Recebidos pela Função

A função retornada pelo hook (`handleReviewRequest`) recebe:

| Parâmetro         | Tipo                                             | Descrição                                                                 |
|-------------------|--------------------------------------------------|---------------------------------------------------------------------------|
| `viewRequestId`   | `number`                                         | ID da solicitação a ser revisada.                                        |
| `setLoadingModal` | `Dispatch<SetStateAction<boolean>>`             | Controla estado visual de carregamento.                                  |
| `setMode`         | `Dispatch<SetStateAction<FormStateType>>`       | Define o modo atual do formulário (ex: `"viewing"`).                      |
| `setStatusLocal`  | `Dispatch<SetStateAction<StatusRequest>>`       | Atualiza o status local da interface após revisão.                        |

---

## ⚙️ Detalhes Técnicos

- Chama `updateRequestService` com:
  - `status`: `REVISAO`
  - `observacao`: `"Existem campos a serem revisados"`
  - `motivo_recusa`: recebe diretamente os `reviewFields` do `ReviewContext`
  - `novo_solicitante`: inclui data, departamento, nome e operação
- Mostra mensagem de sucesso com `Toastify`
- Em caso de erro, chama `handleApiError` com mensagem específica
- No `finally`, desativa o `loading` e ajusta status e modo da tela

---

## 💻 Exemplo de Uso

```tsx
const handleReview = useReviewRequest();

await handleReview({
  viewRequestId: 789,
  setLoadingModal,
  setMode,
  setStatusLocal
});
```

---

## 🔗 Conexões

- `AuthContext`: fornece dados do usuário responsável
- `ReviewContext`: fornece os campos de revisão (`reviewFields`)
- `updateRequestService`: executa a atualização no Supabase
- `Toastify`: exibe mensagem de confirmação
- `handleApiError`: trata e exibe falhas

---

## ⚖️ Regras de Uso

- Só deve ser chamado quando houver campos de revisão pendentes
- Requer contexto de autenticação e de revisão ativos
- Garante que o histórico da revisão seja completo e rastreável

---

## 🧠 Por que usar esse hook?

- 📋 Centraliza a lógica de envio para revisão
- 🔁 Garante rastreabilidade da decisão com campos e usuário
- 🚦 Controla status da UI e fornece feedback visual
- 🧼 Reduz duplicação em múltiplos formulários
