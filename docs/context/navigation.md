# Documentação do `Navigation Context`

## 📁 Localização

`/context/navigation.context.tsx`

# 📊 Visão Geral

O `NavigationContext` é responsável por gerenciar os estados e funções relacionados à navegação e ao controle visual do menu lateral (sidebar) e do menu mobile na aplicação.

Ele fornece o estado de abertura do sidebar, controle de abertura para dispositivos móveis, a lista de menus baseada no perfil do usuário (comum ou controladoria), navegação de rotas e controle de categorias ativas.

# 🔎 Detalhes Técnicos

- `isSidebarOpen`: controla a abertura ou fechamento do menu lateral (desktop).
- `isMobileOpenMenu`: controla a abertura ou fechamento do menu lateral no mobile.
- `setIsMobileOpenMenu`: função para alterar o estado de `isMobileOpenMenu`.
- `lengthMenuCommom`: armazena a quantidade de itens do menu comum para controle visual (ex.: separadores de menu).
- `menus`: lista de menus exibida, variando conforme o tipo de usuário (comum ou controladoria).
- `toggleSideBar()`: alterna a abertura/fechamento do sidebar.
- `toggleMenuMobile()`: alterna a abertura/fechamento do menu mobile.
- `resetPathsMenusAndNavigateDashboard()`: reseta a navegação, desmarcando categorias e redirecionando para o dashboard.
- `activeCategory`: armazena a categoria de menu ativa para expandir ou retrair submenus.
- `handleCategoryClick(categoryLabel)`: alterna a seleção da categoria ativa no menu.
- `isMenuRouteActive(path)`: verifica se o caminho atual da URL corresponde ao item do menu (para controle visual de seleção).
- `handleNavigate(path)`: realiza a navegação programática para uma rota específica.


# ⚖️ Regras de Uso

- O `NavigationProvider` deve envolver todos os componentes que dependem dos dados de navegação (menu, sidebar, etc.).
- O menu exibido é dinâmico: usuários com permissão de aprovador (`access_approver`) terão acesso também aos menus comuns.
- A função `handleCategoryClick` deve ser usada para lidar com submenus, garantindo que apenas uma categoria esteja aberta por vez.
- A função `resetPathsMenusAndNavigateDashboard` é útil para redefinir o estado do menu ao retornar à tela inicial.
- Não realizar lógicas de autenticação diretamente neste contexto; ele apenas lê o estado do `AuthContext`.
- O `lengthMenuCommom` é utilizado para aplicar uma separação visual entre os menus comuns e os de controladoria.

# 💻 Exemplo de Uso

```tsx
import { useContext } from "react";
import { NavigationContext } from "@/context/navigation.context";

function SidebarToggleButton() {
  const { isSidebarOpen, toggleSideBar } = useContext(NavigationContext);

  return (
    <button onClick={toggleSideBar}>
      {isSidebarOpen ? "Fechar Menu" : "Abrir Menu"}
    </button>
  );
}
```