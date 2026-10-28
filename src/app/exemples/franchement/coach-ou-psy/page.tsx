import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Questionnaire from "../../_kit/Questionnaire";
import { DOSSIER, ORIENTATION } from "../_composants/donnees";
import { AppelFinal, Bouton, Pastille } from "../_composants/Blocs";

// La page que personne n'ose faire. La vidéo : « Parce que les gens tapent : coach ou
// psychologue » (suggestion Google du 15/10/2026), puis « Et si c'est pas pour moi, je le
// dis. Je t'envoie vers quelqu'un d'autre. » Une orientation, jamais un diagnostic ; le
// coach ne se présente ni comme psychologue, ni comme médecin.
export const metadata: Metadata = {
  title: "Coach ou psychologue ? · Franchement — site de démonstration",
  description: "Coach ou psychologue : la réponse franche d'un cabinet de coaching imaginaire, et trois questions pour s'orienter. Site de démonstration, aucun diagnostic.",
  ...adressesDeLaPage("/exemples/franchement/coach-ou-psy"),
};

export default function CoachOuPsy() {
  return (
    <main>
      <section className="px-3 pt-2 pb-12">
        <div className="max-w-6xl mx-auto rounded-[36px] bg-[var(--carte)] px-6 py-10 sm:px-12 sm:py-16 space-y-6">
          <Pastille>Coach ou psychologue&nbsp;?</Pastille>
          <h1 className="text-[52px] sm:text-[84px] font-extrabold tracking-[-0.05em]">
            Je te le dis <span className="text-[var(--accent-texte)]">franchement.</span>
          </h1>
          <p className="text-xl leading-relaxed max-w-2xl">
            Je ne suis ni psychologue, ni médecin. Si ce que tu vis relève de leur métier, je
            ne vais pas te garder : je t&apos;envoie vers quelqu&apos;un d&apos;autre.
          </p>
        </div>
      </section>

      <section id="orientation" data-film="orientation" className="max-w-6xl mx-auto px-3 pb-12 grid gap-3 md:grid-cols-2">
        <div className="rounded-[32px] bg-[var(--sombre)] text-[var(--sur-sombre)] p-6 sm:p-10 space-y-3">
          <p className="text-sm font-bold uppercase tracking-[0.14em]">Une souffrance qui dure</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em]">Un psychologue ou un médecin.</h2>
          <p className="text-lg leading-relaxed">
            Tristesse, angoisse, sommeil, envie de rien depuis des semaines : commence par ton
            médecin traitant. C&apos;est lui qui peut t&apos;orienter.
          </p>
        </div>
        <div className="rounded-[32px] bg-[var(--accent)] text-[var(--sur-accent)] p-6 sm:p-10 space-y-3">
          <p className="text-sm font-bold uppercase tracking-[0.14em]">Une décision à prendre</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em]">On peut en parler.</h2>
          <p className="text-lg leading-relaxed">
            Changer de poste, de ville, de façon de travailler : une question à regarder sous
            tous les angles. C&apos;est mon métier.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 pb-12">
        <div className="rounded-[28px] border-2 border-[var(--encre)] p-6 sm:p-8 space-y-2">
          <p className="text-lg font-bold">Si tu penses au suicide, ou si tu as peur pour quelqu&apos;un&nbsp;: appelle le 3114.</p>
          <p className="leading-relaxed">
            Numéro national de prévention du suicide, gratuit, jour et nuit. En cas d&apos;urgence
            vitale : le 15 ou le 112.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 pb-16 sm:pb-24 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="space-y-4">
          <Pastille>Trois questions</Pastille>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.04em]">Pour savoir <span className="text-[var(--accent-texte)]">quelle porte.</span></h2>
          <p className="text-lg leading-relaxed">
            Ce n&apos;est pas un test, et ça ne pose aucun diagnostic. Trois questions, et une
            réponse franche. Rien n&apos;est enregistré.
          </p>
          <Bouton href={`${DOSSIER}/premier-appel`} variante="contour">Ou réserve l&apos;appel de 20 min</Bouton>
        </div>
        <Questionnaire
          questions={ORIENTATION.questions}
          resultats={ORIENTATION.resultats}
          surtitreResultat="Franchement"
          mention="Aucun diagnostic, aucune donnée enregistrée : le calcul se fait dans ton navigateur."
        />
      </section>

      <AppelFinal />
    </main>
  );
}
