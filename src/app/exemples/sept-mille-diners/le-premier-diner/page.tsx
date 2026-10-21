import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import { photos } from "../_composants/donnees";
import Ticket from "../_composants/Ticket";

export const metadata: Metadata = {
  title: "Le premier dîner · Sept Mille Dîners — site de démonstration",
  description: "Le soir de chaque pose, Sept Mille Dîners cuisine le premier dîner chez son client, offert sans condition. Marque de cuisines imaginaire, site de démonstration.",
  ...adressesDeLaPage("/exemples/sept-mille-diners/le-premier-diner"),
};

const DEROULE = [
  { quand: "Deux semaines avant", quoi: "On choisit le menu avec toi : ce que vous aimez, ce que vous ne mangez pas, les allergies." },
  { quand: "Le dernier jour de pose", quoi: "Les poseurs rangent. Le chef arrive vers 18 h, avec ses courses." },
  { quand: "Le soir", quoi: "Il cuisine dans ta nouvelle cuisine. Tu le regardes faire, ou tu mets la table." },
  { quand: "Après le dessert", quoi: "Il range, et il s'en va. Les 7 299 dîners suivants sont à toi." },
];

export default function LePremierDiner() {
  return (
    <div>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-16 grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="space-y-5 min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--accent-texte)]">Le soir de la pose</p>
          <h1 className="text-[3rem] sm:text-7xl">Le premier dîner, <span className="italic">c&apos;est nous.</span></h1>
          <p className="text-xl leading-relaxed text-[var(--doux)]">
            Le soir de chaque pose, on cuisine le premier dîner. Chez toi, dans ta nouvelle cuisine.
          </p>
        </div>
        <Ticket />
      </section>

      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <ol className="space-y-6">
            {DEROULE.map((d) => (
              <li key={d.quand} className="border-t border-[var(--encre)] pt-4">
                <p className="font-[family-name:var(--titres)] text-2xl italic text-[var(--accent-texte)]">{d.quand}</p>
                <p className="text-lg leading-relaxed [font-variant-numeric:lining-nums]">{d.quoi}</p>
              </li>
            ))}
          </ol>
          <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-[var(--sombre)]">
            <Image src={photos.service.src} alt={photos.service.alt} fill sizes="(min-width: 768px) 460px, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-6">
        <h2 className="text-5xl">Offert, <span className="italic">sans condition.</span></h2>
        <ul className="space-y-3 text-lg leading-relaxed">
          <li>Le dîner n&apos;est compté dans aucun prix : la cuisine coûte la même chose avec ou sans lui.</li>
          <li>Tu n&apos;as rien d&apos;autre à acheter, ni à réserver, pour l&apos;avoir.</li>
          <li>Tu peux le refuser : rien ne change.</li>
          <li>Il est cuisiné par un chef à domicile déclaré et assuré, qui respecte les règles d&apos;hygiène de son métier <span className="text-[var(--doux)]">(exemple)</span>.</li>
        </ul>
      </section>
    </div>
  );
}
