import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, ETAPES, FAQ, KITS, euros, photos } from "./_composants/donnees";
import MonAlarme from "./_composants/MonAlarme";
import Paysage from "./_composants/Paysage";
import Faq from "./_composants/Faq";

// Le site de la marque imaginée dans la vidéo « Si je devais créer une entreprise
// d'alarmes » : toutes les alarmes vendent la peur, celle-ci vend le calme. Mise en page
// inspirée du modèle « Northstar » de MotionSites — un grand paysage calme, un titre
// court —, transposée à une marque d'alarmes. Sans télésurveillance, et le site le dit.
export const metadata: Metadata = {
  title: "Rien à Signaler — site de démonstration",
  description: "Site de démonstration d'une marque d'alarmes imaginaire, réalisé par Canevas Havane : la première question est « T'as un chat ? », et chaque dimanche un seul message. Sans télésurveillance.",
  ...adressesDeLaPage("/exemples/rien-a-signaler"),
};

export default function RienASignaler() {
  return (
    <div>
      {/* 1. L'ouverture : un titre court, un paysage calme. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-14 space-y-8">
        <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-texte)]">Alarmes · sans télésurveillance</p>
            <h1 className="text-[3.1rem] sm:text-8xl font-bold tracking-[-0.045em] leading-[0.95]">
              Fermer la porte. <span className="text-[var(--accent-texte)]">N&apos;y plus penser.</span>
            </h1>
          </div>
          <div className="space-y-4">
            <p className="text-xl leading-relaxed">
              Une alarme posée chez toi, pilotée par ton téléphone. Et chaque dimanche, un seul
              message : rien à signaler.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="#premiere-question" className="rounded-full bg-[var(--encre)] text-[var(--fond)] px-7 py-3.5 text-lg font-semibold">La première question</Link>
              <Link href={`${DOSSIER}/le-dimanche`} className="rounded-full border-2 border-[var(--encre)] px-6 py-3 text-lg font-semibold">Le dimanche</Link>
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-[28px]">
          <Paysage className="block w-full h-auto" />
        </div>
      </section>

      {/* 2. La première question. */}
      <section id="premiere-question" className="scroll-mt-20 border-y border-[var(--trait)] bg-[#E8DFCC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-texte)]">La première question</p>
            <h2 className="text-5xl sm:text-6xl font-bold tracking-[-0.04em]">Pas « maison ou appartement ». <span className="text-[var(--accent-texte)]">T&apos;as un chat&nbsp;?</span></h2>
            <p className="text-xl leading-relaxed">
              Parce que la vraie peur, c&apos;est la sirène à trois heures du matin. À cause du chat. Alors
              on commence par lui.
            </p>
          </div>
          <MonAlarme />
        </div>
      </section>

      {/* 3. Ce que vous tapez. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid gap-10 md:grid-cols-[1fr_1fr] md:items-center">
        <div className="relative aspect-[4/5] rounded-[28px] overflow-hidden bg-[var(--sombre)]">
          <Image src={photos.chat.src} alt={photos.chat.alt} fill sizes="(min-width: 768px) 540px, 100vw" className="object-cover" />
        </div>
        <div className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-texte)]">Ce que vous tapez</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.04em]">« Alarme maison avec chat ».</h2>
          <p className="text-xl leading-relaxed">
            Un détecteur dit « animaux » ignore un animal qui se déplace au sol, sous un certain poids.
            Il a ses limites : un chat qui grimpe peut encore le déclencher. Alors on choisit le
            matériel, on le place et on le règle selon ton chat — et on te dit où sont les limites.
          </p>
          <p className="text-lg text-[var(--doux)]">Pas de promesse qu&apos;il ne sonnera jamais. La promesse qu&apos;on aura tout fait pour.</p>
        </div>
      </section>

      {/* 4. Le message du dimanche. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 grid gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">Chaque dimanche, 9 h</p>
            <h2 className="text-5xl sm:text-6xl font-bold tracking-[-0.04em]">Un seul message. <span className="text-[var(--accent)]">Rien à signaler.</span></h2>
            <p className="text-xl leading-relaxed text-[#B7C3DE]">
              Un rapport automatique de ton alarme : ce que la centrale a enregistré dans la semaine.
              Personne ne l&apos;écrit, personne ne regarde chez toi. Sans télésurveillance.
            </p>
            <Link href={`${DOSSIER}/le-dimanche`} className="inline-flex rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-7 py-3.5 text-lg font-semibold">Voir le message</Link>
          </div>
          <div className="rounded-[24px] bg-[var(--fond)] text-[var(--encre)] p-5 space-y-1 max-w-sm md:ml-auto">
            <p className="flex items-center gap-2 text-sm">
              <span aria-hidden="true" className="grid place-items-center w-6 h-6 rounded-md bg-[var(--accent)] text-[var(--sur-accent)] text-xs font-bold">✓</span>
              <span className="font-semibold">Rien à Signaler</span>
              <span className="ml-auto text-xs text-[var(--doux)]">dimanche, 9:00</span>
            </p>
            <p className="font-[family-name:var(--titres)] text-xl font-bold">Cette semaine : rien à signaler.</p>
            <p>0 alerte · 0 fausse alerte. Bon dimanche.</p>
            <p className="pt-1 text-xs text-[var(--doux)]">Rapport automatique de ton alarme · sans télésurveillance</p>
          </div>
        </div>
      </section>

      {/* 5. Ce qu'on fait, ce qu'on ne fait pas. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 grid gap-4 md:grid-cols-2">
        <div className="rounded-[26px] bg-[var(--carte)] border border-[var(--trait)] p-7 space-y-3">
          <h2 className="text-3xl font-bold tracking-[-0.03em]">Ce qu&apos;on fait</h2>
          <ul className="space-y-2 text-lg">
            {["On pose l'alarme et on la règle avec toi", "On choisit les détecteurs selon ton animal", "On installe l'application sur ton téléphone", "On revient régler, si besoin"].map((x) => (
              <li key={x} className="flex gap-3"><span aria-hidden="true" className="text-[var(--accent-texte)] font-bold">✓</span>{x}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-[26px] border-2 border-[var(--encre)] p-7 space-y-3">
          <h2 className="text-3xl font-bold tracking-[-0.03em]">Ce qu&apos;on ne fait pas</h2>
          <ul className="space-y-2 text-lg">
            <li className="flex gap-3"><span aria-hidden="true" className="font-bold">—</span><span><strong>Pas de télésurveillance</strong> : aucune personne ne reçoit tes alertes à ta place. Elles arrivent sur ton téléphone.</span></li>
            <li className="flex gap-3"><span aria-hidden="true" className="font-bold">—</span>Pas de chiffres de cambriolages pour te faire peur.</li>
            <li className="flex gap-3"><span aria-hidden="true" className="font-bold">—</span>Pas de démarchage : tu viens par le site.</li>
          </ul>
        </div>
      </section>

      {/* 6. L'affiche du lancement. */}
      <section className="px-4 sm:px-6 pb-20">
        <div className="max-w-6xl mx-auto rounded-[30px] bg-[var(--sombre)] text-[var(--sur-sombre)] px-6 py-16 sm:p-20">
          <p className="font-[family-name:var(--titres)] text-5xl sm:text-8xl font-bold tracking-[-0.045em] leading-[0.95] max-w-4xl">
            Il ne s&apos;est rien passé chez vous. <span className="text-[var(--accent)]">Encore.</span>
          </p>
          <p className="mt-8 text-sm uppercase tracking-[0.22em] text-[#C9A227]">Rien à Signaler · alarmes</p>
        </div>
      </section>

      {/* 7. Comment ça se passe. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20 space-y-8">
        <h2 className="text-5xl font-bold tracking-[-0.04em]">Trois étapes, puis plus rien.</h2>
        <ol className="grid gap-3 md:grid-cols-3">
          {ETAPES.map((e, i) => (
            <li key={e.titre} className="rounded-[24px] bg-[var(--carte)] border border-[var(--trait)] p-6 space-y-3">
              <span className="grid place-items-center w-10 h-10 rounded-full bg-[var(--encre)] text-[var(--fond)] font-bold">{i + 1}</span>
              <h3 className="text-2xl font-bold tracking-[-0.02em]">{e.titre}</h3>
              <p className="text-lg leading-relaxed">{e.texte}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 8. Le prix. */}
      <section className="border-y border-[var(--trait)] bg-[#E8DFCC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid gap-8 md:grid-cols-[1fr_1fr] md:items-center">
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.04em]">Un prix, sans abonnement.</h2>
            <p className="text-lg leading-relaxed">
              Le kit, posé et réglé. L&apos;application et le rapport du dimanche sont compris. Prix TTC, pose
              comprise, exemples.
            </p>
            <Link href={`${DOSSIER}/mon-alarme`} className="inline-flex rounded-full bg-[var(--encre)] text-[var(--fond)] px-7 py-3.5 text-lg font-semibold">Composer mon alarme</Link>
          </div>
          <ul className="grid grid-cols-2 gap-3">
            {Object.values(KITS).map((k) => (
              <li key={k.nom} className="rounded-[22px] bg-[var(--carte)] border border-[var(--trait)] p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--doux)]">{k.nom}</p>
                <p className="font-[family-name:var(--titres)] text-4xl font-bold tabular-nums">{euros(k.prix)}</p>
                <p className="text-sm">TTC, pose comprise · exemple</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 9. Questions. */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-20 space-y-8">
        <h2 className="text-5xl font-bold tracking-[-0.04em] text-center">Questions.</h2>
        <Faq questions={FAQ} />
      </section>

      {/* 10. Le dernier mot. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20 grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
        <div className="relative aspect-[4/3] md:aspect-auto rounded-[28px] overflow-hidden bg-[var(--sombre)] min-h-[260px]">
          <Image src={photos.cafe.src} alt={photos.cafe.alt} fill sizes="(min-width: 768px) 660px, 100vw" className="object-cover" />
        </div>
        <div className="rounded-[28px] bg-[var(--accent)] text-[var(--sur-accent)] p-8 flex flex-col justify-between gap-6">
          <p className="font-[family-name:var(--titres)] text-4xl font-bold tracking-[-0.04em] leading-tight">Un dimanche bien tranquille.</p>
          <Link href="#premiere-question" className="inline-flex justify-center rounded-full bg-[var(--encre)] text-[var(--fond)] px-6 py-3.5 text-lg font-semibold">Commencer par ton chat</Link>
        </div>
      </section>
    </div>
  );
}
