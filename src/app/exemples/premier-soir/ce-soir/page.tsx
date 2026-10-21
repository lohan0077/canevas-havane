import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import { entreprise, photos } from "../_composants/donnees";
import { AppelFinal, Section, Surtitre } from "../_composants/Blocs";
import Remontage from "../_composants/Remontage";

export const metadata: Metadata = {
  title: "On remonte quoi, ce soir ? · Premier Soir — site de démonstration",
  description: "Coche ce que l'équipe remonte avant de partir : le lit, le berceau, la table. Pour un déménagement livré dans la journée, tu dors dedans ce soir.",
  ...adressesDeLaPage("/exemples/premier-soir/ce-soir"),
};

export default function CeSoir() {
  return (
    <>
      <Section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="space-y-5 lg:sticky lg:top-28">
          <Surtitre>Avant notre départ</Surtitre>
          <h1 className="text-[50px] sm:text-7xl leading-[1.0]">
            On remonte quoi, <span className="text-[var(--accent-texte)]">ce soir</span>&nbsp;?
          </h1>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Coche ce qu'on remonte avant de partir. Ce qui est coché va au devis, avec le temps
            que ça prend&nbsp;; c'est ce qu'on te promet, et rien d'autre.
          </p>
          <div className="relative hidden aspect-[4/3] overflow-hidden rounded-[8px] lg:block">
            <Image src={photos.lampe.src} alt={photos.lampe.alt} fill sizes="480px" className="object-cover" />
          </div>
        </div>
        <Remontage />
      </Section>

      <div className="bg-[var(--carte)] border-y border-[var(--trait)]">
        <Section className="grid gap-6 md:grid-cols-3">
          {[
            ["Livré dans la journée", `Moins de ${entreprise.seuilKm} km et ${entreprise.seuilM3} m³ dans nos exemples : on charge le matin, on décharge l'après-midi, on remonte avant de partir.`],
            ["Livré le lendemain", "Plus loin, ou plus gros : on te le dit au devis. On remonte à la livraison, et le carton orange reste avec toi."],
            ["Au devis, noir sur blanc", "Ce qu'on remonte, le temps compté, le prix HT et TTC, et que ce prix est définitif. Gratuit, avant tout contrat."],
          ].map(([t, d]) => (
            <article key={t} className="rounded-[14px] border border-[var(--trait)] bg-[var(--fond)] p-6 space-y-2">
              <h2 className="text-3xl leading-tight">{t}</h2>
              <p className="leading-relaxed text-[var(--doux)]">{d}</p>
            </article>
          ))}
        </Section>
      </div>

      <AppelFinal />
    </>
  );
}
