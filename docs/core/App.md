# 📁 Documentação (`App.tsx`)

### 📁 Localização
`/src/App.tsx`

---

## 📊 Visão Geral

O componente `App` é o **ponto de entrada da aplicação** e responsável por:

- Definir se rotas públicas ou privadas devem ser exibidas
- Redirecionar o usuário conforme estado de autenticação
- Validar se a rota acessada existe
- Exibir o `FullPageLoader` enquanto o app inicializa
- Renderizar a página de erro para rotas inválidas

---

## 🔐 Integração com Autenticação

O componente consome o `AuthContext` para obter:

- `isAuthenticated`: se o usuário está logado
- `isLoading`: se os dados de sessão ainda estão sendo verificados

---

## 🧭 Verificação de Rotas

```tsx
const allRoutes = [...publicRoutes, ...privateRoutes];
const routeExists = allRoutes.some(route => pathName == route);
```

- Monta uma lista completa de rotas públicas e privadas
- Valida se o `pathname` atual corresponde a alguma delas

---

## 🔁 Redirecionamentos

### Lógica:

```tsx
if (isAuthenticated && isPublic) {
  navigate("/dashboard");
}

if (!isAuthenticated && isPrivate) {
  navigate("/login");
}
```

- Usuário autenticado não acessa rotas públicas (ex: `/login`)
- Usuário **não autenticado** não acessa rotas privadas

---

## ⏳ Controle de Montagem

```tsx
const timeout = setTimeout(() => {
  setIsRouteReady(true);
}, 10);
```

- Pequeno delay para garantir que o `Router` já montou antes de navegar

---

## 🔁 Renderização Final

```tsx
return (
  isLoading || isAuthenticated === null || !isRouteReady ? (
    <FullPageLoader />
  ) : !routeExists ? (
    <NotFoundPage />
  ) : isAuthenticated ? (
    <PrivateRoutes />
  ) : (
    <PublicRoutes />
  )
);
```

---

## 📦 Componentes e Dependências

- `AuthContext`: controle de sessão
- `useLocation`, `useNavigate`: navegação e leitura de rota
- `routes.ts`: listas de rotas públicas e privadas
- `FullPageLoader`: indicador de carregamento
- `NotFoundPage`: fallback para rotas inexistentes
- `PublicRoutes`, `PrivateRoutes`: agrupadores de rotas

---

## 🧠 Boas Práticas

- ✅ Lógica desacoplada por rota pública/privada
- 🔁 Redirecionamento automático
- 🚦 Controle explícito de carregamento e fallback
- 🔐 Segurança básica de acesso por rota
