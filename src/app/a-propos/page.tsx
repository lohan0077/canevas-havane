import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "L'Atelier — À Propos",
  description: "Découvrez l'atelier Canevas Havane : notre vision, notre exigence et notre approche artisanale de la création numérique de prestige.",
};

export default function AboutPage() {
  return (
    <div className="layout-safe-zone min-h-screen" style={{ paddingBottom: '100px' }}>
      <div className="max-centered-container px-6">
        {/* Hero Section */}
        <div className="text-center space-y-8 mb-24 md:mb-48">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[var(--color-foreground)]/5 bg-white/40 backdrop-blur-md">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse shadow-[0_0_10px_var(--color-primary)]"></div>
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[var(--color-foreground)]/60 italic">L'Esprit de l'Atelier</span>
          </div>
          
          <h1 className="heading-display">
            <span className="block opacity-30">NOTRE QUÊTE DE</span>
            <span className="text-gradient block italic font-light">PERFECTION.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-[var(--color-foreground)]/60 font-light leading-relaxed px-4">
            Plus qu'une agence, un sanctuaire de la création numérique. <br className="hidden md:block" />
            Nous fusionnons l'artisanat traditionnel et l'innovation radicale.
          </p>
        </div>

        {/* Philosophy Sections */}
        <div className="space-y-24 md:space-y-48 w-full">
          {/* Section 1: The Core */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-center">
            <div className="space-y-6 md:space-y-10 order-2 lg:order-1">
              <h4 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-[var(--color-primary)]">L'Artisanat Digital</h4>
               <h2 className="text-3xl md:text-6xl font-medium uppercase tracking-tight leading-tight md:leading-none font-serif">
                L'OPÉRA DU <br />
                <span className="opacity-20 italic">PIXEL.</span>
              </h2>
              <p className="text-lg md:text-xl text-[var(--color-foreground)]/70 font-light leading-relaxed">
                Chaque ligne de code est une note, chaque design est une symphonie. Nous croyons que la beauté ne réside pas seulement dans ce qui est vu, mais dans la pureté de la structure invisible.
              </p>
              <div className="pt-4 md:pt-6">
                 <div className="h-[1px] w-12 bg-[var(--color-foreground)]/10" />
              </div>
            </div>
            <div className="order-1 lg:order-2">
               <div className="aspect-[4/3] glass-card overflow-hidden relative group rounded-3xl md:rounded-[3rem]">
                  <Image 
                    src="/jewelry-circuit.webp"
                    alt="L'Artisanat Digital"
                    fill
                    className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl md:text-7xl font-medium text-[var(--color-foreground)]/[0.05] select-none uppercase tracking-tighter font-serif">PURETÉ</span>
                  </div>
               </div>
            </div>
          </div>

          {/* Section 2: Method */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            <div className="order-2 lg:order-2 space-y-10">
              <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-[var(--color-primary)]">Notre Vision</h4>
              <h2 className="text-4xl md:text-6xl font-medium uppercase tracking-tight leading-none font-serif">
                CONSTRUIRE DES <br />
                <span className="opacity-20 italic">HÉRITAGES.</span>
              </h2>
              <p className="text-xl text-[var(--color-foreground)]/70 font-light leading-relaxed">
                Nous ne concevons pas pour demain, mais pour les décennies à venir. Nos architectures numériques sont pensées pour évoluer, durer et dominer leur écosystème.
              </p>
              <div className="pt-6">
                 <div className="h-[1px] w-24 bg-[var(--color-foreground)]/10" />
              </div>
            </div>
            <div className="order-1 lg:order-1">
               <div className="aspect-[4/3] glass-card overflow-hidden relative group">
                  <Image 
                    src="/digital-column.webp"
                    alt="Notre Vision"
                    fill
                    className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-7xl font-medium text-[var(--color-foreground)]/[0.05] select-none -rotate-3 italic font-light font-serif">HÉRITAGE</span>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* The Team / The Founder Spirit (Minimalist) */}
        <div className="text-center space-y-10 md:space-y-12 mb-24 md:mb-48 max-w-2xl mx-auto">
           <h3 className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] md:tracking-[0.5em] text-[var(--color-foreground)]/20">La Signature</h3>
            <p className="text-xl md:text-2xl font-light italic text-[var(--color-foreground)]/50 leading-relaxed font-serif px-6">
              "Dans un monde de bruit numérique, le silence du luxe est la déclaration la plus puissante."
            </p>
            <div className="relative w-full aspect-[21/11] md:aspect-[21/9] glass-card overflow-hidden rounded-3xl md:rounded-[3rem]">
                <Image 
                  src="/artisan-signature.webp"
                  alt="L'Atelier Signature"
                  fill
                  className="object-cover opacity-50 group-hover:scale-105 transition-transform duration-[2000ms]"
                />
            </div>
        </div>

        {/* Final CTA */}
        <div className="glass-card p-10 md:p-24 text-center space-y-10 md:space-y-12 w-full bg-[var(--color-foreground)] rounded-[3rem] md:rounded-[4rem]" style={{ marginBottom: '0px', marginTop: '64px md:128px' }}>
           <h2 className="text-3xl md:text-5xl font-medium uppercase tracking-tight leading-tight md:leading-none text-white font-serif px-4">
             Prêt à marquer <br />
             <span className="text-gradient italic font-light">L'Histoire ?</span>
           </h2>
           <Link href="/contact" className="btn-glow-white !px-10 md:!px-16 !py-4 md:!py-6">
             Entrer en contact
           </Link>
        </div>
      </div>
    </div>
  );
}
