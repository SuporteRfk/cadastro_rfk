# Documentação da Função `buildUserFromToken`

## 📁 Localização
`/utils/buildUser.utils.ts`

## 📊 Visão Geral

A função `buildUserFromToken` é responsável por transformar os dados do token decodificado do Keycloak em um objeto padronizado do tipo `IUser`, utilizado em todo o sistema para autenticação e controle de acesso.

```tsx
Objeto `IUser`

IUser {
    id_keycloak: string;
    username: string;
    email: string;
    fullName: string;
    resource_access: IResourceAccess;
    access_approver: boolean;
    name: string;
    groups: string[];
    departaments: string;
};
```

---

## 📊 Funções Auxiliares

### ✅ `getDepartmentFromDistinguishedName`

Extrai o nome do departamento a partir de uma string DN (Distinguished Name) do Active Directory.

```ts
// Exemplo:
CN=João,CN=Usuarios,OU=TI,OU=Londrina,...
// Retorna: "TI"
```

---

### ✅ `userHasAccessApprover`

Verifica se o usuário tem acesso à controladoria, com base nas roles presentes no token.

- Utiliza a role definida na variável de ambiente `VITE_KEYCLOAK_ROLE_CONTROLADORIA`
- Verifica dentro de `resource_access[clientId].roles`

---

## ✅ `buildUserFromToken`

Recebe um token decodificado (objeto `ITokenBearer`) e retorna um objeto `IUser`, com os seguintes campos:

| Campo              | Tipo     | Origem no token                      | Descrição                                                      |
|--------------------|----------|--------------------------------------|----------------------------------------------------------------|
| `username`         | string   | `preferred_username`                 | Nome do usuário                                                |
| `fullName`         | string   | `name`                               | Nome completo                                                  |
| `email`            | string   | `email`                              | E-mail corporativo                                             |
| `departaments`     | string   | derivado de `dn`                     | Departamento extraído via `getDepartmentFromDistinguishedName` |
| `access_approver`  | boolean  | derivado de `resource_access`        | Indica se tem acesso à controladoria                           |
| `groups`           | string[] | `groups`                             | Grupos do Keycloak                                             |

---

## 📅 Exemplo de Uso

```ts
import { decodeToken } from "@/utils/decodeToken.utils";
import { buildUserFromToken } from "@/utils/buildUser";

const decodedToken = decodeToken(access_token);
const user = buildUserFromToken(decodedToken);
```

---

## ⚠️ Considerações

- ✉️ O campo `dn` deve ser disponibilizado no mapeamento do Keycloak para extração do departamento.
- 🔍 Certifique-se de que o campo `resource_access` e o `clientId` estejam corretamente configurados.
- 🌍 A variável de ambiente `VITE_KEYCLOAK_ROLE_CONTROLADORIA` deve estar presente no `.env`.

---

## 🚀 Benefícios

- Padroniza a estrutura de dados do usuário em toda a aplicação.
- Reduz a duplicidade de código ao evitar parsing manual do token.
- Centraliza a lógica de interpretação do token Keycloak.

---

**Este utilitário é essencial para o processo de autenticação do sistema. Mantenha sempre atualizado caso haja mudanças no payload dos tokens do Keycloak.**