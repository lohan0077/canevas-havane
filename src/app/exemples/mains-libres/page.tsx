import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, PRESTATIONS, euros, garage, photos, questions } from "./_composants/donnees";
import Plaque from "./_composants/Plaque";
import Faq from "./_composants/Faq";

// Le site imaginé dans la vidéo « Si je devais remplir l'agenda d'un garagiste » : un
// garage où personne n'a besoin d'appeler. La plaque donne le prix, le créneau se
// réserve, la question arrive avec une photo. Mise en page inspirée du modèle
// « Cordex » de MotionSites (fond noir, navigation en pilule, grand titre, gros plan
// mécanique), transposée à un garage.
export const metadata: Metadata = {
  title: "Mains Libres — site de démonstration",
  description: "Site de démonstration d'un garage imaginaire, réalisé par Canevas Havane : tu tapes ta plaque, le site te donne le prix de la vidange, tu réserves ton créneau sans appeler.",
  ...adressesDeLaPage("/exemples/mains-libres"),
};

const TROIS = [
  { n: "01", titre: "Ta plaque", texte: "Le site reconnaît ta voiture et affiche le prix, pièces et main-d'œuvre comprises.", href: `${DOSSIER}#plaque` },
  { n: "02", titre: "Ton créneau", texte: "Tu choisis le jour et l'heure de dépôt. Tu déposes la voiture, c'est tout.", href: `${DOSSIER}/rendez-vous` },
  { n: "03", titre: "Ta réponse", texte: "Pendant la réparation, une photo et une question. Oui, ou non. Rien sans ton accord.", href: `${DOSSIER}/suivi` },
];

const ENGAGEMENTS = [
  { titre: "Rien sans ton accord", texte: "Ce qui n'était pas prévu arrive avec une photo et un devis. Tu réponds oui ou non, depuis ton téléphone." },
  { titre: "Des prix TTC, pour ton modèle", texte: "Pièces et main-d'œuvre comprises, avant de réserver. Pas de « à partir de »." },
  { titre: "Une boîte à clés", texte: "Dépose ta voiture la veille au soir, récupère-la après la fermeture." },
  { titre: "Le téléphone reste là", texte: "Quelqu'un décroche à l'accueil, tôt le matin et en fin de journée. Le reste du temps, on a les mains dans le moteur." },
];

