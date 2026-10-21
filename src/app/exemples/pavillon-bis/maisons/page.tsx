import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { Intitule, Section } from "../_composants/Blocs";
import Maison from "../_composants/Maison";
import { DOSSIER, MODELES } from "../_composants/donnees";

// Les trois maisons des années 70, une par une : avant, après, ce qui a changé, le budget
// et la durée — des projets d'exemple, dessinés (aucune vraie maison, aucune adresse).
export const metadata: Metadata = {
  title: "Les trois maisons — Pavillon Bis, site de démonstration",
  description: "Plain-pied, sur sous-sol, à étage : les trois pavillons des années 70, avant et après. Projets d'exemple d'une agence d'architecture imaginaire.",
  ...adressesDeLaPage("/exemples/pavillon-bis/maisons"),
};

export default function Maisons() {
  return (
    <main>
      <Section className="space-y-6 pb-8">
        <Intitule niveau={1} surtitre="Les trois maisons" titre="Avant, après. La même maison.">
          Trois pavillons qu&apos;on retrouve dans tous les lotissements des années 70. Pour chacun,
          un projet d&apos;exemple : ce qu&apos;il était, ce qu&apos;il est devenu, ce que ça a coûté.
        </Intitule>
      </Section>

      {MODELES.map((m, i) => (
        <section key={m.id} id={m.id} className={`scroll-mt-20 ${i % 2 ? "bg-[var(--carte)]" : ""}`}>
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="grid grid-cols-2 gap-3">
              <figure className="space-y-2 rounded-[22px] border-2 border-[var(--encre)] bg-[var(--fond)] p-3">
                <Maison modele={m.id} className="block h-auto w-full" libelle={`${m.nom}, avant : ${m.avant.texte}`} />
                <figcaption className="text-[13px] font-bold uppercase tracking-[0.12em] text-[var(--accent-texte)]">Avant · {m.avant.annee}</figcaption>
              </figure>
              <figure className="space-y-2 rounded-[22px] border-2 border-[var(--encre)] bg-[var(--fond)] p-3">
                <Maison modele={m.id} apres className="block h-auto w-full" libelle={`${m.nom}, après : ${m.apres}`} />
                <figcaption className="text-[13px] font-bold uppercase tracking-[0.12em] text-[var(--accent-texte)]">Après</figcaption>
              </figure>
            </div>
            <div className="space-y-4">
              <h2 className="text-[38px] font-extrabold tracking-[-0.03em] sm:text-5xl">{m.nom}</h2>
              <p className="text-[18px] leading-relaxed">
                <strong>Avant :</strong> {m.avant.texte}. <strong>Après :</strong> {m.apres}.
              </p>
              <ul className="space-y-2">
                {m.detail.map((d) => (
                  <li key={d} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--accent-texte)]" />
                    {d}
                  </li>
                ))}
              </ul>
              <p className="inline-flex flex-wrap gap-x-4 gap-y-1 rounded-2xl bg-[var(--sombre)] px-4 py-2.5 font-[family-name:var(--titres)] font-bold text-[var(--sur-sombre)]">
                <span>{m.budget}</span><span>{m.duree}</span><span className="font-normal">projet d&apos;exemple</span>
              </p>
            </div>
          </div>
        </section>
      ))}

      <Section className="space-y-4">
        <p className="max-w-3xl leading-relaxed text-[var(--doux)]">
          Budgets de travaux TTC d&apos;exemple, honoraires d&apos;architecte en plus, annoncés avant tout
          engagement. Dessins d&apos;exemple : sur un vrai site, chaque avant / après est publié avec
          l&apos;accord écrit des propriétaires, sans adresse ni détail qui permette de les reconnaître.
        </p>
        <Link href={`${DOSSIER}#ta-maison`} className="inline-flex min-h-[54px] items-center rounded-full bg-[var(--accent)] px-7 font-[family-name:var(--titres)] text-[17px] font-bold text-[var(--sur-accent)]">
          Trouver la tienne
        </Link>
      </Section>
    </main>
  );
}
