# NotFoundPage

## 📁 Localização
`/src/features/not-found/page/not-found-page.page.tsx`

## 📊 Visão Geral
Página de erro exibida quando o usuário tenta acessar uma rota inexistente.

Além de informar que a página não foi encontrada, o componente direciona o usuário para a tela correta:
- Se o usuário **está autenticado**, redireciona para `/dashboard`.
- Se o usuário **não está autenticado**, redireciona para `/login`.

A página também possui animações utilizando `framer-motion` para tornar a experiência de erro mais amigável e dinâmica.

## 🔎 Detalhes Técnicos
- Utiliza `useNavigate` do `react-router-dom` para redirecionamento.
- Consome o `AuthContext` para verificar o estado de autenticação (`isAuthenticated`).
- Exibe animações para o título "404" e demais textos usando o `framer-motion`.
- Layout responsivo, centralizado e estilizado com TailwindCSS.

## ⚖️ Regras de Uso
- Deve ser usada como fallback (`path="*"`) em `PrivateRoutes` e `PublicRoutes`.
- Não deve conter lógica pesada ou chamadas de API — é apenas uma página informativa.
- Deve manter o mesmo comportamento de redirecionamento condicional baseado na autenticação.

## 💻 Exemplo de Uso
Dentro do `PrivateRoutes.tsx` ou `PublicRoutes.tsx`:

```tsx
<Route path="*" element={<NotFoundPage />} />
