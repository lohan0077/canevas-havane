import Link from "next/link";
import { DOSSIER, cabinet } from "./donnees";
import { Logo } from "./EnTete";

/**
 * Le bas de chaque page. Pour une profession réglementée, ce qui doit y être :
 * l'inscription à l'Ordre et l'assurance professionnelle — ici, des numéros d'exemple.
 * Aucun logo de l'Ordre : il n'appartient pas au cabinet.
 */
export default function PiedDuSite() {
  return (
    <footer className="border-t border-[var(--trait)] bg-[var(--carte)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div className="space-y-3">
          <Logo />
          <p className="text-sm leading-relaxed text-[var(--doux)]">
            {cabinet.titre}. Ce site informe sur notre activité ; il a été communiqué au conseil
            régional de l&apos;Ordre des géomètres-experts.
          </p>
        </div>
        <div className="space-y-1.5 text-sm">
          <p className="font-semibold">Le cabinet</p>
          {cabinet.adresse.map((l) => (
            <p key={l} className="text-[var(--doux)]">{l}</p>
          ))}
          <p className="text-[var(--doux)]">{cabinet.horaires}</p>
          <a href={`tel:${cabinet.telephoneLien}`} className="inline-block pt-1 font-semibold underline underline-offset-4">{cabinet.telephone}</a>
        </div>
        <div className="space-y-1.5 text-sm text-[var(--doux)]">
          <p className="font-semibold text-[var(--encre)]">Profession réglementée</p>
          <p>Géomètre-expert inscrit au tableau de l&apos;Ordre, n° {cabinet.inscription} (exemple)</p>
          <p>Responsabilité civile professionnelle : {cabinet.assurance} (exemple)</p>
          <p>SIRET {cabinet.siret} (exemple)</p>
          <Link href={`${DOSSIER}/mentions-legales`} className="inline-block pt-1 font-semibold text-[var(--encre)] underline underline-offset-4">Mentions légales et crédits</Link>
        </div>
      </div>
    </footer>
  );
}
