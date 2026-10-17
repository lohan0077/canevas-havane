import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { AppelFinal, Intitule, ListeNon, Photographie, Serif } from "../_composants/Blocs";
import { DOSSIER, jeFais, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Ce que je ne fais pas — Sans Détour, site de démonstration",
  description:
    "La page la plus importante du site d'un ostéopathe imaginaire : ce qu'il ne fait pas, comme tout ostéopathe, et pourquoi.",
  ...adressesDeLaPage("/exemples/sans-detour/ce-que-je-ne-fais-pas"),
};

export default function CeQueJeNeFaisPas() {
  return (
    <main>
      <section className="px-3 sm:px-6 pt-3 sm:pt-6">
        <div className="max-w-6xl mx-auto rounded-[32px] bg-[var(--sombre)] text-[var(--sur-sombre)] px-5 pt-10 pb-12 sm:px-12 sm:py-20 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Intitule niveau={1} clair surtitre="Comme tout ostéopathe — décret n° 2007-435" titre={<>Ce que je ne fais <Serif>pas.</Serif></>}>
            Touchez une ligne : elle dit pourquoi, et quel texte le prévoit.
          </Intitule>
          <ListeNon detail />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-28 grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="space-y-8">
          <Intitule surtitre="Pourquoi les écrire" titre={<>Une limite dite, <Serif>c&apos;est une surprise de moins.</Serif></>}>
            <p>
              Ces trois lignes ne sont pas un engagement propre au cabinet : elles valent pour
              tous les ostéopathes. Mais on les lit rarement avant la première séance. Les
              voici en premier.
            </p>
          </Intitule>
          <ul className="space-y-4">
            {jeFais.map((j, i) => (
              <li key={j} className="flex gap-4 text-lg leading-relaxed">
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-[var(--encre)] text-sm font-extrabold tabular-nums">{i + 1}</span>
                {j}
              </li>
            ))}
          </ul>
        </div>
        <Photographie photo={photos.epaule} sizes="(min-width: 1024px) 560px, 100vw" className="aspect-[4/5]" />
      </section>

      <section className="max-w-6xl mx-auto px-5 sm:px-6 pb-20 grid gap-6 md:grid-cols-3">
        {[
          { titre: "Code de la consommation", ref: "Art. L121-4, 16°", texte: "Affirmer faussement qu'une prestation guérit des maladies est une pratique commerciale réputée trompeuse." },
          { titre: "Décret n° 2007-435", ref: "Art. 2", texte: "Quand les symptômes le nécessitent, l'ostéopathe oriente le patient vers un médecin." },
          { titre: "Décret n° 2007-435", ref: "Art. 3, II", texte: "Nourrisson de moins de six mois : seulement après un diagnostic médical attestant l'absence de contre-indication." },
        ].map((s) => (
          <article key={s.ref} className="rounded-[24px] bg-[var(--carte)] border border-[var(--trait)] p-6 space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">{s.ref}</p>
            <h2 className="text-xl font-extrabold">{s.titre}</h2>
            <p className="leading-relaxed text-[var(--doux)]">{s.texte}</p>
          </article>
        ))}
        <p className="md:col-span-3 text-sm text-[var(--doux)]">
          Résumés des textes, à lire en entier sur Légifrance. <Link href={`${DOSSIER}/seance-et-prix`} className="font-bold underline underline-offset-4">Voir la séance et le prix</Link>.
        </p>
      </section>

      <AppelFinal />
    </main>
  );
}
