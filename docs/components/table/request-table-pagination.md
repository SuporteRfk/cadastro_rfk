# Documentação do `RequestTablePagination`

## 📁 Localização
`/components/table/request-table-pagination.tsx`

## 📊 Visão Geral
Este componente é responsável pela **navegação entre páginas-** na tabela de solicitações. Ele oferece:
- Botões para ir à primeira, anterior, próxima e última página.
- Um seletor para o usuário escolher quantas linhas deseja visualizar por página. 

O controle é totalmente integrado com o `RequestContext`, e os dados são paginados no servidor (`server-side pagination`).

## 🔎 Detalhes Técnicos
```tsx
interface IRequestTablePaginationProps {
  onChangePage: (page: number) => void;
  onChangePageSize: (size: number) => void;
}
```
Essas funções são passadas pelo componente pai (`RequestTable`) e manipulam o estado de filter (com `offset` e `indexLimit`), disparando novas requisições.

## 🧠 Integração com contexto
Internamente, o componente consome o `RequestContext` para acessar:
- `totalRequest`: número total de solicitações retornadas pela última requisição
- `filter`: para acessar `offset` e `indexLimit`, e calcular página atual e total

## 🧮 Lógica de paginação:
```tsx
const pageSize = filter?.indexLimit || 10;
const pageIndex = Math.floor((filter?.offset || 0) / pageSize);
const totalPages = Math.ceil(totalRequest / pageSize);
```
- `pageIndex`: página atual (base 0)
- `canPrevious` e `canNext`: controles de ativação dos botões
- `totalPages`: número total de páginas baseado nos dados do backend

## ⚙️ Funções que o componente aciona

| Função                   | Ação                                                                       |
| ------------------------ | -------------------------------------------------------------------------- |
| `onChangePage(index)`    | Atualiza o `offset` no filtro para mudar a página                          |
| `onChangePageSize(size)` | Altera o `indexLimit`, redefinindo a visualização para o início (offset 0) |


## 💻 Exemplo de Uso
```tsx
<RequestTablePagination
  onChangePage={(page) =>
    setFilter(prev => ({ ...prev!, offset: page * (prev?.indexLimit ?? 10) }))
  }
  onChangePageSize={(size) =>
    setFilter(prev => ({ ...prev!, indexLimit: size, offset: 0 }))
  }
/>
```

## ⚖️ Regras de Uso
- A paginação deve refletir o filtro do contexto (`offset`, `indexLimit`, `totalRequest`).
- A função de `getRequest` deve ser chamada no `useEffect` do contexto ao alterar o filtro.
- Os botões devem estar desativados quando:
    - Está na primeira página (`!canPrevious`)
    - Está na última página (`!canNext`)


## 🧠 Observação importante:
Este componente não usa `@tanstack/react-table` diretamente, pois a paginação é controlada externamente pelo `RequestContext`. Isso evita conflitos e mantém a lógica clara e desacoplada.