# 📁 Documentação do Hook (`useCNPJSearch`)

### 📁 Localização

`/hooks/use-CNPJ-search.hook.ts`

## 📊 Visão Geral

O `useCNPJSearch` é um hook customizado responsável por encapsular a lógica de busca e preenchimento automático dos dados cadastrais a partir do número do CNPJ. Ele integra a consulta à API externa (`searchCNPJService`) e atualiza os campos do formulário gerenciado pelo `react-hook-form`, facilitando o preenchimento automático de informações como endereço, dados legais, telefones e classificações fiscais.

O hook também controla o estado de carregamento (`loading`), fornecendo feedback visual durante a busca dos dados.

---

## 🔎 Detalhes Técnicos

- Realiza uma chamada assíncrona para `searchCNPJService` com o CNPJ fornecido.
- Ao receber os dados, utiliza o método `setValue` do `react-hook-form` para popular os campos do formulário.
- Preenche dados relacionados a endereço, dados legais, telefone e informações fiscais.
- Mapeia campos booleanos e categóricos para enums internos usados no formulário.
- Controla o estado de loading via a função `setLoading`.
- Trata erros e os loga no console para facilitar debugging.

---

## 📦 Parâmetros do Hook

| Prop        | Tipo                                    | Descrição                                                      | Obrigatório / Padrão  |
|-------------|-----------------------------------------|----------------------------------------------------------------|----------------------|
| `methods`   | `UseFormReturn<T>`                      | Objeto retornado pelo `useForm`, para controle dos campos e valores do formulário. | Obrigatório          |
| `cnpjValue` | `string`                               | Valor do CNPJ, desmascarado, que será utilizado para consulta. | Obrigatório          |
| `setLoading`| `React.Dispatch<React.SetStateAction<boolean>>` | Função para alterar o estado de carregamento do formulário.    | Obrigatório          |
| `form`      | `"client"` \| `"supplier"` (opcional) | Indica o tipo do formulário para ajustar preenchimentos específicos (ex: enums). | Opcional             |

---

## ⚙️ Comportamento Interno

```ts
export const useCNPJSearch = async <T extends FieldValues>({
  methods, cnpjValue, setLoading, form
}: useCNPJSearchProps<T>) => {
  try {
    setLoading(true);
    const cnpjData = await searchCNPJService(cnpjValue);

    if (cnpjData) {
      // Preenche campos de endereço
      methods.setValue("cep", cnpjData.cep);
      methods.setValue("estado", cnpjData.uf);
      methods.setValue("municipio", cnpjData.municipio);
      methods.setValue("bairro", cnpjData.bairro);
      methods.setValue("endereco", `${cnpjData.descricao_tipo_de_logradouro} ${cnpjData.logradouro}`);
      methods.setValue("numero", cnpjData.numero);
      methods.setValue("complemento", cnpjData.complemento);

      // Preenche dados legais
      methods.setValue("razao_social", cnpjData.razao_social);
      methods.setValue("nome_fantasia", cnpjData.nome_fantasia);
      methods.setValue("cnae", `${cnpjData.cnae_fiscal} - ${cnpjData.cnae_fiscal_descricao}`);

      // Telefones
      methods.setValue("telefone_3", cnpjData.ddd_telefone_1);
      methods.setValue("telefone_4", cnpjData.ddd_telefone_2);

      // Optante pelo Simples Nacional
      if (cnpjData.opcao_pelo_simples !== null) {
        const optInSimple = cnpjData.opcao_pelo_simples
          ? OptionYesNo.SIM
          : OptionYesNo.NAO;
        methods.setValue("optante_simples", optInSimple);
      }

      // Optante MEI
      if (cnpjData.opcao_pelo_mei) {
        const option = form === "client" ? ClientTpj.MEI : SupplierTpj.MEI;
        methods.setValue("tpj", option);
      }

      // Porte da empresa - define TPJ
      if (cnpjData.porte !== null) {
        const option = form === "client" ? ClientTpj : SupplierTpj;

        switch (cnpjData.porte) {
          case "MICRO EMPRESA":
            methods.setValue("tpj", option.MICRO_EMPRESA);
            break;
          case "EMPRESA DE PEQUENO PORTE":
            methods.setValue("tpj", option.PEQUENO_PORTE);
            break;
          case "DEMAIS":
            methods.setValue("tpj", option.NAO_OPTANTE);
            break;
          default:
            break;
        }
      }
    }
  } catch (error) {
    console.error("Erro ao buscar cnpj: ", error);
  } finally {
    setLoading(false);
  }
};
```

## ⚖️Regras de Uso
- Deve ser utilizado dentro de componentes que utilizam `react-hook-form`, passando o objeto `methods`.
- `cnpjValue` deve estar desmascarado e possuir tamanho correto para evitar consultas inválidas.
- `setLoading` deve ser fornecido para permitir o controle de estado visual durante a consulta.
- O parâmetro `form` é opcional, mas recomendado para ajustar campos específicos conforme o tipo de formulário (cliente ou fornecedor).

## 💻 Exemplo de Uso
```tsx
const { methods, watch } = useForm();

const cnpjWithoutMask = unmask(watch("cnpj_cpf") || "");

useEffect(() => {
  if (cnpjWithoutMask.length === 14) {
    useCNPJSearch({
      methods,
      cnpjValue: cnpjWithoutMask,
      setLoading,
      form: "client",
    });
  }
}, [cnpjWithoutMask]);

```

### 🧠 Por que usar este hook?

- 🔄 Centraliza a lógica da busca e preenchimento automático do CNPJ, evitando duplicação.
- 🧱 Promove arquitetura limpa e desacoplada, facilitando manutenção e reaproveitamento.
- 🚦 Melhora a UX com carregamento controlado e preenchimento automático dos campos.
- 🔍 Facilita o uso do formulário, reduzindo erros e agilizando o processo de cadastro.