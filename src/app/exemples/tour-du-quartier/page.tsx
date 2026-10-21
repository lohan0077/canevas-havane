import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Quartier from "./_composants/Quartier";
import Depuis from "./_composants/Depuis";
import { Faq, Pastille } from "./_composants/Blocs";
import { COURSE, DOSSIER, EQUIPE, IMAGES, VELOS, entreprise } from "./_composants/donnees";

export const metadata: Metadata = {
  title: "Tour du Quartier — site de démonstration",
  description: "Site de démonstration d'un magasin de vélos imaginaire, réalisé par Canevas Havane : t'as pas pédalé depuis combien de temps ? On commence sur le parking.",
  ...adressesDeLaPage("/exemples/tour-du-quartier"),
};

const ETAPES = [
  { n: "1", titre: "Le parking", texte: "Pas de voiture, personne qui regarde. On retrouve l'équilibre, les freins, le démarrage.", image: IMAGES.parking },
  { n: "2", titre: "La rue calme", texte: "Quand tu le décides, on sort derrière le magasin, sous les arbres.", image: IMAGES.rue },
  { n: "3", titre: "Le tour du quartier", texte: "Une boucle de deux kilomètres. Le jour où tu la fais seul·e, tu reviens nous le dire.", image: IMAGES.arbre },
];

