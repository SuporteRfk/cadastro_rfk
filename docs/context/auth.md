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
- Utilizado para mostrar um `loading` global durante as transições de login, logout e verificações de sessão.

### `toastMessage`
- Armazena uma notificação (mensagem e tipo) que só é exibida **após** o `isLoading` finalizar.
- Mensagem pendente que será exibida após loading (usando o componente Toastify)

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

1. Chama a função `Login()` (API Keycloak)
2. Salva os tokens (`access` e `refresh`) nos cookies
3. Decodifica o token para extrair os dados do usuário
4. Atualiza `user` e `isAuthenticated`
5. Chama `registerUpdateUserController()` e caso o usuário seja da controladoria atualiza a tabela no `supabase` dos usuários aprovadores.
6. Armazena `toastMessage`

**Importante:**
- É utilizado `setTimeout` ao final para suavizar a transição de loading
- Protege contra erros com try/catch

---

### `logoutService(toast?)`

1. Chama a API de `Logout()` com `refresh_token`
2. Remove cookies com os tokens
3. Limpa estados (`user`, `isAuthenticated`)
4. Exibe um Toastify:
   - Se for passado um objeto toast, exibe esse.
   - Caso contrário, exibe a mensagem padrão de logout (Sessão encerrada com sucesso).
5. Finaliza o `loading` suavemente usando `setTimeout`.

---

### `checkSession()`

Responsável por **verificar se a sessão é válida ao iniciar a aplicação** ou em intervalos regulares:

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

Utiliza o `decodeToken()` para verificar se a propriedade `exp` (timestamp Unix) já passou em relação ao tempo atual.

---

### `refreshTokenService(tokenRefresh)`

Chama o serviço do Keycloak para renovar os tokens.
- Se falhar, executa `logoutService()` para forçar o re-login.

---

### `scheduleTokenRefresh()`

Agenda o próximo `refreshTokenService()` **30 segundos antes** do token expirar:
```tsx
const expiresIn = decoded.exp * 1000 - Date.now() - 30000;
setTimeout(() => refreshTokenService(refreshToken), expiresIn);
```

Evita multiplas chamadas com `clearTimeout` e uma variável global `refreshTimeout`.

---

### `registerUpdateUserController()`

- Verifica se o usuário logado tem `access_approver === true`
- Se tiver, faz `upsert` (inserção/atualização) no Supabase com os dados do usuário
- Mantém controle da controladoria sincronizado com as credenciais

---

## ⚖️ Regras de Uso

- O `AuthContext` deve **envolver toda a aplicação** para prover acesso aos dados de login e funções de sessão
- Não utilize diretamente cookies para ler dados de autenticação. Use o `user` do contexto
- Não reescreva a lógica de validação de token fora deste contexto
- Use `isAuthenticated` para controlar rotas privadas

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

- `Login`, `Logout`, `RefreshToken`: Serviços da API do Keycloak
- `decodeToken`: Utilitário que transforma o JWT em objeto decodificado
- `buildUserFromToken`: Extrai dados como nome, email, roles do token
- `Cookies`: Usado para armazenar e remover tokens
- `Toastify`: Exibe mensagens de erro, sucesso e informações
- `upsertUserApprover`: (Supabase) Sincroniza dados de controle

---

Este contexto é o **coração da autenticação do sistema** e foi pensado para evitar:
- Repetição de código
- Erros por falta de validação de sessão
- Experiências inconsistentes para o usuário

Se for fazer ajustes, **documente a razão e valide o impacto em toda a aplicação**.