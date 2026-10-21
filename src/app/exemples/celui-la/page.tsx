import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Carte from "./_composants/Carte";
import Dessin from "./_composants/Dessin";
import Plateau from "./_composants/Plateau";
import { DOSSIER, FROMAGES, OCCASIONS, QUESTIONS, boutique, photos } from "./_composants/donnees";

// Le site imaginé dans la vidéo « Si je devais remplir le carnet de commandes d'un
// fromager » : on ne vend pas cent cinquante fromages, on vend la question des
// invités — « il vient d'où, celui-là ? ». Un seul outil sur l'accueil (vous êtes
// combien ?), une carte par fromage, une page par occasion, le retrait en boutique.
// Mise en page inspirée du modèle « Heritage Grove » de MotionSites (un dessin à
// l'encre, une typographie à empattements calme, des colonnes sobres), transposée
// en fromages dessinés et en étiquettes de musée.
export const metadata: Metadata = {
  title: "Celui-Là — site de démonstration",
  description: "Site de démonstration d'une fromagerie imaginaire, réalisé par Canevas Havane : vous êtes combien ? Le plateau se compose, et chaque fromage arrive avec sa carte.",
  ...adressesDeLaPage("/exemples/celui-la"),
};

const ETAPES = [
  { jour: "Jeudi", texte: "Tu dis combien vous serez, tu choisis ton créneau. Le lait de chaque fromage est écrit avant le bouton." },
  { jour: "Vendredi", texte: "On découpe, on dispose, on pose une carte devant chaque fromage." },
  { jour: "Samedi, 10 h", texte: "Ton plateau t'attend au comptoir. Tu paies sur place." },
];

