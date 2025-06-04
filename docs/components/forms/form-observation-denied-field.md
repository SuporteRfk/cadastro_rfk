# 📁 Documentação do Componente `FormObservationDeniedField`

## 📁 Localização
`/components/form/form-observation-denied-field.components.tsx`

---

## 📊 Visão Geral

O `FormObservationDeniedField` é um componente responsável por **coletar a justificativa textual ao negar uma solicitação**. Ele exibe um campo de `textarea` com título explicativo, ícone de alerta e tratamento de erro.

---

## 🧩 Props Aceitas

| Prop           | Tipo                                    | Descrição |
|----------------|------------------------------------------|-----------|
| `observation`  | `string`                                | Texto da observação atual. |
| `setObservation` | `React.Dispatch<React.SetStateAction<string>>` | Função para atualizar o texto da observação. |
| `error`        | `string` (opcional)                     | Mensagem de erro a ser exibida abaixo do campo. |

---

## ⚙️ Comportamento

- Sempre renderiza um `textarea` para o usuário descrever o motivo da negação.
- Apresenta um `h3` com ícone de aviso (`<Info />`) e mensagem orientativa.
- Exibe mensagem de erro abaixo do campo, caso `error` esteja presente.

---

## 🔗 Conexões

- Utilizado comumente em fluxos de **revisão e reprovação de solicitações**.
- Pode ser integrado com sistemas de validação ou hooks externos que gerenciem o estado do formulário.

---

## 💻 Exemplo de Uso

```tsx
<FormObservationDeniedField
  observation={observation}
  setObservation={setObservation}
  error={errors?.observation}
/>
```

---

## 🧠 Por que usar este componente?

- 🧾 Centraliza o padrão de preenchimento de justificativas no sistema.
- 🚦 Fornece feedback visual e textual ao usuário para facilitar a ação.
- 📦 Encapsula o layout, estilo e lógica básica de erro em um único lugar reutilizável.
