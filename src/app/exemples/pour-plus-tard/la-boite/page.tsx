import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import AtelierBoite from "../_composants/AtelierBoite";
import { AppelFinal, Bouton, EnTetePage, Surtitre } from "../_composants/Blocs";
import { DEROULE, DOSSIER, FORMULE, INVENTAIRE, photos } from "../_composants/donnees";

// La séance et la boîte : la seule formule (« Créer une marque »), et son prix affiché en
// grand, tout en haut (« Remplir l'agenda » : « Et le prix, affiché. » — parce qu'on tape
// « combien coûte un shooting photo famille »). Prix TTC d'exemple.
export const metadata: Metadata = {
  title: "La séance et la boîte — Pour Plus Tard, site de démonstration",
  description: "Une séance d'une heure et une boîte de vingt tirages à ton nom, livrée chez toi : 390 € TTC, prix d'exemple affiché. Site de démonstration d'un studio photo imaginaire.",
  ...adressesDeLaPage("/exemples/pour-plus-tard/la-boite"),
};

export default function LaBoite() {
  return (
    <main>
      <EnTetePage
        surtitre="La séance et la boîte · prix d'exemple"
        titre={"Une séance, vingt tirages\u00a0: *390 €.*"}
        tirages={[
          { ...photos.colis, legende: "livrée chez toi" },
          { ...photos.albumFleurs, legende: "pour plus tard" },
          { ...photos.tirageMer, legende: "été 2026" },
        ]}
        apres={
          <Apparition delai={600} className="flex flex-wrap gap-3">
            <Bouton href={`${DOSSIER}/reserver`}>Choisir ma date</Bouton>
            <Bouton href="#etiquette" variante="contour">Écrire l&apos;étiquette</Bouton>
          </Apparition>
        }
      >
        <span data-film="prix">
          TTC, livraison comprise. Une heure ensemble, chez toi ou dehors ; trois semaines plus tard,
          la boîte arrive par la poste, ficelée. Le même prix pour tout le monde.
        </span>
      </EnTetePage>

      {/* ---------- Le prix, en entier ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <Apparition de="zoom" className="rounded-[6px] bg-[var(--accent)] p-8 text-[var(--sur-accent)] sm:p-12">
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em]">{FORMULE.nom} · exemple</p>
            <p className="mt-6 font-[family-name:var(--titres)] text-[clamp(6rem,15vw,12rem)] font-medium leading-[0.8] tracking-[-0.05em] tabular-nums">
              {FORMULE.prix}
            </p>
            <ul className="mt-10 grid gap-x-8 gap-y-3 text-[17px] sm:grid-cols-2">
              {FORMULE.details.map((d) => (
                <li key={d} className="flex gap-3 border-t border-white/25 pt-3">
                  <span aria-hidden="true">✓</span>
                  {d}
                </li>
              ))}
            </ul>
          </Apparition>
          <div className="grid gap-5">
            <Apparition delai={150} className="rounded-[6px] border border-[var(--trait)] bg-[var(--carte)] p-8">
              <p className="font-[family-name:var(--titres)] text-3xl">En plus, si tu veux</p>
              <ul className="mt-4 space-y-3 text-[17px] text-[var(--doux)]">
                {FORMULE.pasCompris.map((d) => <li key={d}>{d}</li>)}
              </ul>
            </Apparition>
            <Apparition delai={300} className="flex flex-col justify-between gap-6 rounded-[6px] bg-[var(--sombre)] p-8 text-[var(--sur-sombre)]">
              <p className="font-[family-name:var(--titres)] text-3xl leading-tight">Réglé le jour de la séance. <em className="text-[#E0B48C]">Rien en ligne.</em></p>
              <Bouton href={`${DOSSIER}/reserver`} variante="clair">Voir les dates de novembre</Bouton>
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- L'étiquette ---------- */}
      <section id="etiquette" className="scroll-mt-24 border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto max-w-6xl space-y-12 px-5 py-24 sm:px-8 md:py-28">
          <div className="max-w-3xl space-y-6">
            <Apparition><Surtitre numero="1" className="text-[var(--doux)]">L&apos;étiquette</Surtitre></Apparition>
            <TitreRevele
              texte="Écris le nom *sur la boîte.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5.4vw,4.6rem)] font-medium leading-[0.95] tracking-[-0.03em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
          </div>
          <AtelierBoite />
        </div>
      </section>

      {/* ---------- Dans la boîte ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
        <div className="mb-12 max-w-3xl space-y-6">
          <Apparition><Surtitre numero="2" className="text-[var(--doux)]">Dans la boîte</Surtitre></Apparition>
          <TitreRevele
            texte="Cinq choses, *pas une de plus.*"
            className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5.4vw,4.6rem)] font-medium leading-[0.95] tracking-[-0.03em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
        </div>
        <ul className="grid gap-4 md:grid-cols-6">
          {INVENTAIRE.map((x, i) => (
            <Apparition
              as="li"
              key={x.n}
              de="zoom"
              delai={i * 100}
              className={`flex flex-col justify-between gap-8 rounded-[6px] p-7 ${i < 2 ? "md:col-span-3" : "md:col-span-2"} ${i === 0 ? "bg-[var(--sombre)] text-[var(--sur-sombre)]" : i === 3 ? "bg-[#C9A27E] text-[#2A211D]" : "border border-[var(--trait)] bg-[var(--carte)]"}`}
            >
              <span className="font-[family-name:var(--titres)] text-[3rem] italic leading-none">{x.n}</span>
              <span className="space-y-2">
                <span className="block font-[family-name:var(--titres)] text-[1.7rem] leading-tight">{x.titre}</span>
                <span className="block text-[16px] leading-relaxed">{x.texte}</span>
              </span>
            </Apparition>
          ))}
        </ul>
      </section>

      {/* ---------- La séance, minute par minute ---------- */}
      <section className="px-3 sm:px-5">
        <div className="kit-grain overflow-hidden rounded-[6px] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto max-w-6xl space-y-12 px-6 py-20 sm:px-10 md:py-28">
            <div className="max-w-3xl space-y-6">
              <Surtitre numero="3">La séance</Surtitre>
              <TitreRevele
                texte="Une heure, *minute par minute.*"
                className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5.4vw,4.6rem)] font-medium leading-[0.95] tracking-[-0.03em]"
                classeAccent="italic text-[#E0B48C]"
              />
            </div>
            <ol className="grid gap-8 md:grid-cols-4">
              {DEROULE.map((d, i) => (
                <Apparition as="li" key={d.minute} delai={i * 120} className="space-y-3 border-t border-white/25 pt-5">
                  <span className="block font-[family-name:var(--titres)] text-[3.4rem] italic leading-none text-[#E0B48C]">{d.minute}′</span>
                  <span className="block font-[family-name:var(--titres)] text-[1.5rem] leading-tight">{d.titre}</span>
                  <span className="block text-[16px] leading-relaxed">{d.texte}</span>
                </Apparition>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <div className="h-16 md:h-24" />
      <AppelFinal />
    </main>
  );
}
