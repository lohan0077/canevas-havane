import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, EnTetePage } from "../_composants/Blocs";
import ListeNon from "../_composants/ListeNon";
import { DOSSIER, jeFais, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Ce que je ne fais pas — Le Pourquoi, site de démonstration",
  description:
    "La page la plus importante du site d'un cabinet d'ostéopathie imaginaire : ce que l'ostéopathe ne fait pas, comme tout ostéopathe, et pourquoi.",
  ...adressesDeLaPage("/exemples/le-pourquoi/ce-que-je-ne-fais-pas"),
};

export default function CeQueJeNeFaisPas() {
  return (
    <main>
      <EnTetePage surtitre="Comme tout ostéopathe — décret n° 2007-435" titre="Ce que je ne fais *pas.*">
        Touchez une ligne : elle dit pourquoi, et quel texte le prévoit.
      </EnTetePage>

      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto max-w-5xl px-5 pb-24 sm:px-8 md:pb-32">
          <ListeNon detail />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 md:py-36 lg:grid-cols-2 lg:items-center">
        <div className="space-y-8">
          <TitreRevele
            texte="Une limite dite, *c'est une surprise de moins.*"
            className="text-[clamp(2.6rem,5vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.045em]"
            classeAccent="font-[family-name:var(--texte)] italic font-normal text-[var(--accent-texte)]"
          />
          <Apparition as="p" className="text-xl leading-relaxed text-[var(--doux)]">
            Ces trois lignes ne sont pas un engagement propre au cabinet : elles valent pour tous les
            ostéopathes. Mais on les lit rarement avant la première séance. Les voici en premier.
          </Apparition>
          <ol className="space-y-4">
            {jeFais.map((j, i) => (
              <Apparition as="li" key={j} delai={i * 110} className="flex gap-4 text-lg leading-relaxed">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--sombre)] font-[family-name:var(--titres)] text-sm font-semibold text-[var(--sur-sombre)] tabular-nums">{i + 1}</span>
                <span className="pt-1">{j}</span>
              </Apparition>
            ))}
          </ol>
        </div>
        <Apparition de="rideau" className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem]">
          <Image src={photos.omoplate.src} alt={photos.omoplate.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </Apparition>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-24 sm:px-8 md:grid-cols-3">
        {[
          { titre: "Code de la consommation", ref: "Art. L121-4, 16°", texte: "Affirmer faussement qu'une prestation guérit des maladies est une pratique commerciale réputée trompeuse." },
          { titre: "Décret n° 2007-435", ref: "Art. 2", texte: "Quand les symptômes le nécessitent, l'ostéopathe oriente le patient vers un médecin." },
          { titre: "Décret n° 2007-435", ref: "Art. 3, II", texte: "Nourrisson de moins de six mois : seulement après un diagnostic médical attestant l'absence de contre-indication." },
        ].map((s, i) => (
          <Apparition as="article" key={s.ref} delai={i * 120} className="space-y-3 rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] p-7">
            <p className="font-[family-name:var(--titres)] text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-texte)]">{s.ref}</p>
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">{s.titre}</h2>
            <p className="leading-relaxed text-[var(--doux)]">{s.texte}</p>
          </Apparition>
        ))}
        <p className="text-sm text-[var(--doux)] md:col-span-3">
          Résumés des textes, à lire en entier sur Légifrance.{" "}
          <Link href={`${DOSSIER}/seance-et-prix`} className="font-semibold underline underline-offset-4">Voir la séance et le prix</Link>.
        </p>
      </section>

      <AppelFinal />
    </main>
  );
}
