import Link from "next/link";
import { DOSSIER, atelier } from "./donnees";
import { Logo } from "./EnTete";

/** Le bas de chaque page : l'atelier, ses horaires, son numéro. Tout est d'exemple. */
export default function PiedDuSite() {
  return (
    <footer id="contact" className="scroll-mt-20 border-t border-[var(--trait)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div className="space-y-3">
          <Logo />
          <p className="font-[family-name:var(--titres)] text-2xl italic">On n&apos;imprime que ce qu&apos;on garde.</p>
        </div>
        <div className="space-y-1.5 [font-variant-numeric:lining-nums]">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">L&apos;atelier</p>
          {atelier.adresse.map((l) => (
            <p key={l}>{l}</p>
          ))}
          <p className="text-[var(--doux)]">{atelier.horaires}</p>
          <a href={`tel:${atelier.telephoneLien}`} className="inline-block pt-1 text-lg font-bold underline underline-offset-4">{atelier.telephone}</a>
        </div>
        <div className="space-y-1.5 text-[var(--doux)] [font-variant-numeric:lining-nums]">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">À savoir</p>
          <p>Prix TTC pour les particuliers, HT pour les restaurateurs.</p>
          <p>SIRET {atelier.siret} (exemple)</p>
          <Link href={`${DOSSIER}/mentions-legales`} className="inline-block pt-1 font-bold text-[var(--encre)] underline underline-offset-4">Mentions légales et crédits</Link>
        </div>
      </div>
    </footer>
  );
}
