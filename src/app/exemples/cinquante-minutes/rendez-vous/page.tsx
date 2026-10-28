import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import SoutienPsy from "../_composants/SoutienPsy";
import TroisClics from "../_composants/TroisClics";
import { EnTetePage, Surtitre } from "../_composants/Blocs";
import { cabinet } from "../_composants/donnees";

// La page que la vidéo « Remplir l'agenda » filme : le rendez-vous en trois clics, et
// le motif de consultation barré. Rien n'est envoyé.
export const metadata: Metadata = {
  title: "Rendez-vous — Cinquante Minutes, site de démonstration",
  description:
    "Le rendez-vous en trois clics d'un cabinet de psychologue imaginaire : la séance, le jour, l'heure. On ne vous demande pas pourquoi vous venez.",
  ...adressesDeLaPage("/exemples/cinquante-minutes/rendez-vous"),
};

const A_SAVOIR = [
  ["Carte bancaire acceptée", "Espèces et virement aussi. Facture à chaque séance."],
  [`${cabinet.seance.prix} · ${cabinet.seance.duree}`, "La séance, prix d'exemple, le même à toute heure."],
  ["Annulation", "Jusqu'à 24 h avant, en appelant le cabinet."],
  ["Par téléphone", cabinet.telephone],
];

export default function RendezVous() {
  return (
    <main>
      <EnTetePage surtitre="Rendez-vous en ligne" titre="Trois clics. *Rien à expliquer.*">
        La séance, le jour, l&apos;heure. Puis un nom et un téléphone. On ne vous demande pas
        pourquoi vous venez : vous le direz en séance.
      </EnTetePage>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-8 md:py-24 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
        <div className="space-y-8 px-1 lg:sticky lg:top-28">
          <Apparition><Surtitre>À savoir</Surtitre></Apparition>
          <dl className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {A_SAVOIR.map(([titre, texte], i) => (
              <Apparition key={titre} delai={i * 90} className="py-4">
                <dt className="font-[family-name:var(--titres)] text-2xl italic">{titre}</dt>
                <dd className="mt-1 text-[var(--doux)] tabular-nums">{texte}</dd>
              </Apparition>
            ))}
          </dl>
          <Apparition delai={400} className="max-w-md rounded-[1.4rem] border border-[var(--trait)]">
            <SoutienPsy />
          </Apparition>
        </div>
        <div id="agenda" className="scroll-mt-24">
          <Apparition de="zoom">
            <TroisClics />
          </Apparition>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 md:pb-32">
        <Apparition className="grid gap-6 rounded-[2rem] border-2 border-[var(--encre)] p-7 sm:p-10 md:grid-cols-[auto_1fr] md:items-center md:gap-12">
          <p className="font-[family-name:var(--titres)] text-[clamp(3.4rem,8vw,6rem)] leading-none tabular-nums">15 · 3114</p>
          <div className="space-y-2">
            <TitreRevele as="h2" texte="Si c'est urgent, *n'attendez pas.*" className="text-3xl font-normal" classeAccent="italic text-[var(--accent-texte)]" />
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              Ne prenez pas rendez-vous : appelez le 15. Pour une pensée suicidaire, la vôtre ou
              celle d&apos;un proche : le 3114, numéro national de prévention du suicide, gratuit,
              jour et nuit.
            </p>
          </div>
        </Apparition>
      </section>
    </main>
  );
}
