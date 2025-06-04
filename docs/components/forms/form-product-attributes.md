# 📁 Documentação do Componente `FormProductAttributes`

## 📁 Localização
`/components/form/form-product-attributes.components.tsx`

---

## 📊 Visão Geral

O componente `FormProductAttributes` é responsável por exibir campos relacionados às **características físicas e tributárias do produto**, como:

- Unidade de medida
- NCM e CEST
- Grupo tributário
- Marca e sabor

Sua renderização é dinâmica com base nas `props` recebidas, o que o torna altamente reutilizável em diversos contextos do sistema.

---

## 🧩 Props Aceitas

| Prop                  | Tipo                            | Descrição                                                                 |
|-----------------------|----------------------------------|---------------------------------------------------------------------------|
| `mode`                | `"editing"` \| `"viewing"` \| `"reviewing"` | Modo de uso do componente.                            |
| `methods`             | `UseFormReturn<T>`              | Objeto retornado pelo `react-hook-form`.                                |
| `showSecondUnitMeasure` | `boolean`                     | Define se a segunda unidade de medida será exibida.                      |
| `showFlavorAndMark`   | `boolean`                       | Define se os campos de sabor e marca serão exibidos.                     |
| `showCestAndTax`      | `boolean`                       | Define se os campos CEST, NCM e grupo tributário serão exibidos juntos.  |
| `labelMarkAndFlavor`  | `"Fardo"` \| `"Unitário"` \| `"Copacker"` | Personaliza os labels de marca e sabor.                     |

---

## 🧠 Campos Renderizados

### 🧮 Unidade de Medida

- `unidade_medida` – Sempre exibido
- `segunda_unidade_medida` – Exibido se `showSecondUnitMeasure = true`

### 📦 Marca e Sabor

- `sabor` – Exibido se `showFlavorAndMark = true`
- `marca` – Exibido se `showFlavorAndMark = true`
- Os labels são adaptados via `labelMarkAndFlavor` (ex: “Marca do Fardo”)

### 🧾 Tributação

- `ncm` – Com `InputWithMask`, exibido se `showCestAndTax = false` **ou** em conjunto com `cest` se `showCestAndTax = true`
- `cest` – Exibido se `showCestAndTax = true`
- `grupo_tributario` – Exibido se `showCestAndTax = true`

---

## 🔧 Comportamento Interno

- Todos os campos são renderizados dentro de `SafeReviewField`, respeitando o modo de exibição.
- Os campos usam os componentes `Input` e `InputWithMask` com ícones semânticos.
- Máscaras específicas:
  - NCM: `"9999.99.99"`
  - CEST: `"99.999.99"`

---

## 🔗 Conexões

- `Input`, `InputWithMask`: componentes de entrada de dados
- `SafeReviewField`: controle de edição/revisão/visualização
- `FormSection`: estrutura do layout
- Ícones: `Ruler`, `Landmark`, `Crown`, `Cherry`, `TbNumber`

---

## 💻 Exemplo de Uso

```tsx
<FormProductAttributes
  mode="editing"
  methods={methods}
  showSecondUnitMeasure={true}
  showFlavorAndMark={true}
  showCestAndTax={false}
  labelMarkAndFlavor="Fardo"
/>
```

---

## 🧠 Por que usar este componente?

- 🧩 Modulariza atributos físicos e fiscais do produto
- 🔄 Adaptável a múltiplos cenários com base em props
- 💡 Torna o código mais legível e reutilizável
- 🔐 Garante consistência visual e funcional através do `SafeReviewField`
