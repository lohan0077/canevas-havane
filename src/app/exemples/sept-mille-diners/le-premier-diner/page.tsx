import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { AppelFinal, EnTetePage, Surtitre, Titre } from "../_composants/Blocs";
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
      <EnTetePage surtitre="Le soir de la pose" titre="Le premier dîner, *c'est nous.*">
        Le soir de chaque pose, on cuisine le premier dîner. Chez toi, dans ta nouvelle cuisine. Et on te laisse les
        7&nbsp;299 autres.
      </EnTetePage>

      <section className="mx-auto grid max-w-6xl gap-14 px-6 py-28 md:py-40 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-10">
          <div className="space-y-5">
            <Apparition><Surtitre>Ce soir-là</Surtitre></Apparition>
            <Titre texte="Du dernier coup de tournevis *au dessert.*" />
          </div>
          <ol className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {DEROULE_DINER.map((d, i) => (
              <Apparition as="li" key={d.quand} delai={i * 120} className="grid gap-1 py-5 sm:grid-cols-[12rem_1fr] sm:gap-6">
                <p className="font-[family-name:var(--titres)] text-xl italic text-[var(--accent-texte)]">{d.quand}</p>
                <p className="text-[17px] leading-relaxed [font-variant-numeric:lining-nums]">{d.quoi}</p>
              </Apparition>
            ))}
          </ol>
        </div>
        <Apparition delai={150}>
          <Ticket />
        </Apparition>
      </section>

      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 py-28 md:py-40 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-5">
            <Apparition><Surtitre clair>Offert, et on dit comment</Surtitre></Apparition>
            <Titre texte="Offert, *sans condition.*" clair />
          </div>
          <ul className="divide-y divide-white/15 border-y border-white/15 text-lg leading-relaxed">
            {CONDITIONS.map((c, i) => (
              <Apparition as="li" key={c} delai={i * 120} className="flex gap-4 py-4">
                <span aria-hidden="true" className="font-[family-name:var(--titres)] italic text-[#F0B49B]">{i + 1}.</span>
                {c}
              </Apparition>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-14 px-6 py-28 md:py-40 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <Apparition><Surtitre>Chaque pose, filmée</Surtitre></Apparition>
          <Titre texte="Quatre jours. *Trente secondes.*" />
          <Apparition as="p" delai={150} className="max-w-[26rem] text-lg leading-relaxed text-[var(--doux)]">
            Les meubles qui se montent, en accéléré, jusqu&apos;au premier dîner. Seulement avec ton accord écrit, et sans
            rien montrer de chez toi : ni adresse, ni famille, ni objets personnels.
          </Apparition>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[photos.herbes, photos.service].map((p, i) => (
            <Apparition key={p.src} delai={i * 140} className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[var(--sombre)]">
              <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
            </Apparition>
          ))}
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
