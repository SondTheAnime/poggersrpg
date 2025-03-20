import { SpellData } from "@/types/spell";
import { MagiaCard } from "./MagiaCard";
import { NoSpellsFound } from "./NoSpellsFound";
import { Pagination } from "./Pagination";
import { useMemo, useState } from "react";

interface MagiasListProps {
  magias: SpellData[];
}

/**
 * Componente que exibe a lista de magias com paginação
 */
export function MagiasList({ magias }: MagiasListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Calcular as magias a serem exibidas na página atual
  const paginatedMagias = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return magias.slice(startIndex, startIndex + itemsPerPage);
  }, [magias, currentPage, itemsPerPage]);

  // Redefinir para a primeira página quando os filtros mudam
  useMemo(() => {
    setCurrentPage(1);
  }, [magias.length]);

  // Exibir mensagem quando não há magias
  if (magias.length === 0) {
    return <NoSpellsFound />;
  }

  return (
    <div className="space-y-8">
      {/* Lista de magias */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedMagias.map((magia, index) => (
          <MagiaCard key={`${magia.name}-${index}`} magia={magia} />
        ))}
      </div>

      {/* Componente de paginação */}
      <Pagination
        totalItems={magias.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
      />
    </div>
  );
} 