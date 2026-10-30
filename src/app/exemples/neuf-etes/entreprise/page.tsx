import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { AppelFinal, Bouton, EnTetePage, Monogramme, Titre } from "../_composants/Blocs";
import { DOSSIER, engagements, entreprise, equipe, garanties, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "L'entreprise — Neuf Étés (démonstration)",
  description: "Le nom, l'équipe, les engagements, les garanties et la zone d'une marque de piscines imaginaire de Drôme-Ardèche.",
  ...adressesDeLaPage("/exemples/neuf-etes/entreprise"),
};

const COMMUNES = ["Valence", "Romans-sur-Isère", "Bourg-lès-Valence", "Guilherand-Granges", "Tournon-sur-Rhône", "Tain-l'Hermitage", "Crest", "Privas"];

export default function Entreprise() {
  return (
    <main>
      <EnTetePage titre="Pourquoi Neuf Étés." photo={photos.faceAuxMontagnes}>
        Un nom qu&apos;un enfant retient du premier coup. Et une idée : une piscine ne vend pas
        de l&apos;eau, elle vend les étés qu&apos;on passe autour.
      </EnTetePage>

      {/* Le nom, et l'affiche. */}
      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-7">
          <Titre texte={"Neuf étés\u00a0: le temps qu'il reste à un enfant de 9\u00a0ans."} />
          <Apparition as="p" delai={200} className="max-w-xl text-xl leading-relaxed text-[var(--doux)]">
            Un été par an, jusqu&apos;à ses 18 ans. Le calcul est fait pour un enfant de 9 ans ;
            le tien est sur l&apos;accueil. {entreprise.nom} construit des piscines familiales
            en {entreprise.zone.join(", ")}, depuis {entreprise.depuis}.
          </Apparition>
          <Apparition delai={300}>
            <Bouton href={`${DOSSIER}#etes`} variante="sombre">Compter mes étés</Bouton>
          </Apparition>
        </div>
        <Apparition de="zoom" className="grid grid-cols-2 gap-4">
          {[
            ["#12445A", "Bleu profond"],
            ["#1F8FB3", "Bleu d'eau"],
            ["#F6C445", "Jaune soleil"],
            ["#FFF8EC", "Crème"],
          ].map(([fond, nom], i) => (
            <figure key={nom} className="space-y-3">
              <div aria-hidden="true" className="grid aspect-square place-items-center rounded-[2rem] border border-[var(--trait)]" style={{ background: fond }}>
                {i === 0 && <Monogramme className="h-16 w-16 text-3xl" />}
              </div>
              <figcaption className="font-[family-name:var(--titres)] text-lg font-normal">
                {nom} <span className="font-normal text-[var(--doux)]">{fond}</span>
              </figcaption>
            </figure>
          ))}
        </Apparition>
      </section>

      <section className="px-3 sm:px-5">
        <div className="rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto max-w-7xl space-y-14 px-5 py-24 sm:px-10 md:py-32">
            <h2 className="text-[clamp(2.5rem,6vw,5.25rem)] font-bold leading-[1] tracking-[-0.03em] text-balance">
              Quatre promesses, tenues par écrit.
            </h2>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {engagements.map((e, i) => (
                <Apparition as="li" key={e.titre} delai={i * 110} className="h-full">
                  <div className="h-full space-y-3 rounded-[2rem] border border-white/15 bg-[#0A2A39] p-7">
                    <h3 className="text-2xl font-bold text-[var(--accent)]">{e.titre}</h3>
                    <p className="leading-relaxed">{e.texte}</p>
                  </div>
                </Apparition>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-6">
          <Titre texte={"L'équipe\u00a0: trois noms, un numéro."} />
          <Apparition as="p" delai={200} className="text-xl leading-relaxed text-[var(--doux)]">
            Et deux poseurs qui travaillent avec nous depuis le début. Ton interlocuteur te donne
            son numéro direct dès la visite technique.
          </Apparition>
        </div>
        <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
          {equipe.map((p, i) => (
            <Apparition as="li" key={p.nom} delai={i * 120} className="grid gap-5 py-7 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-8">
              <span aria-hidden="true" className="grid h-16 w-16 place-items-center rounded-full bg-[var(--sombre)] font-[family-name:var(--titres)] text-xl font-normal text-[var(--accent)]">{p.initiales}</span>
              <span className="space-y-1">
                <span className="block font-[family-name:var(--titres)] text-2xl font-normal">{p.nom}</span>
                <span className="block font-bold text-[var(--accent-texte)]">{p.role}</span>
                <span className="block text-[var(--doux)]">{p.phrase}</span>
              </span>
            </Apparition>
          ))}
        </ul>
      </section>

      <section className="bg-[var(--accent)] text-[var(--sur-accent)]">
        <div className="mx-auto max-w-7xl space-y-12 px-5 py-24 sm:px-8 md:py-28">
          <div className="max-w-3xl space-y-5">
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1] tracking-[-0.03em] text-balance">Les garanties qui te protègent après le chantier.</h2>
            <p className="text-xl leading-relaxed">
              Les garanties que la loi impose à tout constructeur, et l&apos;assurance qui va avec :
              l&apos;attestation est jointe à chaque devis.
            </p>
          </div>
          <ul className="grid gap-5 md:grid-cols-3">
            {garanties.map((g, i) => (
              <Apparition as="li" key={g.titre} delai={i * 120} className="rounded-[2rem] bg-[var(--fond)] p-7 text-[var(--encre)]">
                <h3 className="text-2xl font-bold">{g.titre}</h3>
                <p className="mt-3 leading-relaxed text-[var(--doux)]">{g.texte}</p>
              </Apparition>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-2 lg:items-center">
        <div className="space-y-7">
          <Titre texte="On intervient en Drôme, en Ardèche et dans le Sud Isère." taille="moyen" />
          <Apparition as="p" delai={200} className="text-xl leading-relaxed text-[var(--doux)]">
            Dans un rayon de {entreprise.rayon} : assez près pour être là le premier et le dernier
            jour de chaque chantier.
          </Apparition>
          <ul className="flex flex-wrap gap-2">
            {COMMUNES.map((c) => (
              <li key={c} className="rounded-full border border-[var(--trait)] bg-[var(--carte)] px-4 py-2 text-[15px] font-bold">{c}</li>
            ))}
          </ul>
          <Bouton href={`${DOSSIER}/contact`} variante="sombre">Demander pour ma commune</Bouton>
        </div>
        <Apparition de="droite" className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem]">
          <Image src={photos.vueDuCiel.src} alt={photos.vueDuCiel.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </Apparition>
      </section>

      <AppelFinal />
    </main>
  );
}
