# Documentação do Componente `Toastify`

## 📁 Localização

`/components/toastify.components.tsx`  
Interface localizada em: `/interfaces/toastify.interface.ts`

## 📊 Visão Geral

O componente `Toastify` é um wrapper personalizado da biblioteca de terceiros [`react-hot-toast`](https://react-hot-toast.com/), que padroniza e simplifica a exibição de mensagens de notificação no sistema.

Ele permite:

- Exibir mensagens de sucesso, erro, alerta ou informação.
- Usar mensagens customizadas com design personalizado.
- Monitorar promessas assíncronas com feedback automático.
- Importante: Este componente depende da biblioteca react-hot-toast. Certifique-se de importar <Toaster /> no topo da aplicação.
- Documentação da biblioteca `react-hot-toast` - [documentação da lib](https://react-hot-toast.com/)


## 📊 Visão Geral

O `Toastify` é um **componente utilitário global** criado para centralizar e padronizar a exibição de notificações toast no sistema.  
Ele é baseado na biblioteca [`react-hot-toast`](https://react-hot-toast.com/), porém encapsulado com configurações específicas para esse projeto.

Funciona como **função**, e não como componente visual React, sendo invocado diretamente para exibir notificações do tipo:

- ✅ `success` — sucesso
- ✅ `error` — erro
- ✅ `info` — informação
- ✅ `warning` — atenção
- ✅ `custom` — conteúdo JSX customizado
- ✅ `promise` — acompanha o estado de uma Promise (carregando, sucesso, erro)
- 🚧 `documentação` - [react-hot-toast](https://react-hot-toast.com/)
---


## 🛠 Como Usar

> **Importação**
```tsx
import { Toastify } from "@/components";


//✅ Sucesso
Toastify({
  type: "success",
  message: "Cadastro realizado com sucesso!"
});

//❌ Erro
Toastify({
  type: "error",
  message: "Erro ao salvar os dados."
});

//ℹ️ Informação
Toastify({
  type: "info",
  message: "Você já possui uma solicitação em andamento."
});

//🧩 Customizado (JSX)
Toastify({
  type: "custom",
  content: <div className="p-2 text-red-600 font-bold">⚠️ Alerta personalizado!</div>
});

//⏳ Promise
Toastify({
  type: "promise",
  promise: fetch("/api/usuarios"),
  loading: "Carregando...",
  success: "Dados carregados com sucesso!",
  error: "Erro ao carregar"
});

```

### 🔎 Configurações Avançadas (opcional)
Você pode customizar qualquer tipo com os seguintes campos opcionais:

| Propriedade    | Tipo                                 | Descrição                              |
|----------------|--------------------------------------|----------------------------------------|
| `duration`     | `number`                             |Tempo de exibição em ms (default: 4000) |          
| `position`     | `top-left`, `bottom-right`, etc      | Posição do toast na tela no            |
| `icon`         | `ReactNode`                          | Ícone customizado                      |
| `style`        | `{ background, color }`              | Estilo visual                          |
| `iconTheme`    | `{ primary, secondary }`             | Cores da borda e do ícone              |
| `removeDelay`  | `{ primary, secondary }`             | Delay para desaparecer                 |
| `reverseOrder` | `boolean`                            | Ordena mensagens de baixo para cima    |
| `gutter`       | `number`                             | Espaçamento entre toasts               |

<br>

**Exemplo**:

```tsx
Toastify({
  type: "success",
  message: "Aprovado!",
  duration: 5000,
  position: "top-center",
  icon: "✅",
  style: {
    background: "#222",
    color: "#fff"
  },
  iconTheme: {
    primary: "#0f0",
    secondary: "#fff"
  }
});

```

## 📚 Interface Principal

O tipo aceito pelo `Toastify()` é um dos seguintes:
- `ToastifyMessageConfig` -> para `success`, `error`, `info`, `warning`
- `ToastifyPromiseConfig` -> para `promise`
- `ToastifyCustomConfig`  ->  para `custom`

A interface global aceita todos os campos da `ToastifyBaseConfig`, além de campos específicos por tipo.
`
## ⚖️ Regras de Uso

- Sempre use o `Toastify()` e não diretamente `toast.xxx()` — a função foi criada para manter padronização visual e técnica.
- A interface `ToastifyConfig` valida o tipo de toast, e organiza as propriedades conforme a necessidade.
- O tipo `promise` requer uma `Promise` real e as mensagens de `loading`, `success` e `error`.

## 🧩 Sobre a Lib Utilizada

Este componente encapsula a lib [react-hot-toast](https://react-hot-toast.com/), mantendo o poder da biblioteca com o controle e a estética personalizada do sistema.

Você não precisa usar a lib diretamente — todas as necessidades estão cobertas pela função `Toastify()`.