import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../../_kit/Apparition";
import { AppelFinal, Bouton, CarteOccasion, EnTetePage, Pastille } from "../../_composants/Blocs";
import Jauge from "../../_composants/Jauge";
import Velo from "../../_composants/Velo";
import { DOSSIER, IMAGES, OCCASIONS, euros } from "../../_composants/donnees";

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
    title: `${o.nom} d'occasion — Tour du Quartier, site de démonstration`,
    description: `${o.nom} d'occasion, ${o.annee}, dans un magasin de vélos imaginaire : révision détaillée${o.batterie ? `, batterie testée à ${o.batterie.capacite} %` : ""}, marquage.`,
    ...adressesDeLaPage(`/exemples/tour-du-quartier/occasion/${o.id}`),
  };
}

export default async function FicheOccasion({ params }: Props) {
  const { id } = await params;
  const o = OCCASIONS.find((x) => x.id === id);
  if (!o) notFound();
  const autres = OCCASIONS.filter((x) => x.id !== o.id).slice(0, 3);

  return (
    <main>
      <EnTetePage pastille={`Occasion · ${o.annee} · ${o.km.toLocaleString("fr-FR")} km`} titre={`${o.nom}, *${euros(o.prix)}.*`} photo={IMAGES.atelier}>
        TTC · exemple. Révisé à l&apos;atelier, batterie testée, marqué. <Link href={`${DOSSIER}/occasion`} className="underline underline-offset-4">Toutes les occasions</Link>
      </EnTetePage>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-2 lg:gap-14">
        <div className="space-y-5">
          <Apparition de="zoom" className="rounded-[40px] bg-[#E3EFD9] px-6 py-10">
            <Velo couleur={o.couleur} batterie={!!o.batterie} roues="#1F3A2C" className="mx-auto h-44 w-auto" titre={`Dessin du ${o.nom.toLowerCase()}`} />
          </Apparition>
          <div className="rounded-[32px] bg-[var(--carte)] p-6 shadow-[0_20px_40px_-32px_rgba(31,58,44,0.6)]">
            <Pastille>Ce qu&apos;on a fait à l&apos;atelier</Pastille>
            <ul className="mt-4 space-y-2.5">
              {o.revise.map((r) => (
                <li key={r} className="flex gap-3 leading-snug">
                  <span aria-hidden="true" className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#F2C14E] text-[13px] font-bold text-[#1F3A2C]">✓</span>
                  {r}
                </li>
              ))}
            </ul>
            <p className="mt-4"><strong>Taille :</strong> {o.taille}</p>
          </div>
        </div>

        <div className="space-y-5">
          {o.batterie ? (
            <Jauge capacite={o.batterie.capacite} wh={o.batterie.wh} testeLe={o.batterie.testeLe} />
          ) : (
            <p className="rounded-[24px] bg-[var(--sombre)] p-5 text-[var(--sur-sombre)]">Vélo musculaire : pas de batterie à tester.</p>
          )}
          <div data-film="marquage" className="flex gap-4 rounded-[32px] border-2 border-[var(--sombre)] bg-[var(--carte)] p-6">
            <span aria-hidden="true" className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[var(--sombre)] text-xl font-bold text-[#F2C14E]">✓</span>
            <span>
              <span className="block font-[family-name:var(--titres)] text-lg font-bold leading-tight">Vélo marqué, comme la loi l&apos;impose</span>
              <span className="mt-2 inline-block rounded-full bg-[var(--sombre)] px-3 py-1 text-[13px] font-bold text-[#F2C14E]">Code des transports, art. L1271-2</span>
              <span className="mt-2 block leading-relaxed text-[var(--doux)]">Identifiant gravé sur le cadre, inscrit au fichier national des cycles identifiés. Tous les commerçants y sont tenus.</span>
              <span className="mt-2 block font-[family-name:var(--titres)] text-[14px] font-semibold tracking-[0.06em]">Identifiant : 0000 0000 00 (exemple)</span>
            </span>
          </div>
          <Bouton href={`${DOSSIER}/lundi-matin#essai`} variante="vert">L&apos;essayer sur mon trajet</Bouton>
          <p className="text-[13px] text-[var(--doux)]">Garantie légale de conformité, comme pour un vélo neuf. Exemple : le magasin et le vélo sont fictifs.</p>
        </div>
      </section>

      <section className="border-t border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <Pastille>Les autres</Pastille>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {autres.map((x) => <li key={x.id}><CarteOccasion o={x} /></li>)}
          </ul>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
