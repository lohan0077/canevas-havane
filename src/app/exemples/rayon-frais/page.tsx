import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Pastille from "./_composants/Pastille";
import Ticket from "./_composants/Ticket";
import { DOSSIER, atelierInfo, cabinet, photos, questions, rayons, seances } from "./_composants/donnees";

// Le site de la marque imaginée dans la vidéo « Si je devais créer un cabinet de
// diététique de zéro » : on part de vos courses. Le ticket de caisse ligne par ligne,
// le rayon qu'on choisit sur le site, l'atelier étiquettes du samedi matin, et zéro kilo
// promis. Premier écran inspiré du modèle « Modern Dental Clinic » de MotionSites
// (une grande carte de couleur, un titre énorme, une pastille ronde qui tourne),
// transposé à un étal de marché.
export const metadata: Metadata = {
  title: "Rayon Frais — site de démonstration",
  description:
    "Site de démonstration d'un cabinet de diététique imaginaire, réalisé par Canevas Havane : on part de vos courses, ticket de caisse et rayon à l'appui. Zéro kilo promis.",
  ...adressesDeLaPage("/exemples/rayon-frais"),
};

const lining = "[font-variant-numeric:lining-nums]";

export default function RayonFrais() {
  return (
    <main>
      {/* 1. La grande carte verte, le titre énorme, la cagette, la pastille. */}
      <section className="px-3 sm:px-6 pt-3 sm:pt-6">
        <div className="relative max-w-6xl mx-auto overflow-hidden rounded-[34px] bg-[var(--sombre)] text-[var(--sur-sombre)] grid lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative z-10 px-6 pt-10 pb-8 sm:px-12 sm:py-16 space-y-7">
            <p className="inline-flex rounded-full border-2 border-[#F2C94C] px-4 py-1 text-sm font-semibold text-[#F2C94C]">{cabinet.dieteticienne} · diététicienne diplômée</p>
            <h1 className="text-[54px] sm:text-8xl font-bold leading-[0.95] tracking-[-0.02em]">
              On part de <span className="text-[#F2C94C]">vos courses.</span>
            </h1>
            <p className="max-w-md text-lg leading-relaxed text-[#D7E6D2]">
              Pas d&apos;équilibre parfait, pas de balance. Votre ticket de caisse, votre rayon, vos
              samedis. Une partie des séances se fait au supermarché, si vous voulez.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href={`${DOSSIER}/rayons`} className="inline-flex items-center justify-center min-h-14 rounded-full bg-[#C2402A] px-8 text-lg font-semibold text-white">Choisir un rayon</Link>
              <Link href={`${DOSSIER}#ticket`} className="inline-flex items-center justify-center min-h-14 rounded-full border-2 border-[#FFF7E6] px-8 text-lg font-semibold">Le ticket de caisse</Link>
            </div>
          </div>
          <div className="relative min-h-[340px] lg:min-h-full">
            <Image src={photos.caisse.src} alt={photos.caisse.alt} fill priority sizes="(min-width: 1024px) 480px, 100vw" className="object-cover" />
            <Pastille className="absolute right-5 top-5 sm:right-8 sm:top-8" />
            <div className="absolute left-4 bottom-4 right-4 sm:right-auto rounded-[20px] bg-[#FFF7E6] text-[#1F3B24] px-5 py-4 shadow-lg">
              <p className="text-xs font-semibold text-[var(--accent-texte)]">Atelier étiquettes · à six</p>
              <p className={`font-[family-name:var(--titres)] text-xl font-semibold ${lining}`}>{atelierInfo.date}, {atelierInfo.heure}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Le ticket de caisse. */}
      <section id="ticket" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28 space-y-10 scroll-mt-16">
        <div className="max-w-2xl space-y-5 px-1">
          <p className="text-sm font-semibold text-[var(--accent-texte)]">La première séance, au cabinet</p>
          <h2 className="text-[42px] sm:text-6xl font-bold leading-[1.02]">Venez avec votre ticket de caisse.</h2>
          <p className="text-lg leading-relaxed text-[var(--doux)]">On part de là, ligne par ligne. Essayez avec celui-ci.</p>
        </div>
        <Ticket />
      </section>

      {/* 3. Les rayons. */}
      <section id="rayons" className="bg-[#F7EBCB] scroll-mt-16">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-28 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <p className="text-sm font-semibold text-[var(--accent-texte)]">Ensuite, si vous voulez</p>
            <h2 className="text-[42px] sm:text-6xl font-bold leading-[1.02]">On va au rayon ensemble.</h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              En individuel, dans le magasin où vous faites vos courses. Sur le site, vous choisissez lequel.
            </p>
            <ul className="space-y-2">
              {rayons.map((r) => (
                <li key={r.id}>
                  <Link href={`${DOSSIER}/rayons`} className="flex items-center gap-4 rounded-[20px] bg-[var(--carte)] px-5 py-4">
                    <span aria-hidden="true" className="text-3xl">{r.emoji}</span>
                    <span className="flex-1 font-[family-name:var(--titres)] text-2xl font-semibold">{r.nom}</span>
                    <span aria-hidden="true" className="text-2xl">›</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[3/2] overflow-hidden rounded-[30px]">
            <Image src={photos.cagettes.src} alt={photos.cagettes.alt} fill sizes="(min-width: 1024px) 540px, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* 4. Zéro kilo promis. */}
      <section className="max-w-5xl mx-auto px-5 sm:px-6 py-20 sm:py-28 grid gap-8 sm:grid-cols-[auto_1fr] sm:items-center">
        <div className="relative mx-auto h-32 w-32"><Pastille id="rf-cercle-2" className="relative" /></div>
        <div className="space-y-4">
          <h2 className="text-[42px] sm:text-6xl font-bold leading-[1.02]">Zéro kilo promis. Pas d&apos;avant-après.</h2>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Personne ne peut promettre honnêtement un résultat. Ici, on ne vend pas un régime : on
            part de vos prochaines courses, rayon par rayon.
          </p>
        </div>
      </section>

      {/* 5. L'atelier du samedi. */}
      <section className="px-3 sm:px-6">
        <div className="max-w-6xl mx-auto rounded-[34px] bg-[#C2402A] text-white grid lg:grid-cols-[1.1fr_0.9fr] overflow-hidden">
          <div className="px-6 py-14 sm:px-12 space-y-6">
            <p className="text-sm font-semibold">Pour le lancement</p>
            <h2 className="text-[42px] sm:text-6xl font-bold leading-[1.02]">Samedi matin, au rayon frais.</h2>
            <p className={`font-[family-name:var(--titres)] text-2xl font-semibold ${lining}`}>{atelierInfo.date} · {atelierInfo.heure} · {atelierInfo.places} personnes</p>
            <p className="text-lg leading-relaxed">Un atelier pour apprendre à lire les étiquettes. À six, on parle d&apos;étiquettes — jamais du cas de chacun.</p>
            <Link href={`${DOSSIER}/atelier`} className="inline-flex items-center min-h-14 rounded-full bg-[#FFF7E6] text-[#1F3B24] px-7 text-lg font-semibold">Tout savoir sur l&apos;atelier</Link>
          </div>
          <div className="relative min-h-[260px]">
            <Image src={photos.poivrons.src} alt={photos.poivrons.alt} fill sizes="(min-width: 1024px) 480px, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* 6. Tarifs. */}
      <section id="tarifs" className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-28 space-y-8 scroll-mt-16">
        <h2 className="text-[42px] sm:text-6xl font-bold leading-[1.02]">Les prix, comme sur une étiquette.</h2>
        <ul className="grid gap-3 md:grid-cols-3">
          {seances.map((s) => (
            <li key={s.nom} className="relative rounded-[24px] border-2 border-[var(--encre)] bg-[var(--carte)] p-6 space-y-2">
              <p className="font-semibold">{s.nom}</p>
              <p className={`font-[family-name:var(--titres)] text-6xl font-bold ${lining}`}>{s.prix}</p>
              <p className={`text-sm text-[var(--doux)] ${lining}`}>{s.duree} · {s.detail}</p>
            </li>
          ))}
        </ul>
        <p className="text-sm text-[var(--doux)]">Prix d&apos;exemple, TTC. Facture à chaque séance, carte bancaire acceptée.</p>
      </section>

      {/* 7. La diététicienne. */}
      <section className="bg-[var(--carte)] border-y-2 border-dashed border-[var(--trait)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-20 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[3/2] overflow-hidden rounded-[30px]">
            <Image src={photos.panier.src} alt={photos.panier.alt} fill sizes="(min-width: 1024px) 540px, 100vw" className="object-cover" />
          </div>
          <div className="space-y-5">
            <p className="text-sm font-semibold text-[var(--accent-texte)]">La diététicienne</p>
            <h2 className="text-[42px] sm:text-6xl font-bold leading-[1.02]">{cabinet.dieteticienne}, diététicienne diplômée.</h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              {cabinet.diplome}. N° ADELI {cabinet.adeli} (exemple). Le nom du cabinet ne remplace
              pas le titre : « diététicien » est protégé par la loi.
            </p>
            <p className="text-sm text-[var(--doux)]">Code de la santé publique, art. L4371-2 et L4372-2.</p>
          </div>
        </div>
      </section>

      {/* 8. Questions. */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-20 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <h2 className="text-[42px] sm:text-5xl font-bold leading-[1.02]">Questions de caisse.</h2>
        <div className="space-y-2">
          {questions.map((q) => (
            <details key={q.q} className="group rounded-[20px] border-2 border-[var(--trait)] bg-[var(--carte)] px-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-4 font-semibold text-lg [&::-webkit-details-marker]:hidden">
                {q.q}
                <span aria-hidden="true" className="text-2xl leading-none text-[var(--accent-texte)] transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="pb-5 pr-6 leading-relaxed text-[var(--doux)]">{q.r}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 9. Dernier écran. */}
      <section className="px-3 sm:px-6 pb-16">
        <div className="max-w-6xl mx-auto rounded-[34px] bg-[#F2C94C] text-[#1F3B24] px-6 py-16 text-center space-y-6">
          <p className="font-[family-name:var(--titres)] text-[44px] sm:text-7xl font-bold leading-[1]">Vos prochaines courses.</p>
          <p className="text-lg">Ça ne vend pas un régime. Ça part de votre caddie.</p>
          <Link href={`${DOSSIER}/rayons`} className="inline-flex items-center justify-center min-h-14 rounded-full bg-[#1F3B24] text-[#FFF7E6] px-8 text-lg font-semibold">Choisir un rayon</Link>
          <p className={`font-semibold ${lining}`}>ou {cabinet.telephone}</p>
        </div>
      </section>
    </main>
  );
}