export default function CeluiLa() {
  return (
    <div>
      {/* 1 — La question, et l'outil. */}
      <section id="plateau" className="scroll-mt-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-10 sm:pt-16 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div className="space-y-6 lg:pt-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Fromagerie · plateaux à composer</p>
            <h1 className="text-[3.1rem] sm:text-7xl">
              «&nbsp;Il vient d&apos;où, <span className="bg-[#E3B23C] px-1">celui-là&nbsp;?</span>&nbsp;»
            </h1>
            <p className="max-w-md text-lg leading-relaxed">
              La question que tes invités vont poser. Dis-nous combien vous serez : on
              compose le plateau, et chaque fromage arrive avec sa réponse.
            </p>
            <div aria-hidden="true" className="hidden items-end gap-2 border-b border-[var(--encre)] pb-1 lg:flex">
              {FROMAGES.map((f) => <Dessin key={f.numero} forme={f.forme} teinte={f.teinte} className="h-16 w-24" />)}
            </div>
          </div>
          <Plateau />
        </div>
      </section>

      {/* 2 — Six fromages, pas cent cinquante. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:py-24 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <h2 className="text-4xl sm:text-6xl">Pas cent cinquante fromages. <span className="text-[#E3B23C]">Six, et leur histoire.</span></h2>
          <p className="text-lg leading-relaxed">
            Personne ne choisit dans cent cinquante vignettes : on finit par reprendre le
            même que d&apos;habitude. Ici, six fromages, et pour chacun quelqu&apos;un à
            nommer, un lait, un endroit.
          </p>
        </div>
      </section>

      {/* 3 — Les cartes. */}
      <section id="cartes" className="scroll-mt-16 mx-auto max-w-6xl space-y-10 px-5 py-20 sm:py-24">
        <div className="max-w-2xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Une carte par fromage</p>
          <h2 className="text-4xl sm:text-5xl">Qui le fait, d&apos;où il vient, son lait. <span className="text-[var(--accent-texte)]">Et la phrase à dire à table.</span></h2>
        </div>
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {FROMAGES.map((f) => <li key={f.numero}><Carte f={f} /></li>)}
        </ul>
        <p className="text-sm text-[var(--doux)]">Fromages, producteurs et distances d&apos;exemple : la fromagerie est fictive.</p>
      </section>

      {/* 4 — Le plateau, tel qu'on le remet. */}
      <section className="border-y border-[var(--encre)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:py-24 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="relative aspect-[3/2] overflow-hidden rounded-[6px] border border-[var(--encre)]">
            <Image src={photos.plateau.src} alt={photos.plateau.alt} fill sizes="(min-width: 768px) 600px, 100vw" className="object-cover" />
          </div>
          <div className="space-y-5">
            <h2 className="text-4xl sm:text-5xl">Découpé, présenté, <span className="text-[var(--accent-texte)]">prêt à poser.</span></h2>
            <p className="text-lg leading-relaxed">
              On le découpe pour le nombre de convives, du plus doux au plus fort, et on
              pose une carte devant chaque fromage. Tu n&apos;as plus qu&apos;à le sortir
              une heure avant le repas.
            </p>
          </div>
        </div>
      </section>

      {/* 5 — Une page par occasion. */}
      <section className="mx-auto max-w-6xl space-y-10 px-5 py-20 sm:py-24">
        <h2 className="max-w-2xl text-4xl sm:text-5xl">Une page <span className="text-[var(--accent-texte)]">par occasion.</span></h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {OCCASIONS.map((o) => (
            <li key={o.slug}>
              <Link href={`${DOSSIER}/plateaux/${o.slug}`} className="flex h-full flex-col justify-between gap-6 rounded-[6px] border border-[var(--encre)] bg-[var(--carte)] p-5 transition-shadow hover:shadow-[6px_6px_0_var(--encre)]">
                <span className="font-[family-name:var(--titres)] text-2xl leading-tight">{o.titre}</span>
                <span className="text-sm font-semibold underline underline-offset-4">Voir le plateau</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 6 — Commandé jeudi, prêt samedi. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto max-w-6xl space-y-10 px-5 py-20 sm:py-24">
          <h2 className="text-4xl sm:text-5xl">Commandé jeudi, <span className="text-[#E3B23C]">prêt samedi.</span></h2>
          <ol className="grid gap-8 md:grid-cols-3">
            {ETAPES.map((e) => (
              <li key={e.jour} className="space-y-2 border-t border-[#FFFBF2]/40 pt-4">
                <p className="font-[family-name:var(--titres)] text-2xl text-[#E3B23C]">{e.jour}</p>
                <p className="leading-relaxed">{e.texte}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 7 — Ceux qui les font. */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:py-24 md:grid-cols-2 md:items-center">
        <div className="relative aspect-[3/2] overflow-hidden rounded-[6px] border border-[var(--encre)]">
          <Image src={photos.chevre.src} alt={photos.chevre.alt} fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover" />
        </div>
        <div className="space-y-5">
          <h2 className="text-4xl sm:text-5xl">Des prénoms, <span className="text-[var(--accent-texte)]">pas des étiquettes.</span></h2>
          <p className="text-lg leading-relaxed">
            Madeleine et ses chèvres, Lucie et ses brebis, Bastien, Hugo, la laiterie de
            Sarah et Jean. On va les voir, on goûte, et on écrit sur la carte ce qui est
            vrai — rien de plus.
          </p>
          <p className="text-sm text-[var(--doux)]">Producteurs d&apos;exemple : ils n&apos;existent pas.</p>
        </div>
      </section>

      {/* 8 — Questions. */}
      <section className="border-t border-[var(--encre)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:py-24 md:grid-cols-[0.8fr_1.2fr]">
          <h2 className="text-4xl sm:text-5xl">Avant de <span className="text-[var(--accent-texte)]">commander.</span></h2>
          <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {QUESTIONS.map((x) => (
              <li key={x.q}>
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                    {x.q}
                    <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-[4px] border border-[var(--encre)] text-xl transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="pb-6 pr-10 leading-relaxed text-[var(--doux)]">{x.r}</p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 9 — La boutique. */}
      <section id="boutique" className="scroll-mt-16 mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-4xl sm:text-5xl">La boutique</h2>
          <p className="text-lg">{boutique.adresse}</p>
          <p><a href={`tel:${boutique.telephone.replace(/ /g, "")}`} className="text-xl font-semibold underline underline-offset-4 [font-variant-numeric:lining-nums]">{boutique.telephone}</a></p>
          <div className="relative aspect-[3/2] max-w-sm overflow-hidden rounded-[6px] border border-[var(--encre)]">
            <Image src={photos.bleu.src} alt={photos.bleu.alt} fill sizes="384px" className="object-cover" />
          </div>
        </div>
        <dl className="space-y-3 self-end">
          {boutique.horaires.map((h) => (
            <div key={h.jours} className="flex justify-between gap-4 border-b border-[var(--trait)] pb-3">
              <dt className="font-semibold">{h.jours}</dt>
              <dd className="text-right text-[var(--doux)]">{h.heures}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
