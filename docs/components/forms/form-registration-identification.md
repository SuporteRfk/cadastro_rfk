# 📁 Documentação do Componente `FormRegistrationIdentification`

## 📁 Localização
`/components/form/form-registration-identification.components.tsx`

---

## 📊 Visão Geral

O componente `FormRegistrationIdentification` representa uma **seção de identificação cadastral** no formulário de clientes ou fornecedores. Ele encapsula os campos de:

- Tipo de cadastro (Pessoa Física ou Jurídica)
- CPF ou CNPJ
- Tipo (configurável)
- Produtor rural (somente para fornecedores)

Possui integração com o hook `useCNPJSearch` para preenchimento automático dos dados de CNPJ quando o tipo for jurídico.

---

## 🧩 Props Aceitas

| Prop           | Tipo                                               | Descrição                                                                 |
|----------------|----------------------------------------------------|---------------------------------------------------------------------------|
| `mode`         | `"editing"` \| `"viewing"` \| `"reviewing"`       | Define o modo atual do formulário para controlar edição e visualização.  |
| `methods`      | `UseFormReturn<T>`                                | Objeto do `react-hook-form` para controle de campos.                      |
| `typeForm`     | `"client"` \| `"supplier"`                         | Determina se o formulário é de cliente ou fornecedor.                     |
| `setLoading`   | `React.Dispatch<React.SetStateAction<boolean>>`   | Controla visualmente o estado de carregamento.                           |
| `optionsForType` | `string[]`                                       | Lista de opções possíveis para o campo `tipo`.                           |

---

## 🔎 Comportamento Interno

### 📥 Integração com `useCNPJSearch`

```ts
useEffect(() => {
  if (typeRegisterValue === PfOrPj.JURIDICO && cnpjWithoutMask.length === 14) {
    searchCnpj(cnpjWithoutMask);
  }
}, [cnpjWithoutMask]);
```

- Detecta mudanças no campo CNPJ
- Se for PJ e o valor tiver 14 dígitos, chama `useCNPJSearch` para auto-preenchimento

### 🧠 Campos Renderizados

| Campo              | Tipo de Campo   | Condição                      |
|--------------------|------------------|-------------------------------|
| `fisica_juridica`  | `InputSelect`    | Sempre                       |
| `cnpj_cpf`         | `InputWithMask`  | Sempre                       |
| `tipo`             | `InputSelect`    | Sempre                       |
| `produtor_rural`   | `InputSelect`    | Apenas se `typeForm === "supplier"` |

Todos os campos utilizam `SafeReviewField` para renderização condicional com base no `mode`.

---

## 🔗 Conexões

- `useCNPJSearch`: busca e popula dados do CNPJ automaticamente
- `SafeReviewField`: controla visibilidade e modo leitura de campos
- `InputSelect`, `InputWithMask`: componentes reutilizáveis para entradas padronizadas
- Interface `PfOrPj` e `OptionYesNo` utilizadas como enums de seleção

---

## 💻 Exemplo de Uso

```tsx
<FormRegistrationIdentification
  mode="editing"
  methods={methods}
  typeForm="supplier"
  setLoading={setLoading}
  optionsForType={["Distribuidor", "Atacadista", "Revendedor"]}
/>
```

---

## 🧠 Por que usar este componente?

- 🔄 Modulariza o início do cadastro com foco em identidade e tipo
- 🔍 Integra busca automática de CNPJ
- 🧱 Alinha-se à arquitetura de formulários modulares e reutilizáveis
