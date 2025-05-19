# Documentação do `getRequestColumns`

## 📁 Localização
`/components/table/request-table.tsx`

## 📊 Visão Geral

Este é o componente principal da funcionalidade de tabela de solicitações. Ele integra e orquestra todos os outros componentes da pasta `table`/, gerenciando a renderização, estados e a lógica de paginação, filtro e exibição dos dados.

## 🔎 Detalhes Técnicos

### ✅ Componentes utilizados:

| Componente                | Responsabilidade                                       |
| ------------------------- | ------------------------------------------------------ |
| `RequestTableHeader`      | Renderiza o cabeçalho da tabela                        |
| `RequestTableBody`        | Renderiza as linhas e células da tabela                |
| `RequestTablePagination`  | Controle de troca de páginas e linhas por página       |
| `RequestTableFilterModal` | Exibe o modal com filtros de busca                     |
| `LoadingSkelleton`        | Exibe placeholders quando a requisição está carregando |
| `Table`                   | Wrapper do `shadcn/ui` com estrutura básica de tabela  |

### 📦 Estados internos:
- `observationOpenId`: controla qual linha está com observação expandida
- `modalOpen`: (opcional) controla a exibição de modal de detalhes da solicitação

### 🧠 useEffect inicial:
- No primeiro render, define um filtro base:

```tsx
useEffect(() => {
  setFilter({
    offset: 0,
    indexLimit: 10,
  });
}, []);
```

Isso garante que, ao montar a página, ela sempre começa da primeira página com 10 itens.

### ⚙️ Instância da Tabela:
```tsx
const table = useReactTable({
  columns: getRequestColumns({ ... }),
  data: request,
  getCoreRowModel: getCoreRowModel(),
});
```

- `columns`: definidas via getRequestColumns
- `data`: vem diretamente do contexto request
- `getCoreRowModel`: função padrão para controle do corpo da tabela`

### ⚖️ Regras de Uso
- Este componente deve ser usado em páginas como: `pendentes`, `aprovados`, `dashboard`, etc.
- Toda lógica de paginação e filtro é controlada via `RequestContext`.
- Os dados são sempre buscados do servidor, respeitando `offset` e `indexLimit`.

## 💻 Exemplo de Uso
```tsx
<RequestTable titlePage="Pendentes" iconForm={HourglassIcon} />
```

## 💡 Padrões seguidos
- `Modularidade`: cada parte da tabela foi isolada em seu próprio componente.
- `Legibilidade`: nomes claros e props bem nomeadas.
- `Extensibilidade`: permite adicionar ordenação, modais, status, tooltips e multiseleção no futuro.

## 🔧 Responsabilidade
Este componente não toma decisões de negócio diretamente — apenas orquestra os componentes e interage com o `RequestContext`.