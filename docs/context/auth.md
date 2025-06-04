# Documentação do `AuthContext`

## 📁 Localização

`/context/auth.context.tsx`

## 📊 Visão Geral

O `AuthContext` é responsável por **gerenciar o estado de autenticação** do usuário em toda a aplicação.

Ele fornece:
- Controle de login e logout
- Validação da sessão e atualização automática do token
- Estado global do usuário autenticado (`user`)
- Controle de `loading` das transições de tela
- Registro de usuário da controladoria no Supabase (quando aplicável)
- Exibição de notificações (via `Toastify`) após transições

---

## 🔍 Detalhamento das Funções e Estados

### `user`
- Tipo: `IUser | null`
- Guarda os dados decodificados do usuário atual autenticado via token.
- Exemplo de um `IUser`
```tsx
user: {
    id_keycloak: '837a4643-5a41-431c-8933-54350f721b8b',
    username: 'fulano.beltrano',
    email: 'fulano.beltrano@rfk.ind.br',
    fullName: 'Fulano da Silva Beltrano',
    resource_access: {
        "sistema_cadastro": {
            "roles": [
                "usuario-teste",
                "usuario-role-all"
            ]
        },
        "account": {
            "roles": [
                "manage-account",
                "manage-account-links",
                "view-profile"
            ]
        }
    },
    access_approver: false,
    name: 'Fulano',
    groups: [
        "cadastro_rfk",
        "usuarios_teste"
    ],
    departaments: 'Comercial';
};
```
### `isAuthenticated`
- Tipo: `boolean`
- Indica se o usuário está com sessão ativa e autenticado

### `isLoading`
- Tipo: `boolean`
- Utilizado para mostrar um `loading` global durante transições de login, logout e validação de sessão.

### `toastMessage`
- Tipo: `IToastifyMessageAuthContext | null`
- Mensagem que será exibida após a finalização do carregamento, utilizando o componente `Toastify`.

```tsx
useEffect(() => {
  if (!isLoading && toastMessage) {
    Toastify(toastMessage);
    setToastMessage(null);
  }
}, [isLoading, toastMessage]);
```

---

### `loginService(dataLogin)`

1. Chama a função `Login()` (Keycloak API)
2. Salva os tokens (`access_token`, `refresh_token`) em cookies
3. Decodifica o token com `decodeToken()`
4. Constrói o usuário com `buildUserFromToken()`
5. Atualiza `user` e `isAuthenticated`
6. Caso o usuário seja aprovador (`access_approver`), registra/atualiza no Supabase com `upsertUserApprover()`
7. Define `toastMessage` de boas-vindas ou erro, se aplicável

**Importante:**
- É utilizado `setTimeout` ao final para suavizar a transição de loading
- Protege contra erros com try/catch

---

### `logoutService(toast?)`

1. Chama `Logout()` na API com `refresh_token`
2. Limpa cookies e estados (`user`, `isAuthenticated`)
3. Exibe `toastMessage` customizado (ou mensagem padrão de logout)
4. Navega para a página de login

---

### `checkSession()`

Responsável por **verificar se a sessão é válida ao iniciar a aplicação**:

1. Pega `access` e `refresh` dos cookies
2. Se não houver tokens, chama `logoutService()`
3. Se o `refresh_token` estiver expirado, também desloga
4. Se apenas o `access_token` expirou, chama `refreshTokenService()`
5. Se ambos forem válidos:
    - Atualiza o `user`
    - Reativa `isAuthenticated`
    - Agenda o `scheduleTokenRefresh()`

---

### `isTokenExpired(token)`

Verifica se o `exp` do token é menor que a data atual (timestamp unix).

---

### `refreshTokenService(tokenRefresh)`

1. Solicita novos tokens ao Keycloak
2. Atualiza cookies
3. Se falhar, executa `logoutService()`

---

### `scheduleTokenRefresh()`

Agenda uma renovação automática de token **30 segundos antes de expirar**:

```tsx
const expiresIn = decoded.exp * 1000 - Date.now() - 30000;
setTimeout(() => refreshTokenService(refreshToken), expiresIn);
```

Evita multiplas chamadas com `clearTimeout` e uma variável global `refreshTimeout`.

---

### `registerUpdateUserController()`

1. Verifica se o usuário tem `access_approver === true`
2. Executa `upsertUserApprover()` no Supabase
3. Mantém a base de aprovadores sincronizada com o login

---

## ⚖️ Regras de Uso

- O `AuthContext` deve **envolver toda a aplicação**
- Use `useContext(AuthContext)` para consumir os dados
- Nunca use cookies diretamente no componente
- Controle de rotas privadas deve se basear em `isAuthenticated`

---

## 💻 Exemplo de Uso

```tsx
import { useContext } from "react";
import { AuthContext } from "@/context/auth.context";

const { user, loginService, logoutService, isAuthenticated } = useContext(AuthContext);

useEffect(() => {
  if (!isAuthenticated) {
    navigate("/login");
  }
}, [isAuthenticated]);
```

---

## 🔗 Conexões e Dependências

- `Login`, `Logout`, `RefreshToken`: serviços de autenticação via Keycloak
- `Cookies`: leitura e escrita dos tokens
- `decodeToken`, `buildUserFromToken`: utilitários de interpretação do JWT
- `Toastify`: exibição de mensagens
- `upsertUserApprover`: integração com Supabase
- `useNavigate`: redirecionamento após login/logout
