# 📁 Documentação do Hook (`useDeniedRequest`)

### 📁 Localização

`/hooks/use-denied-request.hook.ts`

---

## 📊 Visão Geral

O `useDeniedRequest` é um hook customizado que encapsula a lógica para **negar uma solicitação**, atualizando seu status no Supabase, armazenando a justificativa e exibindo um feedback visual.

---

## 📦 Parâmetros Recebidos pela Função

A função retornada pelo hook (`handleDenyRequest`) recebe:

| Parâmetro         | Tipo                                             | Descrição                                                                 |
|-------------------|--------------------------------------------------|---------------------------------------------------------------------------|
| `viewRequestId`   | `number`                                         | ID da solicitação a ser atualizada.                                      |
| `observation`     | `string`                                         | Texto de justificativa da negação.                                       |
| `setLoadingModal` | `Dispatch<SetStateAction<boolean>>`             | Controla loading do modal de processo.                                   |
| `setMode`         | `Dispatch<SetStateAction<FormStateType>>`       | Altera o modo do formulário (ex: para "viewing").                        |
| `setStatusLocal`  | `Dispatch<SetStateAction<StatusRequest>>`       | Atualiza o status local da requisição para refletir a negação.           |

---

## ⚙️ Detalhes Técnicos

- Chama `updateRequestService` para atualizar o status da solicitação para `NEGADO`
- Inclui informações do usuário logado (`departamento`, `nome`) no campo `novo_solicitante`
- Usa `Toastify` para exibir notificação de sucesso
- Em caso de erro, utiliza `handleApiError` para exibir mensagem padronizada
- O loading do modal é ativado e desativado antes/depois da requisição
- O modo do formulário é setado para `"viewing"` após a operação

---

## 💻 Exemplo de Uso

```tsx
const handleDenyRequest = useDeniedRequest();

await handleDenyRequest({
  viewRequestId: 123,
  observation: "Produto incorreto",
  setLoadingModal,
  setMode,
  setStatusLocal
});
```

---

## 🔗 Conexões

- `AuthContext`: usado para obter nome e departamento do usuário atual
- `updateRequestService`: serviço responsável pela atualização no Supabase
- `Toastify`: exibe notificação visual de sucesso
- `handleApiError`: trata exceções de forma padronizada

---

## ⚖️ Regras de Uso

- Deve ser utilizado dentro de componentes com acesso ao `AuthContext`
- Requer o ID da solicitação e a observação como dados obrigatórios
- É importante passar `setLoadingModal` para garantir experiência de carregamento

---

## 🧠 Por que usar esse hook?

- 🔁 Centraliza a lógica de negação de forma reutilizável
- 🧼 Reduz duplicação de código entre componentes de aprovação/reprovação
- 🚦 Garante consistência de feedback visual e atualização de estado
