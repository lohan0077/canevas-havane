import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, EnTetePage, Surtitre } from "../_composants/Blocs";
import { Fruit } from "../_composants/Dessins";
import { DOSSIER, ESSENCES, FRUITIERS, LIVRAISON, PHOTOS, euros, metres, recolteDe } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Nos arbres — Ombre Lente, site de démonstration",
  description: "Le catalogue d'une pépinière imaginaire : quatre arbres d'ombre, et leur hauteur dans vingt ans ; six fruitiers, et l'été de leur première récolte. Prix TTC d'exemple.",
  ...adressesDeLaPage("/exemples/ombre-lente/arbres"),
};

const PHOTOS_OMBRE = [PHOTOS.feuilles, PHOTOS.fleursTilleul, PHOTOS.arbreSeul, PHOTOS.tableOmbre];

export default function NosArbres() {
  return (
    <main>
      <EnTetePage surtitre="Le catalogue" titre="Dix arbres. *Tous lents.*" photo={PHOTOS.vergerRangs} origine="50% 45%">
        Quatre arbres pour l&apos;ombre, six pour les fruits. Tous livrés le {LIVRAISON.date},
        racines nues, avec leur passeport phytosanitaire.
      </EnTetePage>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
        <div className="mb-10 space-y-5">
          <Apparition><Surtitre annee="dans 20 ans">Pour l&apos;ombre</Surtitre></Apparition>
          <TitreRevele texte="L'ombre, *sur la terrasse.*" className="text-[clamp(2.6rem,5.5vw,4.8rem)] leading-[0.95]" classeAccent="italic text-[var(--accent-texte)]" />
        </div>
        <ul className="grid gap-5 sm:grid-cols-2">
          {ESSENCES.map((e, i) => (
            <Apparition as="li" key={e.slug} delai={(i % 2) * 120}>
              <Link href={`${DOSSIER}/arbres/${e.slug}`} className="group grid overflow-hidden rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] sm:grid-cols-[0.9fr_1.1fr]">
                <span className="relative block h-56 bg-[var(--sombre)] sm:h-full">
                  <Image src={PHOTOS_OMBRE[i].src} alt={PHOTOS_OMBRE[i].alt} fill sizes="(min-width: 640px) 22vw, 100vw" className="object-cover transition-transform duration-[1.4s] group-hover:scale-[1.06]" />
                </span>
                <span className="space-y-3 p-6">
                  <span className="block text-[13px] italic text-[var(--doux)]">{e.latin}</span>
                  <span className="block font-[family-name:var(--titres)] text-[32px] leading-tight">{e.nom}</span>
                  <span className="block leading-relaxed text-[var(--doux)]">{e.phrase}</span>
                  <span className="flex items-baseline justify-between border-t border-[var(--trait)] pt-3">
                    <span className="text-[15px]">{metres(e.depart)} → {metres(e.vingt)} <span className="text-[var(--doux)]">en 20 ans</span></span>
                    <span className="font-semibold tabular-nums">{euros(e.prix)}</span>
                  </span>
                </span>
              </Link>
            </Apparition>
          ))}
        </ul>
      </section>

      <section className="bg-[#E9DDBF]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
          <div className="mb-10 space-y-5">
            <Apparition><Surtitre annee="dès 2028">Pour les fruits</Surtitre></Apparition>
            <TitreRevele texte="Ta première récolte, *variété par variété.*" className="text-[clamp(2.6rem,5.5vw,4.8rem)] leading-[0.95]" classeAccent="italic text-[var(--accent-texte)]" />
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FRUITIERS.map((a, i) => (
              <Apparition as="li" key={a.slug} delai={(i % 3) * 100}>
                <Link href={`${DOSSIER}/arbres/${a.slug}`} className="group flex h-full flex-col justify-between gap-6 rounded-[2rem] bg-[var(--carte)] p-6 transition-transform hover:-translate-y-1">
                  <span className="flex items-start justify-between gap-4">
                    <Fruit fruit={a.fruit} className="h-24 w-24 transition-transform duration-500 group-hover:-rotate-6" />
                    <span className="rounded-full bg-[var(--sombre)] px-3 py-1 text-[13px] font-semibold text-[var(--sur-sombre)]">{recolteDe(a, "demi-tige")}</span>
                  </span>
                  <span className="space-y-2">
                    <span className="block font-[family-name:var(--titres)] text-[30px] leading-tight">{a.espece} {a.variete}</span>
                    <span className="block leading-relaxed text-[var(--doux)]">{a.phrase}</span>
                    <span className="block text-[15px] font-semibold">dès {euros(a.prix.scion)} TTC</span>
                  </span>
                </Link>
              </Apparition>
            ))}
          </ul>
          <p className="mt-6 text-[13px]">Prix TTC et années de récolte d&apos;exemple : la pépinière est fictive.</p>
        </div>
      </section>
      <AppelFinal />
    </main>
  );
}
