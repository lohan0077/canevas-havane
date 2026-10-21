import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, JEUX, POUR_DEUX } from "../_composants/donnees";
import LigneJeu from "../_composants/LigneJeu";

export const metadata: Metadata = {
  title: "Jeux de société pour 2 personnes · Vingt-Deux Heures — site de démonstration",
  description: "Les jeux de société pour deux personnes de Vingt-Deux Heures, boutique imaginaire : dix minutes au café, un soir de semaine, un dimanche entier.",
  ...adressesDeLaPage("/exemples/vingt-deux-heures/jeux-pour-deux"),
};

export default function JeuxPourDeux() {
  return (
    <div>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-14 pb-10 space-y-5">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">La question qu&apos;on nous pose le plus</p>
        <h1 className="text-[3rem] leading-[0.92] sm:text-7xl font-black uppercase tracking-[-0.05em] max-w-4xl">Jeux de société pour 2&nbsp;personnes.</h1>
        <p className="text-xl leading-relaxed max-w-2xl">
          À deux, tout dépend du temps que vous avez. Léa a classé ses jeux pour deux en trois
          moments, du plus court au plus long. L&apos;âge et les avertissements sont sur chaque jeu.
        </p>
      </section>

      {POUR_DEUX.map((m, i) => (
        <section key={m.titre} className={i % 2 === 0 ? "border-t-2 border-[var(--encre)] bg-[var(--carte)]" : "border-t-2 border-[var(--encre)]"}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="space-y-3">
              <p className="font-[family-name:var(--titres)] text-6xl font-black text-[var(--accent-texte)] tabular-nums">{i + 1}</p>
              <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-[-0.04em]">{m.titre}</h2>
            </div>
            <div className="grid gap-3">
              {m.jeux.map((r) => (
                <div key={r} className="space-y-2">
                  <LigneJeu jeu={JEUX[r]} />
                  <p className="px-2 text-lg leading-relaxed">
                    <span className="font-bold">Léa :</span> «&nbsp;{JEUX[r].mot}&nbsp;»
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="border-t-2 border-[var(--encre)] bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-5">
          <p className="font-[family-name:var(--titres)] text-4xl sm:text-6xl font-black uppercase tracking-[-0.04em] leading-[0.95]">Vous n&apos;êtes pas deux ?</p>
          <p className="text-xl">Trois questions, et Léa vous sort trois jeux pour votre tablée.</p>
          <Link href={`${DOSSIER}#trois-questions`} className="inline-flex rounded-full bg-[#F2B33D] text-[var(--encre)] px-7 py-3.5 text-lg font-bold">
            Les trois questions
          </Link>
        </div>
      </section>
    </div>
  );
}
