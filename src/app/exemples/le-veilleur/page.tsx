import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, entreprise, methode, photos, services } from "./_composants/donnees";
import { AppelFinal, Faq, Intitule, Photo, Surtitre } from "./_composants/Blocs";
import Carte from "./_composants/Carte";
import Bareme from "./_composants/Bareme";
import Telephone from "./_composants/Telephone";
import Bilan from "./_composants/Bilan";

// L'accueil du Veilleur. Dans l'ordre de la vidéo : la carte professionnelle en tête,
// avant les photos ; le barème, sur le site, avec qui paie quoi ; le téléphone qui ne
// sonne plus chez le propriétaire ; le bilan du lundi. Autour, ce qu'une vraie
// conciergerie montre : ses services, sa méthode, ses réponses.
export const metadata: Metadata = {
  title: "Le Veilleur — site de démonstration",
  description:
    "Site de démonstration d'une conciergerie imaginaire, réalisé par Canevas Havane : la carte professionnelle avant les photos, le barème en clair, et le bilan de chaque lundi.",
  ...adressesDeLaPage("/exemples/le-veilleur"),
};

export default function LeVeilleur() {
  return (
    <div>
      {/* 1. L'accueil : la carte avant toute photo. */}
      <section id="accueil" className="mx-auto grid max-w-6xl gap-8 px-5 pt-7 pb-16 sm:px-6 sm:pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14 lg:pb-24">
        <div className="space-y-5">
          <ul className="flex flex-wrap gap-2 text-[12px] font-bold">
            {["Conciergerie", "Location courte durée", entreprise.zone].map((c) => (
              <li key={c} className="rounded-full border border-[var(--trait)] bg-[var(--carte)] px-3 py-1.5">{c}</li>
            ))}
          </ul>
          <h1 className="text-[52px] font-normal tracking-[-0.01em] sm:text-7xl lg:text-[88px]">
            On loue ton logement. <em className="text-[var(--accent-texte)]">En règle.</em>
          </h1>
          <p className="max-w-xl text-[17px] leading-relaxed text-[var(--doux)] sm:text-lg">
            Annonce, accueil, ménage, linge, et le téléphone de la nuit. Avant les photos, la carte
            qui nous autorise à louer pour toi.
          </p>
          <div className="hidden flex-wrap gap-3 lg:flex">
            <Link href="#bareme" className="rounded-full bg-[var(--encre)] px-6 py-3.5 font-bold text-[var(--fond)]">Voir le barème</Link>
            <Link href={`${DOSSIER}/la-carte`} className="rounded-full border border-[var(--encre)] px-6 py-3.5 font-bold">Pourquoi la carte</Link>
          </div>
        </div>
        <div className="space-y-4">
          <Carte />
          <div className="flex flex-wrap gap-3 lg:hidden">
            <Link href="#bareme" className="flex-1 rounded-full bg-[var(--encre)] px-5 py-3.5 text-center font-bold text-[var(--fond)]">Voir le barème</Link>
            <Link href={`${DOSSIER}/la-carte`} className="flex-1 rounded-full border border-[var(--encre)] px-5 py-3.5 text-center font-bold">Pourquoi la carte</Link>
          </div>
        </div>
      </section>

      {/* 2. La nuit : le grand cadre photo, l'heure en immense, des pastilles dessous. */}
      <section aria-labelledby="titre-nuit" className="px-3 sm:px-5">
        <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[30px] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <Image
            src={photos.fenetre.src}
            alt={photos.fenetre.alt}
            width={photos.fenetre.largeur}
            height={photos.fenetre.hauteur}
            sizes="(min-width: 1200px) 1200px, 100vw"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,16,26,0.5)_0%,rgba(10,16,26,0.08)_42%,rgba(10,16,26,0.9)_100%)]" />
          <div className="relative flex min-h-[600px] flex-col justify-between gap-10 px-5 py-8 sm:min-h-[640px] sm:px-10 sm:py-12">
            <p aria-hidden="true" className="text-center font-[family-name:var(--titres)] text-[104px] leading-[0.9] tracking-[-0.02em] text-[#F1ECE2] tabular-nums sm:text-[200px]">
              23 h 04
            </p>
            <div className="mx-auto max-w-xl space-y-5 text-center">
              <h2 id="titre-nuit" className="text-[34px] font-normal sm:text-5xl">
                Un voyageur appelle. <em className="text-[#E2B65C]">C&apos;est notre téléphone qui sonne.</em>
              </h2>
              <p className="text-[16px] leading-relaxed text-[#E3E7EE]">
                Les voyageurs ont un seul numéro, le nôtre, de jour comme de nuit. Le tien reste
                sur la table de chevet.
              </p>
              <ul className="flex flex-wrap justify-center gap-2">
                {["Ligne de nuit", "Accueil", "Ménage et linge", "Loyers reversés"].map((c) => (
                  <li key={c} className="rounded-full bg-[#F1ECE2] px-4 py-2 text-[14px] font-bold text-[#162132]">{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Le barème, sur le site. */}
      <section id="bareme" className="mx-auto grid max-w-6xl scroll-mt-20 gap-10 px-5 py-20 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:py-28">
        <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <Intitule surtitre="Le barème" titre={<>Ce qu&apos;on prend, <em className="text-[var(--accent-texte)]">et qui paie quoi.</em></>}>
            <p>
              Trois lignes suffisent à presque tout : la gestion des séjours, le ménage, l&apos;annonce.
              Chacune dit son prix maximum, toutes taxes comprises, et qui le paie.
            </p>
          </Intitule>
          <p className="max-w-xl rounded-2xl border border-[var(--trait)] bg-[var(--carte)] p-4 text-[14px] leading-relaxed text-[var(--doux)]">
            Quand on loue pour un propriétaire, l&apos;afficher en ligne est obligatoire : ces informations
            doivent être « aisément accessibles sur tout service de communication au public en ligne »
            (arrêté du 10 janvier 2017, art. 2).
          </p>
          <Link href={`${DOSSIER}/bareme`} className="inline-block font-bold underline decoration-[var(--accent)] decoration-2 underline-offset-[6px]">
            Calculer un mois de location
          </Link>
        </div>
        <Bareme />
      </section>

      {/* 4. Le téléphone de 23 heures. */}
      <section id="nuit" className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto max-w-6xl space-y-12 px-5 py-20 sm:px-6 lg:py-28">
          <Intitule clair surtitre="La ligne de nuit" titre={<>On ne vend pas des revenus. <em className="text-[#E2B65C]">On vend tes nuits.</em></>}>
            <p>Un samedi, 23 h 04. Le même appel, deux téléphones.</p>
          </Intitule>
          <Telephone />
        </div>
      </section>

      {/* 5. Ce qu'on fait. */}
      <section className="mx-auto max-w-6xl space-y-12 px-5 py-20 sm:px-6 lg:py-28">
        <Intitule surtitre="Ce qu'on fait" titre={<>Tout, <em className="text-[var(--accent-texte)]">sauf dormir chez toi.</em></>}>
          <p>Du premier message du voyageur au virement du mois, chaque étape a quelqu&apos;un.</p>
        </Intitule>
        <ol className="grid gap-px overflow-hidden rounded-[22px] border border-[var(--trait)] bg-[var(--trait)] sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <li key={s.titre} className="space-y-3 bg-[var(--carte)] p-6">
              <p className="font-[family-name:var(--titres)] text-[34px] leading-none text-[var(--accent-texte)] tabular-nums">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="text-[26px] font-normal">{s.titre}</h3>
              <p className="text-[15px] leading-relaxed text-[var(--doux)]">{s.texte}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 6. Les photos, après la carte. */}
      <section aria-labelledby="titre-photos" className="mx-auto max-w-6xl px-5 pb-20 sm:px-6 lg:pb-28">
        <div className="grid gap-5 md:grid-cols-[1.25fr_0.75fr]">
          <figure className="space-y-3">
            <Photo photo={photos.lampe} sizes="(min-width: 768px) 700px, 100vw" className="aspect-[3/2]" />
            <figcaption className="text-[14px] text-[var(--doux)]">Le lit fait, la lampe allumée : chaque arrivée se prépare de la même façon.</figcaption>
          </figure>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-1">
            <figure className="space-y-3">
              <Photo photo={photos.oreiller} sizes="(min-width: 768px) 420px, 50vw" className="aspect-[4/5] md:aspect-[16/10]" />
              <figcaption className="text-[14px] text-[var(--doux)]">Draps changés à chaque départ.</figcaption>
            </figure>
            <figure className="space-y-3">
              <Photo photo={photos.cle} sizes="(min-width: 768px) 420px, 50vw" className="aspect-[4/5] md:aspect-[16/10]" />
              <figcaption className="text-[14px] text-[var(--doux)]">Les clés, remises en main propre.</figcaption>
            </figure>
          </div>
        </div>
        <div className="mt-10 max-w-2xl space-y-3">
          <h2 id="titre-photos" className="text-[34px] font-normal sm:text-5xl">Des photos de lits, <em className="text-[var(--accent-texte)]">jamais d&apos;adresses.</em></h2>
          <p className="text-[16px] leading-relaxed text-[var(--doux)]">
            Aucun logement de nos propriétaires n&apos;est montré ni situé sur ce site. Les photos
            ci-dessus sont des illustrations.
          </p>
        </div>
      </section>

      {/* 7. Le bilan du lundi. */}
      <section id="bilan" className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-28">
          <Intitule clair surtitre="Chaque lundi" titre={<>Le vrai bilan, <em className="text-[#E2B65C]">même quand il est moins bon.</em></>}>
            <p>
              Arrivées, appels de nuit, propriétaires réveillés. Publié ici et sur TikTok chaque lundi,
              avec ce qui s&apos;est passé. Les mauvaises semaines aussi.
            </p>
          </Intitule>
          <Bilan />
        </div>
      </section>

      {/* 8. La méthode. */}
      <section className="mx-auto max-w-6xl space-y-12 px-5 py-20 sm:px-6 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Intitule surtitre="Comment ça commence" titre={<>Quatre étapes, <em className="text-[var(--accent-texte)]">un mandat écrit.</em></>} />
          <Link href={`${DOSSIER}/proprietaires`} className="font-bold underline decoration-[var(--accent)] decoration-2 underline-offset-[6px]">Tout sur la gestion</Link>
        </div>
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {methode.map((m, i) => (
            <li key={m.titre} className="space-y-3 border-t-2 border-[var(--encre)] pt-5">
              <p className="flex items-baseline justify-between gap-3">
                <span className="font-[family-name:var(--titres)] text-[40px] leading-none tabular-nums">{i + 1}</span>
                <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--accent-texte)]">{m.duree}</span>
              </p>
              <h3 className="text-[26px] font-normal">{m.titre}</h3>
              <p className="text-[15px] leading-relaxed text-[var(--doux)]">{m.texte}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 9. Les questions. */}
      <section className="border-t border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:py-28">
          <div className="space-y-6">
            <Intitule surtitre="Questions" titre={<>Avant de nous <em className="text-[var(--accent-texte)]">confier tes clés.</em></>} />
            <Surtitre>Ou appelle : {entreprise.telephone}</Surtitre>
          </div>
          <Faq nombre={5} />
        </div>
      </section>

      {/* 10. L'appel final. */}
      <AppelFinal />
    </div>
  );
}
