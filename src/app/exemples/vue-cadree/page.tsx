import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { ARBRES, CONTACT, DOSSIER, PHOTOS } from "./_composants/donnees";
import { Croquis, Faq, Note, PrixEntretien, Surtitre } from "./_composants/Elements";
import { TroisPhotos } from "./_composants/Interactifs";

// Le site imaginé dans la vidéo « Si je devais remplir le carnet de chantiers d'un
// paysagiste » : trois photos prises de la fenêtre, un croquis en hiver, une page par
// arbre, et l'entretien avec le crédit d'impôt affiché comme la règle l'exige.
// Premier écran inspiré du modèle « Palomar Labs » de MotionSites : une pastille, un
// grand titre aligné à gauche, une large image en dessous.
export const metadata: Metadata = {
  title: "Vue Cadrée — site de démonstration",
  description:
    "Site de démonstration d'un paysagiste imaginaire, réalisé par Canevas Havane : trois photos de ton jardin prises de ta fenêtre, et un croquis en hiver.",
  ...adressesDeLaPage("/exemples/vue-cadree"),
};

const MOIS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
const ANNEE: (string | null)[] = ["Croquis", "Croquis", "Chantier", "Chantier", "Chantier", null, null, null, null, null, "Croquis", "Croquis"];

const ETAPES = [
  ["Trois photos", "Prises de ta fenêtre, envoyées depuis le site. C'est tout ce qu'on te demande."],
  ["Le croquis", "En hiver, on dessine ton jardin pour cette vue-là, et on te l'envoie."],
  ["La visite", "On vient voir, on mesure, on te remet un devis détaillé."],
  ["Le chantier", "Au printemps, quand la terre se réchauffe. Tu regardes par la fenêtre."],
];

