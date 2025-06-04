# 📁 Documentação do Hook (`useRequestApprove`)

### 📁 Localização

`/hooks/use-request-approve.hook.ts`

---

## 📊 Visão Geral

O `useRequestApprove` é um hook customizado que encapsula a lógica de **aprovação de uma solicitação**. Ele realiza a atualização do status da requisição no Supabase, registra o usuário responsável e emite feedback visual via `Toastify`.

---

## 📦 Parâmetros Recebidos pela Função

A função `handleApproveRequest` retornada pelo hook recebe:

| Parâmetro         | Tipo                                             | Descrição                                                                 |
|-------------------|--------------------------------------------------|---------------------------------------------------------------------------|
| `viewRequestId`   | `number`                                         | ID da solicitação que será aprovada.                                     |
| `setLoadingModal` | `Dispatch<SetStateAction<boolean>>`             | Controla o estado visual de carregamento.                                |
| `setMode`         | `Dispatch<SetStateAction<FormStateType>>`       | Altera o modo do formulário para `viewing`.                              |
| `setStatusLocal`  | `Dispatch<SetStateAction<StatusRequest>>`       | Atualiza o status local da UI para refletir a aprovação.                 |

---

## ⚙️ Detalhes Técnicos

- Usa `updateRequestService` para:
  - Alterar status para `APROVADO`
  - Registrar data, departamento, nome e operação executada
- O nome e departamento vêm do `AuthContext`
- Exibe `Toastify` de sucesso após aprovação
- Em caso de erro, utiliza `handleApiError` com mensagem customizada
- Garante boa experiência do usuário com `loading` e transição suave

---

## 💻 Exemplo de Uso

```tsx
const handleApprove = useRequestApprove();

await handleApprove({
  viewRequestId: 456,
  setLoadingModal,
  setMode,
  setStatusLocal
});
```

---

## 🔗 Conexões

- `updateRequestService`: atualiza a requisição no Supabase
- `AuthContext`: fornece dados do usuário para registro
- `Toastify`: exibe mensagem visual ao usuário
- `handleApiError`: mostra erro padronizado

---

## ⚖️ Regras de Uso

- Necessita estar envolvido por `AuthContext` (para obter usuário logado)
- Deve ser chamado com os controladores corretos de `setMode`, `setStatusLocal`, etc.
- Recomendado uso em componentes de revisão/aprovação de solicitações

---

## 🧠 Por que usar esse hook?

- 🔁 Evita duplicação de lógica de aprovação
- 🧼 Centraliza lógica de sucesso e fallback de erros
- 📋 Garante registro de operação no banco de forma rastreável
- 🚦 Fornece feedback imediato ao usuário