export default function TourDuQuartier() {
  return (
    <div>
      {/* 1. L'ouverture : le nom au centre, les petits mots dans les coins, le plan du quartier. */}
      <section data-film="ouverture" className="mx-auto max-w-6xl px-5 pb-10 pt-6">
        <div className="flex justify-between gap-6 text-[13px] font-semibold leading-snug">
          <p className="max-w-[150px]">Magasin de vélos pour celles et ceux qui s&apos;y remettent</p>
          <p className="max-w-[130px] text-right">Pas de cuissard. Pas de chrono.</p>
        </div>
        <div className="mt-6 text-center">
          <h1 className="text-[60px] font-extrabold leading-[0.92] tracking-tight sm:text-[104px]">
            On commence <span className="relative inline-block"><span aria-hidden="true" className="absolute inset-x-[-6px] bottom-1 top-[45%] -z-0 rounded-full bg-[#F2C14E]" /><span className="relative">par là.</span></span>
          </h1>
        </div>
        <Quartier className="mx-auto mt-6 block h-auto w-full max-w-[460px]" />
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href={`${DOSSIER}#depuis`} className="flex min-h-14 items-center rounded-full bg-[var(--accent)] px-7 text-[17px] font-bold text-[var(--sur-accent)]">T&apos;as pas pédalé depuis combien ?</Link>
        </div>
      </section>

      {/* 2. La seule question. */}
      <section id="depuis" className="scroll-mt-16 bg-[#FCEFD3]">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:grid-cols-2 lg:items-center lg:py-20">
          <div className="space-y-4">
            <Pastille>Pas de catalogue</Pastille>
            <h2 data-film="question" className="text-[44px] font-extrabold leading-[0.98] tracking-tight sm:text-[64px]">
              T&apos;as pas pédalé depuis combien de temps&nbsp;?
            </h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">Une seule question. Glisse, et on te dit par où on commence.</p>
          </div>
          <Depuis />
        </div>
      </section>

      {/* 3. Le manifeste. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto max-w-6xl px-5 py-16 text-center lg:py-24">
          <p className="text-[52px] font-extrabold leading-[0.95] tracking-tight sm:text-[96px] [font-family:var(--titres)]">
            Pas de cuissard.<br /><span className="text-[#F2C14E]">Pas de chrono.</span>
          </p>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed">
            Les autres vendent de la vitesse. Ici, on vend le premier tour : celui qui fait sourire, et qui rassure.
          </p>
        </div>
      </section>

      {/* 4. La première heure. */}
      <section className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
        <Pastille couleur="#E3EFD9">La première heure</Pastille>
        <h2 className="mt-4 max-w-2xl text-[44px] font-extrabold leading-[0.98] tracking-tight sm:text-[60px]">Trois endroits, à ton rythme.</h2>
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {ETAPES.map((e) => (
            <li key={e.n} className="overflow-hidden rounded-[32px] bg-[var(--carte)]">
              <div className="relative aspect-[3/2]">
                <Image src={e.image.src} alt={e.image.alt} width={e.image.largeur} height={e.image.hauteur} sizes="(min-width: 768px) 360px, 100vw" className="h-full w-full object-cover" />
                <span className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-[#F2C14E] font-[family-name:var(--titres)] text-xl font-extrabold">{e.n}</span>
              </div>
              <div className="space-y-2 p-5">
                <h3 className="text-[26px] font-extrabold">{e.titre}</h3>
                <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
              </div>
            </li>
          ))}
        </ol>
        <Link href={`${DOSSIER}/premiere-heure`} className="mt-8 inline-flex min-h-14 items-center rounded-full bg-[#F2C14E] px-7 text-[17px] font-bold">Réserver ma première heure</Link>
      </section>

      {/* 5. L'équipe. */}
      <section className="bg-[var(--carte)]">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
          <h2 className="text-[40px] font-extrabold leading-[0.98] tracking-tight sm:text-[56px]">Ceux qui t&apos;attendent.</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {EQUIPE.map((m) => (
              <li key={m.prenom} className="flex items-center gap-4 rounded-[28px] bg-[var(--fond)] p-5">
                <span aria-hidden="true" className="grid h-16 w-16 shrink-0 place-items-center rounded-full font-[family-name:var(--titres)] text-2xl font-extrabold text-[#1F3A2C]" style={{ background: m.couleur === "#2E6B4F" ? "#E3EFD9" : m.couleur }}>
                  {m.prenom[0]}
                </span>
                <span>
                  <span className="block text-[24px] font-extrabold">{m.prenom}</span>
                  <span className="block leading-snug text-[var(--doux)]">{m.role}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[13px] text-[var(--doux)]">Équipe imaginaire : le magasin est fictif.</p>
        </div>
      </section>

      {/* 6. Les vélos. */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[1fr_1fr] lg:items-center lg:py-24">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[40px]">
          <Image src={IMAGES.mur.src} alt={IMAGES.mur.alt} width={IMAGES.mur.largeur} height={IMAGES.mur.hauteur} sizes="(min-width: 1024px) 540px, 100vw" className="h-full w-full object-cover" />
        </div>
        <div className="space-y-5">
          <Pastille couleur="#FCEFD3">Les vélos</Pastille>
          <h2 className="text-[40px] font-extrabold leading-[0.98] tracking-tight sm:text-[56px]">On prête avant de vendre.</h2>
          <ul className="space-y-3">
            {VELOS.map((v) => (
              <li key={v.nom} className="rounded-[24px] bg-[var(--carte)] p-5">
                <p className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <span className="text-[21px] font-extrabold">{v.nom}</span>
                  <span className="font-bold text-[var(--accent-texte)]">{v.prix} TTC</span>
                </p>
                <p className="mt-1 leading-relaxed text-[var(--doux)]">{v.texte}</p>
              </li>
            ))}
          </ul>
          <p className="text-[13px] text-[var(--doux)]">Prix d&apos;exemple. Aucune marque : le magasin est fictif.</p>
        </div>
      </section>

      {/* 7. La course de lenteur. */}
      <section className="bg-[#F2C14E]">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div className="space-y-4">
            <p className="text-[14px] font-bold uppercase tracking-[0.1em]">{COURSE.date} · {COURSE.heure} · {COURSE.lieu}</p>
            <h2 className="text-[48px] font-extrabold leading-[0.95] tracking-tight sm:text-[72px]">La course de lenteur.</h2>
            <p className="max-w-lg text-lg leading-relaxed">Le dernier arrivé gagne. Sans pied à terre, sans lot, sans podium : juste le droit de dire qu&apos;on a été le plus lent du quartier.</p>
          </div>
          <Link href={`${DOSSIER}/course-de-lenteur`} className="flex min-h-14 items-center justify-center rounded-full bg-[#1F3A2C] px-7 text-[17px] font-bold text-[#FFF8EC]">
            M&apos;inscrire, lentement
          </Link>
        </div>
      </section>

      {/* 8. Questions. */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:py-24">
        <h2 className="text-[40px] font-extrabold leading-[0.98] tracking-tight sm:text-[56px]">Les questions qu&apos;on n&apos;ose pas poser.</h2>
        <Faq />
      </section>

      {/* 9. Venir. */}
      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div className="flex flex-col gap-6 rounded-[40px] bg-[var(--sombre)] p-8 text-[var(--sur-sombre)] md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <h2 className="text-[40px] font-extrabold leading-[0.98] tracking-tight">Passe nous voir.</h2>
            <p className="leading-relaxed">{entreprise.adresse}<br />{entreprise.horaires}</p>
          </div>
          <a href={`tel:${entreprise.telephone.replace(/ /g, "")}`} className="flex min-h-14 items-center justify-center rounded-full bg-[#F2C14E] px-8 text-lg font-bold tabular-nums text-[#1F3A2C]">
            {entreprise.telephone}
          </a>
        </div>
      </section>
    </div>
  );
}
