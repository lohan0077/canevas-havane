import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, HORAIRES, depot, euros, photos, questions } from "./_composants/donnees";
import Panne from "./_composants/Panne";

// Le site imaginé dans la vidéo « Si je devais remplir le carnet de commandes d'un
// fournisseur de matériel pro » : on ne vend pas du matériel, on vend le service du
// samedi soir. Sur l'accueil, un seul gros bouton « En panne » ; la photo de la plaque
// donne la pièce et le vrai stock. Mise en page inspirée du modèle « Freight Command »
// de MotionSites (un tableau de bord sombre : petites étiquettes en capitales, lignes de
// stock à pastilles, panneaux bordés d'un trait fin), transposée à un dépôt de pièces.
export const metadata: Metadata = {
  title: "Ton dépôt — site de démonstration",
  description: "Site de démonstration d'un fournisseur de matériel de restauration imaginaire, réalisé par Canevas Havane : un gros bouton « En panne », la pièce trouvée d'après la plaque, et le vrai stock.",
  ...adressesDeLaPage("/exemples/ton-depot"),
};

const STOCK = [
  { nom: "Thermostats", ref: "TH-…", n: 42, etat: "ok" },
  { nom: "Joints de porte", ref: "JP-…", n: 18, etat: "ok" },
  { nom: "Résistances", ref: "RS-…", n: 7, etat: "bas" },
  { nom: "Ventilateurs", ref: "VE-…", n: 11, etat: "ok" },
  { nom: "Pompes de vidange", ref: "PV-…", n: 3, etat: "bas" },
];

const PRODUITS = [
  { nom: "Armoire réfrigérée 700 L", ref: "AR-700", prix: 1380, stock: "En stock : 4" },
  { nom: "Lave-vaisselle à capot", ref: "LV-500", prix: 2650, stock: "En stock : 2" },
  { nom: "Four à pizza, 2 chambres", ref: "FP-2", prix: 4900, stock: "Sur commande : 10 jours" },
];

/** Une étiquette de panneau, en petites capitales. */
const Etiquette = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--doux)]">{children}</p>
);

