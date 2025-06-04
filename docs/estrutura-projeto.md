# 🏗️ Estrutura do Projeto

Esta documentação descreve a estrutura de diretórios e arquivos do projeto, explicando o propósito de cada seção e como elas se relacionam.

A estrutura segue o padrão por **features**, garantindo **escalabilidade**, **clareza** e **facilidade de manutenção**.


✅ **Regra de ouro**: Qualquer nova funcionalidade deve seguir essa estrutura. Alterar o padrão exige discussão e aprovação do time responsável.

---

## 📁 Estrutura Geral

```bash
/root/
├── .env            # Guardar chaves e dados sensíveis   
├── public/         # Arquivos estáticos acessíveis diretamente, como imgs, ícones e bg
├── src/            # Todo o código-fonte da aplicação.
│   ├── @types/     # Tipagens globais (se usadas) 
│   ├── assets/     # Logos e imagens internas usadas pelos componentes.
│   ├── components/ # Componentes reutilizáveis e compartilhados
│   ├── context/    # Contextos globais como Auth, Modal, Config.
|   ├── data/       #  
|   ├── features/   # Cada funcionalidade (ex:clientes, insumos, etc). 
│       └── clientes/   # Diretório é o módulo, recebe contéudo exclusivo dele.
│               ├── components/     # Componentes específicos       (opcional) 
│               ├── hook/           # Hook customizado do módulo    (opcional) 
│               ├── interface/      # Interfaces/Enums globais      (opcional)
│               ├── page/           # Página do módulo      
│               ├── schema/         # Yup schemas do módulo         (opcional) 
│               ├── service/        # Funções de chamada de API     (opcional) 
│               ├── utils/          # Funções utilitárias           (opcional) 
│               └── index.tsx       # Entrada principal da feature  (opcional) 
│   ├── hooks/      # Hooks customizados de uso global
│   ├── interfaces/ # Interfaces/Enums globais (se existirem) 
│   ├── lib/        # Diretório exclusivo de uso da lib do tailwind
│   ├── pages/      # Páginas que não precisam de módulo (ex: not-found)
│   ├── routes/     # Configurações de rotas públicas e privadas.
│   ├── services/   # erviços globais (config do Supabase, auth, etc) 
│   ├── style/      # Estilos globais (ex: tailwind.css) 
│   ├── utils/      # Funções utilitárias compartilhadas 
│   ├── App.tsx     # Arquivo principal do app 
│   ├── main.tsx    # Ponto de entrada da aplicação, renderiza o React.
│   └── vite-env.d.ts
```

---

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


## 📚 Documentação

- Toda nova **feature** ou **padrão novo** deve ser documentado.

---

Se tiver dúvidas na hora de adicionar uma nova funcionalidade, consulte essa documentação ou alinhe com o time.