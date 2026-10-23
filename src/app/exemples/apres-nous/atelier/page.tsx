import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, CHANFREIN_GRAND, EnTetePage } from "../_composants/Blocs";
import Repas from "../_composants/Repas";
import { atelier, etapesBois, etapesTerre, photos, questions } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "L'atelier — Après Nous, site de démonstration",
  description: "L'atelier imaginaire d'Après Nous : le bois et la terre, étape par étape, et le premier repas filmé avec l'accord écrit de la famille.",
  ...adressesDeLaPage("/exemples/apres-nous/atelier"),
};

export default function Atelier() {
  return (
    <main>
      <EnTetePage numero="VII" surtitre="L'atelier" titre="Deux établis, *un registre.*" photo={photos.huile}>
        Après Nous, c&apos;est un atelier et deux paires de mains : l&apos;une au bois, l&apos;autre à la terre. Pas de
        série : chaque table est dessinée pour une pièce, chaque bol tourné une fois.
      </EnTetePage>

      <section className="mx-auto grid max-w-7xl gap-16 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-2">
        {[
          { titre: "Le bois", etapes: etapesBois.map((e) => ({ ...e, duree: "" })), photo: photos.assemblage },
          { titre: "La terre", etapes: etapesTerre, photo: photos.tournage },
        ].map((m, k) => (
          <div key={m.titre} className="space-y-8">
            <Apparition de="rideau" delai={k * 150} className={`relative aspect-[16/10] overflow-hidden ${CHANFREIN_GRAND}`}>
              <Image src={m.photo.src} alt={m.photo.alt} fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
            </Apparition>
            <TitreRevele texte={`*${m.titre}*`} className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5vw,4.4rem)] leading-none" classeAccent="italic text-[var(--accent-texte)]" />
            <ol className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
              {m.etapes.map((e, i) => (
                <Apparition as="li" key={e.titre} delai={i * 90} className="grid gap-2 py-6 sm:grid-cols-[4rem_1fr]">
                  <span className="font-[family-name:var(--titres)] text-3xl italic text-[var(--accent-texte)]">{["I", "II", "III", "IV"][i]}.</span>
                  <div className="space-y-1.5">
                    <h2 className="font-[family-name:var(--titres)] text-2xl">{e.titre}{e.duree ? <span className="text-base text-[var(--doux)]"> · {e.duree}</span> : null}</h2>
                    <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
                  </div>
                </Apparition>
              ))}
            </ol>
          </div>
        ))}
      </section>

      <section className="bg-[var(--accent)] text-[var(--sur-accent)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-2 lg:items-center">
          <Apparition de="zoom" className="[&_figcaption]:text-[var(--sur-accent)]">
            <Repas />
          </Apparition>
          <div className="space-y-6">
            <TitreRevele
              texte="Le premier repas, *avec votre accord.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.95] tracking-[-0.02em]"
              classeAccent="italic"
            />
            <Apparition as="p" delai={150} className="text-lg leading-relaxed">
              Quand la famille le veut, on revient le soir de la livraison et on filme le premier repas, d&apos;en haut.
              Avant, on signe ensemble un accord qui dit où la vidéo sera publiée. Les visages peuvent être floutés ; la
              vidéo est retirée dès qu&apos;on nous le demande.
            </Apparition>
            <Apparition as="p" delai={200}>Une famille qui ne veut pas être filmée a exactement la même table, et le même registre.</Apparition>
          </div>
        </div>
      </section>

      <section className="px-3 py-5 sm:px-5">
        <div className="mx-auto grid max-w-7xl gap-12 rounded-[2.5rem] bg-[var(--sombre)] px-5 py-20 text-[var(--sur-sombre)] sm:px-10 md:py-28 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-5">
            <TitreRevele
              texte="Ce qu'on promet, *et ce qu'on ne promet pas.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5vw,4.4rem)] leading-[0.95] tracking-[-0.02em]"
              classeAccent="italic text-[#E0B36A]"
            />
            <p className="text-[var(--sur-sombre)]/90">{atelier.horaires}. {atelier.adresse}.</p>
          </div>
          <dl className="divide-y divide-white/20 border-y border-white/20">
            {questions.slice(3).map((x, i) => (
              <Apparition key={x.q} delai={i * 100} className="py-5">
                <dt className="font-[family-name:var(--titres)] text-2xl">{x.q}</dt>
                <dd className="mt-2 leading-relaxed text-[var(--sur-sombre)]/90">{x.r}</dd>
              </Apparition>
            ))}
          </dl>
        </div>
      </section>
      <p className="mx-auto max-w-3xl px-5 pb-16 pt-6 text-center text-[15px] leading-relaxed text-[var(--doux)] sm:px-8">
        « Ébéniste », « céramiste », « atelier » et « fait main » décrivent une façon de faire. Les titres d&apos;artisan,
        d&apos;artisan d&apos;art et de maître artisan sont réservés à ceux qui en ont la qualité : ce site ne les emploie pas.
      </p>
      <AppelFinal />
    </main>
  );
}
