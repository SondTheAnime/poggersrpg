import Link from "next/link";

/**
 * Componente que exibe a seção principal da página inicial
 */
export function HeroSection() {
  return (
    <div className="text-center max-w-3xl mx-auto">
      {/* Decoração superior */}
      <div className="mb-4 flex justify-center">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 bg-amber-500/10 rounded-full animate-pulse-slow"></div>
          <div className="absolute inset-2 border-2 border-amber-500/30 rounded-full rotate-45 animate-pulse"></div>
          <div className="absolute inset-4 border border-amber-500/40 rounded-full rotate-12"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg 
              className="w-12 h-12 text-amber-500/70"
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </div>
        </div>
      </div>

      <div className="mb-8 relative">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 animate-shimmer">
          PoggersRPG
        </h1>
        <p className="text-xl text-amber-100/80 mb-8">
          O seu grimório digital para Dungeons & Dragons 5ª Edição
        </p>
      </div>

      {/* Decoração */}
      <div className="w-full max-w-md mx-auto mb-12 relative">
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="w-10 h-10 rotate-45 border-2 border-amber-500/50 animate-pulse" />
        </div>
      </div>

      <p className="text-lg mb-10 text-amber-100/60">
        Acesse a coleção completa de magias de D&D 5e em português (ou quase), 
        com filtros por nível, classe, escola de magia e muito mais.
      </p>

      {/* Botão de navegação com efeito de hover */}
      <Link 
        href="/magias" 
        className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium transition-all duration-300 ease-in-out rounded-lg bg-gradient-to-br from-purple-700 to-purple-900 text-white overflow-hidden shadow-[0_0_20px_rgba(147,51,234,0.5)] hover:shadow-[0_0_30px_rgba(168,85,247,0.7)]"
      >
        <span className="absolute -inset-0 rounded-lg bg-gradient-to-br from-purple-600 to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="relative flex items-center gap-2">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="animate-pulse"
          >
            <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z" />
            <path d="m14 7 3 3" />
            <path d="M5 6v4" />
            <path d="M19 14v4" />
            <path d="M10 2v2" />
            <path d="M7 8H3" />
            <path d="M21 16h-4" />
            <path d="M11 3h2" />
          </svg>
          Explorar Magias
        </span>
      </Link>
    </div>
  );
} 