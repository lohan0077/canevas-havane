import Link from "next/link";
import { CONTACT, DOSSIER, NAVIGATION, QUESTIONS, SAP } from "./donnees";

/** Le logo : une fenêtre à quatre carreaux, et une branche qui passe. */
export function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect x="4" y="4" width="32" height="32" rx="3" fill="#E3EBDD" stroke="#1E2A22" strokeWidth="2.5" />
      <path d="M20 4 V36 M4 20 H36" stroke="#1E2A22" strokeWidth="2.5" />
      <path d="M8 31 C 14 24, 22 22, 31 12" fill="none" stroke="#2F5D3A" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="15" cy="23" rx="3.2" ry="1.6" transform="rotate(-35 15 23)" fill="#2F5D3A" />
      <ellipse cx="24" cy="17" rx="3.2" ry="1.6" transform="rotate(-45 24 17)" fill="#2F5D3A" />
    </svg>
  );
}

/** Une note manuscrite, au crayon de l'atelier. */
export function Note({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`font-[family-name:var(--f-caveat)] text-[24px] leading-none text-[#A04A2F] ${className}`}>{children}</span>;
}

/** Un surtitre en petites capitales. */
export function Surtitre({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) {
  return <p className={`text-[12px] font-semibold uppercase tracking-[0.2em] ${clair ? "text-[#C9E0B8]" : "text-[var(--accent-texte)]"}`}>{children}</p>;
}

/**
 * Le croquis d'hiver : le plan du jardin dessiné trait après trait (animation CSS),
 * annoté à la main, et le tampon « chantier : avril ». Un exemple.
 */
export function Croquis() {
  const traits = [
    "M60 70 H300 V250 H60 Z",
    "M300 150 H420 V250 H300",
    "M420 200 C520 210 560 330 640 360 S700 520 690 600",
    "M60 640 H700",
    "M500 120 m-60 0 a60 60 0 1 0 120 0 a60 60 0 1 0 -120 0",
    "M200 470 m-44 0 a44 44 0 1 0 88 0 a44 44 0 1 0 -88 0",
    "M110 330 C200 300 330 330 380 420 S300 580 150 560 S60 400 110 330 Z",
  ];
  return (
    <figure className="relative rounded-[6px] bg-[#FBFAF5] p-4 shadow-[0_20px_40px_-26px_rgba(30,42,34,0.55)] [background-image:linear-gradient(#E6ECF2_1px,transparent_1px),linear-gradient(90deg,#E6ECF2_1px,transparent_1px)] [background-size:24px_24px]" data-film="croquis">
      <style>{`@keyframes vc-trace { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }`}</style>
      <svg viewBox="0 0 760 680" className="block h-auto w-full" aria-hidden="true">
        {traits.map((d, k) => (
          <path key={k} d={d} pathLength={1} fill="none" stroke="#3D5A80" strokeWidth="5" strokeLinecap="round" strokeDasharray="1" style={{ animation: `vc-trace 900ms ease-out ${k * 260}ms both` }} />
        ))}
      </svg>
      <span className="absolute left-[14%] top-[18%]"><Note>maison</Note></span>
      <span className="absolute left-[56%] top-[38%]"><Note>terrasse</Note></span>
      <span className="absolute left-[74%] top-[24%]"><Note>tilleul</Note></span>
      <span className="absolute left-[18%] top-[58%]"><Note>massif</Note></span>
      <span className="absolute left-[40%] top-[86%]"><Note>haie</Note></span>
      <figcaption className="absolute right-4 top-4 rotate-[-8deg] rounded-[4px] border-[3px] border-[#A04A2F] bg-[#FBFAF5] px-3 py-1 text-[14px] font-bold uppercase tracking-[0.1em] text-[#A04A2F]">
        Chantier : avril
      </figcaption>
    </figure>
  );
}

/**
 * Le prix de l'entretien en gros ; le crédit d'impôt à côté, détaché, en plus petit
 * (arrêté du 17 mars 2015, art. 5). Hors taxes et toutes taxes comprises (art. 4) :
 * micro-entreprise en franchise, HT = TTC, et c'est écrit.
 */
export function PrixEntretien() {
  return (
    <div className="space-y-3" data-film="prix">
      <div className="rounded-[22px] border-2 border-[var(--encre)] bg-[var(--carte)] p-6">
        <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[var(--doux)]">Entretien du jardin · à l&apos;année</p>
        <p className="mt-1 text-[16px]">Jardin de 300 à 700 m² · tonte, taille des haies, désherbage</p>
        <p className="mt-4 font-[family-name:var(--titres)] text-[64px] font-bold leading-none [font-variant-numeric:lining-nums]">1 200 €</p>
        <p className="mt-2 text-[17px] font-semibold">par an · HT et TTC · exemple</p>
        <p className="mt-1 text-[14px] text-[var(--doux)]">TVA non applicable, art. 293 B du CGI : le prix hors taxes est le prix toutes taxes comprises.</p>
      </div>
      <p className="rounded-[14px] bg-[#E3EBDD] px-4 py-3 text-[13px] leading-snug text-[var(--encre)]" data-film="credit-impot">
        Crédit d&apos;impôt possible : 50 % des sommes versées, sous conditions (CGI, art. 199 sexdecies).{" "}
        <a href="#conditions" className="underline underline-offset-2">Les conditions</a>
      </p>
    </div>
  );
}

/** Les questions fréquentes, dépliables sans script. */
export function Faq() {
  return (
    <div className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
      {QUESTIONS.map((x) => (
        <details key={x.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[18px] font-semibold [&::-webkit-details-marker]:hidden">
            {x.q}
            <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#E3EBDD] text-lg transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="pb-6 leading-relaxed text-[var(--doux)]">{x.r}</p>
        </details>
      ))}
    </div>
  );
}

/** Le pied du site Vue Cadrée (avant celui, commun, de la démonstration). */
export function Pied() {
  return (
    <footer className="border-t border-[var(--trait)] bg-[#E3EBDD]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.3fr_1fr_1fr]">
        <div className="space-y-4">
          <p className="flex items-center gap-3"><Logo /><span className="font-[family-name:var(--titres)] text-[26px] font-bold">Vue Cadrée</span></p>
          <p className="max-w-xs leading-relaxed">Paysagiste. On dessine ton jardin pour la vue depuis ta fenêtre.</p>
        </div>
        <div className="space-y-3">
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em]">Le site</p>
          <ul className="space-y-2">
            {NAVIGATION.map((l) => <li key={l.href}><Link href={l.href} className="hover:underline underline-offset-4">{l.libelle}</Link></li>)}
            <li><Link href={`${DOSSIER}/mentions-legales`} className="underline underline-offset-4">Mentions légales et crédits</Link></li>
          </ul>
        </div>
        <div className="space-y-3 text-[15px] leading-relaxed">
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em]">Nous joindre</p>
          <p>{CONTACT.adresse}</p>
          <p>{CONTACT.zone}</p>
          <p className="font-semibold [font-variant-numeric:lining-nums]">{CONTACT.telephone}</p>
          <p className="text-[13px] text-[var(--doux)]">L&apos;entretien est assuré par {SAP.entreprise}, entreprise déclarée services à la personne ({SAP.numero}).</p>
        </div>
      </div>
    </footer>
  );
}
