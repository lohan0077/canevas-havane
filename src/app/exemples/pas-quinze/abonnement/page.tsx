import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Tasses from "../_composants/Tasses";
import { photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "L'abonnement — Pas Quinze, site de démonstration",
  description: "L'abonnement du torréfacteur Pas Quinze (entreprise fictive) se règle en tasses : ton café arrive avant que le paquet soit vide.",
  ...adressesDeLaPage("/exemples/pas-quinze/abonnement"),
};

const COMMENT = [
  ["Tu dis combien de tasses", "Par jour, en moyenne. Le site en déduit le paquet et le rythme."],
  ["On torréfie le mardi", "Ton sachet part le mercredi, la date de torréfaction écrite en gros dessus."],
  ["Il arrive avant le vide", "Le rythme est calculé pour que le nouveau paquet arrive avant la fin du précédent."],
  ["Tu changes quand tu veux", "Plus de tasses, moins de tasses, une pause pendant les vacances, ou l'arrêt : en ligne, à tout moment."],
];

export default function Abonnement() {
  return (
    <div>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:py-20 md:grid-cols-[0.9fr_1.1fr] md:items-start">
        <div className="space-y-6">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--accent-texte)]">L&apos;abonnement</p>
          <h1 className="text-[2.6rem] font-black uppercase leading-[0.95] sm:text-7xl">Il se règle <span className="text-[var(--accent-texte)]">en tasses.</span></h1>
          <p className="text-lg leading-relaxed">Glisse jusqu&apos;au nombre de tasses que tu bois par jour. On s&apos;occupe du reste.</p>
          <div className="relative hidden aspect-[3/4] max-w-xs overflow-hidden rounded-[22px] md:block">
            <Image src={photos.tasses.src} alt={photos.tasses.alt} fill sizes="320px" className="object-cover" priority />
          </div>
        </div>
        <Tasses />
      </section>

      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto max-w-6xl space-y-10 px-5 py-16 sm:py-24">
          <h2 className="text-4xl font-black uppercase leading-[0.95] sm:text-5xl">Comment <span className="text-[#F26B3A]">ça marche.</span></h2>
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {COMMENT.map(([t, x], i) => (
              <li key={t} className="space-y-2 border-t-[3px] border-[#F26B3A] pt-4">
                <p className="font-[family-name:var(--titres)] text-4xl font-black text-[#F26B3A]">{i + 1}</p>
                <h3 className="text-xl font-bold">{t}</h3>
                <p className="leading-relaxed text-[#D9CBBB]">{x}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-3xl space-y-4 px-5 py-16">
        <h2 className="text-3xl font-black uppercase">Le calcul, en clair</h2>
        <p className="text-lg leading-relaxed">
          On compte 7 g de café par tasse — un repère d&apos;exemple, pas une
          recommandation. Trois tasses par jour, c&apos;est environ 21 g ; un paquet de
          500 g dure un peu plus de trois semaines : il part toutes les trois semaines,
          et arrive avant que le précédent soit vide.
        </p>
        <p className="text-sm text-[var(--doux)]">Quantités, rythmes et prix d&apos;exemple : la brûlerie est fictive, rien n&apos;est envoyé.</p>
      </section>
    </div>
  );
}
