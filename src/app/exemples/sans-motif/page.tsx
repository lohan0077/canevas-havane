import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import SoutienPsy from "./_composants/SoutienPsy";
import TroisClics from "./_composants/TroisClics";
import { BoutonRdv, Photographie, Questions, Surtitre, Trait } from "./_composants/Blocs";
import { DOSSIER, cabinet, photos, premiereSeance, soutienPsy } from "./_composants/donnees";

// Le site imaginé dans la vidéo « Si je devais remplir l'agenda d'un psychologue » :
// un rendez-vous en trois clics qui ne demande jamais pourquoi on vient, Mon soutien
// psy dit dès l'accueil, la carte bancaire acceptée, et le 15 et le 3114 sur chaque
// page. Premier écran inspiré du modèle « Mindora » de MotionSites (une grande carte
// blanche, un titre posé au centre, trois petites cartes dessous), transposé.
export const metadata: Metadata = {
  title: "Sans Motif — site de démonstration",
  description:
    "Site de démonstration d'un cabinet de psychologue imaginaire, réalisé par Canevas Havane : un rendez-vous en trois clics, sans jamais demander pourquoi on vient.",
  ...adressesDeLaPage("/exemples/sans-motif"),
};

export default function SansMotif() {
  return (
    <main>
      {/* 1. La grande carte blanche. */}
      <section className="px-3 sm:px-6 pt-2 grid gap-3 max-w-6xl mx-auto lg:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded-[36px] bg-[var(--carte)] px-5 pt-10 pb-5 sm:px-10 sm:pt-14 text-center space-y-7">
          <p className="text-sm text-[var(--doux)]">{cabinet.psychologue} · psychologue · {cabinet.ville} (exemple)</p>
          <h1 className="text-[46px] sm:text-6xl tracking-[-0.045em] font-normal">
            <span className="font-bold">Venez</span> sans motif.
            <Trait className="mx-auto mt-2 w-48 text-[var(--accent)]" />
          </h1>
          <p className="mx-auto max-w-md text-lg leading-relaxed text-[var(--doux)]">
            Un rendez-vous en trois clics. On ne vous demande pas pourquoi vous venez :
            vous le direz en séance.
          </p>
          <BoutonRdv />
          <SoutienPsy />
          <ul className="grid gap-2 sm:grid-cols-3 text-left">
            <li className="rounded-[22px] bg-[var(--fond)] p-4 space-y-1">
              <p className="font-[family-name:var(--titres)] text-3xl font-semibold tracking-[-0.04em]">3 clics</p>
              <p className="text-sm text-[var(--doux)]">La séance, le jour, l&apos;heure.</p>
            </li>
            <li className="rounded-[22px] bg-[var(--fond)] p-4 space-y-1">
              <p className="font-[family-name:var(--titres)] text-lg font-semibold leading-tight">Carte bancaire acceptée</p>
              <p className="text-sm text-[var(--doux)]">Espèces et virement aussi.</p>
            </li>
            <li className="rounded-[22px] bg-[var(--sombre)] text-[var(--sur-sombre)] p-4 space-y-1">
              <p className="font-[family-name:var(--titres)] text-lg font-semibold">15 · 3114</p>
              <p className="text-sm text-[#AEB6C4]">Si c&apos;est urgent, n&apos;attendez pas un rendez-vous.</p>
            </li>
          </ul>
        </div>
        <Photographie photo={photos.chaise} priority sizes="(min-width: 1024px) 420px, 100vw" className="min-h-[300px] lg:min-h-full" />
      </section>

      {/* 2. Le plus dur. */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-28 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <Surtitre>Pourquoi trois clics</Surtitre>
          <h2 className="text-[40px] sm:text-6xl font-normal tracking-[-0.045em]">
            Le plus dur, ce n&apos;est pas la première séance. <span className="font-bold">C&apos;est le premier message.</span>
          </h2>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Appeler, expliquer, se justifier à un répondeur : beaucoup renoncent là. Ici, il
            suffit de cliquer. Même tard le soir, depuis son lit.
          </p>
        </div>
        <Photographie photo={photos.nuit} sizes="(min-width: 1024px) 560px, 100vw" className="aspect-[3/2]" />
      </section>

      {/* 3. Le rendez-vous. */}
      <section id="rendez-vous" className="bg-[#E3E7EC] scroll-mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6 px-1">
            <Surtitre>Prendre rendez-vous</Surtitre>
            <h2 className="text-[40px] sm:text-6xl font-normal tracking-[-0.045em]">
              <span className="font-bold">Trois clics.</span> Rien à expliquer.
            </h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              Un nom et un téléphone, pour pouvoir vous rappeler si le cabinet doit déplacer
              un rendez-vous. C&apos;est tout.
            </p>
          </div>
          <TroisClics />
        </div>
      </section>

      {/* 4. Ce qui vous amène. */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-28 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="rounded-[30px] bg-[var(--carte)] p-6 sm:p-8 space-y-3" aria-label="Un formulaire comme on n'en fera pas">
          {["Motif de consultation", "Depuis quand ?", "Avez-vous déjà consulté ?"].map((c) => (
            <div key={c} className="rounded-xl border-2 border-dashed border-[var(--trait)] px-4 py-3">
              <p className="font-semibold text-[var(--doux)] line-through decoration-2 decoration-[var(--accent)]">{c}</p>
            </div>
          ))}
          <p className="pt-2 text-sm text-[var(--doux)]">Trois champs que vous ne trouverez pas sur ce site.</p>
        </div>
        <div className="space-y-6">
          <Surtitre>Vos données</Surtitre>
          <h2 className="text-[40px] sm:text-6xl font-normal tracking-[-0.045em]">
            Ce qui vous amène <span className="font-bold">reste entre nous.</span>
          </h2>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Ce qui amène quelqu&apos;un chez un psychologue est une donnée de santé. Le site
            n&apos;a pas besoin de la connaître pour vous donner un rendez-vous : il ne la
            demande pas, et ne l&apos;enregistre nulle part.
          </p>
          <p className="text-sm text-[var(--doux)]">RGPD, art. 4 (15) et art. 9 : les données concernant la santé.</p>
        </div>
      </section>

      {/* 5. Mon soutien psy. */}
      <section id="soutien" className="px-3 sm:px-6 scroll-mt-16">
        <div className="max-w-6xl mx-auto rounded-[36px] bg-[var(--sombre)] text-[var(--sur-sombre)] px-6 py-16 sm:px-12 sm:py-20 grid gap-10 lg:grid-cols-2">
          <div className="space-y-5">
            <p className="text-sm font-semibold text-[#9FB2FF]">Remboursement</p>
            <h2 className="text-[40px] sm:text-6xl font-normal tracking-[-0.045em]">
              Partenaire <span className="font-bold">Mon soutien psy.</span>
            </h2>
            <p className="text-[#AEB6C4]">Comment ça marche, en trois lignes. Partenariat donné en exemple.</p>
          </div>
          <ol className="space-y-5">
            {soutienPsy.map((l, i) => (
              <li key={l} className="flex gap-4 text-lg leading-relaxed">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#3552C7] text-white font-bold tabular-nums">{i + 1}</span>
                {l}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6. Tarifs. */}
      <section id="tarifs" className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-28 space-y-10 scroll-mt-16">
        <div className="space-y-5 max-w-2xl">
          <Surtitre>Tarifs</Surtitre>
          <h2 className="text-[40px] sm:text-6xl font-normal tracking-[-0.045em]">
            Le prix, <span className="font-bold">avant de venir.</span>
          </h2>
        </div>
        <ul className="grid gap-3 md:grid-cols-3">
          <li className="rounded-[28px] bg-[var(--carte)] p-7 space-y-2">
            <p className="text-sm text-[var(--doux)]">Séance individuelle · {cabinet.seance.duree}</p>
            <p className="font-[family-name:var(--titres)] text-5xl font-semibold tracking-[-0.04em] tabular-nums">{cabinet.seance.prix}</p>
            <p className="text-sm text-[var(--doux)]">Prix d&apos;exemple</p>
          </li>
          <li className="rounded-[28px] bg-[var(--carte)] p-7 space-y-2">
            <p className="text-sm text-[var(--doux)]">Séance Mon soutien psy</p>
            <p className="font-[family-name:var(--titres)] text-2xl font-semibold leading-tight">Tarif du dispositif</p>
            <p className="text-sm text-[var(--doux)]">Expliqué au premier rendez-vous, et sur ameli.fr</p>
          </li>
          <li className="rounded-[28px] bg-[var(--accent)] text-[var(--sur-accent)] p-7 space-y-2">
            <p className="text-sm">Paiement</p>
            <p className="font-[family-name:var(--titres)] text-2xl font-semibold leading-tight">Carte bancaire acceptée</p>
            <p className="text-sm">Espèces et virement aussi. Facture à chaque séance.</p>
          </li>
        </ul>
      </section>

      {/* 7. La première séance. */}
      <section className="bg-[var(--carte)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-28 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6">
            <Surtitre>La première séance</Surtitre>
            <h2 className="text-[40px] sm:text-6xl font-normal tracking-[-0.045em]">
              Rien à <span className="font-bold">préparer.</span>
            </h2>
            <Link href={`${DOSSIER}/premiere-seance`} className="inline-flex items-center gap-2 font-semibold text-[var(--accent-texte)] underline underline-offset-4">
              Lire la page en entier <span aria-hidden="true">→</span>
            </Link>
          </div>
          <ol className="grid gap-3 sm:grid-cols-2">
            {premiereSeance.map((p, i) => (
              <li key={p.titre} className="rounded-[24px] bg-[var(--fond)] p-6 space-y-2">
                <p className="text-sm font-semibold text-[var(--accent-texte)] tabular-nums">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="text-xl font-semibold">{p.titre}</h3>
                <p className="leading-relaxed text-[var(--doux)]">{p.texte}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 8. La psychologue. */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-28 grid gap-10 lg:grid-cols-2 lg:items-center">
        <Photographie photo={photos.fauteuil} sizes="(min-width: 1024px) 560px, 100vw" className="aspect-[4/3]" />
        <div className="space-y-6">
          <Surtitre>La psychologue</Surtitre>
          <h2 className="text-[40px] sm:text-6xl font-normal tracking-[-0.045em]">
            {cabinet.psychologue} <span className="block font-bold">Psychologue.</span>
          </h2>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Le nom du cabinet vous dit que vous n&apos;avez rien à justifier. Le titre, lui, vous
            dit à qui vous parlez : psychologue est un titre protégé par la loi.
          </p>
          <dl className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[20px] bg-[var(--carte)] p-5"><dt className="text-sm text-[var(--doux)]">Diplôme</dt><dd className="mt-1 font-semibold">{cabinet.diplome}</dd></div>
            <div className="rounded-[20px] bg-[var(--carte)] p-5"><dt className="text-sm text-[var(--doux)]">N° ADELI</dt><dd className="mt-1 font-semibold tabular-nums">{cabinet.adeli} (exemple)</dd></div>
          </dl>
          <p className="text-sm text-[var(--doux)]">Loi n° 85-772 du 25 juillet 1985, art. 44.</p>
        </div>
      </section>

      {/* 9. Questions. */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 pb-20 sm:pb-28 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-6">
          <Surtitre>Questions</Surtitre>
          <h2 className="text-[40px] sm:text-6xl font-normal tracking-[-0.045em]">Avant de <span className="font-bold">cliquer.</span></h2>
          <p className="text-[var(--doux)]">{cabinet.adresse}, {cabinet.ville} (exemple) · {cabinet.horaires} · <span className="tabular-nums">{cabinet.telephone}</span></p>
        </div>
        <Questions />
      </section>

      {/* 10. Dernier écran. */}
      <section className="px-3 sm:px-6 pb-16">
        <div className="max-w-6xl mx-auto rounded-[36px] bg-[var(--carte)] px-6 py-16 text-center space-y-7">
          <h2 className="text-[40px] sm:text-6xl font-normal tracking-[-0.045em]">
            Pas besoin <span className="font-bold">d&apos;une raison.</span>
          </h2>
          <BoutonRdv />
          <p className="text-[var(--doux)]">Urgence&nbsp;: <strong className="text-[var(--encre)]">15</strong> · Prévention du suicide&nbsp;: <strong className="text-[var(--encre)]">3114</strong></p>
        </div>
      </section>
    </main>
  );
}
