# Documentação do Componente `Nav Menu`;

# 📁 Localização

`/components/menu/nav-menu.components.tsx`

# 📊 Visão Geral

O componente `nav-menu` é responsável por renderizar a navegação da aplicação, incluindo categorias principais e seus submenus. Ele se adapta dinamicamente ao estado do menu (aberto/fechado no desktop ou mobile) e ao tipo de usuário (com base nas permissões do contexto de autenticação).

A navegação é exibida a partir da lista de menus gerenciada pelo `navigation.context` e os ícones são fornecidos pela biblioteca `lucide-react`. O componente também lida com o encerramento de sessão do usuário.

Ele também exibe contadores de solicitações de acordo com os status de `pendente` e `revisão` e calcula o total de solicitações combinando esses dois. Esses contadores são atualizados em tempo real e usados no menu e na sidebar, os contadores são gerenciados pelo contexto `request.context`.

# 🔎 Detalhes Técnicos

- Consome o `navigation.context` para obter:
  - `menus`: lista completa de menus (comuns + controladoria).
  - `lengthMenuCommom`: usado para separar menus comuns e da controladoria com uma borda.
  - `isSidebarOpen`, `isMobileOpenMenu`: estados que controlam o comportamento responsivo.
  - `handleCategoryClick`, `activeCategory`: controle de abertura dos submenus.
  - `isMenuRouteActive`: verificação de rota ativa.
  - `handleNavigate`: navegação programática ao clicar em itens.

- Também consome o `auth.context` para acessar a função `logoutService`.
- Contadores (solicitações pendentes e revisão) são extraídos e atualizados via `RequestContext`.
- Utiliza animações do `framer-motion` para transições suaves nos labels e submenus.

- O menu é composto por:
  - Itens principais com ou sem submenus.
  - Separador visual entre menus comuns e da controladoria.
  - Submenus que expandem com base em `activeCategory`.
  - Botão de logout fixado na parte inferior.
  - Contadores das solicitaçõs `pendentes` e em `revisão`, ambas atualizadas em tempo real pelo hook `useSupabaseRealtime` gerenciado no contexto `RequestContext`.

  # ⚖️ Regras de Uso

- Este componente deve ser utilizado dentro de um `NavigationProvider`,`AuthProvider` e um `RequestProvider`, pois depende desses contextos.
- A estrutura de menus vem de `data/menu.ts`, conforme o perfil do usuário.
- A animação e a exibição condicional dos labels dependem do estado de abertura (`isSidebarOpen` e `isMobileOpenMenu`).
- O botão de logout chama `logoutService` com uma mensagem de sucesso.
- Para adicionar novas rotas ou categorias, edite os arquivos em `/data/menu.ts`.
- Para utilizar um contador a mais, atualizar o service do supabase com a requisição, adicionar uma nova chave no type `Counters` do contexto `RequestContent`.



# 💻 Exemplo de Uso

O `NavMenu` é usado diretamente dentro do componente de layout:

```tsx
import { NavMenu } from "@/components/menu/NavMenu";

export function SidebarLayout() {
  return (
    <aside className="w-[250px] bg-white h-screen shadow-md">
      <NavMenu />
    </aside>
  );
}
```

## 📁 Componente Adicional: BadgeCounter

O `BadgeCounter` é um componente reutilizável que exibe um contador em forma de badge, usado no `NavMenu` para mostrar a quantidade de solicitações pendentes, em revisão e o total geral.

### 🧩 Uso:
```tsx
export const BadgeCounter = ({ count, color, marginPosition = "right-[-8px]", size = "w-5 h-5" }: BadgeCounterProps) => {
  if (count === 0) return null;
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          layout
          key={count}
          initial={{ scale: 0.5, opacity: 0, y: -10 }}
          animate={{ scale: 1, opacity: 1, y: 0, transition: { delay: 0.5 } }}
          exit={{ scale: 0.5, opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`${color} absolute ${marginPosition} ${size} pt-[1px] flex items-center justify-center rounded-full text-white font-semibold text-xs`}
        >
          {count}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

```

### 💡 Por que usar o `BadgeCounter`?
- **Reutilizável:** Mostra qualquer contador, basta passar o valor e a cor.
- **Animações suaves:** Usando `framer-motion` para transições dinâmicas.
- **Flexível:** Pode ser posicionado e dimensionado conforme necessário.

# Serviço de buscar os números do contadores: `getCountersRequest`

### Localizada:
`/services/supabase/get-counters-request.service.tsx`

A função `getCountersRequest` é responsável por buscar os contadores de solicitações `pendentes` e em `revisão`, e depois calcula o total combinando esses dois status.

```tsx
import { supabaseApi } from "./connection-supabase-api";

/**
 * Função responsável por buscar os contadores de solicitações no banco de dados
 * com base nos status "Pendente" e "Em Revisão". O total é a soma dessas duas
 * categorias.
 * 
 * @returns Um objeto com os contadores de pendentes, revisão e total.
 */
export const getCountersRequest = async () => {
  const queries = {
    // Conta o número de solicitações com status "Pendente"
    pendingQuantity: supabaseApi.from("vw_solicitacoes_geral")
      .select("*", { head: true, count: "exact" })
      .eq("status", "Pendente"),

    // Conta o número de solicitações com status "Em Revisão"
    reviewQuantity: supabaseApi.from("vw_solicitacoes_geral")
      .select("*", { head: true, count: "exact" })
      .eq("status", "Em Revisão"),
  };

  // Executa ambas as consultas simultaneamente usando Promise.all para melhorar a performance
  const [pending, review] = await Promise.all([
    queries.pendingQuantity, queries.reviewQuantity
  ]);

  // Retorna um objeto com os contadores das solicitações
  return {
    pending: pending.count || 0,  // Se não houver resultados, retorna 0
    review: review.count || 0,    // Se não houver resultados, retorna 0
    total: (pending.count || 0) + (review.count || 0),  // Calcula o total somando pendentes e revisões
  };
};
```

### 🔍 Explicação do funcionamento

- **Consultas simultâneas:** As consultas `pendingQuantity` e `reviewQuantity` são feitas usando `Promise.all` para buscar ambos os contadores de forma simultânea, melhorando a performance.
- **Uso de count:** `"exact"`: Estamos pedindo para o Supabase retornar a contagem exata de registros. O `count` retorna um número inteiro do total de registros encontrados, que no caso aqui corresponde ao número de solicitações com os status específicos.
- **Cálculo do total:** O total de solicitações é calculado somando o número de pendentes e revisões, o que ajuda a exibir o número completo de solicitações para o usuário.

### 🛠 Como adicionar novos contadores no futuro:

Se você quiser adicionar um novo contador, basta seguir esta estrutura:

- Adicionar uma nova consulta no objeto `queries`, com o status que deseja contar.
- Adicionar a variável de contagem ao retorno de `getCountersRequest`.

Exemplo de adicionar o contador para status `"Concluído"`:

```tsx
completedQuantity: supabaseApi.from("vw_solicitacoes_geral")
  .select("*", { head: true, count: "exact" })
  .eq("status", "Concluído"),

 // E no retorno:

 completed: completed.count || 0,
```

Assim você pode expandir facilmente a função para incluir novos contadores com diferentes status.

### Observação.

Precisa alterar o type no `Counters` do contexto `RequestContent`.