import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Creneaux from "../_kit/Creneaux";
import Horloge from "./_composants/Horloge";
import { BoutonRdv, Plaque, Surtitre } from "./_composants/Blocs";
import { DOSSIER, cabinet, creneaux, photos, porteOuverte, questions } from "./_composants/donnees";

// Le site de la marque imaginée dans la vidéo « Si je devais créer un cabinet de
// psychologue de zéro » : cinquante minutes où l'on n'a rien à prouver. Une horloge
// qui raconte la première séance, le titre de psychologue écrit plus gros que le nom,
// une porte ouverte où personne ne demande rien. Premier écran inspiré du modèle
// « Rare Gallery » de MotionSites (un objet au centre de la nuit, le titre en dessous),
// transposé : l'objet est une porte.
export const metadata: Metadata = {
  title: "Cinquante Minutes — site de démonstration",
  description:
    "Site de démonstration d'un cabinet de psychologue imaginaire, réalisé par Canevas Havane : une horloge de cinquante minutes qui raconte la première séance.",
  ...adressesDeLaPage("/exemples/cinquante-minutes"),
};

export default function CinquanteMinutes() {
  return (
    <main>
      {/* 1. La nuit, une porte au centre, le titre dessous. */}
      <section className="relative overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(60%_45%_at_50%_30%,rgba(201,162,126,0.22),transparent_70%)]" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-6 pt-10 pb-16 text-center space-y-9">
          <div className="relative mx-auto w-[64%] max-w-[300px] aspect-[2/3] overflow-hidden rounded-t-[160px] rounded-b-[6px] border border-[#C9A27E]/40 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
            <Image src={photos.porte.src} alt={photos.porte.alt} fill priority sizes="(min-width: 640px) 300px, 64vw" className="object-cover" />
          </div>
          <h1 className="text-[44px] sm:text-7xl leading-[1.04]">
            Cinquante minutes où vous n&apos;avez <em className="text-[#C9A27E]">rien à prouver.</em>
          </h1>
          <p className="mx-auto max-w-md text-lg leading-relaxed text-[#E6D3BF]">
            Un cabinet de psychologue. Pas de promesse, pas de discours : une heure qui
            n&apos;en est pas tout à fait une, et qui vous appartient.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <BoutonRdv clair />
            <Link href={`${DOSSIER}/premiere-seance`} className="inline-flex items-center justify-center min-h-12 rounded-full border border-[#C9A27E] px-7 text-[15px]">
              La première séance
            </Link>
          </div>
        </div>
      </section>

      {/* 2. La plaque : le titre plus gros que le nom. */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-28 grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <Surtitre>Sur la porte</Surtitre>
          <h2 className="text-[40px] sm:text-6xl">Le nom en petit. <em>Le titre en grand.</em></h2>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            « Psychologue » est un titre protégé par la loi : seuls les titulaires d&apos;un
            diplôme fixé par les textes peuvent le porter. Sur la plaque comme ici, c&apos;est
            lui qu&apos;on lit d&apos;abord.
          </p>
          <p className="text-sm text-[var(--doux)]">Loi n° 85-772 du 25 juillet 1985, art. 44.</p>
        </div>
        <Plaque />
      </section>

      {/* 3. L'horloge de la première séance. */}
      <section id="horloge" className="bg-[var(--sombre)] text-[var(--sur-sombre)] scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28 space-y-10">
          <div className="space-y-5 max-w-2xl px-1">
            <Surtitre clair>La première séance</Surtitre>
            <h2 className="text-[40px] sm:text-6xl">Une horloge, <em className="text-[#C9A27E]">cinquante minutes.</em></h2>
            <p className="text-lg leading-relaxed text-[#E6D3BF]">
              Faites glisser le temps : elle raconte ce qui se passe, minute après minute.
              Un déroulé, pas une promesse.
            </p>
          </div>
          <Horloge clair />
        </div>
      </section>

      {/* 4. Le contre-pied. */}
      <section className="max-w-4xl mx-auto px-5 sm:px-6 py-20 sm:py-28 text-center space-y-8">
        <Surtitre>Ce que nous ne vendons pas</Surtitre>
        <p className="font-[family-name:var(--titres)] text-[38px] sm:text-6xl leading-[1.1]">
          <span className="line-through decoration-1 decoration-[var(--doux)] text-[var(--doux)]">De la bienveillance.</span>{" "}
          Cinquante minutes, <em className="text-[var(--accent-texte)]">rien à prouver.</em>
        </p>
        <p className="mx-auto max-w-xl text-lg leading-relaxed text-[var(--doux)]">
          Vous n&apos;avez pas à aller assez mal pour venir, ni assez bien pour repartir. Une
          thérapie ne se promet pas ; une séance, si : elle dure cinquante minutes.
        </p>
      </section>

      {/* 5. La porte ouverte. */}
      <section className="px-3 sm:px-6">
        <div className="max-w-6xl mx-auto overflow-hidden rounded-[30px] bg-[#3B2440] text-[var(--sur-sombre)] grid lg:grid-cols-2">
          <div className="relative min-h-[240px]">
            <Image src={photos.entrouverte.src} alt={photos.entrouverte.alt} fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
          </div>
          <div className="px-6 py-12 sm:px-10 space-y-6">
            <Surtitre clair>Pour l&apos;ouverture</Surtitre>
            <h2 className="text-[38px] sm:text-5xl">Porte ouverte. <em className="text-[#C9A27E]">On ne vous demandera rien.</em></h2>
            <p className="font-[family-name:var(--titres)] text-2xl [font-variant-numeric:lining-nums]">{porteOuverte.date} · {porteOuverte.heures}</p>
            <ul className="space-y-2 text-[#E6D3BF]">
              {porteOuverte.regles.slice(0, 2).map((r) => <li key={r}>— {r}</li>)}
            </ul>
            <Link href={`${DOSSIER}/porte-ouverte`} className="inline-flex items-center min-h-12 rounded-full border border-[#C9A27E] px-6 text-[15px]">
              Tout savoir sur la soirée
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Le prix. */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-28 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div className="relative mx-auto h-[360px] w-full max-w-[300px] overflow-hidden rounded-[200px] bg-white">
          <Image src={photos.sablier.src} alt={photos.sablier.alt} fill sizes="300px" className="object-cover" />
        </div>
        <div className="space-y-6">
          <Surtitre>La séance</Surtitre>
          <p className="font-[family-name:var(--titres)] text-[72px] leading-none [font-variant-numeric:lining-nums]">{cabinet.seance.prix}</p>
          <p className="text-xl">pour {cabinet.seance.duree}, pas une de moins.</p>
          <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            <li className="flex justify-between gap-4 py-3"><span className="text-[var(--doux)]">Paiement</span><span>carte bancaire, espèces, chèque</span></li>
            <li className="flex justify-between gap-4 py-3"><span className="text-[var(--doux)]">Facture</span><span>à chaque séance</span></li>
            <li className="flex justify-between gap-4 py-3"><span className="text-[var(--doux)]">Annulation</span><span>jusqu&apos;à 24 h avant</span></li>
          </ul>
          <p className="text-sm text-[var(--doux)]">Prix d&apos;exemple, le cabinet est fictif.</p>
        </div>
      </section>

      {/* 7. La psychologue. */}
      <section className="bg-[var(--carte)] border-y border-[var(--trait)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-20 grid gap-8 lg:grid-cols-2 lg:items-end">
          <div className="space-y-5">
            <Surtitre>La psychologue</Surtitre>
            <h2 className="text-[40px] sm:text-6xl">{cabinet.psychologue}</h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              Psychologue, titulaire d&apos;un {cabinet.diplome.replace(" — exemple", "")} (exemple).
              Enregistrée auprès de l&apos;agence régionale de santé : n° ADELI {cabinet.adeli} (exemple).
            </p>
          </div>
          <p className="font-[family-name:var(--titres)] text-2xl italic leading-snug">
            « Je ne vous dirai pas ce que vous allez ressentir. Je vous dirai comment se passent
            les cinquante minutes. »
          </p>
        </div>
      </section>

      {/* 8. Rendez-vous. */}
      <section id="rendez-vous" className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-28 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] scroll-mt-20">
        <div className="space-y-6">
          <Surtitre>Rendez-vous</Surtitre>
          <h2 className="text-[40px] sm:text-6xl">Choisissez <em>l&apos;heure.</em></h2>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Le site ne vous demande pas pourquoi vous venez. Ou par téléphone :{" "}
            <span className="whitespace-nowrap tabular-nums">{cabinet.telephone}</span>.
          </p>
        </div>
        <Creneaux
          creneaux={creneaux}
          colonnes={3}
          titreCarte="Votre première séance"
          bouton="Réserver ces cinquante minutes"
          confirmation="Réservé : {creneau} · à bientôt"
          note="Créneaux d'exemple. Sur un vrai site, ils suivent l'agenda réel du cabinet."
        />
      </section>

      {/* 9. Questions. */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 pb-20 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-6">
          <Surtitre>Questions</Surtitre>
          <h2 className="text-[40px] sm:text-6xl">Avant <em>la porte.</em></h2>
        </div>
        <div className="border-t border-[var(--trait)]">
          {questions.map((q) => (
            <details key={q.q} className="group border-b border-[var(--trait)]">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 font-[family-name:var(--titres)] text-xl [&::-webkit-details-marker]:hidden">
                {q.q}
                <span aria-hidden="true" className="text-2xl leading-none text-[var(--accent-texte)] transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="pb-6 pr-8 leading-relaxed text-[var(--doux)]">{q.r}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 10. Le dernier mot. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 py-20 text-center space-y-7">
          <p className="font-[family-name:var(--titres)] text-[40px] sm:text-6xl leading-[1.08]">
            La porte, <em className="text-[#C9A27E]">moins lourde.</em>
          </p>
          <BoutonRdv clair />
        </div>
      </section>
    </main>
  );
}
