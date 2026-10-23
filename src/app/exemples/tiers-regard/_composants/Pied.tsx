import Link from "next/link";
import MotGeant from "../../_kit/MotGeant";
import { Monogramme } from "./Blocs";
import { DOSSIER, NAVIGATION, cabinet } from "./donnees";

/** Le pied du site : la marque, les mentions du métier, les pages, et le nom en lettres géantes. */
export default function Pied() {
  return (
    <footer className="overflow-hidden border-t border-[var(--trait)] bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-12 pt-20 sm:px-8 md:grid-cols-[1fr_1.3fr_0.8fr]">
        <div className="space-y-3">
          <p className="flex items-center gap-3">
            <Monogramme />
            <span className="font-[family-name:var(--titres)] text-[24px] font-semibold tracking-[-0.02em]">{cabinet.nom}</span>
          </p>
          <p className="font-[family-name:var(--titres)] text-[19px]">Je dis ce que je vois.</p>
          <p className="text-[15px]">
            <a href={`tel:${cabinet.telephoneLien}`} className="font-semibold tabular-nums underline underline-offset-4">{cabinet.telephone}</a>
            <span className="text-[var(--sur-sombre)]/85"> · numéro de fiction</span>
          </p>
        </div>
        <div className="space-y-2 text-[14px] leading-relaxed text-[var(--sur-sombre)]/85">
          <p>{cabinet.nom}, diagnostic immobilier · {cabinet.adresse} (exemple).</p>
          <p>Certifiée DPE, amiante, électricité, gaz, plomb et termites par un organisme accrédité · certificat n° 0000 (exemple). Assurance de responsabilité civile professionnelle : assureur d&apos;exemple.</p>
          <p>Comme tout diagnostiqueur : aucun lien avec ton agence, ni avec une entreprise de travaux (CCH, art. L271-6), et aucun avantage accordé à quiconque pour être recommandé (art. R271-3). Aucune entreprise de travaux n&apos;est recommandée sur ce site.</p>
        </div>
        <ul className="space-y-2 text-[15px]">
          {[...NAVIGATION, { href: `${DOSSIER}/rendez-vous`, libelle: "Rendez-vous" }, { href: `${DOSSIER}/mentions-legales`, libelle: "Mentions légales et crédits" }].map((l) => (
            <li key={l.href}><Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link></li>
          ))}
        </ul>
      </div>
      <MotGeant texte="Tiers Regard" chasse={1.6} className="px-4 pb-3 font-[family-name:var(--titres)] font-semibold text-[var(--accent)]" />
    </footer>
  );
}
