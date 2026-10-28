import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, SAMEDIS, euros, garage, photos, questions, tarifs } from "./_composants/donnees";
import Etiquette from "./_composants/Etiquette";
import Faq from "./_composants/Faq";

// Le site de la marque imaginée dans la vidéo « Si je devais créer un garage » : un
// garage qui vend la preuve. Chaque réparation a sa page privée, la vieille pièce est
// rendue, et un samedi par mois le capot est ouvert à tous. Mise en page inspirée du
// modèle « Menuchi » de MotionSites (un objet au centre, le nom en lettres géantes,
// une légende sur le côté), transposée en jaune signal et graphite.
export const metadata: Metadata = {
  title: "Capot Ouvert — site de démonstration",
  description: "Site de démonstration d'un garage imaginaire, réalisé par Canevas Havane : chaque réparation a sa page, avec les photos d'avant et d'après, et la vieille pièce rendue.",
  ...adressesDeLaPage("/exemples/capot-ouvert"),
};

const PREUVES = [
  { n: "1", titre: "La photo d'avant", texte: "Prise à l'atelier, sur le pont, avant de démonter. Tu vois l'usure, pas une description." },
  { n: "2", titre: "La photo d'après", texte: "La même pièce, neuve et remontée. Sur ta page, côte à côte." },
  { n: "3", titre: "La vieille pièce", texte: "Rendue dans un sac, avec une étiquette : laquelle, pourquoi, quand. Quand c'est possible." },
];

const ETAPES = [
  { titre: "Le diagnostic", texte: "On ouvre, on regarde, on photographie. Tu reçois les photos avant le devis." },
  { titre: "Le devis", texte: "Ligne par ligne, en TTC. On attend ton accord pour commencer." },
  { titre: "La réparation", texte: "Les pièces changées sont photographiées avant et après." },
  { titre: "La remise", texte: "Ta page privée, ta facture, ta vieille pièce dans son sac." },
];

