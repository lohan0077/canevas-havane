import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { CONTACT, DOSSIER, PHOTOS, PHOTO_DU_SAVON, PRIX, SAVONS } from "./_composants/donnees";
import { Faq, Pain, Surtitre } from "./_composants/Elements";
import { QuestionSouvenir } from "./_composants/Interactifs";

// Le site de la marque imaginée dans la vidéo « Si je devais créer une marque de
// cosmétiques de zéro » : pas de type de peau, une seule question — « ça sentait
// quoi, chez toi, enfant ? ». Premier écran inspiré du modèle « Rare Gallery » de
// MotionSites : une photo sombre et dense, un titre en Didone centré, un bouton.
export const metadata: Metadata = {
  title: "Souvenance — site de démonstration",
  description:
    "Site de démonstration d'une marque de savons imaginaire, réalisé par Canevas Havane : pas de type de peau, une seule question — ça sentait quoi, chez toi, enfant ?",
  ...adressesDeLaPage("/exemples/souvenance"),
};

export default function Souvenance() {
  return (
    <main>
      {/* Ouverture : le bois d'une vieille armoire, la question au centre. */}
      <section className="relative isolate overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <Image src={PHOTOS.bois.src} alt="" fill priority sizes="100vw" className="-z-10 object-cover opacity-55" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(42,24,32,0.35),rgba(42,24,32,0.9)_75%)]" />
        <div className="mx-auto flex min-h-[calc(100svh-98px)] max-w-3xl flex-col items-center justify-center px-5 py-20 text-center">
          <Surtitre clair>Savons · souvenirs</Surtitre>
          <h1 className="mt-6 text-[54px] font-normal leading-[1.02] sm:text-[86px]">
            Ça sentait quoi, <span className="italic text-[#E8C4BC]">chez toi</span>&nbsp;?
          </h1>
          <p className="mt-6 max-w-md text-[18px] leading-relaxed">
            On ne te demandera pas ton type de peau. Juste un souvenir d&apos;enfance, et le savon qui sent comme lui.
          </p>
          <a href="#souvenir" className="mt-9 rounded-full bg-[var(--sur-sombre)] px-7 py-3.5 text-[16px] font-semibold text-[var(--encre)]">Trouver ton savon</a>
        </div>
      </section>

      {/* Le contre-pied. */}
      <section className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8">
        <Surtitre>Pas de type de peau</Surtitre>
        <p className="mt-6 font-[family-name:var(--titres)] text-[34px] leading-[1.15] sm:text-5xl">
          Ailleurs, on te demande si ta peau est sèche, mixte ou sensible. <span className="italic text-[var(--accent-texte)]">Ici, on te demande où tu as grandi.</span>
        </p>
        <p className="mx-auto mt-6 max-w-xl text-[18px] leading-relaxed text-[var(--doux)]">
          Un savon Souvenance ne promet rien à ta peau. Il porte un souvenir : une odeur que tu reconnaîtrais les yeux
          fermés.
        </p>
      </section>

      {/* L'outil de la vidéo : la question. */}
      <section id="souvenir" className="scroll-mt-20 bg-[#E8DCC8]">
        <div className="mx-auto grid max-w-5xl gap-10 px-5 py-20 sm:px-8 md:grid-cols-[0.9fr_1.1fr] md:items-start">
          <div className="space-y-5 md:sticky md:top-28">
            <Surtitre>Une seule question</Surtitre>
            <h2 className="text-[48px] font-normal leading-[1.02] sm:text-6xl">Ton savon, <span className="italic">en une question.</span></h2>
            <p className="text-[18px] leading-relaxed text-[#5C4651]">
              Trois souvenirs, trois savons. Tu choisis le tien, on te le montre, avec tout ce qu&apos;il contient.
            </p>
          </div>
          <QuestionSouvenir />
        </div>
      </section>

      {/* Les trois savons. */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div className="space-y-4">
            <Surtitre>Les savons</Surtitre>
            <h2 className="text-[48px] font-normal leading-[1.02] sm:text-6xl">Trois souvenirs.</h2>
          </div>
          <Link href={`${DOSSIER}/savons`} className="font-semibold underline underline-offset-4">Leurs étiquettes complètes</Link>
        </div>
        <ul className="mt-12 grid gap-8 md:grid-cols-3">
          {SAVONS.map((s, i) => {
            const p = PHOTOS[PHOTO_DU_SAVON[s.slug]];
            return (
              <li key={s.slug} className="space-y-5">
                <div className="relative overflow-hidden rounded-[28px]">
                  <Image src={p.src} alt={p.alt} width={p.largeur} height={p.hauteur} sizes="(min-width: 768px) 360px, 92vw" className="h-[280px] w-full object-cover" />
                  <div className="absolute bottom-5 right-5 w-[52%]">
                    <Pain savon={s} incline={[-5, 4, -3][i]} />
                  </div>
                </div>
                <div className="space-y-1.5 text-center">
                  <h3 className="text-[30px] font-normal italic">{s.nom}</h3>
                  <p className="text-[16px] leading-relaxed text-[var(--doux)]">{s.odeur}</p>
                  <p className="text-[15px] font-semibold">{PRIX} € TTC · 100 g · exemple</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* L'affiche du lancement. */}
      <section className="bg-[var(--encre)] text-[var(--sur-sombre)]">
        <div className="mx-auto max-w-4xl px-5 py-24 text-center sm:px-8">
          <p className="font-[family-name:var(--titres)] text-[46px] leading-[1.05] sm:text-7xl">
            Chez ta grand-mère, ça sentait <span className="italic text-[#E8C4BC]">quoi</span>&nbsp;?
          </p>
          <p className="mt-8 text-[18px] leading-relaxed">
            Réponds-nous. L&apos;odeur la plus citée deviendra le prochain savon.
          </p>
          <Link href={`${DOSSIER}/prochain-savon`} className="mt-8 inline-block rounded-full border border-[#E8C4BC] px-7 py-3.5 font-semibold">Proposer une odeur</Link>
        </div>
      </section>

      {/* Le nom. */}
      <section className="mx-auto grid max-w-5xl gap-10 px-5 py-20 sm:px-8 md:grid-cols-2 md:items-center">
        <div className="overflow-hidden rounded-[200px_200px_28px_28px]">
          <Image src={PHOTOS.armoire.src} alt={PHOTOS.armoire.alt} width={PHOTOS.armoire.largeur} height={PHOTOS.armoire.hauteur} sizes="(min-width: 768px) 440px, 92vw" className="h-auto w-full" />
        </div>
        <div className="space-y-5">
          <Surtitre>Le nom</Surtitre>
          <h2 className="text-[48px] font-normal leading-[1.02] sm:text-6xl">Souvenance.</h2>
          <p className="text-[19px] leading-relaxed">
            Un vieux mot, pour dire souvenir. On le trouve chez Balzac, et plus beaucoup ailleurs. Un mot un peu
            oublié, comme l&apos;odeur de l&apos;armoire où ta grand-mère rangeait les draps.
          </p>
          <p className="font-[family-name:var(--titres)] text-[26px] italic text-[var(--accent-texte)]">Ça sentait comme ça, chez toi.</p>
        </div>
      </section>

      {/* La façon. */}
      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
          <Surtitre>La façon</Surtitre>
          <h2 className="mt-4 text-[44px] font-normal leading-[1.02] sm:text-5xl">Une base, trois souvenirs.</h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              ["La base", "Huile d'olive et huile de coco, saponifiées à froid, séchées plusieurs semaines."],
              ["Le souvenir", "Une composition parfumée ou des huiles essentielles, pour retrouver une odeur, pas pour soigner."],
              ["L'étiquette", "Tout ce qu'il contient y est écrit, avec la date et le lot. La même sur le site."],
            ].map(([t, d], i) => (
              <li key={t} className="space-y-2">
                <p className="font-[family-name:var(--titres)] text-[56px] italic leading-none text-[var(--accent-texte)]">{i + 1}</p>
                <h3 className="text-[26px] font-normal">{t}</h3>
                <p className="text-[17px] leading-relaxed text-[var(--doux)]">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Questions. */}
      <section className="mx-auto grid max-w-5xl gap-10 px-5 py-20 sm:px-8 md:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          <Surtitre>Questions</Surtitre>
          <h2 className="text-[44px] font-normal leading-[1.02] sm:text-5xl">Avant de choisir.</h2>
        </div>
        <Faq />
      </section>

      {/* La boutique. */}
      <section id="boutique" className="scroll-mt-20 bg-[#F1D9D6]">
        <div className="mx-auto max-w-3xl space-y-5 px-5 py-20 text-center sm:px-8">
          <Surtitre>La boutique-atelier</Surtitre>
          <h2 className="text-[44px] font-normal leading-[1.02] sm:text-5xl">Viens les sentir.</h2>
          <p className="text-[18px] leading-relaxed">Les trois savons sont ouverts sur la table : on les sent avant de choisir.</p>
          <p className="text-[18px]">{CONTACT.adresse}</p>
          <p className="text-[16px]">{CONTACT.horaires}</p>
          <p className="text-[20px] font-semibold">{CONTACT.telephone}</p>
        </div>
      </section>
    </main>
  );
}
