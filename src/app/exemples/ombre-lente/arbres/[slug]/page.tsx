import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, ESSENCES, PHOTOS, essence, hauteur, metres } from "../../_composants/donnees";
import { Passeport, Surtitre } from "../../_composants/Elements";
import { Reservation } from "../../_composants/Interactifs";

// La fiche d'un arbre : sa hauteur dans le temps, son passeport phytosanitaire montré
// tel qu'il sera reçu (« je le montrerais sur chaque fiche »), et la réservation.

export const dynamicParams = false;

export function generateStaticParams() {
  return ESSENCES.map((e) => ({ slug: e.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const e = essence(slug);
  if (!e) return {};
  return {
    title: "Ombre Lente — site de démonstration",
    description: `${e.nom} (${e.latin}) : sa hauteur indicative dans vingt ans et son passeport phytosanitaire. Fiche d'une pépinière imaginaire.`,
    ...adressesDeLaPage(`/exemples/ombre-lente/arbres/${e.slug}`),
  };
}

export default async function FicheArbre({ params }: Props) {
  const { slug } = await params;
  const e = essence(slug);
  if (!e) notFound();
  const autres = ESSENCES.filter((x) => x.slug !== e.slug);

  return (
    <main>
      <section className="mx-auto grid max-w-5xl gap-10 px-5 pb-16 pt-8 sm:px-8 md:grid-cols-[1.1fr_0.9fr] md:items-start">
        <div className="space-y-6">
          <nav aria-label="Fil d'Ariane" className="text-[14px] text-[var(--doux)]">
            <Link href={`${DOSSIER}/arbres`} className="underline underline-offset-4">Nos arbres</Link> / {e.nom}
          </nav>
          <div className="space-y-3">
            <Surtitre>{e.latin}</Surtitre>
            <h1 className="text-[54px] font-normal sm:text-7xl">{e.nom}</h1>
            <p className="font-[family-name:var(--titres)] text-[26px] italic leading-snug text-[var(--doux)]">{e.phrase}</p>
          </div>
          {e.slug === "tilleul" ? (
            <div className="overflow-hidden rounded-[32px]">
              <Image src={PHOTOS.fleursTilleul.src} alt={PHOTOS.fleursTilleul.alt} width={PHOTOS.fleursTilleul.largeur} height={PHOTOS.fleursTilleul.hauteur} sizes="(min-width: 768px) 520px, 92vw" className="h-auto w-full" priority />
            </div>
          ) : null}
          <ol className="grid grid-cols-4 gap-2 rounded-[26px] border border-[var(--trait)] bg-[var(--carte)] p-4 text-center" aria-label="Hauteur indicative dans le temps">
            {[0, 5, 10, 20].map((n) => (
              <li key={n}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--doux)]">{n === 0 ? "Livré" : `${n} ans`}</p>
                <p className="text-[20px] font-bold tabular-nums">{metres(hauteur(e, n))}</p>
              </li>
            ))}
          </ol>
          <p className="text-[13px] text-[var(--doux)]">Hauteurs indicatives d&apos;exemple : croissance moyenne en bon sol. {e.sol}.</p>
        </div>
        <div className="md:sticky md:top-24">
          <Reservation nom={e.nom} prix={e.prix} />
        </div>
      </section>

      <section id="passeport" className="scroll-mt-20 border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto max-w-5xl space-y-8 px-5 py-16 sm:px-8">
          <div className="max-w-2xl space-y-4">
            <Surtitre>Son passeport</Surtitre>
            <h2 className="text-[42px] font-normal sm:text-5xl">L&apos;étiquette qui voyage avec lui.</h2>
            <p className="text-[17px] leading-relaxed text-[var(--doux)]">
              Expédié, ton arbre part avec son passeport phytosanitaire, attaché au tronc. C&apos;est la loi pour toute
              plante vendue à distance (règlement (UE) 2016/2031, art. 79, 81 et 83). Le voici, avant l&apos;achat.
            </p>
          </div>
          <Passeport latin={e.latin} lot={e.lot} />
        </div>
      </section>

      <section className="mx-auto max-w-5xl space-y-6 px-5 py-16 sm:px-8">
        <h2 className="text-[38px] font-normal sm:text-5xl">Où le planter.</h2>
        <ul className="grid gap-4 sm:grid-cols-3">
          {[
            ["Au soleil de l'après-midi", "Pour que son ombre tombe sur la terrasse quand tu en as besoin : entre la terrasse et l'ouest."],
            ["À 2 mètres de la limite", "Au moins, pour un arbre qui dépassera 2 mètres, sauf règlement ou usage local (Code civil, art. 671)."],
            ["Loin des canalisations", "Ses racines iront aussi loin que sa couronne. Garde de la place autour."],
          ].map(([t, d]) => (
            <li key={t} className="space-y-2 rounded-[24px] border border-[var(--trait)] p-6">
              <h3 className="text-[26px] font-normal">{t}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{d}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-[#EAE2CF]">
        <div className="mx-auto max-w-5xl space-y-6 px-5 py-14 sm:px-8">
          <h2 className="text-[34px] font-normal">Les trois autres</h2>
          <ul className="grid gap-3 sm:grid-cols-3">
            {autres.map((x) => (
              <li key={x.slug}>
                <Link href={`${DOSSIER}/arbres/${x.slug}`} className="block rounded-[22px] bg-[var(--carte)] p-5">
                  <span className="block font-[family-name:var(--titres)] text-[26px] leading-tight">{x.nom}</span>
                  <span className="block text-[14px] text-[var(--doux)]">À 20 ans : ~{metres(x.vingt)} · exemple</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
