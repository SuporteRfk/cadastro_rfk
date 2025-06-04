# 📁 Documentação do Componente `FullPageLoader`

## 📁 Localização
`/components/full-page-loader.components.tsx`

---

## 📊 Visão Geral

O `FullPageLoader` é um componente visual que exibe um **indicador de carregamento em tela cheia**, utilizado durante estados de espera globais como autenticação, carregamento inicial de rotas protegidas, entre outros.

Ele combina:
- Um anel giratório animado
- O símbolo da aplicação com animação de pulso (`ping`)
- Um fundo leve para destacar o carregamento

---

## 🧬 Estrutura e Estilo

```tsx
<div className="bg-accent/5 flex-col gap-4 w-full h-screen flex items-center justify-center">
  <div className="relative w-32 h-32 flex items-center justify-center">
    <div className="absolute w-full h-full border-8 border-accent/30 border-t-accent rounded-full animate-spin"/>
    <img src={SymbolLogo} className="h-[3em] w-[3em] animate-ping" />
  </div>
</div>
```

### Explicação:
| Elemento      | Classe / Estilo                   | Função                                     |
|---------------|-----------------------------------|--------------------------------------------|
| `bg-accent/5` | Fundo claro (semitransparente)    | Suaviza a transição entre estados de tela  |
| `border-t-accent` | Topo com cor destacada      | Cria a ilusão de um spinner                |
| `animate-spin` | Tailwind Animation               | Gira o contorno do círculo                 |
| `animate-ping` | Tailwind Animation               | Aplica pulso à imagem                      |

---

## ⚠️ Regras de Uso

- Deve ser renderizado sobre toda a aplicação (`position: fixed` ou em `App`)
- O logo é importado diretamente de `@/assets/symbol_logo.png`
- O componente **não possui props**, sendo um componente de uso direto

---

## 💻 Exemplo de Uso

```tsx
{isLoading && <FullPageLoader />}
```

---

## 🔗 Conexões

- Pode ser utilizado junto do `AuthContext` (ex: durante verificação de sessão)
- Ideal para ser incluído dentro do `App.tsx` ou `PageLayout` em etapas de carregamento inicial

---

## 🧠 Por que usar este componente?

- 🧼 Melhora a experiência visual em momentos de transição ou carregamento total
- 🧩 Padroniza o comportamento visual da aplicação
- 🎯 Ajuda a manter a percepção de performance durante operações críticas
