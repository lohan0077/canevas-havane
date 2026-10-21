import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Creneaux from "../../_kit/Creneaux";
import { Intitule, Onde, Section } from "../_composants/Blocs";
import Carnet from "../_composants/Carnet";
import { photos } from "../_composants/donnees";

// « Viens pour rien » : le coup de lancement de la vidéo, devenu une page. Une visite
// sans soin, sans examen, sans frais. Point à faire confirmer par le conseil régional
// de l'Ordre avant un vrai lancement (Code rural, R242-33, XVIII : la profession ne se
// pratique pas comme un commerce) — voir le SOURCES.md de la vidéo.
export const metadata: Metadata = {
  title: "Viens pour rien — Voix Basse, site de démonstration",
  description: "Une visite sans soin : ton animal renifle, a une friandise, et repart. Page de démonstration d'un cabinet vétérinaire imaginaire.",
  ...adressesDeLaPage("/exemples/voix-basse/pour-rien"),
};

const ETAPES = [
  { titre: "Il renifle", texte: "La salle, la table, nos mains. À son rythme, porte de la caisse ouverte." },
  { titre: "Il a une friandise", texte: "Si tu es d'accord, et si son alimentation le permet : dis-nous ce qu'il ne doit pas manger." },
  { titre: "Il repart", texte: "Dix minutes, pas plus. Sans examen, sans piqûre, sans facture." },
];

const MOMENTS = [
  { libelle: "Mercredi", sous: "17 h 30" },
  { libelle: "Mercredi", sous: "17 h 45", pris: true },
  { libelle: "Vendredi", sous: "18 h 00" },
  { libelle: "Samedi", sous: "11 h 45" },
  { libelle: "Samedi", sous: "12 h 00", pris: true },
  { libelle: "Samedi", sous: "12 h 15" },
];

export default function PourRien() {
  return (
    <main>
      <Section sombre className="grid gap-10 pt-12 lg:grid-cols-[1fr_1fr] lg:items-center sm:pt-20">
        <div className="space-y-7">
          <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">
            <Onde className="h-4 w-14" />
            Pour l&apos;ouverture du cabinet
          </p>
          <h1 className="text-[72px] sm:text-[112px] tracking-[-0.03em]">
            Viens <em className="text-[var(--accent-texte)]">pour rien.</em>
          </h1>
          <p className="max-w-lg text-lg leading-relaxed text-[var(--doux)]">
            Tu passes avec ton chat ou ton chien. Il renifle, il a une friandise, il repart.
            Aucun soin. Pour que la prochaine fois, la caisse redevienne juste une caisse.
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[28px]">
          <Image src={photos.friandise.src} alt={photos.friandise.alt} fill priority sizes="(min-width: 1024px) 540px, 100vw" className="object-cover" />
        </div>
      </Section>

      <Section className="space-y-12">
        <Intitule surtitre="Comment ça se passe" titre="Dix minutes, trois choses." />
        <ol className="grid gap-6 md:grid-cols-3">
          {ETAPES.map((e, i) => (
            <li key={e.titre} className="space-y-3 rounded-[24px] border border-[var(--trait)] bg-[var(--carte)] p-7">
              <p className="font-[family-name:var(--titres)] text-5xl text-[var(--accent-texte)]">{i + 1}</p>
              <h2 className="text-[34px]">{e.titre}</h2>
              <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section teinte className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <Carnet />
        <div className="space-y-6">
          <Intitule surtitre="Dans son carnet" titre={<>Une visite, <em>aucun soin.</em></>}>
            Elle s&apos;écrit dans son carnet comme une vraie. La prochaine fois qu&apos;il entrera
            ici, il connaîtra déjà l&apos;odeur de la salle.
          </Intitule>
        </div>
      </Section>

      <Section id="moment" className="space-y-10">
        <Intitule surtitre="Choisir un moment" titre="Quand le cabinet est le plus calme.">
          Le mercredi et le vendredi en fin de journée, le samedi en fin de matinée. Sans frais.
          Si ton animal a besoin d&apos;un soin, ce sera une consultation, et on te le dira avant.
        </Intitule>
        <div className="max-w-2xl">
          <Creneaux
            creneaux={MOMENTS}
            colonnes={3}
            titreCarte="Ta visite pour rien"
            bouton="Réserver ce moment"
            confirmation="C'est noté : viens pour rien, on t'attend."
            note="Moments d'exemple. Sur un vrai site, ils suivent l'agenda réel du cabinet."
          />
        </div>
      </Section>
    </main>
  );
}
