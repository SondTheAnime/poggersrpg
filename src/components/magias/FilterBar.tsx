import { useState, useEffect, ReactNode } from 'react';
import { FaSearch, FaFilter, FaTimes, FaChevronDown, FaChevronUp, FaCheck } from 'react-icons/fa';

/**
 * Componente de barra de filtros para a página de magias
 * Permite filtrar as magias por nome, nível e escola de forma intuitiva e elegante
 */
interface FilterBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedNiveis: number[];
  toggleNivelFilter: (nivel: number) => void;
  selectedEscolas: string[];
  toggleEscolaFilter: (escola: string) => void;
  escolasMagia: string[];
  selectedClasses: string[];
  toggleClasseFilter: (classe: string) => void;
  classesMagia: string[];
  selectedSources: string[];
  toggleSourceFilter: (source: string) => void;
  availableSources: {id: string; fileName: string}[];
  limparFiltros: () => void;
}

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filtrosAvancadosOpen: boolean;
  setFiltrosAvancadosOpen: (open: boolean) => void;
  totalFiltrosAplicados: number;
}

interface FiltrosAplicadosProps {
  selectedNiveis: number[];
  toggleNivelFilter: (nivel: number) => void;
  selectedEscolas: string[];
  toggleEscolaFilter: (escola: string) => void;
  selectedClasses: string[];
  toggleClasseFilter: (classe: string) => void;
  selectedSources: string[];
  toggleSourceFilter: (source: string) => void;
  limparFiltros: () => void;
}

interface FilterTagProps {
  label: string;
  onRemove: () => void;
}

interface FiltrosAvancadosProps {
  niveis: number[];
  selectedNiveis: number[];
  toggleNivelFilter: (nivel: number) => void;
  selectedEscolas: string[];
  toggleEscolaFilter: (escola: string) => void;
  escolasMagia: string[];
  selectedClasses: string[];
  toggleClasseFilter: (classe: string) => void;
  classesMagia: string[];
  selectedSources: string[];
  toggleSourceFilter: (source: string) => void;
  availableSources: {id: string; fileName: string}[];
  totalFiltrosAplicados: number;
  limparFiltros: () => void;
}

interface FilterSectionProps {
  title: string;
  children: ReactNode;
  layout?: "grid" | "list";
}

interface ToggleButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
  layout?: "grid" | "list";
}

export function FilterBar({
  searchTerm,
  setSearchTerm,
  selectedNiveis,
  toggleNivelFilter,
  selectedEscolas,
  toggleEscolaFilter,
  escolasMagia,
  selectedClasses,
  toggleClasseFilter,
  classesMagia,
  selectedSources,
  toggleSourceFilter,
  availableSources,
  limparFiltros,
}: FilterBarProps) {
  const [filtrosAvancadosOpen, setFiltrosAvancadosOpen] = useState(false);
  const [totalFiltrosAplicados, setTotalFiltrosAplicados] = useState(0);

  // Verificar quantos filtros estão aplicados
  useEffect(() => {
    const total = selectedNiveis.length + selectedEscolas.length + selectedClasses.length + 
      (selectedSources.length > 1 || (selectedSources.length === 1 && selectedSources[0] !== 'PHB') ? selectedSources.length : 0);
    setTotalFiltrosAplicados(total);
  }, [selectedNiveis, selectedEscolas, selectedClasses, selectedSources]);

  // Lista de níveis de magia (0-9)
  const niveis = Array.from({ length: 10 }, (_, i) => i);

  return (
    <div className="mb-8 w-full">
      {/* Container principal com efeito de vidro */}
      <div className="backdrop-blur-md bg-purple-900/30 border border-purple-500/20 rounded-xl shadow-lg p-4 mb-6 animate-fadeIn">
        {/* Seção de pesquisa sempre visível */}
        <SearchBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm}
          filtrosAvancadosOpen={filtrosAvancadosOpen}
          setFiltrosAvancadosOpen={setFiltrosAvancadosOpen}
          totalFiltrosAplicados={totalFiltrosAplicados}
        />

        {/* Tags de filtros ativos */}
        {totalFiltrosAplicados > 0 && (
          <FiltrosAplicados 
            selectedNiveis={selectedNiveis}
            toggleNivelFilter={toggleNivelFilter}
            selectedEscolas={selectedEscolas}
            toggleEscolaFilter={toggleEscolaFilter}
            selectedClasses={selectedClasses}
            toggleClasseFilter={toggleClasseFilter}
            selectedSources={selectedSources}
            toggleSourceFilter={toggleSourceFilter}
            limparFiltros={limparFiltros}
          />
        )}

        {/* Painel de filtros avançados */}
        {filtrosAvancadosOpen && (
          <FiltrosAvancados 
            niveis={niveis}
            selectedNiveis={selectedNiveis}
            toggleNivelFilter={toggleNivelFilter}
            selectedEscolas={selectedEscolas}
            toggleEscolaFilter={toggleEscolaFilter}
            escolasMagia={escolasMagia}
            selectedClasses={selectedClasses}
            toggleClasseFilter={toggleClasseFilter}
            classesMagia={classesMagia}
            selectedSources={selectedSources}
            toggleSourceFilter={toggleSourceFilter}
            availableSources={availableSources}
            totalFiltrosAplicados={totalFiltrosAplicados}
            limparFiltros={limparFiltros}
          />
        )}
      </div>
    </div>
  );
}

