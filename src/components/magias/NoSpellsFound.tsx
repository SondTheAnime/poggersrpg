/**
 * Componente exibido quando nenhuma magia é encontrada com os filtros atuais
 */
export function NoSpellsFound() {
  return (
    <div className="col-span-full text-center py-12">
      <div className="w-16 h-16 mx-auto mb-4 text-amber-400/60">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 16v.01"/>
          <path d="M12 8v4"/>
        </svg>
      </div>
      <h3 className="text-xl font-medium mb-2 text-amber-300">Nenhuma magia encontrada</h3>
      <p className="text-amber-100/60">Tente ajustar seus filtros para encontrar o que procura.</p>
    </div>
  );
} 