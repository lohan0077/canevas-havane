import Link from "next/link";
import { DOSSIER, agence } from "./donnees";
import { Logo } from "./EnTete";

/** Le bas de chaque page : l'agence, sa déclaration de services à la personne (exemple). */
export default function PiedDuSite() {
  return (
    <footer id="contact" className="scroll-mt-20 border-t border-[var(--trait)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div className="space-y-3">
          <Logo />
          <p className="font-[family-name:var(--titres)] text-xl italic">On connaît la maison.</p>
        </div>
        <div className="space-y-1.5">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--accent-texte)]">L&apos;agence</p>
          <a href={`tel:${agence.telephoneLien}`} className="block font-[family-name:var(--titres)] text-3xl font-semibold underline-offset-4 hover:underline">{agence.telephone}</a>
          <p className="text-sm text-[var(--doux)]">{agence.horaires}</p>
          {agence.adresse.map((l) => (
            <p key={l} className="text-sm">{l}</p>
          ))}
        </div>
        <div className="space-y-1.5 text-sm text-[var(--doux)]">
          <p className="font-semibold uppercase tracking-[0.14em] text-[var(--accent-texte)]">Services à la personne</p>
          <p>Entreprise déclarée, n° {agence.declaration} (exemple)</p>
          <p>Ménage et courses à domicile</p>
          <p>SIRET {agence.siret} (exemple)</p>
          <Link href={`${DOSSIER}/mentions-legales`} className="inline-block pt-1 font-semibold text-[var(--encre)] underline underline-offset-4">Mentions légales et crédits</Link>
        </div>
      </div>
    </footer>
  );
}
