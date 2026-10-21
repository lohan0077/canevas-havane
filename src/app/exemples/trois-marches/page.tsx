import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { CarteMaison, Intitule, Marches, Section } from "./_composants/Blocs";
import Gravure from "./_composants/Gravure";
import Raconter from "./_composants/Raconter";
import { DOSSIER, MAISONS, QUESTIONS, TRANCHES, agence, photos, pourcent } from "./_composants/donnees";

// L'accueil de Trois Marches. Les idées de la vidéo, en état de marche : on ne vend pas
// des mètres carrés, on vend ce qu'on y a vécu ; chaque annonce commence par l'histoire
// de la maison, et garde juste en dessous ce que la loi impose ; à chaque vente, la
// dernière photo de famille sur le perron, offerte et tirée sur papier.
export const metadata: Metadata = {
  title: "Trois Marches — site de démonstration",
  description: "Site de démonstration d'une agence immobilière imaginaire, réalisé par Canevas Havane : chaque annonce commence par l'histoire de la maison, et chaque vente finit par la dernière photo, sur le perron.",
  ...adressesDeLaPage("/exemples/trois-marches"),
};

const REGLE = [
  { titre: "Le prix, honoraires inclus", texte: "En plus gros que le prix hors honoraires. C'est ce que paie l'acquéreur, alors c'est ce qu'on lit d'abord." },
  { titre: "Nos honoraires, en pourcentage", texte: "«\u00A0Honoraires : 4\u00A0% TTC à la charge de l'acquéreur\u00A0». Qui paie, et combien, sur chaque annonce." },
  { titre: "Le barème, à un clic", texte: "Nos prix maximums, toutes taxes comprises, accessibles depuis chaque annonce et affichés en vitrine." },
  { titre: "L'énergie, en couleur", texte: "Les classes énergie et climat, et les dépenses d'énergie estimées. Même quand la maison est en E." },
];

const METHODE = [
  { titre: "Une visite, une heure", texte: "On regarde la maison avec vous. Puis un avis de valeur écrit, à 0 €." },
  { titre: "Son histoire, si vous voulez", texte: "Quelques souvenirs, vos mots, votre prénom. Relus et signés par vous avant la mise en ligne." },
  { titre: "Les visites", texte: "Les visiteurs lisent l'histoire avant de venir. Ils viennent pour une maison, pas pour des m²." },
  { titre: "La dernière photo", texte: "Le jour de votre choix, sur le perron. Tirée sur papier, et jamais publiée." },
];

