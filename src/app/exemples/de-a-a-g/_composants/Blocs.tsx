import Link from "next/link";
import { CERTIFICATIONS, COULEURS, DOSSIER, LETTRES, cabinet } from "./donnees";

/** La marque : sept barres de A à G, en escalier, comme l'étiquette. Décoratif. */
export function Barres({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`inline-flex flex-col gap-[2px] ${className}`}>
      {LETTRES.map((l, i) => (
        <span key={l} className="block h-[3px] rounded-r-full" style={{ background: COULEURS[l][0], width: `${10 + i * 3}px` }} />
      ))}
    </span>
  );
}

export function Intitule({ surtitre, titre, children, centre = false, niveau = 2 }: { surtitre: string; titre: React.ReactNode; children?: React.ReactNode; centre?: boolean; niveau?: 1 | 2 }) {
  const Titre = niveau === 1 ? "h1" : "h2";
  return (
    <div className={`max-w-2xl space-y-4 ${centre ? "mx-auto text-center" : ""}`}>
      <p className={`inline-flex items-center gap-2 rounded-full bg-[var(--carte)] px-3.5 py-1.5 text-[13px] font-semibold text-[var(--accent-texte)] ring-1 ring-[var(--trait)]`}>
        <Barres />
        {surtitre}
      </p>
      <Titre className="text-[38px] font-bold leading-[1.02] tracking-[-0.03em] sm:text-[56px]">{titre}</Titre>
      {children && <div className="text-[17px] leading-relaxed text-[var(--doux)]">{children}</div>}
    </div>
  );
}

export function Section({ id, className = "", children, label }: { id?: string; className?: string; children: React.ReactNode; label?: string }) {
  return (
    <section id={id} aria-label={label} className="scroll-mt-20">
      <div className={`mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 ${className}`}>{children}</div>
    </section>
  );
}

/** Une tuile de bento : coins très arrondis, une teinte pastel. */
export function Tuile({ teinte = "carte", className = "", children }: { teinte?: "carte" | "menthe" | "beurre" | "peche" | "lilas"; className?: string; children: React.ReactNode }) {
  const fonds = { carte: "bg-[var(--carte)]", menthe: "bg-[#E3F1E7]", beurre: "bg-[#FBF4D6]", peche: "bg-[#FCE7D9]", lilas: "bg-[#ECE9F6]" };
  return <div className={`rounded-[28px] p-6 ring-1 ring-[var(--trait)] ${fonds[teinte]} ${className}`}>{children}</div>;
}

/** La certification, domaine par domaine : ce que la vidéo appelle « bien en vue ». Numéros d'exemple. */
export function Certification({ compacte = false }: { compacte?: boolean }) {
  return (
    <div className="space-y-3">
      <p className="text-[15px] font-semibold leading-snug">
        {cabinet.diagnostiqueur}, certifié par un organisme accrédité · certificat n°&nbsp;0000 (exemple) · assuré
      </p>
      <ul className="flex flex-wrap gap-1.5">
        {CERTIFICATIONS.map((c) => (
          <li key={c} className="rounded-full bg-[var(--carte)] px-3 py-1 text-[13px] font-semibold ring-1 ring-[var(--trait)]">
            ✓ {c}
          </li>
        ))}
      </ul>
      {!compacte && (
        <p className="text-[14px] leading-relaxed text-[var(--doux)]">
          La certification se délivre domaine par domaine, pour une durée limitée. Vérifie-la dans
          l&apos;annuaire officiel des diagnostiqueurs certifiés du ministère.
        </p>
      )}
    </div>
  );
}

export function PiedDeSite() {
  return (
    <div className="border-t border-[var(--trait)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1fr_1.3fr]">
        <div className="space-y-3">
          <p className="flex items-center gap-2.5 font-[family-name:var(--titres)] text-[26px] font-bold tracking-[-0.03em]">
            <Barres />
            De A à G
          </p>
          <p className="text-[15px] text-[var(--doux)]">Diagnostic immobilier. Ton client, c&apos;est toi : le propriétaire.</p>
          <p className="text-[15px]">
            <a href={`tel:${cabinet.telephone.replace(/ /g, "")}`} className="font-semibold underline underline-offset-4">{cabinet.telephone}</a>
            <span className="text-[var(--doux)]"> · numéro de fiction</span>
          </p>
          <p className="text-[15px]">
            <Link href={`${DOSSIER}/mentions-legales`} className="underline underline-offset-4">Mentions légales et crédits</Link>
          </p>
        </div>
        <div className="space-y-2 text-[14px] leading-relaxed text-[var(--doux)]">
          <p>{cabinet.nom}, cabinet de diagnostic immobilier · {cabinet.adresse} (exemple).</p>
          <p>Certifié DPE, amiante, électricité, gaz, plomb et termites par un organisme accrédité · certificat n° 0000 (exemple). Assurance de responsabilité civile professionnelle : assureur d&apos;exemple.</p>
          <p>Comme tout diagnostiqueur : aucun lien avec l&apos;agence qui vend ton bien, ni avec une entreprise de travaux (code de la construction et de l&apos;habitation, art. L271-6). Aucune entreprise de travaux n&apos;est recommandée sur ce site.</p>
        </div>
      </div>
    </div>
  );
}
