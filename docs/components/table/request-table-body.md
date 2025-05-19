# Documentação do `RequestTableBody`

## 📁 Localização
`/components/table/request-table-body.tsx`

## 📊 Visão Geral
Este componente é responsável por renderizar o corpo da tabela de solicitações. Ele percorre os dados fornecidos pelo `@tanstack/react-table` e monta dinamicamente as linhas e células.

Também é aqui que ocorre o controle da exibição das observações extras relacionadas a uma solicitação (quando abertas).

## 🔎 Detalhes Técnicos

### ✅ Principais props:
- `table`: instância do Table<`IViewRequest`> criada com `useReactTable`.
- `observationOpenId`: ID da solicitação que está com observação expandida (pode ser `null`).

### 🔄 Lógica:
- Percorre `table.getRowModel().rows` para renderizar cada linha.
- Em cada linha:
    - Renderiza as células visíveis com `row.getVisibleCells()`.
    - Usa `flexRender()` para renderizar dinamicamente o conteúdo da célula.
- Se o `observationOpenId` for igual ao `row.original.id`, renderiza uma segunda linha abaixo, mostrando o conteúdo de `observacao`.

### ⚖️ Regras de Uso
- Este componente deve ser usado dentro da `<Table>`, logo após o cabeçalho (`<RequestTableHeader />`).
- Requer que o table seja corretamente configurado via `useReactTable()`.
- O controle do ID expandido (`observationOpenId`) deve estar no componente pai, e atualizado com a função `onToggleObservation`.


## 💻 Exemplo de Uso
```tsx
<RequestTableBody
  table={table}
  observationOpenId={observationOpenId}
/>
```

## 🔧 Exibição de Observações
Quando o usuário clica para expandir uma linha, este componente renderiza uma linha adicional com o conteúdo de `row.original.observacao`. Se não houver texto, mostra a mensagem:

```
    "Sem observação registrada para a solicitação de número X."
```

## 🧠 FlexRender — explicação rápida
- A função `flexRender(columnDef.cell, cell.getContext())` é parte da `@tanstack/react-table` e serve para:
    - Renderizar dinamicamente o conteúdo da célula.
    - Suporta tanto JSX quanto strings simples.
    - É essencial para componentes com renderização customizada.