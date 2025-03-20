/**
 * Componente que exibe os efeitos visuais de fundo para a página inicial
 */
export function HomeBackgroundEffects() {
  return (
    <>
      {/* Partículas flutuantes para simular efeito mágico */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 25 }).map((_, i) => (
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
      
      {/* Efeito de teia de fundo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(120,81,169,0.1)_1px,_transparent_1px)] bg-[length:20px_20px] pointer-events-none" />
    </>
  );
} 