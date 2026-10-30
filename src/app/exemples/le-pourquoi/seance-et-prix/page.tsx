import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Accordeon from "../../_kit/Accordeon";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, Bouton, Surtitre, Titre } from "../_composants/Blocs";
import { DOSSIER, deroule, photos, questions, seance, seanceAdulte, tarifs } from "../_composants/donnees";

// La page que la vidéo « Remplir l'agenda » filme : le prix et la durée, en gros (h1),
// puis la facture (#facture). Elle reçoit aussi ce qui a quitté l'accueil en version
// carrée : le « pourquoi » de chaque étape et toutes les questions.
export const metadata: Metadata = {
  title: "La séance et le prix — Le Pourquoi, site de démonstration",
  description:
    "Le prix et la durée d'une séance chez un ostéopathe imaginaire, écrits en gros, avec la facture pour la mutuelle et le déroulé minute par minute.",
  ...adressesDeLaPage("/exemples/le-pourquoi/seance-et-prix"),
};

export default function SeanceEtPrix() {
  return (
    <main>
      {/* Le prix et la durée, en gros : c'est ce que la vidéo filme d'abord. */}
      <section className="relative flex min-h-[64svh] flex-col bg-[var(--sombre)] text-[var(--sur-sombre)]" data-film="prix">
        <div className="mx-auto grid w-full max-w-6xl flex-1 items-end gap-12 px-6 pb-16 pt-36 md:pb-24 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="space-y-8">
            <Apparition><Surtitre clair>Séance adulte · prix d&apos;exemple</Surtitre></Apparition>
            <h1 className="font-normal leading-[0.9] tracking-[-0.03em] tabular-nums">
              <TitreRevele as="p" auChargement texte={seanceAdulte.duree} className="text-[clamp(5rem,14vw,10.5rem)]" />
              <TitreRevele as="p" auChargement delai={250} texte={seanceAdulte.prix} className="text-[clamp(5rem,14vw,10.5rem)] text-[#AEB8FF]" />
            </h1>
            <Apparition delai={600}>
              <p id="facture" className="inline-flex h-12 items-center gap-3 rounded-full border border-white/30 px-6 text-[15px] font-medium">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                Facture remise pour votre mutuelle
              </p>
            </Apparition>
            <Apparition as="p" delai={750} className="max-w-[26rem] text-lg leading-relaxed text-[var(--sur-sombre)]">
              Le même prix à 7 h et à 20 h. Carte bancaire, espèces ou chèque. La facture vous sert à
              demander une prise en charge à votre mutuelle, si votre contrat le prévoit.
            </Apparition>
          </div>
          <Apparition delai={300} className="relative hidden aspect-[4/5] overflow-hidden rounded-2xl lg:block">
            <Image src={photos.table.src} alt={photos.table.alt} fill priority sizes="380px" className="object-cover" />
          </Apparition>
        </div>
      </section>

      <section id="tarifs" className="scroll-mt-24">
        <div className="mx-auto max-w-6xl space-y-14 px-6 py-28 md:py-40">
          <div className="space-y-5">
            <Apparition><Surtitre>Les tarifs</Surtitre></Apparition>
            <Titre texte="Quatre lignes, *pas une de plus.*" />
          </div>
          <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {tarifs.map((t, i) => (
              <Apparition as="li" key={t.nom} delai={i * 90} className="grid gap-1 py-6 sm:grid-cols-[1fr_auto_auto] sm:items-baseline sm:gap-10">
                <div>
                  <p className="font-[family-name:var(--titres)] text-2xl">{t.nom}</p>
                  {t.note && <p className="text-[15px] text-[var(--doux)]">{t.note}</p>}
                </div>
                <p className="text-[var(--doux)] tabular-nums">{t.duree}</p>
                <p className="font-[family-name:var(--titres)] text-3xl tabular-nums">{t.prix}</p>
              </Apparition>
            ))}
          </ul>
          <p className="text-[15px] text-[var(--doux)]">Prix d&apos;exemple, TTC. Le cabinet est fictif.</p>
        </div>
      </section>

      <section className="bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 py-28 md:py-40 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <Apparition><Surtitre>Minute par minute</Surtitre></Apparition>
            <Titre texte="Ce qui se passe *sur la table.*" />
            <Apparition as="p" className="max-w-[26rem] text-lg leading-relaxed text-[var(--doux)]">Rien ne commence sans votre accord. Rien ne se fait sans être expliqué.</Apparition>
            <Apparition><Bouton href={`${DOSSIER}/rendez-vous`}>Réserver un créneau</Bouton></Apparition>
          </div>
          <ol className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {deroule.map((d, i) => (
              <Apparition as="li" key={d.titre} delai={i * 70} className="grid gap-x-6 gap-y-1 py-6 sm:grid-cols-[5rem_1fr]">
                <p className="text-[13px] font-medium tabular-nums text-[var(--doux)]">{d.minute} min</p>
                <div>
                  <h2 className="font-[family-name:var(--titres)] text-2xl font-normal">{d.titre}</h2>
                  <p className="mt-2 text-lg leading-relaxed text-[var(--doux)]">{d.texte}</p>
                </div>
              </Apparition>
            ))}
          </ol>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl space-y-14 px-6 py-28 md:py-40">
          <div className="space-y-5">
            <Apparition><Surtitre>La séance</Surtitre></Apparition>
            <Titre texte="Un *pourquoi* à chaque étape." />
          </div>
          <ul className="grid gap-x-10 gap-y-12 md:grid-cols-2">
            {seance.map((s, i) => (
              <Apparition as="li" key={s.etape} delai={(i % 2) * 120} className="space-y-3 border-t border-[var(--encre)] pt-6">
                <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--doux)]">{s.moment}</p>
                <h3 className="font-[family-name:var(--titres)] text-2xl font-normal leading-snug">{s.etape}</h3>
                <p className="text-lg leading-relaxed text-[var(--doux)]">
                  <span className="font-medium text-[var(--encre)]">Pourquoi ? </span>
                  {s.pourquoi}
                </p>
              </Apparition>
            ))}
          </ul>
        </div>
      </section>

      <section id="questions" className="scroll-mt-24 bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 py-28 md:py-40 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6">
            <Apparition><Surtitre>Vos questions</Surtitre></Apparition>
            <Titre texte="Ce qu'on me demande, *en entier.*" />
          </div>
          <Apparition delai={150}>
            <Accordeon questions={questions.map((q) => ({ question: q.q, reponse: q.r }))} />
          </Apparition>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
