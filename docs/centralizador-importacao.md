# 📁 Documentação: Centralizadores de Importação (`index.ts`)

## 🎯 Objetivo

Centralizadores de importação (arquivos `index.ts`) têm como objetivo organizar e facilitar os imports no projeto. Ao usar um `index.ts`, é possível importar vários arquivos de uma pasta com uma sintaxe reduzida e legível:

```ts
// Antes
import { IUser } from "@/interfaces/user.interface";
import { ILogin } from "@/interfaces/login.interface";

// Depois
import { IUser, ILogin } from "@/interfaces";
```

## 📦 Onde usar

Centralizadores devem ser utilizados quando:

- Há vários arquivos relacionados em uma pasta.
- Os arquivos são reutilizados em diversos pontos do sistema.
- O projeto precisa de uma convenção de importação limpa e padronizada.

## ✅ Exemplos no Projeto

### `src/interfaces/index.ts`

```ts
// Centralizador das interfaces globais
export * from "./login.interface";
export * from "./token.interface";
export * from "./user.interface";
```

Uso:
```ts
import { ILogin, IUser } from "@/interfaces";
```

---

### `src/components/index.ts`

```ts
// Centralizador dos componentes reutilizáveis
export * from "./inputs/input.components";
export * from "./inputs/date-input.components";
export * from "./button/button.components";
export * from "./ui/badge";
export * from "./ui/checkbox";
export * from "./ui/select";
export * from "./ui/scroll-area";
export * from "./ui/table";
```

Uso:
```ts
import { Button, Input, DateInput } from "@/components";
```

## 🧠 Boas Práticas

- Utilize `index.ts` apenas quando houver ganho real de legibilidade.
- Evite centralizar tudo em um arquivo global enorme. Prefira centralizadores por pasta.
- Exporte apenas o que faz sentido para consumo externo.
- Se usar uma lib de componentes (`ui/`), ela também pode ter seu próprio `index.ts`.

### Exemplo de `index.ts` dentro de `ui/`
```ts
// components/ui/index.ts
export * from "./badge";
export * from "./select";
export * from "./skeleton";
```

E no global:
```ts
export * from "./ui";
```


## 💡 Dica Extra
Para evitar conflitos de nome ao exportar tudo:
```ts
export { IUser as User } from './user.interface';
```

---

Essa abordagem é ideal para projetos escaláveis, pois melhora a legibilidade, facilita a manutenção e padroniza os imports ao longo de toda a aplicação.