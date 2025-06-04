# Documentação do `ModalQuestion`

## 📁 Localização
`/src/components/modal/modal-question.components.tsx`

## 📊 Visão Geral

O componente `ModalQuestion` exibe um modal de confirmação visual com estilo de alerta. É utilizado para perguntar ao usuário se ele deseja realmente executar determinada ação, como exclusão ou alteração sensível.

O modal possui destaque visual com ícone de alerta e mensagem centralizada, além de botões claros para confirmação ou cancelamento.

## 🔎 Detalhes Técnicos

### 🎯 Props Recebidas

| Prop         | Tipo         | Descrição                                                   |
|--------------|--------------|--------------------------------------------------------------|
| `message`    | `string`     | Mensagem principal exibida no corpo do modal.               |
| `onConfirm`  | `() => void` | Função chamada quando o usuário confirma a ação (clica em "Sim"). |
| `onClose`    | `() => void` | Função chamada ao clicar em "Não" ou fora do modal (click away).|

---

### 🧠 Lógica Interna

- Usa `useRef` + `useClickAway` da `react-use` para permitir que o modal seja fechado ao clicar fora da caixa.
- Ícone de alerta exibido via `lucide-react`.
- Botões com estilos distintos: “Sim” (outline), “Não” (secondary).
- Estrutura responsiva com largura máxima e centralização.

```tsx
useClickAway(ref, () => onClose());
```

---

## ⚖️ Regras de Uso

- Deve ser usado sempre que uma ação precisa ser confirmada pelo usuário.
- Ideal para exclusões, rejeições ou decisões sensíveis.
- O componente **não** controla sua própria visibilidade; isso deve ser feito externamente.

---

## 💻 Exemplo de Uso

```tsx
<ModalQuestion
  message="Tem certeza que deseja excluir esta solicitação?"
  onConfirm={handleConfirm}
  onClose={handleClose}
/>
```

---

## 📚 Integração com o contexto

- Este componente **não consome nenhum contexto diretamente**.
- Pode ser usado em qualquer ponto da aplicação, desde que esteja visível no DOM.

---

## 💡 Melhorias planejadas (futuras)

- Suporte a mensagens customizadas com HTML ou ReactNode
- Animações de entrada e saída para transições suaves
- Adição de prop `title` customizável (hoje é fixo como "Atenção")
