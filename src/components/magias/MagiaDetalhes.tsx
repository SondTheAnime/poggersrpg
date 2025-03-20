import { SpellData, SpellEntryContent } from "@/types/spell";
import { FaTimes, FaScroll, FaClock, FaRulerHorizontal, FaHandSparkles, FaHourglassHalf, FaSchool, FaUsers, FaTag, FaShieldAlt, FaBook } from "react-icons/fa";
import { ReactNode } from "react";

interface MagiaDetalhesProps {
  magia: SpellData;
  onClose: () => void;
}

export function MagiaDetalhes({ magia, onClose }: MagiaDetalhesProps) {
  // Extrair componentes da magia para facilitar o acesso
  const { v: verbal, s: somatico, m: material } = magia.components;
  
  // Formatar o tempo de conjuração
  const formatarTempo = (tempo: typeof magia.time[0]) => {
    return `${tempo.number} ${tempo.unit}`;
  };
  
  // Formatar o alcance
  const formatarAlcance = (alcance: typeof magia.range) => {
    if (alcance.type === "self") return "Pessoal";
    if (alcance.type === "touch") return "Toque";
    if (alcance.type === "point" && alcance.distance) {
      return `${alcance.distance.amount} ${alcance.distance.type}`;
    }
    return "Especial";
  };
  
  // Formatar a duração
  const formatarDuracao = (duracao: typeof magia.duration[0]) => {
    if (duracao.type === "instantânea") return "Instantânea";
    if (duracao.type === "permanente") return "Permanente";
    if (duracao.type === "concentração") {
      return `Concentração, até ${duracao.duration?.amount} ${duracao.duration?.type}`;
    }
    if (duracao.duration) {
      return `${duracao.duration.amount} ${duracao.duration.type}`;
    }
    return duracao.type;
  };
  
  // Obter classes que podem usar a magia
  const classes = magia.classesWhoCanUse?.map(classe => classe.name) || [];
  
  // Verificar se a magia causa dano
  const causaDano = magia.damageInflict && magia.damageInflict.length > 0;
  
  // Verificar se tem magias de nível superior
  const temMagiaNivelSuperior = magia.entriesHigherLevel && magia.entriesHigherLevel.length > 0;
  
  // Função para renderizar uma entrada de forma segura
  const renderEntryContent = (entry: SpellEntryContent): string => {
    if (typeof entry === 'string') {
      return entry;
    }
    
    // Se for um objeto, tenta obter um texto representativo
    if (entry && typeof entry === 'object') {
      if (entry.entries && Array.isArray(entry.entries)) {
        // Se tem entries, usa o primeiro como texto
        return renderEntryContent(entry.entries[0]);
      }
      if (entry.name) {
        return entry.name;
      }
      if (entry.text) {
        return entry.text;
      }
      
      // Fallback para casos não previstos
      return "Detalhes adicionais disponíveis";
    }
    
    return String(entry || "");
  };
  
  // Função para renderizar uma entrada recursivamente
  const renderEntry = (entry: SpellEntryContent, indexKey: string | number): ReactNode => {
    if (typeof entry === 'string') {
      return <p key={indexKey} className="text-purple-100 mb-4">{entry}</p>;
    }
    
    if (entry && typeof entry === 'object') {
      // Se for objeto com type e name (subtítulos, items, etc)
      if (entry.type === 'list' && Array.isArray(entry.items)) {
        return (
          <ul key={indexKey} className="list-disc pl-5 mb-4">
            {entry.items.map((item: SpellEntryContent, itemIndex: number) => (
              <li key={`${indexKey}-${itemIndex}`} className="text-purple-100 mb-2">
                {renderEntryContent(item)}
              </li>
            ))}
          </ul>
        );
      }
      
      if (entry.type === 'table' && entry.caption) {
        return (
          <div key={indexKey} className="mb-4">
            <p className="font-medium text-amber-200 mb-2">{entry.caption}</p>
            {/* Renderização simples de tabela - pode ser expandida se necessário */}
            <div className="bg-purple-900/40 p-3 rounded border border-purple-500/30">
              <p className="text-purple-100">Tabela de referência disponível</p>
            </div>
          </div>
        );
      }
      
      if (entry.type && entry.name) {
        return (
          <div key={indexKey} className="mb-4">
            <h4 className="font-medium text-amber-200 mb-1">{entry.name}</h4>
            {entry.entries && Array.isArray(entry.entries) && (
              <div>
                {entry.entries.map((subEntry: SpellEntryContent, subIndex: number) => (
                  renderEntry(subEntry, `${indexKey}-${subIndex}`)
                ))}
              </div>
            )}
          </div>
        );
      }
      
      // Objeto com entries em geral
      if (entry.entries && Array.isArray(entry.entries)) {
        return (
          <div key={indexKey} className="mb-4">
            {entry.entries.map((subEntry: SpellEntryContent, subIndex: number) => (
              renderEntry(subEntry, `${indexKey}-${subIndex}`)
            ))}
          </div>
        );
      }
    }
    
    // Fallback para qualquer outro formato
    return <p key={indexKey} className="text-purple-100 mb-4">{renderEntryContent(entry)}</p>;
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-sm p-4">
      <div className="relative bg-gradient-to-b from-purple-900/90 to-[#0f0a1e]/90 rounded-xl shadow-[0_0_25px_rgba(147,51,234,0.3)] border border-purple-500/30 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Botão de fechar */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-purple-300 hover:text-white bg-purple-900/60 hover:bg-purple-700/60 p-2 rounded-full transition-colors"
        >
          <FaTimes size={18} />
        </button>
        
        {/* Cabeçalho */}
        <div className="p-6 pb-2 border-b border-purple-500/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
            <h2 className="text-2xl md:text-3xl font-bold text-amber-300">{magia.name}</h2>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-purple-700/50 border border-purple-500/40 text-purple-200 text-sm">
                {magia.level === 0 ? 'Truque' : `${magia.level}º nível`}
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-900/30 border border-amber-500/30 text-amber-300 text-sm">
                {magia.school}
              </span>
            </div>
          </div>
          
          {/* Fonte */}
          <p className="text-sm text-purple-300/70">
            <FaBook className="inline-block mr-1" />
            Fonte: {magia.source} {magia.page ? `(p. ${magia.page})` : ''}
          </p>
        </div>
        
        {/* Informações básicas */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-purple-500/20">
          {/* Primeira coluna */}
          <div className="space-y-4">
            {/* Tempo de conjuração */}
            <div className="flex items-start gap-2">
              <div className="mt-1 p-1.5 bg-purple-800/40 rounded-full text-amber-300">
                <FaClock size={16} />
              </div>
              <div>
                <h3 className="text-amber-200 font-medium">Tempo de Conjuração</h3>
                <p className="text-purple-200">{magia.time.map(formatarTempo).join(', ')}</p>
              </div>
            </div>
            
            {/* Alcance */}
            <div className="flex items-start gap-2">
              <div className="mt-1 p-1.5 bg-purple-800/40 rounded-full text-amber-300">
                <FaRulerHorizontal size={16} />
              </div>
              <div>
                <h3 className="text-amber-200 font-medium">Alcance</h3>
                <p className="text-purple-200">{formatarAlcance(magia.range)}</p>
              </div>
            </div>
            
            {/* Componentes */}
            <div className="flex items-start gap-2">
              <div className="mt-1 p-1.5 bg-purple-800/40 rounded-full text-amber-300">
                <FaHandSparkles size={16} />
              </div>
              <div>
                <h3 className="text-amber-200 font-medium">Componentes</h3>
                <div className="flex flex-wrap gap-1 mt-1">
                  {verbal && <span className="px-2 py-0.5 text-xs rounded-full bg-amber-900/30 border border-amber-500/30 text-amber-300">Verbal (V)</span>}
                  {somatico && <span className="px-2 py-0.5 text-xs rounded-full bg-amber-900/30 border border-amber-500/30 text-amber-300">Somático (S)</span>}
                  {material && (
                    <>
                      <span className="px-2 py-0.5 text-xs rounded-full bg-amber-900/30 border border-amber-500/30 text-amber-300">Material (M)</span>
                      {typeof material === 'string' && (
                        <div className="w-full mt-2 bg-purple-900/40 px-3 py-2 rounded border border-purple-500/30 text-purple-100 text-sm">
                          {material}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Segunda coluna */}
          <div className="space-y-4">
            {/* Duração */}
            <div className="flex items-start gap-2">
              <div className="mt-1 p-1.5 bg-purple-800/40 rounded-full text-amber-300">
                <FaHourglassHalf size={16} />
              </div>
              <div>
                <h3 className="text-amber-200 font-medium">Duração</h3>
                <p className="text-purple-200">{magia.duration.map(formatarDuracao).join(', ')}</p>
              </div>
            </div>
            
            {/* Escola */}
            <div className="flex items-start gap-2">
              <div className="mt-1 p-1.5 bg-purple-800/40 rounded-full text-amber-300">
                <FaSchool size={16} />
              </div>
              <div>
                <h3 className="text-amber-200 font-medium">Escola</h3>
                <p className="text-purple-200">{magia.school}</p>
              </div>
            </div>
            
            {/* Classes */}
            {classes.length > 0 && (
              <div className="flex items-start gap-2">
                <div className="mt-1 p-1.5 bg-purple-800/40 rounded-full text-amber-300">
                  <FaUsers size={16} />
                </div>
                <div>
                  <h3 className="text-amber-200 font-medium">Classes</h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {classes.map(classe => (
                      <span key={classe} className="px-2 py-0.5 text-xs rounded-full bg-purple-800/40 border border-purple-500/20 text-amber-300/80">
                        {classe}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Descrição da magia */}
        <div className="p-6 border-b border-purple-500/20">
          <div className="flex items-center gap-2 mb-4">
            <FaScroll className="text-amber-300" size={18} />
            <h3 className="text-xl text-amber-200 font-medium">Descrição</h3>
          </div>
          
          <div className="prose prose-invert prose-amber max-w-none">
            {magia.entries && magia.entries.map((entry, index) => (
              renderEntry(entry, index)
            ))}
          </div>
        </div>
        
        {/* Níveis superiores */}
        {temMagiaNivelSuperior && (
          <div className="p-6 border-b border-purple-500/20">
            <div className="flex items-center gap-2 mb-4">
              <FaTag className="text-amber-300" size={18} />
              <h3 className="text-xl text-amber-200 font-medium">Em Níveis Superiores</h3>
            </div>
            
            <div className="prose prose-invert prose-amber max-w-none">
              {magia.entriesHigherLevel?.map((entry, index) => (
                renderEntry(entry, index)
              ))}
            </div>
          </div>
        )}
        
        {/* Informações de dano e resistências */}
        {causaDano && (
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <FaShieldAlt className="text-amber-300" size={18} />
              <h3 className="text-xl text-amber-200 font-medium">Dano e Resistências</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Dano */}
              {magia.damageInflict && magia.damageInflict.length > 0 && (
                <div>
                  <h4 className="text-amber-200 font-medium mb-2">Tipo de Dano</h4>
                  <div className="flex flex-wrap gap-1">
                    {magia.damageInflict.map(dano => (
                      <span key={dano} className="px-2 py-0.5 text-xs rounded-full bg-red-900/30 border border-red-500/30 text-red-200">
                        {dano}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Jogada de resistência */}
              {magia.savingThrow && magia.savingThrow.length > 0 && (
                <div>
                  <h4 className="text-amber-200 font-medium mb-2">Teste de Resistência</h4>
                  <div className="flex flex-wrap gap-1">
                    {magia.savingThrow.map(save => (
                      <span key={save} className="px-2 py-0.5 text-xs rounded-full bg-amber-900/30 border border-amber-500/30 text-amber-300">
                        {save}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 