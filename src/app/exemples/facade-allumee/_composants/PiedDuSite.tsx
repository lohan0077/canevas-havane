import Link from "next/link";
import { DOSSIER, entreprise } from "./donnees";
import { Logo } from "./EnTete";

/** Le contact et les coordonnées, en bas de chaque page. Tout est d'exemple. */
export default function PiedDuSite() {
  return (
    <footer id="contact" className="scroll-mt-20 border-t border-[var(--trait)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-sm leading-relaxed text-[var(--doux)]">
            Enseignes fabriquées à l&apos;atelier et posées par ceux qui les ont fabriquées.
            {" "}{entreprise.zone}.
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Appeler l&apos;atelier</p>
          <a href={`tel:${entreprise.telephoneLien}`} className="block font-[family-name:var(--titres)] text-3xl underline-offset-4 hover:underline">
            {entreprise.telephone}
          </a>
          {entreprise.horaires.map((h) => (
            <p key={h.jours} className="text-[var(--doux)]">{h.jours} · {h.heures}</p>
          ))}
        </div>
        <div className="space-y-2 text-[var(--doux)]">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-texte)]">L&apos;atelier</p>
          {entreprise.adresse.map((l) => (
            <p key={l}>{l}</p>
          ))}
          <p>SIRET {entreprise.siret} (exemple)</p>
          <p>Prix hors taxes : nos clients sont des professionnels.</p>
          <Link href={`${DOSSIER}/mentions-legales`} className="inline-block pt-2 font-semibold text-[var(--encre)] underline underline-offset-4">
            Mentions légales et crédits
          </Link>
        </div>
      </div>
    </footer>
  );
}
