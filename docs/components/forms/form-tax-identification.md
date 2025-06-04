# 📁 Documentação do Componente `FormTaxIdentification`

## 📁 Localização
`/components/form/form-tax-identification.components.tsx`

---

## 📊 Visão Geral

O componente `FormTaxIdentification` representa uma seção de **dados fiscais e tributários** do cadastro de clientes ou fornecedores.

Abrange informações como:
- CNAE
- Tipo de pessoa jurídica (TPJ)
- Inscrição estadual e municipal
- Contribuinte ICMS
- Email
- Optante pelo Simples Nacional
- Destaque de I.E (para clientes PJ)

---

## 🧩 Props Aceitas

| Prop         | Tipo                                               | Descrição                                                                 |
|--------------|----------------------------------------------------|---------------------------------------------------------------------------|
| `mode`       | `"editing"` \| `"viewing"` \| `"reviewing"`       | Define o modo de visualização/edição do formulário.                      |
| `methods`    | `UseFormReturn<T>`                                | Objeto do `react-hook-form`.                                             |
| `optionsTpj` | `string[]`                                        | Lista de opções para o campo TPJ.                                        |
| `typeForm`   | `"client"` \| `"supplier"`                         | Identifica se é cadastro de cliente ou fornecedor.                       |
| `isPj`       | `boolean`                                          | Define se o cadastro atual é de pessoa jurídica (PJ).                    |

---

## 🧠 Campos Renderizados

### 1. CNAE e TPJ
| Campo | Tipo         | Condição |
|-------|--------------|----------|
| cnae  | `Input`      | Sempre   |
| tpj   | `InputSelect`| Sempre   |

### 2. Inscrições fiscais
| Campo                | Tipo         |
|----------------------|--------------|
| inscricao_estadual   | `Input`      |
| inscricao_municipal  | `Input`      |
| contribuinte         | `InputSelect`|

### 3. Email e obrigações fiscais
| Campo                | Tipo         | Condição |
|----------------------|--------------|----------|
| email_cliente/fornecedor | `Input` | Depende do `typeForm` |
| optante_simples      | `InputSelect`| Sempre   |
| destaca_ie           | `InputSelect`| Apenas se `isPj === true` e `typeForm === "client"` |

---

## 🔗 Conexões

- `FormSection`: organiza os campos em blocos visuais
- `SafeReviewField`: garante controle do modo (edição, visualização ou revisão)
- `OptionYesNo`: enum para opções booleanas
- Ícones do `lucide-react`: usados para melhorar a semântica visual dos campos

---

## 💻 Exemplo de Uso

```tsx
<FormTaxIdentification
  mode="editing"
  methods={methods}
  typeForm="client"
  isPj={true}
  optionsTpj={["MEI", "EPP", "Simples Nacional"]}
/>
```

---

## 🧠 Por que usar este componente?

- 📦 Centraliza os campos fiscais de forma modular
- 🔄 Garante consistência visual e comportamental entre clientes e fornecedores
- 🧱 Mantém separação clara por responsabilidades no formulário
