import type { Metadata } from "next";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Edificia — Étude de Cas",
  description: "Étude de cas Edificia : un écosystème SaaS de pilotage financier conçu par Canevas Havane pour les entreprises exigeantes.",
  alternates: { canonical: "/realisations/edificia" },
};

export default function EdificiaCaseStudy() {
  return (
    <div className="layout-safe-zone min-h-screen bg-[var(--color-background)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(
        breadcrumbJsonLd([{ name: "Réalisations", path: "/realisations" }, { name: "Edificia", path: "/realisations/edificia" }])
      )} />
      <div className="max-centered-container px-6">
        {/* Header / Hero Section */}
        <section className="pt-20 md:pt-32 pb-24 md:pb-48 space-y-12 md:space-y-16">
          <div className="inline-flex items-center gap-3 px-4 md:px-6 py-2 rounded-full border border-[var(--color-foreground)]/5 bg-white/5 backdrop-blur-md">
            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] text-[var(--color-primary)] italic">Fintech & SaaS</span>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 md:gap-12">
            <h1 className="heading-display text-left">
              <span className="block opacity-20">PLATEFORME</span>
              <span className="text-gradient block italic font-light">EDIFICIA.</span>
            </h1>

            <a 
              href="https://edificia.fr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-glow-white !px-8 md:!px-12 !py-4 md:!py-6 group flex items-center gap-4 mb-2 md:mb-4"
            >
              Visiter le site live 
              <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
            </a>
          </div>

          <div className="aspect-[21/9] w-full relative rounded-[4rem] overflow-hidden glass-card bg-[#0a0a0a]">
            <Image 
              src="/edificia-dashboard-2.webp"
              alt="Edificia Hero Preview"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        {/* Technical & Aesthetic Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 mb-24 md:mb-48 items-start">
          <div className="space-y-10 md:space-y-12">
            <div className="space-y-6">
              <h4 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-[var(--color-primary)]">La Mission</h4>
              <p className="text-xl md:text-2xl text-[var(--color-foreground)] font-light leading-relaxed font-serif">
                Centraliser la complexité financière dans une interface de pilotage haute performance, sécurisée et ergonomique.
              </p>
            </div>

            <p className="text-base md:text-lg text-[var(--color-foreground)]/50 font-light leading-relaxed">
               Edificia redéfinit le pilotage d'entreprise en offrant une clarté absolue sur les flux financiers complexes. Chaque interaction a été pensée pour minimiser la charge cognitive tout en maximisant la précision des données.
            </p>

            <div className="grid grid-cols-2 gap-8 md:gap-12 pt-8 border-t border-[var(--color-foreground)]/5">
              <div className="space-y-2">
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-foreground)]/30">Client</span>
                <p className="text-base md:text-lg font-medium uppercase font-serif">Edificia Finance</p>
              </div>
              <div className="space-y-2">
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-foreground)]/30">Lien Live</span>
                <a href="https://edificia.fr" target="_blank" rel="noopener noreferrer" className="text-base md:text-lg font-medium uppercase font-serif text-[var(--color-primary)] hover:underline decoration-1 underline-offset-4">edificia.fr</a>
              </div>
            </div>

            {/* Repositioned Piliers Tech - Moved Down */}
            <div className="glass-card p-10 space-y-8 relative overflow-hidden bg-white/[0.02] mt-8">
               <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-[var(--color-primary)]">Piliers Tech</h4>
               <ul className="space-y-4">
                  <li className="flex items-center gap-4">
                     <span className="w-1 h-1 rounded-full bg-[var(--color-primary)]"></span>
                     <p className="text-base font-light text-[var(--color-foreground)]/70 italic">Analyse de données en temps réel</p>
                  </li>
                  <li className="flex items-center gap-4">
                     <span className="w-1 h-1 rounded-full bg-[var(--color-primary)]"></span>
                     <p className="text-base font-light text-[var(--color-foreground)]/70 italic">Interface Responsive Adaptive</p>
                  </li>
                  <li className="flex items-center gap-4">
                     <span className="w-1 h-1 rounded-full bg-[var(--color-primary)]"></span>
                     <p className="text-base font-light text-[var(--color-foreground)]/70 italic">Sécurité bancaire AES-256</p>
                  </li>
               </ul>
            </div>
          </div>

          {/* Right: Phone Image replaces old Tech Pillars box */}
          <div className="aspect-[4/5] w-full relative rounded-[4rem] overflow-hidden glass-card bg-[#070707] shadow-2xl p-8">
            <Image 
              src="/edificia-phone.webp"
              alt="Edificia Mobile Version"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Immersive Gallery Section */}
        <section className="mb-48 space-y-24">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                <h2 className="text-5xl md:text-7xl font-medium uppercase tracking-tight font-serif leading-[0.9]">
                   PILOTAGE <br />
                   <span className="opacity-10 italic">ABSOLU.</span>
                </h2>
                <p className="max-w-md text-right text-[var(--color-foreground)]/40 font-light italic">
                    Une précision chirurgicale au service de votre stratégie financière.
                </p>
            </div>
            
            <div className="w-full relative rounded-[4rem] overflow-hidden glass-card bg-[#0a0a0a] shadow-2xl min-h-[600px]">
               <Image 
                 src="/edificia-dashboard-2.webp"
                 alt="Edificia Dashboard Preview"
                 fill
                 className="object-cover"
               />
            </div>
        </section>

        {/* Final CTA */}
        <div className="text-center w-full section-spacer pb-32">
            <Link href="/realisations" className="group flex flex-col items-center gap-10">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--color-foreground)]/30 italic">Explorer l'excellence</span>
              <span className="text-5xl font-light italic text-[var(--color-foreground)] group-hover:text-[var(--color-primary)] transition-all duration-700 tracking-tight font-serif">Retour au Portfolio</span>
              <div className="h-[2px] w-32 bg-[var(--color-primary)]/20 group-hover:w-64 group-hover:bg-[var(--color-primary)] transition-all duration-1000"></div>
            </Link>
        </div>
      </div>
    </div>
  );
}
