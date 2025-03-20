import { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';

/**
 * Componente de barra de filtros para a página de magias
 * Permite filtrar as magias por nome, nível e escola de forma intuitiva e elegante
 */
interface FilterBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedNivel: number | null;
  setSelectedNivel: (nivel: number | null) => void;
  selectedEscola: string | null;
  setSelectedEscola: (escola: string | null) => void;
  escolasMagia: string[];
  selectedClasse: string | null;
  setSelectedClasse: (classe: string | null) => void;
  classesMagia: string[];
}

export function FilterBar({
  searchTerm,
  setSearchTerm,
  selectedNivel,
  setSelectedNivel,
  selectedEscola,
  setSelectedEscola,
  escolasMagia,
  selectedClasse,
  setSelectedClasse,
  classesMagia,
}: FilterBarProps) {
  const [filtrosAvancadosOpen, setFiltrosAvancadosOpen] = useState(false);
  const [filtrosAplicados, setFiltrosAplicados] = useState(0);

  // Verificar quantos filtros estão aplicados
  useEffect(() => {
    let count = 0;
    if (selectedNivel !== null) count++;
    if (selectedEscola) count++;
    if (selectedClasse) count++;
    setFiltrosAplicados(count);
  }, [selectedNivel, selectedEscola, selectedClasse]);

  // Função para limpar todos os filtros
  const limparFiltros = () => {
    setSelectedNivel(null);
    setSelectedEscola(null);
    setSelectedClasse(null);
  };

  // Lista de níveis de magia (0-9)
  const niveis = Array.from({ length: 10 }, (_, i) => i);

  return (
    <div className="mb-8 w-full">
      {/* Container principal com efeito de vidro */}
      <div className="backdrop-blur-md bg-purple-900/30 border border-purple-500/20 rounded-xl shadow-lg p-4 mb-6 animate-fadeIn">
        {/* Seção de pesquisa sempre visível */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-2 gap-4">
          {/* Campo de pesquisa por nome */}
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

          {/* Botão para expandir/colapsar filtros avançados */}
          <button
            onClick={() => setFiltrosAvancadosOpen(!filtrosAvancadosOpen)}
            className="flex items-center gap-2 px-4 py-2.5 bg-purple-700/60 hover:bg-purple-600/60 text-white rounded-lg transition-all duration-300 border border-purple-500/30"
          >
            <FaFilter className="animate-pulse" />
            <span>Filtros Avançados</span>
            {filtrosAplicados > 0 && (
              <span className="inline-flex items-center justify-center w-6 h-6 bg-amber-500 text-purple-900 text-xs font-bold rounded-full ml-2">
                {filtrosAplicados}
              </span>
            )}
            {filtrosAvancadosOpen ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
          </button>
        </div>

        {/* Filtros aplicados (visível mesmo quando os filtros avançados estão fechados) */}
        {filtrosAplicados > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-4 text-sm">
            <span className="text-purple-300">Filtros aplicados:</span>
            
            {selectedNivel !== null && (
              <div className="flex items-center bg-purple-700/60 px-2 py-1 rounded-full border border-purple-500/30">
                <span className="mr-1">Nível {selectedNivel}</span>
                <button
                  onClick={() => setSelectedNivel(null)}
                  className="text-purple-300 hover:text-white"
                >
                  <FaTimes size={12} />
                </button>
              </div>
            )}
            
            {selectedEscola && (
              <div className="flex items-center bg-purple-700/60 px-2 py-1 rounded-full border border-purple-500/30">
                <span className="mr-1">Escola: {selectedEscola}</span>
                <button
                  onClick={() => setSelectedEscola(null)}
                  className="text-purple-300 hover:text-white"
                >
                  <FaTimes size={12} />
                </button>
              </div>
            )}
            
            {selectedClasse && (
              <div className="flex items-center bg-purple-700/60 px-2 py-1 rounded-full border border-purple-500/30">
                <span className="mr-1">Classe: {selectedClasse}</span>
                <button
                  onClick={() => setSelectedClasse(null)}
                  className="text-purple-300 hover:text-white"
                >
                  <FaTimes size={12} />
                </button>
              </div>
            )}
            
            <button
              onClick={limparFiltros}
              className="text-amber-400 hover:text-amber-300 text-sm"
            >
              Limpar todos
            </button>
          </div>
        )}

        {/* Filtros avançados colapsáveis */}
        {filtrosAvancadosOpen && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 animate-fadeIn">
            {/* Filtro por nível */}
            <div>
              <label className="block text-purple-300 mb-2 font-medium">Nível da Magia</label>
              <div className="relative">
                <select
                  value={selectedNivel === null ? "" : selectedNivel}
                  onChange={(e) => setSelectedNivel(e.target.value ? Number(e.target.value) : null)}
                  className="w-full p-2.5 bg-purple-800/40 text-white rounded-lg border border-purple-500/30 focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                >
                  <option value="">Todos os níveis</option>
                  {niveis.map((nivel) => (
                    <option key={nivel} value={nivel}>
                      {nivel === 0 ? "Truque (Nível 0)" : `Nível ${nivel}`}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <FaChevronDown className="text-purple-300" />
                </div>
              </div>
            </div>

            {/* Filtro por escola */}
            <div>
              <label className="block text-purple-300 mb-2 font-medium">Escola de Magia</label>
              <div className="relative">
                <select
                  value={selectedEscola || ""}
                  onChange={(e) => setSelectedEscola(e.target.value || null)}
                  className="w-full p-2.5 bg-purple-800/40 text-white rounded-lg border border-purple-500/30 focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                >
                  <option value="">Todas as escolas</option>
                  {escolasMagia.map((escola) => (
                    <option key={escola} value={escola}>
                      {escola}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <FaChevronDown className="text-purple-300" />
                </div>
              </div>
            </div>
            
            {/* Filtro por classe */}
            <div>
              <label className="block text-purple-300 mb-2 font-medium">Classe</label>
              <div className="relative">
                <select
                  value={selectedClasse || ""}
                  onChange={(e) => setSelectedClasse(e.target.value || null)}
                  className="w-full p-2.5 bg-purple-800/40 text-white rounded-lg border border-purple-500/30 focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                >
                  <option value="">Todas as classes</option>
                  {classesMagia.map((classe) => (
                    <option key={classe} value={classe}>
                      {classe}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <FaChevronDown className="text-purple-300" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 