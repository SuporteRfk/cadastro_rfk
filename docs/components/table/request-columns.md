# Documentação do `getRequestColumns`

## 📁 Localização
`/components/table/request-columns.tsx`

## 📊 Visão Geral

Este arquivo define a estrutura e o conteúdo das colunas da tabela de solicitações usando a biblioteca `@tanstack/react-table`. Ele especifica quais campos serão exibidos, como os dados devem ser renderizados em cada célula, e define o cabeçalho correspondente.

## 🔎 Detalhes Técnicos

### 🧩 Estrutura:
- `getRequestColumns` é uma função que retorna um array de objetos representando colunas para a tabela.
- Cada coluna é configurada com:
    - `accessorKey`: chave de acesso para a propriedade no objeto de dados (`IViewRequest`).
    - `header`: conteúdo do cabeçalho (pode ser texto ou JSX).
    - `cell`: função que define como o dado será exibido na célula.

### 📚 Integração:
- Utiliza `flexRender()` internamente no `RequestTableHeader` e `RequestTableBody` para renderizar dinamicamente as colunas.
- O `getRequestColumns` aceita props para controlar ações:
    - `onToggleObservation`: função que alterna a exibição da observação.
    - `observationOpenId`: ID da linha com observação aberta.
    - `onOpenModal`: função para abrir o modal com detalhes da solicitação.

###  Tipagens:
- Tipado com base na interface `IViewRequest` que representa uma solicitação vinda do banco.

## ⚖️ Regras de Uso
- A função `getRequestColumns` deve ser chamada dentro do componente pai da tabela para gerar as colunas.
- O retorno deve ser passado diretamente à propriedade `columns` do hook `useReactTable()`.
- A ordenação ou interação no cabeçalho pode ser adicionada futuramente neste arquivo.
- As funções passadas como props (`onToggleObservation`, etc.) devem estar disponíveis no componente pai.

## 💻 Exemplo de Uso
```tsx
const table = useReactTable({
  columns: getRequestColumns({
    onToggleObservation,
    observationOpenId,
    onOpenModal
  }),
  data: request,
  getCoreRowModel: getCoreRowModel(),
});

```

## 💡Possíveis melhorias futuras

Adicionar ordenação, filtros por coluna ou estilos personalizados, olhar na documentação sobre da biblioteca `@tanstack/react-table`, sobre as extensões:
- enableSorting, 
- enableColumnFilter,
- entre outras com base no que quer implementar na tabela.