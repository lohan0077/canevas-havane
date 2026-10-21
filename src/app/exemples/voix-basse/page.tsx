import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { Faq, Intitule, Onde, Section } from "./_composants/Blocs";
import Carnet from "./_composants/Carnet";
import Question from "./_composants/Question";
import { CAISSE, DATE_DES_TARIFS, DOSSIER, EQUIPE, ICI, TARIFS, cabinet, photos } from "./_composants/donnees";

// L'accueil de Voix Basse. Premier écran transposé du modèle « Wellness Hero » de
// MotionSites (une photo calme, un grand titre en romain léger, trois pastilles) ;
// puis l'idée de la vidéo en état de marche : avant de réserver, une seule question,
// et le créneau calme d'avant l'ouverture. Et le lancement : la visite pour rien.
export const metadata: Metadata = {
  title: "Voix Basse — site de démonstration",
  description: "Site de démonstration d'un cabinet vétérinaire imaginaire, réalisé par Canevas Havane : ici, on parle bas. Une seule question avant de réserver, et un créneau calme avant l'ouverture.",
  ...adressesDeLaPage("/exemples/voix-basse"),
};

const PASTILLES = ["Créneau calme", "Salle des chats à part", "Viens pour rien"];

export default function VoixBasse() {
  return (
    <main>
      {/* L'ouverture : la photo calme, puis le titre sur fond plein (lisible partout). */}
      <section className="mx-auto max-w-6xl px-3 pt-4 sm:px-5">
        <div className="relative overflow-hidden rounded-[30px]">
          <div className="relative aspect-[4/5] sm:aspect-[16/9]">
            <Image src={photos.soleil.src} alt={photos.soleil.alt} fill priority sizes="(min-width: 1152px) 1120px, 100vw" className="object-cover object-[50%_70%] saturate-[0.85]" />
            <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(251,247,239,0)_45%,rgba(251,247,239,0.85)_100%)]" />
          </div>
          <ul className="absolute left-4 top-4 flex flex-wrap gap-2 pr-4">
            {PASTILLES.map((p) => (
              <li key={p} className="rounded-full bg-[var(--fond)] px-3.5 py-1.5 text-[13px] font-semibold">{p}</li>
            ))}
          </ul>
        </div>
        <div className="relative -mt-24 px-3 sm:-mt-40 sm:px-10">
          <div className="max-w-3xl rounded-[28px] bg-[var(--fond)] p-6 pt-7 sm:p-10">
            <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">
              <Onde className="h-4 w-14" />
              Cabinet vétérinaire · chats et chiens
            </p>
            <h1 className="mt-5 text-[64px] sm:text-[104px] tracking-[-0.03em]">
              Ici, on parle <em>bas.</em>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--doux)]">
              Ton chat a vu sa caisse, il est sous le lit. On le sait. Alors chez Voix Basse,
              on ne te montre pas des soins : on te montre comment on le reçoit.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={`${DOSSIER}/rendez-vous`} className="inline-flex min-h-[54px] items-center rounded-full bg-[var(--encre)] px-7 font-semibold text-[var(--fond)]">
                Prendre rendez-vous
              </Link>
              <Link href={`${DOSSIER}/pour-rien`} className="inline-flex min-h-[54px] items-center rounded-full border-2 border-[var(--encre)] px-7 font-semibold">
                Viens pour rien
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Section id="question" className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <Question />
        <div className="space-y-5 lg:pt-24">
          <div className="relative aspect-[2/3] max-h-[560px] w-full overflow-hidden rounded-[28px]">
            <Image src={photos.chien.src} alt={photos.chien.alt} fill sizes="(min-width: 1024px) 420px, 100vw" className="object-cover" />
          </div>
          <p className="text-[var(--doux)]">
            Le créneau calme, c&apos;est la même consultation, au même prix. Seulement avant
            l&apos;ouverture, quand personne d&apos;autre n&apos;attend.
          </p>
        </div>
      </Section>

      <Section teinte className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-[3/2] overflow-hidden rounded-[28px]">
          <Image src={photos.caisse.src} alt={photos.caisse.alt} fill sizes="(min-width: 1024px) 540px, 100vw" className="object-cover" />
        </div>
        <div className="space-y-8">
          <Intitule surtitre="Tout commence à la maison" titre={<>Le rendez-vous commence <em>à la caisse.</em></>}>
            Ton chat voit sa caisse, et file sous le lit. La visite a commencé bien avant la
            salle d&apos;attente. Trois gestes, pour que la caisse redevienne une caisse.
          </Intitule>
          <ol className="space-y-5">
            {CAISSE.map((c, i) => (
              <li key={c.titre} className="grid grid-cols-[auto_1fr] gap-4">
                <span className="font-[family-name:var(--titres)] text-4xl leading-none text-[var(--accent-texte)]">{i + 1}</span>
                <div>
                  <h3 className="font-[family-name:var(--texte)]! text-lg font-semibold">{c.titre}</h3>
                  <p className="leading-relaxed text-[var(--doux)]">{c.texte}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section id="ici" className="space-y-14">
        <Intitule surtitre="Ce qui change ici" titre={<>Pas des soins d&apos;abord. <em>Du calme.</em></>}>
          Les soins sont ceux d&apos;un cabinet vétérinaire. La façon de recevoir, elle, est
          la nôtre.
        </Intitule>
        <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {ICI.map((x) => (
            <li key={x.titre} className="space-y-2 border-t border-[var(--trait)] pt-5">
              <h3 className="text-[32px]">{x.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{x.texte}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section sombre className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div className="space-y-8">
          <Intitule surtitre="Pour l'ouverture" titre={<>Viens <em>pour rien.</em></>}>
            Tu passes avec ton chat ou ton chien. Il renifle, il a une friandise, il repart.
            Aucun soin, aucun examen, aucune facture. Pour que la prochaine fois, la caisse
            redevienne juste une caisse.
          </Intitule>
          <Link href={`${DOSSIER}/pour-rien`} className="inline-flex min-h-[54px] items-center rounded-full bg-[var(--accent)] px-7 font-semibold text-[var(--sur-accent)]">
            Choisir un moment pour rien
          </Link>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden rounded-[28px]">
          <Image src={photos.friandise.src} alt={photos.friandise.alt} fill sizes="(min-width: 1024px) 540px, 100vw" className="object-cover" />
        </div>
      </Section>

      <Section className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <Carnet />
        <div className="space-y-6">
          <Intitule surtitre="Après la visite" titre="Le carnet le dit." />
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Chaque visite pour rien s&apos;écrit dans son carnet, comme une vraie. Trois lignes et
            un tampon : c&apos;est tout ce qu&apos;il y a eu.
          </p>
        </div>
      </Section>

      <Section id="tarifs" teinte className="space-y-10">
        <Intitule surtitre={`Tarifs au ${DATE_DES_TARIFS}`} titre={<>Le calme <em>ne coûte rien de plus.</em></>}>
          Prix toutes taxes comprises, d&apos;exemple : le cabinet est fictif. Ce qui est compris
          est écrit à côté de chaque prix.
        </Intitule>
        <ul className="divide-y divide-[var(--trait)] rounded-[24px] border border-[var(--trait)] bg-[var(--carte)]">
          {TARIFS.map((t) => (
            <li key={t.acte} className="flex items-baseline justify-between gap-6 px-5 py-5 sm:px-8">
              <span>
                <span className="block text-lg font-semibold">{t.acte}</span>
                <span className="block text-[15px] text-[var(--doux)]">{t.detail}</span>
              </span>
              <span className="shrink-0 text-right font-[family-name:var(--titres)] text-3xl tabular-nums">
                {t.prix}
                {t.prix !== "Sans frais" && <span className="block font-[family-name:var(--texte)] text-xs text-[var(--doux)]">TTC · exemple</span>}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <Intitule surtitre="L'équipe" titre="Trois personnes, à voix basse.">
          Présentées par leurs initiales : le cabinet est fictif.
        </Intitule>
        <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
          {EQUIPE.map((p) => (
            <li key={p.initiales} className="flex items-center gap-5 py-6">
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[#EFE8F7] font-[family-name:var(--titres)] text-2xl">{p.initiales}</span>
              <span>
                <span className="block text-sm font-semibold uppercase tracking-[0.14em] text-[var(--accent-texte)]">{p.role}</span>
                <span className="block text-lg">{p.phrase}</span>
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section className="grid gap-12 pt-0 lg:grid-cols-[0.8fr_1.2fr]">
        <Intitule surtitre="Questions" titre="Tout bas, tes questions." />
        <Faq />
      </Section>

      <Section id="venir" teinte className="grid gap-10 lg:grid-cols-2">
        <Intitule surtitre="Venir" titre="Au fond de la cour, au calme.">
          {cabinet.adresse.join(", ")}. Une place réservée devant la porte pour les créneaux
          calmes : ton animal passe de la voiture à la salle sans attendre.
        </Intitule>
        <div className="space-y-4 self-end">
          <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)] text-lg">
            {cabinet.horaires.map((h) => (
              <li key={h.jours} className="flex flex-wrap justify-between gap-x-6 py-3">
                <span className="font-semibold">{h.jours}</span>
                <span className="text-[var(--doux)]">{h.heures}</span>
              </li>
            ))}
          </ul>
          <p className="text-lg">
            Téléphone : <span className="font-semibold tabular-nums">{cabinet.telephone}</span>
            <span className="block text-sm text-[var(--doux)]">Numéro de fiction (tranche réservée par l&apos;ARCEP) : il ne sonne chez personne.</span>
          </p>
        </div>
      </Section>
    </main>
  );
}
