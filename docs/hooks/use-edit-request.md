# 📁 Documentação do Hook (`useEditRequest`)

### 📁 Localização

`/hooks/use-edit-request.hooks.ts`

---

## 📊 Visão Geral

O `useEditRequest` é um hook customizado que encapsula a lógica de **edição de uma solicitação**, atualizando tanto a tabela principal com novos dados quanto o status de acompanhamento no Supabase.

Ele leva em conta o tipo de usuário e a rota atual para definir o comportamento correto do status da solicitação após edição.

---

## 📦 Parâmetros do Hook

| Parâmetro        | Tipo                                           | Descrição                                                                 |
|------------------|------------------------------------------------|---------------------------------------------------------------------------|
| `viewRequestId`  | `number`                                       | ID da requisição principal (exibida)                                     |
| `setLoadingModal`| `Dispatch<SetStateAction<boolean>>`            | Função para controle de loading visual                                   |
| `status`         | `StatusRequest`                                | Status atual da requisição                                               |
| `setMode`        | `Dispatch<SetStateAction<FormStateType>>`      | Modo atual do formulário (ex: `"viewing"`, `"editing"`)                  |
| `updateFunction` | `(id: number, data: T) => Promise<void>`       | Função que atualiza os dados da tabela específica da solicitação         |
| `setStatusLocal` | `Dispatch<SetStateAction<StatusRequest>>`      | Atualizador de status no estado local (UI)                               |

---

## ⚙️ Detalhes Técnicos

- Determina o `setStatus` com base na **rota atual** e nas permissões do usuário:
  - Se estiver na rota `"/solicitacoes/em-revisao"` e for da **controladoria**, mantém o status atual.
  - Caso contrário, define como `PENDENTE` (indicando reenvio para nova análise).
- Executa a função `updateFunction` com os dados recebidos (`data`)
- Atualiza os dados da requisição no Supabase via `updateRequestService`, registrando:
  - Data da operação
  - Departamento do usuário
  - Nome do operador
  - Operação executada: `"Editar solicitação"`
- Usa `Toastify` para notificar sucesso
- Aplica `setMode("viewing")` e atualiza status local com `setStatusLocal`

---

## 💻 Exemplo de Uso

```tsx
const { handleEdit } = useEditRequest({
  viewRequestId: 123,
  setLoadingModal,
  status,
  setMode,
  updateFunction: updateProdutoTable,
  setStatusLocal
});

await handleEdit(produtoId, formData);
```

---

## 🔗 Conexões

- `updateRequestService`: atualiza a tabela principal da requisição no Supabase
- `updateFunction`: função genérica específica de cada formulário/tabela
- `AuthContext`: para obter `departamento` e `nome` do usuário logado
- `useLocation`: verifica se está na rota de revisão para definir comportamento do status

---

## ⚖️ Regras de Uso

- O hook deve ser usado em contextos com acesso ao usuário logado
- A `updateFunction` precisa ser passada manualmente conforme a tabela específica
- O `status` inicial e o local precisam estar sincronizados corretamente

---

## 🧠 Por que usar esse hook?

- 🔁 Centraliza toda a lógica de edição e atualização de status
- 🧼 Evita duplicação de lógica entre formulários
- 🔐 Respeita regras de negócio por rota e por tipo de usuário
- 📋 Registra operações com contexto completo (quem, quando, onde e o que)
