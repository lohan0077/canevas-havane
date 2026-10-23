import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { ACCENT_CLAIR, AppelFinal, Bouton, EnTetePage, Surtitre } from "../_composants/Blocs";
import { DOSSIER, POMPES, photos } from "../_composants/donnees";

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
        Une pompe à chaleur prend les calories de l&apos;air extérieur, même froid, et les fait entrer chez toi. Il
        y en a trois sortes ; la bonne dépend de ta maison, pas d&apos;un catalogue.
      </EnTetePage>

      <section className="mx-auto max-w-7xl space-y-4 px-5 py-20 sm:px-8 md:py-28">
        {POMPES.map((p, i) => (
          <Apparition
            as="article"
            key={p.nom}
            de="zoom"
            className="grid gap-6 rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] p-7 sm:p-10 md:grid-cols-[0.8fr_1.2fr_auto] md:items-start"
          >
            <div className="space-y-2">
              <p aria-hidden="true" className="font-[family-name:var(--titres)] text-5xl text-[var(--accent-texte)]">0{i + 1}</p>
              <h2 className="font-[family-name:var(--titres)] text-4xl">{p.nom}</h2>
              <p className="font-[family-name:var(--titres)] text-xl italic text-[var(--accent-texte)]">{p.phrase}</p>
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
              <span className="block whitespace-nowrap font-[family-name:var(--titres)] text-5xl tabular-nums">{p.prix}</span>
              <span className="block text-sm text-[var(--doux)]">TTC, pose comprise · exemple</span>
            </p>
          </Apparition>
        ))}
        <p className="max-w-2xl pt-6 text-[15px] leading-relaxed text-[var(--doux)]">
          Prix d&apos;exemple, avant toute aide : on ne t&apos;en promet aucune et ce site n&apos;en chiffre aucune. Les aides
          changent et dépendent de ta situation ; France Rénov&apos;, le service public, t&apos;informe gratuitement (le
          lien est en haut de la page).
        </p>
      </section>

      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-28">
          <div className="space-y-8">
            <Apparition><Surtitre>Comment ça se passe</Surtitre></Apparition>
            <TitreRevele
              texte="De ton appel à ta première *soirée au chaud.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.4rem,4.8vw,4.4rem)] leading-[0.98] tracking-[-0.03em]"
              classeAccent={ACCENT_CLAIR}
            />
            <ol className="relative space-y-8 border-l border-[var(--encre)] pl-7">
              {DEROULE.map((d, i) => (
                <Apparition as="li" key={d.quand} delai={i * 120} className="relative space-y-1">
                  <span aria-hidden="true" className="absolute -left-[34px] top-2 h-3 w-3 rounded-full bg-[var(--accent)]" />
                  <h3 className="font-[family-name:var(--titres)] text-2xl">{d.quand}</h3>
                  <p className="leading-relaxed text-[var(--doux)]">{d.quoi}</p>
                </Apparition>
              ))}
            </ol>
            <Bouton href={`${DOSSIER}/rendez-vous`} variante="nuit">Choisir mon heure</Bouton>
          </div>
          <Apparition de="zoom" className="relative aspect-[2/3] overflow-hidden [border-radius:50%_50%_2rem_2rem/34%_34%_2rem_2rem] bg-[var(--sombre)]">
            <Image src={photos.fauteuil.src} alt={photos.fauteuil.alt} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
          </Apparition>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
