# Documentação do Componente `FormRegistrationIdentification`;

## 📁 Localização

`/components/forms/form-address.components.ts`

## 📊 Visão Geral

O componente `FormAddress` é um formulário reutilizável para captura e exibição de informações de endereço, integrado com `react-hook-form` para gerenciamento e validação de dados. Ele oferece suporte tanto para endereço padrão quanto para endereço de cobrança (via prop `isBillingAddress`), permitindo que campos sejam configurados dinamicamente conforme o contexto.  

Possui integração com a API ViaCEP para consulta automática dos dados do endereço a partir do CEP informado, preenchendo automaticamente os campos correspondentes, reduzindo esforço do usuário e erros de digitação.



## ⚙️ Propriedades (Props)

| Nome             | Tipo                                               | Descrição                                                                                                         | Opcional / Padrão    |
|------------------|---------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|---------------------|
| `mode`           | `FormStateType`                                    | Controla o estado do formulário, podendo ser `'editing'`, `'viewing'` ou `'reviewing'`. Isso determina se os campos estão editáveis ou somente leitura. | Opcional, padrão implícito: `'editing'` |
| `methods`        | `UseFormReturn<T>`                                 | Objeto retornado pelo `useForm` do `react-hook-form`, utilizado para registrar campos, controlar valores e erros do formulário. | Obrigatório         |
| `isBillingAddress`| `boolean`                                         | Indica se o formulário refere-se ao endereço de cobrança. Quando `true`, os nomes dos campos mudam para refletir dados de cobrança. | Opcional, padrão: `false` |
| `setLoading`     | `React.Dispatch<React.SetStateAction<boolean>>`   | Função para controlar o estado de loading, que indica ao usuário que a consulta do CEP está em andamento.         | Obrigatório         |

---

## 🔍 Detalhes Técnicos e Lógica


### 1. Integração com React Hook Form  
O componente utiliza o objeto `methods` do React Hook Form para:  
- **Registrar campos** usando `methods.register` para controlar seus valores e erros.  
- **Observar valores** dos campos de CEP para disparar a consulta automática via `methods.watch`.  
- **Definir valores** dos campos automaticamente com `methods.setValue` após o retorno da API ViaCEP.

### 2. Consulta Automática ViaCEP  
- O componente observa o campo de CEP (`cep` ou `cep_cobranca` dependendo do `isBillingAddress`).  
- Ao digitar 8 dígitos válidos (CEP completo, sem máscara), dispara a função `getAddressData`.  
- Essa função faz uma chamada assíncrona para a API ViaCEP (através do serviço `consultationCepService`).  
- Caso o CEP seja válido e retorne dados, os campos de endereço são preenchidos automaticamente (`endereco`, `bairro`, `complemento`, `estado`, `municipio`).  
- A função controla o estado de loading via `setLoading` para indicar o processo de busca ao usuário.

### 3. Configuração Dinâmica de Campos  
Para suportar o endereço principal e o endereço de cobrança, o componente utiliza a prop `isBillingAddress` para alternar dinamicamente os nomes e erros dos campos usados no formulário. Isso evita duplicação de código e mantém o componente flexível.  
Exemplo:  
- Campo CEP será `cep` se `isBillingAddress` for `false`, ou `cep_cobranca` se for `true`.

### 4. Controle de Acesso (Leitura/Escrita)  
Os campos ficam somente leitura (`readOnly`) quando o `mode` é `'viewing'` ou `'reviewing'`, prevenindo alterações nos modos de visualização ou revisão.

---

## 📝 Campos Controlados

O formulário controla os seguintes campos (com nome dinâmico para cobrança):  
- **CEP** (`cep` ou `cep_cobranca`) — campo com máscara customizada `99999-999`.  
- **Estado** (`estado` ou `estado_cobranca`) — texto simples.  
- **Município** (`municipio` ou `municipio_cobranca`) — texto simples.  
- **Endereço** (`endereco` ou `endereco_cobranca`) — texto livre, limite 150 caracteres.  
- **Número** (`numero` ou `numero_cobranca`) — campo numérico para número do endereço.  
- **Bairro** (`bairro` ou `bairro_cobranca`) — texto livre, limite 100 caracteres.  
- **Complemento** (`complemento` ou `complemento_cobranca`) — texto livre, limite 120 caracteres.

---

## 💡 Exemplo de Uso

```tsx
<FormAddress
  mode="editing"
  methods={methods}
  setLoading={setLoading}
  isBillingAddress={false} // ou true para endereço de cobrança
/>
```

### 🚀 Observações e Recomendações

- `Flexibilidade`: O componente pode ser utilizado tanto para endereço principal quanto para endereço de cobrança, bastando alterar a prop isBillingAddress.
- `Validação e Máscaras`: Deve ser usado em conjunto com validação externa (Yup, por exemplo) e gerenciamento de formulário via React Hook Form para garantir consistência dos dados.
- `Experiência do Usuário`: O carregamento indicado via setLoading deve ser usado para mostrar um spinner ou outra indicação visual de processo de consulta do CEP, melhorando a UX.
- Erros e Tratamento: Em caso de falha na consulta do CEP, o componente apenas loga o erro, isso está de propósito, pois caso der qualquer tipo de erro, o próprio usário faz o preenchimento do endereço.
- `Limitação`: A consulta automática ocorre apenas quando o CEP possui 8 dígitos (formato padrão brasileiro sem máscara).


### 🔧 Detalhamento da Função Principal `getAddressData`
```tsx
const getAddressData = async (zipCode: string) => {
  try {
    setLoading(true);
    const address = await consultationCepService(zipCode);

    if (address) {
      methods.setValue(fieldConfig.zip.name as Path<T>, address.cep as PathValue<T, Path<T>>);
      methods.setValue(fieldConfig.address.name as Path<T>, address.endereco as PathValue<T, Path<T>>);
      methods.setValue(fieldConfig.district.name as Path<T>, address.bairro as PathValue<T, Path<T>>);
      methods.setValue(fieldConfig.complement.name as Path<T>, address.complemento as PathValue<T, Path<T>>);
      methods.setValue(fieldConfig.state.name as Path<T>, address.estado as PathValue<T, Path<T>>);
      methods.setValue(fieldConfig.city.name as Path<T>, address.municipio as PathValue<T, Path<T>>);
    }
  } catch (error) {
    console.error("Erro ao consultar cep: ", error);
  } finally {
    setLoading(false);
  }
};
```

- Faz a chamada assíncrona para buscar os dados do endereço a partir do CEP informado.
- Atualiza os valores do formulário usando `methods.setValue` para cada campo relevante.
- Controla o estado de loading para feedback visual.
- Captura e loga possíveis erros na requisição.


