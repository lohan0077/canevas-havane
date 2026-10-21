import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import { atelier, etapes, photos, questions } from "../_composants/donnees";
import Repas from "../_composants/Repas";

export const metadata: Metadata = {
  title: "L'atelier · Après Nous — site de démonstration",
  description: "Site de démonstration d'un atelier d'ébénisterie imaginaire : comment on choisit l'arbre, comment on assemble, et comment on filme le premier repas, avec l'accord écrit de la famille.",
  ...adressesDeLaPage("/exemples/apres-nous/atelier"),
};

export default function Atelier() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em]">L&apos;atelier</p>
          <h1 className="text-[50px] sm:text-7xl">
            Deux établis, <span className="italic">un registre.</span>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed">
            Après Nous, c&apos;est un atelier d&apos;ébénisterie et deux paires de mains. On ne fait
            pas de série : chaque meuble est dessiné pour une pièce, et pour ceux qui s&apos;y
            assoient.
          </p>
        </div>
        <Image src={photos.huile.src} width={photos.huile.largeur} height={photos.huile.hauteur} alt={photos.huile.alt} sizes="(min-width: 1024px) 440px, 100vw" priority className="aspect-[4/5] w-full object-cover" />
      </section>

      <section className="border-y border-[var(--encre)] bg-[var(--carte)] px-5 py-20 sm:px-6">
        <ol className="mx-auto max-w-4xl divide-y divide-[var(--trait)]">
          {etapes.map((e, i) => (
            <li key={e.titre} className="grid gap-3 py-8 sm:grid-cols-[6rem_1fr]">
              <span className="font-[family-name:var(--titres)] text-4xl">{["I", "II", "III", "IV", "V", "VI"][i]}.</span>
              <div className="space-y-2">
                <h2 className="text-3xl">{e.titre}</h2>
                <p className="text-lg leading-relaxed text-[var(--doux)]">{e.texte}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-6 lg:grid-cols-2 lg:items-center">
        <Repas />
        <div className="space-y-6">
          <h2 className="text-5xl">
            Le premier repas, <span className="italic">avec votre accord.</span>
          </h2>
          <p className="text-lg leading-relaxed">
            Quand la famille le veut, on revient le soir de la livraison et on filme le premier repas,
            d&apos;en haut. Avant, on signe ensemble un accord qui dit où la vidéo sera publiée. Les
            visages peuvent être floutés ; la vidéo est retirée dès qu&apos;on nous le demande.
          </p>
          <p className="text-[var(--doux)]">Une famille qui ne veut pas être filmée a exactement la même table, et le même registre.</p>
        </div>
      </section>

      <section className="bg-[var(--sombre)] px-5 py-20 text-[var(--sur-sombre)] sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-5">
            <h2 className="text-5xl">
              Ce qu&apos;on promet, <span className="italic text-[#E0B36A]">et ce qu&apos;on ne promet pas.</span>
            </h2>
            <p className="text-[#D9CBB8]">{atelier.horaires}. {atelier.adresse}.</p>
          </div>
          <dl className="divide-y divide-[#F3EDE2]/25 border-y border-[#F3EDE2]/25">
            {questions.slice(3).map((x) => (
              <div key={x.q} className="py-5">
                <dt className="font-[family-name:var(--titres)] text-2xl">{x.q}</dt>
                <dd className="mt-2 leading-relaxed text-[#D9CBB8]">{x.r}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
