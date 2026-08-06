import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Réalisations — Nos Projets",
  description: "Sélection de projets signés Canevas Havane : plateformes immobilières, SaaS financiers et expériences digitales sur mesure.",
};

const projects = [
  {
    title: "Kéo.fr",
    slug: "keo",
    category: "PropTech de Prestige",
    year: "2025",
    description: "Une plateforme de gestion immobilière d'exception, redéfinissant les standards du luxe numérique.",
    image: "/macbook-hero-final.webp",
    liveUrl: "https://kéo.fr"
  },
  {
    title: "Edificia",
    slug: "edificia",
    category: "Fintech & SaaS",
    year: "2025",
    description: "Système de pilotage financier avancé pour entreprises à forte croissance.",
    image: "/edificia-dashboard-2.webp",
    liveUrl: "https://edificia.fr"
  }
];

export default function PortfolioPage() {
  return (
    <div className="layout-safe-zone min-h-screen" style={{ paddingBottom: '100px' }}>
      <div className="max-centered-container px-6">
        {/* Header Section */}
        <div className="text-center space-y-8 md:space-y-12 mb-24 md:mb-48">
          <div className="inline-flex items-center gap-3 px-4 md:px-6 py-2 rounded-full border border-[var(--color-foreground)]/5 bg-white/40 backdrop-blur-md">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse shadow-[0_0_10px_var(--color-primary)]"></div>
            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] text-[var(--color-foreground)]/60 italic">Galerie d'Exceptions</span>
          </div>
          
          <h1 className="heading-display">
            <span className="block opacity-30">NOS DERNIÈRES</span>
            <span className="text-gradient block italic font-light">RÉALISATIONS.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-[var(--color-foreground)]/40 font-light leading-relaxed px-4">
            Une sélection rigoureuse de nos travaux les plus aboutis. <br className="hidden md:block" />
            Là où la vision devient réalité numérique.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 lg:gap-32 w-full section-spacer">
          {projects.map((project) => (
            <div key={project.title} className="group relative flex flex-col space-y-6 md:space-y-8">
              <div className="aspect-[16/11] md:aspect-[16/10] overflow-hidden glass-card relative bg-[var(--color-foreground)]/[0.02] !rounded-[2rem] md:!rounded-[3rem]">
                {/* Real Project Image */}
                <Image 
                  src={project.image} 
                  alt={project.title}
                  fill
                  className="object-contain opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 p-6 md:p-8 grayscale-[0.5] group-hover:grayscale-0"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-foreground)]/10 to-transparent opacity-40 transition-opacity duration-700 z-10" />
                
                {/* Corner Info */}
                <div className="absolute top-6 right-6 md:top-10 md:right-10 z-20 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-0 md:translate-y-2 group-hover:translate-y-0">
                  <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest bg-white/10 backdrop-blur-2xl px-4 py-1.5 md:px-5 md:py-2 rounded-full border border-white/10 text-white">
                    {project.year} — COLLECTION
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-start pt-2 px-1">
                <div className="space-y-3 md:space-y-4">
                  <h4 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-[var(--color-primary)]">{project.category}</h4>
                  <h3 className="text-3xl md:text-4xl font-medium uppercase tracking-tight text-[var(--color-foreground)] group-hover:text-[var(--color-primary)] transition-colors duration-500 font-serif">
                    {project.title}
                  </h3>
                  <p className="text-[var(--color-foreground)]/50 font-light text-base md:text-lg max-w-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
                
                <div className="flex gap-3 md:gap-4 items-center shrink-0">
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[var(--color-foreground)]/10 flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-white hover:border-transparent transition-all duration-500 shadow-lg"
                    title="Visiter le site live"
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/></svg>
                  </a>
                  
                  <Link href={`/realisations/${project.slug}`} className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-[var(--color-foreground)]/10 flex items-center justify-center group-hover:bg-[var(--color-foreground)] group-hover:text-white group-hover:border-transparent transition-all duration-700 shadow-xl" title="Voir l'étude de cas">
                    <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Archive / Contact CTA */}
        <div className="text-center w-full" style={{ paddingTop: '64px', paddingBottom: '0px', marginTop: '100px' }}>
           <p className="text-[11px] font-black uppercase tracking-[0.6em] text-[var(--color-foreground)]/20 mb-16">Plus de 50 projets livrés avec excellence</p>
            <Link href="/contact" className="group flex flex-col items-center gap-10">
              <span className="text-5xl font-light italic text-[var(--color-foreground)]/30 group-hover:text-[var(--color-foreground)] transition-all duration-700 tracking-tight font-serif">Votre projet ici ?</span>
              <div className="h-[2px] w-32 bg-[var(--color-primary)]/20 group-hover:w-64 group-hover:bg-[var(--color-primary)] transition-all duration-1000"></div>
            </Link>
        </div>
      </div>
    </div>
  );
}
