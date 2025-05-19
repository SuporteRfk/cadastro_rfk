import { RequestContext } from "@/context";
import { useContext } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui";
import {
  ChevronRight as NextIcon,
  ChevronLeft as PreviuosIcon,
  ChevronFirst as FirstIcon,
  ChevronLast as LastIcon
} from "lucide-react";

// funções para informar ao componente pai que a página mudou ou o tamanho da página mudou
interface IRequestTablePaginationProps {
    onChangePage: (page: number) => void; // mudança de pagina
    onChangePageSize: (size: number) => void; // mudança do tamanho de linhas da pagina
  }


export const RequestTablePagination = ({ onChangePage, onChangePageSize}:IRequestTablePaginationProps) => {
    const {totalRequest, filter} = useContext(RequestContext);
    
    const pageSize = filter?.indexLimit || 10; // Define quantas linhas por página o usuário quer ver (padrão 10)
    const pageIndex = Math.floor((filter?.offset || 0) / pageSize); // Calcula o índice da página atual baseado no offset e pageSize
    const totalPages = Math.ceil(totalRequest / pageSize) // // Calcula o total de páginas que existem

    const canPrevious = pageIndex > 0; // Habilita ou desabilita botões de navegar para trás
    const canNext = pageIndex + 1 < totalPages; // Habilita ou desabilita botões de navegar para frente

    return (
        <div className="flex items-center justify-between gap-4 px-4 py-2 border-t border-accent/20 bg-accent/5 text-sm rounded-b-md">
          {/* Seleciona quantidade de linhas por página */}
          <div className="flex items-center gap-2">
            <span>Linhas por página:</span>
            <Select value={String(pageSize)} onValueChange={(value) => onChangePageSize(Number(value))}>
              <SelectTrigger className="h-7 rounded-sm bg-accent/60 w-14 p-2 border border-accent text-white/95">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[5, 10, 20, 50].map((size) => (
                  <SelectItem key={size} value={String(size)}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
    
          {/* Botões de paginação */}
          <div className="flex items-center gap-2">
            {/* ir para primeira pagina */}
            <button 
              onClick={() => onChangePage(0)} 
              disabled={!canPrevious}
              className={`
                  border h-7 px-2 rounded-sm flex justify-center items-center
                  ${!canPrevious? 'bg-neutral/80 border-transparent cursor-not-allowed' : 'bg-accent/60 border-accent cursor-pointer'}  
              `}
            >
              <FirstIcon size={18} />
            </button>
            
            {/* Próxima página */}
            <button 
              onClick={() => onChangePage(pageIndex - 1)} 
              disabled={!canPrevious}
              className={`
                  border h-7 px-2 rounded-sm flex justify-center items-center
                  ${!canPrevious ? 'bg-neutral/80 border-transparent cursor-not-allowed' : 'bg-accent/60 border-accent cursor-pointer' }
              `}
            >
              <PreviuosIcon size={18} />
            </button>
    
            <span>
              Página {pageIndex + 1} de {totalPages}
            </span>
                
            {/* Voltar uma página */}
            <button 
              onClick={() => onChangePage(pageIndex + 1)} 
              disabled={!canNext}
              className={`
                  border h-7 px-2 rounded-sm flex justify-center items-center
                  ${!canNext ? 'bg-neutral/80 border-transparent cursor-not-allowed' : 'bg-accent/60 border-accent cursor-pointer' }
              `}
            >
              <NextIcon size={18} />
            </button>
            
            {/* Ir para última página */}
            <button 
              onClick={() => onChangePage(totalPages - 1)} 
              disabled={!canNext}
              className={`
                border h-7 px-2 rounded-sm flex justify-center items-center
                ${!canNext ? 'bg-neutral/80 border-transparent cursor-not-allowed' : 'bg-accent/60 border-accent cursor-pointer' }
              `}
            >
              <LastIcon size={18} />
            </button>
          </div>
        </div>
      );
};