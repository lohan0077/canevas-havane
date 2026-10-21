import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import { photos } from "../_composants/donnees";
import { AppelFinal, PetitMot, Section, Surtitre } from "../_composants/Blocs";
import Equipe from "../_composants/Equipe";

export const metadata: Metadata = {
  title: "L'équipe du soir · Après Vous — site de démonstration",
  description: "Ceux qui passent après vous : l'équipe du soir, toujours la même chez vous, et depuis combien d'années. Ni nom ni visage publiés.",
  ...adressesDeLaPage("/exemples/apres-vous/l-equipe-du-soir"),
};

const ENGAGEMENTS = [
  ["La même équipe", "Deux agents chez vous chaque soir. Un remplacement ? On vous prévient la veille."],
  ["Ni nom ni visage", "Ce sont nos salariés, pas notre vitrine : le site et le petit mot disent « l'équipe du soir »."],
  ["Les clés à leur place", "Un jeu par équipe, rangé au dépôt dans une armoire fermée, sans votre adresse dessus."],
];

export default function LEquipeDuSoir() {
  return (
    <>
      <Section className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
        <div className="space-y-6 lg:sticky lg:top-28">
          <Surtitre>L'équipe du soir</Surtitre>
          <h1 className="text-[56px] sm:text-8xl leading-[0.98]">Ceux qui passent <span className="italic text-[var(--accent-texte)]">après vous.</span></h1>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Pas de gant jaune, pas de photo de banque d'images. L'équipe du soir, en vrai&nbsp;: toujours
            la même, et depuis combien d'années.
          </p>
          <div className="relative hidden aspect-[4/3] overflow-hidden rounded-[24px] lg:block">
            <Image src={photos.vitre.src} alt={photos.vitre.alt} fill sizes="520px" className="object-cover" />
          </div>
        </div>
        <Equipe />
      </Section>

      <div className="bg-[var(--carte)]">
        <Section className="grid gap-4 md:grid-cols-3">
          {ENGAGEMENTS.map(([t, d]) => (
            <article key={t} className="rounded-[24px] border border-[var(--trait)] bg-[var(--fond)] p-6 space-y-2">
              <h2 className="text-3xl">{t}</h2>
              <p className="leading-relaxed text-[var(--doux)]">{d}</p>
            </article>
          ))}
        </Section>
      </div>

      <Section className="grid gap-12 md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          <Surtitre>Le lendemain matin</Surtitre>
          <h2 className="text-[46px] sm:text-7xl leading-[1]">Ce qu'elle laisse en partant.</h2>
          <p className="text-lg leading-relaxed text-[var(--doux)]">Des bureaux faits, la lumière éteinte, et un petit mot sur le bureau de l'accueil.</p>
        </div>
        <PetitMot />
      </Section>

      <AppelFinal />
    </>
  );
}
