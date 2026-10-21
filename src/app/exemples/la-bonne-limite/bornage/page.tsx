import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, ETAPES, photos } from "../_composants/donnees";

// « Et une page que personne ne fait : comment se passe un bornage. » Les étapes
// suivent la fiche Service-public.fr F3037 ; les frais communs, le Code civil,
// art. 646 (lus pour la vidéo, voir Videos/agenda-bureaux-etudes/SOURCES.md).
export const metadata: Metadata = {
  title: "La Bonne Limite — site de démonstration",
  description: "Un bornage, comment ça se passe ? Qui est convoqué, combien de temps, qui signe quoi : le guide d'un cabinet de géomètre-expert imaginaire.",
  ...adressesDeLaPage("/exemples/la-bonne-limite/bornage"),
};

export default function LeBornage() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-14 pt-10 sm:pt-16 md:grid-cols-[1.2fr_0.8fr] md:items-end">
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--accent-texte)]">Le guide</p>
          <h1 className="text-[44px] font-bold tracking-tight sm:text-7xl">Un bornage, comment ça se passe&nbsp;?</h1>
          <p className="text-lg leading-relaxed text-[var(--doux)]">Qui est convoqué · combien de temps · qui signe quoi.</p>
        </div>
        <Image src={photos.champs.src} alt={photos.champs.alt} width={photos.champs.largeur} height={photos.champs.hauteur} sizes="(min-width: 768px) 380px, 100vw" className="hidden h-auto w-full rounded-[28px] md:block" />
      </section>

      <section className="mx-auto max-w-3xl px-5 pb-16">
        <ol data-film="etapes" className="relative space-y-6 border-l-2 border-dashed border-[var(--accent)] pl-8">
          {ETAPES.map((e, i) => (
            <li key={e.titre} id={`etape-${i + 1}`} className="relative scroll-mt-24">
              <span aria-hidden="true" className="absolute -left-[47px] top-1 grid h-9 w-9 place-items-center rounded-lg border-2 border-[#2C3A26] bg-[#EDE7DB]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#F27438]" />
              </span>
              <div className="rounded-[24px] border border-[var(--trait)] bg-[var(--carte)] p-6 space-y-3">
                <p className="text-sm font-semibold text-[var(--accent-texte)]">Étape {i + 1} sur 4</p>
                <h2 className="text-3xl font-bold tracking-tight">{e.titre}</h2>
                <p className="text-lg leading-relaxed">{e.court}</p>
                <p className="leading-relaxed text-[var(--doux)]">{e.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-[var(--trait)] bg-[#EEF0E6]">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-16 md:grid-cols-3">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Qui paie&nbsp;?</h2>
            <p className="leading-relaxed text-[var(--doux)]">Le bornage se fait à frais communs (Code civil, art. 646) : en général, les voisins partagent.</p>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Combien de temps&nbsp;?</h2>
            <p className="leading-relaxed text-[var(--doux)]">Quelques semaines pour rechercher les titres et réunir tout le monde ; une demi-journée sur place. Délais d&apos;exemple.</p>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Et si on n&apos;est pas d&apos;accord&nbsp;?</h2>
            <p className="leading-relaxed text-[var(--doux)]">Personne ne signe contre son gré. Le bornage peut alors être demandé au juge, qui s&apos;appuie en général sur l&apos;avis d&apos;un géomètre-expert.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl space-y-5 px-5 py-16 text-center">
        <p className="text-sm text-[var(--doux)]">D&apos;après la fiche « Bornage » de Service-public.fr (F3037) et le Code civil, art. 646. Information générale.</p>
        <Link href={`${DOSSIER}/prix`} className="inline-flex min-h-[54px] items-center rounded-full bg-[var(--accent)] px-7 text-lg font-semibold text-[var(--sur-accent)]">
          Voir le prix pour ton terrain
        </Link>
      </section>
    </>
  );
}
