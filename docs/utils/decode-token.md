# 📁 Documentação do Utilitário (`decodeToken`)

### 📁 Localização

`/utils/decode-token.utils.ts`


## 📊 Visão Geral

O `decodeToken` é um utilitário responsável por **decodificar um token JWT** e retornar seu conteúdo (payload) como objeto. Ele é utilizado principalmente no processo de autenticação para extrair dados do usuário após o login.


## 📦 Parâmetros

```ts
decodeToken(token: string): ITokenRefresh | ITokenBearer
```

| Parâmetro | Tipo     | Descrição                     |
|-----------|----------|-------------------------------|
| `token`   | `string` | Token JWT codificado recebido |



## 🔁 Retorno

- Um objeto do tipo `ITokenBearer` ou `ITokenRefresh`, contendo os dados internos do token.
- Pode incluir:
  - `sub`, `exp`, `preferred_username`, `email`, `given_name`, `family_name`
  - `resource_access`, `groups`, `distinguished_name`
  - Entre outros campos definidos no JWT


## 💻 Exemplo de Uso

```ts
import { decodeToken } from "@/utils/decode-token.utils";

const token = getCookie("access_token");
const decoded = decodeToken(token);

console.log(decoded.email); // exemplo: "usuario@empresa.com"
```


## 🔗 Dependências

- [`jwt-decode`](https://www.npmjs.com/package/jwt-decode): Biblioteca externa usada para decodificar o JWT.


## ⚖️ Regras de Uso

- O token precisa ser um JWT válido (formato Base64: `header.payload.signature`)
- Esse utilitário **não valida** a assinatura do token, apenas decodifica o conteúdo.
- Usado principalmente junto com o `buildUserFromToken`.


## 🧠 Por que usar este utilitário?

- 🔓 Permite extrair rapidamente os dados do usuário autenticado
- 🧼 Centraliza a lógica de decodificação de token em um único lugar
- 🚀 Facilita o uso em `AuthContext`, `checkSession`, `refreshToken`, etc.
