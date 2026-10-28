import Image from "next/image";
import Link from "next/link";
import Logo from "./Logo";
import { BASE_DE_CALCUL, DOSSIER, NAVIGATION, bareme, carte, entreprise, photos, questions } from "./donnees";

/** Le petit libellé d'une section : une pastille ronde et des capitales espacées. */
export function Surtitre({ children, clair = false, centre = false }: { children: React.ReactNode; clair?: boolean; centre?: boolean }) {
  return (
    <p className={`flex items-center gap-2.5 ${centre ? "justify-center" : ""} text-[12px] font-semibold uppercase tracking-[0.18em] ${clair ? "text-[#E3C88E]" : "text-[var(--accent-texte)]"}`}>
      <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${clair ? "bg-[#E3C88E]" : "bg-[var(--accent)]"}`} />
      {children}
    </p>
  );
}

export function Intitule({
  surtitre,
  titre,
  children,
  clair = false,
  niveau = 2,
  centre = false,
}: {
  surtitre: string;
  titre: React.ReactNode;
  children?: React.ReactNode;
  clair?: boolean;
  niveau?: 1 | 2;
  centre?: boolean;
}) {
  const Balise = niveau === 1 ? "h1" : "h2";
  return (
    <div className={`max-w-2xl space-y-4 ${centre ? "mx-auto text-center" : ""}`}>
      <Surtitre clair={clair} centre={centre}>{surtitre}</Surtitre>
      <Balise className={`text-[42px] font-normal sm:text-6xl ${clair ? "text-[var(--sur-sombre)]" : ""}`}>{titre}</Balise>
      {children && <div className={`text-[17px] leading-relaxed ${clair ? "text-[#C9D6CF]" : "text-[var(--doux)]"}`}>{children}</div>}
    </div>
  );
}

export function Photo({
  photo,
  sizes,
  className = "",
  priority = false,
  children,
}: {
  photo: (typeof photos)[keyof typeof photos];
  sizes: string;
  className?: string;
  priority?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className={`relative overflow-hidden rounded-[28px] bg-[var(--sombre)] ${className}`}>
      <Image src={photo.src} alt={photo.alt} width={photo.largeur} height={photo.hauteur} sizes={sizes} priority={priority} className="absolute inset-0 h-full w-full object-cover" />
      {children}
    </div>
  );
}

/** Une note épinglée sur une photo, comme celles que l'équipe laisse au départ. */
export function Note({ titre, texte, className = "" }: { titre: string; texte: string; className?: string }) {
  return (
    <div className={`absolute w-[170px] rounded-[10px] bg-[#FFF8E6] p-3 text-[#1F3A33] shadow-[0_12px_30px_-12px_rgba(0,0,0,0.45)] ${className}`}>
      <p className="flex items-center gap-1.5 text-[12px] font-semibold">
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#B0532D]" />
        {titre}
      </p>
      <p className="mt-1 text-[13px] leading-snug">{texte}</p>
    </div>
  );
}

/** Le barème, en tableau : prix maximums TTC, qui paie, base de calcul. */
export function TableBareme({ nombre }: { nombre?: number }) {
  return (
    <div data-film="bareme" className="overflow-hidden rounded-[28px] border border-[var(--trait)] bg-[var(--carte)]">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-[var(--trait)] px-5 py-5 sm:px-7">
        <p className="font-[family-name:var(--titres)] text-[30px] leading-none">Notre barème</p>
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-texte)]">Prix maximums TTC · exemple</p>
      </div>
      <ul className="divide-y divide-[var(--trait)]">
        {bareme.slice(0, nombre).map((l) => (
          <li key={l.prestation} className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 px-5 py-4 sm:px-7">
            <p className="text-[17px] font-semibold leading-snug">{l.prestation}</p>
            <p className="text-right font-[family-name:var(--titres)] text-[26px] leading-none whitespace-nowrap">{l.prix}</p>
            <p className="text-[14px] font-semibold text-[var(--accent-texte)]">{l.qui}</p>
            <p className="text-right text-[13px] text-[var(--doux)]">{l.unite}</p>
            <p className="col-span-2 pt-1 text-[14px] leading-relaxed text-[var(--doux)]">{l.detail}</p>
          </li>
        ))}
      </ul>
      <p className="border-t border-[var(--trait)] bg-[var(--fond)] px-5 py-4 text-[13px] leading-relaxed text-[var(--doux)] sm:px-7">{BASE_DE_CALCUL}</p>
    </div>
  );
}

export function Faq() {
  return (
    <div className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
      {questions.map((q) => (
        <details key={q.q} className="group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-5 text-[18px] font-semibold leading-snug [&::-webkit-details-marker]:hidden">
            {q.q}
            <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--sombre)] text-[18px] text-[#E3C88E] transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="pb-6 text-[16px] leading-relaxed text-[var(--doux)]">{q.r}</p>
        </details>
      ))}
    </div>
  );
}

export function PiedDeSite() {
  return (
    <footer className="bg-[var(--carte)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-6 md:grid-cols-[1.2fr_1fr_0.8fr]">
        <div className="space-y-4">
          <Logo />
          <p className="font-[family-name:var(--titres)] text-[24px] leading-snug">Ton chez-toi, remis tel quel.</p>
          <p className="text-[15px] leading-relaxed text-[var(--doux)]">
            Conciergerie de location courte durée · {entreprise.zone}
            <br />
            {entreprise.adresse.join(", ")}
            <br />
            <a href={`tel:${entreprise.telephoneLien}`} className="font-semibold text-[var(--encre)] underline underline-offset-4">{entreprise.telephone}</a> ·{" "}
            {entreprise.horaires.toLowerCase()}
          </p>
        </div>
        <div className="space-y-2 text-[14px] leading-relaxed text-[var(--doux)]">
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-texte)]">Carte professionnelle</p>
          {carte.map((l) => (
            <p key={l.libelle}>
              {l.libelle} : <span className="font-semibold text-[var(--encre)]">{l.valeur}</span>
            </p>
          ))}
          <p>Numéro d&apos;exemple. Médiateur de la consommation : médiateur d&apos;exemple, ses coordonnées et l&apos;adresse de son site.</p>
        </div>
        <ul className="space-y-2.5 text-[15px] font-medium">
          <li><Link href={DOSSIER} className="hover:underline">Accueil</Link></li>
          {NAVIGATION.map((l) => (
            <li key={l.href}><Link href={l.href} className="hover:underline">{l.libelle}</Link></li>
          ))}
          <li><Link href={`${DOSSIER}/mentions-legales`} className="underline underline-offset-4">Mentions légales et crédits</Link></li>
        </ul>
      </div>
    </footer>
  );
}
