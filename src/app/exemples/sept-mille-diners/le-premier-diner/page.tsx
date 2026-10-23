import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, EnTetePage, Surtitre } from "../_composants/Blocs";
import Ticket from "../_composants/Ticket";
import { DEROULE_DINER, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Le premier dîner — Sept Mille Dîners, site de démonstration",
  description:
    "Le soir de chaque pose, Sept Mille Dîners cuisine le premier dîner chez son client, offert sans condition. Marque de cuisines imaginaire, site de démonstration.",
  ...adressesDeLaPage("/exemples/sept-mille-diners/le-premier-diner"),
};

const CONDITIONS = [
  "Le dîner n'est compté dans aucun prix : la cuisine coûte la même chose avec ou sans lui.",
  "Tu n'as rien d'autre à acheter, ni à réserver, pour l'avoir.",
  "Tu peux le refuser : rien ne change.",
  "Il est cuisiné par un chef à domicile déclaré et assuré, qui respecte les règles d'hygiène de son métier (exemple).",
];

export default function LePremierDiner() {
  return (
    <main>
      <EnTetePage surtitre="Le soir de la pose" titre="Le premier dîner, *c'est nous.*" photo={photos.service} origine="55% 40%">
        Le soir de chaque pose, on cuisine le premier dîner. Chez toi, dans ta nouvelle cuisine. Et on te
        laisse les 7&nbsp;299 autres.
      </EnTetePage>

      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-8">
          <Apparition><Surtitre>Ce soir-là</Surtitre></Apparition>
          <ol className="relative space-y-10 border-l border-[var(--trait)] pl-8">
            {DEROULE_DINER.map((d, i) => (
              <Apparition as="li" key={d.quand} delai={i * 140} className="relative">
                <span aria-hidden="true" className="absolute -left-[2.6rem] top-1 grid h-5 w-5 place-items-center rounded-full bg-[var(--accent)]" />
                <p className="font-[family-name:var(--titres)] text-3xl italic text-[var(--accent-texte)]">{d.quand}</p>
                <p className="mt-2 max-w-lg text-lg leading-relaxed [font-variant-numeric:lining-nums]">{d.quoi}</p>
              </Apparition>
            ))}
          </ol>
        </div>
        <Apparition de="zoom" delai={150}>
          <Ticket />
        </Apparition>
      </section>

      <section className="px-3 sm:px-5">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[var(--accent)] text-[var(--sur-accent)]">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-10 md:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em]">Offert, et on dit comment</p>
              <TitreRevele
                texte="Offert, *sans condition.*"
                className="font-[family-name:var(--titres)] text-[clamp(3rem,7vw,6rem)] leading-[0.92] tracking-[-0.035em]"
                classeAccent="italic"
              />
            </div>
            <ul className="divide-y divide-white/30 border-y border-white/30 text-lg leading-relaxed">
              {CONDITIONS.map((c, i) => (
                <Apparition as="li" key={c} delai={i * 120} className="flex gap-4 py-4">
                  <span aria-hidden="true" className="font-[family-name:var(--titres)] italic">{i + 1}.</span>
                  {c}
                </Apparition>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-24 sm:px-8 md:grid-cols-3 md:py-32">
        {[photos.herbes, photos.cocotte, photos.tasses].map((p, i) => (
          <Apparition key={p.src} de="zoom" delai={i * 140} className={`relative overflow-hidden bg-[var(--sombre)] ${i === 1 ? "aspect-[3/4] [border-radius:50%_50%_2rem_2rem/38%_38%_2rem_2rem] md:-mt-10" : "aspect-[3/4] rounded-[2rem]"}`}>
            <Image src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
          </Apparition>
        ))}
      </section>

      <AppelFinal />
    </main>
  );
}
