import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, ETAPES, GATEAUX, QUESTIONS, boutique, euros } from "./_composants/donnees";
import Invites from "./_composants/Invites";
import Samedi from "./_composants/Samedi";
import Rappel from "./_composants/Rappel";
import { Faq, Pastille } from "./_composants/Blocs";

// L'accueil : une seule question, « vous serez combien ? », sous un ciel d'été. Puis
// la seconde avant les bougies, les gâteaux et leurs allergènes, le samedi plafonné à
// ce que le labo sort, la question posée à la livraison, la méthode, les questions.
export const metadata: Metadata = {
  title: "Avant les Bougies — site de démonstration",
  description: "Site de démonstration d'une pâtisserie imaginaire, réalisé par Canevas Havane : vous serez combien ? Les gâteaux pour vingt, leur prix et leurs allergènes.",
  ...adressesDeLaPage("/exemples/avant-les-bougies"),
};

export default function AvantLesBougies() {
  return (
    <main className="-mt-[68px]">
      <section id="invites" className="relative overflow-hidden bg-[#BFE3F2] pt-[92px]">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(38%_14%_at_18%_30%,#fff_0_55%,transparent_60%),radial-gradient(30%_10%_at_80%_18%,#fff_0_55%,transparent_60%),radial-gradient(45%_14%_at_75%_62%,rgba(255,255,255,0.9)_0_55%,transparent_60%),radial-gradient(35%_12%_at_10%_80%,rgba(255,255,255,0.8)_0_55%,transparent_60%)]" />
        <div className="relative mx-auto grid max-w-6xl gap-8 px-4 pb-16 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:items-center [&>*]:min-w-0">
          <div className="space-y-5">
            <Pastille>Commander un gâteau</Pastille>
            <h1 className="font-extrabold uppercase leading-[0.86] tracking-[-0.03em] text-[50px] min-[400px]:text-[56px] sm:text-[96px]">
              Vous serez <span className="text-[var(--accent-texte)]">combien&nbsp;?</span>
            </h1>
            <p className="max-w-md text-lg font-medium">Un nombre. Le site vous montre les gâteaux qui conviennent, avec leur prix et leurs allergènes.</p>
          </div>
          <Invites />
        </div>
      </section>

      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-2 md:items-center">
          <div className="relative mx-auto aspect-[2/3] w-full max-w-sm overflow-hidden rounded-[999px]">
            <Image src="/exemples/avant-les-bougies/bougies.webp" alt="Un gâteau au chocolat, ses bougies allumées, dans le noir" width={900} height={1352} sizes="(min-width: 768px) 380px, 90vw" className="h-full w-full object-cover" />
          </div>
          <div className="space-y-6">
            <h2 className="text-5xl font-extrabold uppercase leading-[0.92] tracking-[-0.02em] sm:text-7xl">
              Pas un gâteau. <span className="text-[#FFB8C4]">La seconde avant les bougies.</span>
            </h2>
            <p className="text-lg leading-relaxed">
              Tout le monde chante faux, quelqu&apos;un éteint la lumière, et pendant une seconde
              personne ne parle. C&apos;est ça qu&apos;on fait. Le gâteau, c&apos;est juste ce qui est
              sous les bougies.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-10 px-4 py-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-4">
            <Pastille>Les gâteaux</Pastille>
            <h2 className="text-5xl font-extrabold uppercase leading-[0.92] tracking-[-0.02em] sm:text-6xl">Trois gâteaux, <span className="text-[var(--accent-texte)]">bien faits.</span></h2>
          </div>
          <Link href={`${DOSSIER}/gateaux`} className="rounded-full border-2 border-[var(--encre)] px-5 py-2.5 font-bold">Fiches et allergènes</Link>
        </div>
        <ul className="grid gap-6 md:grid-cols-3">
          {GATEAUX.map((g) => (
            <li key={g.id} className="overflow-hidden rounded-[28px] border-2 border-[var(--encre)] bg-[var(--carte)]">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={g.photo.src} alt={g.photo.alt} width={g.photo.largeur} height={g.photo.hauteur} sizes="(min-width: 768px) 360px, 100vw" className="h-full w-full object-cover" />
              </div>
              <div className="space-y-2 p-5">
                <p className="flex items-baseline justify-between gap-3">
                  <span className="font-[family-name:var(--titres)] text-3xl font-extrabold">{g.nom}</span>
                  <span className="text-sm font-bold tabular-nums">{euros(g.parPart)} la part</span>
                </p>
                <p className="text-[var(--doux)]">{g.recette}</p>
                <p className="text-sm"><strong>Allergènes :</strong> {g.allergenes.join(", ").toLowerCase()}.</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="text-xs text-[var(--doux)]">Prix TTC d&apos;exemple. Les 14 allergènes, gâteau par gâteau, sur la page des fiches.</p>
      </section>

      <section id="samedi" className="scroll-mt-20 bg-[#FFD9DF]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-2 md:items-center">
          <div className="space-y-5">
            <Pastille>Le samedi</Pastille>
            <h2 className="text-5xl font-extrabold uppercase leading-[0.92] tracking-[-0.02em] sm:text-6xl">
              Douze gâteaux. <span className="text-[var(--accent-texte)]">Pas un de plus.</span>
            </h2>
            <p className="text-lg leading-relaxed">
              Le samedi se commande en ligne. Le labo sort douze gâteaux ce jour-là : le site
              en vend douze. Plus de téléphone qui sonne à midi, les mains dans la crème.
            </p>
          </div>
          <div className="rounded-[32px] border-2 border-[var(--encre)] bg-[var(--carte)] p-5 sm:p-7">
            <Samedi />
          </div>
        </div>
      </section>

      <section id="rappel" className="scroll-mt-20 bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-2 md:items-center">
          <div className="space-y-5">
            <p className="inline-block rounded-full border-2 border-[var(--sur-sombre)] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em]">À la livraison</p>
            <h2 className="text-5xl font-extrabold uppercase leading-[0.92] tracking-[-0.02em] sm:text-6xl">
              Le gâteau de l&apos;an prochain <span className="text-[#FFB8C4]">se vend aujourd&apos;hui.</span>
            </h2>
            <p className="text-lg leading-relaxed">
              À la livraison, une seule question. Si la réponse est oui, onze mois plus tard,
              un message : « Léo a bientôt 7 ans. On refait le fraisier ? » Si c&apos;est non, rien.
            </p>
          </div>
          <Rappel />
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-10 px-4 py-20 sm:px-6">
        <Pastille>Comment ça marche</Pastille>
        <ol className="grid gap-4 md:grid-cols-4">
          {ETAPES.map((e, i) => (
            <li key={e.titre} className="space-y-3 rounded-[28px] border-2 border-[var(--encre)] bg-[var(--carte)] p-6">
              <p className="grid h-12 w-12 place-items-center rounded-full bg-[var(--accent)] font-[family-name:var(--titres)] text-2xl font-extrabold text-[var(--sur-accent)]">{i + 1}</p>
              <h3 className="text-2xl font-extrabold">{e.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="questions" className="scroll-mt-20 border-t-2 border-[var(--encre)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-4">
            <Pastille>Questions</Pastille>
            <h2 className="text-5xl font-extrabold uppercase leading-[0.92] tracking-[-0.02em]">Avant de <span className="text-[var(--accent-texte)]">commander.</span></h2>
          </div>
          <Faq questions={QUESTIONS} />
        </div>
      </section>

      <section className="bg-[#BFE3F2]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em]">Téléphone</p>
            <a href={`tel:${boutique.telephoneLien}`} className="font-[family-name:var(--titres)] text-4xl font-extrabold tabular-nums">{boutique.telephone}</a>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em]">Adresse</p>
            <p className="text-lg leading-relaxed">{boutique.adresse.map((l) => <span key={l} className="block">{l}</span>)}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em]">Horaires</p>
            <p className="text-lg">{boutique.horaires}</p>
          </div>
          <p className="text-xs md:col-span-3">
            Numéro de la tranche que l&apos;ARCEP réserve à la fiction, adresse inventée : la pâtisserie n&apos;existe pas.{" "}
            <Link href={`${DOSSIER}/mentions-legales`} className="underline underline-offset-4">Mentions légales et crédits</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
