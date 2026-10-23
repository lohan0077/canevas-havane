import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { AppelFinal, EnTetePage, Surtitre } from "../_composants/Blocs";
import { MOIS, PHOTOS } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Les douze mois — Douze Mois, site de démonstration",
  description: "Le calendrier des fleurs de saison en France, mois par mois, d'une boutique de fleurs imaginaire : la fleur du mois, celles qui l'accompagnent, celle qui arrive et celle qui s'en va.",
  ...adressesDeLaPage("/exemples/douze-mois/calendrier"),
};

const deux = (n: number) => String(n).padStart(2, "0");

// Les douze planches à la fois : l'année entière, comme un mur de musée.
export default function LesDouzeMois() {
  return (
    <main>
      <EnTetePage surtitre="L'année entière" titre="Les douze *mois.*" photo={PHOTOS.tulipe} origine="40% 50%">
        Une fleur par mois, et celles qui l&apos;accompagnent. Calendrier indicatif : une saison
        avance ou recule selon la région et l&apos;année ; on le confirme chaque mois avec les producteurs.
      </EnTetePage>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <Surtitre n="12">Douze planches</Surtitre>
          <p className="max-w-md text-[var(--doux)]">Le premier de chaque mois, une vidéo : la fleur qui arrive, et celle qui s&apos;en va.</p>
        </div>
        <ol className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {MOIS.map((m, i) => {
            const photo = PHOTOS[m.photo];
            return (
              <Apparition as="li" key={m.n} delai={(i % 3) * 120} className="group space-y-5" id={`mois-${m.n}`}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-[var(--sombre)]">
                  <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" className="object-cover transition-transform duration-[1.6s] group-hover:scale-[1.05]" />
                </div>
                <div className="flex items-baseline justify-between border-b border-[var(--encre)] pb-3">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--doux)]">Fig. {deux(m.n)} · {m.nom}</p>
                  <p className="font-[family-name:var(--titres)] italic text-[var(--doux)]">{deux(m.n)} / 12</p>
                </div>
                <h2 className="font-normal text-5xl leading-none tracking-[-0.03em]">
                  {m.fleur}
                </h2>
                <p className="leading-relaxed">{m.mot}</p>
                <dl className="grid grid-cols-2 gap-3 text-[15px]">
                  <div className="col-span-2">
                    <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--doux)]">Aussi</dt>
                    <dd>{m.aussi.join(", ")}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--doux)]">Arrive</dt>
                    <dd>{m.arrive}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--doux)]">S&apos;en va</dt>
                    <dd>{m.part}</dd>
                  </div>
                </dl>
              </Apparition>
            );
          })}
        </ol>
      </section>
      <AppelFinal />
    </main>
  );
}
