import { SpellData } from "@/types/spell";

/**
 * Componente que exibe as informações de uma magia em formato de card
 */
export function MagiaCard({ magia }: { magia: SpellData }) {
  // Obter classes únicas para exibição (pode haver duplicatas de classes com fontes diferentes)
  const classesUnicas = Array.from(new Set(
    magia.classesWhoCanUse?.map(classe => classe.name) || []
  )).slice(0, 3); // Limitar a 3 classes para não sobrecarregar visualmente
  
  const temMaisClasses = (magia.classesWhoCanUse?.length || 0) > 3;

  return (
    <div className="p-6 rounded-lg bg-purple-900/20 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/40 transform transition-all duration-300 hover:shadow-[0_0_15px_rgba(147,51,234,0.2)] group">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-medium text-amber-300 group-hover:text-amber-200 transition-colors">
          {magia.name}
        </h3>
        <span className="px-2 py-1 text-xs rounded-full bg-purple-700/30 border border-purple-500/40 text-purple-200">
          {magia.level === 0 ? 'Truque' : `Nível ${magia.level}`}
        </span>
      </div>
      
      <p className="text-sm text-amber-100/60 mb-3">
        <span className="font-semibold">{magia.school}</span> • {magia.time[0].number} {magia.time[0].unit}
      </p>
      
      {/* Classes que podem usar a magia */}
      {classesUnicas.length > 0 && (
        <div className="mb-3">
          <p className="text-xs text-purple-300/70 mb-1">Classes:</p>
          <div className="flex flex-wrap gap-1">
            {classesUnicas.map(classe => (
              <span key={classe} className="px-2 py-0.5 text-xs rounded-full bg-purple-800/40 border border-purple-500/20 text-amber-300/80">
                {classe}
              </span>
            ))}
            {temMaisClasses && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-purple-800/40 border border-purple-500/20 text-amber-300/80">
                +{(magia.classesWhoCanUse?.length || 0) - 3} mais
              </span>
            )}
          </div>
        </div>
      )}
      
      <div className="mb-3 border-t border-purple-500/20 pt-3">
        <div className="flex gap-2 mb-2">
          {magia.components.v && <span className="px-2 py-1 text-xs rounded-full bg-amber-900/30 border border-amber-500/30 text-amber-300">V</span>}
          {magia.components.s && <span className="px-2 py-1 text-xs rounded-full bg-amber-900/30 border border-amber-500/30 text-amber-300">S</span>}
          {magia.components.m && <span className="px-2 py-1 text-xs rounded-full bg-amber-900/30 border border-amber-500/30 text-amber-300">M</span>}
        </div>
        <p className="text-sm text-amber-100/70 line-clamp-2">
          {magia.entries[0]}
        </p>
      </div>
      
      <button className="w-full mt-2 px-4 py-2 bg-purple-800/40 hover:bg-purple-700/40 border border-purple-600/30 rounded-md text-sm text-amber-200 transition-colors">
        Ver detalhes
      </button>
    </div>
  );
} 