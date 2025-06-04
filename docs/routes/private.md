# 📁 Documentação (`private.routes.tsx`)

### 📁 Localização

`/src/routes/private.routes.tsx`

---

## 📊 Visão Geral

Este componente é responsável por **renderizar as rotas privadas** da aplicação, ou seja, aquelas que exigem autenticação.

Ele utiliza o array `privateRoutes` definido em `routes.ts` e adiciona dois comportamentos importantes:

1. Redireciona `/` para `/dashboard`
2. Adiciona fallback para rotas inválidas (`path="*"`) renderizando `null`

---

## 🔁 Lógica de Renderização

```tsx
<Routes>
  <Route path="/" element={<Navigate to="/dashboard" replace />} />
  {privateRoutes.map(({ path, element: Element }) => (
    <Route key={path} path={path} element={<Element />} />
  ))}
  <Route path="*" element={null} />
</Routes>
```

---

## 🔐 Rotas Privadas Disponíveis

Ver a lista completa no arquivo [`routes.md`](./routes.md)

---

## 📦 Dependências

- `react-router-dom`: `Routes`, `Route`, `Navigate`
- `routes.ts`: importa o array `privateRoutes`

---

## 🧠 Boas Práticas Aplicadas

- ✅ Redirecionamento inicial para `/dashboard`
- ✨ Organização modular das rotas
- 🔁 Renderização dinâmica via `.map()`
- 📦 Separação entre responsabilidades públicas e privadas
