# 📁 Documentação (`public.routes.tsx`)

### 📁 Localização

`/src/routes/public.routes.tsx`

---

## 📊 Visão Geral

Este componente é responsável por **renderizar as rotas públicas** da aplicação. Ele utiliza o array `publicRoutes` definido em `routes.ts` e cria dinamicamente os caminhos com seus respectivos componentes.

---

## 🔁 Lógica de Renderização

```tsx
<Routes>
  {publicRoutes.map(({ path, element: Element }) => (
    <Route key={path} path={path} element={<Element />} />
  ))}
  <Route path="*" element={null} />
</Routes>
```

- Mapeia todas as rotas públicas declaradas em `routes.ts`
- Adiciona fallback com `path="*"` que renderiza `null` (nenhum conteúdo)

---

## 🌐 Rotas Públicas Disponíveis

| Caminho  | Componente   |
|----------|--------------|
| `/`      | `LoginPage`  |
| `/login` | `LoginPage`  |

---

## 📦 Dependências

- `react-router-dom`: `Routes`, `Route`
- `routes.ts`: importa o array `publicRoutes`

---

## 🧠 Boas Práticas Aplicadas

- ✨ Modularidade com separação entre rotas públicas e privadas
- 🔁 Uso de `.map()` para evitar duplicação de código
- 📦 Estrutura simples e declarativa
