"use client";

import { useState, useEffect } from "react";
import { SpellData} from "@/types/spell";
import { BackgroundEffects } from "@/components/magias/BackgroundEffects";
import { MagiasHeader } from "@/components/magias/MagiasHeader";
import { FilterBar } from "@/components/magias/FilterBar";
import { MagiasList } from "@/components/magias/MagiasList";
// import { ApiDevMessage } from "@/components/magias/ApiDevMessage";
import { Footer } from "@/components/magias/Footer";
import { MagiasLoading } from "@/components/magias/MagiasLoading";

interface SourceData {
  id: string;
  fileName: string;
}

export default function MagiasPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [magias, setMagias] = useState<SpellData[]>([]);
  const [filteredMagias, setFilteredMagias] = useState<SpellData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNiveis, setSelectedNiveis] = useState<number[]>([]);
  const [selectedEscolas, setSelectedEscolas] = useState<string[]>([]);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>(['PHB']);
  const [availableSources, setAvailableSources] = useState<SourceData[]>([]);

  // Funções para gerenciar filtros
  const toggleNivelFilter = (nivel: number) => {
    setSelectedNiveis(prev => 
      prev.includes(nivel) 
        ? prev.filter(n => n !== nivel) 
        : [...prev, nivel]
    );
  };
  
  const toggleEscolaFilter = (escola: string) => {
    setSelectedEscolas(prev => 
      prev.includes(escola) 
        ? prev.filter(e => e !== escola) 
        : [...prev, escola]
    );
  };
  
  const toggleClasseFilter = (classe: string) => {
    setSelectedClasses(prev => 
      prev.includes(classe) 
        ? prev.filter(c => c !== classe) 
        : [...prev, classe]
    );
  };
  
  const toggleSourceFilter = (source: string) => {
    setSelectedSources(prev => 
      prev.includes(source) 
        ? prev.filter(s => s !== source) 
        : [...prev, source]
    );
  };
  
  const limparFiltros = () => {
    setSelectedNiveis([]);
    setSelectedEscolas([]);
    setSelectedClasses([]);
    setSelectedSources(['PHB']);
    setSearchTerm('');
  };
  
  // Obter todas as fontes disponíveis
  useEffect(() => {
    async function fetchSources() {
      try {
        const response = await fetch('/api/magias?listSources=true');
        if (!response.ok) throw new Error('Falha ao carregar fontes');
        
        const data = await response.json();
        setAvailableSources(data.sources);
      } catch (error) {
        console.error('Erro ao carregar fontes:', error);
      }
    }
    
    fetchSources();
  }, []);
  
  // Buscar magias quando as fontes selecionadas mudarem
  useEffect(() => {
    async function fetchSpells() {
      setIsLoading(true);
      try {
        const allSpells: SpellData[] = [];
        const sourcesWithErrors: string[] = [];
        
        // Buscar magias de cada fonte selecionada
        for (const source of selectedSources) {
          try {
            const response = await fetch(`/api/magias?source=${source}`);
            
            if (!response.ok) {
              const errorData = await response.json();
              console.error(`Erro ao carregar fonte ${source}:`, errorData.message || 'Erro desconhecido');
              sourcesWithErrors.push(source);
              continue; // Pular para a próxima fonte
            }
            
            const data = await response.json();
            allSpells.push(...data.spell);
          } catch (sourceError) {
            console.error(`Erro ao processar fonte ${source}:`, sourceError);
            sourcesWithErrors.push(source);
          }
        }
        
        // Se houver erros em alguma fonte, remover automaticamente da seleção
        if (sourcesWithErrors.length > 0) {
          setSelectedSources(prev => prev.filter(source => !sourcesWithErrors.includes(source)));
          // Se todas as fontes tiverem erro, voltar para PHB
          if (sourcesWithErrors.length === selectedSources.length) {
            setSelectedSources(['PHB']);
          }
          
          // Mostrar alerta sobre fontes com erro
          alert(`Algumas fontes não puderam ser carregadas: ${sourcesWithErrors.join(', ')}`);
        }
        
        setMagias(allSpells);
      } catch (error) {
        console.error('Erro ao carregar magias:', error);
        setMagias([]);
      } finally {
        setIsLoading(false);
      }
    }
    
    if (selectedSources.length > 0) {
      fetchSpells();
    } else {
      setMagias([]);
      setIsLoading(false);
    }
  }, [selectedSources]);
  
  // Filtrar magias com base nos critérios selecionados
  useEffect(() => {
    // Filtrar com base no termo de busca, níveis, escolas e classes
    const filtered = magias.filter(magia => {
      // Filtro de busca por nome
      const matchesSearch = searchTerm === '' || 
        magia.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filtro por nível
      const matchesNivel = selectedNiveis.length === 0 || 
        selectedNiveis.includes(magia.level);
      
      // Filtro por escola
      const matchesEscola = selectedEscolas.length === 0 || 
        selectedEscolas.includes(magia.school);
      
      // Filtro por classe
      const matchesClasse = selectedClasses.length === 0 || 
        magia.classesWhoCanUse?.some(classe => 
          selectedClasses.includes(classe.name)
        );
      
      return matchesSearch && matchesNivel && matchesEscola && matchesClasse;
    });
    
    setFilteredMagias(filtered);
  }, [magias, searchTerm, selectedNiveis, selectedEscolas, selectedClasses]);
  
  // Extrair escolas e classes únicas para os filtros
  const escolasMagia = Array.from(new Set(magias.map(magia => magia.school))).sort();
  
  // Extrair classes únicas de todas as magias
  const classesMagia = Array.from(
    new Set(
      magias
        .flatMap(magia => magia.classesWhoCanUse || [])
        .map(classe => classe.name)
    )
  ).sort();
  
  // Funções para controlar a visibilidade do modal
  const onModalOpen = () => setIsModalOpen(true);
  const onModalClose = () => setIsModalOpen(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Renderize apenas um espaço reservado no servidor
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a0d2c] to-[#0f0a1e] text-white">
        <div className="container mx-auto px-4 py-16">
          <MagiasLoading />
        </div>
      </div>
    );
  }
  
  // Resto do componente que será renderizado apenas no cliente
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0d2c] to-[#0f0a1e] text-white overflow-hidden relative">
      <BackgroundEffects />
      
      {/* Conteúdo principal */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <MagiasHeader />

        {/* Filtros - Oculta quando um modal está aberto */}
        {!isModalOpen && (
          <div className="relative z-30">
            <FilterBar 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
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
              limparFiltros={limparFiltros}
            />
          </div>
        )}

        {/* Conteúdo da lista de magias */}
        <div className="relative z-20 min-h-[400px]">
          {isLoading ? (
            <MagiasLoading />
          ) : (
            <MagiasList 
              magias={filteredMagias}
              onModalOpen={onModalOpen}
              onModalClose={onModalClose}
            />
          )}
          
          {/* Mensagem de desenvolvimento */}
          {/* <div className="mt-12">
            <ApiDevMessage />
          </div> */}
        </div>
      </div>

      <Footer />
    </div>
  );
} 