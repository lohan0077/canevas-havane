import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import CarteLueur from "../../_kit/CarteLueur";
import { AppelFinal, EnTetePage } from "../_composants/Blocs";
import { DessinProduit } from "../_composants/Dessins";
import Recherche from "../_composants/Recherche";
import Signature from "../_composants/Signature";
import { AUTEURS, DOSSIER, euros, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Les auteurs — Autographe, site de démonstration",
  description: "Le catalogue des auteurs de l'épicerie Autographe (entreprise fictive) : une apicultrice, un arboriculteur, une oléicultrice… On y cherche quelqu'un, pas un produit.",
  ...adressesDeLaPage("/exemples/autographe/auteurs"),
};

export default function Auteurs() {
  return (
    <main>
      <EnTetePage surtitre="Le catalogue" titre="Les *auteurs.*" photo={photos.pots} signature={3}>
        Six personnes, et tout ce qu&apos;elles font. Chacune a un numéro, comme un auteur dans une
        collection. On ne range rien par rayon : on range par personne.
      </EnTetePage>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 md:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <Apparition className="space-y-4">
          <h2 className="text-[clamp(2.4rem,4.6vw,4rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
            Un prénom, un métier, <em className="font-normal text-[var(--accent-texte)]">un lieu.</em>
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-[var(--doux)]">Tape ce que tu sais : « miel », « Drôme », « Lina ». La réponse est toujours quelqu&apos;un.</p>
        </Apparition>
        <Apparition de="zoom" delai={100}><Recherche /></Apparition>
      </section>

      <section className="border-t-2 border-[var(--encre)] bg-[var(--carte)]">
        <ol className="mx-auto max-w-7xl divide-y-2 divide-[var(--encre)] px-5 sm:px-8">
          {[...AUTEURS].sort((a, b) => a.numero - b.numero).map((a, i) => (
            <Apparition as="li" key={a.slug} delai={i * 60}>
              <CarteLueur>
                <Link href={`${DOSSIER}/auteurs/${a.slug}`} className="group grid gap-6 py-10 md:grid-cols-[7rem_1fr_1.1fr] md:items-center md:py-12">
                  <span className="font-[family-name:var(--titres)] text-5xl font-semibold text-[var(--accent-texte)] [font-variant-numeric:lining-nums]">n° {a.numero}</span>
                  <span className="space-y-2">
                    <span className="block font-[family-name:var(--titres)] text-[clamp(3.2rem,6vw,5rem)] font-semibold leading-none transition-[font-style] group-hover:italic">{a.prenom}</span>
                    <Signature variante={a.signature} couleur="#B43A2E" className="h-9 w-48" />
                    <span className="block text-xl">{a.metier}, {a.chiffre} {a.lieu}</span>
                  </span>
                  <span className="space-y-3">
                    <span className="flex flex-wrap items-end gap-1">
                      {a.oeuvres.map((o) => <DessinProduit key={o.nom} dessin={o.dessin} teinte={o.teinte} className="h-16 w-12" />)}
                    </span>
                    <span className="block text-[15px] leading-relaxed text-[var(--doux)]">
                      {a.oeuvres.map((o) => `${o.nom} · ${euros(o.prix)}`).join(" — ")}
                    </span>
                    <span className="inline-block border-b-2 border-[var(--encre)] pb-0.5 font-semibold">Tout ce {a.feminin ? "qu'elle" : "qu'il"} fait →</span>
                  </span>
                </Link>
              </CarteLueur>
            </Apparition>
          ))}
        </ol>
        <p className="mx-auto max-w-7xl px-5 pb-10 text-sm text-[var(--doux)] sm:px-8">Auteurs, lieux, pots et prix TTC d&apos;exemple : l&apos;épicerie est fictive.</p>
      </section>

      <AppelFinal />
    </main>
  );
}
