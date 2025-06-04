# 🔁 Fluxo da Aplicação

Esta seção detalha o fluxo de inicialização e comunicação da aplicação React.

---

## 🚪 Ponto de Entrada

### `main.tsx`
```tsx
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

- Inicia o app React chamando o componente `App`.
- Envolve o app com `StrictMode` para avisos de boas práticas.

---

## 🧩 Componente Principal

### `App.tsx`
- Encapsula o sistema com diversos *providers*, incluindo:
  - `AuthContext.Provider`
  - `NavigationContext.Provider`
  - `RequestContext.Provider`
- Define as rotas através do componente `<Router />`.

---

## 🔐 Autenticação

### `AuthContext`
- Responsável por:
  - Armazenar o usuário autenticado.
  - Carregar o perfil do usuário.
  - Fazer logout e controle de sessão.
- Usado por múltiplos componentes e por `RequestContext`.

---

## 📥 Requisições

### `RequestContext`
- Gerencia:
  - Lista de requisições
  - Contadores (`total`, `pending`, `review`)
  - Estado de loading global
- Utiliza `getRequestService()` e `getCountersRequest()` vindos dos serviços.

---

## 📦 Rotas

### `routes/`
- Define os caminhos públicos (`/login`, `/404`) e privados (`/dashboard`, etc.).
- Assegura proteção por autenticação via `<PrivateRoute />`.

---

## 🔄 Conexões Entre Módulos

- `App.tsx` → Renderiza providers e rotas
- `AuthContext` → Disponibiliza usuário para os componentes
- `RequestContext` → Usa dados do `AuthContext` para buscar requisições
- `hooks/use-supabase-realtime` → Atualiza dados em tempo real
- `services/` → Faz as chamadas para o Supabase e outros serviços de API, como `apiViaCep` e `BrasilApi`.

Esse fluxo garante uma separação limpa entre UI, dados e lógica de estado global.
