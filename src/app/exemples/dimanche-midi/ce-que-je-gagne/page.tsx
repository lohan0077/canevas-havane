import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { ACCENT, EnTetePage, Surtitre, TITRE, VersRendezVous } from "../_composants/Blocs";
import Ticket from "../_composants/Ticket";
import { photos } from "../_composants/donnees";

// Le ticket de la vidéo « Remplir l'agenda », avec son calcul : ce que me reversent les
// partenaires sur l'épargne confiée — ce que gagne le conseiller, jamais ce que gagnerait le
// client (CMF L541-8-1, 5°, 7° b et 8°). Taux et montants d'exemple.
export const metadata: Metadata = {
  title: "Ce que je gagne — Dimanche Midi, site de démonstration",
  description:
    "Ce que gagne un conseiller en gestion de patrimoine imaginaire, ligne par ligne : honoraires, rétrocessions prises sur les frais, et un calcul sur ton épargne.",
  ...adressesDeLaPage("/exemples/dimanche-midi/ce-que-je-gagne"),
};

const EXPLICATIONS = [
  {
    titre: "Les honoraires",
    texte:
      "Tu les paies directement : le bilan une fois, le suivi chaque année. Ils sont écrits dans la lettre de mission, avant que je commence. 900 € et 300 € TTC par an, en exemple. Le carnet, le premier rendez-vous et le dimanche ne coûtent rien.",
  },
  {
    titre: "Les rétrocessions",
    texte:
      "Quand tu souscris un contrat ou des fonds sur mon conseil, l'assureur et la société de gestion me reversent une part des frais qu'ils te prélèvent. Elles ne s'ajoutent pas à tes frais : elles en font partie. Je te les montre quand même, parce que c'est toi qui les paies.",
  },
  {
    titre: "Non indépendant, et pourquoi",
    texte:
      "Un conseiller qui se dit indépendant ne garde aucune rémunération versée par un tiers (code monétaire et financier, art. L541-8-1). Je garde ces rétrocessions : mon conseil est donc « non indépendant », et je l'écris en tête du ticket.",
  },
  {
    titre: "Ce que tu reçois par écrit",
    texte:
      "Avant tout conseil, un document qui dit qui je suis, mes statuts et comment je suis payé. Puis la lettre de mission, avec mes honoraires. Puis, pour chaque recommandation, ce qu'elle coûte et ce que je touche.",
  },
];

export default function CeQueJeGagne() {
  return (
    <main>
      <EnTetePage surtitre="Ce que je gagne" titre="Mon ticket, *avant le tien.*" photo={photos.lac} origine="50% 60%">
        Fais glisser le curseur : le ticket chiffre ce que me reversent les partenaires sur
        l&apos;épargne que tu me confies. Il ne dit rien de ce que tu gagneras, toi : personne ne
        peut le promettre.
      </EnTetePage>

      <section className="mx-auto grid grid-cols-1 max-w-7xl gap-14 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div className="space-y-6">
          <Apparition><Surtitre>Le calcul</Surtitre></Apparition>
          <TitreRevele texte="Ligne *par ligne.*" className={`text-[clamp(2.8rem,6vw,5.4rem)] ${TITRE}`} classeAccent={ACCENT} />
          <Apparition as="p" delai={150} className="rounded-[1.5rem] border border-[var(--trait)] bg-[var(--carte)] p-5 text-[15px] leading-relaxed text-[var(--doux)]">
            Taux d&apos;exemple : 0,50 % par an reversé par l&apos;assureur, 0,40 % par an par la société de
            gestion, appliqués ici à toute l&apos;épargne confiée pour faire simple. En vrai, ils varient
            selon les contrats et les fonds, et ils te sont donnés pour chacun avant que tu ne souscrives.
          </Apparition>
        </div>
        <Apparition de="zoom" className="rounded-[2.5rem] bg-[var(--sombre)] px-4 py-10 sm:px-10">
          <Ticket calcul />
        </Apparition>
      </section>

      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
          <dl className="grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2">
            {EXPLICATIONS.map((e, i) => (
              <Apparition key={e.titre} delai={i * 100} className="space-y-3 border-t-2 border-[#B5523B] pt-5">
                <dt className="font-[family-name:var(--titres)] text-[36px] leading-tight">{e.titre}</dt>
                <dd className="text-[17px] leading-relaxed text-[var(--doux)]">{e.texte}</dd>
              </Apparition>
            ))}
          </dl>
        </div>
      </section>

      <VersRendezVous />
    </main>
  );
}
