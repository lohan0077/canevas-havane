import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, EnTetePage, Surtitre } from "../_composants/Blocs";
import { maison, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "La maison — Moins le Quart, site de démonstration",
  description: "La maison Moins le Quart (entreprise fictive) : pourquoi une heure plutôt qu'un pays, la torréfaction du mardi, le comptoir et le moulin de 6 h 45.",
  ...adressesDeLaPage("/exemples/moins-le-quart/maison"),
};

const SEMAINE = [
  { heure: "Mardi, 6 h 45", texte: "On torréfie, une fournée par heure : 6 h 45, puis 15 h 45, puis le déca, à part, pour ne rien mélanger. Le comptoir est fermé." },
  { heure: "Mardi, 15 h 45", texte: "On goûte la fournée du jour, dans les quatre cafetières de la maison. La date part au tampon sur les sachets." },
  { heure: "Mercredi, 6 h 45", texte: "Le moulin tourne, la vidéo du jour part, le comptoir rouvre. On moud pour ceux qui l'ont demandé, les abonnements partent." },
  { heure: "Samedi, 18 h 45", texte: "On ferme. Le déca du soir attend le dîner." },
];

export default function Maison() {
  return (
    <main>
      <EnTetePage surtitre="La maison" titre="Pas un pays. *Une heure.*" photo={photos.moulin}>
        Moins le Quart est né d&apos;une idée simple : on ne choisit pas un café pour son pays
        d&apos;origine, mais pour le moment où on va le boire. Alors chaque café porte une heure.
      </EnTetePage>

      <section className="mx-auto max-w-5xl space-y-12 px-5 py-20 sm:px-8 md:py-28">
        <div className="space-y-6">
          <Apparition><Surtitre>Une semaine à la maison</Surtitre></Apparition>
          <TitreRevele texte="Torréfié le mardi, *servi dès mercredi.*" className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5.4vw,4.8rem)] font-extralight leading-[0.95] tracking-[-0.045em]" classeAccent="font-[family-name:var(--texte)] italic font-normal text-[var(--accent-texte)]" />
        </div>
        <ol className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
          {SEMAINE.map((j, i) => (
            <Apparition as="li" key={j.heure} delai={i * 90} className="grid gap-2 py-7 sm:grid-cols-[13rem_1fr] sm:gap-8">
              <p className="font-[family-name:var(--titres)] text-3xl font-extralight text-[var(--accent-texte)]">{j.heure}</p>
              <p className="text-xl leading-relaxed">{j.texte}</p>
            </Apparition>
          ))}
        </ol>
        <p className="text-sm text-[var(--doux)]">Semaine d&apos;exemple : la maison est fictive.</p>
      </section>

      <section className="px-3 pb-16 sm:px-5">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-10 md:py-28 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="space-y-6">
              <Surtitre clair>Le comptoir</Surtitre>
              <TitreRevele texte="Ouvert à *6 h 45.* Évidemment." className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5vw,4.6rem)] font-extralight leading-[0.95] tracking-[-0.045em]" classeAccent="font-[family-name:var(--texte)] italic font-normal text-[#E8A24B]" />
              <p className="text-xl leading-relaxed text-[var(--sur-sombre)]/90">
                {maison.adresse}, {maison.ville}. Du mercredi au samedi, de 6 h 45 à 18 h 45. On y goûte
                les trois cafés avant de choisir, et on y retire ses commandes.
              </p>
              <p className="text-lg leading-relaxed text-[var(--sur-sombre)]/90">
                On ne parle pas d&apos;effets : un café du matin n&apos;est pas censé te faire quoi que ce
                soit, à part être bon à 6 h 45.
              </p>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <Image src={photos.matin.src} alt={photos.matin.alt} fill sizes="(min-width: 1024px) 480px, 100vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
