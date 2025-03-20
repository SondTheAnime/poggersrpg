import Link from "next/link";

/**
 * Componente de cabeçalho para a página de magias
 * Apresenta o título e subtítulo da página, além do link para retornar à página inicial
 */
export function MagiasHeader() {
  return (
    <div className="mb-12 text-center">
      <Link 
        href="/" 
        className="inline-flex items-center text-amber-400 hover:text-amber-300 transition-colors mb-4"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="mr-2"
        >
          <path d="m12 19-7-7 7-7"/>
          <path d="M19 12H5"/>
        </svg>
        Voltar para o início
      </Link>
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 animate-shimmer">
        Grimório Arcano
      </h1>
      <div className="w-full max-w-md mx-auto mb-6 relative">
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
      </div>
      <p className="text-xl text-amber-100/80 mb-8 max-w-2xl mx-auto">
        Explore nossa coleção de magias para Dungeons & Dragons 5ª Edição
      </p>
    </div>
  );
} 