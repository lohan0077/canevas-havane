import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, entreprise, methode, photos, services } from "../_composants/donnees";
import { Faq, Intitule, Photo, Surtitre } from "../_composants/Blocs";
import Bilan from "../_composants/Bilan";
import Estimation from "../_composants/Estimation";

export const metadata: Metadata = {
  title: "Propriétaires — Le Veilleur, site de démonstration",
  description:
    "Ce que fait une conciergerie imaginaire pour les propriétaires qui louent aux voyageurs : le mandat, les séjours, le relevé du mois, la ligne de nuit.",
  ...adressesDeLaPage("/exemples/le-veilleur/proprietaires"),
};

// Un relevé de mois, sans date ni logement nommé : un relevé publié ne doit dire ni où
// est un logement, ni quand il est vide. Montants d'exemple, au barème de la page.
const RELEVE = [
  { sejour: "Séjour 1", nuits: 3, prix: 90 },
  { sejour: "Séjour 2", nuits: 5, prix: 85 },
  { sejour: "Séjour 3", nuits: 2, prix: 95 },
  { sejour: "Séjour 4", nuits: 6, prix: 80 },
];
const euros = (n: number) => `${n.toFixed(2).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0")} €`;

export default function Proprietaires() {
  const lignes = RELEVE.map((r) => ({ ...r, loyers: r.nuits * r.prix, gestion: r.nuits * r.prix * 0.2 }));
  const total = lignes.reduce((t, l) => ({ loyers: t.loyers + l.loyers, gestion: t.gestion + l.gestion }), { loyers: 0, gestion: 0 });

  return (
    <div>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 pt-12 pb-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:pt-20">
        <Intitule niveau={1} surtitre="Propriétaires" titre={<>Ton logement loué, <em className="text-[var(--accent-texte)]">sans tes soirées.</em></>}>
          <p>
            Tu nous confies un logement meublé que tu loues aux voyageurs. Nous faisons tout ce qui
            se passe entre deux séjours, et tout ce qui se passe la nuit. Tu reçois un bilan chaque
            lundi et un relevé chaque mois.
          </p>
        </Intitule>
        <Photo photo={photos.oreiller} sizes="(min-width: 1024px) 460px, 100vw" className="aspect-[16/10]" priority />
      </section>

      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto max-w-6xl space-y-10 px-5 py-20 sm:px-6">
          <Intitule surtitre="Compris dans la gestion" titre={<>Six choses <em className="text-[var(--accent-texte)]">que tu ne fais plus.</em></>}>
            <p>Toutes comprises dans la gestion des séjours : 20 % des loyers encaissés (prix d&apos;exemple).</p>
          </Intitule>
          <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.titre} className="space-y-2 border-l-2 border-[var(--accent)] pl-5">
                <h3 className="text-[26px] font-normal">{s.titre}</h3>
                <p className="text-[15px] leading-relaxed text-[var(--doux)]">{s.texte}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-8">
          <Intitule surtitre="Le mandat" titre={<>Tout est écrit <em className="text-[var(--accent-texte)]">avant la première nuit.</em></>}>
            <p>
              Nous ne louons rien sans mandat de gestion signé. Il dit ce que nous faisons, ce que ça
              coûte (le barème y est recopié), combien de temps il dure et comment y mettre fin.
            </p>
          </Intitule>
          <ol className="space-y-5">
            {methode.map((m, i) => (
              <li key={m.titre} className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-1">
                <span className="row-span-2 grid h-11 w-11 place-items-center rounded-full bg-[var(--encre)] font-[family-name:var(--titres)] text-[22px] text-[var(--fond)]">{i + 1}</span>
                <p className="text-[18px] font-bold">{m.titre} <span className="text-[13px] font-semibold text-[var(--doux)]">· {m.duree}</span></p>
                <p className="text-[15px] leading-relaxed text-[var(--doux)]">{m.texte}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="space-y-5">
          <Surtitre>Le relevé du mois, par exemple</Surtitre>
          <div className="overflow-hidden rounded-[22px] border border-[var(--trait)] bg-[var(--carte)]">
            <table className="w-full text-left text-[14px]">
              <caption className="sr-only">Exemple de relevé mensuel : loyers encaissés, gestion et somme reversée, séjour par séjour</caption>
              <thead className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
                <tr>
                  <th scope="col" className="px-4 py-3 font-bold">Séjour</th>
                  <th scope="col" className="px-2 py-3 text-right font-bold">Loyers</th>
                  <th scope="col" className="px-4 py-3 text-right font-bold">Gestion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--trait)] tabular-nums">
                {lignes.map((l) => (
                  <tr key={l.sejour}>
                    <th scope="row" className="px-4 py-3 font-bold">
                      {l.sejour}
                      <span className="block text-[12px] font-semibold text-[var(--doux)]">{l.nuits} nuits × {l.prix} €</span>
                    </th>
                    <td className="px-2 py-3 text-right">{euros(l.loyers)}</td>
                    <td className="px-4 py-3 text-right">− {euros(l.gestion)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t-2 border-[var(--encre)] tabular-nums">
                <tr>
                  <th scope="row" className="px-4 pt-3 font-bold">Total</th>
                  <td className="px-2 pt-3 text-right font-bold">{euros(total.loyers)}</td>
                  <td className="px-4 pt-3 text-right font-bold">− {euros(total.gestion)}</td>
                </tr>
                <tr>
                  <th scope="row" colSpan={2} className="px-4 pt-2 pb-4 text-[16px] font-bold">Reversé sur ton compte</th>
                  <td className="px-4 pt-2 pb-4 text-right font-[family-name:var(--titres)] text-[28px] leading-none">{euros(total.loyers - total.gestion)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <p className="text-[13px] leading-relaxed text-[var(--doux)]">
            Relevé d&apos;exemple, au barème du site. Le vrai porte les dates de chaque séjour : il
            n&apos;est envoyé qu&apos;à toi. Le ménage, payé par les voyageurs, n&apos;y apparaît pas.
          </p>
        </div>
      </section>

      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Intitule clair surtitre="Chaque lundi" titre={<>Le bilan, <em className="text-[#E2B65C]">bon ou pas.</em></>}>
            <p>Arrivées, appels de nuit, propriétaires réveillés : trois chiffres et ce qui s&apos;est passé.</p>
          </Intitule>
          <Bilan />
        </div>
      </section>

      <section id="estimation" className="mx-auto grid max-w-6xl scroll-mt-20 gap-12 px-5 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="space-y-6">
          <Intitule surtitre="La visite" titre={<>Une heure chez toi, <em className="text-[var(--accent-texte)]">sans engagement.</em></>}>
            <p>
              Dis-nous quel logement, et quand te rappeler. Nous venons le voir, nous te disons
              s&apos;il se loue bien et à quel prix de nuit, et nous te laissons le mandat à relire.
            </p>
          </Intitule>
          <p className="text-[15px] leading-relaxed">
            Ou appelle le bureau :{" "}
            <a href={`tel:${entreprise.telephoneLien}`} className="font-bold underline underline-offset-4">{entreprise.telephone}</a>
            <span className="block text-[var(--doux)]">{entreprise.bureau}.</span>
          </p>
          <Link href={`${DOSSIER}/bareme`} className="inline-block font-bold underline decoration-[var(--accent)] decoration-2 underline-offset-[6px]">
            Relire le barème
          </Link>
        </div>
        <Estimation />
      </section>

      <section className="border-t border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
          <Intitule surtitre="Questions" titre={<>Les questions <em className="text-[var(--accent-texte)]">des propriétaires.</em></>} />
          <Faq />
        </div>
      </section>
    </div>
  );
}
