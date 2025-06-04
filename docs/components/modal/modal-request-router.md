# Documentação do `ModalRequestRouter`

## 📁 Localização
`/src/components/modal/modal-request-router.components.tsx`

## 📊 Visão Geral

O componente `ModalRequestRouter` é responsável por identificar a origem da solicitação (`request.tabela_origem`) e, com base nesse valor, renderizar dinamicamente o componente de formulário apropriado (como `ClientFormManager`, `SuppliersFormManager`, etc).

Ele repassa todos os dados e funções necessários ao `ModalRequestWrapper`, que será responsável por encapsular o comportamento visual e interativo do modal.  
Esse roteador atua como uma ponte entre a tabela de origem e o formulário correto.

## 🔎 Detalhes Técnicos

### 🎯 Props Recebidas

| Prop                 | Tipo                                | Descrição                                                                 |
|----------------------|-------------------------------------|---------------------------------------------------------------------------|
| `request`            | `IViewRequest`                      | Objeto da solicitação contendo dados e a tabela de origem.               |
| `mode`               | `FormStateType`                     | Estado atual da visualização (ex: `viewing`, `editing`).                  |
| `setLoadingModal`    | `(v: boolean) => void`              | Função para controlar o estado de carregamento do modal.                  |
| `loadingModal`       | `boolean`                           | Indica se o modal está em modo de carregamento.                          |
| `isTheRouteOfChange` | `boolean`                           | Define se a rota atual permite alterar dados da requisição.              |
| `setMode`            | `(m: FormStateType) => void`        | Define o modo de exibição do formulário.                                 |
| `setStatusLocal`     | `(s: StatusRequest) => void`        | Atualiza o status da requisição localmente após ações.                   |

---

### 🧠 Lógica Interna

- A decisão do formulário é feita via `switch(request.tabela_origem)`.
- Cada caso renderiza o `ModalRequestWrapper` com o `FormComponent` apropriado, que será o formulário relacionado à origem da solicitação.
- O `ModalRequestWrapper` recebe o formulário via prop `FormComponent`, permitindo lógica reutilizável.

```tsx
switch (request.tabela_origem) {
  case "cad_clientes":
    return <ModalRequestWrapper FormComponent={ClientFormManager} ... />
  case "cad_fornecedores":
    return <ModalRequestWrapper FormComponent={SuppliersFormManager} ... />
  ...
}
```

- Caso a origem da tabela não seja reconhecida, é exibida uma mensagem padrão indicando que o tipo de solicitação não é suportado.

---

## ⚖️ Regras de Uso

- Deve ser usado **exclusivamente dentro do `ModalRequest`**.
- A origem da tabela (`tabela_origem`) deve corresponder a um dos casos implementados.
- O componente `ModalRequestWrapper` deve aceitar a prop `FormComponent` corretamente.

---

## 💻 Exemplo de Uso

```tsx
<ModalRequestRouter
  request={requestSelecionada}
  mode={mode}
  setLoadingModal={setLoading}
  isTheRouteOfChange={true}
  loadingModal={false}
  setMode={setMode}
  setStatusLocal={setStatus}
/>
```

---

## 📚 Integração com o contexto

- Este componente **não consome diretamente nenhum contexto**.
- Os `FormManagers` renderizados podem interagir com contextos como `RequestContext`, mas isso está isolado fora do roteador.

---

## 💡 Melhorias planejadas (futuras)

- Substituir o `switch` por um objeto de mapeamento `{ [tabela]: FormComponent }` para maior escalabilidade
- Exibir uma UI amigável no caso de erro ou tabela não suportada
- Padronizar `FormManagers` com contrato comum para facilitar documentação e testes
