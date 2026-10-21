import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import { photos } from "../_composants/donnees";
import Liste from "../_composants/Liste";

export const metadata: Metadata = {
  title: "Ouvrir un restaurant · Ton dépôt — site de démonstration",
  description: "Site de démonstration d'un fournisseur de matériel de restauration imaginaire : la liste de base du matériel pour ouvrir une pizzeria, un restaurant rapide ou un bar, chiffrée en hors taxes.",
  ...adressesDeLaPage("/exemples/ton-depot/ouvrir-un-restaurant"),
};

export default function OuvrirUnRestaurant() {
  return (
    <>
      <section className="mx-auto grid grid-cols-1 max-w-6xl gap-10 px-5 pb-16 pt-8 sm:px-6 md:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--doux)]">Liste du matériel</p>
          <h1 className="text-[42px] font-extrabold leading-[1] tracking-tight sm:text-6xl">
            Pour ouvrir un restaurant, <span className="text-[var(--accent-texte)]">la liste de base.</span>
          </h1>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Choisis ton métier : le gros matériel qu&apos;il lui faut, chiffré, à commander d&apos;un coup.
            Décoche ce que tu as déjà.
          </p>
          <Image src={photos.four.src} width={photos.four.largeur} height={photos.four.hauteur} alt={photos.four.alt} sizes="(min-width: 768px) 440px, 100vw" className="hidden aspect-[5/4] w-full rounded-[18px] object-cover md:block" />
        </div>
        <Liste />
      </section>

      <section className="border-t border-[var(--trait)] bg-[var(--carte)] px-5 py-16 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {[
            ["Ce que la liste comprend", "Le gros matériel : cuisson, froid, laverie, extraction. Ce qui se commande en premier, et qui pèse le plus dans le budget."],
            ["Ce qu'elle ne comprend pas", "Le petit matériel, la vaisselle, l'installation, les raccordements électriques et l'évacuation : chiffrés après une visite."],
            ["Le prix", "Hors taxes, vente réservée aux professionnels. Le TTC est écrit sous le total. Prix d'exemple : le dépôt est fictif."],
          ].map(([t, d]) => (
            <div key={t} className="space-y-2 rounded-[14px] border border-[var(--trait)] bg-[var(--fond)] p-5">
              <h2 className="text-xl font-extrabold">{t}</h2>
              <p className="text-[var(--doux)]">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
