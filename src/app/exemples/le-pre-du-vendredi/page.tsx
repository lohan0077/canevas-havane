import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DATES, DECOUPE, DOSSIER, ETAPES, PRIX_KILO, PROCHAINE, QUESTIONS, euros, ferme } from "./_composants/donnees";
import Compteur from "./_composants/Compteur";
import DetailColis from "./_composants/DetailColis";
import Prevenir from "./_composants/Prevenir";
import { Faq, Surtitre } from "./_composants/Blocs";

// L'accueil : une seule chose en haut, la date de la découpe et les colis qui
// restent. Puis ce qu'il y a dans le colis, le petit colis déjà parti (et
// « prévenez-moi »), la méthode, les dates, la ferme, les questions, le retrait.
export const metadata: Metadata = {
  title: "Le Pré du Vendredi — site de démonstration",
  description: "Site de démonstration d'une ferme imaginaire, réalisé par Canevas Havane : la prochaine découpe, sa date, et les vrais colis qui restent.",
  ...adressesDeLaPage("/exemples/le-pre-du-vendredi"),
};

const FAITS = [
  { valeur: String(DECOUPE.total), libelle: "colis par découpe" },
  { valeur: "10 kg", libelle: "ou 5 kg, au choix" },
  { valeur: euros(PRIX_KILO), libelle: "le kilo, TTC" },
  { valeur: "1", libelle: "découpe par mois" },
];

