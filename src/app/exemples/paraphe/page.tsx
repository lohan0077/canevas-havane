import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Paraphe from "./_composants/Paraphe";
import Envies from "./_composants/Envies";
import Club from "./_composants/Club";
import { Etagere } from "./_composants/Dessins";
import { Faq, Lecteurs, Libelle, LienCommande, Port } from "./_composants/Blocs";
import { CLUB, DOSSIER, IMAGES, entreprise } from "./_composants/donnees";

export const metadata: Metadata = {
  title: "Paraphe — site de démonstration",
  description: "Site de démonstration d'une librairie imaginaire, réalisé par Canevas Havane : pas de rayons, des envies, et pour chacune un livre lu et paraphé.",
  ...adressesDeLaPage("/exemples/paraphe"),
};

export default function ParapheAccueil() {
  return (
    <div>
      {/* 1. L'ouverture : le nom, son paraphe, l'étagère à l'encre. */}
      <section data-film="ouverture" className="overflow-hidden">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-5 pt-12 text-center lg:pt-20">
          <Libelle>Librairie · lu, puis signé</Libelle>
          <h1 className="mt-5 text-[84px] italic leading-none sm:text-[132px]">Paraphe</h1>
          <Paraphe lecteur="Margaux" delai={500} duree={1400} className="-mt-2 h-16 w-64 text-[var(--accent-texte)] sm:h-20 sm:w-80" />
          <p className="mt-6 max-w-xl font-[family-name:var(--titres)] text-[28px] leading-snug sm:text-[34px]">
            Chaque livre en rayon a été lu par quelqu&apos;un de la boutique. <em>Et porte son paraphe.</em>
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={`${DOSSIER}#envies`} className="flex min-h-12 items-center bg-[var(--accent)] px-6 font-semibold text-[var(--sur-accent)]">Choisir une envie</Link>
            <Link href={`${DOSSIER}/club`} className="flex min-h-12 items-center border border-[var(--encre)] px-6 font-semibold">Le club du vendredi</Link>
          </div>
        </div>
        <Etagere className="mx-auto mt-12 block h-auto w-full max-w-3xl px-5 text-[#2B4C8C]" />
      </section>

      {/* 2. La règle de la maison. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:items-center lg:py-24">
          <div className="space-y-5">
            <Libelle clair>La règle</Libelle>
            <h2 className="text-[44px] leading-tight sm:text-[56px]">
              On n&apos;a pas tout lu. <em>Tout ce qui est en rayon, si.</em>
            </h2>
            <p className="text-lg leading-relaxed">
              Un livre n&apos;entre en rayon que si quelqu&apos;un de la boutique l&apos;a lu jusqu&apos;au bout, et l&apos;a signé en dernière page. Le reste, on le commande quand on nous le demande — sans paraphe, et on le dit.
            </p>
          </div>
          <div className="relative mx-auto aspect-[2/3] w-full max-w-[340px] overflow-hidden">
            <Image src={IMAGES.vieux.src} alt={IMAGES.vieux.alt} width={IMAGES.vieux.largeur} height={IMAGES.vieux.hauteur} sizes="340px" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      {/* 3. Les envies. */}
      <section id="envies" className="mx-auto grid max-w-6xl scroll-mt-16 gap-10 px-5 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:py-24">
        <div className="space-y-5">
          <Libelle>Les envies</Libelle>
          <h2 className="text-[44px] leading-tight sm:text-[56px]">
            Pas de rayons. <em>Des envies.</em>
          </h2>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Tu ne sais pas quel livre tu cherches ? Tu sais pour quand, ou pour qui. Pour chaque envie, un livre, lu et paraphé, avec le mot de celui qui l&apos;a lu.
          </p>
          <Link href={`${DOSSIER}/envies`} className="inline-block font-semibold underline underline-offset-4">Toutes les envies</Link>
        </div>
        <Envies />
      </section>

      {/* 4. Les lecteurs. */}
      <section className="border-t border-[var(--trait)]">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
          <Libelle>Ceux qui lisent</Libelle>
          <h2 className="mt-4 max-w-2xl text-[44px] leading-tight sm:text-[56px]">
            Quatre lecteurs, <em>quatre traits de plume.</em>
          </h2>
          <div className="mt-10">
            <Lecteurs />
          </div>
          <p className="mt-4 text-[13px] text-[var(--doux)]">Lecteurs imaginaires : la librairie est fictive.</p>
        </div>
      </section>

      {/* 5. Une photo, un mot. */}
      <section className="relative">
        <div className="relative aspect-[4/3] max-h-[620px] w-full overflow-hidden sm:aspect-[21/9]">
          <Image src={IMAGES.rayon.src} alt={IMAGES.rayon.alt} width={IMAGES.rayon.largeur} height={IMAGES.rayon.hauteur} sizes="100vw" className="h-full w-full object-cover" />
        </div>
        <p className="mx-auto max-w-3xl px-5 py-10 text-center font-[family-name:var(--titres)] text-[30px] italic leading-snug sm:text-[40px]">
          « Un paraphe, c&apos;est les initiales qu&apos;on met en bas de chaque page d&apos;un contrat. Ici, en bas de la dernière. »
        </p>
      </section>

      {/* 6. Le club des livres pas finis. */}
      <section id="club" className="scroll-mt-16 bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:items-center lg:py-24">
          <div className="space-y-5">
            <Libelle clair>Le premier soir · {CLUB.date} · {CLUB.heure}</Libelle>
            <h2 className="text-[44px] leading-tight sm:text-[56px]">
              Le club des livres <em>pas finis.</em>
            </h2>
            <p className="text-lg leading-relaxed">
              Chacun apporte celui qu&apos;il a lâché page cinquante, et raconte pourquoi. On repart avec un livre qu&apos;on va finir. Entrée libre, {CLUB.places}.
            </p>
          </div>
          <Club />
        </div>
      </section>

      {/* 7. Le prix, le port. */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:py-24">
        <div className="space-y-5">
          <Libelle>Le prix</Libelle>
          <h2 className="text-[44px] leading-tight sm:text-[56px]">
            Le prix de l&apos;éditeur. <em>Le port, zéro.</em>
          </h2>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            On ne joue jamais sur le prix : il est fixé par l&apos;éditeur, le même partout. On réserve en ligne, on retire en boutique.
          </p>
        </div>
        <Port />
      </section>

      {/* 8. Commander. */}
      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:grid-cols-[1fr_auto] md:items-center">
          <div className="space-y-3">
            <h2 className="text-[36px] leading-tight sm:text-[44px]">Un livre qu&apos;on n&apos;a pas lu&nbsp;? <em>On le commande.</em></h2>
            <p className="max-w-2xl text-lg leading-relaxed text-[var(--doux)]">À l&apos;unité, sans frais de commande, comme la loi le veut. Il arrivera sans paraphe : on ne signe que ce qu&apos;on a lu.</p>
          </div>
          <LienCommande />
        </div>
      </section>

      {/* 9. Questions. */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:py-24">
        <div className="space-y-5">
          <h2 className="text-[44px] leading-tight sm:text-[56px]">Questions <em>en marge.</em></h2>
          <div className="relative hidden aspect-[3/2] overflow-hidden lg:block">
            <Image src={IMAGES.lunettes.src} alt={IMAGES.lunettes.alt} width={IMAGES.lunettes.largeur} height={IMAGES.lunettes.hauteur} sizes="440px" className="h-full w-full object-cover" />
          </div>
        </div>
        <Faq />
      </section>

      {/* 10. Venir. */}
      <section className="border-t border-[var(--trait)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-16 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <h2 className="text-[44px] leading-tight sm:text-[56px]">Passer <em>tourner les pages.</em></h2>
            <p className="text-lg leading-relaxed">{entreprise.adresse} · {entreprise.horaires}</p>
          </div>
          <a href={`tel:${entreprise.telephone.replace(/ /g, "")}`} className="flex min-h-14 items-center justify-center bg-[var(--accent)] px-8 text-lg font-semibold tabular-nums text-[var(--sur-accent)]">
            {entreprise.telephone}
          </a>
        </div>
      </section>
    </div>
  );
}
