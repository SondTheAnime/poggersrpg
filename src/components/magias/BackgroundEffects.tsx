/**
 * Componente que exibe efeitos visuais de fundo para a página de magias
 */
export function BackgroundEffects() {
  return (
    <>
      {/* Partículas flutuantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-purple-500/30 animate-float"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 15}s`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.5 + 0.2
            }}
          />
        ))}
      </div>

      {/* Efeito de pergaminho antigo */}
      <div className="absolute inset-0 bg-[url('/parchment-texture.jpg')] opacity-5 mix-blend-overlay pointer-events-none" />
    </>
  );
} 