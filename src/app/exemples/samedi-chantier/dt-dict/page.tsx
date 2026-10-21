import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER } from "../_composants/donnees";
import { Repere, Titre } from "../_composants/Blocs";
import ChecklistDict from "../_composants/ChecklistDict";

// « Avant de creuser : ta DT-DICT, on t'aide. » Ce que c'est, qui la fait (les
// particuliers aussi), où (le téléservice « Réseaux et canalisations », ou la mairie),
// et ce qu'il faut avoir sous la main. Aucun délai n'est affirmé : il se lit sur le
// téléservice officiel. Voir Videos/agenda-loueurs/SOURCES.md.
export const metadata: Metadata = {
  title: "DT-DICT · Samedi Chantier — site de démonstration",
  description: "Avant de creuser, la déclaration aux exploitants de réseaux : ce que c'est, qui la fait, ce qu'il faut pour la remplir. Site de démonstration.",
  ...adressesDeLaPage("/exemples/samedi-chantier/dt-dict"),
};

const ETAPES = [
  { titre: "Tu nous appelles", texte: "Avec ton adresse et le tracé de ta tranchée. Un quart d'heure suffit." },
  { titre: "On la remplit ensemble", texte: "Sur le téléservice « Réseaux et canalisations », le guichet unique de la DT-DICT. Sans internet, elle se dépose aussi en mairie." },
  { titre: "Les exploitants répondent", texte: "Chacun dit où passent ses réseaux et ce qu'il faut respecter. On attend leurs réponses avant de creuser." },
  { titre: "On livre", texte: "Les réponses sont là, la machine arrive. Si elles tardent, on décale ta location sans frais (exemple)." },
];

export default function DtDict() {
  return (
    <div>
      <section className="max-w-6xl mx-auto px-5 pt-10 pb-14 sm:pt-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="space-y-5">
          <Repere numero="05">Avant de creuser</Repere>
          <Titre niveau={1}>Ta DT-DICT&nbsp;: <span className="text-[var(--accent-texte)]">on t&apos;aide.</span></Titre>
          <p className="text-lg leading-relaxed">
            Gaz, électricité, eau, fibre : sous un jardin, il passe souvent plus de choses qu&apos;on ne croit.
            Avant de creuser, on déclare les travaux à ceux qui exploitent ces réseaux, pour qu&apos;ils disent où
            ils passent.
          </p>
          <div className="rounded-[18px] border border-[var(--encre)] bg-[var(--accent)] p-5 space-y-2">
            <p className="font-[family-name:var(--titres)] text-2xl font-black uppercase">Particuliers compris.</p>
            <p className="leading-relaxed">La déclaration ne vise pas que les entreprises : celui qui creuse chez lui la fait aussi.</p>
          </div>
        </div>
        <ChecklistDict />
      </section>

      <section className="bg-[var(--carte)] border-y border-[var(--encre)]">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-24 space-y-10">
          <Titre>Comment ça se passe</Titre>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ETAPES.map((e, i) => (
              <li key={e.titre} className="rounded-[18px] border border-[var(--encre)] p-5 space-y-2">
                <p className="font-[family-name:var(--titres)] text-4xl font-black tabular-nums text-[var(--accent-texte)]">{String(i + 1).padStart(2, "0")}</p>
                <h2 className="text-xl font-black uppercase">{e.titre}</h2>
                <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-5 py-16 sm:py-20 space-y-5">
        <h2 className="text-2xl font-black uppercase">Pourquoi on insiste</h2>
        <p className="leading-relaxed">
          Parce qu&apos;un godet qui accroche un câble ou une conduite, c&apos;est dangereux, et ça transforme un
          samedi en semaine de galère. La déclaration prend un quart d&apos;heure ; on préfère la faire avec toi
          que de te laisser deviner.
        </p>
        <p className="text-[15px] leading-relaxed text-[var(--doux)]">
          Les délais et le détail de la démarche se lisent sur le téléservice officiel « Réseaux et canalisations ».
          Ce site de démonstration ne les remplace pas.
        </p>
        <Link href={`${DOSSIER}/disponibilites`} className="inline-flex h-14 items-center rounded-full bg-[var(--encre)] px-7 font-black uppercase tracking-[0.04em] text-[var(--fond)]">
          Voir les samedis libres
        </Link>
      </section>
    </div>
  );
}
