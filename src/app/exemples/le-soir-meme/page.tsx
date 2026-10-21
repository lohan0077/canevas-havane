import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { CarteAnnonce, Intitule, Section } from "./_composants/Blocs";
import BoutonEstimer from "./_composants/BoutonEstimer";
import Calculateur from "./_composants/Calculateur";
import { ANNONCES, BAREME, DOSSIER, LIGNES_BAREME, QUESTIONS, VISITES, agence, photos } from "./_composants/donnees";

// L'accueil du Soir Même. Les idées de la vidéo, en état de marche : le barème
// d'honoraires en page d'accueil (un curseur, et ce que l'agence prend au maximum) ;
// des annonces qui affichent le prix honoraires inclus en plus gros et renvoient au
// barème ; un compte rendu après chaque visite, le soir même ; un seul bouton,
// « Faire estimer ma maison ».
export const metadata: Metadata = {
  title: "Le Soir Même — site de démonstration",
  description: "Site de démonstration d'une agence immobilière imaginaire, réalisé par Canevas Havane : le barème d'honoraires en page d'accueil, et le compte rendu de chaque visite le soir même.",
  ...adressesDeLaPage("/exemples/le-soir-meme"),
};

const PROMESSES = [
  { titre: "Le barème d'abord", texte: "Ce que l'agence prend au maximum, et qui le paie, avant même de nous appeler." },
  { titre: "Le prix complet", texte: "Sur chaque annonce : honoraires inclus en plus gros, et un lien vers le barème." },
  { titre: "Le soir même", texte: "Après chaque visite, un compte rendu écrit sur ta page de vendeur." },
];

const METHODE = [
  { titre: "L'estimation", texte: "Une heure sur place. Puis un avis de valeur écrit, avec les ventes comparables et ce qui est à refaire. 0 €." },
  { titre: "Le mandat", texte: "Le prix, nos honoraires exacts (jamais plus que le barème) et qui les paie, écrits avant la première visite." },
  { titre: "Les visites", texte: "Chacune a son compte rendu le soir même, sur ta page : ce qui a plu, ce qui freine, la suite." },
  { titre: "La vente", texte: "L'offre, le compromis, le notaire. On t'appelle à chaque étape, sans attendre que tu relances." },
];

