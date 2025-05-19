# Documentação do `RequestTableFilter`

## 📁 Localização
`/components/table/request-table-filter.tsx`

## 📊 Visão Geral

Este componente é responsável por exibir um modal de filtros avançados para a tabela de solicitações. Ele permite que o usuário filtre os dados exibidos com base em múltiplos critérios e aplica os filtros dinamicamente ao `RequestContext`.

O componente usa o `Dialog` do `shadcn/ui` para apresentar os filtros em um modal limpo, moderno e acessível.

## 🔎 Detalhes Técnicos

### ✅ Campos disponíveis:
- `status` (select baseado em StatusRequest)
- `tipo` (select baseado em TypeRequest)
- `operação` (select baseado em OperationRequest)
- `nome` (input de texto)
- `data` (input do tipo date)

### 🧠 Controle de Estado:
- O estado `localFilter` armazena os valores temporários preenchidos pelo usuário.
- Esse estado não afeta o filtro global até que o botão **“Aplicar”** seja clicado.
- Ao aplicar, os dados são passados para `setFilter()` no `RequestContext`.
```tsx
const [localFilter, setLocalFilter] = useState<IQueryRequest>({ ... });
```

### 📦 Ações disponíveis:

| Ação                | Efeito                                                                   |
| ------------------- | ------------------------------------------------------------------------ |
| **Aplicar Filtros** | Atualiza o filtro global (`RequestContext`) e fecha o modal              |
| **Limpar Filtros**  | Reseta todos os campos do filtro **exceto os fixos**, e aplica novamente |

### ♻️ Campos fixos (ex: status, email)
- O componente aceita uma prop `fixedFilter` com valores que:
    - Devem permanecer constantes mesmo após limpar os filtros.
    - São aplicados automaticamente ao `setFilter()` e `localFilter`.
    - Também desabilitam os campos na UI para evitar edição indevida.

```tsx
if (fixedFilter?.status !== undefined) {
  disable status select
}
```

## ⚖️ Regras de Uso
- Deve ser usado dentro de qualquer página que consuma a tabela de solicitações.
- Deve ser passado o `fixedFilter` corretamente (ex: status: `PENDENTE` na aba de pendentes).
- O filtro reseta o `offset` para `0` ao ser aplicado ou limpo (reinicia a paginação).

## 💻 Exemplo de Uso

```tsx
<RequestTableFilterModal fixedFilter={{ status: StatusRequest.PENDENTE }} />
```

## 📚 Integração com o contexto
- Atualiza o `filter` no `RequestContext` com `setFilter`
- Gatilho de atualização de dados ocorre via `useEffect` dentro do contexto (quando `filter` muda)

### 💡 Melhorias planejadas (futuras)

```
Documentar melhorias futuras detalhadamente no arquivo de melhorias gerais
```

- `Ordenação`: implementar dropdown ou ícones clicáveis para orderBy e orderDirection
- Busca por ID ou nome direto com debounce e carregamento
- Filtro por múltiplos tipos ou status (multiselect)