import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { AppelFinal, Intitule, Photographie, Questions, Serif } from "../_composants/Blocs";
import { DOSSIER, deroule, photos, seanceAdulte, tarifs } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "La séance et le prix — Sans Détour, site de démonstration",
  description:
    "Le prix et la durée d'une séance chez un ostéopathe imaginaire, écrits en gros, avec la facture pour la mutuelle et le déroulé minute par minute.",
  ...adressesDeLaPage("/exemples/sans-detour/seance-et-prix"),
};

export default function SeanceEtPrix() {
  return (
    <main>
      <section className="max-w-6xl mx-auto px-5 sm:px-6 pt-12 sm:pt-20 pb-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end" data-film="prix">
        <div className="space-y-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--doux)]">Séance adulte · prix d&apos;exemple</p>
          <h1 className="font-extrabold tracking-[-0.05em] tabular-nums">
            <span className="block text-[92px] sm:text-[150px] leading-[0.92]">{seanceAdulte.duree}</span>
            <span className="block text-[92px] sm:text-[150px] leading-[0.92] text-[var(--accent-texte)]">{seanceAdulte.prix}</span>
          </h1>
          <p id="facture" className="inline-flex items-center gap-3 rounded-full bg-[var(--sombre)] text-[var(--sur-sombre)] px-5 py-3 text-[17px] font-bold">
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#E8835F]" />
            Facture remise pour votre mutuelle
          </p>
          <p className="text-lg leading-relaxed text-[var(--doux)] max-w-lg">
            Le même prix à 7 h et à 20 h. Carte bancaire, espèces ou chèque. La facture vous
            sert à demander une prise en charge à votre mutuelle, si votre contrat le prévoit.
          </p>
        </div>
        <Photographie photo={photos.table} sizes="(min-width: 1024px) 460px, 100vw" className="aspect-[4/5] max-h-[520px]" priority />
      </section>

      <section className="max-w-6xl mx-auto px-5 sm:px-6 pb-20 sm:pb-28 space-y-8" id="tarifs">
        <Intitule surtitre="Tous les tarifs" titre={<>Quatre lignes, <Serif>pas une de plus.</Serif></>} />
        <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
          {tarifs.map((t) => (
            <li key={t.nom} className="grid gap-1 py-5 sm:grid-cols-[1fr_auto_auto] sm:items-baseline sm:gap-8">
              <div>
                <p className="text-xl font-extrabold">{t.nom}</p>
                {t.note && <p className="text-[15px] text-[var(--doux)]">{t.note}</p>}
              </div>
              <p className="text-[var(--doux)] tabular-nums">{t.duree}</p>
              <p className="text-2xl font-extrabold tabular-nums">{t.prix}</p>
            </li>
          ))}
        </ul>
        <p className="text-sm text-[var(--doux)]">Prix d&apos;exemple, TTC. Le cabinet est fictif.</p>
      </section>

      <section className="bg-[var(--carte)] border-y border-[var(--trait)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-28 grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Intitule surtitre="Minute par minute" titre={<>Ce qui se passe <Serif>sur la table.</Serif></>}>
            Rien ne commence sans votre accord. Rien ne se fait sans être expliqué.
          </Intitule>
          <ol className="relative border-l-2 border-[var(--trait)] ml-3 space-y-10">
            {deroule.map((d) => (
              <li key={d.titre} className="pl-8 relative">
                <span aria-hidden="true" className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full bg-[var(--accent)]" />
                <p className="text-sm font-bold tabular-nums text-[var(--accent-texte)]">{d.minute} min</p>
                <h3 className="text-2xl font-extrabold tracking-[-0.02em] mt-1">{d.titre}</h3>
                <p className="mt-2 text-lg leading-relaxed text-[var(--doux)]">{d.texte}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-20 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-6">
          <Intitule surtitre="Questions" titre={<>Le prix, <Serif>la facture, l&apos;heure.</Serif></>} />
          <Link href={`${DOSSIER}/reserver`} className="inline-flex items-center min-h-12 rounded-full bg-[var(--encre)] text-[var(--fond)] px-6 font-extrabold">
            Réserver un créneau
          </Link>
        </div>
        <Questions max={3} />
      </section>

      <AppelFinal />
    </main>
  );
}
