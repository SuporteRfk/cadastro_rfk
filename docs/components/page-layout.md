# Documentação do Componente `PageLayout`;

## 📁 Localização

`/components/page-layout.components.tsx`

## 📊 Visão Geral

O componente `PageLayout` é responsável por renderizar a estrutura básica da página, com menus responsivos (desktop e mobile) e o conteúdo principal. Ele centraliza o layout da aplicação, garantindo que o menu esteja sempre presente, e o conteúdo seja exibido de forma fluida. O `children` é passado como prop, permitindo que qualquer conteúdo seja injetado no layout.

## 🔎 Detalhes Técnicos

- `MenuDesktop`: Exibe o menu de navegação completo para telas grandes.
- `MenuMobile`: Exibe o menu de navegação compactado para dispositivos móveis.
- `children`: Qualquer conteúdo que será renderizado dentro do layout. Isso torna o componente genérico e reutilizável para diferentes páginas.

## ⚖️ Regras de Uso

- **Uso dentro de páginas**: Este componente deve ser utilizado em todas as páginas que precisam de um layout com menu e conteúdo centralizado.
- **Responsividade**: O componente se adapta a diferentes tamanhos de tela, com o menu ocupando a largura da tela em dispositivos grandes e comprimido em dispositivos móveis.
- **Conteúdo dinâmico**: O conteúdo é passado como `children`, permitindo que cada página tenha seu próprio conteúdo.

## 💻 Exemplo de Uso

```tsx
import { PageLayout } from "@/components/PageLayout";

export const DashboardPage = () => {
  return (
    <PageLayout>
      {/* Conteúdo da página */}
      <h2>Bem-vindo à Dashboard</h2>
      {/* Outros componentes aqui */}
    </PageLayout>
  );
};

```