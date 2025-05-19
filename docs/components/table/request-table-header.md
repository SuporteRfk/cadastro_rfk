# Documentação do `RequestTableHeader`

## 📁 Localização
`/components/table/request-table-header.tsx`

## 📊 Visão Geral
Este componente é responsável por renderizar o cabeçalho da tabela de solicitações. Ele é dinâmico e baseado nas colunas definidas via `@tanstack/react-table` que definimos no `request-columns`.

Cada cabeçalho de coluna é renderizado de forma a permitir futuras expansões, como ordenação ou filtros por coluna, se necessário.

## 🔎 Detalhes Técnicos
### ✅ Props:
- `table`: Table<IViewRequest>
    - Instância da tabela criada com `useReactTable`, que contém os métodos e o modelo de colunas.
### 🧠 Renderização:
- Itera sobre `table.getHeaderGroups()` para exibir os grupos de cabeçalho.
- Cada `headerGroup` contém os `headers` de colunas individuais.
- Para cada header, verifica:
-   
    ```tsx
        header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())
    ```
     - Isso garante que:
        - Colunas “fantasmas” (placeholders) sejam ignoradas.
        - O conteúdo do cabeçalho seja corretamente renderizado, mesmo que seja um JSX complexo ou função.

### ⚖️ Regras de Uso
- Este componente deve ser incluído dentro da <`Table`>, como primeiro filho (antes do <`TableBody`>).
- O `table` deve ser criado com o hook `useReactTable()` com colunas previamente definidas.
- O cabeçalho depende da estrutura retornada por `getRequestColumns()`.


## 💻 Exemplo de Uso

```tsx
<Table className="min-w-full">
  <RequestTableHeader table={table} />
  <RequestTableBody table={table} observationOpenId={observationOpenId} />
</Table>
```
## 🧠 Explicação técnica: `header.isPlaceholder`
- Alguns recursos do `@tanstack/react-table` criam colunas `“placeholder”` para alinhamento ou mesclagem de colunas (ex: group headers).
- Essa verificação evita renderizar valores vazios ou quebrar o layout com `undefined`.

## 💡 Futuras melhorias
- Adicionar ícones de ordenação clicáveis com `onSort` no `header`.
- Tornar cada `header.column` interativo ao clicar (alterar ordem asc/desc).
- Adicionar tooltips ou ícones de ajuda sobre colunas com informações sensíveis.