export default function LeSoirMeme() {
  return (
    <>
      {/* Le premier écran : la maison au crépuscule, la question, le calcul. */}
      <section className="relative -mt-[72px] overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="absolute inset-x-0 top-0 h-[760px] lg:h-full">
          <Image src={photos.crepuscule.src} alt={photos.crepuscule.alt} fill priority sizes="100vw" className="object-cover object-[74%_100%] lg:-scale-x-100 lg:object-[50%_85%]" />
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,20,44,0.78)_0%,rgba(18,20,44,0.25)_42%,rgba(18,20,44,0)_62%,rgba(27,30,58,0.6)_84%,#1B1E3A_100%)] lg:bg-[linear-gradient(180deg,rgba(18,20,44,0.75)_0%,rgba(18,20,44,0.15)_55%,rgba(27,30,58,0.7)_100%)]" />
        </div>
        <div className="relative mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-[110px] sm:px-8 sm:pt-[150px] lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:pb-24">
          <div className="space-y-6">
            <p className="flex flex-wrap justify-between gap-x-6 gap-y-1 text-[13px] font-semibold uppercase tracking-[0.2em] [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
              <span>Agence immobilière</span>
              <span>Le barème, avant tout</span>
            </p>
            <h1 className="text-[76px] leading-[0.9] tracking-[-0.02em] [text-shadow:0_2px_30px_rgba(0,0,0,0.45)] sm:text-[124px]">
              Tu vends <span className="italic text-[var(--accent)]">à combien&nbsp;?</span>
            </h1>
            <p className="max-w-md text-[18px] leading-relaxed [text-shadow:0_1px_14px_rgba(0,0,0,0.6)]">
              Glisse le prix de ta maison : le site te dit ce que l&apos;agence prend, au maximum, et
              qui le paie. Avant même de nous appeler.
            </p>
          </div>
          <div className="space-y-5 pt-[230px] lg:pt-0">
            <Calculateur />
            <BoutonEstimer />
          </div>
        </div>
      </section>

      <section aria-label="Ce que fait l'agence" className="border-b border-[var(--trait)] bg-[var(--carte)]">
        <ul className="mx-auto grid max-w-6xl md:grid-cols-3">
          {PROMESSES.map((p, i) => (
            <li key={p.titre} className={`space-y-2 px-5 py-8 sm:px-8 ${i ? "border-t border-[var(--trait)] md:border-l md:border-t-0" : ""}`}>
              <p className="font-[family-name:var(--titres)] text-[15px] italic text-[var(--accent-texte)]">0{i + 1}</p>
              <h2 className="text-[30px] leading-none">{p.titre}</h2>
              <p className="text-[16px] leading-relaxed text-[var(--doux)]">{p.texte}</p>
            </li>
          ))}
        </ul>
      </section>

      <Section id="bareme" className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <Intitule surtitre="Le barème" titre={<>Ce qu&apos;on prend, <span className="italic">au maximum.</span></>}>
          <p>
            La loi oblige chaque agence à afficher son barème : en vitrine, et sur son site. La
            plupart le rangent dans un PDF, tout en bas. Nous, on en a fait la page d&apos;accueil.
          </p>
          <p className="mt-4">
            Prix maximums, toutes taxes comprises (TVA à 20&nbsp;%). Les honoraires exacts sont écrits
            dans le mandat, et ne dépassent jamais ce barème.
          </p>
        </Intitule>
        <div className="space-y-4">
          <div className="overflow-hidden rounded-[24px] border border-[var(--trait)] bg-[var(--carte)]">
            <table className="w-full text-left text-[15px]">
              <caption className="sr-only">Barème d&apos;honoraires de transaction, prix maximums TTC</caption>
              <thead className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
                <tr>
                  <th scope="col" className="px-5 py-3 font-semibold">Prestation</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Prix maximum TTC</th>
                  <th scope="col" className="hidden px-5 py-3 font-semibold sm:table-cell">Qui paie</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--trait)]">
                {LIGNES_BAREME.map((l) => (
                  <tr key={l.prestation} className="align-top">
                    <th scope="row" className="px-5 py-4 font-normal">
                      {l.prestation}
                      <span className="mt-1 block text-[13px] font-semibold text-[var(--accent-texte)] sm:hidden">Qui paie : {l.payeur.toLowerCase()}</span>
                    </th>
                    <td className="px-5 py-4 font-semibold">{l.prix}</td>
                    <td className="hidden px-5 py-4 sm:table-cell">{l.payeur}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[14px] text-[var(--doux)]">
            Barème d&apos;exemple, en vigueur au {BAREME.date}. Honoraires calculés sur le prix de
            vente hors honoraires, {BAREME.payeur}. Arrêté du 10 janvier 2017, art. 2.
          </p>
        </div>
      </Section>

      <Section id="annonces" className="space-y-12 pt-0">
        <Intitule surtitre="Les maisons" titre={<>Le prix complet, <span className="italic">en grand.</span></>}>
          Sur chaque annonce : le prix honoraires inclus en plus gros, le prix hors honoraires, nos
          honoraires en pourcentage et qui les paie. Puis les classes énergie et climat, et le lien
          vers le barème.
        </Intitule>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ANNONCES.map((a, i) => (
            <li key={a.slug}>
              <CarteAnnonce annonce={a} priorite={i === 0} />
            </li>
          ))}
        </ul>
        <p className="text-[14px] text-[var(--doux)]">Annonces d&apos;exemple : l&apos;agence est fictive, ces maisons ne sont pas à vendre.</p>
      </Section>

      <Section id="suivi" sombre className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] lg:aspect-[4/5]">
          <Image src={photos.lampe.src} alt={photos.lampe.alt} fill sizes="(min-width: 1024px) 520px, 100vw" className="object-cover" />
          <div className="absolute inset-x-4 bottom-4 rounded-[22px] bg-[var(--fond)] p-5 text-[var(--encre)] shadow-xl">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Compte rendu · {VISITES[1].jour} {VISITES[1].envoi}</p>
            <p className="mt-1 font-[family-name:var(--titres)] text-[28px] leading-tight">{VISITES[1].phrase}</p>
          </div>
        </div>
        <div className="space-y-8">
          <Intitule clair surtitre="Le suivi du soir" titre={<>Ta maison, <span className="italic text-[var(--accent)]">visite par visite.</span></>}>
            Chaque vendeur a sa page. Après chaque visite, le compte rendu y tombe le soir même : ce
            qui a plu, ce qui freine, la suite. Les visiteurs ne sont jamais nommés.
          </Intitule>
          <ol className="space-y-3">
            {VISITES.map((v, i) => (
              <li key={v.date} className="flex items-baseline gap-4 border-b border-white/15 pb-3">
                <span className="w-24 shrink-0 text-[14px] font-semibold">{v.jour} {v.heure}</span>
                <span className="font-[family-name:var(--titres)] text-[22px] leading-snug">{v.phrase}</span>
                <span className="sr-only">Visite {i + 1}</span>
              </li>
            ))}
          </ol>
          <Link href={`${DOSSIER}/suivi`} className="inline-flex h-14 items-center rounded-full border border-white/30 px-7 text-[16px] font-semibold">
            Voir une page de vendeur
          </Link>
        </div>
      </Section>

      <Section className="space-y-10">
        <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[var(--accent-texte)]">Ce que les gens tapent sur Google</p>
        <blockquote className="max-w-4xl font-[family-name:var(--titres)] text-[46px] leading-[1.02] sm:text-[72px]">
          «&nbsp;Pourquoi les agences immobilières <span className="italic">ne répondent pas&nbsp;?</span>&nbsp;»
        </blockquote>
        <div className="grid max-w-4xl gap-6 text-[18px] leading-relaxed text-[var(--doux)] md:grid-cols-2">
          <p>
            Souvent, parce qu&apos;il n&apos;y a rien de neuf, et qu&apos;on n&apos;ose pas le dire. Alors le vendeur
            relance, et il attend.
          </p>
          <p>
            Chez nous, chaque visite donne un compte rendu écrit, le soir même, même quand il n&apos;y a
            rien à espérer. Le vendeur n&apos;a plus à relancer l&apos;agence : il sait tout, le soir même.
          </p>
        </div>
      </Section>

      <Section className="space-y-12 border-t border-[var(--trait)]">
        <Intitule surtitre="La méthode" titre={<>De l&apos;estimation <span className="italic">au notaire.</span></>} />
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {METHODE.map((m, i) => (
            <li key={m.titre} className="space-y-3 rounded-[24px] bg-[var(--carte)] p-6">
              <p className="font-[family-name:var(--titres)] text-[44px] italic leading-none text-[var(--accent-texte)]">{["I", "II", "III", "IV"][i]}</p>
              <h3 className="text-[28px] leading-none">{m.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{m.texte}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section sombre className="grid gap-10 lg:grid-cols-2">
        <Intitule clair surtitre="Frais d'agence" titre={<>Qui paie&nbsp;? <span className="italic text-[var(--accent)]">C&apos;est écrit.</span></>} />
        <div className="space-y-5 text-[17px] leading-relaxed">
          <p>
            Le barème dit qui paie les honoraires : chez nous, l&apos;acquéreur. L&apos;annonce dit la même
            chose, avec les mêmes mots, et le mandat aussi.
          </p>
          <p>
            Exemple : une maison vendue 300&nbsp;000&nbsp;€ hors honoraires, avec 4&nbsp;% TTC d&apos;honoraires. Le
            vendeur touche 300&nbsp;000&nbsp;€. L&apos;acquéreur paie 312&nbsp;000&nbsp;€, et c&apos;est ce prix-là qui
            s&apos;affiche en plus gros.
          </p>
          <p className="text-[14px]">Arrêté du 10 janvier 2017, art. 2 et 3 ; loi n° 70-9 du 2 janvier 1970, art. 6-1.</p>
        </div>
      </Section>

      <Section id="questions" className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Intitule surtitre="Questions" titre={<>Ce qu&apos;on nous <span className="italic">demande.</span></>} />
        <div className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
          {QUESTIONS.map((q) => (
            <details key={q.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-[family-name:var(--titres)] text-[26px] leading-tight">
                {q.q}
                <span aria-hidden="true" className="mt-1 text-[var(--accent-texte)] transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-[17px] leading-relaxed text-[var(--doux)]">{q.r}</p>
            </details>
          ))}
        </div>
      </Section>

      <section className="bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <h2 className="text-[52px] leading-[0.98] sm:text-[76px]">
              Un seul bouton&nbsp;: <span className="italic">faire estimer ma maison.</span>
            </h2>
            <ul className="space-y-2 text-[18px]">
              {["Une visite sur place", "Un avis de valeur écrit", "Notre barème, avant tout"].map((l) => (
                <li key={l} className="flex items-center gap-3">
                  <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                  {l}
                </li>
              ))}
            </ul>
            <Link href={`${DOSSIER}/estimation`} className="inline-flex h-16 items-center rounded-full bg-[var(--sombre)] px-8 text-[18px] font-semibold text-[var(--sur-sombre)]">
              Choisir mon créneau
            </Link>
            <p className="text-[15px] text-[var(--doux)]">
              Ou par téléphone : {agence.telephone} (numéro de fiction, il ne sonne chez personne).
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[28px]">
            <Image src={photos.salon.src} alt={photos.salon.alt} fill sizes="(min-width: 1024px) 460px, 100vw" className="object-cover" />
          </div>
        </div>
      </section>
    </>
  );
}
