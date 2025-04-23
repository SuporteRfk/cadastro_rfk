# 📁 Estrutura de Pastas do Projeto

Este documento serve como referência oficial da arquitetura de pastas utilizada no projeto.  
A estrutura segue o padrão por **features**, garantindo **escalabilidade**, **clareza** e **facilidade de manutenção**.


✅ **Regra de ouro**: Qualquer nova funcionalidade deve seguir essa estrutura. Alterar o padrão exige discussão e aprovação do time responsável.


<br>

## 📂 Estrutura Base

```bash
src/ 
    ├── @types                              # Tipagens globais (se usadas) 
    ├── assets                              # Logos, ícones, fontes, imagens estáticas 
    ├── components                          # Componentes reutilizáveis e compartilhados 
    ├── context                             # Contextos globais como Auth, Modal, Config 
    ├── features                            # Cada funcionalidade (ex: clientes, insumos, etc) 
    │       └── clientes/                       # Contém tudo relacionado ao domínio "clientes" 
    │               ├── components/             # Componentes específicos 
    │               ├── forms/                  # Formulários por tipo (cadastro, edição, revisão) 
    │               ├── schema/                 # Yup schemas do módulo 
    │               ├── service.ts              # Funções de chamada de API 
    │               └── index.tsx               # Entrada principal da feature (opcional) 
    ├── hooks                               # Custom hooks globais (useToast, useAuth, etc) 
    ├── interfaces                          # Interfaces/Enums globais (se existirem) 
    ├── pages                               # Páginas públicas ou sem layout (login, 404) 
    ├── schemas                             # Yup schemas compartilhados (ex: authSchema) 
    ├── services                            # Serviços globais (config do Supabase, auth, etc) 
    ├── style                               # Estilos globais (ex: tailwind.css) 
    ├── utils                               # Funções utilitárias compartilhadas 
    ├── views                               # Views da aplicação (home, dashboard, controladoria) 
    ├── App.tsx                             # Arquivo principal do app 
    ├── main.tsx                            # Ponto de entrada (React + Vite) 
    └── vite-env.d.ts

```

<br>

## 🌐 Padrões de Nomeação

- **Pastas e arquivos**: Inglês e `kebab-case` (ex: `form-clientes`, `auth-context`)  
- **Variáveis, funções e tipos**: Português em `camelCase` (ex: `handleCadastroCliente`)  
- **Enums e constantes globais**: `PascalCase` e em português (ex: `StatusSolicitacoes`, `TipoOperacao`)  
- **Commits**: Padrão **Conventional Commits**

## ✨ Exemplos de Features

```bash
clientes/
├── components/
│   └── CardCliente.tsx
├── forms/
│   ├── FormCadastroCliente.tsx
│   ├── FormRevisaoCliente.tsx
│   └── FormEdicaoCliente.tsx
├── schema/
│   └── cliente.schema.ts
├── service.ts
└── index.tsx
```

<br>

## 📚 Documentação

- Toda nova **feature** ou **padrão novo** deve ser documentado.

---

Se tiver dúvidas na hora de adicionar uma nova funcionalidade, consulte essa documentação ou alinhe com o time.