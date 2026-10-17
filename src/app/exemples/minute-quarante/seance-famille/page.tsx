import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Panier from "../../_kit/Panier";
import { DEROULE, DOSSIER, OPTIONS, SEANCE, photos } from "../_composants/donnees";
import { AppelFinal, Bouton, Surtitre } from "../_composants/Blocs";

// La page du prix. La vidéo : « Et le prix, affiché. Parce qu'ils tapent aussi :
// combien coûte un shooting photo famille. » Le prix est en haut, en grand, TTC,
// marqué « exemple » (C. consom., art. L112-1 : le prestataire informe sur ses prix).
export const metadata: Metadata = {
  title: "Séance famille · Minute Quarante — site de démonstration",
  description: "Combien coûte une séance photo en famille : 290 € TTC l'heure, 25 photos retouchées (prix d'exemple). Site de démonstration réalisé par Canevas Havane.",
  ...adressesDeLaPage("/exemples/minute-quarante/seance-famille"),
};

export default function SeanceFamille() {
  return (
    <main>
      <section data-film="prix" className="bg-[var(--sombre)] text-[var(--sur-sombre)] [--accent-texte:#E8A27F]">
        <div className="max-w-6xl mx-auto px-5 pt-10 pb-14 sm:pt-16 sm:pb-20 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div className="space-y-5">
            <Surtitre>{SEANCE.nom} · {SEANCE.duree}</Surtitre>
            <h1 className="text-[104px] sm:text-[160px] font-medium tracking-[-0.04em] leading-[0.9]">
              {SEANCE.prix}
            </h1>
            <p className="text-xl font-semibold">TTC · {SEANCE.photos} photos retouchées</p>
            <p className="inline-block rounded-full border border-[var(--sur-sombre)] px-3 py-1 text-sm font-bold">Prix d&apos;exemple</p>
          </div>
          <div className="space-y-5">
            <p className="text-lg leading-relaxed">
              Le même prix pour tout le monde, écrit ici plutôt que « sur demande ». Tu sais
              ce que tu paies avant d&apos;appeler.
            </p>
            <Bouton href={`${DOSSIER}/reserver`} clair>Choisir ma date</Bouton>
          </div>
        </div>
      </section>

      <section id="compris" className="max-w-6xl mx-auto px-5 py-16 sm:py-20 grid gap-10 md:grid-cols-2">
        <div className="space-y-5">
          <Surtitre numero="01">Ce qui est compris</Surtitre>
          <ul className="border-t border-[var(--encre)]">
            {SEANCE.compris.map((c) => (
              <li key={c} className="flex gap-3 border-b border-[var(--trait)] py-4 text-lg leading-snug">
                <span aria-hidden="true" className="font-bold text-[var(--accent-texte)]">✓</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-5">
          <Surtitre numero="02">Ce qui ne l&apos;est pas</Surtitre>
          <ul className="border-t border-[var(--encre)]">
            {SEANCE.pasCompris.map((c) => (
              <li key={c} className="flex gap-3 border-b border-[var(--trait)] py-4 text-lg leading-snug">
                <span aria-hidden="true" className="font-bold text-[var(--accent-texte)]">+</span>
                {c}
              </li>
            ))}
          </ul>
          <p className="leading-relaxed text-[var(--doux)]">
            Aucun acompte demandé en ligne : la séance se règle le jour même, après la
            dernière photo (exemple).
          </p>
        </div>
      </section>

      <section className="bg-[var(--carte)] border-y border-[var(--trait)]">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-20 space-y-10">
          <div className="space-y-4 max-w-2xl">
            <Surtitre numero="03">L&apos;heure, en cinq temps</Surtitre>
            <h2 className="text-4xl sm:text-5xl font-medium tracking-[-0.02em]">Ce que tu <span className="italic">paies, vraiment.</span></h2>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {DEROULE.map((d) => (
              <li key={d.minute} className="rounded-[6px] bg-[var(--fond)] p-5 space-y-2">
                <p className="font-[family-name:var(--titres)] italic text-4xl leading-none tabular-nums text-[var(--accent-texte)]">{d.minute}′</p>
                <h3 className="text-lg font-semibold">{d.titre}</h3>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-20 grid gap-10 lg:grid-cols-2 lg:items-start">
        <div className="space-y-5">
          <Surtitre numero="04">Les tirages, en option</Surtitre>
          <h2 className="text-4xl sm:text-5xl font-medium tracking-[-0.02em]">Compose <span className="italic">ta séance.</span></h2>
          <p className="text-lg leading-relaxed">
            Les fichiers sont compris. Les tirages et l&apos;album, si tu les veux : le total
            se calcule ici, toutes taxes comprises.
          </p>
          <div className="relative aspect-[3/2] overflow-hidden rounded-[6px]">
            <Image src={photos.tirages.src} alt={photos.tirages.alt} fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
          </div>
        </div>
        <Panier
          produits={[{ nom: SEANCE.nom, detail: `${SEANCE.duree} · ${SEANCE.photos} photos retouchées`, prix: 290 }, ...OPTIONS]}
          bouton="Garder cette sélection"
          confirmation="Sélection prête : on en reparle le jour de la séance."
          mention="Prix TTC d'exemple. Les tirages se commandent après la séance, une fois les photos choisies."
        />
      </section>

      <AppelFinal />
    </main>
  );
}
