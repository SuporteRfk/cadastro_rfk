# Documentação do `RequestTableBody`

## 📁 Localização
`/src/components/table/request-table-body.components.tsx`

## 📊 Visão Geral

O componente `RequestTableBody` é responsável por renderizar o corpo da tabela principal de solicitações. Ele consome os dados processados pelo hook `useReactTable` e renderiza as linhas dinamicamente, além de exibir uma mensagem amigável quando não há registros.

Utiliza o componente `MomentCoffe` para personalizar a experiência quando a tabela está vazia.

## 🔎 Detalhes Técnicos

### 🎯 Props Recebidas

| Prop               | Tipo                       | Descrição                                                                  |
|--------------------|----------------------------|-----------------------------------------------------------------------------|
| `table`            | `Table<IViewRequest>`      | Instância da tabela gerada pelo `useReactTable`.                          |
| `observationOpenId`| `number \| null`           | ID de requisição cuja observação está expandida (se aplicável).           |

---

### 🧠 Lógica Interna

- A lista de linhas visíveis é obtida com `table.getRowModel().rows`.
- Se não houver linhas (`rows.length === 0`), exibe:
  - Uma célula única (`colSpan`) com o componente `MomentCoffe` e mensagem de “Nenhuma solicitação encontrada”.

```tsx
if (rows.length === 0) {
  return (
    <TableBody>
      <TableRow>
        <TableCell colSpan={table.getAllColumns().length}>
          <MomentCoffe mensagem="Nenhuma solicitação encontrada" />
        </TableCell>
      </TableRow>
    </TableBody>
  );
}
```

- Caso haja dados, renderiza:
  - Linhas com estilos alternados (`odd:bg-neutral/10`, `even:bg-white`)
  - Células com `flexRender(...)`, que permite suporte a JSX customizado

---

### 🎨 Estilo Visual

- Alternância de cor entre linhas pares e ímpares
- Hover com leve destaque (`hover:bg-accent/10`)
- Altura flexível (`h-fit`), texto `text-sm`
- Células com controle de bordas internas dependendo da posição

---

## ⚖️ Regras de Uso

- Deve ser usado junto ao `RequestTableHeader` dentro do componente `Table`.
- Exige que o hook `useReactTable` esteja corretamente configurado e passado via prop `table`.

---

## 💻 Exemplo de Uso

```tsx
<Table>
  <RequestTableHeader table={table} />
  <RequestTableBody table={table} observationOpenId={observationOpenId} />
</Table>
```

---

## 📚 Integração com o contexto

- Este componente **não consome nenhum contexto diretamente**.
- Depende dos dados fornecidos pela instância da tabela (`table`).

---

## 💡 Melhorias planejadas (futuras)

- Renderização condicional de colunas específicas como ações
- Animações ao expandir/contrair observações
- Integração com `ReviewContext` para mostrar ícones ou marcações por linha
