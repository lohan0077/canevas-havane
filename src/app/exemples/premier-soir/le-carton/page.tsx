import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import { AppelFinal, Section, Surtitre } from "../_composants/Blocs";
import Carton from "../_composants/Carton";

export const metadata: Metadata = {
  title: "Le carton orange · Premier Soir — site de démonstration",
  description: "Le carton du premier soir : les draps, les brosses à dents, le chargeur, le café. Chargé en dernier, déchargé en premier. Compose le tien.",
  ...adressesDeLaPage("/exemples/premier-soir/le-carton"),
};

export default function LeCarton() {
  return (
    <>
      <Section className="space-y-12">
        <div className="max-w-3xl space-y-5">
          <Surtitre>Le carton du premier soir</Surtitre>
          <h1 className="text-[50px] sm:text-7xl leading-[1.0]">Le carton orange.</h1>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Le matin du jour J, on te l'apporte. Tu le remplis en dernier. Il monte en dernier dans
            le camion, il en descend en premier, et il va droit dans la chambre. Compose le tien.
          </p>
        </div>
        <Carton />
      </Section>

      <div className="bg-[var(--carte)] border-y border-[var(--trait)]">
        <Section className="grid gap-6 md:grid-cols-3">
          {[
            ["Chargé en dernier", "Il ne disparaît pas sous les autres : c'est le dernier carton qui monte."],
            ["Déchargé en premier", "Il descend avant les meubles, et on le pose dans la chambre, pas au salon."],
            ["Compris", "Il est compris dans chaque déménagement, et il te reste après."],
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
