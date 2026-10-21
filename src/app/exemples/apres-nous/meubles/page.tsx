import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import CalculPalier from "../../_kit/CalculPalier";
import { meubles, paliers, photos } from "../_composants/donnees";
import Plaque from "../_composants/Plaque";

export const metadata: Metadata = {
  title: "Les meubles · Après Nous — site de démonstration",
  description: "Site de démonstration d'un atelier d'ébénisterie imaginaire : tables, bureau et banc en bois massif, faits sur mesure, et combien coûte une table selon le nombre de convives.",
  ...adressesDeLaPage("/exemples/apres-nous/meubles"),
};

const ESSENCES = [
  { nom: "Chêne", texte: "Dur, clair, il fonce doucement avec les années. Le bois des tables de famille.", prix: "prix de base" },
  { nom: "Frêne", texte: "Plus clair encore, souple, le fil très dessiné. Pour les bancs et les bureaux.", prix: "environ 10 % de moins" },
  { nom: "Noyer", texte: "Brun, veiné, plus rare. Une table de noyer se remarque dans la pièce.", prix: "environ un tiers de plus" },
];

export default function Meubles() {
  return (
    <>
      <section className="mx-auto max-w-6xl space-y-6 px-5 pb-12 pt-10 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em]">Les meubles</p>
        <h1 className="max-w-4xl text-[50px] sm:text-7xl">
          Faits pour <span className="italic">être transmis.</span>
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed">
          Quatre meubles, dessinés chez toi, faits à l&apos;atelier, livrés et montés. Chacun a son
          numéro, et son registre.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-6">
        <ul className="divide-y divide-[var(--encre)] border-y border-[var(--encre)]">
          {meubles.map((m, i) => (
            <li key={m.id} className="grid gap-6 py-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
              {m.photo ? (
                <Image src={photos[m.photo].src} width={photos[m.photo].largeur} height={photos[m.photo].hauteur} alt={photos[m.photo].alt} sizes="(min-width: 768px) 480px, 100vw" className="aspect-[4/3] w-full object-cover" />
              ) : (
                <div className="grid aspect-[4/3] place-items-center border border-[var(--trait)] bg-[var(--carte)]" aria-hidden="true">
                  <Plaque numero={["12", "47"][i - 2] ?? "1"} className="w-2/3" />
                </div>
              )}
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent-texte)]">{["I", "II", "III", "IV"][i]} · délai {m.delai}</p>
                <h2 className="text-4xl sm:text-5xl">{m.nom}</h2>
                <p className="text-lg leading-relaxed text-[var(--doux)]">{m.texte}</p>
                <p className="text-xl font-semibold">{m.prix} <span className="text-sm font-normal text-[var(--doux)]">TTC · exemple</span></p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-[var(--carte)] px-5 py-20 sm:px-6" id="prix">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-6">
            <h2 className="text-5xl">
              Combien coûte une table <span className="italic">sur mesure&nbsp;?</span>
            </h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              On nous pose la question avant toutes les autres. La réponse tient surtout au nombre de
              couverts.
            </p>
          </div>
          <CalculPalier
            etiquette="Autour de la table"
            unite="personnes"
            min={2}
            max={14}
            depart={6}
            paliers={paliers}
            titreResultat="Ta table"
            legende="Prix TTC d'exemple, en chêne huilé, livraison et montage compris. Le prix exact est écrit sur le devis, après le dessin."
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-10 px-5 py-20 sm:px-6">
        <h2 className="text-5xl">
          Trois bois, <span className="italic">pas un de plus.</span>
        </h2>
        <ul className="grid gap-8 md:grid-cols-3">
          {ESSENCES.map((e) => (
            <li key={e.nom} className="space-y-3 border-t-2 border-[var(--encre)] pt-4">
              <h3 className="text-3xl">{e.nom}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
              <p className="text-xs font-semibold uppercase tracking-[0.2em]">{e.prix}</p>
            </li>
          ))}
        </ul>
        <Image src={photos.assemblage.src} width={photos.assemblage.largeur} height={photos.assemblage.hauteur} alt={photos.assemblage.alt} sizes="(min-width: 1024px) 1100px, 100vw" className="aspect-[16/9] w-full object-cover" />
      </section>
    </>
  );
}
