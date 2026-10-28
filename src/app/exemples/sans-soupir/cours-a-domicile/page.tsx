import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, Bouton, EnTetePage, Surtitre } from "../_composants/Blocs";
import Eligible from "../_composants/Eligible";
import { COURS, DOSSIER, FORMULES, euros, photos } from "../_composants/donnees";

// Porte 2 : les cours à domicile. La vidéo « Remplir l'agenda » : « Et des cours qui
// donnent envie : appeler ses petits-enfants en vidéo, ranger ses photos, payer en
// ligne sans stress. » Chaque cours a son ancre (#cours-video…), filmée.
export const metadata: Metadata = {
  title: "Cours à domicile — Sans Soupir, site de démonstration",
  description: "Les cours d'informatique à domicile de Sans Soupir : appeler la famille en vidéo, ranger ses photos, payer en ligne sans stress. Prix HT et TTC d'exemple, et ce qui peut ouvrir droit au crédit d'impôt.",
  ...adressesDeLaPage("/exemples/sans-soupir/cours-a-domicile"),
};

const DEROULE = [
  { temps: "0 min", texte: "On s'assoit à côté de toi. Tu tiens la souris, ou la tablette." },
  { temps: "10 min", texte: "On fait une fois ensemble, lentement." },
  { temps: "45 min", texte: "Tu refais seul. On ne touche plus à rien." },
  { temps: "1 h 20", texte: "On écrit la fiche ensemble, en gros, pour le frigo." },
];

export default function CoursADomicile() {
  return (
    <main>
      <EnTetePage surtitre="Porte 2 · Je veux apprendre" titre="Des cours qui *donnent envie.*" teinte="#7FD8BE" photo={photos.lunettes}>
        Une heure et demie chez toi, sur ton propre appareil. On ne parle pas de « paramètres » : on
        parle de ce que tu veux faire.
      </EnTetePage>

      <section data-film="cours" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <ul className="grid gap-5 md:grid-cols-2">
          {COURS.map((c, i) => (
            <Apparition as="li" key={c.id} id={`cours-${c.id}`} delai={(i % 2) * 120} de="zoom" className="scroll-mt-24 space-y-4 rounded-[2.4rem] p-7 sm:p-9" style={{ background: c.teinte }}>
              <p className="flex items-center justify-between text-[15px] font-bold">
                <span>Cours {i + 1}</span>
                <span className="rounded-full bg-[var(--carte)] px-3 py-1">{c.duree} chez toi</span>
              </p>
              <h2 className="text-[clamp(2rem,4vw,2.8rem)] font-extrabold leading-[1.0] tracking-[-0.03em]">{c.titre}</h2>
              <p className="text-[18px] leading-relaxed">{c.texte}</p>
              <p className="flex flex-wrap items-baseline gap-x-3 border-t border-[var(--encre)]/15 pt-4">
                <span className="font-[family-name:var(--titres)] text-3xl font-extrabold">{euros(c.ht * 1.2)} TTC</span>
                <span className="text-[15px]">{euros(c.ht)} HT · exemple</span>
              </p>
            </Apparition>
          ))}
        </ul>
      </section>

      <section className="px-3 sm:px-5">
        <div className="rounded-[3rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="space-y-6">
              <Surtitre clair>Un cours, minute par minute</Surtitre>
              <TitreRevele texte="Tu tiens *la souris.*" className="text-[clamp(2.8rem,6vw,5rem)] font-extrabold leading-[0.94] tracking-[-0.045em]" classeAccent="text-[var(--accent)]" />
              <p className="text-[20px] leading-relaxed">On ne fait jamais à ta place. On montre, tu refais. Et on répète, autrement à chaque fois.</p>
            </div>
            <ol className="space-y-3">
              {DEROULE.map((d, i) => (
                <Apparition as="li" key={d.temps} delai={i * 120} className="grid grid-cols-[92px_1fr] gap-4 rounded-[1.6rem] bg-white/10 px-5 py-4">
                  <span className="font-[family-name:var(--titres)] text-xl font-extrabold text-[var(--accent)]">{d.temps}</span>
                  <span className="leading-relaxed">{d.texte}</span>
                </Apparition>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <TitreRevele texte="Les *formules.*" className="mb-12 text-[clamp(2.8rem,6vw,5rem)] font-extrabold leading-[0.94] tracking-[-0.045em]" classeAccent="text-[var(--accent-texte)]" />
        <ul className="grid gap-5 md:grid-cols-3">
          {FORMULES.map((c, i) => (
            <Apparition as="li" key={c.titre} delai={i * 120} className="space-y-3 rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] p-7">
              <h2 className="text-2xl font-extrabold leading-tight">{c.titre}</h2>
              <p className="text-[var(--doux)]">{c.detail}</p>
              <p className="font-[family-name:var(--titres)] text-4xl font-extrabold">{euros(c.ht * 1.2)} <span className="text-xl">TTC</span></p>
              <p className="text-[15px] text-[var(--doux)]">soit {euros(c.ht)} HT · prix d&apos;exemple</p>
            </Apparition>
          ))}
        </ul>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 pb-24 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div className="space-y-6">
          <TitreRevele texte={"Et le crédit *d'impôt ?*"} className="text-[clamp(2.6rem,5.4vw,4.4rem)] font-extrabold leading-[0.96] tracking-[-0.04em]" classeAccent="text-[#14614E]" />
          <p className="text-[20px] leading-relaxed">
            Apprendre à domicile peut y ouvrir droit, si l&apos;entreprise est déclarée services à la
            personne et que les cours restent son activité principale. Le dépannage, non. Les prix
            ci-dessus sont ceux que tu paies ; l&apos;avantage fiscal se calcule à part, sur ta
            déclaration.
          </p>
          <div className="flex flex-wrap gap-3">
            <Bouton href={`${DOSSIER}/credit-d-impot`} variante="sombre">Ta situation, ma réponse</Bouton>
            <Link href={`${DOSSIER}/fiches`} className="self-center font-bold underline underline-offset-4">Les fiches gratuites</Link>
          </div>
        </div>
        <Apparition de="zoom"><Eligible /></Apparition>
      </section>

      <AppelFinal />
    </main>
  );
}
