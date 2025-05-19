# Documentação do `RequestContext`

## 📁 Localização

`/context/request.context.tsx`

## 📊 Visão Geral
Este arquivo define o `RequestContext`, responsável por controlar:
- Os filtros aplicados
- Os dados de solicitações carregados via `Supabase`
- Os contadores (`pendentes`, `revisão`, `total`)
- O carregamento (`skeleton`)
- A atualização automática via Supabase realtime

É a fonte de verdade compartilhada para todas as páginas e componentes que usam a tabela de solicitações.

## 🔎 Detalhes Técnicos

### ✅ Estado global controlado:
| Estado                 | Função                                                                        |
| ---------------------- | ----------------------------------------------------------------------------- |
| `filter`               | Armazena os parâmetros da requisição (página, limite, status, tipo, etc.)     |
| `setFilter`            | Função para atualizar os filtros (usada pela tabela, filtros, paginação etc.) |
| `request`              | Array de solicitações retornadas da API (via Supabase)                        |
| `getRequest()`         | Função que busca os dados do Supabase com base no `filter` atual              |
| `counters`             | Contadores para o dashboard (pendentes, revisão, total)                       |
| `getCountersRequest()` | Consulta os contadores via Supabase                                           |
| `loadingSkelleton`     | Boolean que ativa o placeholder visual enquanto os dados carregam             |

### 🧠 Integração com Supabase
```tsx
const requests = await getRequestService(filter);
```
- A requisição principal (`getRequest`) é executada sempre que o `filter` é alterado.
- Além disso, o hook `useSupabaseRealtime` escuta mudanças em tempo real na tabela `"solicitacoes"` e atualiza os contadores automaticamente.

### 🧠 Autenticação
- Usa o `AuthContext` para determinar se o usuário atual tem permissão de aprovador (`access_approver`).
- Se for aprovador, carrega todos os dados. Caso contrário, filtra os dados pelo `email` do usuário logado.

### 💻 Exemplo de uso do contexto
```tsx
const { request, filter, setFilter, getRequest, counters } = useContext(RequestContext);
```

### 🧠 Supabase Realtime
```tsx
useSupabaseRealtime({
  table: "solicitacoes",
  event: "*",
  schema: "public",
  channelName: "canal-solicitacoes",
  onChange: async () => {
    if (isApprover) await getCountersService();
  }
});

```

Isso garante que, se outra pessoa aprovar, revisar ou criar uma solicitação, a UI atualiza automaticamente.

