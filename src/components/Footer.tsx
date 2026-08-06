import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-[var(--color-foreground)] text-white pt-12 pb-8 overflow-hidden">
      {/* Background Decorative Text */}
      <div className="absolute inset-x-0 -top-6 md:-top-12 flex justify-center opacity-[0.03] pointer-events-none select-none whitespace-nowrap leading-none tracking-tighter uppercase font-serif overflow-hidden">
        <span className="text-[20vw] font-black">Canevas Havane</span>
      </div>

      <div className="max-centered-container px-6 relative z-10 w-full text-center">
        {/* Top Section: Brand & Navigation */}
        <div className="flex flex-col items-center text-center space-y-6 mb-6 w-full">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-white/5 backdrop-blur-md">
              <div className="w-1 h-1 rounded-full bg-[var(--color-primary)] animate-pulse shadow-[0_0_10px_var(--color-primary)]"></div>
              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/40 italic">Inspiration Mensuelle</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black leading-[0.9] tracking-tighter uppercase max-w-4xl mx-auto">
              L'excellence pour <br />
              <span className="text-gradient italic font-light">Visionnaires.</span>
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-12 md:gap-24 text-[10px] pt-2 w-full border-b border-white/5 pb-12">
            <div className="space-y-4 min-w-[140px] flex flex-col items-center md:items-start text-center md:text-left">
              <h4 className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40">Menu</h4>
              <ul className="space-y-3 font-light text-white/70">
                <li><Link href="/expertise" className="hover:text-[var(--color-primary)] transition-colors">Expertise</Link></li>
                <li><Link href="/realisations" className="hover:text-[var(--color-primary)] transition-colors">Projets</Link></li>
                <li><Link href="/blog" className="hover:text-[var(--color-primary)] transition-colors">Journal</Link></li>
                <li><Link href="/a-propos" className="hover:text-[var(--color-primary)] transition-colors">L'Atelier</Link></li>
                <li><Link href="/contact" className="hover:text-[var(--color-primary)] transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div className="space-y-4 min-w-[140px] flex flex-col items-center md:items-start text-center md:text-left">
              <h4 className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40">Social</h4>
              <ul className="space-y-3 font-light text-white/70 flex flex-col items-center md:items-start">
                <li><button className="hover:text-white transition-colors uppercase tracking-widest">LinkedIn</button></li>
                <li><button className="hover:text-white transition-colors uppercase tracking-widest">Instagram</button></li>
                <li><button className="hover:text-white transition-colors uppercase tracking-widest">X / Twitter</button></li>
              </ul>
            </div>
            <div className="space-y-4 min-w-[140px] flex flex-col items-center md:items-start text-center md:text-left">
              <h4 className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40">Légal</h4>
              <ul className="space-y-3 font-light text-white/70">
                <li><Link href="/mentions-legales" className="hover:text-white transition-colors uppercase tracking-widest">Mentions</Link></li>
                <li><Link href="/confidentialite" className="hover:text-white transition-colors uppercase tracking-widest">Vie Privée</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 w-full">
          <p className="text-white/20 text-[9px] font-light uppercase tracking-[0.4em]">
            Architectures numériques de prestige.
          </p>
          
          <div className="flex flex-col items-center md:items-end space-y-1">
            <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/20">© 2026 CANEVAS HAVANE.</div>
            <div className="text-[8px] font-light text-white/10 tracking-[0.4em] uppercase">Forging digital legacies</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
