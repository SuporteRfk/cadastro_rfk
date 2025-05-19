# Documentação do Componente `FormRegistrationIdentification`;

## 📁 Localização

`/components/forms/form-registration-identification.components.ts`

## 📊 Visão Geral


O componente `FormRegistrationIdentification` é responsável pela renderização da seção de identificação cadastral em formulários de clientes ou fornecedores. Ele integra campos essenciais como:

- Tipo de cadastro (Pessoa Física ou Jurídica)
- CPF ou CNPJ (com máscara dinâmica)
- Tipo (categoria do cliente ou fornecedor)
- Campos adicionais específicos para fornecedores (exemplo: Produtor Rural)

O componente utiliza o `react-hook-form` para gerenciamento e validação dos dados, respeitando os modos de operação (`editing`, `viewing`, `reviewing`). Além disso, faz uso do hook customizado `useCNPJSearch` para realizar a busca automática dos dados do CNPJ, preenchendo o formulário ao detectar um CNPJ válido, melhorando a experiência do usuário e evitando entrada manual redundante.

---

## ⚙️ Propriedades (Props)

| Nome           | Tipo                                               | Descrição                                                                                                              | Opcional / Padrão          |
|----------------|---------------------------------------------------|------------------------------------------------------------------------------------------------------------------------|---------------------------|
| `mode`         | `'editing'` \| `'viewing'` \| `'reviewing'`       | Controla o estado do formulário, definindo se os campos são editáveis ou somente leitura/revisão.                      | Opcional, padrão: `'editing'` |
| `methods`      | `UseFormReturn<T>`                                 | Objeto retornado pelo hook `useForm` do `react-hook-form`, utilizado para registrar campos, controlar erros e valores. | Obrigatório                |
| `typeForm`     | `'client'` \| `'supplier'`                         | Define se o formulário refere-se a cliente ou fornecedor, para habilitar campos específicos.                           | Obrigatório                |
| `setLoading`   | `React.Dispatch<React.SetStateAction<boolean>>`   | Função para controlar o estado de loading durante a busca do CNPJ.                                                     | Obrigatório                |
| `optionsForType` | `string[]`                                       | Lista de opções para o campo "Tipo", permitindo customização conforme contexto do formulário.                          | Obrigatório                |

---

## 🔍 Detalhes Técnicos e Lógica

### 1. Observação e disparo da busca do CNPJ  
O componente monitora os valores dos campos `fisica_juridica` e `cnpj_cpf` usando `methods.watch`.  
Quando o tipo de cadastro for `JURIDICO` e o CNPJ possuir 14 dígitos (desmascarado), chama a função `searchCnpj` que invoca o hook `useCNPJSearch`.  

### 2. Integração com o hook `useCNPJSearch`  
O hook executa a consulta externa do CNPJ e atualiza os campos do formulário automaticamente com os dados retornados, além de controlar o estado de carregamento via `setLoading`.

### 3. Renderização dinâmica dos campos  
- O label e máscara do campo CPF/CNPJ mudam conforme o tipo de cadastro selecionado.  
- O campo "Produtor Rural" é exibido somente quando o formulário é do tipo fornecedor (`typeForm === "supplier"`).  
- Todos os campos respeitam o estado do modo para ativar ou desativar edição.  

---

## 📝 Campos Controlados

- **Tipo de Cadastro** (`fisica_juridica`) — seleção entre Pessoa Física ou Jurídica.  
- **CPF/CNPJ** (`cnpj_cpf`) — input com máscara dinâmica.  
- **Tipo** (`tipo`) — seleção personalizada via prop `optionsForType`.  
- **Produtor Rural** (`produtor_rural`) — campo exclusivo para fornecedores, seleção Sim/Não.

---

## 💡 Exemplo de Uso

```tsx
const methods = useForm<ClienteFormData>({
  resolver: yupResolver(clienteSchema),
});

<FormRegistrationIdentification
  mode="editing"
  methods={methods}
  typeForm="client"
  setLoading={setLoading}
  optionsForType={["Comum", "Especial", "Premium"]}
/>
```

## 🚀 Observações e Recomendações
- Utilize o componente em conjunto com `react-hook-form` e validações externas para garantir consistência e robustez.
- O carregamento controlado via `setLoading` pode ser usado para exibir indicadores visuais durante a consulta do `CNPJ`.
- O hook `useCNPJSearch` encapsula a lógica da busca automática e deve ser mantido para reaproveitamento e separação de responsabilidades.
- Desabilite os campos quando estiver no modo viewing ou reviewing para evitar alterações indesejadas.

