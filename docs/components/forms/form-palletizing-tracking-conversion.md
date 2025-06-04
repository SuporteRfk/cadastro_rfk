# 📁 Documentação do Componente `FormPalletizingTrackingConversion`

## 📁 Localização
`/components/form/form-palletizing-tracking-conversion.components.tsx`

---

## 📊 Visão Geral

O componente `FormPalletizingTrackingConversion` é responsável por renderizar **campos dinâmicos** relacionados à **paletização**, **lastro**, **rastro** e **conversão de insumos**, dependendo da prop `showConverters`.

Ele é altamente reutilizável e adaptável, alternando entre campos de **logística** e **fatores de conversão**, com suporte aos modos `editing`, `viewing` e `reviewing`.

---

## 🧩 Props Aceitas

| Prop            | Tipo                                     | Descrição                                                                 |
|------------------|------------------------------------------|---------------------------------------------------------------------------|
| `mode`           | `"editing"` \| `"viewing"` \| `"reviewing"` | Define o comportamento visual dos campos.                                |
| `methods`        | `UseFormReturn<T>`                       | Objeto retornado pelo `react-hook-form` para controle do formulário.     |
| `showConverters` | `boolean`                                | Define se os campos de **conversão** ou de **paletização/lastro** serão exibidos. |

---

## 🧮 Comportamento Condicional

### Quando `showConverters = true`
Renderiza os campos:
- `fator_conversor`: (`InputDecimal`) – valor numérico do fator de conversão
- `tipo_conversor`: (`InputSelect`) – tipo (enum `ConverterType`)

### Quando `showConverters = false`
Renderiza os campos:
- `paletizacao`: (`Input`) – número de unidades por pallet
- `lastro`: (`Input`) – número de camadas por pallet

### Sempre
Renderiza o campo:
- `rastro`: (`InputSelect`) – tipo de rastreabilidade (enum `Trail`)

Todos os campos utilizam o `SafeReviewField` para alternar entre modos com segurança.

---

## 🔗 Conexões

- `Input`, `InputDecimal`, `InputSelect`: campos reutilizáveis
- `SafeReviewField`: alterna comportamento com base no `mode`
- `ConverterType`, `Trail`: enums do projeto
- `FormSection`: layout horizontal responsivo
- Ícones:
  - `MdPallet` → paletização
  - `Variable` → conversão
  - `Layers` → lastro

---

## 💻 Exemplo de Uso

```tsx
<FormPalletizingTrackingConversion
  mode="editing"
  methods={methods}
  showConverters={true}
/>
```

---

## 🧠 Por que usar este componente?

- 🔁 Alterna entre campos de logística ou conversão sem duplicação
- 📦 Ideal para formulários de cadastro de insumos ou produtos
- 🧱 Componente único, adaptável e coeso com o restante do formulário
