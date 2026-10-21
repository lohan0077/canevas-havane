import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import { SOIREE, photos } from "../_composants/donnees";
import Soiree from "../_composants/Soiree";

export const metadata: Metadata = {
  title: "Soirée découverte · Vingt-Deux Heures — site de démonstration",
  description: "La soirée découverte de Vingt-Deux Heures, boutique de jeux imaginaire : un jeudi par mois, quatre tables de six, dix jeux à tester. On réserve sa place sur le site.",
  ...adressesDeLaPage("/exemples/vingt-deux-heures/soiree-decouverte"),
};

const DEROULE = [
  { heure: "20 h", texte: "On s'installe. Léa présente les dix jeux de la soirée." },
  { heure: "20 h 15", texte: "Chaque table en essaie trois ou quatre, à son rythme." },
  { heure: "22 h", texte: "L'heure du fou rire, en général. On ne la programme pas." },
  { heure: "23 h", texte: "On range. Ceux qui veulent repartent avec un jeu ; les autres, avec rien." },
];

export default function SoireeDecouverte() {
  return (
    <div>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-14 pb-16 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-5 min-w-0">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Un jeudi par mois</p>
          <h1 className="text-[2.7rem] leading-[0.92] sm:text-7xl font-black uppercase tracking-[-0.05em]">La soirée découverte.</h1>
          <div className="rounded-[22px] bg-[var(--sombre)] text-[var(--sur-sombre)] p-5 space-y-1">
            <p className="font-[family-name:var(--titres)] text-3xl font-black tracking-[-0.02em]">{SOIREE.date} · {SOIREE.heure}</p>
            <p>{SOIREE.places} places · 4 tables de 6 · {SOIREE.jeux} jeux à tester · gratuite</p>
          </div>
          <p className="text-xl leading-relaxed">
            Tu choisis combien vous venez, tu touches une table, tu réserves. Gratuite sans
            condition : aucun achat n&apos;est demandé, ni avant ni après.
          </p>
        </div>
        <div id="reserver" className="scroll-mt-20 min-w-0">
          <Soiree />
        </div>
      </section>

      <section className="border-y-2 border-[var(--encre)] bg-[var(--carte)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-6">
            <h2 className="text-5xl font-black uppercase tracking-[-0.04em]">Le déroulé.</h2>
            <ol className="space-y-4">
              {DEROULE.map((d) => (
                <li key={d.heure} className="flex gap-4">
                  <span className="shrink-0 w-24 font-[family-name:var(--titres)] text-2xl font-black tabular-nums text-[var(--accent-texte)]">{d.heure}</span>
                  <span className="text-lg leading-relaxed">{d.texte}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="relative aspect-[4/3] rounded-[28px] overflow-hidden border-2 border-[var(--encre)] bg-[var(--sombre)]">
            <Image src={photos.lancer.src} alt={photos.lancer.alt} fill sizes="(min-width: 768px) 540px, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-6">
        <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-[-0.04em]">Les prochaines.</h2>
        <ul className="grid gap-3 sm:grid-cols-3">
          {[SOIREE.date, ...SOIREE.suivantes].map((d, i) => (
            <li key={d} className="rounded-[22px] border-2 border-[var(--encre)] bg-[var(--carte)] p-5">
              <p className="text-2xl font-black">{d}</p>
              <p className="text-[var(--doux)]">{i === 0 ? "Réservations ouvertes" : "Ouverture des réservations un mois avant"}</p>
            </li>
          ))}
        </ul>
        <p className="text-[var(--doux)]">Dates d&apos;exemple. Les jeux à tester sont annoncés une semaine avant chaque soirée.</p>
      </section>
    </div>
  );
}
