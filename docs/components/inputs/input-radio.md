# Documentação do Componente `InputRadio`

## 📁 Localização
`src/components/inputs/input-radio.components.tsx`

## 📊 Visão Geral

O componente `InputRadio` renderiza um grupo de botões de opção (radio buttons) para seleção única entre várias opções. Ele integra-se com o `react-hook-form` através da prop `register`, facilitando o controle e a validação dos campos em formulários.

## ⚙️ Propriedades

- `options`:
    - **Tipo**: `{ label: string; value: string; }[]`
    - **Descrição**: Array contendo as opções que serão exibidas como radio buttons. Cada opção possui um rótulo visível (`label`) e um valor (`value`) associado.
    - Exemplo:
    ```tsx
    [
        { label: "Masculino", value: "M" },
        { label: "Feminino", value: "F" }
    ]
    ```
- `name`:
    - **Tipo**: `string`
    - **Descrição**: Nome do campo que será usado para agrupar os radios no formulário e pelo `react-hook-form` para identificar o campo.
    - **Exemplo**: `"genero"`
- `label`:
    - **Tipo**: `string (opcional)`
    - **Descrição**: Texto exibido como título do grupo de opções. Caso não fornecido, nenhum título será exibido.
    - **Exemplo**: `"Gênero"`
- `margin`:
    - **Tipo**: `string (opcional)`
    - **Padrão**: `"mb-0"`
    - **Descrição**: Classe do `Tailwind CSS` para margem inferior que será aplicada ao container das opções. Pode ser usada para ajustar espaçamentos no layout.
    - **Exemplo**: `"mb-4"`
- `error`:
    - **Tipo**: string (opcional)
    - **Descrição**: Mensagem de erro a ser exibida abaixo do grupo de opções, caso haja alguma validação que não seja satisfeita.
    - **Exemplo**: "Campo obrigatório"
- `register`:
    - **Tipo**: `UseFormRegisterReturn`
    - **Descrição**: Objeto retornado pelo `react-hook-form` via `register()` para registrar o input no formulário. Deve ser passado para cada input radio para integrá-los ao controle do formulário.

## 🔍 Comportamento

- Renderiza um conjunto de botões radio estilizados e alinhados, responsivos para dispositivos móveis e desktop.
- Exibe o `label` do grupo acima das opções, caso fornecido.
- Cada opção possui seu próprio `label` clicável, que ao ser acionado seleciona o radio correspondente.
- Aplica estilos visuais personalizados para o estado selecionado, focado e não selecionado.
- Exibe a mensagem de erro em destaque abaixo do grupo quando presente.
- A integração com o `react-hook-form` garante que o valor selecionado será capturado corretamente para validação e submissão do formulário.

## 💡 Exemplo de Uso
```tsx
<InputRadio
  name="genero"
  label="Gênero"
  options={[
    { label: "Masculino", value: "M" },
    { label: "Feminino", value: "F" },
  ]}
  register={methods.register("genero")}
  error={methods.formState.errors.genero?.message}
/>

```

## 🚀 Observações
Este componente foi projetado para ser flexível e reutilizável em diferentes formulários, fornecendo uma experiência de seleção clara e acessível para grupos de opções mutuamente exclusivas. O uso do `register` do `react-hook-form` permite validação e gerenciamento eficientes.