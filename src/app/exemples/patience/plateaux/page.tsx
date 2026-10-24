import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import CarteLueur from "../../_kit/CarteLueur";
import { AppelFinal, EnTetePage } from "../_composants/Blocs";
import Dessin from "../_composants/Dessin";
import { DOSSIER, OCCASIONS, euros, photos, plateauPour } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Les plateaux par occasion — Patience, site de démonstration",
  description: "Plateaux de fromage pour 6, 10, 20 personnes ou pour un mariage, à la fromagerie Patience (entreprise fictive) : composition, poids, prix par personne.",
  ...adressesDeLaPage("/exemples/patience/plateaux"),
};

export default function Plateaux() {
  return (
    <main>
      <EnTetePage surtitre="Par occasion" titre="Un plateau *pour chaque tablée.*" photo={photos.plateau}>
        Ce que tout le monde cherche avant de recevoir : pour combien, combien de fromages, combien ça coûte.
      </EnTetePage>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
        <ul className="grid gap-6 md:grid-cols-2">
          {OCCASIONS.map((o, i) => {
            const p = plateauPour(o.personnes);
            return (
              <Apparition as="li" key={o.slug} delai={(i % 2) * 120} de="zoom">
                <CarteLueur className="h-full rounded-[1.5rem]">
                  <Link href={`${DOSSIER}/plateaux/${o.slug}`} className="group flex h-full flex-col gap-5 rounded-[1.5rem] border-2 border-[var(--encre)] bg-[var(--carte)] p-7 sm:p-9">
                    <span className="font-[family-name:var(--titres)] text-[2.2rem] leading-tight">{o.titre}</span>
                    <span className="flex flex-wrap items-end gap-1">{p.fromages.map((f) => <Dessin key={f.numero} forme={f.forme} teinte={f.teinte} className="h-12 w-16" />)}</span>
                    <span className="text-lg text-[var(--doux)]">{o.chapo}</span>
                    <span className="mt-auto font-semibold [font-variant-numeric:lining-nums]">{p.fromages.length} fromages · {p.poids} · {euros(p.parPersonne)} par personne <span className="font-normal text-[var(--doux)]">· exemple</span></span>
                  </Link>
                </CarteLueur>
              </Apparition>
            );
          })}
        </ul>
        <div className="relative mt-16 aspect-[21/9] overflow-hidden rounded-t-[10rem] rounded-b-[1.5rem]">
          <Image src={photos.morceaux.src} alt={photos.morceaux.alt} fill sizes="100vw" className="object-cover" />
        </div>
      </section>
      <AppelFinal />
    </main>
  );
}
