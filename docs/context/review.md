# Documentação do `ReviewContext`

## 📁 Localização

`/context/review.context.tsx`

## 📊 Visão Geral

O `ReviewContext` centraliza o controle dos **campos que estão em revisão** durante um processo de revisão da solicitação. Ele registra quais campos foram marcados, os motivos de reprovação, e valida se todos os campos marcados possuem justificativa adequada.

Ele fornece:
- Controle dos campos revisados (`reviewFields`)
- Atribuição de motivo de reprovação por campo
- Validação de campos obrigatórios
- Reset do estado de revisão
- Flag para controle de erro visual (`showError`)

---

## 🔍 Tipagens

### `ReviewMap`
```ts
{
  [field: string]: string;
}
```
- Representa os campos marcados para revisão e seus respectivos motivos.

### `IReviewContextType`
```ts
{
  reviewFields: ReviewMap;
  setFieldReview(field: string, value: string | null): void;
  resetReview(): void;
  isFieldInReview(field: string): boolean;
  hasEmptyReasons(): boolean;
  showError: boolean;
  setShowError(value: boolean): void;
}
```

---

## ⚙️ Estados e Funções

### `reviewFields`
- Tipo: `ReviewMap`
- Estado principal que armazena os campos reprovados e seus motivos.
- Exemplo:
```ts
{
  "codigoProduto": "Código incorreto",
  "dimensao": "Medida fora do padrão"
}
```

---

### `setFieldReview(field, value)`
- Atualiza ou remove um campo do estado de revisão:
  - Se `value === null`: remove o campo da lista de revisão
  - Se valor for string: adiciona ou atualiza com o motivo

```ts
setFieldReview("descricaoProduto", "Descrição incompleta");
setFieldReview("dimensao", null); // Remove da revisão
```

---

### `isFieldInReview(field)`
- Retorna `true` se o campo está presente em `reviewFields`.

---

### `resetReview()`
- Limpa todos os campos e motivos registrados.

---

### `hasEmptyReasons()`
- Retorna `true` se **algum campo** marcado está **sem motivo preenchido** (string vazia ou espaços).

```ts
const reviewFields = {
  "codigo": " ",
  "descricao": "ok"
}; // retorna true
```

---

### `showError` / `setShowError`
- Flag booleana que controla a exibição de mensagens de erro em formulários (ex: "Preencha todos os motivos").

---

## 🧠 Fluxo de Uso

1. O usuário marca campos que deseja negar ou revisar
2. Cada campo recebe um motivo textual (`setFieldReview`)
3. Antes de enviar a decisão de "negar", a aplicação valida `hasEmptyReasons()`
4. Se existir motivo vazio, `showError` é ativado para exibir avisos visuais
5. Ao finalizar a ação ou cancelar, `resetReview()` limpa tudo

---

## 💻 Exemplo de Uso

```tsx
import { useReview } from "@/context/review.context";

const { reviewFields, setFieldReview, resetReview, hasEmptyReasons, showError, setShowError } = useReview();

const handleNegar = () => {
  if (hasEmptyReasons()) {
    setShowError(true);
    return;
  }

  // prossegue com envio da negação
};
```

---

## 🔗 Conexões

- Utilizado principalmente em componentes de formulário (como `form-observation-denied-field`)
- Combinado com `RequestContext` para etapas de análise e decisão
- Integrado à lógica de aprovação/reprovação por controladoria

---

## 📌 Observações

- `ReviewProvider` aceita `initialValue` como prop opcional para pré-preencher revisão
- O hook `useReview()` encapsula o contexto com verificação de segurança
- Importante garantir que `ReviewProvider` esteja no escopo de qualquer tela de revisão para o hook funcionar corretamente

