import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, EnTetePage, Surtitre } from "../_composants/Blocs";
import CalculVacances from "../_composants/CalculVacances";
import { OFFRES, euros, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Nos nuits et nos prix — Veilleuse, site de démonstration",
  description: "Maison, commerce, chantier, fête : ce que Veilleuse veille la nuit, et à quel prix d'exemple. Démonstration de Canevas Havane.",
  ...adressesDeLaPage("/exemples/veilleuse/nos-nuits"),
};

const PROS = [
  { titre: "Commerce, rondes de nuit", detail: "trois rondes à heures variables, rideau et alarme vérifiés", prix: 120 },
  { titre: "Chantier, agent sur place", detail: "de 19 h à 7 h, un agent, le rapport à 7 h", prix: 290 },
  { titre: "Entrepôt, rondes de nuit", detail: "quatre rondes, quais et accès vérifiés", prix: 150 },
];

export default function NosNuits() {
  return (
    <main>
      <EnTetePage surtitre="Nos nuits et nos prix" titre="Ta maison, *quand tu pars.*" photo={photos.maison}>
        Choisis le nombre de nuits et de passages : le prix s&apos;affiche tout de suite. Pas de « tarif
        sur demande ».
      </EnTetePage>

      <section className="mx-auto grid max-w-6xl gap-14 px-5 py-24 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div className="space-y-6">
          <Apparition><Surtitre>Pour un particulier</Surtitre></Apparition>
          <TitreRevele
            texte={"Tu pars *combien de nuits ?*"}
            className="text-[clamp(2.8rem,6vw,5rem)] font-normal leading-[0.98] tracking-[-0.02em]"
            classeAccent="text-[var(--accent-texte)]"
          />
          <p className="text-lg leading-relaxed text-[var(--doux)]">Prix TTC d&apos;exemple. Une photo du portail à chaque passage, le rapport chaque matin à 7 h.</p>
        </div>
        <Apparition de="zoom"><CalculVacances /></Apparition>
      </section>

      <section className="px-3 sm:px-5">
        <div className="kit-grain rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto max-w-6xl space-y-10 px-6 py-24 sm:px-10">
            <div className="max-w-2xl space-y-5">
              <Surtitre clair>Pour les professionnels</Surtitre>
              <TitreRevele
                texte="Commerces, chantiers, *entrepôts.*"
                className="text-[clamp(2.8rem,6vw,5rem)] font-normal leading-[0.98] tracking-[-0.02em]"
                classeAccent="text-[var(--accent)]"
              />
              <p className="text-lg">Prix hors taxes, par nuit, à titre d&apos;exemple. Le prix ferme vient après la visite, gratuite.</p>
            </div>
            <ul className="divide-y divide-white/15 border-y border-white/15">
              {PROS.map((p, i) => (
                <Apparition as="li" key={p.titre} delai={i * 100} className="grid gap-1 py-6 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8">
                  <span className="font-[family-name:var(--titres)] text-3xl">{p.titre}</span>
                  <span className="text-2xl font-bold tabular-nums sm:text-right">dès {euros(p.prix)} HT</span>
                  <span className="sm:col-span-2">{p.detail}</span>
                </Apparition>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-12 px-5 py-24 sm:px-8">
        <TitreRevele
          texte="Tout ce *qu'on veille.*"
          className="text-[clamp(2.8rem,6vw,5rem)] font-normal leading-[0.98] tracking-[-0.02em]"
          classeAccent="text-[var(--accent-texte)]"
        />
        <ul className="grid gap-5 sm:grid-cols-2">
          {OFFRES.map((o, i) => (
            <Apparition as="li" key={o.titre} delai={i * 100} className="flex flex-col gap-3 rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] p-7">
              <h2 className="text-[30px] font-normal leading-tight">{o.titre}</h2>
              <p className="flex-1 leading-relaxed text-[var(--doux)]">{o.texte}</p>
              <p className="font-bold">{o.prix} <span className="text-sm font-normal text-[var(--doux)]">· exemple, {o.pour}</span></p>
              <Link href={o.href} className="font-bold text-[var(--accent-texte)] underline underline-offset-4">En savoir plus</Link>
            </Apparition>
          ))}
        </ul>
      </section>

      <AppelFinal />
    </main>
  );
}
