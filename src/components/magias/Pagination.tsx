import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import * as Select from "@radix-ui/react-select";
import { useState, useEffect } from "react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

/**
 * Componente de paginação para a lista de magias
 * Permite navegar entre páginas e ajustar a quantidade de itens por página
 */
export function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) {
  const [totalPages, setTotalPages] = useState(1);

  // Calcular o número total de páginas quando o número de itens ou itens por página muda
  useEffect(() => {
    setTotalPages(Math.max(1, Math.ceil(totalItems / itemsPerPage)));
  }, [totalItems, itemsPerPage]);

  // Garantir que a página atual seja válida
  useEffect(() => {
    if (currentPage > totalPages) {
      onPageChange(totalPages);
    }
  }, [currentPage, totalPages, onPageChange]);

  // Tratadores de eventos para a navegação
  const goToFirstPage = () => onPageChange(1);
  const goToPreviousPage = () => onPageChange(Math.max(1, currentPage - 1));
  const goToNextPage = () => onPageChange(Math.min(totalPages, currentPage + 1));
  const goToLastPage = () => onPageChange(totalPages);

  // Gerar array de páginas para exibir
  const getPageNumbers = () => {
    // Exibir até 5 números de página
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // Se o número total de páginas for pequeno, exibir todas
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Caso contrário, exibir páginas ao redor da página atual
      const leftBound = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
      const rightBound = Math.min(totalPages, leftBound + maxPagesToShow - 1);
      
      // Reajustar o limite esquerdo se precisamos mover a janela para a esquerda
      const adjustedLeftBound = Math.max(1, rightBound - maxPagesToShow + 1);
      
      for (let i = adjustedLeftBound; i <= rightBound; i++) {
        pageNumbers.push(i);
      }
    }
    
    return pageNumbers;
  };

  // Verificar se existem itens para paginar
  if (totalItems === 0) {
    return null;
  }

  return (
    <div className="flex flex-col items-center space-y-4 md:flex-row md:justify-between md:space-y-0 w-full mt-8">
      {/* Informações e seletor de itens por página */}
      <div className="flex items-center gap-2 text-sm text-purple-200">
        <span>Mostrando</span>
        <Select.Root
          value={String(itemsPerPage)}
          onValueChange={(value) => onItemsPerPageChange(Number(value))}
        >
          <Select.Trigger
            className="inline-flex items-center justify-between rounded px-2 py-1 text-sm bg-purple-800/50 
                      border border-purple-500/30 hover:bg-purple-700/40 data-[placeholder]:text-purple-400 outline-none w-[70px]"
            aria-label="Itens por página"
          >
            <Select.Value />
            <Select.Icon>
              <ChevronRight className="h-4 w-4 text-purple-300 rotate-90" />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content
              className="overflow-hidden bg-purple-900/90 backdrop-blur-lg border border-purple-500/40
                        rounded-md shadow-md animate-fadeIn z-50"
            >
              <Select.ScrollUpButton className="flex items-center justify-center h-8 text-purple-300">
                <ChevronRight className="h-4 w-4 rotate-[-90deg]" />
              </Select.ScrollUpButton>
              <Select.Viewport className="p-1">
                {[9, 12, 18, 24, 36, 48].map((value) => (
                  <Select.Item
                    key={value}
                    value={String(value)}
                    className="relative flex items-center h-8 px-6 rounded text-sm text-purple-200
                              data-[highlighted]:bg-purple-700 data-[highlighted]:text-purple-100
                              outline-none select-none cursor-pointer"
                  >
                    <Select.ItemText>{value}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
              <Select.ScrollDownButton className="flex items-center justify-center h-8 text-purple-300">
                <ChevronRight className="h-4 w-4 rotate-90" />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
        <span>de {totalItems} magias</span>
      </div>

      {/* Navegação entre páginas */}
      <div className="flex items-center gap-1">
        {/* Botão de primeira página */}
        <button
          onClick={goToFirstPage}
          disabled={currentPage <= 1}
          className="p-2 rounded-md bg-purple-800/40 border border-purple-500/30 
                    hover:bg-purple-700/50 transition-colors disabled:opacity-50 
                    disabled:cursor-not-allowed"
          aria-label="Primeira página"
        >
          <ChevronsLeft className="h-4 w-4 text-purple-200" />
        </button>

        {/* Botão de página anterior */}
        <button
          onClick={goToPreviousPage}
          disabled={currentPage <= 1}
          className="p-2 rounded-md bg-purple-800/40 border border-purple-500/30 
                    hover:bg-purple-700/50 transition-colors disabled:opacity-50 
                    disabled:cursor-not-allowed"
          aria-label="Página anterior"
        >
          <ChevronLeft className="h-4 w-4 text-purple-200" />
        </button>

        {/* Botões de números de página */}
        <div className="flex gap-1">
          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`
                px-3 py-1 rounded-md border transition-colors
                ${
                  currentPage === page
                    ? "bg-amber-500/40 border-amber-500/60 text-amber-200"
                    : "bg-purple-800/40 border-purple-500/30 hover:bg-purple-700/50 text-purple-200"
                }
              `}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Botão de próxima página */}
        <button
          onClick={goToNextPage}
          disabled={currentPage >= totalPages}
          className="p-2 rounded-md bg-purple-800/40 border border-purple-500/30 
                    hover:bg-purple-700/50 transition-colors disabled:opacity-50 
                    disabled:cursor-not-allowed"
          aria-label="Próxima página"
        >
          <ChevronRight className="h-4 w-4 text-purple-200" />
        </button>

        {/* Botão de última página */}
        <button
          onClick={goToLastPage}
          disabled={currentPage >= totalPages}
          className="p-2 rounded-md bg-purple-800/40 border border-purple-500/30 
                    hover:bg-purple-700/50 transition-colors disabled:opacity-50 
                    disabled:cursor-not-allowed"
          aria-label="Última página"
        >
          <ChevronsRight className="h-4 w-4 text-purple-200" />
        </button>
      </div>
    </div>
  );
} 