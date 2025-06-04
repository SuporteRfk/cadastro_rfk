# 📁 Documentação do Hook (`useSupabaseRealtime`)

### 📁 Localização

`/hooks/use-supabase-realtime.hooks.ts`

---

## 📊 Visão Geral

O `useSupabaseRealtime` é um hook customizado que encapsula a lógica de escuta de eventos em tempo real utilizando a API do Supabase. Ele permite que componentes ou contextos reajam automaticamente a eventos como `INSERT`, `UPDATE`, `DELETE` ou `TODOS` em uma tabela específica do banco de dados.

Cada instância do hook cria um canal independente no Supabase, e pode opcionalmente aplicar filtros para limitar os eventos recebidos.

---

## 📦 Parâmetros do Hook

| Parâmetro      | Tipo                                         | Descrição                                                                 |
|----------------|----------------------------------------------|---------------------------------------------------------------------------|
| `table`        | `string`                                     | Nome da tabela no Supabase a ser monitorada.                             |
| `schema`       | `string`                                     | Schema do banco de dados (geralmente `"public"`).                        |
| `channelName`  | `string`                                     | Nome único do canal (evita duplicidade).                                 |
| `event`        | `"*" \| "INSERT" \| "UPDATE" \| "DELETE"` | Tipo de evento a ser escutado.                                           |
| `filter`       | `string` (opcional)                          | Filtro para refinar os eventos escutados (ex: `"status=eq.ABERTO"`).     |
| `onChange`     | `(payload: any) => void`                     | Função executada quando o evento for disparado.                          |

---

## ⚙️ Comportamento Interno

1. Cria um canal no Supabase com o nome fornecido.
2. Configura o listener `on("postgres_changes")` com os filtros.
3. Executa `onChange(payload)` sempre que o evento ocorrer.
4. No `unmount`, remove o canal com `removeChannel()` para evitar vazamentos ou múltiplas conexões.

---

## 💻 Exemplo de Uso

```tsx
useSupabaseRealtime({
  table: "solicitacoes",
  schema: "public",
  channelName: "canal-solicitacoes",
  event: "*",
  onChange: async () => {
    await getCounters();
  }
});
```

### 🔎 Destaque para:

```ts
    ...(filter ? { filter: config.filter } : {})
```
Essa construção só adiciona a chave `filter` se ela estiver definida. Isso evita que o Supabase receba `filter: undefined` ou `null`, o que poderia invalidar a assinatura silenciosamente.


## 🔗 Conexões

- Utilizado por contextos como `RequestContext` para manter dados sincronizados.
- Baseado na API de eventos do Supabase (`supabase.channel().on().subscribe()`)


## ⚖️ Regras de Uso

- Sempre utilize `channelName` único por contexto ou componente.
- Evite filtros malformados — o Supabase ignora silenciosamente se estiver incorreto.
- Prefira canal por entidade, não canal global para tudo.
- Lembre de remover o canal ao desmontar (hook já faz isso internamente).


## 🧠 Por que usar esse hook?

- 🔄 Automatiza atualizações com escuta ativa de banco
- 🧱 Mantém a UI sincronizada com dados em tempo real
- 🧼 Elimina necessidade de intervalos/polling
- 🧩 Desacopla lógica de subscrição do componente visual
