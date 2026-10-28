import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { ACCENT, EnTetePage, Surtitre, TITRE } from "../_composants/Blocs";
import Calcul from "../_composants/Calcul";
import Frise from "../_composants/Frise";
import { PHRASE_L322_2, photos } from "../_composants/donnees";

// Les honoraires : la frise de la vidéo « Remplir l'agenda » et le calcul de la marque.
// Rien avant le versement des fonds (CMF L519-6), dit comme la loi pour tous, jamais comme
// un avantage du cabinet (C. consom. L121-4, 10°). Barème d'exemple, TTC ; aucun taux.
export const metadata: Metadata = {
  title: "Quand je paie — Bonne Nouvelle, site de démonstration",
  description:
    "Les honoraires d'un courtier en crédit immobilier imaginaire : combien, quand on les paie, et ce que la loi dit pour tous les courtiers.",
  ...adressesDeLaPage("/exemples/bonne-nouvelle/honoraires"),
};

const POINTS = [
  { titre: "Fixés avant de commencer", texte: "Le mandat que tu signes écrit nos honoraires. Ils ne changent pas en cours de route, quel que soit le nombre de banques consultées." },
  { titre: "Payés après les fonds", texte: "Une fois les fonds versés, pas avant. C'est la loi pour tous les courtiers (CMF, art. L519-6)." },
  { titre: "Rien si la banque dit non", texte: "Sans prêt, rien n'est versé : tu ne nous dois rien. Et on t'appelle quand même." },
  { titre: "Ce que verse la banque", texte: "Elle peut nous verser une rémunération. Son existence et son montant te sont indiqués avant que tu ne t'engages." },
];

export default function Honoraires() {
  return (
    <main>
      <EnTetePage surtitre="Quand je paie" titre="Zéro euro *avant les fonds.*">
        Pas de frais de dossier, pas d&apos;acompte : non par générosité, mais parce que la loi
        l&apos;interdit à tous les courtiers avant le versement des fonds. Nous préférons simplement
        l&apos;écrire en grand.
      </EnTetePage>

      <section className="mx-auto grid grid-cols-1 max-w-7xl gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[1fr_1fr] lg:items-start">
        <Apparition de="zoom"><Frise /></Apparition>
        <div className="space-y-6">
          <Apparition><Surtitre>Combien</Surtitre></Apparition>
          <TitreRevele texte="Glisse le montant *que tu empruntes.*" className={`text-[clamp(2.6rem,5vw,4.6rem)] ${TITRE}`} classeAccent={ACCENT} />
          <Apparition de="zoom" delai={150}><Calcul /></Apparition>
        </div>
      </section>

      <section className="border-y border-[var(--trait)] bg-[#F7EBD3]">
        <div className="mx-auto grid grid-cols-1 max-w-7xl gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[1.2fr_0.8fr]">
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {POINTS.map((p, i) => (
              <Apparition as="li" key={p.titre} delai={i * 100} className="space-y-3 rounded-[1.75rem] bg-white p-7">
                <h2 className="font-[family-name:var(--titres)] text-[28px] font-semibold leading-tight tracking-[-0.02em]">{p.titre}</h2>
                <p className="text-[16px] leading-relaxed text-[var(--doux)]">{p.texte}</p>
              </Apparition>
            ))}
          </ul>
          <div className="space-y-6">
            <Apparition de="rideau" className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <Image src={photos.porte.src} alt={photos.porte.alt} fill sizes="(min-width: 1024px) 35vw, 100vw" className="object-cover" />
            </Apparition>
            <blockquote className="space-y-2">
              <p className="font-[family-name:var(--titres)] text-[22px] leading-snug">« {PHRASE_L322_2} »</p>
              <p className="text-[14px] text-[var(--doux)]">Code de la consommation, art. L322-2 : la phrase que tout courtier en crédit immobilier doit écrire, mot pour mot.</p>
            </blockquote>
          </div>
        </div>
      </section>
      <p className="mx-auto max-w-7xl px-5 pt-8 text-[14px] text-[var(--doux)] sm:px-8">
        Barème d&apos;exemple, toutes taxes comprises : l&apos;entreprise est fictive. Aucun taux n&apos;est affiché sur ce site.
      </p>
    </main>
  );
}
