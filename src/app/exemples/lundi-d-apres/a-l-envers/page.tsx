import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import { ACCUEIL, METHODE, THEMES, photos } from "../_composants/donnees";
import { Coin } from "../_composants/Blocs";
import PhraseLundi from "../_composants/PhraseLundi";

// « Et on construit la soirée à l'envers, à partir de cette phrase. » La méthode
// expliquée sur un exemple complet (« On ne savait pas que la compta chantait aussi
// bien. »), puis l'outil, avec trois phrases d'exemple à essayer.
export const metadata: Metadata = {
  title: "La soirée à l'envers · Lundi d'Après — site de démonstration",
  description: "On part de la phrase que vos équipes doivent se raconter lundi, et on remonte jusqu'à l'accueil du vendredi. Site de démonstration.",
  ...adressesDeLaPage("/exemples/lundi-d-apres/a-l-envers"),
};

const exemple = THEMES[0];

export default function ALEnvers() {
  const etapes = [
    { heure: "Lundi, 9 h", titre: "« On ne savait pas que la compta chantait aussi bien. »", texte: "Le point de départ. Tout le reste en découle." },
    exemple.moment,
    exemple.diner,
    ACCUEIL,
  ];
  return (
    <div>
      <section className="max-w-6xl mx-auto px-5 pt-8 pb-14 sm:pt-14 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
        <div className="space-y-5">
          <Coin>exemple, du lundi au vendredi</Coin>
          <h1 className="text-[48px] sm:text-[84px] font-bold lowercase leading-[0.95] tracking-[-0.04em]">la soirée, à l&apos;envers</h1>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Une agence part du lieu, puis du menu, puis de l&apos;animation. Nous, on part de lundi. Voici un exemple, heure par
            heure, en remontant le temps.
          </p>
          <div className="relative hidden lg:block aspect-[3/2] overflow-hidden rounded-[32px]">
            <Image src={photos.cafe.src} alt={photos.cafe.alt} fill sizes="480px" className="object-cover" />
          </div>
        </div>
        <ol className="space-y-3">
          {etapes.map((e, i) => (
            <li key={e.heure} className={`rounded-[28px] p-6 space-y-1 ${i === 0 ? "bg-[var(--encre)] text-[var(--fond)]" : "bg-[var(--carte)]"}`}>
              <p className={`text-[13px] font-bold uppercase tracking-[0.12em] ${i === 0 ? "text-[#FFD9A0]" : "text-[var(--accent-texte)]"}`}>{e.heure}</p>
              <h2 className="font-[family-name:var(--titres)] text-[24px] font-semibold leading-snug">{e.titre}</h2>
              <p className={`leading-relaxed ${i === 0 ? "text-[#D8C9B4]" : "text-[var(--doux)]"}`}>{e.texte}</p>
            </li>
          ))}
          <li className="px-2 text-[13px] text-[var(--doux)]">Exemple : la phrase et l&apos;entreprise sont inventées.</li>
        </ol>
      </section>

      <section className="bg-[#9AD1D4] [--doux:#5A3D2B]">
        <div className="max-w-3xl mx-auto px-5 py-16 sm:py-20 space-y-6">
          <h2 className="text-[36px] sm:text-5xl font-bold lowercase leading-[1] tracking-[-0.03em]">à vous d&apos;essayer</h2>
          <p className="text-lg leading-relaxed">Écrivez votre phrase, ou prenez un exemple.</p>
          <PhraseLundi />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-24 space-y-8">
        <h2 className="text-[36px] sm:text-5xl font-bold lowercase leading-[1] tracking-[-0.03em]">les quatre temps</h2>
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {METHODE.map((m, i) => (
            <li key={m.titre} className="rounded-[28px] bg-[var(--carte)] p-6 space-y-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--accent)] font-[family-name:var(--titres)] text-lg font-bold">{i + 1}</span>
              <h3 className="text-[24px] font-bold lowercase">{m.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{m.texte}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
