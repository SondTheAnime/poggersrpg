/**
 * Componente que exibe uma mensagem sobre a API em desenvolvimento
 */
export function ApiDevMessage() {
  return (
    <div className="mt-16 text-center">
      <div className="p-6 max-w-xl mx-auto rounded-lg bg-purple-900/30 border border-purple-500/30">
        <div className="w-12 h-12 mx-auto mb-4 text-amber-400/80">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.6 13.8a2.5 2.5 0 0 1 0-3.6l2.1-2.1a2.5 2.5 0 1 1 3.6 3.6l-1.5 1.5"/>
            <path d="M13.4 10.2a2.5 2.5 0 0 1 0 3.6l-2.1 2.1a2.5 2.5 0 1 1-3.6-3.6l1.5-1.5"/>
            <path d="M22 12c0 5.5-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2s10 4.5 10 10z"/>
          </svg>
        </div>
        <h3 className="text-lg font-medium mb-2 text-amber-300">API em desenvolvimento</h3>
        <p className="text-sm text-amber-100/70">
          Os dados das magias serão carregados de uma API que está em desenvolvimento. 
          Por enquanto, você visualiza um protótipo da interface.
        </p>
      </div>
    </div>
  );
} 