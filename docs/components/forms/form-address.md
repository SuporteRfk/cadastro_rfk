# 📁 Documentação do Componente `FormAddress`

## 📁 Localização
`/components/form/form-address.components.tsx`

---

## 📊 Visão Geral

O componente `FormAddress` é utilizado para capturar **endereços completos**, tanto de entrega quanto de cobrança, com integração à API ViaCEP para preenchimento automático baseado no CEP.

Ele se adapta conforme o tipo (`normal` ou `cobrança`) e o modo de uso (`editing`, `viewing`, `reviewing`), tornando-o flexível para múltiplos cenários em formulários reutilizáveis.

---

## 🧩 Props Aceitas

| Prop                | Tipo                                            | Descrição                                                                 |
|---------------------|--------------------------------------------------|---------------------------------------------------------------------------|
| `mode`              | `"editing"` \| `"viewing"` \| `"reviewing"`      | Define o comportamento de visualização do formulário.                    |
| `methods`           | `UseFormReturn<T>`                              | Objeto de controle do `react-hook-form`.                                 |
| `isBillingAddress`  | `boolean`                                       | Define se os campos renderizados são de cobrança. Padrão: `false`.       |
| `setLoading`        | `Dispatch<SetStateAction<boolean>>`             | Função usada para controlar estado de carregamento durante busca de CEP. |

---

## 🔄 Campos Dinâmicos

O componente altera automaticamente os nomes dos campos baseando-se na prop `isBillingAddress`. Por exemplo:

| Tipo           | Campo Normal | Campo de Cobrança |
|----------------|--------------|-------------------|
| CEP            | `cep`        | `cep_cobranca`    |
| Estado         | `estado`     | `estado_cobranca` |
| Município      | `municipio`  | `municipio_cobranca` |
| Endereço       | `endereco`   | `endereco_cobranca` |
| Número         | `numero`     | `numero_cobranca` |
| Bairro         | `bairro`     | `bairro_cobranca` |
| Complemento    | `complemento`| `complemento_cobranca` |

---

## ⚙️ Comportamento Interno

- **CEP**: Ao digitar 8 dígitos válidos, realiza busca via `consultationCepService`.
- **Auto Preenchimento**: Atualiza campos de endereço, bairro, estado, cidade, complemento e número.
- **SafeReviewField**: Cada campo é controlado para alternar entre visualização e edição com base no `mode`.

---

## 🔗 Conexões

- `consultationCepService`: serviço que consome a API ViaCEP
- `SafeReviewField`: alterna entre modo de edição e visualização
- `Input`, `InputWithMask`: componentes de entrada de dados
- `FormSection`: layout para organizar grupos de campos
- `unMask`: função do `remask` usada para remover a máscara do CEP

---

## 💻 Exemplo de Uso

```tsx
<FormAddress
  mode="editing"
  methods={methods}
  isBillingAddress={false}
  setLoading={setLoading}
/>
```

---

## 🧠 Por que usar este componente?

- 📦 Centraliza a lógica de formulário de endereço (entrega e cobrança)
- 🧠 Automatiza preenchimento com base em CEP
- 🔁 Evita repetição com uso de chave `isBillingAddress`
- 🔐 Suporta revisão e visualização de dados com `SafeReviewField`
