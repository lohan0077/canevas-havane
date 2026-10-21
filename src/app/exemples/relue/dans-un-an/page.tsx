import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import { euros, maison, photos } from "../_composants/donnees";
import LettreDansUnAn from "../_composants/LettreDansUnAn";

export const metadata: Metadata = {
  title: "Ta lettre dans un an · Relue — site de démonstration",
  description: "Le service de Relue, papeterie imaginaire : tu t'écris une lettre, on la cachette et on te la poste dans un an, jour pour jour.",
  ...adressesDeLaPage("/exemples/relue/dans-un-an"),
};

const ETAPES = [
  { titre: "Tu écris", texte: "Quelques lignes, ici. Ce que tu vis, ce que tu espères, ce que tu as peur d'oublier." },
  { titre: "On imprime et on cachette", texte: "Sur notre papier vergé, à la cire rouge. Personne ne la lit." },
  { titre: "On la garde", texte: "Dans une boîte, à l'atelier, rangée à sa date." },
  { titre: "On la poste", texte: "Un an après, jour pour jour : c'est la date de dépôt. La Poste fait le reste." },
];

export default function DansUnAn() {
  return (
    <div>
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-10 sm:pt-16 pb-16 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6 min-w-0">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent-texte)]">Le service</p>
          <h1 className="font-normal text-[3.2rem] leading-[0.98] sm:text-7xl">Ta lettre, dans un an. <span className="italic">Jour pour jour.</span></h1>
          <p className="text-xl leading-relaxed">Tu t&apos;écris une lettre. On te la poste dans un an. Entre les deux, elle reste cachetée.</p>
          <p className="text-[var(--doux)]">{euros(maison.prixService)} TTC, papier, cire et timbre compris · exemple.</p>
        </div>
        <div id="ecrire" className="scroll-mt-20 min-w-0">
          <LettreDansUnAn />
        </div>
      </section>

      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="space-y-6">
            <h2 className="font-normal text-5xl">Ce qui se passe <span className="italic">ensuite.</span></h2>
            <ol className="space-y-5">
              {ETAPES.map((e, i) => (
                <li key={e.titre} className="flex gap-5">
                  <span className="font-[family-name:var(--titres)] text-3xl italic text-[var(--accent-texte)] tabular-nums w-10 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-normal text-2xl">{e.titre}</h3>
                    <p className="text-lg leading-relaxed">{e.texte}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="relative aspect-[3/4] rounded-[4px] overflow-hidden bg-[var(--sombre)]">
            <Image src={photos.cachet.src} alt={photos.cachet.alt} fill sizes="(min-width: 768px) 420px, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-5 sm:px-8 py-16 space-y-4">
        <h2 className="font-normal text-4xl">Ton adresse, et rien d&apos;autre.</h2>
        <p className="text-lg leading-relaxed">
          Pour te poster ta lettre, il nous faut ton adresse. Elle ne sert qu&apos;à ça, et elle est effacée
          une fois la lettre partie. Si tu déménages d&apos;ici là, tu nous le dis : on change
          l&apos;enveloppe, pas la lettre.
        </p>
        <p className="text-[var(--doux)]">Sur ce site de démonstration, rien n&apos;est demandé, rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
      </section>
    </div>
  );
}
