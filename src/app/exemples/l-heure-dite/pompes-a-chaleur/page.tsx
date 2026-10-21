import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, POMPES, photos } from "../_composants/donnees";
import { AppelFinal, Section, Surtitre } from "../_composants/Blocs";

export const metadata: Metadata = {
  title: "Nos pompes à chaleur · L'Heure Dite — site de démonstration",
  description: "Air / eau, air / air, chauffe-eau thermodynamique : ce que chaque pompe à chaleur change chez toi, comment on la pose, et ce qu'elle coûte (prix d'exemple, TTC).",
  ...adressesDeLaPage("/exemples/l-heure-dite/pompes-a-chaleur"),
};

const CHEZ_TOI = [
  ["Air / eau", ["Tes radiateurs ou ton plancher restent", "La chaudière s'en va", "L'unité extérieure se pose contre un mur ou au sol"]],
  ["Air / air", ["Des unités murales dans les pièces de vie", "Pas de circuit d'eau à créer", "Une unité extérieure pour plusieurs pièces"]],
  ["Chauffe-eau thermodynamique", ["Il remplace un ballon électrique", "Il lui faut une pièce assez grande ou une gaine", "Il s'installe en une journée (exemple)"]],
] as const;

const DEROULE = [
  { quand: "À l'heure que tu as dite", quoi: "Le premier appel : ta maison, ton chauffage, ce que tu veux changer." },
  { quand: "Sous dix jours (exemple)", quoi: "La visite : déperditions, émetteurs, place de l'unité, tableau électrique." },
  { quand: "Après la visite", quoi: "Le devis écrit, avec le prix ferme, et notre qualification RGE dite par écrit avant toute signature." },
  { quand: "Le jour de la pose", quoi: "Un à trois jours selon la pompe (exemple). On met en service, et on t'explique les réglages." },
];

export default function PompesAChaleur() {
  return (
    <>
      <Section className="grid gap-10 md:grid-cols-2 md:items-end">
        <div className="space-y-5">
          <Surtitre>Nos pompes à chaleur</Surtitre>
          <h1 className="text-[52px] sm:text-7xl font-normal tracking-[-0.03em]">De la chaleur prise dehors.</h1>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Une pompe à chaleur prend les calories de l'air extérieur, même froid, et les fait
            entrer chez toi. Il y en a trois sortes&nbsp;; la bonne dépend de ta maison, pas d'un
            catalogue.
          </p>
        </div>
        <div className="relative aspect-[3/2] overflow-hidden rounded-[30px]">
          <Image src={photos.unite.src} alt={photos.unite.alt} fill priority sizes="(min-width: 768px) 560px, 100vw" className="object-cover" />
        </div>
      </Section>

      <div className="bg-[var(--carte)] border-y border-[var(--trait)]">
        <Section className="space-y-6">
          {POMPES.map((p, i) => (
            <article key={p.nom} className="grid gap-6 border-t border-[var(--trait)] pt-8 md:grid-cols-[0.8fr_1.2fr_auto] md:items-start">
              <div className="space-y-2">
                <p className="text-sm text-[var(--doux)] tabular-nums">0{i + 1}</p>
                <h2 className="text-4xl font-normal">{p.nom}</h2>
                <p className="font-[family-name:var(--titres)] italic text-xl text-[var(--accent-texte)]">{p.phrase}</p>
              </div>
              <div className="space-y-3">
                <p className="text-lg leading-relaxed">{p.texte}</p>
                <ul className="space-y-1.5 text-[var(--doux)]">
                  {CHEZ_TOI[i][1].map((x) => (
                    <li key={x} className="flex gap-3"><span aria-hidden="true" className="mt-3 h-px w-4 shrink-0 bg-[var(--encre)]" />{x}</li>
                  ))}
                </ul>
              </div>
              <p className="md:text-right">
                <span className="text-sm">À partir de</span>
                <span className="block font-[family-name:var(--titres)] text-5xl tabular-nums whitespace-nowrap">{p.prix}</span>
                <span className="block text-sm text-[var(--doux)]">TTC, pose comprise · exemple</span>
              </p>
            </article>
          ))}
          <p className="pt-6 text-[15px] leading-relaxed text-[var(--doux)] max-w-2xl">
            Prix d'exemple, avant toute aide&nbsp;: on ne t'en promet aucune et ce site n'en chiffre aucune.
            Les aides changent et dépendent de ta situation&nbsp;; France Rénov', le service public, t'informe
            gratuitement (le lien est en haut de la page).
          </p>
        </Section>
      </div>

      <Section className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-start">
        <div className="space-y-8">
          <div className="space-y-3">
            <Surtitre>Comment ça se passe</Surtitre>
            <h2 className="text-[44px] sm:text-6xl font-normal tracking-[-0.02em]">De ton appel à ta première soirée au chaud.</h2>
          </div>
          <ol className="relative space-y-8 border-l border-[var(--encre)] pl-7">
            {DEROULE.map((d) => (
              <li key={d.quand} className="relative space-y-1">
                <span aria-hidden="true" className="absolute -left-[34px] top-2 h-3 w-3 rounded-full bg-[var(--accent)]" />
                <h3 className="text-2xl">{d.quand}</h3>
                <p className="leading-relaxed text-[var(--doux)]">{d.quoi}</p>
              </li>
            ))}
          </ol>
          <Link href={`${DOSSIER}/rendez-vous`} className="inline-flex h-14 items-center justify-center rounded-full bg-[var(--sombre)] px-8 text-lg font-semibold text-[var(--sur-sombre)]">
            Choisir mon heure
          </Link>
        </div>
        <div className="relative aspect-[2/3] overflow-hidden rounded-t-full">
          <Image src={photos.fauteuil.src} alt={photos.fauteuil.alt} fill sizes="(min-width: 768px) 440px, 100vw" className="object-cover" />
        </div>
      </Section>

      <AppelFinal />
    </>
  );
}
