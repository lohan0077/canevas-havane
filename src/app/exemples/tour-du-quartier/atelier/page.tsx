import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, EnTetePage, Pastille } from "../_composants/Blocs";
import { FORFAITS, IMAGES, entreprise, euros } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "L'atelier — Tour du Quartier, site de démonstration",
  description: "L'atelier d'un magasin de vélos imaginaire : les forfaits, leurs prix affichés, le test de batterie et le marquage.",
  ...adressesDeLaPage("/exemples/tour-du-quartier/atelier"),
};

export default function Atelier() {
  return (
    <main>
      <EnTetePage pastille="L'atelier" titre="Les prix, *avant.*" photo={IMAGES.atelier}>
        Tu sais ce que ça coûte avant de déposer ton vélo. Si on trouve autre chose, on t&apos;appelle
        avant de toucher à quoi que ce soit.
      </EnTetePage>
      <section className="mx-auto max-w-4xl px-5 py-20 sm:px-8 md:py-28">
        <TitreRevele
          texte="Cinq forfaits, *écrits.*"
          className="mb-10 font-[family-name:var(--titres)] text-[clamp(2.2rem,4.6vw,4rem)] font-bold leading-[0.98] tracking-[-0.05em]"
          classeAccent="text-[var(--accent-texte)]"
        />
        <ul className="space-y-3">
          {FORFAITS.map((f, i) => (
            <Apparition as="li" key={f.nom} delai={i * 90} de="gauche" className="grid gap-2 rounded-[28px] bg-[var(--carte)] p-6 shadow-[0_20px_40px_-32px_rgba(31,58,44,0.6)] sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6">
              <span>
                <span className="block font-[family-name:var(--titres)] text-xl font-bold">{f.nom}</span>
                <span className="block leading-relaxed text-[var(--doux)]">{f.detail}</span>
              </span>
              <span className="font-[family-name:var(--titres)] text-3xl font-bold tabular-nums">{euros(f.prix)}</span>
            </Apparition>
          ))}
        </ul>
        <p className="mt-4 text-[13px] text-[var(--doux)]">Prix TTC d&apos;exemple : le magasin est fictif.</p>
        <div className="mt-12 space-y-4 rounded-[36px] bg-[#F2C14E] p-7 text-[#1F3A2C]">
          <Pastille>Déposer ton vélo</Pastille>
          <p className="text-lg leading-relaxed">Sans rendez-vous du mardi au samedi. Rendu en 48 h la plupart du temps ; on te prévient si c&apos;est plus.</p>
          <a href={`tel:${entreprise.telephoneLien}`} className="inline-flex min-h-12 items-center rounded-full bg-[var(--sombre)] px-6 font-bold tabular-nums text-[#F2C14E]">{entreprise.telephone}</a>
        </div>
      </section>
      <AppelFinal />
    </main>
  );
}
