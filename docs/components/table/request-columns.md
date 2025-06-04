# Documentação do `getRequestColumns`

## 📁 Localização
`/src/components/table/request-columns.tsx`

## 📊 Visão Geral

A função `getRequestColumns` retorna uma lista de colunas do tipo `ColumnDef<IViewRequest>[]` para ser usada com a biblioteca `@tanstack/react-table`. Ela define dinamicamente a estrutura e renderização das colunas da `RequestTable`, incluindo estilo, ícones e ações interativas.

Cada coluna é customizada para exibir informações com contexto visual (ex: badges de status, ícones de operação, botões de ação), proporcionando uma experiência rica e consistente.

## 🔎 Detalhes Técnicos

### 🎯 Parâmetros

| Parâmetro           | Tipo                            | Descrição                                                                 |
|---------------------|----------------------------------|---------------------------------------------------------------------------|
| `onToggleObservation`| `(id: number) => void`          | Alterna a exibição da observação da requisição.                          |
| `observationOpenId` | `number \| null`                 | Define qual ID está com observação expandida.                            |
| `onOpenModal`       | `(request: IViewRequest) => void`| Função chamada ao clicar no ícone de abrir o modal.                      |

---

### 🧩 Colunas Geradas

| Campo        | Renderização                                     |
|--------------|--------------------------------------------------|
| `id`         | Número da requisição com ícone `#`               |
| `tipo`       | Texto com ícone de tag                           |
| `status`     | Badge com cores diferentes por status            |
| `created_at` | Data com ícone de calendário                     |
| `nome_solicitante` | Nome do solicitante com ícone de usuário |
| `observacao` | Ícone de balão de texto para exibir comentários  |
| `ações`      | Ícone de olho que abre o modal com a requisição  |

---

### 🎨 Estilização e Ícones

- Cada célula usa `flex` com `gap` para alinhar texto e ícones.
- Cores e tamanhos de ícones são padronizados (`size={13}`, `color="var(--color-neutral)"`).
- Badges estilizados com variantes como `"pending"`, `"approved"`, etc.

```tsx
const styleBadge = {
  "Pendente": "pending",
  "Em Revisão": "review",
  "Negado": "denied",
  "Aprovado": "approved",
  "alteração": "change",
  "novo cadastro": "new register"
} as const;
```

---

## ⚖️ Regras de Uso

- A função deve ser chamada sempre que a tabela for renderizada.
- Deve ser usada com `useReactTable` passando o array de colunas retornado.
- Os callbacks `onToggleObservation` e `onOpenModal` devem estar definidos.

---

## 💻 Exemplo de Uso

```tsx
const columns = getRequestColumns({
  onToggleObservation: handleObs,
  observationOpenId,
  onOpenModal: openRequestModal
});

const table = useReactTable({ data, columns, ... });
```

---

## 📚 Integração com o contexto

- Não consome contexto diretamente, mas depende de funções passadas por props para interagir com o estado global da aplicação.

---

## 💡 Melhorias planejadas (futuras)

- Suporte a ordenação e filtros por coluna
- Tooltip para conteúdo truncado
- Componente `ColumnConfigPanel` para reordenação e seleção de colunas visíveis
