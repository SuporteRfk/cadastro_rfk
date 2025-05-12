# Sistema Cadastro RFK

Plataforma interna que centraliza solicitações de novos cadastros (clientes, fornecedores, formas de pagamento, etc.), encaminha para aprovação da controladoria e, após validação, integra as informações ao sistema TOTVs.


## 🎯 Objetivo

Simplificar o fluxo de cadastros que hoje é feito manualmente via planilhas, garantindo agilidade, controle, histórico de alterações e segurança no processo.  
Este sistema foi pensado para **otimizar o tempo da equipe**, reduzir erros operacionais e permitir maior escalabilidade nas rotinas da RFK.

## 🧭 Organização do Projeto

Este projeto segue a estrutura modular por funcionalidades (Feature-based Architecture).  
A documentação completa da estrutura está disponível na pasta [`/docs/estrutura-projeto.md`](./docs/estrutura-projeto.md).


## 🔐 Autenticação

O sistema utiliza **Keycloak via API REST** para autenticação e controle de acesso, com **unificação de credenciais com o Active Directory (AD)** da empresa.  
Isso garante que os usuários acessem com a mesma senha de rede, sem criar contas duplicadas.

## ⚙️ Tecnologias Utilizadas

| Stack | Libs / Ferramentas | Links das Documentações |
|-------|--------------------|-------------------------|
| **Front-end** | React + Vite |       X               |
| **Estilização** | TailwindCSS | [documentação](https://tailwindcss.com/docs/installation/using-vite) |
| **Tipos e Validações** | TypeScript, Yup, React Hook Form | X |
| **UX/UI** | Lucide React, React Icons, Framer Motion | X |
| **Roteamento** | React Router DOM | X |
| **Formulários** | react-hook-form + yup + @hookform/resolvers | X |
| **Input Masks** | react-input-mask | [documentação](https://www.npmjs.com/package/react-input-mask)|
| **Requisições** | Axios | X |
| **Banco de Dados e Auth** | Supabase | X |
| **Hooks Utilitários** | react-use (`useClickAway`) | [documentação](https://github.com/streamich/react-use/blob/HEAD/docs/useClickAway.md)|
| **Tabelas** | TanStack Table v8 |[documentação](https://tanstack.com/table/v8/docs/installation)|
| **Loading** | react-loader-spinner | [documentação](https://mhnpd.github.io/react-loader-spinner/docs/intro)|
| **Formatação Númerica**  | react currency format | [documentação](https://www.npmjs.com/package/react-currency-format)|
| **Hooks React** |   react-use | [documentação](https://www.npmjs.com/package/react-use)|


## 🚀 Como Executar o Projeto

```bash
# Clone o repositório
git clone https://github.com/SEU-USUARIO/sistema_cadastro_rfk.git

# Acesse a pasta do projeto
cd sistema_cadastro_rfk

# Instale as dependências
npm install ou yarn 

# Crie o arquivo .env com base no .env.example
cp .env.example .env

# Execute o projeto
npm run dev
```


## 🤝 Contribuindo com o Projeto

* Se for contribuir com o projeto, siga estes passos:
* Sempre crie sua branch a partir da develop.
* Use o padrão de commits Conventional Commits.
* Siga a estrutura de pastas descrita em /docs/estrutura-projeto.md.
* Escreva nomes de variáveis e funções em português.
* Pastas, arquivos e nomes de commits devem ser em inglês.
* Sempre documente novas funcionalidades.


## 👨‍💻 Desenvolvedor

Este projeto é mantido e desenvolvido por [Thiago Silva](https://github.com/ThiagoKalac) , como parte do processo de evolução interna dos fluxos operacionais da RFK.


## 📄 Licença
Este projeto é de uso interno da RFK. Não possui licença aberta para uso externo.


## Desenvolvedor
Este sistema está sendo desenvolvido por [Thiago Silva](https://github.com/ThiagoKalac) com apoio da equipe de controladoria e TI da RFK.

O objetivo é garantir a continuidade, escalabilidade e autonomia da equipe sobre os dados e processos internos.