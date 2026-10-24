import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { AppelFinal, EnTetePage, Surtitre, Titre } from "../_composants/Blocs";
import ListeNon from "../_composants/ListeNon";
import { DOSSIER, jeFais, photos } from "../_composants/donnees";

// La page que la vidéo « Remplir l'agenda » filme : chaque ligne s'ouvre sur son texte
// (#non-guerir, #non-medecin, #non-bebe).
export const metadata: Metadata = {
  title: "Ce que je ne fais pas — Le Pourquoi, site de démonstration",
  description:
    "La page la plus importante du site d'un cabinet d'ostéopathie imaginaire : ce que l'ostéopathe ne fait pas, comme tout ostéopathe, et pourquoi.",
  ...adressesDeLaPage("/exemples/le-pourquoi/ce-que-je-ne-fais-pas"),
};

const TEXTES = [
  { titre: "Code de la consommation", ref: "Art. L121-4, 16°", texte: "Affirmer faussement qu'une prestation guérit des maladies est une pratique commerciale réputée trompeuse." },
  { titre: "Décret n° 2007-435", ref: "Art. 2", texte: "Quand les symptômes le nécessitent, l'ostéopathe oriente le patient vers un médecin." },
  { titre: "Décret n° 2007-435", ref: "Art. 3, II", texte: "Nourrisson de moins de six mois : seulement après un diagnostic médical attestant l'absence de contre-indication." },
];

export default function CeQueJeNeFaisPas() {
  return (
    <main>
      <EnTetePage surtitre="Comme tout ostéopathe — décret n° 2007-435" titre="Ce que je ne fais *pas.*">
        Touchez une ligne : elle dit pourquoi, et quel texte le prévoit.
      </EnTetePage>

      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto max-w-6xl px-6 pb-28 md:pb-40">
          <ListeNon detail />
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-6xl gap-14 px-6 py-28 md:py-40 lg:grid-cols-2 lg:items-center">
          <div className="space-y-8">
            <Apparition><Surtitre>Ce que je fais</Surtitre></Apparition>
            <Titre texte="Une limite dite, *c'est une surprise de moins.*" />
            <Apparition as="p" className="max-w-[26rem] text-lg leading-relaxed text-[var(--doux)]">
              Ces trois lignes valent pour tous les ostéopathes. Mais on les lit rarement avant la
              première séance. Les voici en premier, et ce que je fais à la place.
            </Apparition>
            <ol className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
              {jeFais.map((j, i) => (
                <Apparition as="li" key={j} delai={i * 90} className="flex gap-5 py-4 text-lg leading-relaxed">
                  <span className="w-6 shrink-0 pt-1 text-[13px] font-medium tabular-nums text-[var(--doux)]">0{i + 1}</span>
                  <span>{j}</span>
                </Apparition>
              ))}
            </ol>
          </div>
          <Apparition className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image src={photos.omoplate.src} alt={photos.omoplate.alt} fill sizes="(min-width: 1024px) 540px, 100vw" className="object-cover" />
          </Apparition>
        </div>
      </section>

      <section className="bg-[var(--carte)]">
        <div className="mx-auto max-w-6xl space-y-14 px-6 py-28 md:py-40">
          <div className="space-y-5">
            <Apparition><Surtitre>Les textes</Surtitre></Apparition>
            <Titre texte="Trois lignes, *trois textes.*" />
          </div>
          <ul className="grid gap-6 md:grid-cols-3">
            {TEXTES.map((s, i) => (
              <Apparition as="li" key={s.ref} delai={i * 120} className="space-y-3 border-t border-[var(--encre)] pt-6">
                <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--accent-texte)]">{s.ref}</p>
                <h2 className="text-2xl font-normal">{s.titre}</h2>
                <p className="leading-relaxed text-[var(--doux)]">{s.texte}</p>
              </Apparition>
            ))}
          </ul>
          <p className="text-[15px] text-[var(--doux)]">
            Résumés des textes, à lire en entier sur Légifrance.{" "}
            <Link href={`${DOSSIER}/seance-et-prix`} className="underline underline-offset-4">Voir la séance et le prix</Link>.
          </p>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
