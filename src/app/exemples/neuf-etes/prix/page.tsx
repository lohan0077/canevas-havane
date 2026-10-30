import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { AppelFinal, Bouton, EnTetePage, Soleil, Titre } from "../_composants/Blocs";
import { DOSSIER, gammes, options, photos } from "../_composants/donnees";
import Jardin from "../_composants/Jardin";

export const metadata: Metadata = {
  title: "Prix — Neuf Étés (démonstration)",
  description: "Ce que coûte une piscine coque chez une marque imaginaire : le calculateur en 3D selon la surface du jardin, les prix par coque, ce qui fait varier le devis.",
  ...adressesDeLaPage("/exemples/neuf-etes/prix"),
};

const VARIATIONS = [
  { titre: "L'accès pour la grue", texte: "Une rue étroite, un portail bas : une grue plus grande, ou une livraison par porteur. Jusqu'à 1 500 € d'écart." },
  { titre: "La nature du sol", texte: "Un sol rocheux se brise au marteau, une nappe proche se pompe. On le sait en une heure de visite technique." },
  { titre: "La plage autour", texte: "Un côté en bois ou tout le tour en pierre : c'est souvent elle qui fait la différence entre deux devis." },
  { titre: "Les options", texte: "Volet, pompe à chaleur, éclairage : chacune chiffrée à part, pour que tu choisisses en connaissance de cause." },
];

const COMPRIS = [
  "Terrassement et évacuation des terres",
  "Lit de pose compacté",
  "La coque et sa livraison",
  "Filtration complète et local technique",
  "Remblai et margelles",
  "Mise en eau et équilibrage",
  "Déclaration préalable de travaux",
  "Prise en main au bord de l'eau",
];

export default function Prix() {
  return (
    <main>
      <EnTetePage
        titre="Ce que coûte vraiment une piscine."
        photo={photos.vueDuCiel}
        actions={<Bouton href="#calcul">Calculer pour mon jardin</Bouton>}
      >
        Une fourchette honnête, pose comprise, pour la coque qui rentre dans ton jardin. Le
        prix ferme vient après la visite technique, et il ne bouge plus.
      </EnTetePage>

      <section id="calcul" className="scroll-mt-20 mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="space-y-7 lg:sticky lg:top-28">
          <Titre texte={"Ton jardin fait combien\u00a0?"} />
          <Apparition as="p" delai={200} className="max-w-md text-xl leading-relaxed text-[var(--doux)]">
            Glisse, regarde, compare. La surface, la forme du terrain, le côté de la maison,
            la terrasse : la maquette pose la plus grande coque qui tient à un mètre des
            limites, et son prix.
          </Apparition>
          <Apparition delai={300}>
            <Bouton href={`${DOSSIER}/ma-date`} variante="sombre">Réserver la visite technique</Bouton>
          </Apparition>
        </div>
        <Apparition de="zoom" delai={150}>
          <Jardin />
        </Apparition>
      </section>

      <section className="px-3 sm:px-5">
        <div className="rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto max-w-6xl space-y-12 px-5 py-24 sm:px-10 md:py-32">
            <Titre texte="Les prix, coque par coque." />
            <ul className="divide-y divide-white/15 border-y border-white/15">
              {gammes.map((g, i) => (
                <Apparition as="li" key={g.id} delai={i * 90}>
                  <Link href={`${DOSSIER}/piscines#${g.id}`} className="group grid gap-2 py-7 sm:grid-cols-[1fr_auto] sm:items-baseline">
                    <span>
                      <span className="block font-[family-name:var(--titres)] text-3xl font-normal group-hover:underline">{g.nom}</span>
                      <span className="block text-[15px]">Coque {g.coque}{" "}m, pour un jardin de {g.jardin}</span>
                    </span>
                    <span className="font-[family-name:var(--titres)] text-[clamp(1.9rem,4vw,3rem)] font-normal tabular-nums text-[var(--accent)]">{g.prix}</span>
                  </Link>
                </Apparition>
              ))}
            </ul>
            <p className="text-[15px]">TTC, pose comprise. Prix d&apos;exemple : l&apos;entreprise est fictive.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-14 px-5 py-24 sm:px-8 md:py-32">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <Titre texte={"Ce qui fait varier le prix\u00a0: le terrain, pas la coque."} />
          <Apparition as="p" delai={200} className="text-xl leading-relaxed text-[var(--doux)]">
            La coque a un prix fixe. L&apos;écart entre deux devis vient presque toujours de ces
            quatre choses — et on les mesure toutes avant de chiffrer.
          </Apparition>
        </div>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VARIATIONS.map((v, i) => (
            <Apparition as="li" key={v.titre} delai={i * 110} className="rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] p-7">
              <h3 className="text-2xl font-bold">{v.titre}</h3>
              <p className="mt-3 leading-relaxed text-[var(--doux)]">{v.texte}</p>
            </Apparition>
          ))}
        </ul>
      </section>

      <section className="bg-[var(--accent)] text-[var(--sur-accent)]">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 md:py-28 lg:grid-cols-2">
          <div className="space-y-7">
            <Titre texte="Tout ce qui est compris dans le prix." />
            <ul className="grid gap-3 sm:grid-cols-2">
              {COMPRIS.map((c) => (
                <li key={c} className="flex items-start gap-3 rounded-[1.2rem] bg-[var(--fond)] px-4 py-3 text-[var(--encre)]">
                  <Soleil className="mt-0.5 h-5 w-5" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-7">
            <Titre texte="Les options, chiffrées à part." />
            <ul className="space-y-3">
              {options.map((o) => (
                <li key={o.nom} className="flex flex-wrap items-baseline justify-between gap-3 rounded-[1.4rem] bg-[var(--sombre)] px-5 py-4 text-[var(--sur-sombre)]">
                  <span className="font-[family-name:var(--titres)] text-lg font-normal">{o.nom}</span>
                  <span className="font-bold text-[var(--accent)]">{o.prix}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