export default function TonDepot() {
  return (
    <>
      {/* 1. Le bouton. */}
      <section className="px-4 pb-14 pt-8 sm:px-6">
        <div className="mx-auto grid grid-cols-1 max-w-6xl gap-10 md:grid-cols-[1fr_1fr] md:items-center">
          <div className="space-y-5">
            <p className="inline-flex items-center gap-2 rounded-md border border-[var(--trait)] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em]">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#5CD68D]" />
              Comptoir pièces · samedi jusqu&apos;à 23 h
            </p>
            <h1 className="text-[46px] font-extrabold leading-[0.98] tracking-tight sm:text-7xl">
              Ton matériel est <span className="text-[var(--accent-texte)]">en panne&nbsp;?</span>
            </h1>
            <p className="max-w-md text-lg leading-relaxed text-[var(--doux)]">
              Touche le bouton, prends la plaque de l&apos;appareil en photo. Le site trouve la pièce,
              et te dit si elle est au dépôt. Le vrai stock.
            </p>
          </div>
          <div className="rounded-[18px] border border-[var(--trait)] bg-[var(--carte)] p-5 sm:p-8" id="panne">
            <Panne />
          </div>
        </div>
      </section>

      {/* 2. Le tableau de bord. */}
      <section aria-label="Le dépôt en chiffres" className="border-y border-[var(--trait)] bg-[var(--sombre)]">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
          {[
            ["2 340", "références en stock"],
            ["7 h", "retrait au comptoir, dès"],
            ["23 h", "le samedi, fermeture"],
            ["HT", "chaque prix est affiché"],
          ].map(([v, l], i) => (
            <div key={l} className={`space-y-1 px-5 py-7 ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t md:border-t-0" : ""} ${i === 2 ? "md:border-l" : ""} border-[var(--trait)]`}>
              <dt className="sr-only">{l}</dt>
              <dd className="font-[family-name:var(--titres)] text-4xl font-extrabold tabular-nums">{v}</dd>
              <dd className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--doux)]">{l}</dd>
            </div>
          ))}
        </dl>
        <p className="mx-auto max-w-6xl px-5 pb-4 text-xs text-[var(--doux)]">Chiffres d&apos;exemple : le dépôt est fictif.</p>
      </section>

      {/* 3. Le vrai stock. */}
      <section className="mx-auto grid grid-cols-1 max-w-6xl gap-10 px-5 py-16 sm:px-6 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <div className="space-y-4">
          <Etiquette>Au dépôt, maintenant</Etiquette>
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Le vrai stock. Pas « appelez-nous ».</h2>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Le stock affiché est celui des étagères, mis à jour à chaque sortie. Quand une pièce n&apos;y
            est pas, on écrit le délai.
          </p>
        </div>
        <div className="overflow-hidden rounded-[14px] border border-[var(--trait)] bg-[var(--carte)]">
          <div className="grid grid-cols-[1fr_auto_auto] gap-4 border-b border-[var(--trait)] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--doux)]">
            <span>Famille</span>
            <span>Réf.</span>
            <span>Stock</span>
          </div>
          <ul className="divide-y divide-[var(--trait)]">
            {STOCK.map((s) => (
              <li key={s.nom} className="grid grid-cols-[1fr_auto_auto] items-center gap-4 px-4 py-3">
                <span className="font-semibold">{s.nom}</span>
                <span className="text-sm text-[var(--doux)]">{s.ref}</span>
                <span className={`flex items-center gap-2 font-bold tabular-nums ${s.etat === "ok" ? "text-[#5CD68D]" : "text-[#F2B84B]"}`}>
                  <span aria-hidden="true" className={`h-2 w-2 rounded-full ${s.etat === "ok" ? "bg-[#5CD68D]" : "bg-[#F2B84B]"}`} />
                  {s.n}
                </span>
              </li>
            ))}
          </ul>
          <p className="border-t border-[var(--trait)] px-4 py-2 text-xs text-[var(--doux)]">Exemple · mis à jour à chaque sortie sur le vrai site</p>
        </div>
      </section>

      {/* 4. Comment ça marche. */}
      <section className="bg-[var(--carte)] px-5 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl space-y-10">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Trois gestes, et la pièce t&apos;attend.</h2>
          <ol className="grid gap-4 md:grid-cols-3">
            {[
              ["01", "La plaque", "Une photo de la plaque signalétique, collée au dos ou dans la porte de l'appareil."],
              ["02", "La pièce", "Le site lit le modèle, te montre ses pièces, et ce qu'il y a au dépôt."],
              ["03", "Le comptoir", "Tu la réserves. Elle est prête au comptoir dès 7 h, ou le soir même le samedi."],
            ].map(([n, t, d]) => (
              <li key={n} className="space-y-3 rounded-[14px] border border-[var(--trait)] bg-[var(--fond)] p-5">
                <p className="font-[family-name:var(--titres)] text-3xl font-extrabold text-[var(--accent-texte)] tabular-nums">{n}</p>
                <h3 className="text-2xl font-extrabold">{t}</h3>
                <p className="text-[var(--doux)]">{d}</p>
              </li>
            ))}
          </ol>
          <Link href={`${DOSSIER}/en-panne`} className="inline-block rounded-full bg-[var(--accent)] px-6 py-3.5 font-bold text-[var(--sur-accent)]">
            Ouvrir l&apos;outil « En panne »
          </Link>
        </div>
      </section>

      {/* 5. Le samedi soir. */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-6 md:grid-cols-2 md:items-center">
        <Image src={photos.piano.src} width={photos.piano.largeur} height={photos.piano.hauteur} alt={photos.piano.alt} sizes="(min-width: 768px) 560px, 100vw" className="aspect-[4/3] w-full rounded-[18px] object-cover" />
        <div className="space-y-5">
          <Etiquette>Le service de samedi soir</Etiquette>
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Ton client, c&apos;est un chef. Son frigo lâche un samedi.</h2>
          <dl className="divide-y divide-[var(--trait)] rounded-[14px] border border-[var(--trait)] bg-[var(--carte)]">
            {HORAIRES.map((h) => (
              <div key={h.jours} className={`flex items-start justify-between gap-4 px-4 py-3 ${h.jours === "Samedi" ? "bg-[var(--accent)] text-[var(--sur-accent)]" : ""}`}>
                <dt>
                  <span className="font-bold">{h.jours}</span>
                  {h.note && <span className="block text-xs">{h.note}</span>}
                </dt>
                <dd className="shrink-0 font-bold tabular-nums">{h.heures}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 6. Ouvrir un restaurant. */}
      <section className="border-y border-[var(--trait)] bg-[var(--sombre)] px-5 py-16 sm:px-6">
        <div className="mx-auto grid grid-cols-1 max-w-6xl gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="space-y-5">
            <Etiquette>Ce que les gens cherchent</Etiquette>
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">La liste du matériel pour ouvrir un restaurant.</h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              Pizzeria, restaurant rapide, bar : la liste de base de chacun, chiffrée en hors taxes, à
              commander d&apos;un coup.
            </p>
            <Link href={`${DOSSIER}/ouvrir-un-restaurant`} className="inline-block rounded-full bg-[var(--sur-sombre)] px-6 py-3.5 font-bold text-[var(--sombre)]">
              Voir la liste
            </Link>
          </div>
          <Image src={photos.four.src} width={photos.four.largeur} height={photos.four.hauteur} alt={photos.four.alt} sizes="(min-width: 768px) 480px, 100vw" className="aspect-[5/4] w-full rounded-[18px] object-cover" />
        </div>
      </section>

      {/* 7. Les prix. */}
      <section className="mx-auto max-w-6xl space-y-8 px-5 py-16 sm:px-6">
        <div className="space-y-4">
          <Etiquette>Pas de « prix sur demande »</Etiquette>
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Le prix est écrit. Hors taxes, et TTC à côté.</h2>
        </div>
        <ul className="grid gap-4 md:grid-cols-3">
          {PRODUITS.map((p) => (
            <li key={p.ref} className="space-y-4 rounded-[14px] border border-[var(--trait)] bg-[var(--carte)] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--doux)]">Réf. {p.ref}</p>
              <h3 className="text-2xl font-extrabold">{p.nom}</h3>
              <p className="font-[family-name:var(--titres)] text-3xl font-extrabold tabular-nums">
                {euros(p.prix)} <span className="text-base font-bold text-[var(--doux)]">HT</span>
              </p>
              <p className="text-sm text-[var(--doux)] tabular-nums">soit {euros(p.prix * 1.2)} TTC · exemple</p>
              <p className={`text-sm font-semibold ${p.stock.startsWith("En") ? "text-[#5CD68D]" : "text-[#F2B84B]"}`}>{p.stock}</p>
            </li>
          ))}
        </ul>
        <p className="text-sm text-[var(--doux)]">Vente réservée aux professionnels : un numéro SIRET est demandé à l&apos;ouverture du compte.</p>
      </section>

      {/* 8. Questions. */}
      <section className="bg-[var(--carte)] px-5 py-16 sm:px-6">
        <div className="mx-auto grid grid-cols-1 max-w-6xl gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Les questions du comptoir.</h2>
          <div className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {questions.map((x) => (
              <details key={x.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold [&::-webkit-details-marker]:hidden">
                  {x.q}
                  <span aria-hidden="true" className="text-xl text-[var(--accent-texte)] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="pt-3 leading-relaxed text-[var(--doux)]">{x.r}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Le comptoir. */}
      <section className="px-5 py-16 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 rounded-[18px] border border-[var(--trait)] p-6 sm:p-10 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <Etiquette>Le comptoir</Etiquette>
            <h2 className="text-3xl font-extrabold tracking-tight">La plaque est illisible&nbsp;? Appelle.</h2>
            <p className="text-[var(--doux)]">{depot.adresse}</p>
          </div>
          <a href={`tel:${depot.telephoneLien}`} className="rounded-full bg-[var(--accent)] px-6 py-4 text-center text-xl font-bold tabular-nums text-[var(--sur-accent)]">
            {depot.telephone}
          </a>
        </div>
      </section>
    </>
  );
}
