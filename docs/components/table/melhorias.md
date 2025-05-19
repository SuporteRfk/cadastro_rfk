# 🧩 Futuras Melhorias — Tabela de Solicitações



## 📊 Visão Geral  
Este documento descreve melhorias planejadas (ou desejáveis) para o módulo de tabela de solicitações, com foco em usabilidade, performance, escalabilidade e boas práticas.

---

## 🔮 Melhorias planejadas e sugeridas

---

### 1. 🧭 Ordenação de Colunas

**🎯 Objetivo:**  
Permitir ao usuário ordenar os dados da tabela por colunas como:

- ID
- Tipo
- Nome do solicitante
- Data de criação

**✅ Estratégia recomendada:**

- Adicionar ao filtro os campos:
  ```ts
  orderBy: "id" | "tipo" | "nome" | ...
  orderDirection: "asc" | "desc"
- Controlar via clique nos cabeçalhos da tabela
- Aplicar ordenação na query Supabase:
```tsx
.order(filter.orderBy, { ascending: filter.orderDirection !== 'desc' })
```

## 📦 Componente sugerido:
`TableSorterButton` ou integração direta em `request-columns.tsx` com ícones clicáveis `↑ ↓`

### 2. 🔍 Busca Específica (ID ou Nome do Solicitante)

- 🎯 Objetivo:
    -  Permitir buscas diretas e parciais por nome ou ID
- ✅ Estratégia:
    - Adicionar um input de busca com debounce ao modal de filtros
    - Atualizar filter.nome a cada input
    - Utilizar ilike no Supabase:
    ```tsx
    .ilike("nome", `%${nome}%`)
    ```