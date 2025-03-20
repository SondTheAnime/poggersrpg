"use client";

import { useState, useEffect } from "react";
import { SpellData, SpellCollection } from "@/types/spell";
import { BackgroundEffects } from "@/components/magias/BackgroundEffects";
import { MagiasHeader } from "@/components/magias/MagiasHeader";
import { FilterBar } from "@/components/magias/FilterBar";
import { MagiasList } from "@/components/magias/MagiasList";
import { ApiDevMessage } from "@/components/magias/ApiDevMessage";
import { Footer } from "@/components/magias/Footer";
import { MagiasLoading } from "@/components/magias/MagiasLoading";

export default function MagiasPage() {
  const [magias, setMagias] = useState<SpellData[]>([]);
  const [filteredMagias, setFilteredMagias] = useState<SpellData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNivel, setSelectedNivel] = useState<number | null>(null);
  const [selectedEscola, setSelectedEscola] = useState<string | null>(null);
  const [selectedClasse, setSelectedClasse] = useState<string | null>(null);

  // Carregar os dados das magias
  useEffect(() => {
    const fetchMagias = async () => {
      try {
        // Carregamos inicialmente as magias do PHB por serem as mais comuns
        const response = await fetch("/api/magias?source=PHB");
        if (!response.ok) throw new Error("Falha ao carregar magias");
        
        const data: SpellCollection = await response.json();
        setMagias(data.spell);
        setFilteredMagias(data.spell);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao carregar magias:", error);
        setIsLoading(false);
      }
    };

    fetchMagias();
  }, []);

  // Filtrar magias com base nos critérios de busca
  useEffect(() => {
    if (magias.length === 0) return;

    let filtered = [...magias];

    // Filtrar por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(magia => 
        magia.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por nível
    if (selectedNivel !== null) {
      filtered = filtered.filter(magia => magia.level === selectedNivel);
    }

    // Filtrar por escola
    if (selectedEscola) {
      filtered = filtered.filter(magia => magia.school === selectedEscola);
    }

    // Filtrar por classe
    if (selectedClasse) {
      filtered = filtered.filter(magia => 
        magia.classesWhoCanUse?.some(classe => 
          classe.name.toLowerCase() === selectedClasse.toLowerCase()
        )
      );
    }

    setFilteredMagias(filtered);
  }, [searchTerm, selectedNivel, selectedEscola, selectedClasse, magias]);

  // Agrupar as escolas de magia disponíveis
  const escolasMagia = magias.length > 0 
    ? [...new Set(magias.map(magia => magia.school))].sort() 
    : [];

  // Agrupar as classes disponíveis
  const classesMagia = magias.length > 0
    ? [...new Set(magias.flatMap(magia => 
        magia.classesWhoCanUse?.map(classe => classe.name) || []
      ))].sort()
    : [];

  // Renderização inicial com efeito de loading
  if (isLoading) {
    return <MagiasLoading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0d2c] to-[#0f0a1e] text-white overflow-hidden relative">
      <BackgroundEffects />
      
      {/* Conteúdo principal */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <MagiasHeader />

        {/* Filtros */}
        <div className="relative z-30">
          <FilterBar 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedNivel={selectedNivel}
            setSelectedNivel={setSelectedNivel}
            selectedEscola={selectedEscola}
            setSelectedEscola={setSelectedEscola}
            escolasMagia={escolasMagia}
            selectedClasse={selectedClasse}
            setSelectedClasse={setSelectedClasse}
            classesMagia={classesMagia}
          />
        </div>

        {/* Conteúdo da lista de magias */}
        <div className="relative z-20 min-h-[400px]">
          <MagiasList magias={filteredMagias} />
          
          {/* Mensagem de desenvolvimento */}
          <div className="mt-12">
            <ApiDevMessage />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
} 