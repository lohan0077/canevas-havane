import Link from "next/link";
import { DOSSIER, bureau } from "./donnees";
import { Logo } from "./EnTete";

/** Le bas de chaque page : le bureau, son numéro, son assurance. Tout est d'exemple. */
export default function PiedDuSite() {
  return (
    <footer id="contact" className="scroll-mt-20 border-t-2 border-[var(--encre)]">
      <div className="mx-auto grid max-w-6xl md:grid-cols-3">
        <div className="space-y-3 border-b-2 border-[var(--encre)] p-6 md:border-b-0 md:border-r-2">
          <Logo />
          <p className="font-[family-name:var(--titres)] text-3xl font-bold uppercase">Ouvrez grand.</p>
          <p className="text-sm text-[var(--doux)]">{bureau.titre}</p>
        </div>
        <div className="space-y-1.5 border-b-2 border-[var(--encre)] p-6 md:border-b-0 md:border-r-2">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--accent-texte)]">Appeler le bureau</p>
          <a href={`tel:${bureau.telephoneLien}`} className="block font-[family-name:var(--titres)] text-3xl font-bold underline-offset-4 hover:underline">{bureau.telephone}</a>
          <p className="text-sm text-[var(--doux)]">{bureau.horaires}</p>
          {bureau.adresse.map((l) => (
            <p key={l} className="text-sm">{l}</p>
          ))}
        </div>
        <div className="space-y-1.5 p-6 text-sm text-[var(--doux)]">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--accent-texte)]">À savoir</p>
          <p>Assurance professionnelle : {bureau.assurance} (exemple)</p>
          <p>SIRET {bureau.siret} (exemple)</p>
          <p>Prix TTC d&apos;exemple, pour des particuliers.</p>
          <Link href={`${DOSSIER}/mentions-legales`} className="inline-block pt-1 font-bold text-[var(--encre)] underline underline-offset-4">Mentions légales et crédits</Link>
        </div>
      </div>
    </footer>
  );
}
