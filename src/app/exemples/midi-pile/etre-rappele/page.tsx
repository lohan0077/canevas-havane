import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import { entreprise } from "../_composants/donnees";
import { Section, Surtitre } from "../_composants/Blocs";
import Rappel from "../_composants/Rappel";

export const metadata: Metadata = {
  title: "Être rappelé · Midi Pile — site de démonstration",
  description: "Demander à être rappelé par un installateur solaire : une case à cocher, un numéro, et un appel dans les cinq jours ouvrables, au sujet de ta demande seulement.",
  ...adressesDeLaPage("/exemples/midi-pile/etre-rappele"),
};

const ENSUITE = [
  { quand: "Dans les 5 jours ouvrables", quoi: "On t'appelle au numéro donné. Passé ce délai, on n'appelle plus : il faudrait une nouvelle demande." },
  { quand: "Pendant l'appel", quoi: "On parle de ce que tu as coché, et de rien d'autre. Si ton toit s'y prête, on fixe une visite." },
  { quand: "À la visite", quoi: "Orientation, pente, ombres, charpente. Puis le devis écrit, avec le prix ferme." },
];

export default function EtreRappele() {
  return (
    <>
      <Section className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
        <div className="space-y-5">
          <Surtitre>Ta demande</Surtitre>
          <h1 className="text-[46px] sm:text-7xl font-semibold tracking-[-0.04em]">Être rappelé.</h1>
          <p className="text-lg sm:text-xl leading-relaxed text-[var(--doux)]">
            Un numéro, une case à cocher. On te rappelle dans les cinq jours ouvrables, au sujet
            de ta demande, et seulement d'elle.
          </p>
          <p className="text-[15px]">
            Tu préfères appeler ? <span className="font-bold tabular-nums whitespace-nowrap">{entreprise.telephone}</span>, {entreprise.horaires}.
          </p>
        </div>
        <Rappel />
      </Section>

      <div className="bg-[var(--carte)] border-y border-[var(--trait)]">
        <Section className="space-y-8">
          <h2 className="text-[34px] sm:text-5xl font-semibold tracking-[-0.02em]">Ce qui se passe ensuite.</h2>
          <ol className="grid gap-4 md:grid-cols-3">
            {ENSUITE.map((e, i) => (
              <li key={e.quand} className="rounded-[26px] border border-[var(--trait)] bg-[var(--fond)] p-6 space-y-2">
                <p className="font-[family-name:var(--titres)] text-sm font-bold text-[var(--accent-texte)] tabular-nums">0{i + 1}</p>
                <h3 className="text-2xl font-semibold">{e.quand}</h3>
                <p className="leading-relaxed text-[var(--doux)]">{e.quoi}</p>
              </li>
            ))}
          </ol>
        </Section>
      </div>

      <Section className="!max-w-3xl space-y-4">
        <Surtitre>Pourquoi une case à cocher</Surtitre>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em]">Parce que c'est la règle, pour tous les installateurs.</h2>
        <p className="text-lg leading-relaxed">
          Pour des travaux d'économies d'énergie ou de production d'énergie renouvelable, aucun
          professionnel ne peut démarcher un particulier par téléphone (C. consom., art. L223-1).
          Il peut rappeler quelqu'un qui le lui a demandé, à trois conditions (art. R223-4) :
        </p>
        <ul className="space-y-2 text-lg">
          {["il peut prouver la demande ;", "il appelle dans les cinq jours ouvrables ;", "il ne parle que de ce qui a été demandé."].map((c) => (
            <li key={c} className="flex gap-3">
              <span aria-hidden="true" className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--accent)]" />
              {c}
            </li>
          ))}
        </ul>
        <p className="text-lg leading-relaxed">
          La case garde la trace de ta demande, le choix du sujet borne l'appel. Ce n'est pas un
          service en plus : c'est ce que la loi demande à chacun.
        </p>
      </Section>
    </>
  );
}
