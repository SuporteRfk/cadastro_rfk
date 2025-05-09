# Documentação do Componente `date-input`;

## 📁 Localização

`/components/inputs/date-input.components.tsx`

## 📊 Visão Geral

O componente DateInput é reutilizável e projetado para atender cenários onde uma data deve ser exibida de forma automática e **não editável**. Ele é usado nas seguintes situações:

- ✅ Cadastro de novos dados (data e hora atuais preenchidas automaticamente)
- ✅ Visualização de dados existentes (data vinda do banco de dados)

## 🔎 Detalhes de Implementação

### useEffect e watch
O componente utiliza useEffect para definir corretamente a data com base no modo atual (cadastro ou visualizacao).

- No modo **cadastro**, preenche com a data e hora atual ajustada ao fuso local.
- No modo **visualizacao**, converte a string ISO da data vinda do banco para o formato YYYY-MM-DDTHH:MM.

```tsx
    useEffect(() => {
    if (mode === "cadastro" && !value) {
        const now = new Date();
        const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
        const formattedDate = localDate.toISOString().slice(0, 16);
        setCurrentDate(formattedDate);
    } else if (value) {
        const iso = new Date(value).toISOString();
        const formatted = iso.slice(0, 16);
        setCurrentDate(formatted);
    }
    trigger(name); // garante que o RHF reconheça o valor
    }, [mode, trigger]);
```

### Registro com React Hook Form
O register é aplicado diretamente no campo:

```tsx
<input {...register} ... />
```

### Comportamento Visual
- Input sempre readOnly.
- Estilização visual com opacidade para indicar leitura.
- Ícone de calendário posicionado à esquerda.
- Exibe erro abaixo do campo quando presente.


### Props Aceitas

| Prop            | Tipo                                                | Descrição                                                                             |
|-----------------|-----------------------------------------------------|---------------------------------------------------------------------------------------|
| `name`          | `string`                                            | Nome do input (para `form`)                                                           |
| `label`         | `string` (opcional)                                 | Texto do label exibido acima                                                          |
| `register`      | `UseFormRegisterReturn`                             | Registro do React Hook Form                                                           |
| `error`         | `string` (opcional)                                 | Mensagem de erro a ser exibida                                                        |
| `mode`          | `cadastro` ou `visualização` (default: visualização)| Define comportamento: cadastro gera data atual, visualizacao usa valor vindo do banco |

 
## ⚖️ Regras de Uso

- Sempre utilizar com `react-hook-form`.
- Este componente depende do FormProvider. Se não estiver dentro dele, `useFormContext()` causará erro.
- Nunca permita edição manual neste componente.
- Quando necessário campo editável, crie um novo componente.
- `trigger()` é obrigatório para evitar problemas de submissão.
- Compatível com formulários de solicitação e controle (visualização).


## 💻 Exemplo de uso

**OBS**: O componente precisa ser utilizado dentro de um `FormProvider` do React Hook Form. Caso contrário, funções como `watch()` e `trigger()` irão falhar..

```tsx
<DateInput
  name="criado_em"
  label="Data da Solicitação"
  mode="cadastro"
  register={methods.register("criado_em")}
  error={methods.formState.errors.criado_em?.message}
/>
```

---

Este componente é essencial para padronizar a apresentação de datas no sistema, garantindo consistência e validação confiável com o React Hook Form.

Se for necessário permitir entrada manual de datas no futuro, **crie uma versão alternativa editável**.