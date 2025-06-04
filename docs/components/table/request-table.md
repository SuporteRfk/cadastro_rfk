# Documentação do `RequestTable`

## 📁 Localização
`/src/components/table/request-table.components.tsx`

## 📊 Visão Geral

O componente `RequestTable` é a tabela principal de exibição de solicitações no sistema. Ele integra múltiplos subcomponentes — como filtros, cabeçalhos e paginação — com a tabela em si, utilizando o contexto global `RequestContext` para listar e gerenciar os dados das requisições.

A tabela é altamente configurável e se adapta automaticamente à rota atual, diferenciando o comportamento quando o usuário está na tela de "Solicitar Alteração".

## 🔎 Detalhes Técnicos

### 🎯 Props Recebidas

| Prop             | Tipo                    | Descrição                                                                 |
|------------------|-------------------------|---------------------------------------------------------------------------|
| `titlePage`      | `string`                | Título exibido na parte superior da tabela.                              |
| `iconForm`       | `LucideIcon`            | Ícone exibido ao lado do título da página.                               |
| `showFilterDash` | `boolean` (opcional)    | Controla se o botão de filtro deve ser exibido. Padrão: `true`.          |
| `fixedFilter`    | `Partial<IQueryRequest>`| Filtros fixos aplicados à tabela.                                         |

---

### 🧠 Controle de Estado

| Estado               | Tipo                         | Descrição                                                  |
|----------------------|------------------------------|-------------------------------------------------------------|
| `observationOpenId`  | `number \| null`             | Define qual observação de requisição está visível.         |
| `modalOpen`          | `boolean`                    | Controla visibilidade do modal de detalhes.                |
| `selectedRequest`    | `IViewRequest \| null`       | Requisição selecionada para visualização no modal.         |

---

### 🧩 Composição e Subcomponentes

- **`RequestTableFilter`**: Modal para filtros avançados.
- **`RequestTableHeader`**: Cabeçalho com título, ícone e botão de filtro.
- **`RequestTableBody`**: Corpo da tabela com linhas dinâmicas e interação.
- **`RequestTablePagination`**: Controle de paginação.
- **`ModalRequest`**: Modal para exibição ou revisão da requisição selecionada.

---

### ⚙️ Integração com Contexto

Consome o `RequestContext` para:

- Obter e exibir a lista de requisições (`request`)
- Gerenciar filtros (`filter`, `setFilter`)
- Controlar estado de carregamento (`loadingSkelleton`)

---

## ⚖️ Regras de Uso

- Deve estar dentro do escopo do `RequestContextProvider`.
- Requer que a rota esteja corretamente mapeada no `React Router` para ativar `useLocation`.
- Pode receber `fixedFilter` para pré-filtragem da tabela (ex: status fixo por aba).

---

## 💻 Exemplo de Uso

```tsx
<RequestTable
  titlePage="Solicitações Pendentes"
  iconForm={FileIcon}
  fixedFilter={{ status: StatusRequest.PENDENTE }}
/>
```

---

## 📚 Integração com o contexto

- Atualiza o filtro global da tabela com `setFilter`
- Reage às mudanças de rota via `useLocation`
- Exibe modal dinâmico de acordo com a requisição clicada

---

## 💡 Melhorias planejadas (futuras)

- Suporte a ordenação por coluna (com ícones clicáveis)
- Agrupamento por tipo de solicitação
- Exportação de dados em CSV
