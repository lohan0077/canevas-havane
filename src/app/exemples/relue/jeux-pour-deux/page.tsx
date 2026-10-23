import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, Bouton, EnTetePage } from "../_composants/Blocs";
import LigneJeu from "../_composants/LigneJeu";
import { DOSSIER, JEUX, POUR_DEUX, maison, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Jeux de société pour 2 personnes — Relue, site de démonstration",
  description: "Les jeux de société pour deux personnes de Relue, boutique imaginaire : dix minutes au café, un soir de semaine, un dimanche entier.",
  ...adressesDeLaPage("/exemples/relue/jeux-pour-deux"),
};

export default function JeuxPourDeux() {
  return (
    <main>
      <EnTetePage surtitre="La question qu'on nous pose le plus" titre={"Jeux de société *pour 2 personnes.*"} photo={photos.deNoir}>
        À deux, tout dépend du temps que vous avez. {maison.vendeuse} a classé ses jeux pour deux en trois
        moments, du plus court au plus long. L&apos;âge et les avertissements sont sur chaque jeu.
      </EnTetePage>

      {POUR_DEUX.map((m, i) => (
        <section key={m.titre} className={i % 2 === 0 ? "bg-[var(--carte)]" : ""}>
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="space-y-4 lg:sticky lg:top-28 lg:self-start">
              <Apparition>
                <p className="font-[family-name:var(--titres)] text-[6rem] italic leading-[0.8] text-[var(--accent-texte)]">{i + 1}</p>
              </Apparition>
              <TitreRevele
                texte={m.titre}
                className="font-[family-name:var(--titres)] text-[clamp(2.4rem,4.4vw,3.8rem)] font-normal leading-[0.98] tracking-[-0.03em]"
              />
            </div>
            <div className="grid gap-5">
              {m.jeux.map((r, k) => (
                <Apparition key={r} delai={k * 120} de="droite" className="space-y-3">
                  <LigneJeu jeu={JEUX[r]} />
                  <p className="px-2 font-[family-name:var(--titres)] text-xl italic leading-snug">
                    {maison.vendeuse} : «&nbsp;{JEUX[r].mot}&nbsp;»
                  </p>
                </Apparition>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="px-3 py-20 sm:px-5">
        <div className="rounded-[2rem] bg-[#24382E] text-[var(--sur-sombre)]">
          <div className="mx-auto max-w-6xl space-y-6 px-6 py-20 sm:px-10">
            <TitreRevele
              texte={"Vous n'êtes *pas deux\u00a0?*"}
              className="font-[family-name:var(--titres)] text-[clamp(2.8rem,6vw,5.4rem)] font-normal leading-[0.95] tracking-[-0.03em]"
              classeAccent="italic text-[#E9B44C]"
            />
            <p className="max-w-xl text-xl">Trois questions, et {maison.vendeuse} vous sort trois jeux pour votre tablée.</p>
            <Bouton href={`${DOSSIER}#trois-questions`} variante="clair">Les trois questions</Bouton>
          </div>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
