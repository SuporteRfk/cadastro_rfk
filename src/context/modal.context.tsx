import { createContext, ReactNode, useState } from "react";
import { ModalQuestion } from "@/components";



export type ModalConfig = {
    message: string;
    isOpen?: boolean;
    onConfirm: () => Promise<void> | void;
};

export interface IModal {
    [key: string]: ModalConfig;
}

export interface IModalContext {
    modals: IModal;
    openModal: (modalKey: string, modalConfig: ModalConfig) => void;
    closeModal: (modalKey: string) => void;
}


export const ModalContext = createContext<IModalContext>({
    modals: {},
    closeModal: () => {},
    openModal: (_modalKey, _modalConfig) => {}
});

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [modals, setModals] = useState<IModal>({});

    /**
     * Abre um modal com uma chave específica e sua configuração.
     * Se o modal já existir, ele será atualizado, pois o spread (`...prev`)
     * mantém os modais existentes e sobrescreve apenas o modal correspondente.
     */
    const openModal = (modalKey: string, modalConfig: ModalConfig) => {
        setModals((prev) => ({
            ...prev, // Mantém os modais existentes / Keeps existing modals
            [modalKey]: {...modalConfig, isOpen: true }, // Adiciona ou atualiza o modal / Adds or updates the modal
        }));
    };

    /**
     * Fecha um modal específico, mantendo os outros modais inalterados.
     * O spread (`...prev[modalKey]`) mantém a configuração existente do modal,
     * mas altera `isOpen` para `false`.
     */
    const closeModal = (modalKey: string) => {
        setModals((prev) => ({
            ...prev, // Mantém os outros modais
            [modalKey]: { ...prev[modalKey], isOpen: false }, // Fecha o modal específico 
        }));
    };

    return (
        <ModalContext.Provider value={{ modals, openModal, closeModal }}>
            {children}
            
            {/* Renderiza os modais ativos */}
            {Object.entries(modals).map(([key, config]) =>
                config.isOpen ? (
                    <ModalQuestion
                        key={key} // Chave única do modal
                        message={config.message} // Mensagem do modal 
                        onConfirm={async () => {
                            // Aguarda a execução de `onConfirm` antes de fechar o modal
                            await config.onConfirm();
                            closeModal(key);
                        }}
                        onClose={() => closeModal(key)} // Fecha o modal quando cancelado
                    />
                ) : null
            )}
        </ModalContext.Provider>
    );
};
