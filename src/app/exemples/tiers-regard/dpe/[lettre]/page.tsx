import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../../_kit/Apparition";
import FondVivant from "../../../_kit/FondVivant";
import TitreRevele from "../../../_kit/TitreRevele";
import { AppelFinal, Bouton, Etiquette } from "../../_composants/Blocs";
import { COULEURS, DOSSIER, LETTRES, PAGES, type Lettre } from "../../_composants/donnees";

// Une page par lettre du DPE (vidéo « Remplir l'agenda ») : « DPE F : ce que ça change
// pour toi ». La réponse à « pourquoi dpe f » (suggestion Google relevée le 15/10/2026).
// Règles reprises des fiches Service-Public F16096 (DPE), F2042 (logement décent) et
// F37110 (audit). La page explique, elle ne vend pas de travaux : aucune entreprise n'y
// est recommandée (CCH L271-6). Pas de seuils en kWh : l'étiquette n'est pas reproduite.
export function generateStaticParams() {
  return LETTRES.map((lettre) => ({ lettre }));
}

export async function generateMetadata({ params }: { params: Promise<{ lettre: string }> }): Promise<Metadata> {
  const { lettre } = await params;
  if (!LETTRES.includes(lettre as Lettre)) return {};
  const page = PAGES[lettre as Lettre];
  return {
    title: `${page.titre} — Tiers Regard, site de démonstration`,
    description: `${page.titre} : vendre, louer, l'annonce. Une page d'un diagnostiqueur immobilier imaginaire, d'après les fiches Service-Public.`,
    ...adressesDeLaPage(`/exemples/tiers-regard/dpe/${lettre}`),
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
    <main>
      <section className="kit-grain relative isolate flex min-h-[78svh] flex-col justify-end overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <FondVivant couleurs={["#070A10", "#141C2A", fond]} vitesse={0.8} />
        <div className="absolute inset-0 bg-[var(--sombre)]/60" />
        <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 pb-14 pt-32 sm:px-8 md:pb-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div data-film="echelle" className="space-y-2" aria-hidden="true">
            {LETTRES.map((l, i) => (
              <div
                key={l}
                className={`flex h-10 items-center rounded-r-[12px] pl-4 font-[family-name:var(--titres)] text-[18px] font-bold transition-transform duration-700 ${l === lettre ? "scale-x-[1.04] outline outline-[3px] outline-offset-[3px] outline-[#F3F4F6]" : "opacity-35"}`}
                style={{ background: COULEURS[l][0], color: COULEURS[l][1], width: `${34 + i * 11}%`, transformOrigin: "left" }}
              >
                {l.toUpperCase()}
              </div>
            ))}
          </div>
          <header data-film="titre-lettre" className="space-y-6">
            <Apparition>
              <Etiquette>
                <Link href={`${DOSSIER}#lettres`} className="underline underline-offset-4">Le DPE, lettre par lettre</Link>
                <span>/ {L}</span>
              </Etiquette>
            </Apparition>
            <div className="flex items-end gap-5">
              <Apparition de="zoom" className="shrink-0">
                <span aria-hidden="true" className="grid h-24 w-24 place-items-center rounded-[18px] font-[family-name:var(--titres)] text-[64px] font-bold sm:h-32 sm:w-32 sm:text-[88px]" style={{ background: fond, color: encre }}>{L}</span>
              </Apparition>
            </div>
            <TitreRevele
              as="h1"
              auChargement
              delai={200}
              texte={`DPE ${L} : ce que ça change *pour toi.*`.replace(" :", " :")}
              className="max-w-3xl font-semibold text-[clamp(2.6rem,6.5vw,5.6rem)] leading-[0.95] tracking-[-0.05em]"
              classeAccent="text-[var(--accent-texte)]"
            />
          </header>
        </div>
      </section>

      <section className="bg-[#F3F2EC] text-[#111827]">
        <div className="mx-auto max-w-6xl space-y-4 px-4 py-16 sm:px-8 md:py-24">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Si tu vends", page.vendre],
              ["Si tu loues", page.louer],
              ["Dans l'annonce", page.annonce],
            ].map(([titre, textes], i) => (
              <Apparition key={titre as string} delai={i * 120} className="space-y-3 rounded-[1.25rem] border border-[#111827] bg-white p-6">
                <p className="flex items-center gap-3">
                  <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-[8px] font-[family-name:var(--titres)] font-bold" style={{ background: fond, color: encre }}>{i + 1}</span>
                  <span className="font-[family-name:var(--titres)] text-[24px] font-semibold tracking-[-0.03em]">{titre as string}</span>
                </p>
                {(textes as string[]).map((t) => <p key={t} className="text-[16px] leading-relaxed">{t}</p>)}
              </Apparition>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Apparition className="space-y-2 rounded-[1.25rem] border border-[#D9D6CB] p-6">
              <h2 className="font-[family-name:var(--titres)] text-[20px] font-semibold tracking-[-0.02em]">Un DPE dure dix ans</h2>
              <p className="text-[15px] leading-relaxed text-[#4B5563]">
                Mais ceux faits entre le 1er janvier 2018 et le 30 juin 2021 ne sont plus valables depuis
                le 1er janvier 2025 : il faut les refaire pour vendre ou louer.
              </p>
            </Apparition>
            <Apparition delai={120} className="space-y-2 rounded-[1.25rem] border border-[#D9D6CB] p-6">
              <h2 className="font-[family-name:var(--titres)] text-[20px] font-semibold tracking-[-0.02em]">Chauffage électrique&nbsp;?</h2>
              <p className="text-[15px] leading-relaxed text-[#4B5563]">
                Depuis le 1er janvier 2026, le DPE compte l&apos;électricité autrement. Un DPE fait avant peut
                être mis à jour gratuitement sur le site de l&apos;Ademe, sans nouvelle visite, si
                l&apos;étiquette s&apos;améliore.
              </p>
            </Apparition>
            <Apparition delai={240} className="space-y-2 rounded-[1.25rem] bg-[#111827] p-6 text-[#F3F4F6]">
              <h2 className="font-[family-name:var(--titres)] text-[20px] font-semibold tracking-[-0.02em]">Et les travaux&nbsp;?</h2>
              <p className="text-[15px] leading-relaxed">
                Le DPE n&apos;oblige pas à faire de travaux ; il donne des recommandations. Pour des devis,
                demande aux entreprises de ton choix : comme tout diagnostiqueur, on n&apos;en recommande
                aucune.
              </p>
            </Apparition>
          </div>
          <div className="flex flex-col gap-5 rounded-[1.25rem] border border-[#111827] p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-[15px] text-[#4B5563]">
              Sources : Service-Public, fiches F16096 (DPE, vérifiée le 01/01/2026), F2042 (logement
              décent) et F37110 (audit énergétique). Une première réponse, pas un avis sur ton logement.
            </p>
            <Bouton href={`${DOSSIER}/rendez-vous`} variante="sombre">Faire mon DPE</Bouton>
          </div>
          <nav aria-label="Les autres lettres" className="flex flex-wrap gap-2 pt-2">
            {LETTRES.filter((l) => l !== lettre).map((l) => (
              <Link key={l} href={`${DOSSIER}/dpe/${l}`} className="grid h-12 w-12 place-items-center rounded-[10px] font-[family-name:var(--titres)] text-[19px] font-bold transition-transform hover:scale-105" style={{ background: COULEURS[l][0], color: COULEURS[l][1] }}>
                {l.toUpperCase()}
                <span className="sr-only"> : la page du DPE {l.toUpperCase()}</span>
              </Link>
            ))}
          </nav>
        </div>
      </section>
      <AppelFinal />
    </main>
  );
}
