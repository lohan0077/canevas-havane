import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, STATUT, methode, photos } from "./_composants/donnees";
import { Faq, Intitule, Photo } from "./_composants/Blocs";
import Moments from "./_composants/Moments";
import RendezVous from "./_composants/RendezVous";
import Ticket from "./_composants/Ticket";

// L'accueil de Ligne par Ligne. Dans l'ordre de la vidéo : pas ce que tu vas gagner, ce
// que je gagne (le ticket) ; la question que les gens tapent ; des moments de vie plutôt
// que des produits ; le statut écrit juste ; le rendez-vous au cabinet ou en visio. Aucun
// rendement promis, aucun produit nommé.
export const metadata: Metadata = {
  title: "Ligne par Ligne — site de démonstration",
  description:
    "Site de démonstration d'un conseiller en gestion de patrimoine imaginaire, réalisé par Canevas Havane : ce que le conseiller gagne, ligne par ligne, et des moments de vie plutôt que des produits.",
  ...adressesDeLaPage("/exemples/ligne-par-ligne"),
};

const NE_FAIS_PAS = [
  { titre: "Te promettre un rendement", texte: "Personne ne connaît celui de demain. Je te dis ce que coûte chaque solution, et ce qu'elle risque." },
  { titre: "Venir chez toi", texte: "Même à ta demande : ce serait du démarchage. Au cabinet, ou en visio." },
  { titre: "T'appeler pour te vendre", texte: "Je n'appelle personne qui ne l'a pas demandé. C'est toi qui prends rendez-vous." },
  { titre: "Me dire agréé par l'AMF", texte: "Aucun conseiller ne l'est. J'adhère à une association agréée par l'AMF : je l'écris ainsi." },
];

