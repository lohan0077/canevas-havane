import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, gammes, options } from "../_composants/donnees";
import { Intitule, Plaque, styles as s } from "../_composants/Habillage";
import { AppelFinal, HautDePage, Section } from "../_composants/Blocs";
import Jardin from "../_composants/Jardin";

export const metadata: Metadata = {
  title: "Prix — Premier Plongeon (démonstration)",
  description: "Ce que coûte une piscine coque chez un pisciniste imaginaire : le calculateur selon la surface du jardin, les prix par gamme, ce qui fait varier le devis.",
  ...adressesDeLaPage("/exemples/premier-plongeon/prix"),
};

const VARIATIONS = [
  { titre: "L'accès pour la grue", texte: "Une rue étroite, un portail bas : une grue plus grande, ou une livraison par porteur. Jusqu'à 1 500 € d'écart." },
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
    <>
      <HautDePage />
      <main>
        <section className="max-w-6xl mx-auto px-5 sm:px-6 pt-14 sm:pt-20 pb-20 sm:pb-28 grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div className="space-y-9">
            <Intitule niveau={1} libelle="Prix" titre={<>Ce que coûte <span className="text-[#e8d1cb]">vraiment</span> une piscine.</>}>
              Glisse le curseur jusqu&apos;à la surface de ton jardin : le plan te montre la
              coque qui rentre, et son prix pose comprise. Le prix ferme vient après la
              visite technique, et il ne bouge plus.
            </Intitule>
            <Link href={`${DOSSIER}/ma-date`} className={s.bouton}>Réserver la visite technique</Link>
          </div>
          <Jardin />
        </section>

        <Section sombre className="space-y-12">
          <Intitule libelle="Par gamme" titre={<>Les prix, <span className="text-[#e8d1cb]">gamme par gamme.</span></>} />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-left border-y border-[rgba(255,255,255,0.13)]">
              <caption className="sr-only">Prix des quatre gammes de coques, pose comprise</caption>
              <thead>
                <tr className={`${s.technique} text-[11px] text-[#8f98a8]`}>
                  <th scope="col" className="py-4 pr-4 font-bold">Gamme</th>
                  <th scope="col" className="py-4 pr-4 font-bold">Coque</th>
                  <th scope="col" className="py-4 pr-4 font-bold">Jardin conseillé</th>
                  <th scope="col" className="py-4 font-bold">Prix TTC, pose comprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(255,255,255,0.13)] border-t border-[rgba(255,255,255,0.13)]">
                {gammes.map((g) => (
                  <tr key={g.id}>
                    <th scope="row" className="py-5 pr-4">
                      <Link href={`${DOSSIER}/piscines#${g.id}`} className={`${s.lien} text-lg font-bold`}>{g.nom}</Link>
                    </th>
                    <td className="py-5 pr-4 text-white">{g.coque}{" "}m</td>
                    <td className="py-5 pr-4 text-[#b9c0cc]">{g.jardin}</td>
                    <td className="py-5 font-bold text-[#7edbee] tabular-nums">{g.prix}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-[#8f98a8]">Prix d&apos;exemple : l&apos;entreprise est fictive.</p>
        </Section>

        <Section className="space-y-14">
          <Intitule libelle="Ce qui fait varier le prix" titre={<>Le terrain, <span className="text-[#e8d1cb]">pas la coque.</span></>}>
            La coque a un prix fixe. L&apos;écart entre deux devis vient presque toujours de
            ces quatre choses — et on les mesure toutes avant de chiffrer.
          </Intitule>
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {VARIATIONS.map((v) => (
              <li key={v.titre} className="space-y-2 border-t border-[rgba(255,255,255,0.13)] pt-5">
                <h3 className="font-bold text-lg text-white">{v.titre}</h3>
                <p className="leading-relaxed text-[#b9c0cc]">{v.texte}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section sombre className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <Intitule libelle="Dans le prix" titre={<>Tout ce qui est <span className="text-[#e8d1cb]">compris.</span></>} />
            <ul className="space-y-3">
              {COMPRIS.map((c) => (
                <li key={c} className="flex gap-3 text-[#e6eaf5]">
                  <span aria-hidden="true" className="mt-2 h-[7px] w-[6px] shrink-0 bg-[#e8d1cb]" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-8">
            <Intitule libelle="En option" titre={<>Ce qu&apos;on <span className="text-[#e8d1cb]">ajoute.</span></>} />
            <ul className="space-y-4">
              {options.map((o) => (
                <li key={o.nom}>
                  <Plaque coupe={14}>
                    <div className="p-5 flex flex-wrap items-baseline justify-between gap-3">
                      <span className="font-bold text-white">{o.nom}</span>
                      <span className={`${s.technique} text-xs text-[#e8d1cb]`}>{o.prix}</span>
                    </div>
                  </Plaque>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <div className="pt-24">
          <AppelFinal />
        </div>
      </main>
    </>
  );
}
