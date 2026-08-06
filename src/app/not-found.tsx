import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Introuvable",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="layout-safe-zone min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-32">
      <div className="space-y-10 md:space-y-14 max-w-2xl">
        <h4 className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.6em] text-[var(--color-primary)]">
          Erreur 404
        </h4>

        <h1 className="text-5xl md:text-8xl font-medium uppercase tracking-tight leading-[0.85] font-serif">
          <span className="block opacity-20">PAGE</span>
          <span className="text-gradient block italic">INTROUVABLE.</span>
        </h1>

        <p className="text-lg md:text-xl text-[var(--color-foreground)]/50 font-light leading-relaxed max-w-lg mx-auto">
          Cette adresse ne mène nulle part. La page a peut-être été déplacée, ou n'a jamais existé.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 items-center justify-center pt-4">
          <Link href="/" className="btn-premium !px-12 md:!px-16 !py-5 md:!py-6 !text-[10px] md:!text-xs">
            Retour à l'accueil
          </Link>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-[var(--color-foreground)]/30 hover:text-[var(--color-foreground)] transition-colors"
          >
            <span className="w-8 h-[1px] bg-current group-hover:w-16 transition-all duration-500"></span>
            Nous contacter
          </Link>
        </div>
      </div>
    </div>
  );
}
