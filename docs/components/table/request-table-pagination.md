# Documentação do `RequestTablePagination`

## 📁 Localização
`/src/components/table/request-table-pagination.components.tsx`

## 📊 Visão Geral

O componente `RequestTablePagination` controla a navegação entre páginas da tabela de solicitações. Ele oferece ao usuário a capacidade de:

- Escolher quantas linhas deseja ver por página
- Navegar para a próxima, anterior, primeira ou última página

Esse componente é sensível ao contexto `RequestContext` para obter o total de registros e o filtro atual.

## 🔎 Detalhes Técnicos

### 🎯 Props Recebidas

| Prop              | Tipo                   | Descrição                                                              |
|-------------------|------------------------|-------------------------------------------------------------------------|
| `onChangePage`    | `(page: number) => void`| Função chamada ao mudar de página.                                     |
| `onChangePageSize`| `(size: number) => void`| Função chamada ao mudar o tamanho da página (linhas por página).       |

---

### 🧠 Lógica Interna

- Obtém os valores do `RequestContext`:
  - `filter.offset`: offset atual da requisição
  - `filter.indexLimit`: número de registros por página
  - `totalRequest`: total de registros existentes

```tsx
const pageSize = filter?.indexLimit || 10;
const pageIndex = Math.floor((filter?.offset || 0) / pageSize);
const totalPages = Math.ceil(totalRequest / pageSize);
```

- Calcula:
  - `canPrevious` = se há página anterior
  - `canNext` = se há próxima página disponível

---

### 🧩 Controles de UI

- **Dropdown de seleção** para linhas por página: opções [5, 10, 20, 50]
- **Botões de navegação**:
  - Primeira página (`FirstIcon`)
  - Página anterior (`PreviuosIcon`)
  - Próxima página (`NextIcon`)
  - Última página (`LastIcon`)

- Estilo: `bg-accent/5`, `border-t`, `rounded-b-md`

---

## ⚖️ Regras de Uso

- Deve ser usado dentro do `RequestTable`, após o corpo da tabela.
- Depende do `RequestContext` para funcionar corretamente.
- `onChangePage` e `onChangePageSize` devem atualizar o filtro global (`setFilter()`).

---

## 💻 Exemplo de Uso

```tsx
<RequestTablePagination
  onChangePage={(page) => {
    setFilter((prev) => ({ ...prev, offset: page * prev.indexLimit }));
  }}
  onChangePageSize={(size) => {
    setFilter((prev) => ({ ...prev, indexLimit: size, offset: 0 }));
  }}
/>
```

---

## 📚 Integração com o contexto

- Lê diretamente de `RequestContext`:
  - `filter`
  - `totalRequest`