export default function LePreDuVendredi() {
  return (
    <main>
      {/* La date et les colis qui restent : rien d'autre en haut de l'accueil. */}
      <section id="decoupe" className="relative isolate overflow-hidden">
        <Image
          src="/exemples/le-pre-du-vendredi/vaches-au-soleil.webp"
          alt="Des vaches dans un pré, au soleil couchant, sous les arbres"
          width={1000}
          height={1500}
          sizes="100vw"
          priority
          className="absolute inset-0 -z-10 h-full w-full object-cover object-[50%_70%]"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(17,22,15,0.55)_0%,rgba(17,22,15,0.82)_38%,#11160F_72%)]" />
        <div className="mx-auto grid max-w-6xl gap-8 px-4 pb-16 pt-10 sm:px-6 md:grid-cols-[1.05fr_0.95fr] md:items-end md:pt-28">
          <div className="space-y-4">
            <Surtitre>Prochaine découpe</Surtitre>
            <h1 className="text-[64px] sm:text-[88px] leading-[0.95]">
              Vendredi <span className="block italic text-[var(--accent-texte)]">6&nbsp;novembre.</span>
            </h1>
            <p className="max-w-md text-lg">
              Vingt colis, pas un de plus. Retrait le {DECOUPE.retrait}, à la ferme.
            </p>
          </div>
          <Compteur />
        </div>
      </section>

      {/* Ce que veut dire « vingt colis » : quatre repères, marqués exemple. */}
      <section aria-label="La découpe en chiffres" className="border-y border-[var(--trait)]">
        <ul className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
          {FAITS.map((f, i) => (
            <li key={f.libelle} className={`space-y-1 px-4 py-8 sm:px-6 ${i % 2 ? "border-l border-[var(--trait)]" : ""} ${i > 1 ? "border-t border-[var(--trait)] md:border-t-0" : ""} ${i === 2 ? "md:border-l" : ""}`}>
              <p className="font-[family-name:var(--titres)] text-5xl tabular-nums">{f.valeur}</p>
              <p className="text-sm text-[var(--doux)]">{f.libelle}</p>
            </li>
          ))}
        </ul>
        <p className="mx-auto max-w-6xl px-4 pb-5 text-xs text-[var(--doux)] sm:px-6">Chiffres et prix d&apos;exemple : la ferme est fictive.</p>
      </section>

      <section id="dedans" className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <Surtitre>Ce qu&apos;il y a dedans</Surtitre>
          <h2 className="text-5xl sm:text-6xl">
            Tu ouvres le colis, <span className="italic text-[var(--accent-texte)]">tu vois tout.</span>
          </h2>
          <p className="text-lg leading-relaxed">
            Chaque morceau, son poids, et ce qu&apos;il coûte au prix du kilo. Pas de
            surprise au retrait, pas de « colis découverte ».
          </p>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[28px]">
            <Image
              src="/exemples/le-pre-du-vendredi/morceaux.webp"
              alt="Des morceaux de bœuf crus alignés sur une table sombre, avec du romarin et de l'ail"
              width={1400}
              height={940}
              sizes="(min-width: 768px) 480px, 100vw"
              className="h-full w-full object-cover"
            />
          </div>
          <Link href={`${DOSSIER}/colis`} className="inline-block border-b border-[var(--accent)] pb-1 font-semibold">
            Le détail des deux colis
          </Link>
        </div>
        <DetailColis />
      </section>

      <section id="prevenir" className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-2 md:items-center">
          <div className="space-y-5">
            <Surtitre>Le petit colis · 5 kg</Surtitre>
            <h2 className="text-5xl sm:text-6xl">
              Le site ne dit pas <span className="italic text-[var(--accent-texte)]">épuisé.</span>
            </h2>
            <p className="text-lg leading-relaxed">
              Les {DECOUPE.petitTotal} colis de 5 kg de cette découpe sont réservés. Le site te
              donne la date suivante, et te prévient le jour où elle ouvre.
            </p>
          </div>
          <Prevenir id="tout-est-parti" detail={`Colis de 5 kg · découpe du ${DECOUPE.date}`} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-12 px-4 py-20 sm:px-6">
        <div className="max-w-2xl space-y-5">
          <Surtitre>Comment ça marche</Surtitre>
          <h2 className="text-5xl sm:text-6xl">
            Une date, <span className="italic text-[var(--accent-texte)]">un samedi matin.</span>
          </h2>
        </div>
        <ol className="grid gap-px overflow-hidden rounded-[28px] border border-[var(--trait)] bg-[var(--trait)] sm:grid-cols-2 lg:grid-cols-4">
          {ETAPES.map((e, i) => (
            <li key={e.titre} className="space-y-3 bg-[var(--fond)] p-6">
              <p className="font-[family-name:var(--titres)] text-5xl italic text-[var(--accent-texte)] tabular-nums">{i + 1}</p>
              <h3 className="text-2xl">{e.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-[var(--trait)]">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-5">
            <Surtitre>Les prochaines dates</Surtitre>
            <h2 className="text-5xl sm:text-6xl">
              Le client n&apos;appelle plus. <span className="italic text-[var(--accent-texte)]">Il attend la date.</span>
            </h2>
            <Link href={`${DOSSIER}/dates`} className="inline-block border-b border-[var(--accent)] pb-1 font-semibold">
              Toutes les découpes
            </Link>
          </div>
          <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {DATES.slice(0, 3).map((d) => (
              <li key={d.libelle} className="grid grid-cols-[auto_1fr] items-center gap-5 py-5">
                <p className="w-16 text-center font-[family-name:var(--titres)] leading-none">
                  <span className="block text-5xl tabular-nums">{d.jour}</span>
                  <span className="text-sm text-[var(--doux)]">{d.abr}</span>
                </p>
                <div className="space-y-1">
                  <p className="text-lg font-semibold">{d.libelle} {d.annee}</p>
                  <p className="text-sm text-[var(--doux)]">{d.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="ferme" className="relative isolate overflow-hidden">
        <Image
          src="/exemples/le-pre-du-vendredi/pre-brumeux.webp"
          alt="Un pré dans la brume du matin, bordé d'arbres"
          width={1400}
          height={934}
          sizes="100vw"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[rgba(10,13,9,0.78)]" />
        <div className="mx-auto max-w-3xl space-y-6 px-4 py-28 text-center sm:px-6">
          <Surtitre>La ferme</Surtitre>
          <h2 className="text-5xl sm:text-7xl">
            Une découpe par mois. <span className="italic text-[var(--accent-texte)]">Le vendredi.</span>
          </h2>
          <p className="text-lg leading-relaxed">
            Une vingtaine de bêtes, un pré, et une règle : on ne découpe que ce qu&apos;on a
            déjà vendu. Le vendredi, parce que le samedi matin, tout le monde peut passer.
            C&apos;est de là que vient le nom.
          </p>
        </div>
      </section>

      <section id="questions" className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-5">
          <Surtitre>Questions</Surtitre>
          <h2 className="text-5xl sm:text-6xl">
            Avant de <span className="italic text-[var(--accent-texte)]">réserver.</span>
          </h2>
        </div>
        <Faq questions={QUESTIONS} />
      </section>

      <section id="retrait" className="border-t border-[var(--trait)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-3">
          <div className="space-y-4 md:col-span-1">
            <Surtitre>Le retrait</Surtitre>
            <h2 className="text-5xl">
              À la ferme, <span className="italic text-[var(--accent-texte)]">le samedi.</span>
            </h2>
          </div>
          <dl className="grid gap-8 sm:grid-cols-2 md:col-span-2">
            <div className="space-y-1">
              <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--doux)]">Téléphone</dt>
              <dd>
                <a href={`tel:${ferme.telephoneLien}`} className="font-[family-name:var(--titres)] text-4xl tabular-nums">{ferme.telephone}</a>
              </dd>
              <dd className="text-sm text-[var(--doux)]">Ça sonne dans le vide ? On est au champ : on rappelle le soir.</dd>
            </div>
            <div className="space-y-1">
              <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--doux)]">Adresse</dt>
              <dd className="text-lg leading-relaxed">
                {ferme.adresse.map((l) => <span key={l} className="block">{l}</span>)}
              </dd>
            </div>
            <div className="space-y-1">
              <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--doux)]">Retrait</dt>
              <dd className="text-lg">Le {ferme.retrait}</dd>
            </div>
            <div className="space-y-1">
              <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--doux)]">Prochaine ouverture</dt>
              <dd className="text-lg">Découpe du {PROCHAINE.date} : réservations le {PROCHAINE.ouverture}</dd>
            </div>
          </dl>
          <p className="text-xs text-[var(--doux)] md:col-span-3">
            Numéro de la tranche que l&apos;ARCEP réserve à la fiction, adresse inventée : la ferme n&apos;existe pas.{" "}
            <Link href={`${DOSSIER}/mentions-legales`} className="underline underline-offset-4">Mentions légales et crédits</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