export default function VueCadree() {
  return (
    <main>
      {/* Ouverture : la pastille, le grand titre, la fenêtre. */}
      <section className="mx-auto max-w-6xl px-5 pt-10 sm:px-8 sm:pt-16">
        <a href="#croquis" className="inline-flex items-center gap-2 rounded-full border border-[var(--trait)] bg-[var(--carte)] px-4 py-2 text-[13px] font-medium">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[var(--accent)]" />
          Croquis de l&apos;hiver 2026 – 2027 · on dessine de novembre à février
        </a>
        <h1 className="mt-6 max-w-4xl text-[50px] font-bold leading-[0.98] tracking-[-0.015em] sm:text-[84px]">
          La vue depuis ta fenêtre de cuisine.
        </h1>
        <p className="mt-6 max-w-xl text-[19px] leading-relaxed text-[var(--doux)]">
          On ne vend pas un jardin. On dessine celui que tu regardes chaque matin, une tasse à la main.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#photos" className="rounded-full bg-[var(--accent)] px-6 py-3.5 font-semibold text-[var(--sur-accent)]">Envoyer trois photos</a>
          <Link href={`${DOSSIER}/arbres`} className="rounded-full border-2 border-[var(--encre)] px-6 py-3 font-semibold">Quand tailler&nbsp;?</Link>
        </div>
        <div className="relative mt-10">
          <div className="overflow-hidden rounded-[6px] border-[12px] border-[#FBFAF5] shadow-[0_30px_60px_-36px_rgba(30,42,34,0.6)]">
            <Image src={PHOTOS.fenetre.src} alt={PHOTOS.fenetre.alt} width={PHOTOS.fenetre.largeur} height={PHOTOS.fenetre.hauteur} priority sizes="(min-width: 1152px) 1088px, 92vw" className="h-[300px] w-full object-cover sm:h-[480px]" />
          </div>
          <p className="absolute -bottom-4 right-4 rotate-[-4deg] rounded-[6px] bg-[#FBFAF5] px-3 py-2 shadow-sm"><Note>ta vue, un matin d&apos;avril</Note></p>
        </div>
      </section>

      {/* L'outil de la vidéo : trois photos. */}
      <section id="photos" className="scroll-mt-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 md:grid-cols-[0.9fr_1.1fr] md:items-start">
          <div className="space-y-5">
            <Surtitre>Une seule demande</Surtitre>
            <h2 className="text-[42px] font-bold leading-[1.02] sm:text-6xl">Trois photos, de ta fenêtre.</h2>
            <p className="text-[18px] leading-relaxed text-[var(--doux)]">
              Pas de formulaire de quinze champs. Trois photos de ton jardin, prises de là où tu le regardes. On te
              rappelle avec un croquis.
            </p>
          </div>
          <TroisPhotos />
        </div>
      </section>

      {/* Le croquis d'hiver. */}
      <section id="croquis" className="scroll-mt-20 bg-[#E3EBDD]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 md:grid-cols-2 md:items-center">
          <div className="space-y-5 md:order-2">
            <Surtitre>Le croquis d&apos;hiver</Surtitre>
            <h2 className="text-[42px] font-bold leading-[1.02] sm:text-6xl">En hiver, un croquis. Au printemps, le chantier.</h2>
            <p className="text-[18px] leading-relaxed">
              De novembre à février, on dessine : ton jardin, vu de ta fenêtre, avec ce qu&apos;on y planterait. Tu
              as l&apos;hiver pour y réfléchir ; le chantier part dès que la terre se réchauffe.
            </p>
            <p className="text-[15px] [font-variant-numeric:lining-nums]">Le croquis : 150 € TTC, déduits du chantier si tu nous le confies · exemple</p>
          </div>
          <Croquis />
        </div>
      </section>

      {/* L'année. */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div className="space-y-5">
            <Surtitre>Pourquoi l&apos;hiver</Surtitre>
            <h2 className="text-[42px] font-bold leading-[1.02] sm:text-5xl">Parce que c&apos;est la saison où on a le temps de dessiner.</h2>
            <p className="text-[18px] leading-relaxed text-[var(--doux)]">
              Au printemps, tout le monde appelle en même temps. En dessinant l&apos;hiver, ton chantier est prêt à
              partir en mars, au lieu d&apos;attendre l&apos;été.
            </p>
          </div>
          <div className="rounded-[22px] border border-[var(--trait)] bg-[var(--carte)] p-5">
            <ol className="grid grid-cols-12 gap-1.5" aria-label="L'année de Vue Cadrée">
              {MOIS.map((m, i) => (
                <li key={i} className="flex flex-col items-center gap-1.5">
                  <span className={`h-28 w-full rounded-[6px] ${ANNEE[i] === "Croquis" ? "bg-[#3D5A80]" : ANNEE[i] === "Chantier" ? "bg-[var(--accent)]" : "bg-[#C9D5C3]"}`} aria-hidden="true" />
                  <span className="text-[12px] font-semibold">{m}</span>
                </li>
              ))}
            </ol>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[14px]">
              <li className="flex items-center gap-2"><span aria-hidden="true" className="h-3 w-3 rounded-sm bg-[#3D5A80]" />Croquis</li>
              <li className="flex items-center gap-2"><span aria-hidden="true" className="h-3 w-3 rounded-sm bg-[var(--accent)]" />Chantiers</li>
              <li className="flex items-center gap-2"><span aria-hidden="true" className="h-3 w-3 rounded-sm bg-[#C9D5C3]" />Entretien et tailles</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Une page par arbre. */}
      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto max-w-6xl space-y-10 px-5 py-20 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div className="space-y-4">
              <Surtitre>Une page par arbre</Surtitre>
              <h2 className="text-[42px] font-bold leading-[1.02] sm:text-6xl">Quand tailler&nbsp;?</h2>
            </div>
            <Link href={`${DOSSIER}/arbres`} className="font-semibold underline underline-offset-4">Toutes les pages</Link>
          </div>
          <ul className="grid gap-4 md:grid-cols-3">
            {ARBRES.map((a) => (
              <li key={a.slug}>
                <Link href={`${DOSSIER}/arbres/${a.slug}`} className="block h-full rounded-[20px] border border-[var(--trait)] bg-[var(--fond)] p-6">
                  <span className="block font-[family-name:var(--titres)] text-[28px] font-bold leading-tight">{a.question}</span>
                  <span className="mt-3 block text-[16px] leading-relaxed text-[var(--doux)]">{a.reponse[0]}</span>
                  <span className="mt-4 block font-semibold text-[var(--accent-texte)]">La réponse en trois lignes, et réserver la taille</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* L'entretien, et le crédit d'impôt à sa place. */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 md:grid-cols-2 md:items-center">
        <div className="space-y-5">
          <Surtitre>L&apos;entretien à l&apos;année</Surtitre>
          <h2 className="text-[42px] font-bold leading-[1.02] sm:text-6xl">Le prix d&apos;abord.</h2>
          <p className="text-[18px] leading-relaxed text-[var(--doux)]">
            Tonte, haies, désherbage : un prix à l&apos;année, selon la taille du jardin. Le crédit d&apos;impôt, quand
            il s&apos;applique, est écrit à côté, en plus petit, avec ses conditions.
          </p>
          <Link href={`${DOSSIER}/entretien`} className="inline-block rounded-full border-2 border-[var(--encre)] px-6 py-3 font-semibold">Calculer pour mon jardin</Link>
        </div>
        <PrixEntretien />
      </section>

      {/* La méthode. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto max-w-6xl space-y-10 px-5 py-20 sm:px-8">
          <Surtitre clair>Comment ça se passe</Surtitre>
          <h2 className="text-[42px] font-bold leading-[1.02] sm:text-6xl">De ta fenêtre à ton jardin.</h2>
          <ol className="grid gap-px overflow-hidden rounded-[20px] bg-[#3A4A3F] sm:grid-cols-2 lg:grid-cols-4">
            {ETAPES.map(([t, d], i) => (
              <li key={t} className="space-y-2 bg-[var(--sombre)] p-6">
                <p className="font-[family-name:var(--titres)] text-[40px] font-bold text-[#C9E0B8] [font-variant-numeric:lining-nums]">0{i + 1}</p>
                <h3 className="text-[24px] font-bold">{t}</h3>
                <p className="leading-relaxed">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Questions. */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 md:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          <Surtitre>Questions</Surtitre>
          <h2 className="text-[42px] font-bold leading-[1.02] sm:text-5xl">Avant d&apos;envoyer tes photos.</h2>
        </div>
        <Faq />
      </section>

      {/* Nous joindre. */}
      <section id="contact" className="scroll-mt-20 border-t border-[var(--trait)] bg-[#E3EBDD]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-2 md:items-center">
          <div className="space-y-4">
            <Surtitre>Nous joindre</Surtitre>
            <h2 className="text-[42px] font-bold leading-[1.02] sm:text-5xl">Ou appelle, tout simplement.</h2>
            <p className="text-[18px]">{CONTACT.adresse}</p>
            <p className="text-[18px]">{CONTACT.zone}</p>
            <p className="font-[family-name:var(--titres)] text-[32px] font-bold [font-variant-numeric:lining-nums]">{CONTACT.telephone}</p>
          </div>
          <div className="overflow-hidden rounded-[6px] border-[12px] border-[#FBFAF5]">
            <Image src={PHOTOS.hiver.src} alt={PHOTOS.hiver.alt} width={PHOTOS.hiver.largeur} height={PHOTOS.hiver.hauteur} sizes="(min-width: 768px) 520px, 92vw" className="h-auto w-full" />
          </div>
        </div>
      </section>
    </main>
  );
}
