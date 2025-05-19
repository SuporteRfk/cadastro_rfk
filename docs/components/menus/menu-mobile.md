# Documentação do Componente `Menu Mobile`;

# 📁 Localização

`/components/menu/menu-mobile.components.tsx`

# 📊 Visão Geral

O componente `MenuMobile` é responsável por exibir a navegação em um menu drop down do sistema em telas menores (mobile). Ele utiliza animações com `framer-motion` para mostrar e ocultar o menu de forma fluida e responsiva, além de permitir interação através do botão "hambúrguer".

# 🔎 Detalhes Técnicos

- O menu é ativado/desativado por um botão do tipo "hambúrguer", usando o componente `Hamburger` da biblioteca `hamburger-react`.
- A animação de exibição e ocultação do menu é feita com `framer-motion` (`motion.div` + `AnimatePresence`).
- O menu em si é composto pelo componente `NavMenu`, que já possui a lógica de navegação, submenus e logout.
- Utiliza o hook `useClickAway` (da lib `react-use`) para detectar cliques fora do menu e fechá-lo automaticamente.
- O estado do menu (aberto/fechado) é gerenciado pelo `NavigationContext`.

### Estrutura interna:

- Um topo fixo com:
  - Logo da empresa (clique redireciona para dashboard e reseta estados)
  - Botão de menu hamburguer com cor dinâmica baseada no estado (`isMobileOpenMenu`)
- Quando `isMobileOpenMenu` é verdadeiro, o menu (`NavMenu`) é exibido com animação deslizante.

# ⚖️ Regras de Uso

- Este componente deve ser renderizado apenas em resoluções menores (`lg:hidden`), sendo opcional em desktops.
- O `MenuMobile` depende do `NavigationContext`, que precisa envolver o componente na árvore principal.
- O clique no logo chama `resetPathsMenusAndNavigateDashboard()`, útil para navegação global.
- O menu fecha automaticamente se o usuário clicar fora da área do menu (via `useClickAway`).
- O botão `Hamburger` deve refletir corretamente o estado `isMobileOpenMenu`.


# 💻 Exemplo de Uso

```tsx
import { MenuMobile } from "@/components/menu/MenuMobile";

export default function AppLayout() {
  return (
    <>
      <MenuMobile />
      {/* Conteúdo principal */}
    </>
  );
}