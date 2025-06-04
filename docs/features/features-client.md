# 📂 Documentação da Feature `client`

## 📁 Localização
`/src/features/client`

## 📊 Visão Geral

A feature `client` é responsável por gerenciar o cadastro e atualização de **clientes** dentro do sistema. Ela centraliza toda a lógica necessária para exibir o formulário, validar dados, comunicar com o banco de dados via Supabase e aplicar transformações específicas (ex: identificação se é Pessoa Física ou Jurídica).

---

## 🔎 Estrutura da Feature

| Caminho                                              | Descrição |
|------------------------------------------------------|-----------|
| `components/client-form-manager.tsx`                 | Componente principal que gerencia o formulário de cliente |
| `interface/client.ts`                                | Tipagem base do cliente |
| `interface/client-enum.ts`                           | Enums usados no formulário e validação |
| `schema/client.schema.tsx`                           | Schema Zod para validação dos campos do formulário |
| `service/insert-client.service.ts`                   | Função que realiza a inserção do cliente no banco |
| `service/update-client.service.ts`                   | Função que realiza a atualização de dados do cliente |
| `utils/handle-is-pj.ts`                              | Função que detecta se o cliente é Pessoa Física ou Jurídica |
| `page/register-client.page.tsx`                      | Página React que utiliza o `ClientFormManager` para registrar um novo cliente |

---

## 🧠 Lógica do Formulário (`client-form-manager.tsx`)

O `ClientFormManager`:

- Recebe `defaultValue`, `mode`, `status`, `setLoadingModal`, `setMode`, `viewRequestId`, `obervationRequest`, `setStatusLocal`
- Usa o schema `client.schema.tsx` para validar os dados.
- Integra com o contexto de revisão para exibir comentários e revisar campos.
- Aplica lógica condicional com base no tipo de pessoa (física ou jurídica).
- Interage com `insert-client.service.ts` ou `update-client.service.ts` dependendo do modo (`"creating"` ou `"editing"`).

---

## ✅ Tipagem (`client.ts`)

Define a interface principal `IClient`, que representa a estrutura de um cliente no banco. Inclui campos como:

```ts
id, nome, email, telefone, cnpj_cpf, tipo_cliente, cep, cidade, ...
```

---

## 🧩 Enums (`client-enum.ts`)

Contém enums como:

- `TipoClienteEnum`
- `TipoDocumentoEnum`

Esses enums ajudam na consistência dos campos de seleção no formulário.

---

## 📦 Serviços

| Serviço                          | Descrição |
|----------------------------------|-----------|
| `insert-client.service.ts`       | Insere um novo cliente com validação de duplicidade e tratamento de erro |
| `update-client.service.ts`       | Atualiza cliente existente, com suporte a logs e validação |

---

## 📚 Utilitário: `handle-is-pj.ts`

Detecta se o cliente é pessoa física ou jurídica com base no CNPJ/CPF. Retorna `"pf"` ou `"pj"` para uso interno no formulário e mascaramento de campos.

---

## 💻 Página: `register-client.page.tsx`

Renderiza o formulário de criação de cliente usando `ClientFormManager`. Define props padrões, controla estado de loading e interage com contextos globais.

---

## 📌 Integrações

- Usa `ReviewContext` para gerenciamento de revisões.
- Usa `react-hook-form` para manipulação de formulário.
- Usa `zod` para validação.
- Usa `Supabase` via serviços para persistência.

---

## 💡 Melhorias futuras

- Adicionar autocomplete de endereço por CEP.
- Adicionar opção de múltiplos contatos por cliente.
- Separar contatos de cobrança do contato principal.
