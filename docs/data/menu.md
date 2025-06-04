# 📁 Localização

`/data/menu.ts`
Interface localizada em: `/interfaces/menu-data.interface.ts`

# 📊 Visão Geral

O arquivo `menu.ts` define os menus principais utilizados na aplicação, separando-os por perfil de usuário. Ele exporta duas constantes:

- `menuCommon`: menus destinados a usuários comuns (cadastros e solicitações de alterações).
- `menuController`: menus específicos para usuários da controladoria (análise e aprovação de solicitações).

Cada menu é composto por objetos do tipo `MenuItem`, definidos no arquivo de interfaces do projeto.

# 🔎 Detalhes Técnicos

- O tipo `MenuItem` está definido em `/interfaces/menu-data.interface.ts`, com a seguinte estrutura:

```ts
export type MenuItem = {
  label: string;
  icon: LucideIcon;
  path?: string;
  children?: {
    label: string;
    path: string;
    icon: LucideIcon;
  }[];
};
```
- Os menus utilizam ícones da biblioteca `lucide-react`.
- Cada item pode conter:
    - `label`: texto exibido no menu.
    - `icon`: ícone representativo.
    - `path`: rota direta (caso não haja submenu).
    - `children`: lista de subitens, cada um com `label`, `path` e `icon`.
- `menuCommon` contempla as seções:
    - Pessoas e Serviços
    - Produtos Acabados (PA)
    - Materiais e Insumos
    - Configuração de Padrões
    - Solicitar Alteração
- `menuController` é utilizado pela controladoria para gerenciar solicitações agrupadas em:
    - Pendentes
    - Revisão
    - Negado
    - Aprovado

# ⚖️ Regras de Uso

- Este arquivo serve apenas como fonte de dados. A lógica de exibição condicional por perfil de usuário deve ser aplicada na camada de contexto `navigation.context.tsx`
- Os itens com `children` devem ser renderizados como menus com subníveis.
- Não incluir lógica de autenticação ou permissões diretamente neste arquivo.
- Ícones devem seguir o padrão de importação de `lucide-react`.

# 💻 Exemplo de Uso

```ts
import { menuCommon, menuController } from '@/data/menu';

function renderMenu(userIsController: boolean) {
  const items = userIsController ? menuController : menuCommon;

  return (
    <Sidebar>
      {items.map((item) => (
        item.children ? (
          <DropdownMenu key={item.label} label={item.label} icon={item.icon}>
            {item.children.map(child => (
              <MenuItem key={child.path} path={child.path} icon={child.icon} label={child.label} />
            ))}
          </DropdownMenu>
        ) : (
          <MenuItem key={item.path} path={item.path!} icon={item.icon} label={item.label} />
        )
      ))}
    </Sidebar>
  );
}
```