# 📁 Documentação do Componente `LoadingModal`

## 📁 Localização
`/components/loading-modals.components.tsx`

---

## 📊 Visão Geral

O `LoadingModal` é um componente visual que exibe um **indicador de carregamento sobreposto** dentro de uma área restrita, como modais ou caixas de conteúdo.

Ele é uma versão compacta e localizada do `FullPageLoader`, mantendo a identidade visual e animações consistentes com o restante da aplicação.

---

## 🧬 Estrutura e Estilo

```tsx
<div className="absolute inset-0 w-full h-full flex items-center justify-center z-50 bg-accent/5 left-0 rounded-lg">
  <div className="relative w-24 h-24 flex items-center justify-center">
    <div className="absolute w-full h-full border-7 border-accent/40 border-t-accent rounded-full animate-spin"/>
    <img src={SymbolLogo} className="h-[2em] w-[2em] animate-ping" />
  </div>
</div>
```

### Explicação:
| Elemento       | Estilo / Classe Tailwind              | Finalidade                                                |
|----------------|----------------------------------------|------------------------------------------------------------|
| `absolute inset-0` | Ocupa toda a área do container pai | Permite sobreposição local                                 |
| `z-50`         | Alta prioridade na pilha de render     | Garante que apareça acima de outros elementos visuais     |
| `rounded-lg`   | Bordas arredondadas no fundo           | Segue padrão visual do restante da UI                     |
| `border-t-accent` + `animate-spin` | Cria o efeito do spinner girando | Indicador de atividade                                   |
| `animate-ping` | Aplica animação pulsante ao logo       | Reforça o carregamento com feedback visual sutil          |

---

## ⚠️ Regras de Uso

- Deve ser renderizado **dentro de containers com `position: relative`**
- O logo é importado de `@/assets/symbol_logo.png`
- O componente **não aceita props** e é usado diretamente

---

## 💻 Exemplo de Uso

```tsx
<div className="relative">
  {isSaving && <LoadingModal />}
  <FormContent />
</div>
```

---

## 🔗 Conexões

- Visualmente alinhado ao `FullPageLoader`
- Ideal para telas intermediárias, modais, formulários ou componentes que exigem feedback visual rápido sem bloquear toda a interface

---

## 🧠 Por que usar este componente?

- ⏳ Fornece feedback visual sem cobrir toda a interface
- 🧱 Permite modularidade e encapsulamento do carregamento
- 💡 Melhora a experiência do usuário em operações locais (ex: salvar, atualizar)
