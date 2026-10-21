import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import BoitePourquoi from "./_composants/BoitePourquoi";
import SeancePourquoi from "./_composants/SeancePourquoi";
import { AppelFinal, Arche, Surtitre } from "./_composants/Blocs";
import { DOSSIER, cabinet, faq, gestes, photos, questionsHebdo } from "./_composants/donnees";

// Le site de la marque imaginée dans la vidéo « Si je devais créer un cabinet
// d'ostéopathie de zéro » : un cabinet qui promet de tout expliquer. Chaque geste a
// sa page — ce que je fais, pourquoi, et ce que ça ne promet pas. Premier écran
// inspiré du modèle « Breathstone » de MotionSites (un mot immense, un objet posé
// devant, une pastille de navigation), transposé au cabinet.
export const metadata: Metadata = {
  title: "Le Pourquoi — site de démonstration",
  description:
    "Site de démonstration d'un cabinet d'ostéopathie imaginaire, réalisé par Canevas Havane : chaque geste a sa page — ce que je fais, pourquoi, et ce que ça ne promet pas.",
  ...adressesDeLaPage("/exemples/le-pourquoi"),
};

export default function LePourquoi() {
  return (
    <main>
      {/* 1. Un mot immense, et la colonne posée devant. */}
      <section className="relative overflow-hidden pt-6 sm:pt-10">
        <h1 className="text-center">
          <span className="block font-[family-name:var(--titres)] text-[clamp(78px,23vw,280px)] font-bold leading-[0.82] tracking-[-0.06em]">
            Pourquoi&nbsp;?
          </span>
          <span className="sr-only">Le Pourquoi, l&apos;ostéopathie expliquée.</span>
        </h1>
        <div className="relative max-w-6xl mx-auto px-5 sm:px-6">
          <Arche photo={photos.colonne} priority sizes="(min-width: 640px) 420px, 70vw" className="relative z-10 mx-auto -mt-[3.5vw] sm:-mt-12 w-[70%] max-w-[420px] aspect-[3/4]" />
          <div className="mt-6 grid gap-6 sm:absolute sm:inset-x-6 sm:top-1/3 sm:mt-0 sm:grid-cols-2 sm:pointer-events-none">
            <p className="font-[family-name:var(--titres)] text-[26px] font-medium leading-tight tracking-[-0.02em] sm:max-w-[240px]">
              L&apos;ostéopathie, <span className="text-[var(--accent-texte)]">expliquée.</span>
            </p>
            <p className="text-lg leading-relaxed text-[var(--doux)] sm:ml-auto sm:max-w-[260px] sm:text-right">
              Chaque geste a sa page : ce que je fais, pourquoi, et ce que ça ne promet pas.
            </p>
          </div>
          <div className="mt-8 pb-14 flex flex-col sm:flex-row sm:justify-center gap-3">
            <Link href={`${DOSSIER}#gestes`} className="inline-flex items-center justify-center min-h-14 rounded-full bg-[var(--encre)] text-[var(--fond)] px-8 font-[family-name:var(--titres)] text-lg font-medium">
              Lire les gestes
            </Link>
            <Link href={`${DOSSIER}/rendez-vous`} className="inline-flex items-center justify-center min-h-14 rounded-full border border-[var(--encre)] px-8 font-[family-name:var(--titres)] text-lg font-medium">
              Prendre rendez-vous
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Le contre-pied : pas de promesse, une explication. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-28 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="space-y-6">
            <Surtitre clair>Notre seule promesse</Surtitre>
            <h2 className="text-[42px] sm:text-6xl font-semibold tracking-[-0.04em]">
              Pas de guérison promise. <span className="text-[#F0A07A]">Une explication, à chaque geste.</span>
            </h2>
          </div>
          <div className="space-y-4 text-lg leading-relaxed text-[#D8E2DB]">
            <p>
              Promettre de guérir, quand c&apos;est faux, c&apos;est une pratique commerciale
              trompeuse. Ici, on promet autre chose : que vous ne repartirez jamais sans savoir
              ce qu&apos;on vous a fait, ni pourquoi.
            </p>
            <p className="text-sm text-[#B9CBBF]">Code de la consommation, art. L121-4, 16°</p>
          </div>
        </div>
      </section>

      {/* 3. Les gestes, une page chacun. */}
      <section id="gestes" className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-28 space-y-12 scroll-mt-20">
        <div className="space-y-5 max-w-2xl">
          <Surtitre>Les gestes</Surtitre>
          <h2 className="text-[42px] sm:text-6xl font-semibold tracking-[-0.04em]">
            Chaque geste a <span className="text-[var(--accent-texte)]">sa page.</span>
          </h2>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Trois questions, toujours les mêmes, à chaque page. Les réponses sont écrites
            par l&apos;ostéopathe, pas par un robot.
          </p>
        </div>
        <ul className="grid gap-5 md:grid-cols-3" data-film="gestes">
          {gestes.map((g) => (
            <li key={g.slug}>
              <Link href={`${DOSSIER}/gestes/${g.slug}`} data-geste={g.slug} className="group block h-full rounded-[28px] bg-[var(--carte)] border border-[var(--trait)] overflow-hidden">
                <div className="relative aspect-[16/10] bg-[#DCCFBC]">
                  <Image src={photos[g.photo].src} alt={photos[g.photo].alt} fill sizes="(min-width: 768px) 360px, 100vw" className="object-cover" />
                  <span className="absolute left-4 top-4 rounded-full bg-[var(--fond)] px-3 py-1 font-[family-name:var(--titres)] text-sm font-semibold">Geste n° {g.numero}</span>
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-semibold tracking-[-0.02em] group-hover:underline underline-offset-4">{g.question}</h3>
                  <ul className="flex flex-wrap gap-2 font-[family-name:var(--titres)] text-sm">
                    {["Ce que je fais", "Pourquoi", "Ce que ça ne promet pas"].map((t) => (
                      <li key={t} className="rounded-full border border-[var(--trait)] px-3 py-1">{t}</li>
                    ))}
                  </ul>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 4. Ce que les gens tapent, et la boîte qui y répond. */}
      <section className="bg-[#E9DFCD]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-28 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <Surtitre>Vous la tapez</Surtitre>
            <h2 className="text-[42px] sm:text-6xl font-semibold tracking-[-0.04em]">
              La question qu&apos;on n&apos;ose pas poser, <span className="text-[var(--accent-texte)]">allongé sur la table.</span>
            </h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              « Pourquoi l&apos;ostéopathe fait craquer », « pourquoi il appuie sur le ventre » :
              c&apos;est ce que Google suggère quand on commence à taper. Ici, chaque question a
              une réponse, signée.
            </p>
          </div>
          <BoitePourquoi />
        </div>
      </section>

      {/* 5. La séance, avec un « Pourquoi ? » à chaque étape. */}
      <section id="seance" className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-28 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] scroll-mt-20">
        <div className="space-y-6">
          <Surtitre>La séance</Surtitre>
          <h2 className="text-[42px] sm:text-6xl font-semibold tracking-[-0.04em]">
            Un bouton <span className="text-[var(--accent-texte)]">« Pourquoi ? »</span> à chaque étape.
          </h2>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Touchez-le. Au cabinet, c&apos;est pareil : vous pouvez demander pourquoi à tout moment.
          </p>
        </div>
        <SeancePourquoi />
      </section>

      {/* 6. L'affiche du lancement. */}
      <section className="px-3 sm:px-6">
        <div className="max-w-6xl mx-auto rounded-[36px] bg-[var(--sombre)] text-[var(--sur-sombre)] px-6 py-16 sm:px-14 sm:py-24 grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <p className="font-[family-name:var(--titres)] text-[46px] sm:text-7xl font-semibold leading-[1.0] tracking-[-0.045em]">
            Vous avez le droit de demander <span className="text-[#F0A07A]">pourquoi.</span>
          </p>
          <div className="space-y-3 text-[#D8E2DB]">
            <p className="font-[family-name:var(--titres)] text-lg font-semibold text-[var(--sur-sombre)]">Le Pourquoi · {cabinet.praticienne}, ostéopathe D.O.</p>
            <p>L&apos;affiche de l&apos;ouverture, une seule phrase. Sur la porte du cabinet aussi.</p>
          </div>
        </div>
      </section>

      {/* 7. Une question de patient par semaine. */}
      <section id="questions" className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-28 space-y-12 scroll-mt-20">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <div className="space-y-5">
            <Surtitre>Vos questions</Surtitre>
            <h2 className="text-[42px] sm:text-6xl font-semibold tracking-[-0.04em]">
              Une question par semaine. <span className="text-[var(--accent-texte)]">Une minute de réponse.</span>
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Les questions viennent des patients. Les réponses sont filmées au cabinet, sans
            jamais montrer de patient. Calendrier d&apos;exemple, à partir du lancement.
          </p>
        </div>
        <ol className="grid gap-px overflow-hidden rounded-[28px] border border-[var(--trait)] bg-[var(--trait)] sm:grid-cols-2 lg:grid-cols-3">
          {questionsHebdo.map((q) => (
            <li key={q.n} className="bg-[var(--carte)] p-6 space-y-4">
              <div className="flex items-center justify-between font-[family-name:var(--titres)] text-sm">
                <span className="font-semibold text-[var(--accent-texte)]">Question n° {q.n}</span>
                <span className="text-[var(--doux)]">{q.date}</span>
              </div>
              <p className="font-[family-name:var(--titres)] text-xl font-medium leading-snug">{q.q}</p>
              <p className="flex items-center gap-2 text-sm text-[var(--doux)]">
                <span aria-hidden="true" className="grid h-7 w-7 place-items-center rounded-full bg-[var(--encre)] text-[10px] text-[var(--fond)]">▶</span>
                Réponse filmée · 1 min
                {q.geste && (
                  <Link href={`${DOSSIER}/gestes/${q.geste}`} className="ml-auto font-semibold text-[var(--encre)] underline underline-offset-4">Lire</Link>
                )}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* 8. La praticienne. */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 pb-20 sm:pb-28 grid gap-10 lg:grid-cols-2 lg:items-center">
        <Arche photo={photos.epaule} sizes="(min-width: 1024px) 520px, 100vw" className="aspect-[4/5] max-h-[560px]" />
        <div className="space-y-6">
          <Surtitre>La praticienne</Surtitre>
          <h2 className="text-[42px] sm:text-6xl font-semibold tracking-[-0.04em]">
            {cabinet.praticienne} <span className="block text-[var(--accent-texte)]">Ostéopathe D.O.</span>
          </h2>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Le nom du cabinet est une question ; le titre, lui, est écrit en entier, sur la
            plaque comme ici. Un ostéopathe indique son diplôme sur sa plaque et sur tout
            document (décret n° 2007-435, art. 14).
          </p>
          <dl className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            <div className="py-3.5 space-y-0.5"><dt className="font-[family-name:var(--titres)] text-sm text-[var(--doux)]">Diplôme</dt><dd className="text-lg">{cabinet.diplome}</dd></div>
            <div className="py-3.5 space-y-0.5"><dt className="font-[family-name:var(--titres)] text-sm text-[var(--doux)]">N° ADELI</dt><dd className="text-lg tabular-nums">{cabinet.adeli} (exemple)</dd></div>
          </dl>
        </div>
      </section>

      {/* 9. Le prix et le cabinet. */}
      <section className="bg-[var(--carte)] border-y border-[var(--trait)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-16 grid gap-8 sm:grid-cols-3">
          <div className="space-y-1">
            <p className="font-[family-name:var(--titres)] text-sm text-[var(--doux)]">Une séance</p>
            <p className="font-[family-name:var(--titres)] text-5xl font-semibold tracking-[-0.04em] tabular-nums">{cabinet.prix}</p>
            <p className="text-[var(--doux)]">{cabinet.duree} · prix d&apos;exemple, facture remise</p>
          </div>
          <div className="space-y-1">
            <p className="font-[family-name:var(--titres)] text-sm text-[var(--doux)]">Le cabinet</p>
            <p className="text-xl">{cabinet.adresse}, {cabinet.ville}</p>
            <p className="text-[var(--doux)]">Adresse d&apos;exemple, rez-de-chaussée</p>
          </div>
          <div className="space-y-1">
            <p className="font-[family-name:var(--titres)] text-sm text-[var(--doux)]">Horaires</p>
            <p className="text-xl">{cabinet.horaires}</p>
          </div>
        </div>
      </section>

      {/* 10. Questions fréquentes. */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-28 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-5">
          <Surtitre>Avant de venir</Surtitre>
          <h2 className="text-[42px] sm:text-6xl font-semibold tracking-[-0.04em]">Et aussi.</h2>
        </div>
        <div className="border-t border-[var(--trait)]">
          {faq.map((f) => (
            <details key={f.q} className="group border-b border-[var(--trait)]">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 font-[family-name:var(--titres)] text-xl font-medium [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden="true" className="text-2xl leading-none text-[var(--accent-texte)] transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="pb-6 pr-8 text-lg leading-relaxed text-[var(--doux)]">{f.r}</p>
            </details>
          ))}
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
