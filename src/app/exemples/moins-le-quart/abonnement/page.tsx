import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, EnTetePage, Surtitre } from "../_composants/Blocs";
import Tasses from "../_composants/Tasses";
import { photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "L'abonnement — Moins le Quart, site de démonstration",
  description: "L'abonnement de la marque Moins le Quart (entreprise fictive) se règle en tasses : tu dis combien tu en bois par jour, ton café arrive avant que le paquet soit vide.",
  ...adressesDeLaPage("/exemples/moins-le-quart/abonnement"),
};

const COMMENT = [
  ["Tu dis combien de tasses", "Par jour, en moyenne. Le site en déduit le paquet et le rythme."],
  ["On torréfie le mardi", "Ton sachet part le mercredi, la date de torréfaction écrite en gros dessus."],
  ["Il arrive avant le vide", "Le rythme est calculé pour que le nouveau paquet arrive avant la fin du précédent."],
  ["Tu changes quand tu veux", "Plus de tasses, moins de tasses, une pause pendant les vacances, ou l'arrêt : en ligne, à tout moment."],
];

export default function Abonnement() {
  return (
    <main>
      <EnTetePage surtitre="L'abonnement" titre="Il se règle *en tasses.*" photo={photos.tasses}>
        Pas en kilos, pas en mois. Glisse jusqu&apos;au nombre de tasses que tu bois par jour : on
        s&apos;occupe du reste.
      </EnTetePage>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="space-y-6 lg:sticky lg:top-28">
          <Apparition><Surtitre>Le calcul, en clair</Surtitre></Apparition>
          <p className="text-xl leading-relaxed">
            On compte 7 g de café par tasse — un repère d&apos;exemple, pas une recommandation. Trois
            tasses par jour, c&apos;est environ 21 g ; un paquet de 500 g dure un peu plus de trois
            semaines : il part toutes les trois semaines, et arrive avant que le précédent soit vide.
          </p>
          <div className="relative hidden aspect-[3/2] overflow-hidden rounded-[2rem] lg:block">
            <Image src={photos.filtre.src} alt={photos.filtre.alt} fill sizes="480px" className="object-cover" />
          </div>
        </div>
        <Apparition de="zoom"><Tasses /></Apparition>
      </section>

      <section className="px-3 pb-16 sm:px-5">
        <div className="kit-grain relative overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto max-w-6xl space-y-12 px-5 py-20 sm:px-10 md:py-28">
            <TitreRevele texte="Comment *ça marche.*" className="font-[family-name:var(--titres)] text-[clamp(2.8rem,5.6vw,5rem)] font-extralight leading-[0.95] tracking-[-0.045em]" classeAccent="font-[family-name:var(--texte)] italic font-normal text-[#E8A24B]" />
            <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {COMMENT.map(([t, x], i) => (
                <Apparition as="li" key={t} delai={i * 110} className="space-y-3 border-t-2 border-[#E8A24B] pt-5">
                  <p className="font-[family-name:var(--titres)] text-5xl font-extralight text-[#E8A24B]">{i + 1}</p>
                  <h3 className="font-[family-name:var(--titres)] text-xl font-medium">{t}</h3>
                  <p className="leading-relaxed text-[var(--sur-sombre)]/90">{x}</p>
                </Apparition>
              ))}
            </ol>
            <p className="text-sm text-[var(--sur-sombre)]/90">Quantités, rythmes et prix d&apos;exemple : la marque est fictive, rien n&apos;est envoyé.</p>
          </div>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
