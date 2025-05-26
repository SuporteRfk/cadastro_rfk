import { createContext, ReactNode, useContext, useState } from "react";


type ReviewMap = {[field: string]:string};

interface IReviewContextType {
    reviewFields: ReviewMap;
    setFieldReview: (field: string, value: string | null) => void;
    resetReview: () => void;
    isFieldInReview: (field: string) => boolean;
    hasEmptyReasons: () => boolean;
    showError: boolean;
    setShowError:  (value: boolean) => void;
};

interface IReviewProviderProps {
    children: ReactNode;
    initialValue?: ReviewMap;
}

const ReviewContext = createContext<IReviewContextType| null>(null);

export const ReviewProvider = ({children, initialValue = {}}: IReviewProviderProps) =>{
    const [reviewFields, setReviewFields] = useState<ReviewMap>(initialValue);
    const [showError, setShowError] = useState<boolean>(false)

    const setFieldReview = (field: string, value: string | null) => {
        setReviewFields((prev) => {
            const updated = { ...prev }; // Cria uma cópia do estado anterior
            if (value === null) {
                delete updated[field]; // Se valor for nulo, remove o campo
            } else {
                updated[field] = value; // Caso contrário, atualiza ou adiciona o campo com o motivo
            }
            return updated; // Retorna o novo estado
        });
        
    };
    

    const isFieldInReview = (field: string) => field in reviewFields;

   
    const resetReview = () => setReviewFields({});

    const hasEmptyReasons = () => {
        return Object.values(reviewFields).some(reason => reason.trim() === "");
    };


    return (
        <ReviewContext.Provider value={{
            reviewFields,
            setFieldReview,
            isFieldInReview,
            resetReview,
            hasEmptyReasons,
            showError,
            setShowError
        }}>
            {children}
        </ReviewContext.Provider>
    );
};

export const useReview = () => {
  const context = useContext(ReviewContext);
  if (!context) throw new Error("useReview deve ser usado dentro de um ReviewProvider");
  return context;
};