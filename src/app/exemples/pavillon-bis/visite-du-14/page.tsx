import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import Creneaux from "../../_kit/Creneaux";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, EnTetePage, Surtitre } from "../_composants/Blocs";
import Lotissement from "../_composants/Lotissement";
import Maison from "../_composants/Maison";
import { DOSSIER, LOTISSEMENT, VISITE } from "../_composants/donnees";

// Le lotissement des Tilleuls (« dans un lotissement, toutes les maisons sont
// identiques : tu en transformes une, et tous les voisins voient la leur ») et le coup de
// lancement de la vidéo, « Samedi, venez voir le n° 14 ». Avec l'accord des
// propriétaires (C. civ., art. 9) ; une vraie date ; des groupes réduits parce que la
// maison est habitée — pas une fausse rareté.
export const metadata: Metadata = {
  title: "Samedi, le n° 14 — Pavillon Bis, site de démonstration",
  description: "Un lotissement de 1976, trente-six maisons identiques : on transforme le n° 14, et tous les voisins sont invités à le visiter, avec l'accord de ses propriétaires. Page de démonstration.",
  ...adressesDeLaPage("/exemples/pavillon-bis/visite-du-14"),
};

const PROGRAMME = [
  { quoi: "Le garage du sous-sol, devenu le séjour", detail: "Ouvert sur le jardin, de plain-pied, derrière une grande baie." },
  { quoi: "L'escalier intérieur", detail: "Celui qui manquait depuis 1976 entre les deux niveaux." },
  { quoi: "Les plans, avant et après", detail: "Posés sur la table du séjour : prenez-les en photo, ce sont ceux de votre maison." },
];

export default function VisiteDu14() {
  return (
    <main>
      <EnTetePage surtitre={`${LOTISSEMENT.nom} · ${LOTISSEMENT.annee}`} titre={"Samedi, venez voir *le n° 14.*"}>
        La même maison que la vôtre, deuxième version. {VISITE.date}, {VISITE.heures}. Les
        propriétaires ont accepté d&apos;ouvrir leur porte : on visite par petits groupes.
      </EnTetePage>

      {/* ---------- Le lotissement ---------- */}
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="space-y-7 lg:sticky lg:top-28">
          <Apparition><Surtitre className="text-[var(--doux)]">Le lotissement</Surtitre></Apparition>
          <TitreRevele
            texte="Tu en transformes une. *Tous les voisins voient la leur.*"
            className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5.2vw,4.4rem)] font-semibold leading-[0.95] tracking-[-0.04em]"
            classeAccent="italic font-normal text-[var(--accent-texte)]"
          />
          <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed text-[var(--doux)]">
            Trente-six maisons bâties en {LOTISSEMENT.annee}, sur le même plan. Touche le bouton : le
            n° 14 change, et chaque voisin y voit la sienne. Touche une maison : c&apos;est peut-être la tienne.
          </Apparition>
        </div>
        <Apparition de="zoom">
          <Lotissement />
        </Apparition>
      </section>

      {/* ---------- Ce qu'on verra ---------- */}
      <section className="px-3 sm:px-5">
        <div className="overflow-hidden rounded-[2.5rem] bg-[#A63F2A] text-[#F4EFE6]">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-10 md:py-28 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="space-y-7">
              <Surtitre>Ce que vous verrez</Surtitre>
              <TitreRevele
                texte="Trois choses, *en vingt minutes.*"
                className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5.2vw,4.4rem)] font-semibold leading-[0.95] tracking-[-0.04em]"
                classeAccent="italic font-normal"
              />
              <ol className="divide-y divide-white/25 border-y border-white/25">
                {PROGRAMME.map((p, i) => (
                  <Apparition as="li" key={p.quoi} delai={i * 120} className="grid grid-cols-[3rem_1fr] gap-4 py-6">
                    <span className="font-[family-name:var(--titres)] text-[2.2rem] italic leading-none">{i + 1}</span>
                    <span>
                      <span className="block font-[family-name:var(--titres)] text-[1.5rem] font-semibold leading-tight">{p.quoi}</span>
                      <span className="block text-lg">{p.detail}</span>
                    </span>
                  </Apparition>
                ))}
              </ol>
            </div>
            <Apparition de="droite" className="grid grid-cols-2 gap-3 rounded-[2rem] bg-[#F4EFE6] p-4 text-[#26322C]">
              <figure>
                <div className="overflow-hidden rounded-[1.4rem] bg-[#E8DCC6]">
                  <Maison modele="sous-sol" decor className="block h-auto w-full" libelle="Les voisins : un pavillon de 1976 sur sous-sol, garage en bas" />
                </div>
                <figcaption className="mt-2 text-center text-[15px] font-semibold">Les voisins</figcaption>
              </figure>
              <figure>
                <div className="overflow-hidden rounded-[1.4rem] bg-[#F6E2B8]">
                  <Maison modele="sous-sol" apres decor className="block h-auto w-full" libelle="Le n° 14 après : le sous-sol devenu séjour, une grande baie sur le jardin" />
                </div>
                <figcaption className="mt-2 text-center text-[15px] font-semibold">Le n° 14</figcaption>
              </figure>
              <Link href={`${DOSSIER}/projets/sous-sol-1976`} className="col-span-2 rounded-full bg-[#26322C] px-5 py-3 text-center text-[15px] font-semibold text-[#F4EFE6]">
                Le projet du n° 14, avec son budget →
              </Link>
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Choisir une heure ---------- */}
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-6">
          <Apparition><Surtitre className="text-[var(--doux)]">{VISITE.date}</Surtitre></Apparition>
          <TitreRevele
            texte="Par *petits groupes.*"
            className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5.2vw,4.4rem)] font-semibold leading-[0.95] tracking-[-0.04em]"
            classeAccent="italic font-normal text-[var(--accent-texte)]"
          />
          <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed text-[var(--doux)]">
            La maison est habitée : on la visite à quelques-uns, et l&apos;on respecte les pièces que ses
            propriétaires gardent fermées. Sur un vrai site, l&apos;adresse exacte n&apos;est envoyée
            qu&apos;aux personnes inscrites.
          </Apparition>
        </div>
        <Apparition de="zoom" className="rounded-[2.5rem] border border-[var(--trait)] bg-[var(--carte)] p-5 sm:p-8">
          <Creneaux
            creneaux={VISITE.creneaux}
            colonnes={3}
            titreCarte="Votre visite du n° 14"
            bouton="Je viens"
            confirmation="C'est noté : samedi, {creneau}. On vous attend au n° 14."
            note="Heures d'exemple : la visite est imaginaire, comme le lotissement."
            libellePris="Complet"
          />
        </Apparition>
      </section>

      <AppelFinal />
    </main>
  );
}
