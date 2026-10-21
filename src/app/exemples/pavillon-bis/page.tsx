import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { Bandes, Faq, Intitule, Section } from "./_composants/Blocs";
import ChoixMaison from "./_composants/ChoixMaison";
import Lotissement from "./_composants/Lotissement";
import { DOSSIER, TRANSFORMATIONS, VISITE, agence, photos } from "./_composants/donnees";

// L'accueil de Pavillon Bis. Les idées de la vidéo, en état de marche : tu choisis ta
// maison (plain-pied, sur sous-sol, à étage) et tu vois ce qu'on a fait de la même ; le
// lotissement des Tilleuls, où transformer le n° 14 fait voir la leur à tous les voisins ;
// et l'invitation du lancement, « Samedi, venez voir le n° 14 ».
export const metadata: Metadata = {
  title: "Pavillon Bis — site de démonstration",
  description: "Site de démonstration d'une agence d'architecture imaginaire, réalisé par Canevas Havane : uniquement les pavillons des années 70. Ta maison, deuxième version.",
  ...adressesDeLaPage("/exemples/pavillon-bis"),
};

const ETAPES = [
  { titre: "On vient voir la tienne", texte: "Une heure chez toi : ce qui tient, ce qui gêne, ce que tu voudrais." },
  { titre: "On te montre sa jumelle", texte: "Ta maison existe à des milliers d'exemplaires : on te montre ce qu'on a fait d'une maison identique." },
  { titre: "On dessine la deuxième version", texte: "Deux pistes, chiffrées, et l'autorisation qu'il faut : déclaration ou permis." },
  { titre: "On suit le chantier", texte: "Les entreprises consultées, les travaux suivis, la maison habitée le plus longtemps possible." },
];

