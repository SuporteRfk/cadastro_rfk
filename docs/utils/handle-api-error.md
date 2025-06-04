# 📁 Documentação do Utilitário (`handleApiError`)

### 📁 Localização

`/utils/handle-api-error.utils.ts`

---

## 📊 Visão Geral

O `handleApiError` é um utilitário usado para **centralizar o tratamento de erros em requisições HTTP**, especialmente com `axios`. Ele garante uma exibição amigável de mensagens de erro via `Toastify`, ajudando na comunicação com o usuário final.

---

## 📦 Parâmetros

```ts
handleApiError(error: unknown, message: string): void
```

| Parâmetro | Tipo     | Descrição                                                                 |
|-----------|----------|---------------------------------------------------------------------------|
| `error`   | `unknown`| Objeto capturado no `try/catch`. Pode ser `AxiosError` ou outro tipo de erro |
| `message` | `string` | Mensagem personalizada que será exibida ao usuário                         |

---

## 🔁 Lógica Interna

- Se o erro for uma instância de `AxiosError`:
  - Tenta extrair `error.response.data.error_description`
  - Caso não exista, usa `error.message`
- Se não for `AxiosError`, converte o erro com `String(error)`
- Em ambos os casos, exibe `Toastify` com `type: "error"` e `duration: 5000`

---

## 💻 Exemplo de Uso

```ts
try {
  await axios.post("/login", { user, pass });
} catch (error) {
  handleApiError(error, "Erro ao realizar login");
}
```

---

## ⚖️ Regras de Uso

- Deve ser usado dentro de blocos `try/catch` para capturar erros de requisições
- Mensagens de erro devem ser claras e contextualizadas
- Não substitui validações de frontend; é focado em falhas de backend ou rede

---

## 🔗 Dependências

- `Toastify`: componente para exibição de notificações
- `axios`: para detecção e tratamento de erros da API

---

## 🧠 Por que usar este utilitário?

- 📦 Centraliza a lógica de erro da aplicação
- 🧼 Evita repetição de código nos serviços ou componentes
- 🚀 Melhora a experiência do usuário com mensagens consistentes e legíveis
