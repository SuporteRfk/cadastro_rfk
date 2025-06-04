# Documentação do `NavigationContext`

## 📁 Localização

`/context/navigation.context.tsx`

## 📊 Visão Geral

O `NavigationContext` gerencia o comportamento da navegação e dos menus da aplicação, tanto no modo **desktop (sidebar)** quanto **mobile**.

Ele oferece:
- Estado aberto/fechado dos menus
- Ações para alternar visibilidade dos menus
- Controle da categoria de menu ativa
- Navegação programática
- Detecção de rota atual para destacar o menu ativo

---

## 🔍 Tipagem

### `INavigationContextType`
```ts
{
  isSidebarOpen: boolean;
  isMobileOpenMenu: boolean;
  setIsMobileOpenMenu: Dispatch<SetStateAction<boolean>>;
  lengthMenuCommom: number;
  menus: MenuItem[];
  toggleSideBar(): void;
  toggleMenuMobile(): void;
  activeCategory: string | null;
  handleCategoryClick(categoryLabel: string): void;
  isMenuRouteActive(path: string): boolean;
  handleNavigate(path: string): void;
  setActiveCategory(value: string | null): void;
  setIsSidebarOpen(value: boolean): void;
}
```

---

## ⚙️ Estados e Funções

### `isSidebarOpen`
- Tipo: `boolean`
- Define se o menu lateral (desktop) está visível

### `isMobileOpenMenu`
- Tipo: `boolean`
- Define se o menu lateral mobile está aberto

### `setIsMobileOpenMenu` / `toggleMenuMobile`
- Controlam a visibilidade do menu mobile

### `menus`
- Tipo: `MenuItem[]`
- Lista de opções de navegação.
- Definida com base no tipo de usuário (`menuCommon` padrão ou `menuController` para controladoria)

### `lengthMenuCommom`
- Tipo: `number`
- Contém o tamanho da lista de menus comuns

### `toggleSideBar`
- Alterna o estado do `isSidebarOpen`

---

### `activeCategory` / `setActiveCategory`
- Categoria atualmente selecionada no menu (usada para destacar e filtrar)

### `handleCategoryClick(categoryLabel)`
- Define a nova `activeCategory`
- Permite destacar visualmente ou renderizar submenus

---

### `isMenuRouteActive(path)`
- Retorna `true` se a rota atual (`location.pathname`) começa com o `path` informado

```ts
isMenuRouteActive("/solicitacoes") // true se rota for /solicitacoes ou filhos
```

---

### `handleNavigate(path)`
- Executa `navigate(path)` do React Router
- Usado para navegação programada após cliques ou ações

---

## 🔗 Conexões e Dependências

- `useLocation()`: usado para verificar a rota atual e destacar o menu correto
- `useNavigate()`: navegação programática
- `AuthContext`: determina qual lista de menus será usada (`menuCommon` ou `menuController`)
- `menuCommon`, `menuController`: arquivos de configuração de menu (`@/data/menus`)

---

## 💻 Exemplo de Uso

```tsx
import { useContext } from "react";
import { NavigationContext } from "@/context/navigation.context";

const { toggleSideBar, menus, handleNavigate } = useContext(NavigationContext);

return (
  <button onClick={() => handleNavigate("/dashboard")}>Ir para dashboard</button>
);
```

---

## 📌 Observações

- A lógica está desacoplada da interface: o contexto apenas controla o estado e fornece funções.
- A renderização dos menus (visuais) é feita em componentes separados que consomem este contexto.
- `activeCategory` pode ser usada para expandir menus em grupo ou destacar uma seção.

