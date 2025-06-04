# 📁 Documentação do Hook (`useCNPJSearch`)

### 📁 Localização

`/hooks/use-CNPJ-search.hook.ts`

---

## 📊 Visão Geral

O `useCNPJSearch` é um hook customizado responsável por **buscar dados de um CNPJ via API externa** e preencher automaticamente os campos de um formulário controlado pelo `react-hook-form`.

Além de facilitar o preenchimento, ele:
- Controla estado de carregamento
- Mapeia e traduz dados para enums internos
- Adapta valores conforme o tipo de formulário (`client` ou `supplier`)

---

## 📦 Parâmetros do Hook

| Parâmetro     | Tipo                                             | Descrição                                                                 | Obrigatório  |
|---------------|--------------------------------------------------|---------------------------------------------------------------------------|--------------|
| `methods`     | `UseFormReturn<T>`                               | Objeto do `react-hook-form`, usado para setar os valores dos campos.      | ✅ Sim       |
| `cnpjValue`   | `string`                                         | Valor do CNPJ (sem máscara).                                              | ✅ Sim       |
| `setLoading`  | `Dispatch<SetStateAction<boolean>>`              | Função para controlar o estado de carregamento visual.                    | ✅ Sim       |
| `form`        | `"client"` \| `"supplier"` (opcional)            | Tipo do formulário, usado para aplicar enums corretos.                    | ❌ Não       |

## 🔎 Detalhes Técnicos

- Realiza uma chamada assíncrona para `searchCNPJService` com o CNPJ fornecido.
- Ao receber os dados, utiliza o método `setValue` do `react-hook-form` para popular os campos do formulário.
- Preenche dados relacionados a endereço, dados legais, telefone e informações fiscais.
- Mapeia campos booleanos e categóricos para enums internos usados no formulário.
- Controla o estado de loading via a função `setLoading`.
- Trata erros e os loga no console para facilitar debugging.

## ⚙️ Comportamento Interno

1. Ativa `setLoading(true)`
2. Executa `searchCNPJService(cnpjValue)`
3. Ao obter os dados:
   - Preenche campos de endereço, razão social, nome fantasia, telefones
   - Converte dados fiscais para enums (`tpj`, `optante_simples`, etc.)
   - Adapta enums conforme `form` passado (client ou supplier)
4. Ao final, desativa o loading

---

## 📌 Regras de Uso

- `cnpjValue` precisa estar desformatado (sem `.` `-` ou `/`)
- Só funciona em formulários com `react-hook-form`
- O campo `form` é opcional, mas altamente recomendado



## 💻 Exemplo de Uso

```tsx
const { methods, watch } = useForm();
const cnpj = unmask(watch("cnpj_cpf") || "");

useEffect(() => {
  if (cnpj.length === 14) {
    useCNPJSearch({
      methods,
      cnpjValue: cnpj,
      setLoading,
      form: "client"
    });
  }
}, [cnpj]);
```


## 🔗 Conexões

- `searchCNPJService`: serviço que consulta dados de CNPJ
- `OptionYesNo`, `ClientTpj`, `SupplierTpj`: enums usados na definição de tipos no formulário
- `useForm` (`react-hook-form`): integração direta



## 🧠 Por que usar este hook?

- 🔁 Centraliza a lógica de preenchimento via CNPJ
- 🧱 Segue boas práticas de modularização e limpeza de código
- 🚦 Melhora a experiência do usuário e reduz erros de digitação
