import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { CARNET_AU, CONTACT, DOSSIER, ETATS, LOTS, PHOTOS, RECETTES } from "./_composants/donnees";
import { Coins, Etiquette, Faq, Technique } from "./_composants/Elements";
import { RechercheLot, ReserverLot } from "./_composants/Interactifs";

// Le site imaginé dans la vidéo « Si je devais remplir le carnet de commandes d'une
// savonnerie » : la page d'accueil, c'est le numéro de lot. Aucune promesse sur la
// peau : on montre tout. Premier écran inspiré du modèle « Nature Ritual » de
// MotionSites (titre éclaté aux coins d'un cadre, petites lignes techniques).
export const metadata: Metadata = {
  title: "La Coulée — site de démonstration",
  description:
    "Site de démonstration d'une savonnerie imaginaire, réalisé par Canevas Havane : tape le numéro de lot de ton savon, tu vois le jour où il a été coulé et ses ingrédients.",
  ...adressesDeLaPage("/exemples/la-coulee"),
};

const ETAPES = [
  ["Couler", "Les huiles et la soude, mélangées sans chauffer, versées dans un moule. Un lot, un numéro."],
  ["Couper", "Le lendemain, le bloc est démoulé et coupé en 96 savons de 100 g."],
  ["Sécher", "Cinq semaines sur les claies du séchoir. Le savon durcit et perd son eau : c'est la cure."],
  ["Sortir", "Un mercredi sur deux, un lot sort du séchoir et part en ligne. Quand il est vendu, il est vendu."],
];

