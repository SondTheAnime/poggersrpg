/**
 * Componente que exibe uma animação de carregamento para as magias
 */
export function MagiasLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0d2c] to-[#0f0a1e] text-white p-8 flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 bg-amber-500/20 rounded-full animate-pulse-slow"></div>
          <div className="absolute inset-2 border-2 border-amber-500/40 rounded-full rotate-45 animate-pulse"></div>
          <div className="absolute inset-4 border border-amber-500/30 rounded-full rotate-12"></div>
        </div>
        <p className="text-xl text-amber-100/80">Conjurando magias...</p>
      </div>
    </div>
  );
} 