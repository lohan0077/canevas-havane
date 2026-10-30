import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { AppelFinal, Bouton, EnTetePage, Surtitre, Titre } from "../_composants/Blocs";
import { DOSSIER, POMPES, VISITE, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Nos pompes à chaleur — L'Heure Dite, site de démonstration",
  description:
    "Air / eau, air / air, chauffe-eau thermodynamique : ce que chaque pompe à chaleur change chez toi, comment on la pose, et ce qu'elle coûte (prix d'exemple, TTC). Site de démonstration.",
  ...adressesDeLaPage("/exemples/l-heure-dite/pompes-a-chaleur"),
};

const CHEZ_TOI = [
  ["Tes radiateurs ou ton plancher restent", "La chaudière s'en va", "L'unité extérieure se pose contre un mur ou au sol"],
  ["Des unités murales dans les pièces de vie", "Pas de circuit d'eau à créer", "Une unité extérieure pour plusieurs pièces"],
  ["Il remplace un ballon électrique", "Il lui faut une pièce assez grande ou une gaine", "Il s'installe en une journée (exemple)"],
];

const DEROULE = [
  { quand: "À l'heure que tu as dite", quoi: "Le premier appel : ta maison, ton chauffage, ce que tu veux changer." },
  { quand: "Sous dix jours (exemple)", quoi: "La visite : déperditions, émetteurs, place de l'unité, tableau électrique." },
  { quand: "Après la visite", quoi: "Le devis écrit, avec le prix ferme, et notre qualification RGE dite par écrit avant toute signature." },
  { quand: "Le jour de la pose", quoi: "Un à trois jours selon la pompe (exemple). On met en service, et on t'explique les réglages." },
];

export default function PompesAChaleur() {
  return (
    <main>
      <EnTetePage surtitre="Nos pompes à chaleur" titre="De la chaleur *prise dehors.*" photo={photos.unite} origine="70% 40%">
        Une pompe à chaleur prend les calories de l&apos;air extérieur, même froid, et les fait entrer chez toi. Il y en a
        trois sortes ; la bonne dépend de ta maison, pas d&apos;un catalogue.
      </EnTetePage>

      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
          {POMPES.map((p, i) => (
            <Apparition as="li" key={p.nom} className="grid gap-6 py-10 md:grid-cols-[0.8fr_1.2fr_auto] md:items-start">
              <div className="space-y-2">
                <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--doux)]">{String(i + 1).padStart(2, "0")}</p>
                <h2 className="font-[family-name:var(--titres)] text-[clamp(1.9rem,3.2vw,2.75rem)] font-bold leading-[1.05] tracking-[-0.035em]">{p.nom}</h2>
                <p className="font-[family-name:var(--titres)] text-xl font-semibold tracking-[-0.02em] text-[var(--accent-texte)]">{p.phrase}</p>
              </div>
              <div className="space-y-3">
                <p className="text-lg leading-relaxed">{p.texte}</p>
                <ul className="space-y-1.5 text-[var(--doux)]">
                  {CHEZ_TOI[i].map((x) => (
                    <li key={x} className="flex gap-3"><span aria-hidden="true" className="mt-3 h-px w-4 shrink-0 bg-[var(--encre)]" />{x}</li>
                  ))}
                </ul>
              </div>
              <p className="md:text-right">
                <span className="text-sm">À partir de</span>
                <span className="block whitespace-nowrap font-[family-name:var(--titres)] text-4xl font-extrabold tracking-[-0.03em] tabular-nums">{p.prix}</span>
                <span className="block text-sm text-[var(--doux)]">TTC, pose comprise · exemple</span>
              </p>
            </Apparition>
          ))}
        </ul>
        <p className="max-w-2xl pt-8 text-[15px] leading-relaxed text-[var(--doux)]">
          Prix d&apos;exemple, avant toute aide : on ne t&apos;en promet aucune et ce site n&apos;en chiffre aucune. Les aides changent et
          dépendent de ta situation ; France Rénov&apos;, le service public, t&apos;informe gratuitement (le lien est en haut de la page).
        </p>
      </section>

      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 py-28 md:py-40 lg:grid-cols-2 lg:items-start">
          <div className="space-y-6">
            <Apparition><Surtitre clair>À la visite</Surtitre></Apparition>
            <Titre texte="On mesure *avant de proposer.*" clair />
          </div>
          <ul className="divide-y divide-white/15 border-y border-white/15 text-lg">
            {VISITE.map((v, i) => (
              <Apparition as="li" key={v} delai={i * 80} className="py-3.5">{v}</Apparition>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-14 px-6 py-28 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-40">
        <div className="space-y-8">
          <div className="space-y-5">
            <Apparition><Surtitre>Comment ça se passe</Surtitre></Apparition>
            <Titre texte="De ton appel à ta première *soirée au chaud.*" />
          </div>
          <ol className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {DEROULE.map((d, i) => (
              <Apparition as="li" key={d.quand} delai={i * 120} className="space-y-1 py-5">
                <h3 className="font-[family-name:var(--titres)] text-xl font-bold tracking-[-0.025em]">{d.quand}</h3>
                <p className="leading-relaxed text-[var(--doux)]">{d.quoi}</p>
              </Apparition>
            ))}
          </ol>
          <Bouton href={`${DOSSIER}/rendez-vous`}>Choisir mon heure</Bouton>
        </div>
        <Apparition className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-[var(--sombre)]">
          <Image src={photos.fauteuil.src} alt={photos.fauteuil.alt} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
        </Apparition>
      </section>

      <AppelFinal />
    </main>
  );
}