export default function PavillonBis() {
  return (
    <main>
      <section id="ta-maison" className="scroll-mt-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-16 pt-10 sm:px-6 sm:pt-16 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div className="space-y-6">
            <p className="flex items-center gap-3 font-[family-name:var(--titres)] text-[14px] font-bold uppercase tracking-[0.12em] text-[var(--accent-texte)]">
              <Bandes />
              Architecture · pavillons des années 70
            </p>
            <h1 className="text-[46px] font-extrabold leading-[1] tracking-[-0.035em] sm:text-[76px]">
              Ta maison ressemble <span className="text-[var(--accent-texte)]">à laquelle&nbsp;?</span>
            </h1>
            <p className="max-w-lg text-[18px] leading-relaxed text-[var(--doux)]">
              Plain-pied, sur sous-sol ou à étage : il y en a des lotissements entiers. On ne
              fait que celles-là. Touche la tienne, on te montre ce qu&apos;on a fait de la même.
            </p>
          </div>
          <ChoixMaison />
        </div>
      </section>

      <Section sombre className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="relative aspect-[3/2] overflow-hidden rounded-[28px]">
          <Image src={photos.sousSol.src} alt={photos.sousSol.alt} fill sizes="(min-width: 1024px) 480px, 100vw" className="object-cover" />
        </div>
        <Intitule surtitre="Pas du neuf" titre="Les pavillons des années 70, et rien d'autre.">
          Pas de villa blanche sur un terrain vide. Des maisons qui existent, qu&apos;on habite, et
          qu&apos;on connaît par cœur à force de les ouvrir : le garage du sous-sol, le couloir
          central, le toit mal isolé. {agence.signature}
        </Intitule>
      </Section>

      <Section id="lotissement" className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Intitule surtitre="Le lotissement" titre="Tu en transformes une. Tous les voisins voient la leur.">
          Dans un lotissement, toutes les maisons sont identiques. Le n° 14 des Tilleuls a changé,
          avec l&apos;accord de ses propriétaires. Touche une maison : c&apos;est peut-être la tienne.
        </Intitule>
        <Lotissement />
      </Section>

      <Section className="space-y-12 pt-0">
        <Intitule surtitre="Ce qu'on en fait" titre="Quatre façons de la changer." />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TRANSFORMATIONS.map((t, i) => (
            <li key={t.titre} className="space-y-3 rounded-[24px] border-2 border-[var(--encre)] bg-[var(--carte)] p-6">
              <p className="grid h-10 w-10 place-items-center rounded-full font-[family-name:var(--titres)] text-lg font-extrabold" style={{ background: ["#A63F2A", "#E3B04B", "#2F3B35", "#E3B04B"][i], color: i === 1 || i === 3 ? "#2F3B35" : "#F4EFE6" }}>{i + 1}</p>
              <h3 className="text-[22px] font-extrabold">{t.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{t.texte}</p>
            </li>
          ))}
        </ul>
        <Link href={`${DOSSIER}/maisons`} className="inline-flex min-h-[54px] items-center rounded-full bg-[var(--encre)] px-7 font-[family-name:var(--titres)] text-[17px] font-bold text-[var(--fond)]">
          Les trois maisons, en détail
        </Link>
      </Section>

      <section style={{ background: "#A63F2A" }} className="text-[#F4EFE6]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-5">
            <p className="font-[family-name:var(--titres)] text-[14px] font-bold uppercase tracking-[0.12em]">{VISITE.date} · {VISITE.heures}</p>
            <h2 className="text-[46px] font-extrabold leading-[1] tracking-[-0.03em] sm:text-[72px]">Samedi, venez voir le n°&nbsp;14.</h2>
            <p className="max-w-lg text-[18px] leading-relaxed">
              La même maison que la vôtre, deuxième version. Les propriétaires ouvrent leur porte
              aux voisins, un samedi matin, par petits groupes.
            </p>
            <Link href={`${DOSSIER}/visite-du-14`} className="inline-flex min-h-[54px] items-center rounded-full bg-[#F4EFE6] px-7 font-[family-name:var(--titres)] text-[17px] font-bold text-[#2F3B35]">
              Choisir une heure de visite
            </Link>
          </div>
          <div className="relative aspect-[4/5] max-h-[520px] overflow-hidden rounded-[28px] border-4 border-[#F4EFE6]">
            <Image src={photos.jardin.src} alt={photos.jardin.alt} fill sizes="(min-width: 1024px) 420px, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <Section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-8">
          <Intitule surtitre="Comment on travaille" titre="De ta maison à sa jumelle." />
          <div className="relative aspect-[3/2] overflow-hidden rounded-[28px]">
            <Image src={photos.salon.src} alt={photos.salon.alt} fill sizes="(min-width: 1024px) 460px, 100vw" className="object-cover" />
          </div>
        </div>
        <ol className="space-y-4 self-start">
          {ETAPES.map((e, i) => (
            <li key={e.titre} className="grid grid-cols-[3rem_1fr] gap-4 border-b-2 border-[var(--trait)] pb-4">
              <span className="font-[family-name:var(--titres)] text-[40px] font-extrabold leading-none text-[var(--accent-texte)]">{i + 1}</span>
              <span>
                <span className="block font-[family-name:var(--titres)] text-[21px] font-bold">{e.titre}</span>
                <span className="block leading-relaxed text-[var(--doux)]">{e.texte}</span>
              </span>
            </li>
          ))}
        </ol>
      </Section>

      <Section sombre className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <Intitule surtitre="Honoraires" titre="Dits avant de commencer.">
          Notre rémunération dépend de la mission : au forfait, fixé avant le début de la mission,
          ou calculée selon la mission. Avant tout engagement, nous t&apos;en communiquons les
          modalités ; elles figurent au contrat.
        </Intitule>
        <ul className="divide-y divide-[var(--trait)] rounded-[24px] border-2 border-[var(--trait)]">
          {[
            ["Visite et diagnostic chez toi", "180 € TTC"],
            ["Esquisse, deux pistes chiffrées", "1 400 € TTC"],
            ["Mission complète, sous-sol transformé", "9 600 € TTC"],
          ].map(([quoi, prix]) => (
            <li key={quoi} className="flex items-baseline justify-between gap-4 px-5 py-4">
              <span>{quoi}</span>
              <span className="shrink-0 text-right font-[family-name:var(--titres)] text-[20px] font-bold">
                {prix}
                <span className="block text-[12px] font-normal text-[var(--doux)]">exemple</span>
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="questions" className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Intitule surtitre="Questions" titre="Ce que les voisins demandent." />
        <Faq />
      </Section>

      <Section className="pt-0">
        <div className="space-y-3 rounded-[28px] border-2 border-[var(--encre)] bg-[var(--carte)] p-6 sm:p-10">
          <p className="font-[family-name:var(--titres)] text-[30px] font-extrabold leading-tight">On passe voir la tienne&nbsp;?</p>
          <p className="text-[var(--doux)]">{agence.adresse.join(", ")} · <span className="font-semibold text-[var(--encre)] tabular-nums">{agence.telephone}</span> (numéro de fiction : il ne sonne chez personne).</p>
        </div>
      </Section>
    </main>
  );
}
