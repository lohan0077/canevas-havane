import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, dimanches, honoraires, photos, rubriques } from "./_composants/donnees";
import { Affiche, Faq, Intitule, Photo } from "./_composants/Blocs";
import { Embleme } from "./_composants/EnTete";
import Gravure from "./_composants/Gravure";
import RendezVous from "./_composants/RendezVous";

// L'accueil de Dimanche Midi. Dans l'ordre de la vidéo : pas un placement, le dimanche où
// l'on parle d'argent en famille ; ce que les enfants tapent un jour ; le carnet de famille ;
// l'affiche ; un dimanche par mois au cabinet. Autour : les honoraires, ce que le cabinet
// ne fait pas, les questions, le rendez-vous pris par la famille.
export const metadata: Metadata = {
  title: "Dimanche Midi — site de démonstration",
  description:
    "Site de démonstration d'un cabinet de gestion de patrimoine imaginaire, réalisé par Canevas Havane : le carnet de famille qui reste chez toi, et un dimanche par mois où l'on parle d'argent à table.",
  ...adressesDeLaPage("/exemples/dimanche-midi"),
};

const JAMAIS = [
  { titre: "Écrire à tes enfants", texte: "Le carnet reste chez toi. C'est toi qui le donnes, quand tu veux." },
  { titre: "Venir à la maison", texte: "Ce serait du démarchage, même à ta demande. Vous venez au cabinet." },
  { titre: "Te promettre un rendement", texte: "Ni rendement, ni réduction d'impôt. On parle de ce que tu as, et de ce que tu veux." },
  { titre: "Me dire « agréé AMF »", texte: "Aucun conseiller ne l'est. Mon association l'est : je l'écris ainsi." },
];

