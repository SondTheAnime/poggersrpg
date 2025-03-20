/**
 * Componente que exibe os recursos principais da plataforma
 */
export function FeatureSection() {
  return (
    <div className="mt-24 relative">
      {/* Título e separador decorativo da seção */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-400">
          Recursos do Grimório
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-amber-500 mx-auto rounded-full mb-2"></div>
        <div className="w-16 h-1 bg-gradient-to-r from-purple-600 to-amber-500 mx-auto rounded-full opacity-60"></div>
      </div>

      {/* Elemento decorativo de fundo */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-20 rounded-full border-2 border-dashed border-amber-500/30 animate-spin-slow"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-10 rounded-full border border-purple-500/40 rotate-45"></div>
      </div>

      {/* Cards de recursos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 max-w-6xl mx-auto relative z-10">
        {/* Card 1 - Busca Avançada */}
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-purple-900/40 rounded-xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
          <div className="bg-gradient-to-br from-purple-900/80 to-purple-900/40 backdrop-blur-sm border border-purple-500/30 p-8 rounded-xl transition-all duration-500 shadow-lg hover:shadow-purple-500/20 relative z-10">
            <div className="w-16 h-16 mb-6 mx-auto bg-gradient-to-br from-amber-400/20 to-amber-600/20 rounded-xl flex items-center justify-center p-3 border border-amber-500/30 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-amber-400">
                <path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z"/>
                <path d="M12 13v8"/>
                <path d="M12 3v3"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-center text-amber-300 group-hover:text-amber-200 transition-colors">Busca Avançada</h3>
            <p className="text-sm text-amber-100/60 text-center">Encontre exatamente o que precisa com nossos filtros poderosos para magias de qualquer nível ou escola.</p>
            <div className="h-1 w-12 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent mx-auto mt-5"></div>
          </div>
        </div>
        
        {/* Card 2 - Em Português */}
        <div className="group relative mt-8 md:mt-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-purple-900/40 rounded-xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
          <div className="bg-gradient-to-br from-purple-900/80 to-purple-900/40 backdrop-blur-sm border border-purple-500/30 p-8 rounded-xl transition-all duration-500 shadow-lg hover:shadow-purple-500/20 relative z-10">
            <div className="w-16 h-16 mb-6 mx-auto bg-gradient-to-br from-amber-400/20 to-amber-600/20 rounded-xl flex items-center justify-center p-3 border border-amber-500/30 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-amber-400">
                <path d="m21.44 16.56-3.33-3.33a2 2 0 0 0-2.82 0l-.36.36a2 2 0 0 0 0 2.83l3.33 3.33a2 2 0 0 0 2.82 0l.36-.36a2 2 0 0 0 0-2.83Z"/>
                <path d="M17.36 12.52 15 10.16l-7.58 7.58a2 2 0 0 0 0 2.83l.35.35a2 2 0 0 0 2.82 0l6.8-6.8"/>
                <path d="m2 21 7.64-7.64"/>
                <path d="m11 7.5 1.5-1.5a2.83 2.83 0 0 1 4 0v0a2.83 2.83 0 0 1 0 4L16 10"/>
                <path d="M19 5 5 19"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-center text-amber-300 group-hover:text-amber-200 transition-colors">Em Português</h3>
            <p className="text-sm text-amber-100/60 text-center">Todas as magias completamente traduzidas e explicadas para facilitar suas sessões de jogo.</p>
            <div className="h-1 w-12 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent mx-auto mt-5"></div>
          </div>
        </div>
        
        {/* Card 3 - Conteúdo Organizado */}
        <div className="group relative mt-8 md:mt-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-purple-900/40 rounded-xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
          <div className="bg-gradient-to-br from-purple-900/80 to-purple-900/40 backdrop-blur-sm border border-purple-500/30 p-8 rounded-xl transition-all duration-500 shadow-lg hover:shadow-purple-500/20 relative z-10">
            <div className="w-16 h-16 mb-6 mx-auto bg-gradient-to-br from-amber-400/20 to-amber-600/20 rounded-xl flex items-center justify-center p-3 border border-amber-500/30 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-amber-400">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
                <path d="M9.1 12a2.1 2.1 0 0 1 0-3"/>
                <path d="M14.9 9a2.1 2.1 0 0 1 0 3"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-center text-amber-300 group-hover:text-amber-200 transition-colors">Conteúdo Organizado</h3>
            <p className="text-sm text-amber-100/60 text-center">Encontre as magias agrupadas por escola e nível para otimizar a preparação das suas aventuras.</p>
            <div className="h-1 w-12 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent mx-auto mt-5"></div>
          </div>
        </div>
      </div>

      {/* Elemento decorativo inferior */}
      <div className="mt-16 flex justify-center">
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent"></div>
      </div>
    </div>
  );
} 