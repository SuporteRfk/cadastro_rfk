# 📁 Documentação do Componente `LoadingSkelleton`

## 📁 Localização
`/components/loading-skelleton.components.tsx`

---

## 📊 Visão Geral

O `LoadingSkelleton` é um componente visual que simula o carregamento de conteúdo textual ou de listas. Ele é útil para **preencher visualmente a interface enquanto dados estão sendo carregados**, melhorando a experiência do usuário com feedback visual leve e fluido.

---

## 🔧 Props Aceitas

| Prop           | Tipo     | Descrição                                                                 |
|----------------|----------|---------------------------------------------------------------------------|
| `numberLines`  | `number` | Número de linhas de esqueleto que devem ser renderizadas. Padrão: `10`   |

---

## 🧬 Estrutura e Estilo

```tsx
<div className="w-full">
  <Skeleton className="px-1 py-3 h-[20px] bg-accent/40 rounded-t-sm rounded-b-none" />
  <Skeleton className="px-1 py-3 h-[16px] bg-neutral/60 rounded-none" />
  {[...Array(numberLines)].map((_, i) => (
    <Skeleton
      key={i}
      className="h-6 my-2 rounded-[2px] odd:bg-neutral/20 even:bg-white-default/50 bg-accent"
    />
  ))}
</div>
```

### Explicação:

- As duas primeiras linhas simulam títulos ou cabeçalhos.
- As `numberLines` subsequentes simulam linhas de conteúdo, com estilo alternado entre `odd` e `even` para dar variação visual.

---

## ⚠️ Regras de Uso

- O componente espera que `Skeleton` esteja disponível via `/components/ui`.
- Idealmente usado em lugares onde dados de listas, formulários ou tabelas estão sendo carregados.
- Pode ser usado em qualquer layout com largura total.

---

## 💻 Exemplo de Uso

```tsx
{isLoading ? <LoadingSkelleton numberLines={6} /> : <TabelaDeDados />}
```

---

## 🔗 Conexões

- Depende do componente `Skeleton` de `/components/ui`
- Pode ser usado junto com loaders (ex: `FullPageLoader`) em estados mistos de carregamento

---

## 🧠 Por que usar este componente?

- 🪶 Suaviza transições entre carregamento e dados reais
- 📐 Oferece flexibilidade visual com quantidade ajustável de linhas
- 🧼 Mantém consistência visual em diferentes partes da aplicação
