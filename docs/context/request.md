# Documentação do `RequestContext`

## 📁 Localização

`/context/request.context.tsx`

## 📊 Visão Geral

O `RequestContext` é responsável por **gerenciar o estado das requisições** feitas pelos usuários, incluindo contadores globais, resultados paginados, filtros e escuta em tempo real por meio do Supabase.

Ele fornece:
- Dados da listagem de solicitações com base em filtros
- Contadores de status (total, pendentes, em revisão)
- Controle de carregamento (`loadingSkelleton`)
- Monitoramento de mudanças na tabela de solicitações via Supabase
- Integração com o `AuthContext` para verificar permissões (usuário aprovador)

---

## 🔍 Detalhamento das Propriedades

### `counters`
- Tipo: `{ total: number; pending: number; review: number }`
- Armazena a quantidade total de solicitações, pendentes e em revisão.

### `loadingSkelleton`
- Tipo: `boolean`
- Define se o esqueleto de carregamento deve ser exibido enquanto os dados estão sendo carregados.

### `request`
- Tipo: `IViewRequest[]`
- Lista de requisições retornadas com base no filtro atual.

### `totalRequest`
- Tipo: `number`
- Contador total de requisições retornadas pela última busca.

### `filter` / `setFilter`
- Tipo: `IQueryRequest | null`
- Define o filtro aplicado à listagem, como paginação, campos específicos etc.

---

## 🧠 Funções Internas

### `getRequest(filter?)`

1. Define `loadingSkelleton` como `true`.
2. Chama `getRequestService()` passando o filtro.
3. Atualiza `request` e `totalRequest` com o resultado.
4. Finaliza o loading ao encerrar.

### `getCountersService()`

1. Chama `getCountersRequest()`.
2. Atualiza `counters` com os valores retornados.
3. Se ocorrer erro, chama `handleApiError`.

---

## 🔄 Efeitos Reativos

### `useEffect` - primeira carga dos contadores
- Executado somente se o usuário for da **controladoria** (`access_approver`).
- Chama `getCountersService()` na montagem.

### `useEffect` - mudança de filtros
- Sempre que `filter` muda, executa `getRequest(filter)`.

---

## 🔴 Supabase Realtime

### `useSupabaseRealtime`

Monitora a tabela `solicitacoes`:

- Schema: `public`
- Evento: `*` (todos)
- Canal: `canal-solicitacoes`
- Ação: chama `getCountersService()` se o usuário for da controladoria.

---

## 🔗 Conexões e Dependências

- `AuthContext`: verifica se o usuário é um aprovador (`user.access_approver`)
- `getRequestService`, `getCountersRequest`: funções do Supabase para consulta
- `useSupabaseRealtime`: hook que escuta atualizações em tempo real
- `handleApiError`: função utilitária para padronizar erros
- Utilizado por múltiplos componentes que exibem tabelas ou widgets com contagem de requisições

---

## 💻 Exemplo de Uso

```tsx
import { useContext } from "react";
import { RequestContext } from "@/context/request.context";

const { counters, request, getRequest, filter, setFilter } = useContext(RequestContext);

useEffect(() => {
  setFilter({ page: 1, limit: 10 });
}, []);
```

---

## 📌 Observações

- As funções do realtime do contexto é ativado apenas se o usuário for da controladoria
- É reativo e baseado em alterações de estado e eventos Supabase
- Otimizado para manter os dados sincronizados com o backend em tempo real

