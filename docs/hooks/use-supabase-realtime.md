# 📁 Documentação do hook (`SupabaseRealtime`)

### 📁 Localização

`/hooks/use-supabase-realtime.hooks.ts`

## 📊 Visão Geral

O `useSupabaseRealtime` é um hook customizado que encapsula a lógica de escuta de eventos em tempo real utilizando a API do Supabase. Ele permite que componentes ou contextos reajam automaticamente a eventos como `INSERT`, `UPDATE`, `DELETE` ou `TODOS` em uma tabela específica do banco de dados.

Cada instância do hook cria um canal independente no Supabase, e pode opcionalmente aplicar filtros para limitar os eventos recebidos.


## 🔎 Detalhes Técnicos

Este hook é baseado na API Realtime do Supabase, especificamente no método:

```ts
supabase.channel(channelName).on("postgres_changes", config, callback)
```

## 📦 Parâmetros do hook:

| Prop            | Tipo                                   | Descrição                                                      |
|-----------------|----------------------------------------|----------------------------------------------------------------|
| `table`         | `string`                               | Nome da tabela que será monitorada                             |
| `schema`        | `string`                               | Schema do banco (geralmente `"public"`)                        |
| `channelName`   | `string`                               | Nome único do canal de comunicação (ex: `"canal-solicitacoes"`)|
| `event`         | `*` ou `INSERT` ou `UPDATE` ou `DELETE`| Tipo de evento que queremos escutar                            |
| `filter`        | `string` (opcional)                    | Filtro opcional (ex: `"status=eq.PENDENTE"`)                   |
| `onChange`      | `(payload: any) => void`               | Função que será executada a cada evento recebido               |

## ⚙️ Comportamento Interno

- Monta a configuração do canal com os parâmetros fornecidos
- Adiciona o filter somente se ele for definido
- Assina o canal Supabase via .subscribe()
- No cleanup, remove o canal com .removeChannel() para evitar duplicações

### 🔎 Destaque para:

```ts
    ...(filter ? { filter: config.filter } : {})
```
Essa construção só adiciona a chave `filter` se ela estiver definida. Isso evita que o Supabase receba `filter: undefined` ou `null`, o que poderia invalidar a assinatura silenciosamente.

## ⚖️ Regras de Uso

- Sempre defina `channelName` como valor único por instância.
    - Exemplo: `"solicitacoes-realtime"` ou `"produtos-insert"`
- O Supabase não valida se o filtro está correto — ele apenas ignora se estiver errado.
- Para verificar se o filtro está funcionando, inspecione os `payloads` recebidos dentro do `onChange`.


## 💻 Exemplo de Uso
```ts
useSupabaseRealtime({
  table: "solicitacoes",
  schema: "public",
  channelName: "realtime-solicitacoes",
  event: "UPDATE",
  filter: "status=eq.PENDENTE",
  onChange: async (payload) => {
    console.log("Evento recebido:", payload);
    await getCounters(); // exemplo
  }
});
```

# 🧠 Por que usar esse hook?

- 🔄 Isola a lógica de conexão em tempo real, evitando repetição de código
- 🔍 Deixa o uso semântico e fácil de entender (useSupabaseRealtime(...))
- 🧱 Garante uma arquitetura limpa, desacoplada e modular
- 🚦 Evita bugs com múltiplas conexões simultâneas por canal