export default function LigneParLigne() {
  return (
    <div>
      {/* 1. Ce que je gagne. */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-4xl space-y-6 px-5 pt-12 text-center sm:px-6 sm:pt-20">
          <p className="text-[12px] font-semibold tracking-[0.2em] text-[var(--accent-texte)] uppercase">Gestion de patrimoine · Nantes</p>
          <h1 className="text-[46px] leading-[1.02] font-normal tracking-[-0.025em] sm:text-[84px]">
            Ce que je gagne, <em>ligne par ligne.</em>
          </h1>
          <p className="mx-auto max-w-xl text-[17px] leading-relaxed text-[var(--doux)] sm:text-lg">
            Pas ce que tu vas gagner : personne ne le sait. Ce que je gagne, moi, sur ton dossier. Mes
            honoraires, et ce que me reversent les partenaires, écrits avant que tu ne signes quoi que ce soit.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="#rendez-vous" className="rounded-full bg-[var(--accent)] px-6 py-3.5 font-semibold text-[var(--sur-accent)]">Prendre rendez-vous</Link>
            <Link href={`${DOSSIER}/ce-que-je-gagne`} className="rounded-full border border-[var(--encre)] px-6 py-3.5 font-semibold">Le détail du ticket</Link>
          </div>
        </div>
        <div className="relative mt-10 sm:mt-14">
          <Photo photo={photos.lac} priorite sizes="100vw" className="h-[500px] w-full sm:h-[580px]" />
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-[var(--fond)] to-transparent" />
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--fond)] to-transparent" />
        </div>
        <div className="relative -mt-56 px-4 pb-16 sm:-mt-72">
          <Ticket film="ticket" />
        </div>
      </section>

      {/* 2. La question qu'on tape. */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
        <Intitule libelle="Comment se rémunère un conseiller ?" titre={<>La question <em>qu&apos;on n&apos;ose pas poser.</em></>}>
          <p>
            C&apos;est pourtant ce qu&apos;on tape : « comment se rémunère un conseiller en gestion de patrimoine ». La
            loi m&apos;oblige déjà à te le dire (code monétaire et financier, art. L541-8-1). Je le dis en premier.
          </p>
        </Intitule>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-3 rounded-[24px] bg-[var(--carte)] p-6">
            <p className="text-[12px] font-semibold tracking-[0.2em] text-[var(--accent-texte)] uppercase">Payé par toi</p>
            <h3 className="text-[28px] font-normal">Mes honoraires</h3>
            <p className="text-[15px] leading-relaxed text-[var(--doux)]">Le bilan, puis le suivi chaque année. Fixés par écrit avant de commencer : 900 € et 300 € par an TTC, en exemple.</p>
          </div>
          <div className="space-y-3 rounded-[24px] bg-[var(--carte)] p-6">
            <p className="text-[12px] font-semibold tracking-[0.2em] text-[#9A4423] uppercase">Pris sur tes frais</p>
            <h3 className="text-[28px] font-normal">Les rétrocessions</h3>
            <p className="text-[15px] leading-relaxed text-[var(--doux)]">
              L&apos;assureur et la société de gestion me reversent une part des frais que tu paies sur ton contrat et tes fonds.
              C&apos;est pour ça que mon conseil est dit « non indépendant ».
            </p>
          </div>
          <Link href={`${DOSSIER}/ce-que-je-gagne`} className="rounded-[24px] border border-[var(--encre)] p-6 text-[17px] font-semibold sm:col-span-2">
            Combien, sur ton épargne ? Fais glisser le curseur du ticket →
          </Link>
        </div>
      </section>

      {/* 3. Les moments de vie. */}
      <section id="moments" className="scroll-mt-20 border-y border-[var(--trait)] bg-[#E9E6DA]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="space-y-6">
            <Intitule libelle="Pas de produits" titre={<>Des moments <em>de vie.</em></>}>
              <p>
                Tu ne viens pas me voir pour une assurance vie. Tu viens parce que tu vends ta boîte, que tu
                hérites, que tu pars à la retraite. On commence par là.
              </p>
            </Intitule>
            <Photo photo={photos.banc} sizes="(min-width: 1024px) 420px, 100vw" className="hidden aspect-[3/2] rounded-[24px] lg:block" />
          </div>
          <Moments />
        </div>
      </section>

      {/* 4. Le statut, écrit juste. */}
      <section className="mx-auto max-w-6xl space-y-10 px-5 py-20 sm:px-6">
        <Intitule centre libelle="Mon statut" titre={<>Écrit juste, <em>en haut de chaque page.</em></>} />
        <figure className="mx-auto max-w-3xl rounded-[24px] border border-[var(--trait)] bg-[var(--carte)] p-6 text-center sm:p-9">
          <blockquote className="font-[family-name:var(--titres)] text-[26px] leading-snug sm:text-[34px]">« {STATUT}. »</blockquote>
          <figcaption className="mt-5 text-[15px] leading-relaxed text-[var(--doux)]">
            Pas « agréé AMF » : aucun conseiller en investissements financiers ne l&apos;est. C&apos;est mon association qui est
            agréée, et l&apos;AMF demande de l&apos;écrire ainsi (position DOC-2006-23, question 4.6). Je suis aussi courtier en
            assurance. Les deux statuts, et le numéro ORIAS (00 000 000, exemple), sont en tête et en pied de chaque page.
          </figcaption>
        </figure>
      </section>

      {/* 5. La méthode. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto max-w-6xl space-y-12 px-5 py-20 sm:px-6">
          <Intitule clair libelle="Comment ça se passe" titre={<>Quatre temps, <em className="text-[#E9B36B]">chacun son prix.</em></>} />
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {methode.map((m, i) => (
              <li key={m.titre} className="space-y-3 rounded-[22px] bg-[#24443A] p-6">
                <p className="font-[family-name:var(--titres)] text-[40px] leading-none text-[#E9B36B] tabular-nums">{i + 1}</p>
                <h3 className="text-[24px] font-normal">{m.titre}</h3>
                <p className="text-[13px] font-semibold text-[#BFD3C6]">{m.detail}</p>
                <p className="text-[15px] leading-relaxed text-[#DCE7E0]">{m.texte}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6. Le temps d'y penser. */}
      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-20 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
        <Photo photo={photos.carnet} sizes="(min-width: 1024px) 540px, 100vw" className="aspect-[4/5] rounded-[28px]" />
        <div className="space-y-6">
          <Intitule libelle="Le bilan" titre={<>Écrit, <em>et remis en main propre.</em></>}>
            <p>
              Ce que tu as, ce que tu veux, ce qui manque. Pour chaque recommandation : pourquoi, ce qu&apos;elle coûte, ce
              qu&apos;elle risque, et ce que je touche si tu la suis. Tu repars avec, tu prends ton temps, tu en parles
              autour de toi.
            </p>
          </Intitule>
        </div>
      </section>

      {/* 7. Ce que je ne fais pas. */}
      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto max-w-6xl space-y-10 px-5 py-20 sm:px-6">
          <Intitule libelle="Ce que je ne ferai pas" titre={<>Quatre choses, <em>jamais.</em></>} />
          <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {NE_FAIS_PAS.map((n) => (
              <li key={n.titre} className="flex gap-4">
                <span aria-hidden="true" className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#F4E9E1] text-[15px] font-bold text-[#6E2F17]">✕</span>
                <span>
                  <span className="block text-[18px] font-semibold">{n.titre}</span>
                  <span className="text-[15px] leading-relaxed text-[var(--doux)]">{n.texte}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8. Questions. */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Intitule libelle="Questions" titre={<>Avant de <em>venir.</em></>} />
        <Faq />
      </section>

      {/* 9. Rendez-vous. */}
      <section id="rendez-vous" className="scroll-mt-20 bg-[#E9E6DA]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="px-1">
            <Intitule libelle="Rendez-vous" titre={<>Au cabinet <em>ou en visio.</em></>}>
              <p>45 minutes, sans engagement, tes questions d&apos;abord. Je te dis ce que je peux faire, ce que je ne fais pas, et ce que ça coûte.</p>
            </Intitule>
          </div>
          <RendezVous />
        </div>
      </section>
    </div>
  );
}
