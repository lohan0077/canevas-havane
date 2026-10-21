import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { COMPRIS, DOSSIER, ETAPES, QUESTIONS, photos } from "./_composants/donnees";
import { VOLUMES, euros } from "./_composants/calendrier";
import { AppelFinal, DevisExemple, Etiquette, Section } from "./_composants/Blocs";
import CalendrierPrix from "./_composants/CalendrierPrix";

export const metadata: Metadata = {
  title: "Bon Mardi — site de démonstration",
  description: "Site de démonstration d'un déménageur imaginaire, réalisé par Canevas Havane : chaque date a son prix, comme un billet de train, et le mardi coûte beaucoup moins.",
  ...adressesDeLaPage("/exemples/bon-mardi"),
};

export default function BonMardi() {
  return (
    <>
      {/* Premier écran inspiré du modèle « Daisy Sweet » de MotionSites : un aplat de
          couleur et sa petite carte-produit d'un côté, l'image de l'autre. La carte
          devient un billet ; l'image, le camion qui roule. */}
      <section className="grid md:grid-cols-2 border-b-2 border-[var(--encre)]">
        <div className="relative bg-[var(--sombre)] text-[var(--sur-sombre)] px-5 sm:px-10 pt-6 pb-8 sm:pb-12 flex flex-col gap-8 min-h-[600px] md:min-h-[720px]">
          <div className="flex justify-between text-xs font-bold uppercase tracking-[0.16em]">
            <span>Déménagements</span>
            <span>Exemple-Ville</span>
          </div>
          <h1 className="text-[58px] sm:text-[84px] font-extrabold tracking-[-0.04em] leading-[0.92]">
            Déménage un <span className="text-[var(--accent)]">mardi.</span>
          </h1>
          <div className="self-center w-full max-w-[300px] rotate-[-3deg] rounded-xl bg-[var(--accent)] text-[var(--sur-accent)] border-2 border-[var(--encre)] shadow-[6px_6px_0_var(--encre)]">
            <div className="flex items-center justify-between px-4 pt-3 text-xs font-bold uppercase tracking-[0.14em]">
              <span>Billet</span><span>Aller simple</span>
            </div>
            <div className="px-4 pb-3 pt-2 flex items-end justify-between gap-3 border-b-2 border-dashed border-[var(--encre)]">
              <div>
                <p className="font-[family-name:var(--titres)] text-3xl font-extrabold leading-none">Mardi</p>
                <p className="text-sm font-bold mt-1">T2 · 18&nbsp;m³</p>
              </div>
              <p className="text-right">
                <span className="block text-xs font-bold">dès</span>
                <span className="font-[family-name:var(--titres)] text-3xl font-extrabold tabular-nums">{euros(690)}</span>
              </p>
            </div>
            <p className="px-4 py-2 text-xs font-bold">TTC · prix indicatif d'exemple</p>
          </div>
          <div className="mt-auto flex items-end justify-between gap-4">
            <ul className="text-xs leading-relaxed uppercase tracking-[0.08em]">
              {VOLUMES.map((v) => (
                <li key={v.id}><span className="font-bold">{v.nom}</span> le mardi dès {euros(v.base)}</li>
              ))}
            </ul>
            <Link href={`${DOSSIER}#calendrier`} className="shrink-0 inline-flex h-12 items-center rounded-full bg-[var(--sur-sombre)] text-[var(--sombre)] px-5 font-extrabold">
              Ma date
            </Link>
          </div>
        </div>
        <div className="relative min-h-[300px] md:min-h-0">
          <Image src={photos.route.src} alt={photos.route.alt} fill priority sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
      </section>

      <Section className="grid gap-10 md:grid-cols-2 md:items-center">
        <div className="space-y-5">
          <Etiquette>Pourquoi le mardi</Etiquette>
          <h2 className="text-[44px] sm:text-6xl font-extrabold tracking-[-0.03em] leading-[0.98]">Tout le monde veut le samedi. Le mardi, le camion dort.</h2>
          <p className="text-lg leading-relaxed">
            Le samedi de la fin du mois, on refuse du monde. Le mardi du milieu du mois, le camion
            attend au dépôt. Alors on fait comme les billets de train&nbsp;: chaque date a son prix.
            Le samedi coûte plus cher. Le mardi, beaucoup moins — et c'est la même équipe.
          </p>
        </div>
        <div className="relative aspect-[3/2] overflow-hidden rounded-[24px] border-2 border-[var(--encre)]">
          <Image src={photos.piece.src} alt={photos.piece.alt} fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover" />
        </div>
      </Section>

      <div className="bg-[#DCE4FF] border-y-2 border-[var(--encre)]">
        <Section id="calendrier" className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="space-y-5 lg:sticky lg:top-28">
            <Etiquette>Prix par date</Etiquette>
            <h2 className="text-[44px] sm:text-6xl font-extrabold tracking-[-0.03em] leading-[0.98]">Choisis ta date, comme un billet de train.</h2>
            <p className="text-lg leading-relaxed">
              Ton volume, ton mois, ta date&nbsp;: le prix s'affiche. Les mardis sont en jaune. Prix
              indicatifs TTC, jusqu'à 30&nbsp;km&nbsp;; le prix ferme vient au devis, gratuit.
            </p>
          </div>
          <CalendrierPrix />
        </Section>
      </div>

      <Section className="space-y-10">
        <div className="max-w-2xl space-y-4">
          <Etiquette>Ce qui est compris</Etiquette>
          <h2 className="text-[44px] sm:text-6xl font-extrabold tracking-[-0.03em] leading-[0.98]">Le même déménagement, quel que soit le jour.</h2>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {COMPRIS.map((c, i) => (
            <li key={c.titre} className="rounded-[20px] border-2 border-[var(--encre)] bg-[var(--carte)] p-5 space-y-2">
              <p className="font-[family-name:var(--titres)] text-4xl font-extrabold text-[var(--accent-texte)] tabular-nums">0{i + 1}</p>
              <h3 className="text-2xl font-extrabold">{c.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{c.texte}</p>
            </li>
          ))}
        </ul>
      </Section>

      <div className="bg-[var(--carte)] border-y-2 border-[var(--encre)]">
        <Section className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-5">
            <Etiquette>Le devis</Etiquette>
            <h2 className="text-[44px] sm:text-6xl font-extrabold tracking-[-0.03em] leading-[0.98]">Gratuit, écrit, et définitif.</h2>
            <p className="text-lg leading-relaxed">
              Avant tout contrat, tu reçois un devis gratuit. Il dit exactement ce qu'on fait, le
              montant HT et TTC, et que ce prix est définitif. C'est la règle du métier, et c'est
              ce qui rend le prix du calendrier honnête&nbsp;: il ne bouge plus une fois ton volume calculé.
            </p>
            <Link href={`${DOSSIER}/tarifs`} className="inline-block font-bold underline underline-offset-4 decoration-2">Nos tarifs et ce que dit le devis</Link>
          </div>
          <DevisExemple />
        </Section>
      </div>

      <Section className="grid gap-10 md:grid-cols-[1fr_1fr] md:items-center">
        <div className="relative aspect-[2/3] max-h-[560px] overflow-hidden rounded-[24px] border-2 border-[var(--encre)] md:order-2">
          <Image src={photos.porte.src} alt={photos.porte.alt} fill sizes="(min-width: 768px) 480px, 100vw" className="object-cover" />
        </div>
        <div className="space-y-6">
          <Etiquette>Ton déménagement, jour par jour</Etiquette>
          <h2 className="text-[44px] sm:text-6xl font-extrabold tracking-[-0.03em] leading-[0.98]">Les cartons, trois semaines avant. Le frigo, la veille.</h2>
          <ol className="space-y-2">
            {ETAPES.map((e) => (
              <li key={e.id} className="flex gap-4 border-b-2 border-[var(--trait)] pb-2">
                <span className="w-16 shrink-0 font-[family-name:var(--titres)] font-extrabold">{e.quand}</span>
                <span>{e.quoi}</span>
              </li>
            ))}
          </ol>
          <Link href={`${DOSSIER}/ton-demenagement`} className="inline-flex h-14 items-center rounded-full bg-[var(--encre)] px-7 text-lg font-extrabold text-[var(--carte)]">
            Mon planning, daté
          </Link>
        </div>
      </Section>

      <div className="bg-[var(--carte)] border-y-2 border-[var(--encre)]">
        <Section id="questions" className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-4">
            <Etiquette>Questions</Etiquette>
            <h2 className="text-[44px] sm:text-6xl font-extrabold tracking-[-0.03em] leading-[0.98]">Ce qu'on nous demande.</h2>
            <div className="relative mt-6 hidden aspect-[3/2] overflow-hidden rounded-[24px] border-2 border-[var(--encre)] lg:block">
              <Image src={photos.canape.src} alt={photos.canape.alt} fill sizes="420px" className="object-cover" />
            </div>
          </div>
          <div className="space-y-3">
            {QUESTIONS.map((q) => (
              <details key={q.q} className="group rounded-[18px] border-2 border-[var(--encre)] bg-[var(--fond)] px-5 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-extrabold">
                  {q.q}
                  <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-[var(--sur-accent)] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 leading-relaxed">{q.r}</p>
              </details>
            ))}
          </div>
        </Section>
      </div>

      <AppelFinal />
    </>
  );
}
