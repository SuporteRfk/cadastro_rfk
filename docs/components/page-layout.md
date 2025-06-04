# 📁 Documentação do Componente `PageLayout`

## 📁 Localização
`/components/page-layout.components.tsx`

---

## 📊 Visão Geral

O `PageLayout` é um componente de **estrutura base de páginas** da aplicação. Ele organiza:

- Os **menus principais** (mobile e desktop)
- O conteúdo dinâmico da página
- A responsividade do layout entre dispositivos grandes e pequenos

É utilizado como wrapper padrão para páginas protegidas ou internas.

---

## 🧱 Estrutura do Layout

```tsx
<main className="flex flex-col lg:flex-row relative top-0 left-0 w-full h-screen bg-bg lg:pl-[85px]">
  <MenuMobile />
  <MenuDesktop />
  <div className="flex h-full lg:justify-center w-full px-0 sm:px-2">
    {children}
  </div>
</main>
```

### 🔍 Explicação das classes e comportamento:

| Elemento                  | Classe aplicada                                       | Comportamento                                                                 |
|---------------------------|--------------------------------------------------------|--------------------------------------------------------------------------------|
| `<main>` container        | `flex flex-col lg:flex-row`                           | Alinha elementos verticalmente em mobile, horizontal em desktop                |
|                           | `relative top-0 left-0 w-full h-screen`              | Ocupa a tela toda                                                              |
|                           | `bg-bg lg:pl-[85px]`                                 | Aplica o background global e padding lateral para o menu lateral               |
| `<div>` interna           | `flex h-full lg:justify-center w-full px-0 sm:px-2`  | Garante centralização e padding responsivo para o conteúdo                    |

---

## 🔧 Props Aceitas

| Prop       | Tipo         | Descrição                                               |
|------------|--------------|-----------------------------------------------------------|
| `children` | `ReactNode`  | Conteúdo que será renderizado dentro da estrutura do layout |

---

## 📱 Menus Inclusos

- `MenuMobile`: versão compacta do menu para telas pequenas
- `MenuDesktop`: versão lateral fixa do menu para telas grandes (`lg:`)

---

## ⚖️ Regras de Uso

- Deve envolver todas as páginas internas da aplicação
- O conteúdo é renderizado através do `children`
- Usa Tailwind para garantir responsividade sem media queries manuais
- Os componentes de menu são inseridos diretamente no layout
- Em resoluções grandes (`lg:`), o menu lateral é deslocado com padding (`pl-[85px]`)

---

## 💻 Exemplo de Uso

```tsx
import { PageLayout } from "@/components/page-layout.components";

export const DashboardPage = () => (
  <PageLayout>
    <h1 className="text-2xl font-bold">Painel Administrativo</h1>
    <Card />
    <Table />
  </PageLayout>
);
```

---

## 🔗 Conexões e Dependências

- Componente usado diretamente dentro de rotas (via `App.tsx`)
- Relaciona-se com o sistema de navegação da aplicação
- Garante que o menu sempre esteja presente e corretamente alinhado

---

## 🧠 Por que usar este layout?

- Garante **consistência visual** entre páginas
- Elimina duplicação de código de menu ou wrappers
- Melhora a UX com estrutura responsiva e fluida
