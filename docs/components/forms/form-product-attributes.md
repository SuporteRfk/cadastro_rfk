# Documentação do Componente `FormProductAttributes`;

## 📁 Localização

`/components/forms/form-product-attributes.components.ts`

## 📊 Visão Geral

O componente `FormProductAttributes` foi criado para gerenciar os campos de atributos do produto, como **Unidade de Medida**, **Segunda Unidade de Medida**, **NCM**, **Sabor**, **Marca**, **CEST** e **Grupo Tributário**. Estes campos são exibidos de forma condicional, dependendo das necessidades de cada formulário, permitindo uma estrutura dinâmica e reutilizável.

## 🛠️ Props

### `mode`
- **Tipo**: `FormStateType`
- **Descrição**: Define o estado do formulário, determinando se ele está em modo "edição", "visualização" ou "revisão". Isso afeta a possibilidade de edição dos campos.
  - **`editing`**: Campos editáveis.
  - **`viewing`**: Campos somente leitura.
  - **`reviewing`**: Campos somente leitura.

### `methods`
- **Tipo**: `UseFormReturn<T>`
- **Descrição**: Métodos do `react-hook-form` para registrar os inputs e gerenciar a validação do formulário.

### `showSecondUnitMeasure`
- **Tipo**: `boolean`
- **Descrição**: Se for `true`, o campo "Segunda Unidade de Medida" será exibido. Caso contrário, ele será ocultado.

### `showFlavorAndMark`
- **Tipo**: `boolean`
- **Descrição**: Se for `true`, os campos "Sabor" e "Marca" serão exibidos. Caso contrário, serão ocultados.

### `showCestAndTax`
- **Tipo**: `boolean`
- **Descrição**: Se for `true`, os campos "CEST", "Grupo Tributário" e "NCM" serão exibidos juntos. Caso contrário, serão ocultados.

### `labelMarkAndFlavor`
- **Tipo**: `"Fardo" | "Unitário" | "Copacker" | undefined`
- **Descrição**: Este é um rótulo opcional que personaliza o nome do campo "Sabor" e "Marca". Se fornecido, o rótulo será alterado para incluir o valor especificado, como `"Sabor do Fardo"`, `"Sabor do Unitário"`, etc.

## ⚙️ Estrutura do Componente

### 1. **Unidade de Medida e Segunda Unidade de Medida:**
   - O campo **Unidade de Medida** é sempre exibido.
   - O campo **Segunda Unidade de Medida** será exibido apenas se o `showSecondUnitMeasure` for `true`.

### 2. **NCM:**
   - O campo **NCM** é exibido em dois contextos diferentes:
     - **Exibição padrão**: O NCM é mostrado, a menos que o `showCestAndTax` seja `true`.
     - **Contexto de Grupo Tributário**: Se o `showCestAndTax` for `true`, o NCM é exibido junto com os campos **CEST** e **Grupo Tributário** em uma seção agrupada.

### 3. **Sabor e Marca:**
   - Os campos **Sabor** e **Marca** são renderizados condicionalmente com base no `showFlavorAndMark`.
   - Os rótulos desses campos podem ser personalizados usando a prop `labelMarkAndFlavor`, que define o contexto do produto (como **Fardo**, **Unitário**, **Copacker**).

### 4. **CEST e Grupo Tributário:**
   - Se o `showCestAndTax` for `true`, esses campos serão exibidos com o **NCM**. Caso contrário, esses campos serão ocultados.

## 📑 Exemplo de Uso

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

### Como Funciona:
- `showSecondUnitMeasure` vai exibir o campo **"Segunda Unidade de Medida"**.
- `showFlavorAndMark` vai exibir os campos **"Sabor"** e **"Marca"**.
- `showCestAndTax` vai exibir os campos relacionados ao CEST e Grupo Tributário, já que estão configurados para não aparecer nesse caso. 
    - Esse campo estando `true`, o NCM é ocultado dentro da primeira sessão, assim mostrando o campo NCM da sessão do **CEST** e **TAX**.
    - Lógica usada pensando na UX do formúlario.
- `labelMarkAndFlavor` personaliza o rótulo de **"Sabor"** e **"Marca"** para ***"Sabor do Fardo"*** e ***"Marca do Fardo"***, conforme o valor passado.

## ⚖️ Regras de Uso

- `Renderização Dinâmica`:O campo NCM aparece em dois lugares: um no formulário principal e outro no formulário com CEST e Grupo Tributário. A decisão de renderizar o campo NCM em um lugar ou ambos depende da prop `showCestAndTax`.
- Os campos `Sabor` e `Marca` são condicionais e só são renderizados se `showFlavorAndMark` for `true`.
- O campo `Segunda Unidade de Medida` só será exibido se `showSecondUnitMeasure` for `true`.
- `Estado do Formulário`: Todos os campos possuem um estado condicional somente leitura baseado na prop `mode`. Nos modos `viewing` ou `reviewing`, os campos são bloqueados para edição, garantindo que os usuários possam apenas visualizar as informações.

### 🔧 Opções de Personalização

- `Visibilidade Flexível de Campos:` Usando as props showSecondUnitMeasure, showFlavorAndMark e showCestAndTax, você pode facilmente controlar quais campos aparecem no formulário.
- `Reusabilidade em Diferentes Contextos:` Esse componente pode ser reutilizado em diversos formulários, ajustando os campos visíveis conforme o tipo de produto (como Fardo, Unitário, Copacker).
- `Rótulos Customizáveis`: A prop labelMarkAndFlavor permite personalizar os rótulos dos campos de sabor e marca para se adaptarem ao contexto específico.