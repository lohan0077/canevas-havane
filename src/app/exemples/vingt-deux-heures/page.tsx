import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, FAQ, JEUX, SOIREE, boutique, photos } from "./_composants/donnees";
import TroisQuestions from "./_composants/TroisQuestions";
import LigneJeu from "./_composants/LigneJeu";
import Boite from "./_composants/Boite";
import Faq from "./_composants/Faq";

// Le site de la boutique imaginée dans la vidéo « Si je devais remplir le carnet de
// commandes d'une boutique de jeux de société » : on ne vend pas des jeux, on vend le
// fou rire de vingt-deux heures. Mise en page inspirée du modèle « Atrium MTL » de
// MotionSites — titre massif, mosaïque d'aplats et de photos —, transposée aux
// couleurs d'une boîte de jeu.
export const metadata: Metadata = {
  title: "Vingt-Deux Heures — site de démonstration",
  description: "Site de démonstration d'une boutique de jeux de société imaginaire, réalisé par Canevas Havane : trois questions, trois jeux choisis par la vendeuse, et une soirée découverte par mois.",
  ...adressesDeLaPage("/exemples/vingt-deux-heures"),
};

const ETAPES = [
  { titre: "Tu réponds", texte: "Combien, combien de temps, rire ou réfléchir. Trois questions, pas un formulaire." },
  { titre: "Léa choisit", texte: "Trois jeux, pas deux mille. Elle les a tous joués, à la table du fond." },
  { titre: "Tu mets de côté", texte: "Sur le site, sans payer. L'âge et les avertissements sont écrits avant le bouton." },
  { titre: "Tu passes les chercher", texte: "Ta pile t'attend trois jours à la caisse. Tu règles en boutique." },
];

