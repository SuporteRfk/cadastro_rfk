# Documentação do Componente `Menu Desktop`;

# 📁 Localização

`/components/menu/menu-desktop.components.tsx`

# 📊 Visão Geral

O componente `MenuDesktop` é o menu lateral fixo da aplicação, exibido exclusivamente em dispositivos com telas maiores (desktop). Ele é responsável por apresentar a navegação principal do sistema e oferecer um botão para abrir/fechar o menu lateral (sidebar).

Esse menu é responsivo em largura, podendo ser expandido ou colapsado com base no estado `isSidebarOpen`, e utiliza animações suaves com `framer-motion` para a transição visual dos elementos.

# 🔎 Detalhes Técnicos

- O menu é encapsulado em um `<motion.aside>` com largura dinâmica:
  - `286px` quando expandido
  - `80px` quando colapsado
- O componente consome o `NavigationContext` para acessar:
  - `isSidebarOpen`: controla o estado do menu (aberto ou fechado)
  - `toggleSideBar`: função que alterna o estado
  - `resetPathsMenusAndNavigateDashboard`: função que redefine o menu e redireciona para o dashboard

- O topo do menu contém:
  - O **logo do sistema** (clicável para redirecionar ao dashboard)
  - O **nome do sistema** (visível somente com o menu expandido)
  - Um botão do tipo "hambúrguer" (`hamburger-react`) para abrir/fechar a sidebar

- O conteúdo do menu é renderizado pelo componente `NavMenu`, que trata os itens, submenus e logout.

# ⚖️ Regras de Us

- Este componente deve ser renderizado **apenas em resoluções desktop** (`lg:flex`) e não deve ser visível em mobile.
- O `MenuDesktop` depende do `NavigationContext`, que precisa estar ativo no escopo.
- O botão de menu deve usar `toggleSideBar` para alterar o estado da sidebar.
- O logo chama `resetPathsMenusAndNavigateDashboard()` ao ser clicado.
- O componente `NavMenu` é usado para exibir os itens reais da navegação.

# 💻 Exemplo de Uso

```tsx
import { MenuDesktop } from "@/components/menu/MenuDesktop";

export default function Layout() {
  return (
    <div className="flex">
      <MenuDesktop />
      <main className="flex-1">{/* Conteúdo principal */}</main>
    </div>
  );
}