import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { CONTACT, DOSSIER, PHOTOS, PLANTES } from "./_composants/donnees";
import { Faq, Niveaux, Surtitre } from "./_composants/Elements";
import { Commune } from "./_composants/Interactifs";

// Le site de la marque imaginée dans la vidéo « Si je devais créer une entreprise de
// paysagiste de zéro » : le jardin qui tient en août. Premier écran inspiré du modèle
// « Layered Depth » de MotionSites : un mot immense derrière l'image, une petite carte
// posée dessus.
export const metadata: Metadata = {
  title: "Vert en Août — site de démonstration",
  description:
    "Site de démonstration d'un paysagiste imaginaire, réalisé par Canevas Havane : tape ta commune, le site te montre les plantes adaptées à l'été chez toi.",
  ...adressesDeLaPage("/exemples/vert-en-aout"),
};

const ETAPES = [
  ["La visite", "En été, de préférence : on voit ce qui souffre, où le soleil tape, où l'eau ruisselle."],
  ["Le plan", "Des plantes qui ont peu soif, choisies pour ton sol et ton exposition. Le devis dit l'arrosage qu'il faudra."],
  ["La plantation", "À l'automne : les pluies font une partie du travail, les racines descendent avant l'été."],
  ["La première année", "On arrose l'été, profondément et rarement. Ensuite, seulement en cas de canicule."],
];

