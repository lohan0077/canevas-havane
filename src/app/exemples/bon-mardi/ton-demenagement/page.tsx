import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import { photos } from "../_composants/donnees";
import { AppelFinal, Etiquette, Section } from "../_composants/Blocs";
import JourParJour from "../_composants/JourParJour";

export const metadata: Metadata = {
  title: "Ton déménagement, jour par jour · Bon Mardi — site de démonstration",
  description: "Quand commencer les cartons, quand faire les changements d'adresse, quand débrancher le frigo : ton déménagement jour par jour, daté depuis ton jour J.",
  ...adressesDeLaPage("/exemples/bon-mardi/ton-demenagement"),
};

const QUESTIONS = [
  { q: "Déménagement : quand commencer les cartons ?", r: "Trois semaines avant, par ce qui ne sert pas. La dernière semaine, il ne reste que le quotidien." },
  { q: "Quand faire les changements d'adresse ?", r: "Deux semaines avant : banque, assurances, employeur, caisses, impôts, abonnements. Et la réexpédition du courrier, pour ce qui arrivera encore à l'ancienne adresse." },
  { q: "Quand débrancher le frigo ?", r: "La veille au soir, porte ouverte, une serpillière dessous : il doit voyager sec. On le rebranche quelques heures après l'arrivée, le temps qu'il se pose." },
];

export default function TonDemenagement() {
  return (
    <>
      <Section className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="space-y-5 lg:sticky lg:top-28">
          <Etiquette>Le guide</Etiquette>
          <h1 className="text-[42px] sm:text-7xl font-extrabold tracking-[-0.04em] leading-[0.95]">Ton déménagement, jour par jour.</h1>
          <p className="text-lg leading-relaxed">
            Donne ton jour J&nbsp;: chaque étape prend sa date. Coche ce qui est fait. Nos conseils,
            ceux qu'on donne à chaque client — à adapter à ta maison.
          </p>
          <div className="relative hidden aspect-[3/2] overflow-hidden rounded-[24px] border-2 border-[var(--encre)] lg:block">
            <Image src={photos.canape.src} alt={photos.canape.alt} fill sizes="460px" className="object-cover" />
          </div>
        </div>
        <JourParJour />
      </Section>

      <div className="bg-[var(--carte)] border-y-2 border-[var(--encre)]">
        <Section className="space-y-8">
          <h2 className="text-[40px] sm:text-5xl font-extrabold tracking-[-0.03em]">Ce que tu nous demandes.</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {QUESTIONS.map((q) => (
              <article key={q.q} className="rounded-[20px] border-2 border-[var(--encre)] bg-[var(--fond)] p-5 space-y-2">
                <h3 className="text-xl font-extrabold leading-snug">{q.q}</h3>
                <p className="leading-relaxed">{q.r}</p>
              </article>
            ))}
          </div>
        </Section>
      </div>

      <AppelFinal />
    </>
  );
}
