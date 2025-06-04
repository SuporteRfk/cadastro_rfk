# Documentação do `ModalRequest`

## 📁 Localização
`/src/components/modal/modal-request.components.tsx`

## 📊 Visão Geral

O componente `ModalRequest` é responsável por exibir um modal completo contendo os detalhes de uma solicitação (`request`). Ele oferece recursos para visualizar, editar ou aprovar a requisição dependendo do modo atual e do status da mesma.

Além de renderizar dinamicamente o conteúdo principal via `ModalRequestRouter`, o componente também apresenta ações associadas à requisição por meio do `ModalRequestActions`.

Este modal é exibido de forma centralizada e ocupa a maior parte da viewport, oferecendo uma experiência imersiva para manipulação de requisições.

## 🔎 Detalhes Técnicos

### 🎯 Props Recebidas

| Prop                 | Tipo                | Descrição                                                                 |
|----------------------|---------------------|---------------------------------------------------------------------------|
| `onClose`            | `() => void`        | Função chamada ao fechar o modal.                                         |
| `request`            | `IViewRequest`      | Objeto contendo os dados completos da requisição em questão.             |
| `isTheRouteOfChange` | `boolean`           | Define se a rota atual permite alteração do estado da requisição.        |

---

### 🧠 Controle de Estado

| Estado           | Tipo                      | Descrição                                                                 |
|------------------|---------------------------|--------------------------------------------------------------------------|
| `mode`           | `FormStateType`           | Modo atual da visualização (`viewing`, `editing`, etc).                  |
| `loadingModal`   | `boolean`                 | Indica se o modal está aguardando alguma operação assíncrona.            |
| `statusLocal`    | `StatusRequest`           | Status local da requisição, usado para exibir badge e controle de lógica.|

```tsx
const [mode, setMode] = useState<FormStateType>("viewing");
const [loadingModal, setLoadingModal] = useState<boolean>(false);
const [statusLocal, setStatusLocal] = useState<StatusRequest>(request.status);
```

---

### 📦 Integração com contexto

O componente consome o `RequestContext` diretamente:

```tsx
const { getRequest, filter } = useContext(RequestContext);
```

- Ao fechar o modal (`onClose`), se o status foi alterado (`statusLocal !== request.status`), ele chama `getRequest(filter!)` para atualizar a lista de solicitações.

---

### 🧩 Renderização dinâmica

- `ModalRequestRouter` renderiza o conteúdo da requisição (detalhes, formulário, etc).
- `ModalRequestActions` exibe ações como “aprovar”, “editar”, etc., mas **somente se** `mode === "viewing"` e `!loadingModal`.

---

## ⚖️ Regras de Uso

- Deve ser usado para visualizar/editar/agir sobre uma requisição.
- A visibilidade do modal deve ser controlada pelo componente pai.
- O contexto `RequestContext` deve estar disponível no escopo onde ele for usado.

---

## 💻 Exemplo de Uso

```tsx
<ModalRequest
  onClose={() => setOpen(false)}
  request={requestSelecionada}
  isTheRouteOfChange={true}
/>
```

---

## 💡 Melhorias planejadas (futuras)

- Adicionar indicador de carregamento na parte superior quando `loadingModal` for `true`
- Permitir modo somente leitura em rotas específicas
- Padronizar estilo das badges com enum ou config visual externa