export default function LaCoulee() {
  const aVenir = LOTS.filter((l) => l.etat !== "epuise");
  return (
    <main>
      {/* La page d'accueil de la vidéo : le numéro de lot. */}
      <section id="lot" className="scroll-mt-20 mx-auto max-w-6xl px-4 pb-14 pt-6 sm:px-8">
        <div className="relative px-4 py-6 sm:px-10 sm:py-10">
          <Coins />
          <div className="flex justify-between gap-4">
            <Technique>Savonnerie · coulé à froid</Technique>
            <Technique>Carnet au {CARNET_AU}</Technique>
          </div>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="space-y-6">
              <h1 className="text-[56px] font-bold uppercase leading-[0.9] tracking-[-0.035em] sm:text-[96px]">
                <span className="block">Ton savon</span>
                <span className="block text-right text-[var(--accent-texte)] lg:text-left">a un</span>
                <span className="block">numéro.</span>
              </h1>
              <p className="max-w-md text-[19px] leading-relaxed">
                Tape-le : tu vois le jour où ton savon a été coulé, quand il est sorti du séchoir, et ce qu&apos;il y a dedans.
              </p>
            </div>
            <RechercheLot />
          </div>
        </div>
      </section>

      {/* Une image, le rang des savons. */}
      <section aria-label="Les savons" className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="relative overflow-hidden rounded-[6px]">
          <Image src={PHOTOS.rang.src} alt={PHOTOS.rang.alt} width={PHOTOS.rang.largeur} height={PHOTOS.rang.hauteur} sizes="(min-width: 1152px) 1088px, 94vw" className="h-[220px] w-full object-cover sm:h-[360px]" priority />
        </div>
        <div className="mt-3 flex justify-between gap-4">
          <Technique>Lots 045 à 050</Technique>
          <Technique>96 savons par lot</Technique>
        </div>
      </section>

      {/* Le numéro de lot : une obligation, devenue une porte d'entrée. */}
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-8 md:grid-cols-2 md:items-center">
        <div className="space-y-5">
          <Technique>Règl. (CE) n° 1223/2009, art. 19</Technique>
          <h2 className="text-[42px] font-bold uppercase leading-[0.95] tracking-[-0.03em] sm:text-6xl">Sur chaque savon, un numéro de lot.</h2>
          <p className="text-[19px] leading-relaxed">
            C&apos;est obligatoire, sur tous les cosmétiques, comme la liste des ingrédients et la date de durabilité.
            Ici, il sert aussi à autre chose : retrouver l&apos;histoire de ton savon.
          </p>
          <a href="#lot" className="inline-block rounded-[6px] border-2 border-[var(--encre)] px-5 py-3 font-mono text-[13px] font-bold uppercase tracking-[0.12em]">Taper mon numéro</a>
        </div>
        <Etiquette lot={LOTS[2]} />
      </section>

      {/* Le prochain lot, et le séchoir. */}
      <section id="prochain" className="scroll-mt-20 border-y border-[var(--encre)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-8 md:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5">
            <Technique>Le séchoir</Technique>
            <h2 className="text-[42px] font-bold uppercase leading-[0.95] tracking-[-0.03em] sm:text-6xl">Chaque lot a sa date de sortie.</h2>
            <p className="text-[19px] leading-relaxed">
              Un savon coulé à froid sèche cinq semaines avant d&apos;être vendu. Tu sais donc, à la semaine près, quand
              le tien sera prêt.
            </p>
            <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
              {aVenir.map((l) => (
                <li key={l.numero} className="flex items-baseline justify-between gap-4 py-3">
                  <span className="font-mono text-[15px] font-bold">Lot {l.numero}</span>
                  <span className="flex-1 text-[16px]">{RECETTES[l.recette].nom}</span>
                  <span className="font-mono text-[13px] uppercase">{l.sortieCourte} · {ETATS[l.etat]}</span>
                </li>
              ))}
            </ul>
            <Link href={`${DOSSIER}/sechoir`} className="inline-block font-mono text-[13px] font-bold uppercase tracking-[0.12em] underline underline-offset-4">Voir tout le séchoir</Link>
          </div>
          <ReserverLot />
        </div>
      </section>

      {/* Un mercredi sur deux. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-8">
          <Technique clair>Le rendez-vous</Technique>
          <p className="mt-5 text-[46px] font-[family-name:var(--titres)] font-bold uppercase leading-[0.95] tracking-[-0.03em] sm:text-7xl">
            Un mercredi sur deux, un lot sort du séchoir.
          </p>
          <ol className="mt-10 grid grid-cols-2 gap-px bg-[#55525F] sm:grid-cols-4">
            {LOTS.slice(2).map((l) => (
              <li key={l.numero} className="bg-[var(--sombre)] p-4">
                <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-[#C9BEE3]">{l.sortie.replace("mercredi ", "Mer. ")}{l.etat === "epuise" ? " · sorti" : ""}</p>
                <p className="mt-1 font-[family-name:var(--titres)] text-[28px] font-bold">Lot {l.numero}</p>
                <p className="text-[15px]">{RECETTES[l.recette].nom}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-[15px] text-[#C9BEE3]">Dates d&apos;exemple. L&apos;atelier est ouvert ces mercredis-là, l&apos;après-midi.</p>
        </div>
      </section>

      {/* Saponifié à froid, c'est quoi ? */}
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-8 md:grid-cols-2 md:items-center">
        <div className="relative overflow-hidden rounded-[6px]">
          <Image src={PHOTOS.cure.src} alt={PHOTOS.cure.alt} width={PHOTOS.cure.largeur} height={PHOTOS.cure.hauteur} sizes="(min-width: 768px) 540px, 94vw" className="h-auto w-full" />
        </div>
        <div className="space-y-5">
          <Technique>La question qu&apos;on nous pose</Technique>
          <h2 className="text-[42px] font-bold uppercase leading-[0.95] tracking-[-0.03em] sm:text-6xl">Saponifié à froid, c&apos;est quoi&nbsp;?</h2>
          <p className="text-[19px] leading-relaxed">
            Des huiles et de la soude, mélangées sans les chauffer. Elles se transforment en savon, puis le savon sèche
            des semaines. La réponse complète, étape par étape.
          </p>
          <Link href={`${DOSSIER}/saponifie-a-froid`} className="inline-block rounded-[6px] bg-[var(--accent)] px-5 py-3 font-mono text-[13px] font-bold uppercase tracking-[0.12em] text-[var(--sur-accent)]">Lire la réponse</Link>
        </div>
      </section>

      {/* Les trois recettes. */}
      <section className="border-t border-[var(--encre)]">
        <div className="mx-auto max-w-6xl space-y-10 px-4 py-20 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-[42px] font-bold uppercase leading-[0.95] tracking-[-0.03em] sm:text-6xl">Trois recettes.</h2>
            <Link href={`${DOSSIER}/savons`} className="font-mono text-[13px] font-bold uppercase tracking-[0.12em] underline underline-offset-4">Les étiquettes complètes</Link>
          </div>
          <ul className="grid gap-4 md:grid-cols-3">
            {Object.values(RECETTES).map((r, i) => (
              <li key={r.id} className="relative space-y-3 p-6" style={{ background: r.teinte }}>
                <Coins />
                <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-[#4E4A5B]">Recette 0{i + 1}</p>
                <h3 className="text-[28px] font-bold">{r.nom}</h3>
                <p className="text-[17px]">{r.phrase}</p>
                <p className="text-[14px] leading-snug text-[#3E3B48]"><span className="font-semibold">Ingredients :</span> {r.inci}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Ce qu'on ne promet pas. */}
      <section className="bg-[#E4DCF0]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-20 sm:px-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <p className="font-[family-name:var(--titres)] text-[38px] font-bold uppercase leading-[0.98] tracking-[-0.03em] sm:text-6xl">
            Aucune promesse sur ta peau. On montre tout.
          </p>
          <p className="text-[19px] leading-relaxed">
            La date de coulée, la recette, la taille du lot, la date de sortie. Ce qu&apos;un savon fait ou ne fait pas sur
            une peau, on te laisse en juger : nous, on te dit ce qu&apos;il y a dedans.
          </p>
        </div>
      </section>

      {/* La méthode. */}
      <section className="mx-auto max-w-6xl space-y-10 px-4 py-20 sm:px-8">
        <h2 className="text-[42px] font-bold uppercase leading-[0.95] tracking-[-0.03em] sm:text-6xl">Quatre étapes, cinq semaines.</h2>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ETAPES.map(([t, d], i) => (
            <li key={t} className="relative space-y-2 p-6">
              <Coins couleur="var(--doux)" />
              <p className="font-mono text-[13px] text-[var(--doux)]">0{i + 1}</p>
              <h3 className="text-[26px] font-bold uppercase">{t}</h3>
              <p className="text-[17px] leading-relaxed">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Questions. */}
      <section className="mx-auto grid max-w-6xl gap-10 px-4 pb-20 sm:px-8 md:grid-cols-[0.8fr_1.2fr]">
        <h2 className="text-[42px] font-bold uppercase leading-[0.95] tracking-[-0.03em] sm:text-6xl">Questions.</h2>
        <Faq />
      </section>

      {/* L'atelier. */}
      <section id="atelier" className="scroll-mt-20 border-t border-[var(--encre)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-8 md:grid-cols-2 md:items-center">
          <div className="space-y-5">
            <Technique>L&apos;atelier</Technique>
            <h2 className="text-[42px] font-bold uppercase leading-[0.95] tracking-[-0.03em] sm:text-6xl">Viens chercher ton lot.</h2>
            <p className="text-[19px] leading-relaxed">{CONTACT.horaires}.</p>
            <p className="text-[19px]">{CONTACT.adresse}</p>
            <p className="font-mono text-[20px] font-bold">{CONTACT.telephone}</p>
          </div>
          <div className="relative overflow-hidden rounded-[6px]">
            <Image src={PHOTOS.deux.src} alt={PHOTOS.deux.alt} width={PHOTOS.deux.largeur} height={PHOTOS.deux.hauteur} sizes="(min-width: 768px) 540px, 94vw" className="h-auto w-full" />
          </div>
        </div>
      </section>
    </main>
  );
}
