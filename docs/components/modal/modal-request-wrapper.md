# Documentação do `ModalRequestWrapper`

## 📁 Localização
`/src/components/modal/modal-request-wrapper.components.tsx`

## 📊 Visão Geral

O componente `ModalRequestWrapper` é responsável por preparar e injetar os dados detalhados de uma solicitação antes de renderizar o formulário apropriado.

Ele realiza chamadas assíncronas para buscar os dados detalhados da entidade (`getRequestDetailsService`), aplica máscaras e tratamentos específicos conforme o tipo da tabela de origem, e por fim renderiza o formulário correspondente passado via `FormComponent`.

Também encapsula o formulário no contexto de revisão (`ReviewProvider`), responsável por gerenciar o motivo de recusa da solicitação.

## 🔎 Detalhes Técnicos

### 🎯 Props Recebidas

| Prop                 | Tipo                                      | Descrição                                                                 |
|----------------------|-------------------------------------------|---------------------------------------------------------------------------|
| `FormComponent`      | `React.ComponentType<{...}>`              | Componente de formulário que será renderizado com os dados injetados.    |
| `request`            | `IViewRequest`                            | Objeto da requisição contendo id, status, tabela de origem, etc.         |
| `mode`               | `FormStateType`                           | Modo atual de operação do formulário (`viewing`, `editing`, etc).         |
| `isTheRouteOfChange` | `boolean`                                 | Define se a rota atual permite alteração de dados.                        |
| `setLoadingModal`    | `Dispatch<SetStateAction<boolean>>`       | Função que atualiza o estado de carregamento.                             |
| `loadingModal`       | `boolean`                                 | Indica se há operação em andamento.                                       |
| `setMode`            | `Dispatch<SetStateAction<FormStateType>>` | Atualiza o modo de exibição do formulário.                                |
| `setStatusLocal`     | `Dispatch<SetStateAction<StatusRequest>>` | Atualiza o status da requisição localmente.                               |

---

### 🧠 Controle de Estado

| Estado                | Tipo                         | Descrição                                                      |
|-----------------------|------------------------------|-----------------------------------------------------------------|
| `defaultValuesRequest`| `Extended<EntityTypes> \| null` | Armazena os dados detalhados da requisição após tratamento.    |

```tsx
const [defaultValuesRequest, setDefaultValuesRequest] = useState<Extended<EntityTypes> | null>(null);
```

---

### ⚙️ Lógica de Carregamento

- Ao montar o componente (ou mudar `request` ou `mode`), executa `getDetailRequest()`.
- A função:
  - Busca os dados da entidade no backend
  - Aplica máscaras (formatação)
  - Executa lógica extra específica para fornecedores e clientes:
    - Fornecedores: define `fisica_juridica` com base no CPF/CNPJ
    - Clientes: define `mesmo_endereco_cobranca` com base na presença de CEP de cobrança

---

### 🧩 Composição com Contexto

O formulário é renderizado dentro do `ReviewProvider`, que propaga o `motivo_recusa` da requisição.

```tsx
<ReviewProvider initialValue={request.motivo_recusa ?? undefined}>
  <FormComponent {...props} />
</ReviewProvider>
```

---

## ⚖️ Regras de Uso

- Deve sempre ser chamado com um `FormComponent` válido que aceite as props esperadas.
- A `tabela_origem` da requisição deve ser compatível com o formulário.
- Usado exclusivamente dentro do `ModalRequestRouter`.

---

## 💻 Exemplo de Uso

```tsx
<ModalRequestWrapper
  request={request}
  FormComponent={ClientFormManager}
  mode="viewing"
  isTheRouteOfChange={true}
  setLoadingModal={setLoading}
  loadingModal={false}
  setMode={setMode}
  setStatusLocal={setStatus}
/>
```

---

## 📚 Integração com o contexto

- Usa `ReviewProvider` para expor `motivo_recusa` aos componentes filhos.
- Pode ser consumido por qualquer formulário que use esse contexto para mostrar ou editar observações de recusa.

---

## 💡 Melhorias planejadas (futuras)

- Tornar o carregamento assíncrono cancelável (abortable)
- Padronizar tipos dos dados retornados por `getRequestDetailsService`
- Delegar o tratamento especial de dados a uma função externa por entidade