export default function TroisMarches() {
  return (
    <>
      <section className="border-b border-[var(--trait)]">
        <div className="mx-auto max-w-5xl px-5 pb-16 pt-12 text-center sm:px-8 sm:pt-16">
          <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-[var(--accent-texte)]">Agence immobilière · Lyon</p>
          <h1 className="mx-auto mt-6 max-w-3xl text-[50px] font-normal leading-[0.98] tracking-[-0.015em] sm:text-[88px]">
            Chaque maison a <span className="italic">son histoire.</span>
          </h1>
          <Gravure id="tm-accueil" className="mx-auto mt-8 w-full max-w-[560px] text-[var(--encre)]" />
          <p className="mx-auto mt-6 max-w-xl text-[18px] leading-relaxed text-[var(--doux)]">
            On ne vend pas des mètres carrés. On raconte ce qu&apos;on y a vécu, et à chaque vente, on
            prend la dernière photo de famille, devant la maison.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href={`${DOSSIER}#maisons`} className="flex h-14 w-full items-center justify-center bg-[var(--encre)] px-8 text-[14px] font-semibold uppercase tracking-[0.18em] text-[var(--fond)] sm:w-auto">
              Lire les maisons
            </Link>
            <Link href={`${DOSSIER}#raconter`} className="flex h-14 w-full items-center justify-center border border-[var(--encre)] px-8 text-[14px] font-semibold uppercase tracking-[0.18em] sm:w-auto">
              Raconter la mienne
            </Link>
          </div>
        </div>
      </section>

      <Section className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image src={photos.velo.src} alt={photos.velo.alt} fill sizes="(min-width: 1024px) 540px, 100vw" className="object-cover" />
        </div>
        <div className="space-y-6">
          <Intitule gauche surtitre="L'histoire d'abord" titre={<>Une annonce commence par <span className="italic">ceux qui y ont vécu.</span></>} />
          <blockquote className="border-l-2 border-[var(--accent)] pl-5">
            <p className="font-[family-name:var(--f-caveat)] text-[34px] leading-[1.15]">«&nbsp;Ici, nos trois enfants ont appris le vélo, dans l&apos;allée.&nbsp;»</p>
            <footer className="mt-2 text-[15px] text-[var(--doux)]">Claire, qui vend la maison · exemple</footer>
          </blockquote>
          <p className="text-[17px] leading-relaxed text-[var(--doux)]">
            Avant la surface et le nombre de chambres : un souvenir, raconté par ceux qui partent. Des
            souvenirs seulement ; l&apos;état de la maison, c&apos;est notre travail et celui des diagnostics.
          </p>
          <Link href={`${DOSSIER}/maisons/maison-5-pieces`} className="inline-block text-[14px] font-semibold uppercase tracking-[0.18em] underline decoration-[var(--accent)] underline-offset-8">
            Lire l&apos;histoire de cette maison
          </Link>
        </div>
      </Section>

      <Section id="maisons" fondu className="space-y-12">
        <Intitule surtitre="Les maisons" titre={<>Trois maisons, <span className="italic">trois histoires.</span></>}>
          Puis, juste en dessous, ce que la loi impose : le prix honoraires inclus en plus gros, nos
          honoraires, le barème, l&apos;énergie.
        </Intitule>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {MAISONS.map((m) => (
            <li key={m.slug}>
              <CarteMaison maison={m} />
            </li>
          ))}
        </ul>
        <p className="text-center text-[14px] text-[var(--doux)]">Annonces d&apos;exemple : l&apos;agence est fictive, les maisons et leurs histoires aussi. Aucune adresse n&apos;est donnée.</p>
      </Section>

      <Section className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="relative mx-auto w-full max-w-[380px] rotate-[-3deg] bg-[var(--carte)] p-4 pb-16 shadow-[0_24px_50px_rgba(62,58,54,0.18)]">
          <div className="relative aspect-[3/4]">
            <Image src={photos.perron.src} alt={photos.perron.alt} fill sizes="380px" className="object-cover" />
          </div>
          <p className="absolute bottom-4 left-0 right-0 text-center font-[family-name:var(--f-caveat)] text-[26px]">Le perron · le dernier matin</p>
        </div>
        <div className="space-y-6">
          <Intitule gauche surtitre="La dernière photo" titre={<>Avant de partir, <span className="italic">on vous prend en photo.</span></>}>
            À chaque vente, une séance sur le perron, le jour de votre choix, et la photo tirée sur
            papier. Offerte, sans surcoût. Seulement si chacun est d&apos;accord, par écrit, et jamais
            publiée : elle est à vous.
          </Intitule>
          <Link href={`${DOSSIER}/la-derniere-photo`} className="inline-flex h-14 items-center bg-[var(--accent)] px-8 text-[14px] font-semibold uppercase tracking-[0.18em] text-[var(--sur-accent)]">
            Choisir le moment
          </Link>
        </div>
      </Section>

      <Section id="raconter" fondu className="space-y-12">
        <Intitule surtitre="Vous vendez" titre={<>Raconte <span className="italic">ta maison.</span></>}>
          Un souvenir, ton prénom, depuis quand tu y vis : voilà comment ton annonce commencerait.
        </Intitule>
        <Raconter />
      </Section>

      <Section className="space-y-12">
        <Intitule surtitre="Ça, c'est la loi" titre={<>Juste en dessous, <span className="italic">ce qui est dû.</span></>}>
          L&apos;histoire ne remplace rien. Chaque annonce garde tout ce que la loi impose, à la même place.
        </Intitule>
        <ol className="grid gap-px border border-[var(--trait)] bg-[var(--trait)] sm:grid-cols-2">
          {REGLE.map((r, i) => (
            <li key={r.titre} className="space-y-2 bg-[var(--fond)] p-7">
              <p className="font-[family-name:var(--titres)] text-[15px] italic text-[var(--accent-texte)]">{["I", "II", "III", "IV"][i]}.</p>
              <h3 className="text-[26px] font-normal">{r.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{r.texte}</p>
            </li>
          ))}
        </ol>
        <p className="text-center text-[14px] text-[var(--doux)]">Arrêté du 10 janvier 2017, art. 2 et 3 ; loi n° 70-9, art. 6-1 ; code de la construction et de l&apos;habitation, art.&nbsp;<span className="whitespace-nowrap">L126-33</span>.</p>
      </Section>

      <Section className="grid gap-10 border-t border-[var(--trait)] lg:grid-cols-2 lg:items-start">
        <Intitule gauche surtitre="Le barème" titre={<>Nos honoraires, <span className="italic">au maximum.</span></>}>
          Toutes taxes comprises, à la charge de l&apos;acquéreur. Le montant exact est écrit dans le
          mandat et ne dépasse jamais ces taux.
        </Intitule>
        <div className="space-y-4">
          <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {TRANCHES.map((t) => (
              <li key={t.libelle} className="flex items-baseline justify-between gap-4 py-4">
                <span className="text-[16px]">{t.libelle}</span>
                <span className="font-[family-name:var(--titres)] text-[30px] tabular-nums">{pourcent(t.taux)}</span>
              </li>
            ))}
          </ul>
          <Link href={`${DOSSIER}/bareme`} className="inline-block text-[14px] font-semibold uppercase tracking-[0.18em] underline decoration-[var(--accent)] underline-offset-8">
            Le barème complet
          </Link>
        </div>
      </Section>

      <Section fondu className="space-y-12">
        <Intitule surtitre="Comment on vend" titre={<>Quatre temps, <span className="italic">pas plus.</span></>} />
        <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {METHODE.map((m, i) => (
            <li key={m.titre} className="space-y-3 border-t border-[var(--encre)] pt-5">
              <p className="font-[family-name:var(--titres)] text-[44px] leading-none">{i + 1}</p>
              <h3 className="text-[24px] font-normal">{m.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{m.texte}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="questions" className="mx-auto max-w-3xl space-y-10">
        <Intitule surtitre="Questions" titre={<>Ce qu&apos;on nous <span className="italic">demande.</span></>} />
        <div className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
          {QUESTIONS.map((q) => (
            <details key={q.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-[family-name:var(--titres)] text-[24px] leading-snug">
                {q.q}
                <span aria-hidden="true" className="mt-1 text-[var(--accent-texte)] transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-[17px] leading-relaxed text-[var(--doux)]">{q.r}</p>
            </details>
          ))}
        </div>
      </Section>

      <section className="border-t border-[var(--trait)]">
        <div className="mx-auto max-w-3xl space-y-6 px-5 py-20 text-center sm:px-8">
          <Marches className="mx-auto h-5 w-11 text-[var(--accent)]" />
          <h2 className="text-[44px] font-normal leading-none sm:text-[64px]">
            Une agence ne vend pas des murs. <span className="italic">Elle vend ce qu&apos;on y a vécu.</span>
          </h2>
          <a href={`tel:${agence.telephone.replace(/ /g, "")}`} className="inline-flex h-14 items-center bg-[var(--encre)] px-8 text-[14px] font-semibold uppercase tracking-[0.18em] text-[var(--fond)]">
            Nous appeler : {agence.telephone}
          </a>
          <p className="text-[14px] text-[var(--doux)]">Numéro de fiction : il ne sonne chez personne.</p>
        </div>
      </section>
    </>
  );
}
