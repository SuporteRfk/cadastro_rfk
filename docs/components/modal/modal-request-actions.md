# Documentação do `ModalRequestActions`

## 📁 Localização
`/src/components/modal/moda-request-actions.components.tsx`

## 📊 Visão Geral

O componente `ModalRequestActions` é responsável por exibir os botões de ação disponíveis no modal de requisição, de acordo com o status da solicitação e o papel do usuário autenticado.

As ações disponíveis incluem: **editar**, **revisar**, **negar** e **aprovar**. O componente realiza validações baseadas em permissões e status, e usa o hook `useRequestApprove` para processar aprovações.

## 🔎 Detalhes Técnicos

### 🎯 Props Recebidas

| Prop              | Tipo                                     | Descrição                                                         |
|-------------------|------------------------------------------|--------------------------------------------------------------------|
| `request`         | `IViewRequest`                           | Objeto da requisição com informações como `id`, `status`, `email`. |
| `mode`            | `FormStateType`                          | Modo atual do modal (`viewing`, `editing`, etc).                   |
| `setMode`         | `Dispatch<SetStateAction<FormStateType>>`| Função para alterar o modo atual.                                  |
| `isTheRouteOfChange` | `boolean`                             | Define se a rota atual permite alterações.                         |
| `setloadingModal` | `Dispatch<SetStateAction<boolean>>`      | Define se o modal está em estado de carregamento.                  |
| `setStatusLocal`  | `Dispatch<SetStateAction<StatusRequest>>`| Atualiza o status local da requisição após ações.                  |

---

### 🧠 Lógica de Ação

#### ✅ Permissões

- Se `user.access_approver === true`, todas as ações são permitidas.
- Se **não** for aprovador:
  - Só pode editar se:
    - estiver na rota de mudança **e** status for `PENDENTE`, `REVISAO` ou `APROVADO`
    - ou, for o autor da requisição (comparação por e-mail) e status **não** for `NEGADO`

```tsx
const handleReleaseEdit = (): boolean => {
  if (isUserApprover) return true;
  if (isTheRouteOfChange) return isPending || isReview || isApprover;
  return (user?.email === requestEmail && request.status !== StatusRequest.NEGADO);
}
```

#### 🛠️ Botões Renderizados

- **Editar**: se `handleReleaseEdit()` retornar `true`
- **Revisão**, **Negar**, **Aprovar**: apenas se `user.access_approver === true`

---

### 📦 Hook Utilizado

- `useRequestApprove`: Hook customizado usado ao clicar em “Aprovar”. Ele executa:
  - Lógica de aprovação
  - Atualização de status local
  - Transição de modo

A aprovação é protegida por confirmação via `ModalContext.openModal`.

---

## ⚖️ Regras de Uso

- Deve ser usado apenas dentro do `ModalRequest` quando o modo for `"viewing"`.
- Requer que `AuthContext` e `ModalContext` estejam disponíveis no escopo pai.
- A visibilidade e lógica dos botões depende do `status` e permissões do `user`.

---

## 💻 Exemplo de Uso

```tsx
{mode === "viewing" && (
  <ModalRequestActions
    request={request}
    setMode={setMode}
    mode={mode}
    isTheRouteOfChange={true}
    setloadingModal={setLoading}
    setStatusLocal={setStatus}
  />
)}
```

---

## 📚 Integração com o contexto

- `AuthContext`: Verifica se o usuário tem permissão de aprovador.
- `ModalContext`: Abre modal de confirmação ao clicar em “Aprovar”.

---

## 💡 Melhorias planejadas (futuras)

- Exibir tooltips com explicação para ações desabilitadas
- Reforçar controle de permissão com HOCs ou guards externos
- Externalizar lógica de `handleReleaseEdit` para reutilização/testes
