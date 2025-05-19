# Documentação do `ModalContext`

# 📁 Localização
`src/context/modal.context.tsx`

## 📊 Visão Geral
O `ModalContext` gerencia o estado de exibição de modais de pergunta em toda a aplicação. Ele usa o **React Context** para fornecer um estado global que permite abrir e fechar modais de maneira dinâmica, baseado em uma chave única para cada modal.

---

## 🔎 Detalhamento Linha a Linha e Funcionamento

### Importações
```ts
import { createContext, ReactNode, useState } from "react";
import { Modal } from "../components/modal.components";
import { IModal, IModalContext, ModalConfig } from "../interfaces/modalContext.interface"
```
- `createContext`: Cria o contexto do React para fornecer o estado global dos modais.
- `useState`: Hook para gerenciar o estado local dos modais no ModalProvider.
- `Modal`: O componente modal que será renderizado quando um modal estiver ativo.
- Tipagens `IModal`, `IModalContext` e `ModalConfig`: Interfaces definidas para estruturar a configuração e o estado dos modais.

### Criação do Contexto
```tsx
export const ModalContext = createContext<IModalContext>({
    modals: {},
    closeModal: () => {
        throw new Error("closeModal was called outside of ModalProvider");
    },
    openModal: (_modalKey, _modalConfig) => {
        throw new Error("openModal was called outside of ModalProvider");
    }
});
```
- `ModalContext`: Cria o contexto para os modais, com funções `openModal` e `closeModal`.
- `modals`: Objeto que armazena o estado de cada modal. A chave é a chave do modal, e o valor é a configuração do modal.

### Provedor de Contexto
```tsx
export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [modals, setModals] = useState<IModal>({});
}
```
- `ModalProvider`: O provedor que envolve a aplicação e disponibiliza o contexto dos modais.
- `modals`: Estado local que mantém todos os modais ativos, usando `useState` para atualizar a lista de modais dinamicamente.

## Função `openModal`
```tsx
const openModal = (modalKey: string, modalConfig: ModalConfig) => {
    setModals((prev) => ({
        ...prev, // Mantém os modais existentes
        [modalKey]: {...modalConfig, isOpen: true }, // Abre ou atualiza o modal
    }));
};
```

- `openModal`: Função que permite abrir ou atualizar um modal com uma chave específica.
    - Se o modal já existir, ele será atualizado (usando o spread para manter os modais anteriores e sobrescrever o valor correspondente).
    - `modalKey` é a chave única do modal, e `modalConfig` é a configuração do modal (mensagem, função de confirmação, etc.).

## Função `closeModal`

```tsx
const closeModal = (modalKey: string) => {
    setModals((prev) => ({
        ...prev, // Mantém os outros modais
        [modalKey]: { ...prev[modalKey], isOpen: false }, // Fecha o modal específico
    }));
};
```
- `closeModal`: Função que fecha um modal específico, atualizando o estado de `isOpen` para `false` no modal correspondente.
- O modal continua no estado, mas é marcado como fechado (`isOpen: false`).

## Renderização dos Modais Ativos

```tsx
{Object.entries(modals).map(([key, config]) => 
    config.isOpen ? (
        <Modal
            key={key}
            message={config.message}
            onConfirm={async () => {
                await config.onConfirm();
                closeModal(key);
            }}
            onClose={() => closeModal(key)}
        />
    ): (
        null
    )
)}
```

- **Renderização dinâmica**: Para cada modal ativo (com `isOpen: true`), o componente `Modal` é renderizado.
    - `onConfirm`: Quando o modal é confirmado, a função `onConfirm` é chamada uma função assincrona. Após a execução da função, o modal é fechado.
    - `onClose`: Quando o modal é cancelado, a função `closeModal` é chamada para fechá-lo.


## ⚖️ Regras de Uso

- Uso exclusivo dentro de `ModalProvider`: As funções `openModal` e `closeModal` só podem ser usadas dentro de um componente que esteja dentro do `ModalProvider`.
- **Chave única para cada modal**: Use uma chave única para identificar cada modal.
- **Atualização dinâmica**: Sempre que `openModal` for chamado com a mesma chave, o modal será atualizado com a nova configuração. O estado `isOpen` controla a visibilidade do modal.