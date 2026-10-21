import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { adressesDeLaPage } from "@/lib/seo";
import { Tuile } from "../../_composants/Blocs";
import { COULEURS, DOSSIER, LETTRES, PAGES, type Lettre } from "../../_composants/donnees";

// Une page par lettre du DPE : « DPE F : ce que ça change pour toi ». La réponse à
// « pourquoi dpe f » (suggestion Google relevée le 15/10/2026). Règles reprises des
// fiches Service-Public F16096 (DPE), F2042 (logement décent) et F37110 (audit). La page
// explique, elle ne vend pas de travaux : aucune entreprise n'y est recommandée (CCH
// L271-6). Pas de seuils en kWh : l'étiquette elle-même n'est pas reproduite.
export function generateStaticParams() {
  return LETTRES.map((lettre) => ({ lettre }));
}

export async function generateMetadata({ params }: { params: Promise<{ lettre: string }> }): Promise<Metadata> {
  const { lettre } = await params;
  if (!LETTRES.includes(lettre as Lettre)) return {};
  const page = PAGES[lettre as Lettre];
  return {
    title: `${page.titre} — De A à G, site de démonstration`,
    description: `${page.titre} : vendre, louer, l'annonce. Une page d'un cabinet de diagnostic immobilier imaginaire, d'après les fiches Service-Public.`,
    ...adressesDeLaPage(`/exemples/de-a-a-g/dpe/${lettre}`),
  };
}

export default async function PageLettre({ params }: { params: Promise<{ lettre: string }> }) {
  const { lettre: brut } = await params;
  if (!LETTRES.includes(brut as Lettre)) notFound();
  const lettre = brut as Lettre;
  const page = PAGES[lettre];
  const [fond, encre] = COULEURS[lettre];
  const L = lettre.toUpperCase();

  return (
    <div className="mx-auto max-w-6xl space-y-4 px-4 pb-16 pt-6 sm:px-6">
      <p className="px-1 text-[14px]">
        <Link href={`${DOSSIER}#lettres`} className="underline underline-offset-4">Le DPE, lettre par lettre</Link>
        <span className="text-[var(--doux)]"> / {L}</span>
      </p>

      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <Tuile className="space-y-6" >
          <div data-film="echelle" className="space-y-1.5" aria-hidden="true">
            {LETTRES.map((l, i) => (
              <div key={l} className="flex items-center gap-3">
                <span
                  className={`flex h-9 items-center rounded-r-[10px] pl-3 text-[16px] font-bold ${l === lettre ? "outline outline-[3px] outline-offset-2 outline-[var(--encre)]" : "opacity-35"}`}
                  style={{ background: COULEURS[l][0], color: COULEURS[l][1], width: `${30 + i * 10}%` }}
                >
                  {l.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
          <header className="space-y-3" data-film="titre-lettre">
            <p className="text-[13px] font-semibold text-[var(--accent-texte)]">de-a-a-g / dpe / {lettre}</p>
            <h1 className="text-[40px] font-bold leading-[1] tracking-[-0.04em] sm:text-[56px]">
              <span className="mr-2 inline-grid h-[1.15em] w-[1.15em] place-items-center rounded-[14px] align-[-0.12em]" style={{ background: fond, color: encre }}>{L}</span>
              DPE {L} : ce que ça change <span className="text-[var(--accent-texte)]">pour toi.</span>
            </h1>
          </header>
        </Tuile>

        <div className="grid content-start gap-4">
          <Tuile teinte="menthe" className="space-y-2">
            <h2 className="text-[24px] font-bold tracking-[-0.02em]">Si tu vends</h2>
            {page.vendre.map((t) => <p key={t} className="text-[16px] leading-relaxed">{t}</p>)}
          </Tuile>
          <Tuile teinte="beurre" className="space-y-2">
            <h2 className="text-[24px] font-bold tracking-[-0.02em]">Si tu loues</h2>
            {page.louer.map((t) => <p key={t} className="text-[16px] leading-relaxed">{t}</p>)}
          </Tuile>
          <Tuile teinte="lilas" className="space-y-2">
            <h2 className="text-[24px] font-bold tracking-[-0.02em]">Dans l&apos;annonce</h2>
            {page.annonce.map((t) => <p key={t} className="text-[16px] leading-relaxed">{t}</p>)}
          </Tuile>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Tuile className="space-y-2">
          <h2 className="text-[20px] font-bold tracking-[-0.02em]">Un DPE dure dix ans</h2>
          <p className="text-[15px] leading-relaxed text-[var(--doux)]">
            Mais ceux faits entre le 1er janvier 2018 et le 30 juin 2021 ne sont plus valables depuis le
            1er janvier 2025 : il faut les refaire pour vendre ou louer.
          </p>
        </Tuile>
        <Tuile className="space-y-2">
          <h2 className="text-[20px] font-bold tracking-[-0.02em]">Chauffage électrique&nbsp;?</h2>
          <p className="text-[15px] leading-relaxed text-[var(--doux)]">
            Depuis le 1er janvier 2026, le DPE compte l&apos;électricité autrement. Un DPE fait avant peut
            être mis à jour gratuitement sur le site de l&apos;Ademe, sans nouvelle visite, si
            l&apos;étiquette s&apos;améliore.
          </p>
        </Tuile>
        <Tuile teinte="peche" className="space-y-2">
          <h2 className="text-[20px] font-bold tracking-[-0.02em]">Et les travaux&nbsp;?</h2>
          <p className="text-[15px] leading-relaxed">
            Le DPE n&apos;oblige pas à faire de travaux ; il donne des recommandations. Pour des devis,
            demande aux entreprises de ton choix : comme tout diagnostiqueur, on n&apos;en recommande
            aucune.
          </p>
        </Tuile>
      </div>

      <Tuile className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[15px] text-[var(--doux)]">
          Sources : Service-Public, fiches F16096 (DPE, vérifiée le 01/01/2026), F2042 (logement
          décent) et F37110 (audit énergétique). Une première réponse, pas un avis sur ton logement.
        </p>
        <Link href={`${DOSSIER}/rendez-vous`} className="inline-flex h-12 shrink-0 items-center justify-center rounded-[14px] bg-[var(--accent)] px-5 text-[15px] font-semibold text-[var(--sur-accent)]">
          Faire mon DPE
        </Link>
      </Tuile>

      <nav aria-label="Les autres lettres" className="flex flex-wrap gap-2 pt-2">
        {LETTRES.filter((l) => l !== lettre).map((l) => (
          <Link key={l} href={`${DOSSIER}/dpe/${l}`} className="grid h-11 w-11 place-items-center rounded-[12px] font-[family-name:var(--titres)] text-[18px] font-bold" style={{ background: COULEURS[l][0], color: COULEURS[l][1] }}>
            {l.toUpperCase()}
            <span className="sr-only"> : la page du DPE {l.toUpperCase()}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