export default function DimancheMidi() {
  return (
    <div>
      {/* 1. On en parle à table. */}
      <section className="overflow-hidden">
        <div className="mx-auto max-w-4xl space-y-6 px-5 pt-12 text-center sm:px-6 sm:pt-20">
          <div className="flex justify-center">
            <Embleme taille={64} />
          </div>
          <p className="text-[12px] font-semibold tracking-[0.22em] text-[var(--accent-texte)] uppercase">Conseil en patrimoine · Lyon</p>
          <h1 className="text-[52px] leading-[1.02] font-normal tracking-[-0.02em] sm:text-[88px]">
            On en parle <em>à table.</em>
          </h1>
          <p className="mx-auto max-w-xl text-[17px] leading-relaxed text-[var(--doux)] sm:text-lg">
            Je ne vends pas un placement. Je vends le dimanche midi où, enfin, on parle d&apos;argent en famille : ce
            que vous avez, où c&apos;est, qui appeler, ce qui est prévu.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href={`${DOSSIER}/carnet`} className="rounded-full bg-[var(--accent)] px-6 py-3.5 font-semibold text-[var(--sur-accent)]">Ouvrir le carnet de famille</Link>
            <Link href={`${DOSSIER}/dimanche`} className="rounded-full border border-[var(--encre)] px-6 py-3.5 font-semibold">Un dimanche par mois</Link>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-5xl overflow-hidden sm:mt-14 sm:px-2">
          <Gravure className="-ml-[30%] h-auto w-[160%] max-w-none sm:ml-0 sm:w-full" />
        </div>
      </section>

      {/* 2. Le tabou. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          <div className="space-y-6">
            <Intitule clair libelle="Le jour où" titre={<>En famille, l&apos;argent, <em className="text-[#D9B45A]">on n&apos;en parle pas.</em></>}>
              <p>Et un jour, les enfants cherchent seuls. Ce qu&apos;ils tapent, c&apos;est ça :</p>
            </Intitule>
            <p className="rounded-full bg-[var(--fond)] px-5 py-3.5 text-[16px] text-[var(--encre)]">
              <span aria-hidden="true" className="mr-2">⌕</span>
              comment retrouver une assurance vie d&apos;une personne décédée
            </p>
            <p className="text-[13px] text-[#C9D3C4]">Suggestion d&apos;un moteur de recherche, relevée le 15 octobre 2026.</p>
          </div>
          <Photo photo={photos.salle} sizes="(min-width: 1024px) 460px, 100vw" className="aspect-[4/5] rounded-[28px]" />
        </div>
      </section>

      {/* 3. Le carnet de famille. */}
      <section className="mx-auto max-w-6xl space-y-12 px-5 py-24 sm:px-6">
        <Intitule centre libelle="Un seul outil" titre={<>Le carnet <em>de famille.</em></>}>
          <p>Où est quoi, qui appeler, ce qui est prévu. Tu le remplis chez toi, tu le télécharges, et tu le donnes à tes enfants. Le cabinet ne le voit pas.</p>
        </Intitule>
        <ol className="grid gap-4 sm:grid-cols-3">
          {rubriques.map((r, i) => (
            <li key={r.cle} className="space-y-3 rounded-[24px] border border-[var(--trait)] bg-[var(--carte)] p-6">
              <p className="font-[family-name:var(--titres)] text-[15px] text-[var(--accent-texte)] italic">Page {i + 1}</p>
              <h3 className="text-[28px] font-normal">{r.titre}</h3>
              <ul className="space-y-1 text-[15px] text-[var(--doux)]">
                {r.lignes.slice(0, 3).map((l) => (
                  <li key={l.cle}>{l.libelle}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        <div className="flex justify-center">
          <Link href={`${DOSSIER}/carnet`} className="rounded-full bg-[var(--accent)] px-6 py-3.5 font-semibold text-[var(--sur-accent)]">Remplir mon carnet</Link>
        </div>
      </section>

      {/* 4. Un dimanche par mois. */}
      <section className="border-y border-[var(--trait)] bg-[#F3E7CF]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <Photo photo={photos.table} sizes="(min-width: 1024px) 460px, 100vw" className="aspect-[4/5] rounded-[28px]" />
          <div className="space-y-6">
            <Intitule libelle="Un dimanche par mois" titre={<>Le cabinet ouvre <em>à midi.</em></>}>
              <p>Les parents viennent, avec leurs enfants. On ouvre le carnet ensemble, chacun pose ses questions. Au cabinet, jamais chez vous.</p>
            </Intitule>
            <ul className="divide-y divide-[#E0CFAE] border-y border-[#E0CFAE]">
              {dimanches.map((d) => (
                <li key={d.cle} className="flex items-baseline justify-between gap-4 py-3">
                  <span className="font-[family-name:var(--titres)] text-[22px]">{d.libelle}</span>
                  <span className="text-[14px] text-[var(--doux)]">midi – 15 h</span>
                </li>
              ))}
            </ul>
            <p className="text-[13px] text-[var(--doux)]">Dates d&apos;exemple : le deuxième dimanche du mois.</p>
            <Link href={`${DOSSIER}/dimanche`} className="inline-block rounded-full bg-[var(--accent)] px-6 py-3.5 font-semibold text-[var(--sur-accent)]">Réserver notre place à table</Link>
          </div>
        </div>
      </section>

      {/* 5. L'affiche. */}
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-24 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
        <Intitule libelle="Pour le lancement" titre={<>Une seule affiche, <em>une seule question.</em></>}>
          <p>Et en bas, lisibles, le statut écrit juste et le numéro ORIAS : jamais « agréé AMF ».</p>
        </Intitule>
        <Affiche />
      </section>

      {/* 6. Ce que ça coûte. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto max-w-6xl space-y-12 px-5 py-20 sm:px-6">
          <Intitule clair libelle="Ce que ça coûte" titre={<>Écrit avant, <em className="text-[#D9B45A]">pas après.</em></>}>
            <p>Le carnet, le premier rendez-vous et le dimanche ne coûtent rien. Le reste est fixé par écrit, avant de commencer.</p>
          </Intitule>
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {honoraires.map((h) => (
              <div key={h.titre} className="space-y-2 rounded-[22px] bg-[#3A5848] p-6">
                <dt className="text-[15px] font-semibold text-[#E9D8B4]">{h.titre}</dt>
                <dd className="font-[family-name:var(--titres)] text-[30px] leading-tight [font-variant-numeric:lining-nums]">{h.prix}</dd>
                <dd className="text-[13px] text-[#E9D8B4]">{h.detail}</dd>
              </div>
            ))}
          </dl>
          <p className="max-w-3xl text-[14px] leading-relaxed text-[#E9D8B4]">
            Si tu souscris un contrat sur mon conseil, l&apos;assureur ou la société de gestion me reverse une part des frais
            qu&apos;il t&apos;applique : mon conseil est dit « non indépendant », et le montant t&apos;est donné avant que tu ne signes.
          </p>
        </div>
      </section>

      {/* 7. Ce que je ne ferai jamais. */}
      <section className="mx-auto max-w-6xl space-y-10 px-5 py-24 sm:px-6">
        <Intitule libelle="Jamais" titre={<>Quatre choses <em>que je ne ferai pas.</em></>} />
        <ul className="grid gap-x-12 gap-y-7 sm:grid-cols-2">
          {JAMAIS.map((j) => (
            <li key={j.titre} className="border-l-2 border-[#B5523B] pl-5">
              <p className="font-[family-name:var(--titres)] text-[24px] leading-snug">{j.titre}</p>
              <p className="mt-1 text-[15px] leading-relaxed text-[var(--doux)]">{j.texte}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 8. Questions. */}
      <section className="border-t border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="space-y-6">
            <Intitule libelle="Questions" titre={<>Avant de <em>passer à table.</em></>} />
            <Photo photo={photos.lampe} sizes="(min-width: 1024px) 420px, 100vw" className="hidden aspect-[4/3] rounded-[24px] lg:block" />
          </div>
          <Faq />
        </div>
      </section>

      {/* 9. Rendez-vous. */}
      <section id="rendez-vous" className="scroll-mt-20 bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="px-1">
            <Intitule clair libelle="Rendez-vous" titre={<>C&apos;est toi <em className="text-[#D9B45A]">qui viens.</em></>}>
              <p>Seul, à deux ou en famille ; au cabinet ou en visio. Une heure, sans frais et sans engagement.</p>
            </Intitule>
          </div>
          <RendezVous />
        </div>
      </section>
    </div>
  );
}
