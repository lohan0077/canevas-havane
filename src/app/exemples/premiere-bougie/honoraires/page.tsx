import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, EnTetePage, Surtitre } from "../_composants/Blocs";
import Honoraires from "../_composants/Honoraires";
import { DOSSIER, ETAPES } from "../_composants/donnees";

// La page qui répond à ce que les gens tapent (« combien coûte un cabinet de
// recrutement », suggestion Google relevée le 15/10/2026) : un exemple chiffré, ligne par
// ligne, pas « nous consulter » (« Remplir l'agenda »). Le versement en deux temps vient
// de la marque : le reste n'est dû qu'à la première bougie. Prix HT : clients professionnels.
export const metadata: Metadata = {
  title: "Combien coûte un cabinet de recrutement ? — Première Bougie, site de démonstration",
  description: "Un forfait de recrutement d'exemple, ligne par ligne et hors taxes : de la définition du poste au gâteau du jour 365. 60 % à l'arrivée, 40 % à la première bougie. Site de démonstration.",
  ...adressesDeLaPage("/exemples/premiere-bougie/honoraires"),
};

const PRINCIPES = [
  { t: "Un forfait, pas un pourcentage", d: "Il est écrit et signé avant de commencer. Il ne bouge pas si le salaire négocié monte." },
  { t: "Ligne par ligne", d: "Chaque étape a son prix. Tu sais ce que tu paies, et pourquoi." },
  { t: "Le reste à la première bougie", d: "60 % à l'arrivée de la personne, 40 % le jour de sa première année. Si elle part avant, tu ne paies pas le reste." },
  { t: "Rien pour les candidats", d: "Placement gratuit : aucun frais ne peut leur être demandé (code du travail, art. L.5321-3)." },
];

export default function PageHonoraires() {
  return (
    <main>
      <EnTetePage surtitre="Honoraires · exemples HT" titre={"Combien coûte un cabinet de *recrutement ?*"}>
        Ça dépend du poste. Alors plutôt que « nous consulter », voilà trois exemples chiffrés, ligne par
        ligne, de la définition du poste au gâteau du jour 365.
      </EnTetePage>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-8 md:py-28 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <Apparition><Surtitre className="text-[var(--doux)]">Un exemple chiffré</Surtitre></Apparition>
          <TitreRevele
            texte="Choisis un poste. *Lis chaque ligne.*"
            className="font-[family-name:var(--titres)] text-[clamp(2.4rem,4.6vw,3.8rem)] leading-[0.95] tracking-[-0.02em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
          <Apparition as="p" delai={150} className="text-lg leading-relaxed text-[var(--doux)]">
            Des exemples, hors taxes : le cabinet est fictif, et ses clients sont des entreprises. Les
            vrais honoraires sont écrits avant de signer quoi que ce soit.
          </Apparition>
        </div>
        <Apparition de="zoom">
          <Honoraires />
        </Apparition>
      </section>

      <section className="px-3 sm:px-5">
        <div className="kit-grain overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto max-w-6xl space-y-12 px-6 py-20 sm:px-10 md:py-28">
            <div className="max-w-3xl space-y-6">
              <Surtitre>Nos principes</Surtitre>
              <TitreRevele
                texte="Écrits *avant de signer.*"
                className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5.4vw,4.6rem)] leading-[0.95] tracking-[-0.02em]"
                classeAccent="italic text-[var(--accent)]"
              />
            </div>
            <ul className="grid gap-5 md:grid-cols-2">
              {PRINCIPES.map((p, i) => (
                <Apparition as="li" key={p.t} delai={i * 110} className="space-y-3 rounded-[2rem] border border-white/15 p-7">
                  <span className="block font-[family-name:var(--titres)] text-[2.4rem] italic leading-none text-[var(--accent)]">{i + 1}</span>
                  <span className="block font-[family-name:var(--titres)] text-[1.7rem] leading-tight">{p.t}</span>
                  <span className="block text-[17px] leading-relaxed">{p.d}</span>
                </Apparition>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-28">
        <div className="mb-10 max-w-3xl space-y-6">
          <Apparition><Surtitre className="text-[var(--doux)]">Ce que paie le forfait</Surtitre></Apparition>
          <TitreRevele
            texte="Quatre moments, *une bougie.*"
            className="font-[family-name:var(--titres)] text-[clamp(2.4rem,4.6vw,3.8rem)] leading-[0.95] tracking-[-0.02em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
        </div>
        <ol className="grid gap-6 md:grid-cols-4">
          {ETAPES.map((e, i) => (
            <Apparition as="li" key={e.jour} delai={i * 110} className="space-y-3 border-t-2 border-[var(--encre)] pt-5">
              <span className="block text-[13px] font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">{e.jour}</span>
              <span className="block font-[family-name:var(--titres)] text-[1.6rem] leading-tight">{e.titre}</span>
              <span className="block text-[16px] leading-relaxed text-[var(--doux)]">{e.texte}</span>
            </Apparition>
          ))}
        </ol>
        <p className="mt-10 text-[15px] text-[var(--doux)]">
          Un poste vide en ce moment ?{" "}
          <a href={`${DOSSIER}#vingt-minutes`} className="font-bold text-[var(--encre)] underline underline-offset-4">Vingt minutes pour le définir</a>.
        </p>
      </section>

      <AppelFinal />
    </main>
  );
}
