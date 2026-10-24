import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import FondVivant from "../../_kit/FondVivant";
import TitreRevele from "../../_kit/TitreRevele";
import { ACCENT_CLAIR, ACCENT_SOMBRE, AppelFinal, Bouton, Surtitre } from "../_composants/Blocs";
import Dimanche from "../_composants/Dimanche";
import { DOSSIER, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Le message du dimanche — Rien à Signaler, site de démonstration",
  description:
    "Chaque dimanche à 9 h, un seul message : le rapport automatique de ton alarme. Sans télésurveillance. Installateur imaginaire, site de démonstration.",
  ...adressesDeLaPage("/exemples/rien-a-signaler/le-dimanche"),
};

const CE_QUIL_DIT = [
  { titre: "Les alertes de la semaine", texte: "Combien de fois la sirène a sonné, et quand. La plupart des semaines : zéro." },
  { titre: "Les fausses alertes", texte: "Celles que tu as arrêtées depuis ton téléphone. S'il y en a, on vient régler." },
  { titre: "L'état du matériel", texte: "Une pile faible, un détecteur qui ne répond plus : tu le sais avant que ça compte." },
];

// La page du message du dimanche. Le téléphone et son bouton portent les `data-film`
// filmés par la vidéo « Créer une marque » (« Et chaque dimanche matin, un seul message »).
export default function LeDimanche() {
  return (
    <main>
      <section className="kit-grain relative isolate overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <FondVivant couleurs={["#0B1328", "#1E3A5F", "#3F6E5A"]} vitesse={0.6} />
        <div className="absolute inset-0 bg-[var(--sombre)]/45" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-36 sm:px-8 md:pb-28 md:pt-44 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-7">
            <Apparition><Surtitre clair>Chaque dimanche, 9 h</Surtitre></Apparition>
            <TitreRevele
              as="h1"
              auChargement
              texte="Un seul message. *Rien à signaler.*"
              className="font-[family-name:var(--titres)] text-[clamp(3rem,7vw,6.6rem)] font-semibold leading-[0.95] tracking-[-0.055em]"
              classeAccent={ACCENT_SOMBRE}
            />
            <Apparition as="p" delai={400} className="max-w-xl text-xl leading-relaxed text-[var(--sur-sombre)]/90">
              Pas de notification à chaque porte ouverte. Une fois par semaine, le dimanche matin, le résumé de ta
              semaine. La plupart du temps, il tient en une ligne.
            </Apparition>
          </div>
          <Apparition de="zoom" delai={300} className="rounded-[2rem] bg-[var(--fond)] p-5 text-[var(--encre)] sm:p-8">
            <Dimanche />
          </Apparition>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
        <div className="mb-12 space-y-6">
          <Apparition><Surtitre>Ce que dit le message</Surtitre></Apparition>
          <TitreRevele
            texte="Trois lignes, *pas une de plus.*"
            className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5.5vw,5rem)] font-semibold leading-[0.98] tracking-[-0.05em]"
            classeAccent={ACCENT_CLAIR}
          />
        </div>
        <ul className="grid gap-4 md:grid-cols-3">
          {CE_QUIL_DIT.map((c, i) => (
            <Apparition as="li" key={c.titre} de="zoom" delai={i * 140} className="flex min-h-[240px] flex-col justify-between gap-6 rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] p-7">
              <span aria-hidden="true" className="font-[family-name:var(--titres)] text-5xl font-semibold tracking-[-0.05em] text-[var(--accent-texte)]">0{i + 1}</span>
              <span>
                <span className="block font-[family-name:var(--titres)] text-2xl font-semibold tracking-[-0.03em]">{c.titre}</span>
                <span className="mt-2 block text-lg leading-relaxed text-[var(--doux)]">{c.texte}</span>
              </span>
            </Apparition>
          ))}
        </ul>
      </section>

      <section className="px-3 pb-24 sm:px-5 md:pb-32">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] bg-[var(--sombre)] text-[var(--sur-sombre)] md:grid-cols-2">
          <div className="relative min-h-[320px] bg-[var(--sombre)]">
            <Image src={photos.cle.src} alt={photos.cle.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="space-y-6 p-8 sm:p-12">
            <TitreRevele
              texte={"Qui l'écrit ? *Personne.*"}
              className="font-[family-name:var(--titres)] text-[clamp(2.4rem,4.5vw,4rem)] font-semibold leading-[1] tracking-[-0.05em]"
              classeAccent={ACCENT_SOMBRE}
            />
            <p className="text-lg leading-relaxed text-[var(--sur-sombre)]/90">
              C&apos;est un rapport automatique de ton alarme : la centrale compte ce qu&apos;elle a enregistré, et
              l&apos;application te l&apos;envoie. Rien à Signaler ne fait pas de télésurveillance : aucune personne ne
              reçoit tes alertes, aucune personne ne regarde chez toi. Si la sirène sonne, c&apos;est ton téléphone qui
              le sait, et c&apos;est toi qui décides.
            </p>
            <Bouton href={`${DOSSIER}/mon-alarme`}>Composer mon alarme</Bouton>
          </div>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
