import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, Bouton, EnTetePage, Surtitre } from "../_composants/Blocs";
import { Bornes } from "../_composants/Outils";
import { DOSSIER, LIVRABLES, photos } from "../_composants/donnees";

// La vidéo « Remplir l'agenda » : « Le site répond au nombre de bornes. Tu choisis, tu
// vois la fourchette. » Prix TTC d'exemple, comme dans la vidéo ; la part de chacun
// rappelle les frais communs. Et les trois prix du mur (« Créer une marque »).
export const metadata: Metadata = {
  title: "Les prix — Belle Portée, site de démonstration",
  description: "Combien coûte un bornage ? La fourchette au nombre de bornes. Et le mur porteur : la visite, la note de calcul, le passage pendant les travaux. Prix d'exemple d'un cabinet imaginaire.",
  ...adressesDeLaPage("/exemples/belle-portee/prix"),
};

const COMPRIS = [
  "Le déplacement sur place",
  "La recherche des titres de propriété et des anciens plans",
  "La convocation des voisins",
  "La pose des bornes",
  "Le procès-verbal de bornage, signé par tous",
];

const SUR_DEVIS = [
  { titre: "Division d'un terrain", texte: "Dépend du nombre de lots et des documents à préparer pour le cadastre." },
  { titre: "Plan du terrain", texte: "Dépend de la surface et de ce qu'il faut relever." },
  { titre: "Implantation d'une maison", texte: "Dépend du plan de l'architecte et du terrain." },
];

export default function LesPrix() {
  return (
    <main>
      <EnTetePage surtitre="Les prix" titre="Combien coûte *ton bornage ?*" photo={photos.champs} cote="2 À 6 BORNES">
        Choisis le nombre de bornes : la fourchette suit. Et pour un mur porteur, trois prix écrits.
      </EnTetePage>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-8 md:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <Bornes />
        <div className="space-y-5">
          <Apparition><Surtitre>Ce qui est compris</Surtitre></Apparition>
          <ul className="space-y-3">
            {COMPRIS.map((c, i) => (
              <Apparition as="li" key={c} delai={i * 80} className="flex gap-3 border-b-2 border-[var(--trait)] pb-3 text-lg leading-snug">
                <span aria-hidden="true" className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center bg-[var(--accent)] text-[12px] font-bold text-[var(--sur-accent)]">✓</span>
                {c}
              </Apparition>
            ))}
          </ul>
          <p className="leading-relaxed text-[var(--doux)]">
            Pourquoi une fourchette : deux terrains de même taille ne se ressemblent pas. Des titres
            anciens à retrouver, une haie qui cache une borne, un troisième voisin à convoquer. Le
            devis écrit, remis avant toute intervention, donne le prix exact.
          </p>
        </div>
      </section>

      <section className="border-y-2 border-[var(--encre)] bg-[var(--carte)]">
        <div className="mx-auto max-w-6xl space-y-10 px-4 py-16 sm:px-8 md:py-24">
          <TitreRevele texte="Le mur porteur : *trois prix.*" className="font-black uppercase text-[clamp(2.2rem,5vw,4.2rem)] leading-[0.92]" classeAccent="text-[var(--accent-texte)]" />
          <ul className="grid border-2 border-[var(--encre)] md:grid-cols-3">
            {LIVRABLES.map((l, i) => (
              <Apparition as="li" key={l.titre} delai={i * 120} className={`flex flex-col justify-between gap-6 bg-[var(--fond)] p-6 ${i > 0 ? "border-t-2 border-[var(--encre)] md:border-l-2 md:border-t-0" : ""}`}>
                <div className="space-y-2">
                  <h2 className="text-2xl font-black uppercase">{l.titre}</h2>
                  <p className="leading-relaxed text-[var(--doux)]">{l.texte}</p>
                </div>
                <p className="font-[family-name:var(--titres)] text-2xl font-black">{l.prix} <span className="text-sm font-normal text-[var(--doux)]">· exemple</span></p>
              </Apparition>
            ))}
          </ul>
          <div className="space-y-5">
            <h2 className="text-3xl font-black uppercase">Sur devis</h2>
            <ul className="grid gap-4 md:grid-cols-3">
              {SUR_DEVIS.map((s) => (
                <li key={s.titre} className="space-y-2 border-2 border-[var(--trait)] p-5">
                  <h3 className="text-xl font-bold uppercase">{s.titre}</h3>
                  <p className="leading-relaxed text-[var(--doux)]">{s.texte}</p>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-sm text-[var(--doux)]">Prix TTC d&apos;exemple pour un particulier : le cabinet est fictif. Le devis écrit précède toute intervention.</p>
          <Bouton href={`${DOSSIER}/mon-mur`} variante="encre">Mon mur en photo</Bouton>
        </div>
      </section>
      <AppelFinal />
    </main>
  );
}
