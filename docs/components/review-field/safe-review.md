
# Documentação do `SafeReviewField`

## 📁 Localização
`/src/components/review-field/safe-review-field.tsx`

## 📊 Visão Geral

O componente `SafeReviewField` é um **wrapper de segurança** para o `ReviewField`. Ele garante que o campo seja renderizado corretamente mesmo fora do contexto do `ReviewProvider`.

Sua principal função é **evitar erros em renderizações** quando o campo estiver fora do escopo esperado, como em formulários reutilizados em páginas que não possuem revisão ativa.

---

## 🔎 Detalhes Técnicos

### 🎯 Props Recebidas

| Prop      | Tipo             | Descrição                                                      |
|-----------|------------------|-----------------------------------------------------------------|
| `children`| `ReactNode`      | Campo de formulário que será renderizado.                      |
| `field`   | `string`         | Chave identificadora do campo, passada ao `ReviewField`.       |
| `mode`    | `FormStateType`  | Modo atual do formulário: `viewing`, `editing`, `reviewing`.   |

---

### 🧠 Lógica Interna

- Executa `useReview()` dentro de um `try/catch`.
- Se **o hook falhar** (ou seja, está fora do `ReviewProvider`), apenas renderiza o campo bruto (`children`).
- Caso contrário, renderiza o `ReviewField` normalmente.

```tsx
try {
  useReview();
  return <ReviewField {...props} />;
} catch {
  return <>{props.children}</>;
}
```

---

## ⚖️ Regras de Uso

- Pode ser usado sempre que houver dúvida se o formulário estará dentro do contexto de revisão.
- Garante que campos não quebrem caso o `ReviewProvider` não esteja disponível.

---

## 💻 Exemplo de Uso

```tsx
<SafeReviewField mode={mode} field="nome">
  <Input name="nome" />
</SafeReviewField>
```

---

## 📚 Integração com o contexto

- Opcional. Se o `ReviewContext` estiver presente, usa.
- Se não estiver presente, ignora a lógica de revisão e renderiza normalmente.

---

## 💡 Melhorias planejadas (futuras)

- Permitir fallback visual customizado fora do contexto
- Exibir aviso para desenvolvedores no modo dev quando não estiver em provider