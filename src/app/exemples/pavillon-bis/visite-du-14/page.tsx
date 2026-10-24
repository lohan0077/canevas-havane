import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import Creneaux from "../../_kit/Creneaux";
import { AppelFinal, EnTetePage, Surtitre, Titre } from "../_composants/Blocs";
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
  { quoi: "Les plans, avant et après", detail: "Posés sur la table du séjour : ce sont ceux de votre maison." },
];

export default function VisiteDu14() {
  return (
    <main>
      <EnTetePage surtitre={`${LOTISSEMENT.nom} · ${LOTISSEMENT.annee}`} titre={"Samedi, venez voir *le n° 14.*"}>
        La même maison que la vôtre, deuxième version. {VISITE.date}, {VISITE.heures}. Les propriétaires
        ont accepté d&apos;ouvrir leur porte : on visite par petits groupes.
      </EnTetePage>

      {/* ---------- 01. Le lotissement ---------- */}
      <section>
        <div className="mx-auto grid max-w-6xl gap-14 px-6 py-28 md:py-40 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="space-y-6 lg:sticky lg:top-28">
            <Apparition><Surtitre>01 — Le lotissement</Surtitre></Apparition>
            <Titre texte="Tu en transformes une. *Tous les voisins voient la leur.*" />
            <Apparition as="p" delai={150} className="max-w-[26rem] text-lg leading-relaxed text-[var(--doux)]">
              Trente-six maisons bâties en {LOTISSEMENT.annee}, sur le même plan. Touche le bouton : le n° 14
              change, et chaque voisin y voit la sienne.
            </Apparition>
          </div>
          {/* Sans apparition : le lotissement est filmé dès la première image. */}
          <Lotissement />
        </div>
      </section>

      {/* ---------- 02. Ce qu'on verra ---------- */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 py-28 md:py-40 lg:grid-cols-2 lg:items-center">
          <div className="space-y-8">
            <div className="space-y-5">
              <Surtitre clair>02 — Ce que vous verrez</Surtitre>
              <Titre texte="Trois choses, *en vingt minutes.*" clair />
            </div>
            <ol className="divide-y divide-white/20 border-y border-white/20">
              {PROGRAMME.map((p) => (
                <li key={p.quoi} className="space-y-1 py-5">
                  <span className="block font-[family-name:var(--titres)] text-[1.5rem] leading-tight">{p.quoi}</span>
                  <span className="block text-[17px]">{p.detail}</span>
                </li>
              ))}
            </ol>
          </div>
          <Apparition delai={150} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <figure className="space-y-2">
                <div className="overflow-hidden rounded-2xl bg-[#E8DCC6]">
                  <Maison modele="sous-sol" decor className="block h-auto w-full" libelle="Les voisins : un pavillon de 1976 sur sous-sol, garage en bas" />
                </div>
                <figcaption className="text-[15px]">Les voisins</figcaption>
              </figure>
              <figure className="space-y-2">
                <div className="overflow-hidden rounded-2xl bg-[#F6E2B8]">
                  <Maison modele="sous-sol" apres decor className="block h-auto w-full" libelle="Le n° 14 après : le sous-sol devenu séjour, une grande baie sur le jardin" />
                </div>
                <figcaption className="text-[15px]">Le n° 14</figcaption>
              </figure>
            </div>
            <Link href={`${DOSSIER}/projets/sous-sol-1976`} className="inline-block text-[15px] underline underline-offset-4">
              Le projet du n° 14, avec son budget
            </Link>
          </Apparition>
        </div>
      </section>

      {/* ---------- 03. Choisir une heure ---------- */}
      <section>
        <div className="mx-auto grid max-w-6xl gap-14 px-6 py-28 md:py-40 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6">
            <Apparition><Surtitre>03 — {VISITE.date}</Surtitre></Apparition>
            <Titre texte="Par *petits groupes.*" />
            <Apparition as="p" delai={150} className="max-w-[26rem] text-lg leading-relaxed text-[var(--doux)]">
              La maison est habitée : on la visite à quelques-uns, et l&apos;on respecte les pièces que ses
              propriétaires gardent fermées. Sur un vrai site, l&apos;adresse exacte n&apos;est envoyée qu&apos;aux
              personnes inscrites.
            </Apparition>
          </div>
          <Apparition delai={150} className="rounded-2xl border border-[var(--trait)] bg-[var(--carte)] p-5 sm:p-8">
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
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
