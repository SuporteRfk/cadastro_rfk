# Documentação do `ModalContext`

## 📁 Localização

`/context/modal.context.tsx`

## 📊 Visão Geral

O `ModalContext` é responsável por **gerenciar a abertura e fechamento de modais** de confirmação ou aviso na aplicação.

Ele oferece:
- Abertura de modais com chaves dinâmicas
- Controle de múltiplos modais ao mesmo tempo
- Integração com o componente visual `ModalQuestion`
- Estado centralizado acessível em toda a aplicação

---

## 🔍 Tipagens

### `ModalConfig`
```ts
{
  message: string;
  isOpen?: boolean;
  onConfirm: () => Promise<void> | void;
}
```
- Define a estrutura de um modal individual.

### `IModal`
```ts
{
  [key: string]: ModalConfig;
}
```
- Representa um conjunto de modais ativos, indexados por chave (`modalKey`).

### `IModalContext`
```ts
{
  modals: IModal;
  openModal(modalKey: string, config: ModalConfig): void;
  closeModal(modalKey: string): void;
}
```
- Interface de contexto que define as funções e o estado exposto.

---

## ⚙️ Estados e Funções

### `modals`
- Tipo: `IModal`
- Estado que guarda todos os modais abertos ou fechados.

---

### `openModal(modalKey, modalConfig)`
1. Recebe uma chave única e a configuração do modal
2. Adiciona ou atualiza o modal no estado
3. Define `isOpen: true`

```ts
openModal("delete-confirm", {
  message: "Tem certeza que deseja excluir?",
  onConfirm: async () => { ... }
});
```

---

### `closeModal(modalKey)`
1. Define `isOpen: false` para a chave informada
2. Mantém os outros modais inalterados

---

## 🖼️ Renderização de Modais

Dentro do próprio `<ModalProvider>` são renderizados todos os modais ativos com base em `modals[key].isOpen`.

```tsx
{Object.entries(modals).map(([key, config]) =>
  config.isOpen ? (
    <ModalQuestion
      key={key}
      message={config.message}
      onConfirm={async () => {
        await config.onConfirm();
        closeModal(key);
      }}
      onClose={() => closeModal(key)}
    />
  ) : null
)}
```

---

## 💻 Exemplo de Uso

```tsx
import { useContext } from "react";
import { ModalContext } from "@/context/modal.context";

const { openModal } = useContext(ModalContext);

const handleDelete = () => {
  openModal("confirm-delete", {
    message: "Deseja realmente excluir este item?",
    onConfirm: async () => {
      await deleteItem();
    }
  });
};
```

---

## 🔗 Conexões

- **Componente**: `ModalQuestion` (interface visual dos modais)
- **Local de uso**: Aplicação inteira, onde ações críticas exigem confirmação
- **Chave única (`modalKey`)**: Permite múltiplos modais coexistirem sem conflito

---

## 📌 Observações

- O modal permanece no estado mesmo ao ser fechado, com `isOpen: false`
- A centralização permite consistência visual e controle total sobre o fluxo de confirmação
- Ideal para ações críticas como exclusão, aprovações, rejeições etc.

