import Link from "next/link";
import Logo from "./Logo";
import { DOSSIER, NAVIGATION, entreprise } from "./donnees";
import { styles as s } from "./Habillage";

/** Le pied de page du site : l'entreprise, le plan du site, la zone, et ce qui est inventé. */
export default function PiedDePage() {
  return (
    <footer className="border-t border-[rgba(255,255,255,0.13)] bg-[#04070d] text-[#b9c0cc]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 pt-16 pb-10 grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div className="space-y-5">
          <Logo />
          <p className="max-w-xs leading-relaxed">
            {entreprise.accroche}, depuis {entreprise.depuis}. Des piscines coques posées en
            deux à trois semaines, à la date que tu choisis.
          </p>
          <Link href={`${DOSSIER}/ma-date`} className={s.bouton}>
            Choisir ma semaine
          </Link>
        </div>

        <div className="space-y-4">
          <p className={`${s.technique} text-xs text-[#e8d1cb]`}>Le site</p>
          <ul className="space-y-2.5">
            {NAVIGATION.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white transition-colors">{l.libelle}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <p className={`${s.technique} text-xs text-[#e8d1cb]`}>Nous trouver</p>
          <address className="not-italic leading-relaxed">
            {entreprise.adresse.map((l) => (
              <span key={l} className="block">{l}</span>
            ))}
          </address>
          <a href={`tel:${entreprise.telephoneLien}`} className={`${s.lien} block w-fit font-bold`}>{entreprise.telephone}</a>
          <ul className="space-y-1 text-sm">
            {entreprise.horaires.map((h) => (
              <li key={h.jours}>
                <span className="text-white">{h.jours}</span> · {h.heures}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <p className={`${s.technique} text-xs text-[#e8d1cb]`}>On intervient</p>
          <ul className="space-y-2.5">
            {entreprise.zone.map((z) => (
              <li key={z}>{z}</li>
            ))}
          </ul>
          <p className="text-sm text-[#8f98a8]">{entreprise.rayon}</p>
        </div>
      </div>

      <div className="border-t border-[rgba(255,255,255,0.08)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-8 space-y-4 text-sm leading-relaxed">
          <p className="max-w-3xl">
            {entreprise.nom} est une entreprise fictive. Ce site de démonstration a été réalisé
            par Canevas Havane pour ses vidéos : les prix, les dates, les chantiers et les avis
            sont des exemples, et rien de ce que vous saisissez n&apos;est envoyé ni enregistré.
          </p>
          <p className="flex flex-wrap gap-x-6 gap-y-2 font-semibold">
            <Link href={`${DOSSIER}/mentions-legales`} className="underline underline-offset-4 hover:text-white">Mentions légales et crédits</Link>
            <Link href="/exemples" className="underline underline-offset-4 hover:text-white">Les autres sites de démonstration</Link>
            <Link href="/" className="underline underline-offset-4 hover:text-white">Canevas Havane</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
