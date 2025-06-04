# 📁 Documentação do Componente `FormLayout`

## 📁 Localização
`/components/form/form-layout.components.tsx`

---

## 📊 Visão Geral

O `FormLayout` é um componente **container** responsável por **estruturar todo o formulário principal**, incluindo título, seções de campos, loading, controle de envio e layout com rolagem. Ele é utilizado para envolver formulários com `react-hook-form` e oferece suporte a modos como `cadastro`, `visualização` e `revisão`.

---

## 🧩 Props Aceitas

| Prop             | Tipo                           | Descrição |
|------------------|--------------------------------|-----------|
| `methods`        | `UseFormReturn<T>`             | Objeto do `react-hook-form`. |
| `onSubmit`       | `(data: T) => void` (opcional) | Função chamada ao salvar o formulário. |
| `children`       | `ReactNode`                    | Elementos internos adicionais. |
| `mode`           | `"editing"` \| `"viewing"` \| `"reviewing"` (opcional) | Define modo do formulário. |
| `showSector`     | `boolean` (opcional)           | Mostra ou esconde campo de setor. |
| `titleForm`      | `string`                       | Título exibido no topo do formulário. |
| `iconForm`       | `LucideIcon`                   | Ícone exibido ao lado do título. |
| `showButtonsDefault` | `boolean` (padrão: true)   | Controla exibição dos botões de salvar/cancelar. |
| `modalQuestion`  | `{ modalKey: string; message: string; }` (opcional) | Confirmação personalizada ao salvar. |
| `onResetStates`  | `() => void` (opcional)        | Função chamada ao resetar formulário. |
| `loading`        | `boolean`                      | Mostra modal de carregamento no envio. |

---

## 🧱 Estrutura

- **Cabeçalho com título e ícone**
- **Formulário com Provider** do `react-hook-form`
- **Inputs agrupados com `FormSection`**
- **Títulos de seções com `SubTitleForm`**
- **Botões padrão de ação (Salvar / Cancelar)**
- **Modal de confirmação via `ModalContext`**
- **Scroll vertical com `ScrollArea`**

---

## 🔗 Conexões

- `SubTitleForm`, `FormSection`: Organização visual e semântica.
- `Input`, `DateInput`, `InputSelect`, `InputWithMask`: Campos reutilizáveis.
- `AuthContext`, `ModalContext`: Usado para preencher campos e confirmar ações.
- `LoadingModal`: Exibido durante envio.
- `Button`: Ações padrão.

---

## 💻 Exemplo de Uso

```tsx
<FormLayout
  titleForm="Cadastrar Produto"
  iconForm={PackageIcon}
  methods={methods}
  onSubmit={(data) => console.log(data)}
  loading={isLoading}
>
  {/* Campos adicionais */}
</FormLayout>
```

---

## 🧠 Por que usar este componente?

- 💡 Centraliza toda a estrutura e lógica comum a formulários.
- 🧱 Promove consistência entre diferentes fluxos da aplicação.
- 🔁 Evita repetição de código e melhora a legibilidade.
