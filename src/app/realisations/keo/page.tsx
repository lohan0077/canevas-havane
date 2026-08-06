import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Kéo — Étude de Cas",
  description: "Étude de cas Kéo : une plateforme de gestion immobilière de prestige alliant performance logicielle et raffinement visuel, signée Canevas Havane.",
};

export default function KeoCaseStudy() {
  return (
    <div className="layout-safe-zone min-h-screen bg-[var(--color-background)]">
      <div className="max-centered-container px-6">
        {/* Header / Hero Section */}
        <section className="pt-20 md:pt-32 pb-24 md:pb-48 space-y-12 md:space-y-16">
          <div className="inline-flex items-center gap-3 px-4 md:px-6 py-2 rounded-full border border-[var(--color-foreground)]/5 bg-white/5 backdrop-blur-md">
            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] text-[var(--color-primary)] italic">PropTech de Prestige</span>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 md:gap-12">
            <h1 className="heading-display text-left">
              <span className="block opacity-20">L'ÉCOSYSTÈME</span>
              <span className="text-gradient block italic font-light uppercase">KÉO.FR</span>
            </h1>
            
            <a 
              href="https://kéo.fr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-glow-white !px-8 md:!px-12 !py-4 md:!py-6 group flex items-center gap-4 mb-2 md:mb-4"
            >
              Visiter le site live 
              <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
            </a>
          </div>

          <div className="aspect-[16/9] w-full relative rounded-3xl md:rounded-[4rem] overflow-hidden glass-card bg-[#0d0d0d] flex items-center justify-center p-8 md:p-16">
            <div className="relative w-full h-full">
              {/* MacBook Mockup Container */}
              <div className="absolute inset-0 z-20 pointer-events-none">
                <Image 
                  src="/macbook-hero-final.webp" 
                  alt="MacBook Frame"
                  fill
                  className="object-contain"
                />
              </div>
              {/* Screen Content */}
              <div className="absolute inset-[10%] z-10 overflow-hidden rounded-md border border-white/5">
                <Image 
                  src="/keo-real-preview.webp"
                  alt="Kéo Garden Real Estate"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* The Problem / The Solution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 mb-24 md:mb-48 items-start">
          <div className="space-y-10 md:space-y-12">
            <div className="space-y-6">
              <h4 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-[var(--color-primary)]">Le Défi</h4>
              <p className="text-2xl md:text-3xl text-[var(--color-foreground)] font-light leading-tight font-serif">
                Transformer une gestion administrative complexe en une expérience fluide et valorisante pour l'immobilier de luxe.
              </p>
            </div>
            
            <p className="text-base md:text-lg text-[var(--color-foreground)]/50 font-light leading-relaxed">
              Kéo n'est pas qu'un outil de gestion. C'est le prolongement numérique d'un service d'exception. Nous avons conçu une interface qui efface la friction technique pour ne laisser place qu'à la clarté et à la performance.
            </p>

             <div className="grid grid-cols-2 gap-8 md:gap-12 pt-8 border-t border-[var(--color-foreground)]/5">
              <div className="space-y-2">
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-foreground)]/30">Client</span>
                <p className="text-base md:text-lg font-medium uppercase font-serif">Kéo Immobilier</p>
              </div>
               <div className="space-y-2">
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-foreground)]/30">Lien Live</span>
                <a href="https://kéo.fr" target="_blank" rel="noopener noreferrer" className="text-base md:text-lg font-medium uppercase font-serif text-[var(--color-primary)] hover:underline decoration-1 underline-offset-4">kéo.fr</a>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 md:p-16 space-y-10 md:space-y-12 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
             <h4 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-[var(--color-primary)]">Spécifications</h4>
             <ul className="space-y-6 md:space-y-8">
                <li className="space-y-1 md:space-y-2">
                   <h5 className="text-base md:text-lg font-medium font-serif">Interface Intuitive</h5>
                   <p className="text-[13px] md:text-sm font-light text-[var(--color-foreground)]/60 leading-relaxed italic">Réduction du temps de saisie de 40% via une architecture centrée utilisateur.</p>
                </li>
                <li className="space-y-1 md:space-y-2">
                   <h5 className="text-base md:text-lg font-medium font-serif">Intelligence Prédictive</h5>
                   <p className="text-[13px] md:text-sm font-light text-[var(--color-foreground)]/60 leading-relaxed italic">Tableaux de bord dynamiques avec projection de cashflow en temps réel.</p>
                </li>
                <li className="space-y-1 md:space-y-2">
                   <h5 className="text-base md:text-lg font-medium font-serif">Infrastructure Sécurisée</h5>
                   <p className="text-[13px] md:text-sm font-light text-[var(--color-foreground)]/60 leading-relaxed italic">Chiffrement de bout en bout et hébergement souverain haute disponibilité.</p>
                </li>
             </ul>
          </div>
        </div>


        {/* Secondary Detail Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-48">
            <div className="aspect-[4/5] relative rounded-[3rem] overflow-hidden glass-card border border-white/5">
                <Image 
                    src="/macbook-hero-final.webp"
                    alt="Kéo Interface View"
                    fill
                    className="object-contain p-8"
                />
                <div className="absolute inset-0 flex items-center justify-center p-12">
                   <div className="relative w-full h-[60%] overflow-hidden rounded-sm">
                      <Image 
                        src="/keo-dashboard.webp"
                        alt="Kéo Screen Detail"
                        fill
                        className="object-cover"
                      />
                   </div>
                </div>
            </div>
            <div className="flex flex-col justify-center space-y-12 p-8 md:p-16">
                <h3 className="text-4xl font-medium uppercase font-serif">Un pilotage <br /><span className="text-[var(--color-primary)]">sans concession.</span></h3>
                <p className="text-xl font-light text-[var(--color-foreground)]/50 leading-relaxed">
                    Le tableau de bord Kéo offre une vision panoramique à 360° des actifs, permettant une prise de décision instantanée basée sur des données fiables.
                </p>
                <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full border border-[var(--color-foreground)]/10 flex items-center justify-center text-[var(--color-primary)]">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M2 12h20"/></svg>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest self-center opacity-30 italic">Déploiement Continu</span>
                </div>
            </div>
        </div>

        {/* Final CTA */}
        <div className="text-center w-full section-spacer pb-16 md:pb-32">
            <Link href="/realisations" className="group flex flex-col items-center gap-6 md:gap-10">
              <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] text-[var(--color-foreground)]/30 italic">Lien vers les autres œuvres</span>
              <span className="text-3xl md:text-5xl font-light italic text-[var(--color-foreground)] group-hover:text-[var(--color-primary)] transition-all duration-700 tracking-tight font-serif px-4">Suite du Portfolio</span>
              <div className="h-[2px] w-24 md:w-32 bg-[var(--color-primary)]/20 group-hover:w-48 md:group-hover:w-64 group-hover:bg-[var(--color-primary)] transition-all duration-1000"></div>
            </Link>
        </div>
      </div>
    </div>
  );
}
