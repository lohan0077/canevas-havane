import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, PRIX, euros, photos } from "../_composants/donnees";
import Commande from "../_composants/Commande";
import Etiquette from "../_composants/Etiquette";

export const metadata: Metadata = {
  title: "Pull col rond · Emprunté — site de démonstration",
  description: "Site de démonstration d'une marque de pulls imaginaire : le pull col rond, 100 % laine, ta taille et, en option, la sienne, et l'étiquette « À rendre à » brodée à ton prénom.",
  ...adressesDeLaPage("/exemples/emprunte/col-rond"),
};

export default function ColRond() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-6 sm:px-6 md:grid-cols-2">
        <div className="space-y-6" id="fiche">
          <nav aria-label="Fil d'Ariane" className="text-sm">
            <Link href={DOSSIER} className="underline underline-offset-4">Accueil</Link> / Pull col rond
          </nav>
          <div className="space-y-2">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--accent-texte)]">Col rond · 100&nbsp;% laine</p>
            <h1 className="text-[44px] font-extrabold leading-[1] tracking-tight sm:text-6xl">
              Ta taille, <span className="text-[var(--accent-texte)]">et la sienne.</span>
            </h1>
            <p className="text-xl font-extrabold tabular-nums">
              {euros(PRIX)} <span className="text-sm font-bold text-[var(--doux)]">TTC · exemple</span>
            </p>
          </div>
          <Commande />
        </div>
        <div className="space-y-4">
          <Image src={photos.enfile.src} width={photos.enfile.largeur} height={photos.enfile.hauteur} alt={photos.enfile.alt} sizes="(min-width: 768px) 560px, 100vw" className="aspect-[4/5] w-full rounded-[44px] object-cover" />
          <p className="text-sm text-[var(--doux)]">Photo d&apos;illustration : la marque est fictive.</p>
        </div>
      </section>

      <section id="etiquette" className="scroll-mt-20 bg-[var(--carte)] px-5 py-16 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-4">
            <h2 className="text-4xl font-extrabold tracking-tight">
              Dans le col : <span className="font-[family-name:var(--f-caveat)] text-5xl font-normal text-[var(--accent-texte)]">à rendre à…</span>
            </h2>
            <p className="text-lg leading-relaxed">Tape ton prénom : il se brode sur l&apos;étiquette, sous tes yeux. L&apos;étiquette de composition reste dessous.</p>
          </div>
          <Etiquette />
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-6 md:grid-cols-3">
        {[
          ["Composition", "100 % laine. Une seule fibre, écrite ici avant le bouton et cousue dans le col."],
          ["Entretien", "Lavage à la main, 30 °C, séchage à plat. Pas de sèche-linge."],
          ["Changer d'avis", "Quatorze jours après la réception. Sauf pour un pull brodé à ton prénom : il est personnalisé, on ne peut pas le reprendre."],
        ].map(([t, d]) => (
          <div key={t} className="space-y-2 rounded-[28px] bg-[var(--carte)] p-6">
            <h2 className="text-2xl font-extrabold tracking-tight">{t}</h2>
            <p className="text-[var(--doux)]">{d}</p>
          </div>
        ))}
      </section>
    </>
  );
}