export default function VingtDeuxHeures() {
  return (
    <div>
      {/* 1. L'ouverture : le titre massif, puis la mosaïque. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-14 pb-14 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
        <div className="space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--encre)] px-4 py-1.5 text-sm font-bold">
            <span aria-hidden="true" className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
            Boutique de jeux de société · Ta Ville
          </p>
          <h1 className="text-[3.6rem] leading-[0.9] sm:text-8xl font-black uppercase tracking-[-0.05em]">
            Le fou rire de 22&nbsp;h.
          </h1>
          <p className="text-xl leading-relaxed max-w-md">
            On ne vend pas des jeux. On vend la soirée qui va avec. Trois questions, et Léa te
            sort trois jeux. Pas deux mille.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="#trois-questions" className="rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-7 py-3.5 text-lg font-bold">
              Les trois questions
            </Link>
            <Link href={`${DOSSIER}/soiree-decouverte`} className="rounded-full border-2 border-[var(--encre)] px-7 py-3 text-lg font-bold">
              Soirée du jeudi
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2.5 sm:gap-3" aria-label="La boutique en images">
          <div className="aspect-square rounded-[22px] bg-[var(--accent)] grid place-items-center">
            <Boite teinte="#C93C22" motif={0} className="w-2/3 shadow-none" />
          </div>
          <div className="relative col-span-2 rounded-[22px] overflow-hidden bg-[var(--sombre)]">
            <Image src={photos.pions.src} alt={photos.pions.alt} fill priority sizes="(min-width: 1024px) 380px, 66vw" className="object-cover" />
          </div>
          <div className="relative row-span-2 rounded-[22px] overflow-hidden bg-[var(--sombre)]">
            <Image src={photos.lancer.src} alt={photos.lancer.alt} fill sizes="(min-width: 1024px) 180px, 33vw" className="object-cover" />
          </div>
          <div className="aspect-square rounded-[22px] bg-[#F2B33D] grid place-items-center">
            <span className="font-[family-name:var(--titres)] text-5xl font-black tracking-[-0.06em] tabular-nums">22h</span>
          </div>
          <div className="aspect-square rounded-[22px] bg-[#9CC9E8] grid place-items-center">
            <Boite teinte="#2F5D8A" motif={3} className="w-2/3 shadow-none" />
          </div>
          <Link href={`${DOSSIER}/soiree-decouverte`} className="col-span-2 rounded-[22px] bg-[var(--sombre)] text-[var(--sur-sombre)] p-4 flex flex-col justify-between gap-3 min-h-[120px]">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#F2B33D]">Soirée découverte</span>
            <span className="font-[family-name:var(--titres)] text-2xl font-black leading-tight tracking-[-0.02em]">
              {SOIREE.date} · {SOIREE.heure}
            </span>
            <span className="text-sm">{SOIREE.places} places · {SOIREE.jeux} jeux à tester · gratuite →</span>
          </Link>
        </div>
      </section>

      {/* 2. Les trois questions. */}
      <section id="trois-questions" className="scroll-mt-20 border-y-2 border-[var(--encre)] bg-[var(--carte)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 space-y-8">
          <div className="space-y-3 max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Ta soirée</p>
            <h2 className="text-5xl sm:text-6xl font-black uppercase tracking-[-0.04em]">Trois questions. Trois jeux.</h2>
            <p className="text-xl leading-relaxed">Vous êtes combien ? Combien de temps ? Plutôt rire, ou réfléchir ?</p>
          </div>
          <TroisQuestions />
        </div>
      </section>

      {/* 3. Pas deux mille boîtes. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 grid gap-10 md:grid-cols-[1.3fr_0.7fr] md:items-center">
          <div className="space-y-6">
            <p className="font-[family-name:var(--titres)] text-5xl sm:text-7xl font-black uppercase tracking-[-0.05em] leading-[0.92]">
              Pas deux mille boîtes triées par prix. <span className="text-[#F2B33D]">Trois, choisies par Léa.</span>
            </p>
            <p className="text-xl leading-relaxed max-w-xl">
              Une boutique en ligne qui montre tout, c&apos;est un rayon sans vendeur. Ici, chaque
              réponse a ses trois jeux, choisis à la main, et chaque jeu a sa phrase.
            </p>
          </div>
          <div className="rounded-[26px] bg-[var(--fond)] text-[var(--encre)] p-6 space-y-4">
            <div className="flex items-center gap-4">
              <span aria-hidden="true" className="grid place-items-center w-14 h-14 rounded-full bg-[var(--accent)] text-[var(--sur-accent)] font-[family-name:var(--titres)] text-2xl font-black">L</span>
              <div>
                <p className="text-xl font-black">{boutique.vendeuse}</p>
                <p className="text-sm text-[var(--doux)]">Vendeuse, prénom d&apos;exemple</p>
              </div>
            </div>
            <p className="text-lg leading-relaxed">
              «&nbsp;{JEUX.A1.mot}&nbsp;» <span className="text-[var(--doux)]">— sur le jeu d&apos;ambiance A1.</span>
            </p>
          </div>
        </div>
      </section>

      {/* 4. La soirée découverte. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 grid gap-8 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-[4/3] rounded-[30px] overflow-hidden border-2 border-[var(--encre)] bg-[var(--sombre)]">
          <Image src={photos.pionsVerts.src} alt={photos.pionsVerts.alt} fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
        </div>
        <div className="space-y-5">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Un jeudi par mois</p>
          <h2 className="text-5xl sm:text-6xl font-black uppercase tracking-[-0.04em]">La soirée découverte.</h2>
          <p className="text-xl leading-relaxed">
            Quatre tables de six, dix jeux à tester, et Léa qui explique les règles. Tu repars avec
            celui qui t&apos;a fait rire — ou avec rien, c&apos;est permis.
          </p>
          <dl className="grid grid-cols-3 gap-2.5">
            {[
              ["Date", SOIREE.date.replace("Jeudi ", "Jeu. ")],
              ["Places", String(SOIREE.places)],
              ["Prix", "Gratuite"],
            ].map(([t, v]) => (
              <div key={t} className="rounded-2xl bg-[var(--carte)] border-2 border-[var(--encre)] p-3">
                <dt className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--doux)]">{t}</dt>
                <dd className="text-lg font-black leading-tight">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="text-[var(--doux)]">Gratuite sans condition : aucun achat n&apos;est demandé. Il faut seulement réserver sa place.</p>
          <Link href={`${DOSSIER}/soiree-decouverte`} className="inline-flex rounded-full bg-[var(--encre)] text-[var(--fond)] px-7 py-3.5 text-lg font-bold">
            Choisir ma table
          </Link>
        </div>
      </section>

      {/* 5. Ce que vous tapez : jeux de société pour 2 personnes. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20 space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Ce que vous cherchez</p>
            <h2 className="text-5xl sm:text-6xl font-black uppercase tracking-[-0.04em]">Jeux de société pour 2&nbsp;personnes.</h2>
            <p className="text-xl leading-relaxed">La question qu&apos;on nous pose le plus. Une page entière pour y répondre, selon le temps que vous avez.</p>
          </div>
          <Link href={`${DOSSIER}/jeux-pour-deux`} className="rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-6 py-3 text-lg font-bold">
            Les jeux pour deux
          </Link>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {[JEUX.D1, JEUX.D3, JEUX.E1].map((j) => (
            <LigneJeu key={j.ref} jeu={j} />
          ))}
        </div>
      </section>

      {/* 6. L'âge et les avertissements, avant le bouton. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="rounded-[30px] border-2 border-[var(--encre)] bg-[#F2B33D] p-5 sm:p-12 grid gap-8 md:grid-cols-[1fr_1fr] md:items-center">
          <div className="space-y-4 min-w-0">
            <p className="text-sm font-bold uppercase tracking-[0.16em]">Avant d&apos;acheter</p>
            <h2 className="text-[1.75rem] sm:text-5xl font-black uppercase tracking-[-0.04em]">L&apos;âge et les avertis&shy;sements, avant le bouton.</h2>
            <p className="text-xl leading-relaxed">
              Sur chaque jeu, l&apos;âge conseillé et l&apos;avertissement de la boîte, précédé du mot
              « Attention ». Tu les lis avant de mettre le jeu de côté, pas après.
            </p>
          </div>
          <div className="min-w-0 rounded-[22px] bg-[var(--carte)] border-2 border-[var(--encre)] p-5 space-y-3">
            <div className="flex items-center gap-4">
              <Boite teinte={JEUX.X1.teinte} motif={JEUX.X1.motif} className="w-16 h-16 shrink-0" />
              <p className="text-xl font-black uppercase">{JEUX.X1.genre}</p>
            </div>
            <p className="rounded-xl bg-[var(--fond)] px-3 py-2 leading-snug">
              <strong>Dès {JEUX.X1.age} ans</strong> · <strong>Attention.</strong> {JEUX.X1.attention}
            </p>
            <p className="rounded-full bg-[var(--accent)] text-[var(--sur-accent)] text-center py-3 text-lg font-bold" aria-hidden="true">Mettre de côté</p>
          </div>
        </div>
      </section>

      {/* 7. Comment ça marche. */}
      <section className="border-y-2 border-[var(--encre)] bg-[var(--carte)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 space-y-10">
          <h2 className="text-5xl sm:text-6xl font-black uppercase tracking-[-0.04em] max-w-3xl">De la question à la table.</h2>
          <ol className="grid gap-3 md:grid-cols-4">
            {ETAPES.map((e, i) => (
              <li key={e.titre} className="rounded-[22px] bg-[var(--fond)] border-2 border-[var(--encre)] p-6 space-y-3">
                <span className="font-[family-name:var(--titres)] text-5xl font-black text-[var(--accent-texte)] tabular-nums">{i + 1}</span>
                <h3 className="text-2xl font-black uppercase tracking-[-0.02em]">{e.titre}</h3>
                <p className="text-lg leading-relaxed">{e.texte}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 8. La table. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 grid gap-3 grid-cols-2 md:grid-cols-4">
        <div className="relative col-span-2 aspect-[16/10] rounded-[26px] overflow-hidden border-2 border-[var(--encre)] bg-[var(--sombre)]">
          <Image src={photos.des.src} alt={photos.des.alt} fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover" />
        </div>
        <div className="rounded-[26px] bg-[var(--accent)] text-[var(--sur-accent)] p-5 flex flex-col justify-end">
          <p className="font-[family-name:var(--titres)] text-3xl font-black uppercase leading-[0.95] tracking-[-0.03em]">Celui qui t&apos;a fait rire.</p>
        </div>
        <div className="relative rounded-[26px] overflow-hidden border-2 border-[var(--encre)] bg-[var(--sombre)] aspect-square">
          <Image src={photos.deNoir.src} alt={photos.deNoir.alt} fill sizes="(min-width: 768px) 270px, 50vw" className="object-cover" />
        </div>
      </section>

      {/* 9. Questions. */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20 space-y-8">
        <h2 className="text-5xl sm:text-6xl font-black uppercase tracking-[-0.04em]">Questions.</h2>
        <Faq questions={FAQ} />
      </section>

      {/* 10. La boutique. */}
      <section className="px-4 sm:px-6 pb-20">
        <div className="max-w-6xl mx-auto rounded-[34px] bg-[var(--sombre)] text-[var(--sur-sombre)] px-6 py-14 sm:p-16 grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div className="space-y-5">
            <p className="font-[family-name:var(--titres)] text-5xl sm:text-7xl font-black uppercase tracking-[-0.05em] leading-[0.92]">
              Il vient chercher <span className="text-[#F2B33D]">sa soirée.</span>
            </p>
            <p className="text-xl">{boutique.adresse} · adresse d&apos;exemple</p>
          </div>
          <div className="space-y-3">
            <Link href="#trois-questions" className="flex justify-center rounded-full bg-[#F2B33D] text-[var(--encre)] px-7 py-4 text-lg font-bold">
              Trouver mes trois jeux
            </Link>
            <Link href={`${DOSSIER}/soiree-decouverte`} className="flex justify-center rounded-full border-2 border-[var(--sur-sombre)] px-7 py-3.5 text-lg font-bold">
              Réserver jeudi
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