export default function CapotOuvert() {
  return (
    <main>
      {/* 1. L'ouverture : l'objet, et le nom en grand. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10">
        <div className="grid gap-5 lg:grid-cols-[1fr_1.1fr_1fr] lg:items-end">
          <div className="space-y-3 lg:pb-6">
            <p className="text-sm font-bold uppercase tracking-[0.16em]">Garage · Ta Ville</p>
            <p className="font-[family-name:var(--titres)] text-3xl sm:text-4xl font-bold leading-[1.05]">Chez nous, tu vois tout.</p>
          </div>
          <div className="relative aspect-[4/5] max-h-[560px] w-full overflow-hidden rounded-[14px] border-[3px] border-[var(--trait)] bg-[var(--sombre)]">
            <Image src={photos.capot.src} alt={photos.capot.alt} fill priority sizes="(min-width: 1024px) 420px, 100vw" className="object-cover" />
          </div>
          <p className="text-lg leading-relaxed lg:pb-6">
            Chaque réparation a sa page, avec les photos d'avant et d'après. Et quand c'est
            possible, ta vieille pièce, on te la rend.
          </p>
        </div>
        <p aria-hidden="true" className="font-[family-name:var(--titres)] font-bold uppercase leading-[0.82] tracking-[-0.03em] text-[24vw] lg:text-[164px] lg:whitespace-nowrap pt-6 pb-2">
          Capot <span className="lg:inline block">Ouvert</span>
        </p>
        <h1 className="sr-only">Capot Ouvert, garage : chez nous, tu vois tout.</h1>
        <div className="flex flex-wrap gap-3 border-t-[3px] border-[var(--trait)] py-6">
          <Link href={`${DOSSIER}/reparation`} className="rounded-md bg-[var(--sombre)] px-6 py-3.5 font-semibold text-[var(--sur-sombre)]">Voir une page de réparation</Link>
          <Link href={`${DOSSIER}/samedi`} className="rounded-md border-[3px] border-[var(--trait)] px-6 py-3 font-semibold">Le samedi, capot ouvert</Link>
        </div>
      </section>

      {/* 2. La peur, et la réponse. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 space-y-12">
          <h2 className="text-5xl sm:text-7xl font-bold tracking-[-0.02em] max-w-4xl">
            Une pièce changée <span className="text-[var(--fond)]">pour rien ?</span>
          </h2>
          <p className="text-xl leading-relaxed max-w-2xl">
            C'est la peur de tout le monde au garage. On ne la calme pas avec une promesse.
            On la calme avec trois preuves.
          </p>
          <ol className="grid gap-4 md:grid-cols-3">
            {PREUVES.map((p) => (
              <li key={p.n} className="rounded-[14px] border-[3px] border-[var(--sur-sombre)] p-6 space-y-3">
                <p className="font-[family-name:var(--titres)] text-6xl font-bold text-[var(--fond)] [font-variant-numeric:lining-nums]">{p.n}</p>
                <h3 className="text-3xl font-bold">{p.titre}</h3>
                <p className="text-lg leading-relaxed">{p.texte}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 3. Une page par réparation. */}
      <section className="bg-[var(--carte)] border-b-[3px] border-[var(--trait)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-5">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Sur le site</p>
            <h2 className="text-5xl sm:text-6xl font-bold tracking-[-0.02em]">Chaque réparation a sa page.</h2>
            <p className="text-xl leading-relaxed">
              Un lien privé, envoyé le jour de la remise : les photos d'avant, d'après, la pièce
              changée et pourquoi, la facture. Tu le gardes, tu le montres à qui tu veux.
            </p>
            <Link href={`${DOSSIER}/reparation`} className="inline-flex rounded-md bg-[var(--accent)] px-6 py-3.5 font-semibold text-[var(--sur-accent)]">Ouvrir la page d'exemple</Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {(["avant", "apres"] as const).map((v) => (
              <figure key={v} className="space-y-2">
                <div className="relative aspect-[3/4] overflow-hidden rounded-[12px] border-[3px] border-[var(--trait)] bg-[var(--sombre)]">
                  <Image src={photos[v].src} alt={photos[v].alt} fill sizes="(min-width: 1024px) 270px, 50vw" className="object-cover" />
                </div>
                <figcaption className="font-[family-name:var(--titres)] text-2xl font-bold">{v === "avant" ? "Avant" : "Après"}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Le sac. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="space-y-5">
          <h2 className="text-5xl sm:text-6xl font-bold tracking-[-0.02em]">Ta vieille pièce, on te la rend.</h2>
          <p className="text-xl leading-relaxed">
            Dans un sac, avec une étiquette : laquelle, pourquoi on l'a changée, quand. Un
            disque, une plaquette, une courroie : tu repars avec. L'huile, les filtres et les
            batteries usagés partent au recyclage : ceux-là, on ne les rend pas.
          </p>
        </div>
        <Etiquette />
      </section>

      {/* 5. Le samedi. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--fond)]">Un samedi matin par mois</p>
            <h2 className="text-5xl sm:text-7xl font-bold tracking-[-0.02em]">Samedi, <span className="text-[var(--fond)]">capot ouvert.</span></h2>
            <p className="text-xl leading-relaxed">
              Gratuit, ouvert à tous. On t'apprend à vérifier tes niveaux, tes pneus, et où est
              la roue de secours. Avec ou sans voiture.
            </p>
            <ul className="flex flex-wrap gap-2">
              {SAMEDIS.map((s) => (
                <li key={s.date} className="rounded-md border-2 border-[var(--sur-sombre)] px-3 py-2 font-semibold [font-variant-numeric:lining-nums]">{s.court}</li>
              ))}
            </ul>
            <Link href={`${DOSSIER}/samedi`} className="inline-flex rounded-md bg-[var(--fond)] px-6 py-3.5 font-semibold text-[var(--encre)]">S'inscrire</Link>
          </div>
          <div className="relative aspect-[3/4] overflow-hidden rounded-[14px] border-[3px] border-[var(--fond)] bg-[var(--sombre)]">
            <Image src={photos.jauge.src} alt={photos.jauge.alt} fill sizes="(min-width: 1024px) 420px, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* 6. Les prix. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-5">
          <h2 className="text-5xl sm:text-6xl font-bold tracking-[-0.02em]">Les prix, à découvert.</h2>
          <p className="text-xl leading-relaxed">TTC, pièces et main-d'œuvre comprises, pour une citadine. Prix d'exemple.</p>
          <Link href={`${DOSSIER}/tarifs`} className="inline-flex rounded-md border-[3px] border-[var(--trait)] px-6 py-3 font-semibold">Tous les tarifs</Link>
        </div>
        <ul className="border-t-[3px] border-[var(--trait)]">
          {tarifs.slice(0, 4).map((t) => (
            <li key={t.nom} className="flex items-baseline justify-between gap-4 border-b-[3px] border-[var(--trait)] py-4">
              <span>
                <span className="block font-[family-name:var(--titres)] text-2xl font-bold">{t.nom}</span>
                <span className="block text-[var(--doux)]">{t.detail}</span>
              </span>
              <span className="font-[family-name:var(--titres)] text-2xl font-bold whitespace-nowrap [font-variant-numeric:lining-nums]">{euros(t.prix)}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 7. Comment ça se passe. */}
      <section className="bg-[var(--carte)] border-y-[3px] border-[var(--trait)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 space-y-10">
          <h2 className="text-5xl sm:text-6xl font-bold tracking-[-0.02em]">Comment ça se passe.</h2>
          <ol className="grid gap-px overflow-hidden rounded-[14px] border-[3px] border-[var(--trait)] bg-[var(--trait)] md:grid-cols-4">
            {ETAPES.map((e, i) => (
              <li key={e.titre} className="bg-[var(--carte)] p-6 space-y-2">
                <p className="font-[family-name:var(--titres)] text-5xl font-bold text-[var(--accent-texte)] [font-variant-numeric:lining-nums]">0{i + 1}</p>
                <h3 className="text-2xl font-bold">{e.titre}</h3>
                <p className="text-lg leading-relaxed">{e.texte}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 8. L'atelier. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-[3/2] overflow-hidden rounded-[14px] border-[3px] border-[var(--trait)] bg-[var(--sombre)]">
          <Image src={photos.cles.src} alt={photos.cles.alt} fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
        </div>
        <div className="space-y-5">
          <h2 className="text-5xl sm:text-6xl font-bold tracking-[-0.02em]">L'atelier.</h2>
          <p className="text-xl leading-relaxed">
            {garage.adresse} (adresse d'exemple). Deux ponts, un mur de clés rangées par taille,
            et une vitre entre l'accueil et l'atelier : tu vois ta voiture pendant qu'on y
            travaille.
          </p>
          <ul className="border-t-[3px] border-[var(--trait)]">
            {garage.horaires.map((h) => (
              <li key={h.jours} className="flex justify-between gap-4 border-b-[3px] border-[var(--trait)] py-3 text-lg">
                <span>{h.jours}</span><span className="font-semibold">{h.heures}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 9. Questions. */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-20 space-y-8">
        <h2 className="text-5xl sm:text-6xl font-bold tracking-[-0.02em]">Questions.</h2>
        <Faq questions={questions} />
      </section>

      {/* 10. Le dernier mot. */}
      <section className="bg-[var(--accent)] text-[var(--sur-accent)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 space-y-6">
          <p className="font-[family-name:var(--titres)] text-5xl sm:text-7xl font-bold tracking-[-0.02em] leading-[1]">Pas de la mécanique. La fin du doute.</p>
          <Link href={`${DOSSIER}/reparation`} className="inline-flex rounded-md bg-[var(--carte)] px-6 py-3.5 font-semibold text-[var(--encre)]">Voir une page de réparation</Link>
        </div>
      </section>
    </main>
  );
}
