import Link from "next/link";
import { CONTACT, DOSSIER, NAVIGATION, QUESTIONS } from "./donnees";

/** Le monogramme « OL » dans un cercle, comme la marque de la vidéo. */
export function Monogramme({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`${className} grid shrink-0 place-items-center rounded-full bg-[var(--accent)] font-[family-name:var(--titres)] text-[18px] italic text-[#D9A441]`}>
      OL
    </span>
  );
}

/** Une branche dessinée au trait, en ornement (jamais du texte). */
export function Branche({ className = "", miroir = false }: { className?: string; miroir?: boolean }) {
  return (
    <svg viewBox="0 0 200 260" className={className} aria-hidden="true" style={miroir ? { transform: "scaleX(-1)" } : undefined}>
      <g fill="none" stroke="#1F3A2B" strokeWidth="1.4" strokeLinecap="round" opacity="0.55">
        <path d="M10 250 C 40 200, 60 150, 120 110 S 180 40, 196 10" />
        <path d="M70 168 C 60 140, 40 120, 18 110" />
        <path d="M120 110 C 130 90, 150 84, 172 86" />
        <path d="M150 62 C 140 44, 128 34, 110 30" />
      </g>
      <g fill="#6B8F4E" opacity="0.5">
        <path d="M18 110 C 8 96, 14 84, 30 86 C 34 100, 28 108, 18 110 Z" />
        <path d="M172 86 C 186 76, 196 86, 190 98 C 178 100, 172 94, 172 86 Z" />
        <path d="M110 30 C 98 18, 106 6, 120 10 C 124 22, 120 30, 110 30 Z" />
        <path d="M60 150 C 46 146, 44 132, 56 128 C 64 136, 64 144, 60 150 Z" />
      </g>
    </svg>
  );
}

/** Un surtitre en petites capitales. */
export function Surtitre({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) {
  return (
    <p className={`text-[12px] font-semibold uppercase tracking-[0.22em] ${clair ? "text-[#D9A441]" : "text-[var(--accent-texte)]"}`}>{children}</p>
  );
}

/** Les questions fréquentes, dépliables sans script. */
export function Faq() {
  return (
    <div className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
      {QUESTIONS.map((x) => (
        <details key={x.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[17px] font-semibold [&::-webkit-details-marker]:hidden">
            {x.q}
            <span aria-hidden="true" className="font-[family-name:var(--titres)] text-3xl leading-none text-[var(--accent-texte)] transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="pb-6 leading-relaxed text-[var(--doux)]">{x.r}</p>
        </details>
      ))}
    </div>
  );
}

/** Le pied du site Ombre Lente (avant celui, commun, de la démonstration). */
export function Pied() {
  return (
    <footer className="border-t border-[var(--trait)]">
      <div className="mx-auto max-w-5xl px-5 py-16 text-center sm:px-8">
        <Monogramme className="mx-auto h-14 w-14" />
        <p className="mt-5 font-[family-name:var(--titres)] text-[38px] leading-tight">On plante. Le temps fait le reste.</p>
        <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[15px]">
          {NAVIGATION.map((l) => (
            <li key={l.href}><Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link></li>
          ))}
          <li><Link href={`${DOSSIER}/mentions-legales`} className="underline underline-offset-4">Mentions légales et crédits</Link></li>
        </ul>
        <p className="mt-8 text-[15px] text-[var(--doux)]">{CONTACT.adresse} · {CONTACT.telephone}</p>
        <p className="mt-2 text-[13px] text-[var(--doux)]">
          Pépinière inscrite au registre officiel des opérateurs professionnels · FR 00000 · exemple
        </p>
      </div>
    </footer>
  );
}

const ETOILES = Array.from({ length: 12 }, (_, k) => {
  const a = (k * Math.PI) / 6;
  // Arrondi : le serveur et le navigateur doivent écrire exactement le même nombre.
  return [(30 + 13 * Math.sin(a)).toFixed(2), (21 - 13 * Math.cos(a)).toFixed(2)];
});

/**
 * Le passeport phytosanitaire de l'arbre, au format commun européen (drapeau,
 * rubriques A à D), et ce que dit chaque rubrique. Valeurs d'exemple.
 */
export function Passeport({ latin, lot }: { latin: string; lot: string }) {
  const lignes = [
    ["A", latin, "le nom botanique"],
    ["B", "FR 00000", "le pays et le numéro de la pépinière au registre officiel"],
    ["C", lot, "le code de traçabilité du lot"],
    ["D", "FR", "le pays d'origine"],
  ];
  return (
    <div className="grid gap-8 sm:grid-cols-[minmax(0,300px)_1fr] sm:items-center" data-film="passeport">
      <figure className="relative mx-auto w-full max-w-[300px] pt-10">
        <svg viewBox="0 0 300 60" className="absolute inset-x-0 top-0 h-[60px] w-full" aria-hidden="true">
          <path d="M0 18 C 80 8, 200 30, 300 14" fill="none" stroke="#6B4E36" strokeWidth="5" strokeLinecap="round" />
          <path d="M150 20 L 150 52" stroke="#B9A47E" strokeWidth="2" />
        </svg>
        <div className="relative rotate-[3deg] rounded-[10px] bg-white px-5 pb-6 pt-7 text-[#1B1B1B] shadow-[0_24px_40px_-24px_rgba(31,58,43,0.55)]">
          <span aria-hidden="true" className="absolute left-1/2 top-2.5 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-[#B9A47E] bg-[var(--fond)]" />
          <div className="flex items-center gap-3 border-b-2 border-[#1B1B1B] pb-3">
            <svg viewBox="0 0 60 42" className="h-10 w-14 shrink-0" aria-hidden="true">
              <rect width="60" height="42" fill="#003399" />
              {ETOILES.map(([x, y], k) => <circle key={k} cx={x} cy={y} r="2" fill="#FFCC00" />)}
            </svg>
            <p className="leading-tight"><span className="block text-[15px] font-bold">Passeport phytosanitaire</span><span className="block text-[12px]">Plant Passport</span></p>
          </div>
          <dl className="mt-3 space-y-1.5 font-mono text-[15px]">
            {lignes.map(([l, v]) => (
              <div key={l} className="flex gap-3"><dt className="w-4 font-bold">{l}</dt><dd className={l === "A" ? "italic" : ""}>{v}</dd></div>
            ))}
          </dl>
          <span className="absolute bottom-4 right-4 rotate-[-8deg] rounded border-2 border-[#8A6420] px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#8A6420]">Exemple</span>
        </div>
        <figcaption className="mt-5 text-center text-[13px] leading-snug text-[var(--doux)]">
          Obligatoire pour tout arbre expédié · règl. (UE) 2016/2031, art. 79, 81 et 83
        </figcaption>
      </figure>
      <ul className="space-y-3">
        {lignes.map(([l, , d]) => (
          <li key={l} className="flex items-baseline gap-4 border-b border-[var(--trait)] pb-3">
            <span className="font-[family-name:var(--titres)] text-[30px] leading-none text-[var(--accent-texte)]">{l}</span>
            <span className="text-[16px]">{d}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