export default function VertEnAout() {
  return (
    <main>
      {/* Ouverture : le mot immense derrière l'image, la carte posée dessus. */}
      <section className="relative overflow-hidden px-5 pb-16 pt-8 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <Surtitre>Paysagiste · jardins secs</Surtitre>
          <h1 className="mt-4 max-w-3xl text-[38px] font-bold leading-[1.02] tracking-[-0.02em] sm:text-6xl">
            Le jardin qui tient en août.
          </h1>
          <div className="relative mt-8">
            <p aria-hidden="true" className="pointer-events-none select-none text-center font-[family-name:var(--titres)] text-[19vw] font-black leading-[0.8] tracking-[-0.04em] text-[#C9A35B] sm:text-[220px]">
              AOÛT
            </p>
            <div className="relative mx-auto -mt-[9vw] w-[86%] max-w-xl overflow-hidden rounded-[999px_999px_36px_36px] sm:-mt-28">
              <Image src={PHOTOS.jardinSec.src} alt={PHOTOS.jardinSec.alt} width={PHOTOS.jardinSec.largeur} height={PHOTOS.jardinSec.hauteur} priority sizes="(min-width: 640px) 576px, 86vw" className="h-[300px] w-full object-cover sm:h-[380px]" />
            </div>
            <div className="relative -mt-14 ml-auto w-[70%] max-w-[300px] rounded-[24px] bg-[var(--sombre)] p-4 text-[var(--sur-sombre)] shadow-[0_24px_40px_-24px_rgba(36,54,31,0.8)] sm:-mt-20 sm:mr-10">
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#E0B85C]">Arrosage restreint&nbsp;?</p>
              <p className="mt-1 font-[family-name:var(--titres)] text-[19px] font-bold leading-tight">Ce jardin a peu soif.</p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#commune" className="rounded-full bg-[var(--accent)] px-6 py-3.5 font-bold text-[var(--sur-accent)]">Tape ta commune</a>
            <Link href={`${DOSSIER}/devis`} className="rounded-full border-2 border-[var(--encre)] px-6 py-3 font-bold">Voir un devis</Link>
          </div>
        </div>
      </section>

      {/* Le contre-pied : la photo d'avril, la pelouse d'août. */}
      <section className="bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 md:grid-cols-2 md:items-center">
          <div className="space-y-5">
            <Surtitre>Pourquoi août</Surtitre>
            <h2 className="text-[32px] font-bold leading-[1.05] sm:text-5xl">Tout le monde montre son jardin en avril.</h2>
            <p className="text-[18px] leading-relaxed text-[var(--doux)]">
              Une pelouse bien verte, photographiée au printemps. En été, l&apos;arrosage peut être restreint, et la
              pelouse devient jaune paille. Nous, on préfère qu&apos;on juge nos jardins le 15 août.
            </p>
          </div>
          <figure className="space-y-2">
            <div className="overflow-hidden rounded-[30px]">
              <Image src={PHOTOS.paille.src} alt={PHOTOS.paille.alt} width={PHOTOS.paille.largeur} height={PHOTOS.paille.hauteur} sizes="(min-width: 768px) 540px, 92vw" className="h-auto w-full" />
            </div>
            <figcaption className="text-[14px] text-[var(--doux)]">Une pelouse, un mois d&apos;août sans pluie.</figcaption>
          </figure>
        </div>
      </section>

      {/* L'outil de la vidéo : la commune. */}
      <section id="commune" className="scroll-mt-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 md:grid-cols-[0.85fr_1.15fr] md:items-start">
          <div className="space-y-5 md:sticky md:top-28">
            <Surtitre>Chez toi, l&apos;été</Surtitre>
            <h2 className="text-[32px] font-bold leading-[1.05] sm:text-5xl">Tape ta commune.</h2>
            <p className="text-[18px] leading-relaxed text-[var(--doux)]">
              Le site te montre les plantes adaptées à l&apos;été chez toi, selon ton sol et ton exposition. Avec,
              pour chacune, l&apos;arrosage qu&apos;il lui faudra.
            </p>
          </div>
          <Commune />
        </div>
      </section>

      {/* L'eau, l'été : des restrictions graduées. */}
      <section id="restrictions" className="scroll-mt-24 bg-[#E7D7B4]">
        <div className="mx-auto max-w-6xl space-y-8 px-5 py-20 sm:px-8">
          <div className="max-w-2xl space-y-5">
            <Surtitre>L&apos;eau, l&apos;été</Surtitre>
            <h2 className="text-[32px] font-bold leading-[1.05] sm:text-5xl">Arrosage restreint&nbsp;? Ce jardin a peu soif.</h2>
            <p className="text-[18px] leading-relaxed">
              En été, le préfet peut restreindre l&apos;arrosage. Les restrictions sont graduées : ce qui est permis
              chez toi, c&apos;est l&apos;arrêté de ton département qui le dit — sur la plateforme officielle VigiEau,
              ou en mairie.
            </p>
          </div>
          <Niveaux />
          <p className="text-[14px] text-[#4A4C36]">D&apos;après service-public.gouv.fr, « Êtes-vous concerné par des restrictions d&apos;eau ? », 7 juillet 2026.</p>
        </div>
      </section>

      {/* Le devis. */}
      <section>
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 md:grid-cols-2 md:items-center">
          <div className="space-y-5">
            <Surtitre>Sur chaque devis</Surtitre>
            <h2 className="text-[32px] font-bold leading-[1.05] sm:text-5xl">Une ligne que personne ne met.</h2>
            <p className="text-[18px] leading-relaxed text-[var(--doux)]">
              L&apos;arrosage qu&apos;il faudra, l&apos;été. Combien de temps, à quel rythme, jusqu&apos;à quand. Pour que tu
              saches, avant de signer, ce que ton jardin te demandera.
            </p>
            <Link href={`${DOSSIER}/devis`} className="inline-block rounded-full bg-[var(--accent)] px-6 py-3.5 font-bold text-[var(--sur-accent)]">Voir un devis</Link>
          </div>
          <div className="overflow-hidden rounded-[30px]">
            <Image src={PHOTOS.pots.src} alt={PHOTOS.pots.alt} width={PHOTOS.pots.largeur} height={PHOTOS.pots.hauteur} sizes="(min-width: 768px) 540px, 92vw" className="h-auto w-full" />
          </div>
        </div>
      </section>

      {/* Les plantes. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto max-w-6xl space-y-10 px-5 py-20 sm:px-8">
          <Surtitre clair>Notre palette</Surtitre>
          <h2 className="text-[32px] font-bold leading-[1.05] sm:text-5xl">Des plantes qui ont peu soif.</h2>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {PLANTES.map((p) => (
              <li key={p.nom} className="rounded-[20px] bg-[#2F4A2C] p-4">
                <span aria-hidden="true" className="block h-10 w-10 rounded-full" style={{ background: `radial-gradient(circle at 35% 35%, #fff6, transparent 60%), ${p.teinte}` }} />
                <p className="mt-3 text-[16px] font-bold leading-tight">{p.nom}</p>
                <p className="text-[13px] italic text-[#D6DCC8]">{p.latin}</p>
                <p className="mt-1 text-[13px] text-[#D6DCC8]">{p.fleurs}</p>
              </li>
            ))}
          </ul>
          <p className="text-[14px] text-[#D6DCC8]">Toutes demandent un arrosage la première année, le temps de s&apos;installer.</p>
        </div>
      </section>

      {/* Le 15 août. */}
      <section>
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 md:grid-cols-2 md:items-center">
          <div className="overflow-hidden rounded-[30px] md:order-2">
            <Image src={PHOTOS.allee.src} alt={PHOTOS.allee.alt} width={PHOTOS.allee.largeur} height={PHOTOS.allee.hauteur} sizes="(min-width: 768px) 540px, 92vw" className="h-auto w-full" />
          </div>
          <div className="space-y-5">
            <Surtitre>Chaque 15 août</Surtitre>
            <h2 className="text-[32px] font-bold leading-[1.05] sm:text-5xl">L&apos;album, sans retouche.</h2>
            <p className="text-[18px] leading-relaxed text-[var(--doux)]">
              Le jour le plus dur de l&apos;année pour un jardin, on publie nos jardins, avec l&apos;accord de leurs
              propriétaires. Sans retouche, même ceux qui ont souffert.
            </p>
            <Link href={`${DOSSIER}/15-aout`} className="inline-block rounded-full border-2 border-[var(--encre)] px-6 py-3 font-bold">Le principe de l&apos;album</Link>
            <p className="text-[13px] text-[var(--doux)]">Photo d&apos;illustration : ce n&apos;est pas un jardin de Vert en Août.</p>
          </div>
        </div>
      </section>

      {/* La méthode. */}
      <section className="bg-[var(--carte)]">
        <div className="mx-auto max-w-6xl space-y-10 px-5 py-20 sm:px-8">
          <h2 className="text-[32px] font-bold leading-[1.05] sm:text-5xl">De la visite au 15 août.</h2>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ETAPES.map(([t, d], i) => (
              <li key={t} className="space-y-2 rounded-[22px] border border-[var(--trait)] bg-[var(--fond)] p-6">
                <p className="font-[family-name:var(--titres)] text-[34px] font-black text-[var(--accent-texte)]">{i + 1}</p>
                <h3 className="text-[20px] font-bold">{t}</h3>
                <p className="leading-relaxed text-[var(--doux)]">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Questions. */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 md:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          <Surtitre>Questions</Surtitre>
          <h2 className="text-[32px] font-bold leading-[1.05] sm:text-5xl">Avant la visite.</h2>
        </div>
        <Faq />
      </section>

      {/* Nous appeler. */}
      <section id="contact" className="scroll-mt-24 bg-[#E7D7B4]">
        <div className="mx-auto max-w-3xl space-y-4 px-5 py-20 text-center sm:px-8">
          <Surtitre>Nous appeler</Surtitre>
          <h2 className="text-[32px] font-bold leading-[1.05] sm:text-5xl">Une visite, plutôt en été.</h2>
          <p className="text-[18px]">{CONTACT.adresse}</p>
          <p className="text-[18px]">{CONTACT.zone}</p>
          <p className="font-[family-name:var(--titres)] text-[28px] font-bold">{CONTACT.telephone}</p>
        </div>
      </section>
    </main>
  );
}
