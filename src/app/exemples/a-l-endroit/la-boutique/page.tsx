import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, EQUIPE, entreprise, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "La boutique · À l'Endroit — site de démonstration",
  description: "L'écran qui ne t'inverse pas, l'équipe, l'adresse et les horaires. À l'Endroit est une boutique d'opticien fictive.",
  ...adressesDeLaPage("/exemples/a-l-endroit/la-boutique"),
};

const ECRAN = [
  { titre: "Une caméra, un écran", texte: "L'image n'est pas retournée : la gauche reste à gauche. C'est la seule différence avec un miroir, et c'est toute la différence." },
  { titre: "Rien n'est enregistré", texte: "L'écran montre, il ne garde rien. Seules les cinq photos de ta séance sont imprimées, pour toi." },
  { titre: "De face, de profil, en parlant", texte: "On se regarde rarement de trois quarts. Les autres, si : l'écran te montre aussi sous cet angle." },
];

export default function LaBoutique() {
  return (
    <main>
      <header className="mx-auto max-w-6xl space-y-6 px-5 pt-12 sm:pt-20">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--accent-texte)]">La boutique</p>
        <h1 className="max-w-4xl text-6xl sm:text-8xl">Un mur, une table, <em>un écran.</em></h1>
      </header>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-14 sm:py-20 md:grid-cols-[1fr_1.1fr] md:items-start">
        <Image
          src={photos.argent.src}
          width={photos.argent.largeur}
          height={photos.argent.hauteur}
          alt={photos.argent.alt}
          sizes="(min-width: 768px) 520px, 100vw"
          className="aspect-[4/5] w-full object-cover"
        />
        <ol className="space-y-8">
          {ECRAN.map((e, i) => (
            <li key={e.titre} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-[var(--encre)] pt-5">
              <span className="font-[family-name:var(--titres)] text-4xl leading-none [font-variant-numeric:lining-nums]">{i + 1}</span>
              <div className="space-y-2">
                <h2 className="text-3xl">{e.titre}</h2>
                <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
              </div>
            </li>
          ))}
          <li className="rounded-2xl bg-[var(--carte)] p-5 text-sm font-semibold">
            Un devis détaillé t&apos;est remis gratuitement, avant tout achat.
          </li>
        </ol>
      </section>

      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:py-20 md:grid-cols-2">
          <div className="space-y-6">
            <h2 className="text-5xl">Venir</h2>
            <p className="font-[family-name:var(--titres)] text-3xl leading-snug">{entreprise.adresse}<br />{entreprise.ville}</p>
            <p><a href={`tel:${entreprise.telephoneLien}`} className="text-lg underline underline-offset-4">{entreprise.telephone}</a></p>
            <ul className="divide-y divide-[#3A4A5C] border-y border-[#3A4A5C]">
              {entreprise.horaires.map((h) => (
                <li key={h.jours} className="flex justify-between gap-4 py-2.5"><span>{h.jours}</span><span className="text-[#C9CED6]">{h.heures}</span></li>
              ))}
            </ul>
            <p className="text-sm text-[#C9CED6]">Adresse et numéro d&apos;exemple : le numéro appartient à la tranche réservée à la fiction.</p>
          </div>
          <div className="space-y-6">
            <h2 className="text-5xl">Qui t&apos;accueille</h2>
            <ul className="space-y-5">
              {EQUIPE.map((p) => (
                <li key={p.prenom} className="flex items-center gap-5">
                  <span aria-hidden="true" className="grid h-16 w-16 place-items-center rounded-full bg-[#F29A84] font-[family-name:var(--titres)] text-2xl text-[var(--sombre)]">{p.initiales}</span>
                  <span>
                    <span className="block font-[family-name:var(--titres)] text-3xl">{p.prenom}</span>
                    <span className="block text-sm text-[#C9CED6]">{p.role}</span>
                  </span>
                </li>
              ))}
            </ul>
            <Link href={`${DOSSIER}/seance`} className="inline-flex min-h-13 items-center justify-center rounded-full bg-[var(--sur-sombre)] px-7 font-semibold text-[var(--sombre)]">
              Réserver ma séance
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
