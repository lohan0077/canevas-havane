import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import CalculPalier from "../../_kit/CalculPalier";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, CHANFREIN_GRAND, Chapitre, EnTetePage } from "../_composants/Blocs";
import { meubles, paliers, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Les tables — Après Nous, site de démonstration",
  description: "Les meubles d'un atelier imaginaire : la table de famille, la table ronde, le bureau d'écolier, le banc. Dessinés chez toi, numérotés, et combien coûte une table sur mesure.",
  ...adressesDeLaPage("/exemples/apres-nous/meubles"),
};

const ESSENCES = [
  { nom: "Chêne", texte: "Dur, clair, il fonce doucement avec les années. Le bois des tables de famille.", prix: "prix de base" },
  { nom: "Frêne", texte: "Plus clair encore, souple, le fil très dessiné. Pour les bancs et les bureaux.", prix: "environ 10 % de moins" },
  { nom: "Noyer", texte: "Brun, veiné, plus rare. Une table de noyer se remarque dans la pièce.", prix: "environ un tiers de plus" },
];

export default function Meubles() {
  return (
    <main>
      <EnTetePage numero="III" surtitre="Les tables" titre="Faites pour *être transmises.*" photo={photos.tableDuSoir}>
        Quatre meubles, dessinés chez toi, faits à l&apos;atelier, livrés et montés. Chacun a son numéro, et son registre.
      </EnTetePage>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
        <ul className="space-y-20">
          {meubles.map((m, i) => (
            <li key={m.id} id={m.id} className="grid scroll-mt-24 gap-8 md:grid-cols-2 md:items-center">
              <Apparition de="rideau" className={`relative aspect-[4/3] overflow-hidden ${CHANFREIN_GRAND} ${i % 2 ? "md:order-2" : ""}`}>
                <Image src={photos[m.photo].src} alt={photos[m.photo].alt} fill sizes="(min-width: 768px) 540px, 100vw" className="object-cover" />
              </Apparition>
              <div className="space-y-4">
                <Apparition><Chapitre numero={["I", "II", "III", "IV"][i]}>Délai : {m.delai}</Chapitre></Apparition>
                <TitreRevele texte={m.nom} className="font-[family-name:var(--titres)] text-[clamp(2.4rem,4.5vw,4rem)] leading-[1] tracking-[-0.02em]" />
                <Apparition as="p" delai={150} className="text-lg leading-relaxed text-[var(--doux)]">{m.texte}</Apparition>
                <Apparition as="p" delai={200} className="text-xl font-semibold">{m.prix} <span className="text-sm font-normal text-[var(--doux)]">· exemple</span></Apparition>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section id="prix" className="scroll-mt-24 px-3 sm:px-5">
        <div className="mx-auto grid max-w-7xl gap-12 rounded-[2.5rem] bg-[var(--sombre)] px-5 py-20 text-[var(--sur-sombre)] sm:px-10 md:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-6">
            <Apparition><Chapitre clair>La question qu&apos;on nous pose d&apos;abord</Chapitre></Apparition>
            <TitreRevele
              texte={"Combien coûte une table *sur mesure ?*"}
              className="font-[family-name:var(--titres)] text-[clamp(2.8rem,5.5vw,5rem)] leading-[0.95] tracking-[-0.02em]"
              classeAccent="italic text-[#E0B36A]"
            />
            <Apparition as="p" delai={150} className="text-lg leading-relaxed text-[var(--sur-sombre)]/90">
              La réponse tient surtout au nombre de couverts.
            </Apparition>
          </div>
          <Apparition de="zoom" delai={100}>
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
          </Apparition>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-12 px-5 py-20 sm:px-8 md:py-28">
        <TitreRevele
          texte="Trois bois, *pas un de plus.*"
          className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.95] tracking-[-0.02em]"
          classeAccent="italic text-[var(--accent-texte)]"
        />
        <ul className="grid gap-8 md:grid-cols-3">
          {ESSENCES.map((e, i) => (
            <Apparition as="li" key={e.nom} delai={i * 120} className="space-y-3 border-t-2 border-[var(--encre)] pt-5">
              <h2 className="font-[family-name:var(--titres)] text-4xl">{e.nom}</h2>
              <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
              <p className="text-xs font-semibold uppercase tracking-[0.2em]">{e.prix}</p>
            </Apparition>
          ))}
        </ul>
      </section>
      <AppelFinal />
    </main>
  );
}
