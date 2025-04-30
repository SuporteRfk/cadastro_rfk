# Documentação do Componente `Nav Menu`;

# 📁 Localização

`/components/menu/nav-menu.tsx`

# 📊 Visão Geral

O componente `nav-menu` é responsável por renderizar a navegação da aplicação, incluindo categorias principais e seus submenus. Ele se adapta dinamicamente ao estado do menu (aberto/fechado no desktop ou mobile) e ao tipo de usuário (com base nas permissões do contexto de autenticação).

A navegação é exibida a partir da lista de menus gerenciada pelo `navigation.context` e os ícones são fornecidos pela biblioteca `lucide-react`. O componente também lida com o encerramento de sessão do usuário.

# 🔎 Detalhes Técnicos

- Consome o `navigation.context` para obter:
  - `menus`: lista completa de menus (comuns + controladoria).
  - `lengthMenuCommom`: usado para separar menus comuns e da controladoria com uma borda.
  - `isSidebarOpen`, `isMobileOpenMenu`: estados que controlam o comportamento responsivo.
  - `handleCategoryClick`, `activeCategory`: controle de abertura dos submenus.
  - `isMenuRouteActive`: verificação de rota ativa.
  - `handleNavigate`: navegação programática ao clicar em itens.

- Também consome o `auth.context` para acessar a função `logoutService`.

- Utiliza animações do `framer-motion` para transições suaves nos labels e submenus.

- O menu é composto por:
  - Itens principais com ou sem submenus.
  - Separador visual entre menus comuns e da controladoria.
  - Submenus que expandem com base em `activeCategory`.
  - Botão de logout fixado na parte inferior.

  # ⚖️ Regras de Uso

- Este componente deve ser utilizado dentro de um `NavigationProvider` e um `AuthProvider`, pois depende desses contextos.
- A estrutura de menus vem de `data/menu.ts`, conforme o perfil do usuário.
- A animação e a exibição condicional dos labels dependem do estado de abertura (`isSidebarOpen` e `isMobileOpenMenu`).
- O botão de logout chama `logoutService` com uma mensagem de sucesso.
- Para adicionar novas rotas ou categorias, edite os arquivos em `/data/menu.ts`.



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
