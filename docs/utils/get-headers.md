# 📁 Documentação do Utilitário (`getHeaders`)

### 📁 Localização

`/utils/get-headers.utils.ts`

---

## 📊 Visão Geral

O `getHeaders` é um utilitário que **gera objetos de cabeçalhos HTTP padronizados**, com o campo `"Content-Type"` configurado de forma dinâmica. É útil para centralizar e reaproveitar definições de headers em chamadas de API.

---

## 📦 Parâmetros

```ts
getHeaders(contentType?: ContentType): { headers: { "Content-Type": string } }
```

| Parâmetro     | Tipo                                                      | Padrão                               | Descrição                                               |
|---------------|-----------------------------------------------------------|--------------------------------------|-----------------------------------------------------------|
| `contentType` | `"application/json"` \| `"application/x-www-form-urlencoded"` | `"application/x-www-form-urlencoded"` | Define o valor do header `Content-Type` da requisição.     |

---

## 🔁 Retorno

- Um objeto no formato:
```ts
{
  headers: {
    "Content-Type": "application/json" // ou outro valor informado
  }
}
```

---

## 💻 Exemplo de Uso

```ts
import axios from "axios";
import { getHeaders } from "@/utils/get-headers.utils";

const url = "https://api.meuservico.com/endpoint";
const data = { nome: "João" };

const response = await axios.post(url, data, getHeaders("application/json"));
```

---

## ⚖️ Regras de Uso

- Usado como terceiro argumento em chamadas do `axios` ou `fetch`
- Evita repetição de código em múltiplos arquivos
- Facilita futuras mudanças no padrão de cabeçalhos

---

## 🧠 Por que usar este utilitário?

- 🧼 Centraliza definição dos headers HTTP
- 🔁 Evita repetição e possíveis typos em `"Content-Type"`
- 🚀 Reutilizável e pronto para múltiplos contextos de requisição
