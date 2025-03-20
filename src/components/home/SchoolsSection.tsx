/**
 * Componente que exibe as escolas de magia na página inicial
 */
export function SchoolsSection() {
  const schools = ["Evocação", "Abjuração", "Necromancia"];

  return (
    <div className="mt-20 grid grid-cols-3 gap-12 opacity-60">
      {schools.map((escola, i) => (
        <div key={i} className="text-center">
          <div className="w-16 h-16 mx-auto mb-2 rounded-full border border-amber-500/30 flex items-center justify-center animate-pulse-slow">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/20 to-purple-500/20" />
          </div>
          <p className="text-xs text-amber-300/70 font-mono tracking-wider">{escola}</p>
        </div>
      ))}
    </div>
  );
} 