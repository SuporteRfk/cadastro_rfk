# Documentação: Page `Login`

## 📁 Localização

`/features/login/`
 - `/features/login/pages/login.pages.tsx` - page do login
 - `/features/login/schema/login.schema.tsx` - schema do login
 
## 📊 Visão Geral

A feature de `Login` é responsável por autenticar o usuário no sistema utilizando credenciais (usuário/senha) e integrar-se ao contexto global de autenticação (`AuthContext`).

O processo envolve:
- Captura dos dados pelo formulário de login (FormLogin).
- Validação do formulário com Yup e React Hook Form.
- Chamada da função loginService do AuthContext.
- Controle de loading local e global para feedback visual.
- Redirecionamento automático para a Dashboard em caso de sucesso

## 🧩 Estrutura da Feature

| Arquivo             | Função principal                                         |
|---------------------|----------------------------------------------------------|
| `login.page.tsx`    | Página de login e orquestração de estados e fluxo.       |
| `login.schema.ts`   | Schema Yup para validação de campos (usuário e senha).   |


## 🔎 Detalhes de Implementação

### `login.page.tsx`
- Utiliza o `AuthContext` para acessar `loginService`.
- Gerencia `loadingLocal` para mostrar spinner no botão para não usar o loading do contexto, pois este fará transiçao de tela.
- Após sucesso do login, aguarda 1 segundo e autentica o usuário, ativando a transição de tela e redirecionamento para `/dashboard`
- Garante que, enquanto isLoading global for true, um carregamento de tela inteira (LoadingPage) seja exibido.
- Integração com `FormProvider` do `react-hook-form`.
- Inputs personalizados para `Usuário` e `Senha`.
- Permite visualizar/esconder senha (`showPassword`).
- Validação de formulário automática (`yupResolver(loginSchema)`).
- Desabilita botão de envio enquanto estiver carregando (`loadingLocal`).

### `login.schema.ts`
- Define regras de validação:
    - Usuário: campo obrigatório.
    - Senha: campo obrigatório.

## ⚖️ Regras de Uso

- Sempre utilizar o formulário dentro de um FormProvider.
- O botão de login deve respeitar o estado loadingLocal para evitar múltiplos envios.
- `isLoading` global é usado apenas para transição dela tela se o login for bem sucedido.
- As mensagens de sucesso e erro são tratadas no contexto de autenticação, centralizando feedbacks.


## 🚀 Considerações Finais

A estrutura de Login foi planejada para ser simples, eficiente e altamente escalável.
Mantém separação de responsabilidades, alto nível de reusabilidade e aderência total às boas práticas.

### Observação:

A feature `Login` depende do `AuthContext`. Certifique-se que o contexto esteja funcionando corretamente no projeto para evitar problemas de redirecionamento ou carregamento.