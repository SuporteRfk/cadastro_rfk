# 📁 Documentação do Componente `BadgeCounter`

## 📁 Localização
`/components/badge-counter.components.tsx`

---

## 📊 Visão Geral

O `BadgeCounter` é um componente visual utilizado para exibir **contadores dinâmicos**, geralmente sobre ícones ou botões. Ele é usado para alertar o usuário sobre a quantidade de itens novos, notificações ou elementos pendentes.

Este badge é animado com `framer-motion` e **só aparece se o valor `count` for maior que 0**.

---

## 🔧 Props Aceitas

| Prop            | Tipo       | Descrição                                                                 |
|-----------------|------------|---------------------------------------------------------------------------|
| `count`         | `number`   | Valor numérico que será exibido no badge. Se `0`, o badge não é renderizado. |
| `color`         | `string`   | Classe de cor (ex: `bg-red-500`, `bg-green-600`)                          |
| `marginPosition`| `string`   | (opcional) Classe para posicionamento lateral. Padrão: `right-[-8px]`     |
| `size`          | `string`   | (opcional) Classe de tamanho. Padrão: `w-5 h-5`                            |

---

## 🧬 Animações

Utiliza a biblioteca `framer-motion` com os seguintes efeitos:

- `initial`: animação de entrada com `scale: 0.5`, `opacity: 0`, `y: -10`
- `animate`: exibe com `scale: 1`, `opacity: 1`, `y: 0`, com atraso de 0.5s
- `exit`: mesma animação reversa de saída
- `layout`: habilitado para suavizar transições de tamanho

---

## 🎨 Estilo

A classe base do badge:

```tsx
className={\`
  \${color}
  absolute
  \${marginPosition}
  \${size}
  pt-[1px]
  flex items-center justify-center
  rounded-full text-white
  font-semibold text-xs
\`}
```

---

## ⚖️ Regras de Uso

- Não será renderizado se `count === 0`
- Deve ser posicionado em elementos `relative` para funcionar corretamente
- `color` deve sempre ser uma classe válida do Tailwind ou equivalente
- Usar `AnimatePresence` evita problemas em re-renderizações

---

## 💻 Exemplo de Uso

```tsx
<div className="relative">
  <IconeNotificacao />
  <BadgeCounter count={5} color="bg-red-500" />
</div>
```

---

## 🔗 Conexões

- Utiliza `framer-motion` para animações
- Pode ser usado com ícones, botões, abas, menus e outros elementos interativos

---

## 🧠 Por que usar este componente?

- 🔔 Melhora a experiência de notificações
- 💨 Apresenta feedback visual com animações suaves
- ♻️ Evita repetição de lógica para renderização condicional de contadores
