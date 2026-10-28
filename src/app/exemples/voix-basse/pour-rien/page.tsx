import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import CarteLueur from "../../_kit/CarteLueur";
import Creneaux from "../../_kit/Creneaux";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, EnTetePage, Surtitre } from "../_composants/Blocs";
import Carnet from "../_composants/Carnet";
import { CAISSE, POUR_RIEN, SOMBRE, photos } from "../_composants/donnees";

// « Viens pour rien » : le coup de lancement de la vidéo « Créer une marque », devenu une
// page. Une visite sans soin, sans examen, sans frais. Point à faire confirmer par le
// conseil régional de l'Ordre avant un vrai lancement (Code rural, R242-33, XVIII : la
// profession ne se pratique pas comme un commerce) — les mentions légales le disent.
export const metadata: Metadata = {
  title: "Viens pour rien — Voix Basse, site de démonstration",
  description: "Une visite sans soin : ton animal renifle, a une friandise, et repart. Page de démonstration d'un cabinet vétérinaire imaginaire.",
  ...adressesDeLaPage("/exemples/voix-basse/pour-rien"),
};

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
      <EnTetePage
        surtitre="Pour l'ouverture du cabinet"
        titre="Viens *pour rien.*"
        visuel={
          <div className="relative mx-auto w-full max-w-[380px] rotate-[-3deg] rounded-[6px] bg-[#2F4A3E] p-9 pb-10 text-[#FBF7EF] shadow-[0_40px_80px_-30px_rgba(47,74,62,0.8)]">
            <p className="font-[family-name:var(--titres)] text-[3.6rem] leading-[0.95]">Viens <em className="text-[#D6C8EE]">pour rien.</em></p>
            <p className="mt-10 text-[12px] font-semibold uppercase tracking-[0.22em]">Voix Basse · cabinet vétérinaire</p>
          </div>
        }
      >
        Tu passes avec ton chat ou ton chien. Il renifle, il a une friandise, il repart. Aucun
        soin. Pour que la prochaine fois, la caisse redevienne juste une caisse.
      </EnTetePage>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 md:pb-32">
        <div className="mb-12 space-y-6">
          <Apparition><Surtitre>Comment ça se passe</Surtitre></Apparition>
          <TitreRevele
            texte="Dix minutes, *trois choses.*"
            className="text-[clamp(2.6rem,5.4vw,5rem)] leading-[0.95] tracking-[-0.02em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
        </div>
        <ol className="grid gap-4 md:grid-cols-3">
          {POUR_RIEN.map((e, i) => (
            <Apparition as="li" key={e.titre} delai={i * 120} de="zoom">
              <CarteLueur className="h-full rounded-[2rem]">
                <div className="h-full space-y-3 rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] p-7">
                  <p className="font-[family-name:var(--titres)] text-6xl italic text-[var(--accent-texte)]">{i + 1}</p>
                  <h2 className="text-4xl">{e.titre}</h2>
                  <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
                </div>
              </CarteLueur>
            </Apparition>
          ))}
        </ol>
      </section>

      <section className="px-3 sm:px-5">
        <div style={SOMBRE} className="overflow-hidden rounded-[2.5rem] bg-[var(--fond)] text-[var(--encre)]">
          <div className="mx-auto grid max-w-6xl gap-14 px-6 py-20 sm:px-10 md:py-28 lg:grid-cols-2 lg:items-center">
            <Apparition de="zoom"><Carnet /></Apparition>
            <div className="space-y-6">
              <Apparition><Surtitre>Dans son carnet</Surtitre></Apparition>
              <TitreRevele
                texte="Une visite, *aucun soin.*"
                className="text-[clamp(2.6rem,5.4vw,5rem)] leading-[0.95] tracking-[-0.02em]"
                classeAccent="italic text-[var(--accent-texte)]"
              />
              <Apparition as="p" delai={150} className="text-lg leading-relaxed text-[var(--doux)]">
                Elle s&apos;écrit dans son carnet comme une vraie. La prochaine fois qu&apos;il entrera
                ici, il connaîtra déjà l&apos;odeur de la salle.
              </Apparition>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-8">
          <div className="space-y-6">
            <Apparition><Surtitre>Et la caisse ?</Surtitre></Apparition>
            <TitreRevele
              texte="Une caisse, *pas un signal.*"
              className="text-[clamp(2.6rem,5.4vw,5rem)] leading-[0.95] tracking-[-0.02em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
          </div>
          <ul className="space-y-4">
            {CAISSE.map((c, i) => (
              <Apparition as="li" key={c.titre} delai={i * 110} className="border-b border-[var(--trait)] pb-4">
                <p className="font-[family-name:var(--titres)] text-3xl">{c.titre}</p>
                <p className="mt-1 leading-relaxed text-[var(--doux)]">{c.texte}</p>
              </Apparition>
            ))}
          </ul>
          <Apparition de="rideau" className="relative aspect-[16/9] overflow-hidden rounded-[2rem]">
            <Image src={photos.friandise.src} alt={photos.friandise.alt} fill sizes="(min-width: 1024px) 520px, 100vw" className="object-cover" />
          </Apparition>
        </div>
        <div id="moment" className="scroll-mt-24 space-y-6">
          <Apparition><Surtitre>Choisir un moment</Surtitre></Apparition>
          <TitreRevele
            texte="Quand le cabinet est *le plus calme.*"
            className="text-[clamp(2.4rem,4.6vw,4.2rem)] leading-[0.95] tracking-[-0.02em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
          <Apparition as="p" delai={150} className="text-lg leading-relaxed text-[var(--doux)]">
            Le mercredi et le vendredi en fin de journée, le samedi en fin de matinée. Sans
            frais. Si ton animal a besoin d&apos;un soin, ce sera une consultation, et on te le
            dira avant.
          </Apparition>
          <Apparition de="zoom" delai={200} className="rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] p-5 sm:p-7">
            <Creneaux
              creneaux={MOMENTS}
              colonnes={3}
              titreCarte="Ta visite pour rien"
              bouton="Réserver ce moment"
              confirmation="C'est noté : viens pour rien, on t'attend."
              note="Moments d'exemple. Sur un vrai site, ils suivent l'agenda réel du cabinet."
            />
          </Apparition>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
