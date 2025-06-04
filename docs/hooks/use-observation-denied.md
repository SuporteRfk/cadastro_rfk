# 📁 Documentação do Hook (`useObservationDenied`)

### 📁 Localização

`/hooks/use-observation-denied.hook.ts`

---

## 📊 Visão Geral

O `useObservationDenied` é um hook customizado que encapsula o controle da **justificativa de negação de uma solicitação**. Ele fornece:

- Estado do campo de justificativa (`observationDenied`)
- Controle de erro (`errorObservation`)
- Função de validação do campo
- Reset para limpar o formulário

---

## 📦 Estados e Funções Disponíveis

| Item                  | Tipo                                       | Descrição                                                                 |
|-----------------------|--------------------------------------------|---------------------------------------------------------------------------|
| `observationDenied`   | `string`                                   | Valor atual da justificativa preenchida pelo usuário                     |
| `setObservationDenied`| `Dispatch<SetStateAction<string>>`         | Atualiza o valor da justificativa                                        |
| `errorObservation`    | `string \| null`                           | Mensagem de erro exibida caso a justificativa esteja vazia               |
| `validate`            | `() => boolean`                            | Valida se a justificativa está preenchida. Retorna `false` se vazia.     |
| `reset`               | `() => void`                               | Limpa o estado do campo e a mensagem de erro                             |

---

## ⚙️ Detalhes Técnicos

- A função `validate`:
  - Verifica se o campo contém texto após `trim()`
  - Define a mensagem de erro padrão se estiver vazio
  - Retorna `true` se válido, `false` caso contrário
- A função `reset`:
  - Limpa a justificativa e o erro
  - Pode ser chamada após envio ou cancelamento da ação

---

## 💻 Exemplo de Uso

```tsx
const {
  observationDenied,
  setObservationDenied,
  errorObservation,
  validate,
  reset
} = useObservationDenied();

const handleSubmit = () => {
  if (validate()) {
    // Chamar serviço de negação
    reset();
  }
};
```

---

## ⚖️ Regras de Uso

- Deve ser usado em formulários que exigem justificativa de negação
- Sempre execute `validate()` antes de enviar a justificativa
- `reset()` deve ser chamado após confirmação ou cancelamento

---

## 🧠 Por que usar esse hook?

- 🔁 Centraliza o controle da justificativa de recusa
- 🧼 Evita repetição de lógica em múltiplos modais/formulários
- ⚠️ Garante validação antes do envio e melhora UX com feedback claro