function SearchBar({ 
  searchTerm, 
  setSearchTerm, 
  filtrosAvancadosOpen, 
  setFiltrosAvancadosOpen, 
  totalFiltrosAplicados 
}: SearchBarProps) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-2 gap-4">
      <div className="relative w-full md:w-1/2">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="text-purple-300" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nome da magia..."
          className="pl-10 w-full py-2.5 bg-purple-800/40 text-white rounded-lg border border-purple-500/30 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-purple-300 hover:text-white transition duration-300"
          >
            <FaTimes />
          </button>
        )}
      </div>

      <button
        onClick={() => setFiltrosAvancadosOpen(!filtrosAvancadosOpen)}
        className="flex items-center gap-2 px-4 py-2.5 bg-purple-700/60 hover:bg-purple-600/60 text-white rounded-lg transition-all duration-300 border border-purple-500/30"
      >
        <FaFilter className="animate-pulse" />
        <span>Filtros Avançados</span>
        {totalFiltrosAplicados > 0 && (
          <span className="inline-flex items-center justify-center w-6 h-6 bg-amber-500 text-purple-900 text-xs font-bold rounded-full ml-2">
            {totalFiltrosAplicados}
          </span>
        )}
        {filtrosAvancadosOpen ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
      </button>
    </div>
  );
}

function FiltrosAplicados({ 
  selectedNiveis, 
  toggleNivelFilter, 
  selectedEscolas, 
  toggleEscolaFilter, 
  selectedClasses, 
  toggleClasseFilter,
  selectedSources,
  toggleSourceFilter,
  limparFiltros 
}: FiltrosAplicadosProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 mt-4 text-sm">
      <span className="text-purple-300">Filtros aplicados:</span>
      
      {selectedNiveis.map((nivel: number) => (
        <FilterTag 
          key={`nivel-${nivel}`}
          label={nivel === 0 ? 'Truque' : `Nível ${nivel}`}
          onRemove={() => toggleNivelFilter(nivel)}
        />
      ))}
      
      {selectedEscolas.map((escola: string) => (
        <FilterTag 
          key={`escola-${escola}`}
          label={escola}
          onRemove={() => toggleEscolaFilter(escola)}
        />
      ))}
      
      {selectedClasses.map((classe: string) => (
        <FilterTag 
          key={`classe-${classe}`}
          label={classe}
          onRemove={() => toggleClasseFilter(classe)}
        />
      ))}
      
      {selectedSources.map((source: string) => (
        <FilterTag 
          key={`source-${source}`}
          label={`Fonte: ${source}`}
          onRemove={() => toggleSourceFilter(source)}
        />
      ))}
      
      <button
        onClick={limparFiltros}
        className="text-amber-400 hover:text-amber-300 text-sm"
      >
        Limpar todos
      </button>
    </div>
  );
}

function FilterTag({ label, onRemove }: FilterTagProps) {
  return (
    <div className="flex items-center bg-purple-700/60 px-2 py-1 rounded-full border border-purple-500/30">
      <span className="mr-1">{label}</span>
      <button
        onClick={onRemove}
        className="text-purple-300 hover:text-white"
      >
        <FaTimes size={12} />
      </button>
    </div>
  );
}

