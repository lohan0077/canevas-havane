"use client";
import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // localStorage n'existe pas côté serveur : la lecture doit rester dans un effet.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 w-full max-w-4xl z-[100] px-4 md:px-6 animate-fade-in-up">
      <div className="glass-card p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 shadow-[0_30px_60px_-15px_rgba(44,36,32,0.3)] border-white/10 bg-white/90 backdrop-blur-3xl rounded-[2rem] md:rounded-[3rem]">
        <div className="space-y-3 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3">
             <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]"></div>
             <h4 className="text-[var(--color-foreground)] font-black text-xs uppercase tracking-[0.2em]">Respect de l'exception digitale</h4>
          </div>
          <p className="text-[var(--color-foreground)]/60 text-sm font-light leading-relaxed max-w-xl">
            Nous utilisons des technologies discrètes pour sublimer votre navigation et analyser notre audience dans le plus pur respect de votre vie privée.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-6 shrink-0">
          <button className="text-[var(--color-foreground)]/30 hover:text-[var(--color-foreground)] transition-colors text-[9px] font-black uppercase tracking-widest" onClick={decline}>
            Décliner
          </button>
          <button 
            onClick={accept}
            className="btn-glow-white whitespace-nowrap !py-3.5 !px-10"
          >
            Accepter le voyage
          </button>
        </div>
      </div>
    </div>
  );
}
