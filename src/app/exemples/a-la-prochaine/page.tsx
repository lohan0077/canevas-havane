import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Anneau from "./_composants/Anneau";
import Registre from "./_composants/Registre";
import { CarteBijou, Faq, Libelle } from "./_composants/Blocs";
import { BIJOUX, DOSSIER, IMAGES, entreprise } from "./_composants/donnees";

export const metadata: Metadata = {
  title: "À la Prochaine — site de démonstration",
  description: "Site de démonstration d'une marque de bijoux imaginaire, réalisé par Canevas Havane : chaque bijou est gravé d'un numéro, et ce numéro a sa page.",
  ...adressesDeLaPage("/exemples/a-la-prochaine"),
};

const ETAPES = [
  { n: "I", titre: "Tu le portes", texte: "Ton prénom et l'année ouvrent sa page. Le premier nom, c'est le tien." },
  { n: "II", titre: "Tu le donnes", texte: "À ta fille, à ton filleul, à une amie. Le jour où tu veux, à qui tu veux." },
  { n: "III", titre: "La ligne suivante s'écrit", texte: "La personne qui le reçoit ajoute son prénom sous le tien, avec votre accord à tous les deux." },
];

const REPONSES = [
  { texte: "La bague de sa grand-mère", detail: "portée depuis le lycée" },
  { texte: "La gourmette de son baptême", detail: "agrandie deux fois" },
  { texte: "Une médaille sans nom", detail: "trouvée dans une boîte à bijoux" },
];

const PROMESSES = [
  { titre: "Un prénom, une année", texte: "Rien d'autre au registre : ni nom de famille, ni ville, ni photo." },
  { titre: "Une ligne qui s'efface", texte: "Chacun peut faire retirer la sienne, à tout moment, sans se justifier." },
  { titre: "Une taille à chaque passage", texte: "La mise à taille pour la personne suivante est faite à la boutique, sans frais." },
  { titre: "L'or, poinçonné", texte: "Le numéro s'ajoute aux poinçons que la loi impose ; il ne les remplace pas." },
];

