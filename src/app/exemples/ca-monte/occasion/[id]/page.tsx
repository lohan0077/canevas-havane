import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { adressesDeLaPage } from "@/lib/seo";
import Velo from "../../_composants/Velo";
import Jauge from "../../_composants/Jauge";
import { CarteOccasion, Libelle } from "../../_composants/Blocs";
import { DOSSIER, OCCASIONS, euros } from "../../_composants/donnees";

// « Chaque vélo d'occasion a sa fiche : la batterie testée, le résultat affiché. Et son
// marquage, comme la loi l'impose. » La fiche d'un vélo d'occasion.

export const dynamicParams = false;

export function generateStaticParams() {
  return OCCASIONS.map((o) => ({ id: o.id }));
}

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const o = OCCASIONS.find((x) => x.id === id);
  if (!o) return {};
  return {
    title: "Ça Monte — site de démonstration",
    description: `${o.nom} d'occasion, ${o.annee}, dans un magasin de vélos imaginaire : révision détaillée${o.batterie ? `, batterie testée à ${o.batterie.capacite} %` : ""}, marquage.`,
    ...adressesDeLaPage(`/exemples/ca-monte/occasion/${o.id}`),
  };
}

export default async function FicheOccasion({ params }: Props) {
  const { id } = await params;
  const o = OCCASIONS.find((x) => x.id === id);
  if (!o) notFound();
  const autres = OCCASIONS.filter((x) => x.id !== o.id).slice(0, 3);

  return (
    <div>
      <section className="mx-auto grid max-w-6xl gap-6 px-5 pb-14 pt-4 lg:grid-cols-2 lg:gap-12 lg:pt-10">
        <div className="space-y-4">
          <p className="text-[13px] text-[var(--doux)]">
            <Link href={`${DOSSIER}/occasion`} className="underline underline-offset-4">L&apos;occasion</Link> / {o.nom}
          </p>
          <div className="space-y-1">
            <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--accent-texte)]">Occasion · révisé à l&apos;atelier</p>
            <h1 className="font-bold uppercase leading-[0.98] tracking-tight text-[36px] sm:text-[52px]">{o.nom}</h1>
            <p className="flex flex-wrap items-baseline gap-x-3 text-[15px] text-[var(--doux)]">
              <span>{o.annee} · {o.km.toLocaleString("fr-FR")} km</span>
              <span className="font-[family-name:var(--titres)] text-[26px] font-bold tabular-nums text-[var(--encre)]">{euros(o.prix)}</span>
              <span>TTC · exemple</span>
            </p>
          </div>
          <div className="rounded-[24px] bg-[#E7E6DF] px-6 py-4">
            <Velo couleur={o.couleur} batterie={!!o.batterie} roues="#121417" className="mx-auto h-36 w-auto" titre={`Dessin du ${o.nom.toLowerCase()}`} />
          </div>
        </div>

        <div className="space-y-4 lg:pt-10">
          {o.batterie ? (
            <Jauge capacite={o.batterie.capacite} wh={o.batterie.wh} testeLe={o.batterie.testeLe} />
          ) : (
            <p className="rounded-[24px] bg-[var(--sombre)] p-5 text-[var(--sur-sombre)]">Vélo musculaire : pas de batterie à tester.</p>
          )}
          <div className="rounded-[24px] border-2 border-[var(--sombre)] bg-[var(--carte)] p-5">
            <p className="text-[12px] font-bold uppercase tracking-[0.14em]">Ce qu&apos;on a fait à l&apos;atelier</p>
            <ul className="mt-3 space-y-2">
              {o.revise.map((r) => (
                <li key={r} className="flex gap-3 leading-snug">
                  <span aria-hidden="true" className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#D7F23C] text-[12px] font-bold">✓</span>
                  {r}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[15px]"><strong>Taille :</strong> {o.taille}</p>
          </div>
          <div data-film="marquage" className="flex gap-4 rounded-[24px] border-2 border-[var(--sombre)] bg-[var(--carte)] p-5">
            <span aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--sombre)] text-xl font-bold text-[#D7F23C]">✓</span>
            <span>
              <span className="block text-[18px] font-bold leading-tight">Vélo marqué, comme la loi l&apos;impose</span>
              <span className="mt-2 inline-block rounded-full bg-[var(--sombre)] px-3 py-1 text-[13px] font-bold text-[#D7F23C]">Code des transports, art. L1271-2</span>
              <span className="mt-2 block leading-relaxed text-[var(--doux)]">Identifiant gravé sur le cadre, inscrit au fichier national des cycles identifiés. Tous les commerçants y sont tenus.</span>
              <span className="mt-2 block font-[family-name:var(--titres)] text-[15px] font-bold tracking-[0.12em]">Identifiant : 0000 0000 00 (exemple)</span>
            </span>
          </div>
          <Link href={`${DOSSIER}#essai`} className="flex min-h-14 items-center justify-center rounded-full bg-[var(--sombre)] px-6 text-[16px] font-bold uppercase tracking-[0.06em] text-[#D7F23C]">
            L&apos;essayer sur mon trajet
          </Link>
          <p className="text-[13px] text-[var(--doux)]">Garantie légale de conformité, comme pour un vélo neuf. Exemple : le magasin et le vélo sont fictifs.</p>
        </div>
      </section>
      <section className="border-t-2 border-[var(--sombre)] bg-[var(--carte)]">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <Libelle>Les autres</Libelle>
          <ul className="mt-6 grid gap-5 md:grid-cols-3">
            {autres.map((x) => <li key={x.id}><CarteOccasion o={x} /></li>)}
          </ul>
        </div>
      </section>
    </div>
  );
}
