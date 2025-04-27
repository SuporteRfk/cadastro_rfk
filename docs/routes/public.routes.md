# PublicRoutes

## 📁 Localização
`/src/routes/public.routes.tsx`


## 📊 Visão Geral
Arquivo responsável por organizar as rotas públicas da aplicação.

Estas rotas são acessíveis apenas por usuários **não autenticados** (ex.: página de Login).  
Se o usuário já estiver autenticado, ele será automaticamente redirecionado para o `/dashboard`.

## 🔎 Detalhes Técnicos
- Consome o `AuthContext` para verificar se o usuário está autenticado (`isAuthenticated`).
- Se o usuário estiver autenticado, redireciona imediatamente para `/dashboard` usando o componente `Navigate` do `react-router-dom`.
- Caso contrário, renderiza as rotas públicas listadas em `/routes/routes.ts`.
- Inclui uma rota `path="*"` para capturar URLs inválidas e renderizar a página `NotFoundPage`.

## ⚖️ Regras de Uso
- Todas as rotas públicas devem ser configuradas no arquivo `routes.ts`.
- Não adicionar verificações manuais de autenticação dentro dos componentes das páginas públicas — o controle de acesso é centralizado aqui.
- A função de redirecionamento (`Navigate`) deve sempre usar `replace` para evitar problemas no histórico de navegação.

## 💻 Exemplo de Uso
Renderização condicional das rotas:

```tsx
if (isAuthenticated) {
  return <Navigate to="/dashboard" replace />;
}

return (
  <Routes>
    {publicRoutes.map(({ path, element: Element }) => (
      <Route key={path} path={path} element={<Element />} />
    ))}
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);
```