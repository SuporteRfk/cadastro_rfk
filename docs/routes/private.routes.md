# PrivateRoutes

## 📁 Localização
`/src/routes/private.routes.tsx`

## 📊 Visão Geral
Arquivo responsável por organizar as rotas privadas da aplicação.

Estas rotas só são acessíveis por usuários autenticados.  
Usuários não autenticados nunca chegam até este ponto, pois são redirecionados antes no `App.tsx`.

Além disso, ao acessar a URL raiz `/`, o usuário autenticado é automaticamente redirecionado para a página `/dashboard`.

## 🔎 Detalhes Técnicos
- Consome a lista de rotas privadas do arquivo `routes.ts`.
- Mapeia dinamicamente os caminhos e componentes usando `.map`.
- Inclui um redirecionamento manual (`Navigate`) de `/` para `/dashboard`.
- Inclui uma rota `path="*"` que renderiza o `NotFoundPage` caso o usuário tente acessar uma URL inválida.

## ⚖️ Regras de Uso
- Todas as rotas privadas devem ser registradas no arquivo `routes.ts`.
- Não adicionar verificações manuais de autenticação dentro dos componentes privados — a proteção é feita no roteador central (App).
- Manter o redirecionamento de `/` para `/dashboard` para garantir consistência de acesso.

## 💻 Exemplo de Uso
No `PrivateRoutes.tsx`:

```tsx
<Routes>
  <Route path="/" element={<Navigate to="/dashboard" replace />} />
  {privateRoutes.map(({ path, element: Element }) => (
    <Route key={path} path={path} element={<Element />} />
  ))}
  <Route path="*" element={<NotFoundPage />} />
</Routes>
```