export default function MainsLibres() {
  return (
    <main>
      {/* 1. L'ouverture : la phrase, et la plaque. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-12 pb-16 grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div className="space-y-5">
          <p className="font-[family-name:var(--titres)] text-sm uppercase tracking-[0.18em] text-[var(--doux)]">Garage · entretien et réparation · Ta Ville</p>
          <h1 className="text-[44px] sm:text-7xl font-medium tracking-[-0.04em] leading-[0.98]">
            Ici, personne n'a besoin <span className="text-[var(--accent-texte)]">d'appeler.</span>
          </h1>
          <p className="text-lg sm:text-xl leading-relaxed text-[var(--doux)] max-w-xl">
            Le garagiste a les mains dans le moteur. Le site répond pour lui : ta voiture, son
            prix, ton créneau.
          </p>
        </div>
        <div id="plaque" className="scroll-mt-24">
          <Plaque />
        </div>
      </section>

      {/* 2. Le gros plan. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative aspect-[4/5] sm:aspect-[21/9] overflow-hidden rounded-[32px] bg-[var(--carte)]">
          <Image src={photos.mains.src} alt={photos.mains.alt} fill sizes="(min-width: 1152px) 1152px, 100vw" className="object-cover" />
          <p className="absolute left-4 bottom-4 right-4 sm:right-auto sm:max-w-md rounded-2xl bg-[var(--fond)] p-5 font-[family-name:var(--titres)] text-2xl leading-snug">
            Nos mains sont dans le moteur. <span className="text-[var(--accent-texte)]">Le site, lui, répond.</span>
          </p>
        </div>
      </section>

      {/* 3. Trois gestes, zéro appel. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 space-y-10">
        <h2 className="text-4xl sm:text-6xl font-medium tracking-[-0.03em] max-w-3xl">Trois gestes. <span className="text-[var(--doux)]">Zéro appel.</span></h2>
        <ol className="grid gap-px overflow-hidden rounded-[28px] border border-[var(--trait)] bg-[var(--trait)] md:grid-cols-3">
          {TROIS.map((t) => (
            <li key={t.n} className="bg-[var(--fond)] p-6 sm:p-8 space-y-4">
              <p className="font-[family-name:var(--titres)] text-sm text-[var(--accent-texte)]">{t.n}</p>
              <h3 className="text-3xl font-medium">{t.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{t.texte}</p>
              <Link href={t.href} className="inline-block font-semibold underline underline-offset-4">Essayer</Link>
            </li>
          ))}
        </ol>
      </section>

      {/* 4. Les prix courants. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-6xl font-medium tracking-[-0.03em]">Le prix, avant de venir.</h2>
            <p className="text-lg leading-relaxed">
              Pour une citadine, pièces et main-d'œuvre comprises. Les autres modèles sont sur
              la page des tarifs.
            </p>
            <Link href={`${DOSSIER}/tarifs`} className="inline-flex rounded-full bg-[var(--sur-sombre)] text-[var(--sombre)] px-6 py-3 font-semibold">
              Tous les tarifs
            </Link>
          </div>
          <div>
            <ul className="divide-y divide-[var(--sur-sombre)]/20 border-y border-[var(--sur-sombre)]/20">
              {PRESTATIONS.map((p) => (
                <li key={p.id} className="flex items-baseline justify-between gap-4 py-4">
                  <span>
                    <span className="block font-[family-name:var(--titres)] text-xl font-medium">{p.nom}</span>
                    <span className="block text-sm">{p.duree} d'atelier</span>
                  </span>
                  <span className="font-[family-name:var(--titres)] text-2xl font-bold whitespace-nowrap">{euros(p.prix.citadine)}</span>
                </li>
              ))}
            </ul>
            <p className="pt-3 text-sm">Prix TTC d'exemple : le garage est fictif.</p>
          </div>
        </div>
      </section>

      {/* 5. Pourquoi. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 grid gap-8 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-[3/2] overflow-hidden rounded-[28px] bg-[var(--carte)]">
          <Image src={photos.cames.src} alt={photos.cames.alt} fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
        </div>
        <div className="space-y-5">
          <p className="font-[family-name:var(--titres)] text-sm uppercase tracking-[0.18em] text-[var(--accent-texte)]">Pourquoi</p>
          <p className="font-[family-name:var(--titres)] text-3xl sm:text-5xl font-medium tracking-[-0.03em] leading-[1.05]">
            Un garagiste au téléphone, c'est une voiture qui n'avance pas.
          </p>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Le prix, le créneau, l'avancement : tout ce qu'on répétait dix fois par jour est sur le
            site. Le temps gagné va dans les voitures.
          </p>
        </div>
      </section>

      {/* 6. Pendant la réparation. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="rounded-[32px] border border-[var(--trait)] bg-[var(--carte)] p-6 sm:p-12 grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4">
            <p className="font-[family-name:var(--titres)] text-sm uppercase tracking-[0.18em] text-[var(--accent-texte)]">Pendant la réparation</p>
            <h2 className="text-4xl sm:text-5xl font-medium tracking-[-0.03em]">Une photo. Une question. Oui, ou non.</h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              Une pièce usée qu'on n'avait pas prévue ? Tu la vois, tu lis le devis, tu décides.
              Sans quitter ta réunion.
            </p>
            <Link href={`${DOSSIER}/suivi`} className="inline-flex rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-6 py-3 font-semibold">
              Voir un suivi
            </Link>
          </div>
          <div className="rounded-[24px] bg-[var(--fond)] p-5 space-y-3">
            <p className="text-sm text-[var(--doux)]">L'atelier · 9 h 18</p>
            <p className="text-xl font-semibold">Tes plaquettes avant sont usées. On les change ?</p>
            <p className="text-sm text-[var(--doux)]">Devis joint, à valider · 129&nbsp;€&nbsp;TTC (exemple)</p>
            <div className="grid grid-cols-2 gap-2" aria-hidden="true">
              <span className="rounded-full bg-[var(--accent)] py-3 text-center font-bold text-[var(--sur-accent)]">Oui</span>
              <span className="rounded-full border-2 border-[var(--encre)] py-3 text-center font-bold">Non</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Nos engagements. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20 space-y-10">
        <h2 className="text-4xl sm:text-6xl font-medium tracking-[-0.03em]">Ce qu'on s'engage à faire.</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {ENGAGEMENTS.map((e) => (
            <li key={e.titre} className="rounded-[24px] border border-[var(--trait)] p-6 space-y-2">
              <h3 className="text-2xl font-medium">{e.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 8. L'atelier, l'adresse, les horaires. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20 grid gap-8 lg:grid-cols-2">
        <div className="relative aspect-[3/2] overflow-hidden rounded-[28px] bg-[var(--carte)]">
          <Image src={photos.cles.src} alt={photos.cles.alt} fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
        </div>
        <div className="space-y-5">
          <h2 className="text-4xl sm:text-5xl font-medium tracking-[-0.03em]">L'atelier.</h2>
          <p className="text-lg leading-relaxed">{garage.adresse} (adresse d'exemple). Deux ponts, deux mécaniciens, une boîte à clés.</p>
          <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {garage.horaires.map((h) => (
              <li key={h.jours} className="flex justify-between gap-4 py-3">
                <span>{h.jours}</span><span className="font-semibold tabular-nums">{h.heures}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 9. Questions. */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-20 space-y-8">
        <h2 className="text-4xl sm:text-6xl font-medium tracking-[-0.03em]">Questions.</h2>
        <Faq questions={questions} />
      </section>

      {/* 10. Dernier appel, sans appel. */}
      <section className="px-4 sm:px-6 pb-20">
        <div className="max-w-6xl mx-auto rounded-[32px] bg-[var(--accent)] text-[var(--sur-accent)] p-8 sm:p-14 space-y-6">
          <p className="font-[family-name:var(--titres)] text-5xl sm:text-7xl font-medium tracking-[-0.04em] leading-[0.98]">
            Mardi, 8&nbsp;h. Tu déposes, c'est tout.
          </p>
          <Link href={`${DOSSIER}/rendez-vous`} className="inline-flex rounded-full bg-[var(--sur-accent)] text-[var(--accent)] px-7 py-4 font-[family-name:var(--titres)] text-lg font-bold">
            Choisir mon créneau
          </Link>
        </div>
      </section>
    </main>
  );
}
