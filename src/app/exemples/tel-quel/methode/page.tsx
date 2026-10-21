import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, methode, photos, remiseEnPlace } from "../_composants/donnees";
import { Intitule, Note, Photo, Surtitre } from "../_composants/Blocs";

export const metadata: Metadata = {
  title: "Tel quel, c'est quoi — Tel Quel, site de démonstration",
  description:
    "Ce que « remis tel quel » veut dire pour une conciergerie imaginaire : une méthode écrite dans le mandat, des photos à chaque séjour, et ce qu'elle ne promet pas.",
  ...adressesDeLaPage("/exemples/tel-quel/methode"),
};

const PROMIS = [
  "Remettre chaque chose à sa place après chaque départ, d'après la photo d'arrivée.",
  "Photographier chaque séjour, avant et après, sous les mêmes angles.",
  "Te dire, dans ton espace, tout ce qui a été abîmé, et ce que nous avons fait.",
  "Remplacer un objet abîmé à l'identique, au prix de l'objet.",
];

const PAS_PROMIS = [
  "Qu'aucun voyageur ne casse jamais rien. Personne ne peut le promettre.",
  "Que les photos remplacent un état des lieux : elles le complètent.",
  "Que ton logement sera loué toutes les nuits.",
];

export default function Methode() {
  return (
    <div>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 pt-10 pb-16 sm:px-6 sm:pt-16 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
        <Intitule niveau={1} surtitre="Tel quel, c'est quoi" titre={<>Une méthode, <em className="text-[var(--accent-texte)]">pas une formule.</em></>}>
          <p>
            « Remis tel quel » ne veut pas dire que rien n&apos;arrive jamais. Ça veut dire que nous
            remettons tout comme tu l&apos;as laissé, à chaque départ, et que tu peux le vérifier.
          </p>
        </Intitule>
        <Photo photo={photos.coussins} sizes="(min-width: 1024px) 540px, 100vw" priority className="aspect-[4/5] sm:aspect-[4/3]">
          <Note titre="Arrivée, 15 h" texte="Coussin blanc sur le terre cuite, côté fenêtre." className="bottom-5 left-4 -rotate-2" />
        </Photo>
      </section>

      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-6 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6">
            <Surtitre>Ce que nous promettons</Surtitre>
            <ul className="space-y-4">
              {PROMIS.map((p) => (
                <li key={p} className="flex gap-4 text-[17px] leading-relaxed">
                  <span aria-hidden="true" className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--sombre)] text-[14px] text-[#E3C88E]">✓</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6">
            <Surtitre>Ce que nous ne promettons pas</Surtitre>
            <ul className="space-y-4">
              {PAS_PROMIS.map((p) => (
                <li key={p} className="flex gap-4 text-[17px] leading-relaxed">
                  <span aria-hidden="true" className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 border-[var(--accent)] text-[14px] font-semibold text-[var(--accent-texte)]">×</span>
                  {p}
                </li>
              ))}
            </ul>
            <p className="rounded-2xl bg-[var(--fond)] p-4 text-[15px] leading-relaxed text-[var(--doux)]">
              L&apos;engagement de remise en place et la liste ci-dessous sont écrits dans le mandat de
              gestion. Une promesse qu&apos;on ne pourrait pas tenir n&apos;y a pas sa place.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-12 px-5 py-20 sm:px-6">
        <Intitule surtitre="Les quatre temps" titre={<>De l&apos;inventaire <em className="text-[var(--accent-texte)]">à la preuve.</em></>} />
        <ol className="relative space-y-8 border-l-2 border-[var(--trait)] pl-8 sm:pl-10">
          {methode.map((m, i) => (
            <li key={m.titre} className="relative space-y-2">
              <span className="absolute top-0 -left-[49px] grid h-9 w-9 place-items-center rounded-full bg-[var(--sombre)] font-[family-name:var(--titres)] text-[16px] text-[#E3C88E] sm:-left-[57px]">{i + 1}</span>
              <h2 className="text-[30px] font-normal">{m.titre}</h2>
              <p className="max-w-2xl text-[16px] leading-relaxed text-[var(--doux)]">{m.texte}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Intitule clair surtitre="La liste du mandat" titre={<>Cochée <em className="text-[#E3C88E]">à chaque départ.</em></>}>
            <p>Neuf lignes, les mêmes pour tous les logements, complétées des habitudes de chaque propriétaire.</p>
          </Intitule>
          <ul className="divide-y divide-[#3D5D55] border-y border-[#3D5D55]">
            {remiseEnPlace.map((r) => (
              <li key={r} className="flex items-center gap-4 py-3.5 text-[16px]">
                <span aria-hidden="true" className="grid h-6 w-6 shrink-0 place-items-center rounded-[6px] bg-[#E3C88E] text-[12px] text-[#23413A]">✓</span>
                {r}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-5 py-16 sm:px-6">
        <p className="font-[family-name:var(--titres)] text-[32px] leading-tight">Voir ce que ça donne, séjour par séjour.</p>
        <Link href={`${DOSSIER}/mon-espace`} className="rounded-full bg-[var(--accent)] px-6 py-3.5 font-semibold text-[var(--sur-accent)]">Un séjour, en photos</Link>
      </section>
    </div>
  );
}
