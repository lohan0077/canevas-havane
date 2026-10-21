import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { BUDGETS, DOSSIER, EPISODES, EQUIPE, ETAPES, FAQ, MENTIONS_TOURISME, entreprise, photos } from "./_composants/donnees";
import FermeTesOnglets from "./_composants/FermeTesOnglets";
import BarreOnglets from "./_composants/BarreOnglets";
import ProchainDimanche from "./_composants/ProchainDimanche";

// Le site imaginé dans la vidéo « Si je devais remplir l'agenda d'une agence de
// voyage » : le client prépare son voyage seul, un dimanche soir, avec quarante
// onglets ouverts. L'agence vend leur fermeture : un seul bouton, trois questions,
// trente minutes avec un conseiller. Puis une page par vraie question, avec des
// budgets détaillés ligne par ligne.
export const metadata: Metadata = {
  title: "Un Seul Onglet — site de démonstration",
  description: "Site de démonstration d'une agence de voyage imaginaire, réalisé par Canevas Havane : ferme tes quarante onglets, trois questions, trente minutes avec un conseiller.",
  ...adressesDeLaPage("/exemples/un-seul-onglet"),
};

const Surtitre = ({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) => (
  <p className={`text-sm font-bold ${clair ? "text-[#9FC3E6]" : "text-[var(--accent-texte)]"}`}>{children}</p>
);

export default function UnSeulOnglet() {
  return (
    <main>
      {/* 1. Un seul bouton */}
      <section id="questions" className="scroll-mt-14 bg-[linear-gradient(180deg,#CFE3F4_0%,#EAF3FA_70%)]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 pt-6 pb-14 sm:px-5 sm:pt-14 lg:grid-cols-[1fr_1fr] lg:gap-14">
          <div className="space-y-4 lg:pt-8">
            <Surtitre>Ton prochain voyage</Surtitre>
            <h1 className="text-[3.4rem] sm:text-7xl lg:text-8xl font-medium">
              Ferme tes <em>onglets.</em>
            </h1>
            <p className="max-w-md text-lg leading-relaxed max-lg:hidden">
              Tu prépares ton voyage seul, le dimanche soir, avec quarante onglets ouverts. Ici,
              un seul bouton : trois questions, et trente minutes avec quelqu&apos;un qui connaît
              déjà les réponses.
            </p>
          </div>
          <div className="min-w-0 lg:pt-10">
            <FermeTesOnglets />
          </div>
        </div>
      </section>

      {/* 2. Le dimanche soir */}
      <section className="mx-auto max-w-6xl space-y-10 px-5 py-16 sm:py-24">
        <div className="max-w-2xl space-y-4">
          <Surtitre>Tu connais ce dimanche soir&nbsp;?</Surtitre>
          <h2 className="text-5xl sm:text-6xl font-medium">Quarante onglets. <em>Et toujours rien de réservé.</em></h2>
        </div>
        <div className="overflow-hidden rounded-2xl shadow-[0_30px_60px_-40px_rgba(15,42,67,0.8)]">
          <BarreOnglets nombre={40} />
          <div className="grid gap-6 bg-[var(--carte)] p-6 sm:grid-cols-3 sm:p-8">
            {["Les vols, à comparer", "Les avis, à lire", "Les hôtels, à recouper"].map((t) => (
              <div key={t} className="space-y-3">
                <span aria-hidden="true" className="block h-3 w-3/4 rounded bg-[var(--trait)]" />
                <span aria-hidden="true" className="block h-3 w-1/2 rounded bg-[var(--trait)]" />
                <p className="font-semibold">{t}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="max-w-2xl text-lg leading-relaxed">
          On ne vend pas un voyage. On vend la fermeture des quarante onglets. Un conseiller les
          ouvre à ta place, avant ton rendez-vous, et t&apos;apporte un seul voyage, chiffré.
        </p>
      </section>

      {/* 3. Comment ça marche */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto max-w-6xl space-y-12 px-5 py-16 sm:py-24">
          <div className="max-w-2xl space-y-4">
            <Surtitre clair>Comment ça marche</Surtitre>
            <h2 className="text-5xl sm:text-6xl font-medium">Quatre étapes, <em>un seul onglet.</em></h2>
          </div>
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {ETAPES.map((e, i) => (
              <li key={e.titre} className="space-y-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#1B3A57] font-bold tabular-nums">{i + 1}</span>
                <h3 className="text-2xl font-medium">{e.titre}</h3>
                <p className="leading-relaxed text-[#D3E2EF]">{e.texte}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4. Une page par vraie question */}
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:py-24 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div className="space-y-6">
          <Surtitre>Une page par vraie question</Surtitre>
          <h2 className="text-5xl sm:text-6xl font-medium">« Voyage de noces, <em>prix moyen</em>&nbsp;»</h2>
          <p className="text-lg leading-relaxed">
            C&apos;est ce que les gens tapent. Alors chaque question a sa page : trois budgets,
            détaillés ligne par ligne. Les vols, les nuits, les transferts.
          </p>
          <ul className="space-y-2">
            {BUDGETS.map((b) => (
              <li key={b.slug}>
                <Link href={`${DOSSIER}/budgets/${b.slug}`} className="flex items-center justify-between gap-4 rounded-xl bg-[var(--carte)] px-4 py-4 font-semibold hover:ring-2 hover:ring-[var(--accent)]">
                  <span>{b.titre} : trois budgets</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Image src={photos.bali.src} width={photos.bali.largeur} height={photos.bali.hauteur} alt={photos.bali.alt} sizes="(min-width: 1024px) 270px, 50vw" className="row-span-2 h-full w-full rounded-2xl object-cover" />
          <Image src={photos.lisbonne.src} width={photos.lisbonne.largeur} height={photos.lisbonne.hauteur} alt={photos.lisbonne.alt} sizes="(min-width: 1024px) 270px, 50vw" className="aspect-square w-full rounded-2xl object-cover" />
          <Image src={photos.polynesie.src} width={photos.polynesie.largeur} height={photos.polynesie.hauteur} alt={photos.polynesie.alt} sizes="(min-width: 1024px) 270px, 50vw" className="aspect-square w-full rounded-2xl object-cover" />
        </div>
      </section>

      {/* 5. Dimanche 21 h */}
      <section id="dimanche" className="scroll-mt-14 bg-[var(--carte)] border-y border-[var(--trait)]">
        <div className="mx-auto max-w-6xl space-y-10 px-5 py-16 sm:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl space-y-4">
              <Surtitre>Chaque dimanche</Surtitre>
              <h2 className="text-5xl sm:text-6xl font-medium">21 h, <em>pile quand les onglets s&apos;ouvrent.</em></h2>
              <p className="text-lg leading-relaxed">Une vidéo : un voyage, son budget. Prochain épisode : <strong><ProchainDimanche /></strong>.</p>
            </div>
          </div>
          <ul className="grid gap-5 md:grid-cols-3">
            {EPISODES.map((e) => {
              const p = photos[e.photo];
              return (
                <li key={e.titre} className="space-y-3">
                  <div className="relative">
                    <Image src={p.src} width={p.largeur} height={p.hauteur} alt={p.alt} sizes="(min-width: 768px) 360px, 100vw" className="aspect-video w-full rounded-2xl object-cover" />
                    <span aria-hidden="true" className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-xl text-[var(--accent)] shadow-lg">▶</span>
                  </div>
                  <h3 className="font-[family-name:var(--texte)] text-lg font-bold">{e.titre}</h3>
                  <p className="text-[var(--doux)]">Budget pour deux : <span className="font-semibold text-[var(--encre)] tabular-nums">{e.budget}</span> · exemple</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 6. Les conseillers */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:py-24 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          <Surtitre>Qui ferme tes onglets</Surtitre>
          <h2 className="text-5xl sm:text-6xl font-medium">Trois conseillers, <em>trente minutes.</em></h2>
        </div>
        <ul className="grid gap-4 sm:grid-cols-3">
          {EQUIPE.map((p) => (
            <li key={p.prenom} className="space-y-3 rounded-2xl bg-[var(--carte)] p-5">
              <span aria-hidden="true" className="grid h-14 w-14 place-items-center rounded-full bg-[var(--fond)] text-lg font-bold text-[var(--accent)]">{p.initiales}</span>
              <h3 className="text-2xl font-medium">{p.prenom}</h3>
              <p className="text-[var(--doux)]">{p.role}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 7. Une agence qu'on peut vérifier */}
      <section className="mx-auto max-w-6xl px-5 pb-16 sm:pb-24">
        <div className="grid gap-8 rounded-3xl bg-[var(--sombre)] p-6 text-[var(--sur-sombre)] sm:p-10 md:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            <Surtitre clair>Une agence qu&apos;on peut vérifier</Surtitre>
            <h2 className="text-4xl sm:text-5xl font-medium">Immatriculée, <em>garantie, assurée.</em></h2>
            <p className="leading-relaxed text-[#D3E2EF]">
              Si l&apos;agence fait défaut, sa garantie financière sert à rembourser les sommes que tu
              as versées. Atout France publie la liste des agences immatriculées.
            </p>
          </div>
          <dl className="grid gap-4 text-sm">
            {MENTIONS_TOURISME.map((m) => (
              <div key={m.libelle} className="border-t border-[#2E4D6B] pt-3">
                <dt className="font-bold">{m.libelle}</dt>
                <dd className="text-[#D3E2EF]">{m.valeur}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 8. Questions */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 sm:pb-24 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          <Surtitre>Questions</Surtitre>
          <h2 className="text-5xl sm:text-6xl font-medium">Avant de <em>fermer.</em></h2>
        </div>
        <ul className="space-y-2">
          {FAQ.map((x) => (
            <li key={x.q}>
              <details className="group rounded-xl bg-[var(--carte)] px-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold [&::-webkit-details-marker]:hidden">
                  {x.q}
                  <span aria-hidden="true" className="text-xl text-[var(--accent)] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="pb-5 leading-relaxed text-[var(--doux)]">{x.r}</p>
              </details>
            </li>
          ))}
        </ul>
      </section>

      {/* 9. Dernier appel */}
      <section className="bg-[linear-gradient(0deg,#CFE3F4_0%,#EAF3FA_100%)]">
        <div className="mx-auto max-w-6xl space-y-6 px-5 py-16 text-center sm:py-24">
          <h2 className="text-5xl sm:text-7xl font-medium">Il te reste <em>combien d&apos;onglets&nbsp;?</em></h2>
          <p className="mx-auto max-w-xl text-lg leading-relaxed">
            Trente minutes, gratuites. À l&apos;agence ({entreprise.adresse}, {entreprise.ville}) ou en
            visio, jusqu&apos;à 21 h.
          </p>
          <Link href="#questions" className="inline-flex min-h-14 items-center justify-center rounded-xl bg-[var(--accent)] px-8 text-lg font-bold text-[var(--sur-accent)]">
            Ferme tes onglets
          </Link>
        </div>
      </section>
    </main>
  );
}