function FiltrosAvancados({
  niveis,
  selectedNiveis,
  toggleNivelFilter,
  selectedEscolas,
  toggleEscolaFilter,
  escolasMagia,
  selectedClasses,
  toggleClasseFilter,
  classesMagia,
  selectedSources,
  toggleSourceFilter,
  availableSources,
  totalFiltrosAplicados,
  limparFiltros
}: FiltrosAvancadosProps) {
  return (
    <div className="mt-6 animate-fadeIn">
      <div className="text-center mb-4">
        <p className="text-sm text-purple-300">Selecione múltiplas opções em cada categoria para filtrar as magias</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Filtro por nível */}
        <FilterSection 
          title="Nível da Magia"
          layout="grid"
        >
          {niveis.map((nivel: number) => (
            <ToggleButton
              key={nivel}
              label={nivel === 0 ? "Truque" : `Nível ${nivel}`}
              isSelected={selectedNiveis.includes(nivel)}
              onClick={() => toggleNivelFilter(nivel)}
            />
          ))}
        </FilterSection>

        {/* Filtro por escola */}
        <FilterSection 
          title="Escola de Magia"
          layout="list"
        >
          {escolasMagia.map((escola: string) => (
            <ToggleButton
              key={escola}
              label={escola}
              isSelected={selectedEscolas.includes(escola)}
              onClick={() => toggleEscolaFilter(escola)}
              layout="list"
            />
          ))}
        </FilterSection>
        
        {/* Filtro por classe */}
        <FilterSection 
          title="Classes"
          layout="list"
        >
          {classesMagia.map((classe, index) => (
            <ToggleButton
              key={`classe-${classe}-${index}`}
              label={classe}
              isSelected={selectedClasses.includes(classe)}
              onClick={() => toggleClasseFilter(classe)}
              layout="list"
            />
          ))}
        </FilterSection>
        
        {/* Filtro por fonte */}
        <FilterSection 
          title="Fontes"
          layout="list"
        >
          {availableSources.map((source) => (
            <ToggleButton
              key={source.id}
              label={source.id}
              isSelected={selectedSources.includes(source.id)}
              onClick={() => toggleSourceFilter(source.id)}
              layout="list"
            />
          ))}
        </FilterSection>
      </div>

      {totalFiltrosAplicados > 0 && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={limparFiltros}
            className="px-4 py-2 bg-purple-800/60 hover:bg-purple-700/60 border border-purple-500/30 rounded-lg transition-colors text-amber-300 flex items-center gap-2"
          >
            <FaTimes size={14} />
            <span>Limpar todos os filtros</span>
          </button>
        </div>
      )}
    </div>
  );
}

function FilterSection({ title, children, layout = "grid" }: FilterSectionProps) {
  return (
    <div>
      <h3 className="text-amber-300 font-medium mb-3">{title}</h3>
      <div className={layout === "grid" 
        ? "flex flex-wrap gap-2" 
        : "flex flex-col gap-2 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-amber-500/30 scrollbar-track-purple-900/20"
      }>
        {children}
      </div>
    </div>
  );
}

function ToggleButton({ label, isSelected, onClick, layout = "grid" }: ToggleButtonProps) {
  if (layout === "grid") {
    return (
      <button
        onClick={onClick}
        className={`
          px-3 py-1.5 rounded-md border text-sm transition-colors relative
          ${isSelected
            ? "bg-amber-500/30 border-amber-500/60 text-amber-200"
            : "bg-purple-800/40 border-purple-500/30 hover:bg-purple-700/50 text-purple-200"
          }
        `}
      >
        {label}
        {isSelected && (
          <span className="absolute -right-1 -top-1 w-3 h-3 bg-amber-500 rounded-full flex items-center justify-center">
            <FaCheck size={6} className="text-purple-900" />
          </span>
        )}
      </button>
    );
  }
  
  return (
    <button
      onClick={onClick}
      className={`
        px-3 py-1.5 rounded-md border text-sm text-left transition-colors flex items-center justify-between
        ${isSelected
          ? "bg-amber-500/30 border-amber-500/60 text-amber-200"
          : "bg-purple-800/40 border-purple-500/30 hover:bg-purple-700/50 text-purple-200"
        }
      `}
    >
      {label}
      {isSelected && (
        <FaCheck size={12} className="text-amber-400 ml-2" />
      )}
    </button>
  );
} 