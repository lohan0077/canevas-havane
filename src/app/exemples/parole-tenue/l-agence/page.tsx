import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, Bouton, EnTetePage, Surtitre } from "../_composants/Blocs";
import { DOSSIER, EQUIPE, ETAPES, MENTIONS_TOURISME, agence, photos } from "../_composants/donnees";

// L'agence : ce qu'elle vend (les voyages promis), comment (trente minutes avec un
// conseiller qui ouvre les onglets à ta place), qui (prénoms d'exemple), et les mentions
// du Code du tourisme (art. R.211-2), toutes d'exemple.
export const metadata: Metadata = {
  title: "L'agence — Parole Tenue, site de démonstration",
  description: "Une agence de voyage imaginaire qui ne vend que les voyages promis : trente minutes avec un conseiller, un voyage chiffré ligne par ligne. Agence fictive, site de démonstration.",
  ...adressesDeLaPage("/exemples/parole-tenue/l-agence"),
};

export default function LAgence() {
  return (
    <main>
      <EnTetePage surtitre="L'agence" titre="On ne vend qu'une chose : *les voyages promis.*" photo={photos.polynesie}>
        Et on ouvre les quarante onglets à ta place. Trente minutes, en visio ou à l&apos;agence, et tu repars
        avec un voyage chiffré ligne par ligne.
      </EnTetePage>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-8 md:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Apparition de="rideau" className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2rem] lg:sticky lg:top-28">
          <Image src={photos.venise.src} alt={photos.venise.alt} fill sizes="(min-width: 1024px) 520px, 100vw" className="object-cover" />
        </Apparition>
        <ol className="space-y-4">
          {ETAPES.map((e, i) => (
            <Apparition as="li" key={e.titre} delai={i * 100} className="grid grid-cols-[3.5rem_1fr] gap-4 rounded-[1.8rem] border border-[var(--trait)] bg-[var(--carte)] p-6">
              <span className="font-[family-name:var(--titres)] text-[3rem] italic leading-none text-[var(--accent-texte)]">{i + 1}</span>
              <span className="space-y-2">
                <span className="block font-[family-name:var(--titres)] text-[2rem] leading-none">{e.titre}</span>
                <span className="block text-[17px] leading-relaxed text-[var(--doux)]">{e.texte}</span>
              </span>
            </Apparition>
          ))}
        </ol>
      </section>

      <section className="px-3 sm:px-5">
        <div className="kit-grain overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-10 md:py-28 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="space-y-6">
              <Surtitre>Les conseillers</Surtitre>
              <TitreRevele
                texte="Trois prénoms, *quarante onglets de moins.*"
                className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5vw,4.4rem)] leading-[0.95]"
                classeAccent="italic text-[var(--accent)]"
              />
              <p className="text-[15px]">Prénoms d&apos;exemple : l&apos;agence est fictive.</p>
            </div>
            <ul className="space-y-4">
              {EQUIPE.map((p, i) => (
                <Apparition as="li" key={p.prenom} delai={i * 100} className="flex items-center gap-5 rounded-[1.6rem] border border-white/15 p-5">
                  <span aria-hidden="true" className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[var(--accent)] font-semibold text-[var(--sur-accent)]">{p.initiales}</span>
                  <span>
                    <span className="block font-[family-name:var(--titres)] text-[2rem] leading-none">{p.prenom}</span>
                    <span className="block text-[15px]">{p.role}</span>
                  </span>
                </Apparition>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:grid-cols-2">
        <div className="space-y-5">
          <Apparition><Surtitre className="text-[var(--doux)]">Venir, ou pas</Surtitre></Apparition>
          <p className="font-[family-name:var(--titres)] text-[2.4rem] leading-tight">{agence.adresse}</p>
          <p className="text-lg">{agence.horaires}</p>
          <p className="text-lg font-semibold tabular-nums">{agence.telephone}</p>
          <p className="text-[14px] text-[var(--doux)]">Adresse et numéro d&apos;exemple : le numéro appartient à la tranche réservée à la fiction.</p>
          <Bouton href={`${DOSSIER}#ferme`}>Ferme tes onglets</Bouton>
        </div>
        <dl className="grid gap-4 self-start rounded-[2rem] bg-[var(--carte)] p-7">
          <p className="font-[family-name:var(--titres)] text-[2rem] leading-none">Ce que dit le Code du tourisme</p>
          {MENTIONS_TOURISME.map((m) => (
            <div key={m.libelle} className="border-t border-[var(--trait)] pt-3">
              <dt className="font-semibold">{m.libelle}</dt>
              <dd className="text-[var(--doux)]">{m.valeur}</dd>
            </div>
          ))}
          <p className="text-[14px] text-[var(--doux)]">Art. R.211-2. Si l&apos;agence fait défaut, sa garantie financière sert à rembourser les sommes versées (art. L.211-18 ; conditions à l&apos;art. R.211-31).</p>
        </dl>
      </section>

      <AppelFinal />
    </main>
  );
}
