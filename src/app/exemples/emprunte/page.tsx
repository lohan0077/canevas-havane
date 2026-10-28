import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, PRIX, couleurs, euros, marque, photos, questions } from "./_composants/donnees";
import { Pull } from "./_composants/Dessins";
import Etiquette from "./_composants/Etiquette";
import Mur from "./_composants/Mur";

// Le site de la marque imaginée dans la vidéo « Si je devais créer une marque de pulls » :
// on ne vend pas un pull, on vend celui qu'on va t'emprunter, et jamais te rendre. Un
// bouton « Ajouter sa taille », une étiquette « À rendre à » brodée, le mur des voleurs.
// Ouverture inspirée du modèle « Playful Idea » de MotionSites (l'objet en maille au
// centre, deux colonnes de texte courtes de part et d'autre, le nom au-dessus),
// transposée à une marque de pulls.
export const metadata: Metadata = {
  title: "Emprunté — site de démonstration",
  description: "Site de démonstration d'une marque de pulls imaginaire, réalisé par Canevas Havane : le pull qu'on va t'emprunter, sa taille en option, une étiquette « À rendre à » et le mur des voleurs.",
  ...adressesDeLaPage("/exemples/emprunte"),
};

export default function Emprunte() {
  return (
    <>
      {/* 1. L'ouverture. */}
      <section className="px-4 pb-16 pt-6 sm:px-6">
        <div className="mx-auto grid max-w-6xl items-center gap-6 md:grid-cols-[1fr_1.3fr_1fr]">
          <div className="order-2 space-y-4 md:order-1">
            <p className="rounded-full bg-[var(--carte)] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] w-fit">Pull col rond · 100&nbsp;% laine</p>
            <h1 className="text-[44px] font-extrabold leading-[0.98] tracking-tight sm:text-6xl">
              Le pull qu&apos;on va <span className="text-[var(--accent-texte)]">t&apos;emprunter.</span>
            </h1>
            <p className="text-lg">Et jamais te rendre.</p>
          </div>
          <div className="relative order-1 md:order-2">
            <Image
              src={photos.enfile.src}
              width={photos.enfile.largeur}
              height={photos.enfile.hauteur}
              alt={photos.enfile.alt}
              sizes="(min-width: 768px) 460px, 100vw"
              priority
              className="aspect-[4/5] w-full rounded-[44px] object-cover"
            />
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 -rotate-3 rounded-full bg-[var(--accent)] px-5 py-2 font-[family-name:var(--f-caveat)] text-3xl whitespace-nowrap text-[var(--sur-accent)]">
              Jamais rendu.
            </span>
          </div>
          <div className="order-3 space-y-4 md:text-right">
            <p className="text-lg leading-relaxed">
              Sur le site, un bouton de plus : <strong>ajouter sa taille</strong>. Celle de la personne
              qui va te le prendre. En option.
            </p>
            <Link href={`${DOSSIER}/col-rond`} className="inline-block rounded-full bg-[var(--encre)] px-6 py-3.5 font-bold text-[var(--fond)]">
              Le pull · {euros(PRIX)} TTC
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Le constat. */}
      <section className="bg-[var(--sombre)] px-5 py-20 text-[var(--sur-sombre)] sm:px-6">
        <div className="mx-auto max-w-4xl space-y-6 text-center">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
            Tout le monde a un pull <span className="text-[#E8A07E]">qu&apos;il n&apos;a jamais rendu.</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#C9C3B6]">
            Beaucoup de marques vendent de la douceur et un mannequin qui regarde au loin. Nous, on vend
            le pull qui finit sur les épaules de quelqu&apos;un d&apos;autre. Et l&apos;histoire qu&apos;on
            raconte à table.
          </p>
        </div>
      </section>

      {/* 3. Ta taille, et la sienne. */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-6 md:grid-cols-2 md:items-center">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 rounded-[32px] bg-[var(--carte)] p-5 text-center">
            <Pull teinte="#1E2A44" className="mx-auto w-full" />
            <p className="font-bold">Ta taille : M</p>
          </div>
          <div className="mt-10 space-y-2 rounded-[32px] border-2 border-dashed border-[var(--accent-texte)] p-5 text-center">
            <Pull teinte="#1E2A44" className="mx-auto w-full opacity-80" />
            <p className="font-bold">
              + Sa taille : L <span className="block text-sm font-normal">(en option)</span>
            </p>
          </div>
        </div>
        <div className="space-y-5">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Un bouton de plus</p>
          <h2 className="text-5xl font-extrabold tracking-tight">Ta taille, et la sienne.</h2>
          <p className="text-lg leading-relaxed">
            Tu sais déjà qui va te le prendre. Ajoute sa taille : il aura le sien, et toi le tien.
            Peut-être. Le second coûte le même prix que le premier, et rien ne t&apos;oblige à le prendre.
          </p>
          <Link href={`${DOSSIER}/col-rond`} className="inline-block rounded-full bg-[var(--accent)] px-6 py-3.5 font-bold text-[var(--sur-accent)]">
            Ajouter sa taille
          </Link>
        </div>
      </section>

      {/* 4. L'étiquette. */}
      <section className="bg-[var(--carte)] px-5 py-20 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-5">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Dans chaque pull</p>
            <h2 className="text-5xl font-extrabold tracking-tight">
              Une étiquette cousue : <span className="font-[family-name:var(--f-caveat)] text-6xl font-normal text-[var(--accent-texte)]">à rendre à…</span>
            </h2>
            <p className="text-lg leading-relaxed">Et ton prénom, brodé. Comme ça, au moins, tout le monde sait à qui il est.</p>
          </div>
          <Etiquette />
        </div>
      </section>

      {/* 5. La laine. */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-6 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <Image src={photos.pile.src} width={photos.pile.largeur} height={photos.pile.hauteur} alt={photos.pile.alt} sizes="(min-width: 768px) 480px, 100vw" className="aspect-[4/5] w-full rounded-[44px] object-cover" />
        <div className="space-y-5">
          <h2 className="text-5xl font-extrabold tracking-tight">100&nbsp;% laine. Écrit avant le bouton.</h2>
          <p className="text-lg leading-relaxed">
            Une seule fibre : de la laine. La composition est sur la fiche, avant de commander, et sur
            l&apos;étiquette cousue dans le col. L&apos;étiquette « À rendre à » s&apos;ajoute à côté.
          </p>
          <dl className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {[
              ["Composition", "100 % laine"],
              ["Maille", "Jersey, côtes 2 × 2 au col et aux poignets"],
              ["Entretien", "Lavage à la main, 30 °C, séchage à plat"],
            ].map(([t, d]) => (
              <div key={t} className="flex justify-between gap-6 py-3">
                <dt className="font-bold">{t}</dt>
                <dd className="text-right text-[var(--doux)]">{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 6. Le mur des voleurs. */}
      <section className="bg-[var(--sombre)] px-5 py-20 text-[var(--sur-sombre)] sm:px-6">
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="space-y-4">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#E8A07E]">Avec l&apos;accord de chacun</p>
              <h2 className="text-5xl font-extrabold tracking-tight">Le mur des voleurs.</h2>
            </div>
            <Link href={`${DOSSIER}/mur-des-voleurs`} className="rounded-full bg-[var(--sur-sombre)] px-6 py-3.5 font-bold text-[var(--sombre)]">
              Tout le mur
            </Link>
          </div>
          <Mur limite={3} surSombre />
        </div>
      </section>

      {/* 7. Les couleurs. */}
      <section className="mx-auto max-w-6xl space-y-10 px-5 py-20 sm:px-6">
        <h2 className="text-5xl font-extrabold tracking-tight">Quatre couleurs. À toi de choisir celle qu&apos;on te prendra.</h2>
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {couleurs.map((c) => (
            <li key={c.id} className="space-y-3 rounded-[32px] bg-[var(--carte)] p-5 text-center">
              <Pull teinte={c.teinte} className="mx-auto w-full" />
              <p className="font-bold">{c.nom}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 8. L'affiche. */}
      <section className="px-5 pb-20 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
          <div className="mx-auto w-full max-w-sm -rotate-2 rounded-[8px] bg-[var(--sombre)] p-8 text-[var(--sur-sombre)] shadow-[0_30px_60px_-30px_rgba(30,42,68,0.8)]">
            <p className="text-[44px] font-extrabold leading-[1.02] tracking-tight">
              Il va te le <span className="text-[#E07A4F]">prendre.</span>
            </p>
            <p className="mt-12 text-xs font-bold uppercase tracking-[0.2em]">Emprunté · pulls</p>
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-extrabold tracking-tight">Une seule affiche pour le lancement.</h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              Pas de « douceur absolue ». Cinq mots que tout le monde a déjà vécus.
            </p>
          </div>
        </div>
      </section>

      {/* 9. Questions. */}
      <section className="bg-[var(--carte)] px-5 py-20 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <h2 className="text-5xl font-extrabold tracking-tight">Avant de te le faire prendre.</h2>
          <div className="space-y-3">
            {questions.map((x) => (
              <details key={x.q} className="group rounded-[24px] bg-[var(--fond)] px-5 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold [&::-webkit-details-marker]:hidden">
                  {x.q}
                  <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-[var(--sur-accent)] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="pt-3 leading-relaxed text-[var(--doux)]">{x.r}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Service client. */}
      <section className="mx-auto max-w-6xl px-5 py-16 text-center sm:px-6">
        <p className="font-[family-name:var(--f-caveat)] text-4xl text-[var(--accent-texte)]">Une question sur une taille ?</p>
        <a href={`tel:${marque.telephoneLien}`} className="mt-3 inline-block text-3xl font-extrabold tabular-nums underline underline-offset-8">
          {marque.telephone}
        </a>
        <p className="mt-2 text-[var(--doux)]">{marque.horaires}.</p>
      </section>
    </>
  );
}