export default function ALaProchaine() {
  return (
    <div>
      {/* 1. L'ouverture : le titre immense, coupé par l'anneau. */}
      <section data-film="ouverture" className="relative overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-5 pb-14 pt-10 text-center lg:pb-20">
          <Libelle clair>Bijoux en or · gravés d&apos;un numéro</Libelle>
          <h1 className="relative mt-6 text-[88px] leading-[0.92] sm:text-[140px] lg:text-[180px]">
            <span className="relative z-10 block">À toi.</span>
            <span aria-hidden="true" className="relative z-0 mx-auto -my-4 block w-[230px] sm:-my-8 sm:w-[340px]">
              <Anneau id="ouverture" className="w-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.45)]" />
            </span>
            <em className="relative z-10 block text-[64px] sm:text-[110px] lg:text-[140px]">Pour l&apos;instant.</em>
          </h1>
          <p className="mt-8 max-w-md text-lg leading-relaxed">
            Chaque bijou est gravé d&apos;un numéro, et ce numéro a sa page. Le premier nom, c&apos;est le tien. La suite viendra.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={`${DOSSIER}#registre`} className="flex min-h-12 items-center rounded-full bg-[#C9A86A] px-7 text-[13px] font-semibold uppercase tracking-[0.18em] text-[var(--sombre)]">
              Chercher un numéro
            </Link>
            <Link href={`${DOSSIER}/bijoux`} className="flex min-h-12 items-center rounded-full border border-[var(--sur-sombre)] px-7 text-[13px] font-semibold uppercase tracking-[0.18em]">
              Les bijoux
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Le contre-pied. */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:items-center lg:py-24">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image src={IMAGES.baguePortee.src} alt={IMAGES.baguePortee.alt} width={IMAGES.baguePortee.largeur} height={IMAGES.baguePortee.hauteur} sizes="(min-width: 768px) 540px, 100vw" className="h-full w-full object-cover" />
        </div>
        <div className="space-y-5">
          <Libelle>Ce qu&apos;on vend</Libelle>
          <h2 className="text-5xl sm:text-6xl">
            Pas un bijou pour toi. <em>Celui qu&apos;on portera après toi.</em>
          </h2>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Un bijou qui a une histoire, personne ne le jette. On le passe. Alors on les fait pour ça : en or plein, assez épais pour être retaillés, et numérotés pour qu&apos;on se souvienne de qui les a portés.
          </p>
        </div>
      </section>

      {/* 3. Le numéro gravé. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:items-center lg:py-24">
          <Anneau id="grave" titre="Un anneau d'or vu de face ; à l'intérieur, gravé : N° 0112 · À la prochaine" className="mx-auto w-full max-w-[420px]" />
          <div className="space-y-5">
            <Libelle clair>Le numéro</Libelle>
            <h2 className="text-5xl sm:text-6xl">
              Gravé à l&apos;intérieur. <em>Là où personne ne le voit.</em>
            </h2>
            <p className="text-lg leading-relaxed">
              Quatre chiffres, dans l&apos;anneau, au dos de la plaque ou sur le fermoir. Ils ne disent rien à personne. Sauf au site.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Le registre. */}
      <section id="registre" className="mx-auto grid max-w-6xl scroll-mt-16 gap-10 px-5 py-16 md:grid-cols-[0.9fr_1.1fr] lg:py-24">
        <div className="space-y-5">
          <Libelle>Le registre</Libelle>
          <h2 className="text-5xl sm:text-6xl">
            Ce numéro a <em>sa page.</em>
          </h2>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Tape les quatre chiffres gravés dans ton bijou. Sa page s&apos;ouvre : le premier nom, puis les suivants. Et en dessous, une ligne vide.
          </p>
          <Link href={`${DOSSIER}/registre`} className="inline-block text-[13px] font-semibold uppercase tracking-[0.18em] underline underline-offset-8">
            Tout le registre
          </Link>
        </div>
        <Registre />
      </section>

      {/* 5. Comment ça se transmet. */}
      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
          <Libelle>Transmettre</Libelle>
          <h2 className="mt-4 max-w-2xl text-5xl sm:text-6xl">
            Trois lignes, <em>et une vide.</em>
          </h2>
          <ol className="mt-10 grid gap-10 md:grid-cols-3">
            {ETAPES.map((e) => (
              <li key={e.n} className="space-y-3 border-t border-[var(--encre)] pt-5">
                <p className="font-[family-name:var(--titres)] text-5xl italic text-[var(--accent-texte)]">{e.n}</p>
                <h3 className="text-[32px]">{e.titre}</h3>
                <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
              </li>
            ))}
          </ol>
          <Link href={`${DOSSIER}/transmettre`} className="mt-10 inline-flex min-h-12 items-center rounded-full bg-[var(--accent)] px-7 text-[13px] font-semibold uppercase tracking-[0.18em] text-[var(--sur-accent)]">
            Inscrire le nom suivant
          </Link>
        </div>
      </section>

      {/* 6. Les bijoux. */}
      <section className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="space-y-4">
            <Libelle>Les bijoux</Libelle>
            <h2 className="text-5xl sm:text-6xl">Quatre, <em>pour commencer.</em></h2>
          </div>
          <Link href={`${DOSSIER}/bijoux`} className="text-[13px] font-semibold uppercase tracking-[0.18em] underline underline-offset-8">Les voir</Link>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
          {BIJOUX.map((b) => (
            <li key={b.id}>
              <CarteBijou b={b} sizes="(min-width: 1024px) 270px, 50vw" />
            </li>
          ))}
        </ul>
      </section>

      {/* 7. La question posée aux réseaux. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:items-center lg:py-24">
          <div className="space-y-5">
            <Libelle clair>Une seule question</Libelle>
            <h2 className="text-5xl sm:text-6xl">
              C&apos;est quoi le bijou le plus vieux <em>que tu portes&nbsp;?</em>
            </h2>
            <p className="text-lg leading-relaxed">
              On la pose sur nos réseaux, et les réponses deviennent notre campagne. Une photo n&apos;est repartagée qu&apos;avec l&apos;accord de qui l&apos;a prise et de qui la porte.
            </p>
          </div>
          <ul className="space-y-4">
            {REPONSES.map((r) => (
              <li key={r.texte} className="border border-white/20 px-5 py-4">
                <p className="font-[family-name:var(--titres)] text-[28px] italic leading-tight">«&nbsp;{r.texte}&nbsp;»</p>
                <p className="mt-1 text-[15px] text-[#D9C9A6]">{r.detail}</p>
              </li>
            ))}
            <li className="text-[13px] text-[#D9C9A6]">Réponses imaginées, pour l&apos;exemple : la marque est fictive.</li>
          </ul>
        </div>
      </section>

      {/* 8. Ce qu'on promet. */}
      <section className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
        <div className="grid gap-10 md:grid-cols-[1fr_1.3fr]">
          <div className="relative aspect-[4/5] overflow-hidden md:order-2">
            <Image src={IMAGES.boite.src} alt={IMAGES.boite.alt} width={IMAGES.boite.largeur} height={IMAGES.boite.hauteur} sizes="(min-width: 768px) 600px, 100vw" className="h-full w-full object-cover" />
          </div>
          <div className="space-y-8">
            <Libelle>Ce qu&apos;on promet</Libelle>
            <dl className="space-y-6">
              {PROMESSES.map((p) => (
                <div key={p.titre} className="space-y-1.5 border-t border-[var(--trait)] pt-5">
                  <dt className="font-[family-name:var(--titres)] text-[30px] leading-tight">{p.titre}</dt>
                  <dd className="leading-relaxed text-[var(--doux)]">{p.texte}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* 9. Questions. */}
      <section className="mx-auto max-w-4xl px-5 pb-16 lg:pb-24">
        <h2 className="mb-8 text-5xl sm:text-6xl">Questions, <em>réponses.</em></h2>
        <Faq />
      </section>

      {/* 10. La boutique. */}
      <section className="border-t border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-16 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <h2 className="text-5xl sm:text-6xl">Venir <em>les essayer.</em></h2>
            <p className="max-w-md text-lg leading-relaxed text-[var(--doux)]">{entreprise.adresse}. {entreprise.horaires}.</p>
          </div>
          <a href={`tel:${entreprise.telephone.replace(/ /g, "")}`} className="flex min-h-14 items-center justify-center rounded-full bg-[var(--accent)] px-8 text-lg font-semibold tabular-nums text-[var(--sur-accent)]">
            {entreprise.telephone}
          </a>
        </div>
      </section>
    </div>
  );
}
