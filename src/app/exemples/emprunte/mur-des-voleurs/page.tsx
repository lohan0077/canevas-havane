import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import { photos } from "../_composants/donnees";
import Mur from "../_composants/Mur";

export const metadata: Metadata = {
  title: "Le mur des voleurs · Emprunté — site de démonstration",
  description: "Site de démonstration d'une marque de pulls imaginaire : le mur des voleurs, la photo de ceux qui ont pris le pull, chacune avec l'accord de la personne.",
  ...adressesDeLaPage("/exemples/emprunte/mur-des-voleurs"),
};

const REGLES = [
  ["L'accord du voleur", "C'est lui qu'on voit sur la photo : c'est son accord écrit qu'il nous faut, pas seulement le tien."],
  ["Pas de mineur", "Aucun enfant sur le mur, même avec l'accord des parents."],
  ["Retirée sur demande", "Une photo disparaît du mur dès que la personne nous le demande."],
  ["Pas de faux voleur", "Seulement de vraies photos de vrais clients. Jamais une photo achetée, jamais un mannequin."],
];

export default function MurDesVoleurs() {
  return (
    <>
      <section className="mx-auto max-w-6xl space-y-5 px-5 pb-10 pt-8 text-center sm:px-6">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Avec l&apos;accord de chacun</p>
        <h1 className="text-[48px] font-extrabold leading-[1] tracking-tight sm:text-7xl">Le mur des voleurs.</h1>
        <p className="mx-auto max-w-xl text-lg">
          Tu nous envoies la photo de celui qui t&apos;a pris ton pull. Avec son accord. Elle rejoint le
          mur, avec ta légende.
        </p>
      </section>
      <section className="mx-auto max-w-4xl px-5 pb-20 sm:px-6">
        <Mur />
      </section>
      <section className="bg-[var(--sombre)] px-5 py-20 text-[var(--sur-sombre)] sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Les règles du mur.</h2>
            <dl className="grid gap-5 sm:grid-cols-2">
              {REGLES.map(([t, d]) => (
                <div key={t} className="space-y-1">
                  <dt className="font-bold text-[#E8A07E]">{t}</dt>
                  <dd className="text-[#C9C3B6]">{d}</dd>
                </div>
              ))}
            </dl>
          </div>
          <Image src={photos.pileSombre.src} width={photos.pileSombre.largeur} height={photos.pileSombre.hauteur} alt={photos.pileSombre.alt} sizes="(min-width: 768px) 400px, 100vw" className="aspect-[4/5] w-full rounded-[44px] object-cover" />
        </div>
      </section>
    </>
  );
}
