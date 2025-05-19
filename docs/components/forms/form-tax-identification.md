# Documentação do Componente `FormTaxIdentification`;

## 📁 Localização

`/components/forms/form-tax-identification.components.ts`

## 📊 Visão Geral

O componente `FormTaxIdentification` é responsável por exibir os campos de identificação tributária em formulários de cadastro de clientes ou fornecedores. Ele organiza de forma clara e reutilizável os campos relacionados a CNAE, tipo de pessoa jurídica (TPJ), inscrições (estadual e municipal), contribuintes, e configurações fiscais como optante pelo Simples Nacional ou destaque da Inscrição Estadual.

Os campos são integrados com o `react-hook-form` para controle e validação e seguem o modo de operação (`editing`, `viewing`, `reviewing`), o que permite o uso do mesmo componente em formulários de cadastro, visualização ou revisão.

---

## ⚙️ Propriedades (Props)

| Nome         | Tipo                                               | Descrição                                                                                                     | Opcional / Padrão            |
|--------------|----------------------------------------------------|---------------------------------------------------------------------------------------------------------------|------------------------------|
| `mode`       | `FormStateType`                                    | Controla o estado do formulário: `'editing'`, `'viewing'` ou `'reviewing'`.                                  | Opcional, padrão: `'editing'` |
| `methods`    | `UseFormReturn<T>`                                 | Objeto retornado pelo `useForm` do `react-hook-form`. Usado para registrar, observar e manipular os campos.   | Obrigatório                  |
| `optionsTpj` | `string[]`                                         | Lista de opções para o campo "TPJ" (Tipo de Pessoa Jurídica).                                                | Obrigatório                  |
| `typeForm`   | `"client"` \| `"supplier"`                         | Define se o formulário está sendo usado para cliente ou fornecedor. Determina labels e comportamento.         | Obrigatório                  |
| `isPj`       | `boolean`                                          | Indica se o cadastro é de Pessoa Jurídica. Usado para exibir o campo "Destaca I.E".                           | Opcional, padrão: `false`    |

---

## 🔍 Detalhes Técnicos e Lógica

### 1. Organização em Seções
O componente está dividido em três seções principais, cada uma usando o wrapper `FormSection` para organizar visualmente os campos:

- **Seção 1:** CNAE e Tipo de Pessoa Jurídica (TPJ).
- **Seção 2:** Inscrição Estadual, Inscrição Municipal e se é Contribuinte.
- **Seção 3:** Email do cliente/fornecedor, Optante pelo Simples e (condicionalmente) Destaca I.E.

### 2. Campos Dinâmicos
- O campo de **email** muda dinamicamente de nome e label conforme o `typeForm`:
  - `"email_cliente"` quando `typeForm === "client"`
  - `"email_fornecedor"` quando `typeForm === "supplier"`

- O campo **"Destaca I.E"** é renderizado **apenas** quando:
  - `typeForm === "client"`
  - `isPj === true`

### 3. Controle de Acesso (Modo de Exibição)
Todos os campos se adaptam automaticamente ao modo de operação do formulário (`editing`, `viewing`, `reviewing`) usando a prop `readOnly` ou `disabled`.

---

## 📝 Campos Controlados

- `cnae`: Código de Atividade Econômica (campo texto).
- `tpj`: Tipo de Pessoa Jurídica (select).
- `inscricao_estadual`: Campo de inscrição estadual (texto).
- `inscricao_municipal`: Campo de inscrição municipal (texto).
- `contribuinte`: Define se é contribuinte (select com opção Sim/Não).
- `email_cliente` ou `email_fornecedor`: Campo de email, com nome dinâmico.
- `optante_simples`: Se é optante pelo Simples Nacional (select).
- `destaca_ie`: Se deve destacar a Inscrição Estadual na nota (apenas para clientes PJ).

---

## 💡 Exemplo de Uso

```tsx
<FormTaxIdentification
  mode="editing"
  methods={methods}
  typeForm="client"
  optionsTpj={["MEI", "Microempresa", "EPP", "Demais"]}
  isPj={true}
/>
```

### 🚀 Observações e Recomendações
- ✅ `Reutilizável`: Pode ser usado em diferentes contextos (clientes e fornecedores) com apenas a troca da prop typeForm.
- 🧩 `Extensível`: Caso novas categorias fiscais sejam adicionadas, basta atualizar os enums e a prop optionsTpj.
- 🔒 `Segurança de Edição`: A prop mode garante que campos não sejam editáveis em modos de visualização ou revisão.
- 🔁 `Consistência de Labels`: Labels e nomes de campos são configurados dinamicamente com base nas props, evitando duplicidade e garantindo consistência entre formulários.
- 💡 `Validação Recomendada`: O componente espera que a validação dos campos esteja configurada externamente via Yup ou outra estratégia integrada ao react-hook-form.

