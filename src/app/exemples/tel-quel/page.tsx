import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, carte, entreprise, methode, photos, remiseEnPlace } from "./_composants/donnees";
import { Faq, Intitule, Note, Photo, Surtitre, TableBareme } from "./_composants/Blocs";
import Comparateur from "./_composants/Comparateur";
import SeptDifferences from "./_composants/SeptDifferences";
import Contact from "./_composants/Contact";

// L'accueil de Tel Quel. Dans l'ordre de la vidéo : pas des revenus, le logement remis
// comme on l'a laissé ; la carte professionnelle (sur chaque page, dans la bande sous
// l'en-tête, et expliquée ici) ; deux photos par séjour, même angle ; les sept différences
// qui n'existent pas. Autour : la remise en place, la méthode, le barème, les questions.
export const metadata: Metadata = {
  title: "Tel Quel — site de démonstration",
  description:
    "Site de démonstration d'une conciergerie imaginaire, réalisé par Canevas Havane : ton chez-toi remis tel quel, et la preuve en photo à chaque départ, sous le même angle.",
  ...adressesDeLaPage("/exemples/tel-quel"),
};

export default function TelQuel() {
  return (
    <div>
      {/* 1. L'ouverture : la promesse, et la pièce épinglée de notes. */}
      <section className="mx-auto max-w-6xl px-4 pt-10 pb-16 sm:px-6 sm:pt-16">
        <div className="mx-auto max-w-3xl space-y-5 text-center">
          <Surtitre centre>Conciergerie · Bordeaux</Surtitre>
          <h1 className="text-[50px] font-normal sm:text-7xl lg:text-[84px]">
            Ton chez-toi, <em className="text-[var(--accent-texte)]">remis tel quel.</em>
          </h1>
          <p className="mx-auto max-w-xl text-[17px] leading-relaxed text-[var(--doux)] sm:text-lg">
            Nous louons ton logement aux voyageurs. Après chaque départ, tout est remis comme tu
            l&apos;as laissé, et la preuve t&apos;arrive en photo, le jour même.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href={`${DOSSIER}/mon-espace`} className="rounded-full bg-[var(--accent)] px-6 py-3.5 font-semibold text-[var(--sur-accent)]">Voir un séjour en photos</Link>
            <Link href={`${DOSSIER}/bareme`} className="rounded-full border border-[var(--encre)] px-6 py-3.5 font-semibold">Le barème</Link>
          </div>
        </div>
        <Photo photo={photos.salon} sizes="(min-width: 1152px) 1152px, 100vw" priority className="mt-12 aspect-[4/5] sm:aspect-[16/8]">
          <Note titre="Coussins" texte="Remis comme sur la photo d'arrivée." className="top-5 left-4 -rotate-2 sm:top-10 sm:left-10" />
          <Note titre="11 h 02" texte="Plaid plié, table débarrassée, poufs alignés." className="right-4 bottom-24 rotate-2 sm:right-10 sm:bottom-10" />
          <span className="absolute bottom-5 left-4 flex items-center gap-2 rounded-full bg-[#FFFDF8] py-2 pr-4 pl-2 text-[13px] font-semibold text-[#1F3A33] sm:left-10">
            <span aria-hidden="true" className="grid h-7 w-7 place-items-center rounded-full bg-[#23413A] text-[#E3C88E]">✓</span>
            Photo d&apos;après départ · même angle
          </span>
        </Photo>
      </section>

      {/* 2. La vraie peur. */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-20 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
        <div className="space-y-6">
          <Surtitre>Pas des revenus</Surtitre>
          <h2 className="text-[38px] font-normal sm:text-5xl">
            La vraie peur d&apos;un propriétaire : rentrer chez lui, et tout retrouver <em className="text-[var(--accent-texte)]">de travers.</em>
          </h2>
          <p className="text-[17px] leading-relaxed text-[var(--doux)]">
            Les autres te promettent des revenus en plus. Nous, nous te promettons ce que nous
            faisons : chaque chose remise à sa place après chaque séjour, et deux photos pour le
            prouver.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Photo photo={photos.canape} sizes="(min-width: 1024px) 270px, 50vw" className="aspect-[3/4]" />
          <Photo photo={photos.coussins} sizes="(min-width: 1024px) 270px, 50vw" className="mt-10 aspect-[3/4]" />
        </div>
      </section>

      {/* 3. Deux photos par séjour, même angle. */}
      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-14">
          <div className="space-y-6 px-1">
            <Intitule surtitre="Ton espace" titre={<>Deux photos par séjour. <em className="text-[var(--accent-texte)]">Même angle.</em></>}>
              <p>
                Avant l&apos;arrivée du voyageur, et après son départ. Glisse de l&apos;une à l&apos;autre,
                ou superpose-les : ce qui aurait bougé ressortirait en clair.
              </p>
            </Intitule>
            <Link href={`${DOSSIER}/mon-espace`} className="inline-block font-semibold underline decoration-[var(--accent)] decoration-2 underline-offset-[6px]">
              Ouvrir un espace propriétaire d&apos;exemple
            </Link>
          </div>
          <Comparateur avant="15 h" apres="11 h 02" />
        </div>
      </section>

      {/* 4. La remise en place. */}
      <section className="mx-auto max-w-6xl space-y-10 px-5 py-20 sm:px-6">
        <Intitule surtitre="À chaque départ" titre={<>Neuf choses, <em className="text-[var(--accent-texte)]">cochées une à une.</em></>}>
          <p>La liste est dans le mandat. L&apos;équipe la coche à chaque départ, d&apos;après la photo d&apos;arrivée.</p>
        </Intitule>
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {remiseEnPlace.map((r, i) => (
            <li key={r} className="flex items-center gap-4 rounded-[20px] border border-[var(--trait)] bg-[var(--carte)] px-4 py-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--sombre)] font-[family-name:var(--titres)] text-[17px] text-[#E3C88E] tabular-nums">{i + 1}</span>
              <span className="text-[16px] leading-snug">{r}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* 5. La carte, sur chaque page. */}
      <section id="carte" className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
          <Intitule clair surtitre="La carte" titre={<>Sur chaque page, <em className="text-[#E3C88E]">pas seulement ici.</em></>}>
            <p>
              Louer, de façon habituelle, le logement d&apos;un autre exige une carte professionnelle,
              même à titre accessoire (loi n° 70-9 du 2 janvier 1970, art. 1er et 3). La nôtre est
              dans la bande verte, sous l&apos;en-tête de chaque page : touche « Tout lire ».
            </p>
          </Intitule>
          <div className="rounded-[28px] bg-[#F6F1E7] p-6 text-[#1F3A33] sm:p-8">
            <div className="flex items-center justify-between gap-4 border-b border-[#E1D8C6] pb-4">
              <p className="font-[family-name:var(--titres)] text-[28px] leading-none">Tel Quel</p>
              <span className="rounded-full bg-[#23413A] px-3 py-1 text-[12px] font-semibold text-[#E3C88E]">Numéro d&apos;exemple</span>
            </div>
            <dl className="divide-y divide-[#E1D8C6]">
              {carte.map((l) => (
                <div key={l.libelle} className="grid gap-1 py-3.5 sm:grid-cols-[150px_1fr] sm:gap-4">
                  <dt className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#4E5D57]">{l.libelle}</dt>
                  <dd className="text-[16px] font-semibold">{l.valeur}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* 6. La méthode. */}
      <section className="mx-auto max-w-6xl space-y-12 px-5 py-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Intitule surtitre="La méthode" titre={<>Une photo à l&apos;arrivée. <em className="text-[var(--accent-texte)]">La même au départ.</em></>} />
          <Link href={`${DOSSIER}/methode`} className="font-semibold underline decoration-[var(--accent)] decoration-2 underline-offset-[6px]">Ce que « tel quel » veut dire</Link>
        </div>
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {methode.map((m, i) => (
            <li key={m.titre} className="space-y-3 rounded-[24px] bg-[var(--carte)] p-6">
              <p className="font-[family-name:var(--titres)] text-[44px] leading-none text-[var(--accent-texte)] tabular-nums">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="text-[26px] font-normal">{m.titre}</h3>
              <p className="text-[15px] leading-relaxed text-[var(--doux)]">{m.texte}</p>
            </li>
          ))}
        </ol>
        <Photo photo={photos.drap} sizes="(min-width: 1152px) 1152px, 100vw" className="aspect-[16/10] sm:aspect-[21/8]">
          <Note titre="Départ, 10 h 40" texte="Draps changés, lit fait au carré." className="top-5 right-4 rotate-2 sm:right-10" />
        </Photo>
      </section>

      {/* 7. L'affiche de lancement, en jeu. */}
      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto max-w-6xl space-y-10 px-4 py-20 sm:px-6">
          <Intitule centre surtitre="L'affiche de lancement" titre={<>Trouve les <em className="text-[var(--accent-texte)]">7 différences.</em></>}>
            <p>Touche la photo de droite là où quelque chose a bougé.</p>
          </Intitule>
          <SeptDifferences />
        </div>
      </section>

      {/* 8. Le barème. */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="space-y-6">
          <Intitule surtitre="Le barème" titre={<>Ce qu&apos;on prend, <em className="text-[var(--accent-texte)]">et qui le paie.</em></>}>
            <p>Prix maximums, toutes taxes comprises, et la base de calcul. Le même barème est recopié dans le mandat.</p>
          </Intitule>
          <Link href={`${DOSSIER}/bareme`} className="inline-block font-semibold underline decoration-[var(--accent)] decoration-2 underline-offset-[6px]">Le barème complet</Link>
        </div>
        <TableBareme nombre={3} />
      </section>

      {/* 9. Les questions. */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-20 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Intitule surtitre="Questions" titre={<>Avant de signer <em className="text-[var(--accent-texte)]">le mandat.</em></>} />
        <Faq />
      </section>

      {/* 10. Parler de son logement. */}
      <section id="contact" className="scroll-mt-20 bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div className="space-y-6 px-1">
            <Intitule clair surtitre="Ton logement" titre={<>On en parle, <em className="text-[#E3C88E]">tel quel.</em></>}>
              <p>
                Dis-nous où il est et sa taille. Nous te rappelons pour une visite et l&apos;inventaire
                photo, sans engagement.
              </p>
            </Intitule>
            <p className="text-[16px] text-[#C9D6CF]">
              Ou appelle : <a href={`tel:${entreprise.telephoneLien}`} className="font-semibold text-[#F6F1E7] underline underline-offset-4">{entreprise.telephone}</a>
            </p>
          </div>
          <Contact />
        </div>
      </section>
    </div>
  );
}
