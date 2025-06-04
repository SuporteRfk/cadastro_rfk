# Documentação do `RequestTableHeader`

## 📁 Localização
`/src/components/table/request-table-header.components.tsx`

## 📊 Visão Geral

O componente `RequestTableHeader` é responsável por renderizar o cabeçalho da tabela principal utilizando o sistema de tabelas da biblioteca `@tanstack/react-table`.

Ele itera sobre os grupos de cabeçalhos fornecidos pelo hook `useReactTable` e aplica estilos específicos para garantir uma apresentação visual clara, destacando colunas de ação com ícones e separações visuais com bordas.

## 🔎 Detalhes Técnicos

### 🎯 Props Recebidas

| Prop   | Tipo                        | Descrição                                                         |
|--------|-----------------------------|--------------------------------------------------------------------|
| `table`| `Table<IViewRequest>`       | Instância da tabela criada via `useReactTable`.                   |

---

### 🧠 Lógica Interna

- Itera sobre `table.getHeaderGroups()` para suportar múltiplos níveis de cabeçalhos.
- Renderiza cada `TableHead` com estilos e bordas condicionais:
  - A primeira e última coluna têm estilo diferente para evitar borda lateral dupla.
- Identifica a coluna de ações (`""`) e insere o ícone `MousePointerClick`.

```tsx
const isColumnAction = header.column.columnDef.header === ""
```

- Usa `flexRender` para renderizar cabeçalhos customizados (permite JSX, componentes, etc.).

---

### 🎨 Estilo Aplicado

- Fundo: `bg-accent/70`
- Texto: `text-text-strong`, `text-sm`, `font-semibold`
- Bordas:
  - Laterais: aplicadas condicionalmente com `border-l-2`
  - Inferior: todas com `border-b-2 border-b-accent`

---

## ⚖️ Regras de Uso

- Deve ser utilizado dentro do componente `Table` do projeto.
- Depende da configuração de colunas via `getRequestColumns()` ou estrutura compatível com TanStack Table.

---

## 💻 Exemplo de Uso

```tsx
<Table>
  <RequestTableHeader table={table} />
  <RequestTableBody table={table} />
</Table>
```

---

## 📚 Integração com o contexto

- Não consome nenhum contexto diretamente.
- Toda a estrutura e dados são fornecidos pela instância `table`.

---

## 💡 Melhorias planejadas (futuras)

- Suporte a ordenação de colunas (com ícones clicáveis)
- Tooltip nos cabeçalhos com descrição dos campos
- Componente para configuração dinâmica de colunas visíveis
