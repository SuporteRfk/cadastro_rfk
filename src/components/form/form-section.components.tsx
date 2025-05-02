

interface FormSectionProps {
    children: React.ReactNode;
    className?: string;
};

export const FormSection = ({children, className = ""}:FormSectionProps) => {
    return(
        <div className={`w-full flex flex-col ${className}`}>
            {children}
        </div>
    ); 
}


/**
 * Componente FormSection
 *
 * Um contêiner reutilizável para agrupar inputs relacionados dentro de um formulário.
 * Ajuda a manter o espaçamento e o layout consistentes, facilitando a organização visual.
 * Ideal para criar linhas, colunas ou blocos de campos com mais clareza e estrutura.
 */
