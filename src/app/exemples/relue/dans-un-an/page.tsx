import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, Arche, EnTetePage, Surtitre } from "../_composants/Blocs";
import LettreDansUnAn from "../_composants/LettreDansUnAn";
import { euros, maison, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Ta lettre dans un an — Relue, site de démonstration",
  description: "Le service de Relue, papeterie imaginaire : tu t'écris une lettre, on la cachette et on te la poste dans un an, jour pour jour.",
  ...adressesDeLaPage("/exemples/relue/dans-un-an"),
};

const ETAPES = [
  { titre: "Tu écris", texte: "Quelques lignes, ici. Ce que tu vis, ce que tu espères, ce que tu as peur d'oublier." },
  { titre: "On imprime et on cachette", texte: "Sur notre papier vergé, à la cire rouge. Personne ne la lit." },
  { titre: "On la garde", texte: "Dans une boîte, à l'atelier, rangée à sa date." },
  { titre: "On la poste", texte: "Un an après, jour pour jour : c'est la date de dépôt. La Poste fait le reste." },
];

export default function DansUnAn() {
  return (
    <main>
      <EnTetePage surtitre="Le service" titre="Ta lettre, dans un an. *Jour pour jour.*" photo={photos.cachet}>
        Tu t&apos;écris une lettre. On te la poste dans un an. Entre les deux, elle reste cachetée.{" "}
        {euros(maison.prixService)} TTC, papier, cire et timbre compris · exemple.
      </EnTetePage>

      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="space-y-8 lg:sticky lg:top-28">
          <Apparition><Surtitre>À toi d&apos;écrire</Surtitre></Apparition>
          <TitreRevele
            texte="Cher moi *de l'an prochain,*"
            className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5vw,4.6rem)] font-normal leading-[0.95] tracking-[-0.03em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
          <Apparition as="p" delai={150} className="max-w-md text-xl leading-relaxed text-[var(--doux)]">
            Quatre lignes suffisent. Puis « Cacheter » : la cire tombe, et le cachet de la poste prend la
            date d&apos;ici un an.
          </Apparition>
        </div>
        <div id="ecrire" className="scroll-mt-24 rounded-[2rem] border border-[var(--trait)] bg-[#F3EADA] p-4 sm:p-8">
          <LettreDansUnAn />
        </div>
      </section>

      <section className="px-3 sm:px-5">
        <div className="kit-grain overflow-hidden rounded-[2rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto grid max-w-6xl gap-14 px-6 py-20 sm:px-10 md:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-8">
              <Apparition><Surtitre clair>Ensuite</Surtitre></Apparition>
              <TitreRevele
                texte="Ce qui se passe *pendant un an.*"
                className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5vw,4.6rem)] font-normal leading-[0.95] tracking-[-0.03em]"
                classeAccent="italic text-[#F2C9A8]"
              />
              <ol className="space-y-6">
                {ETAPES.map((e, i) => (
                  <Apparition as="li" key={e.titre} delai={i * 120} de="gauche" className="flex gap-5 border-b border-white/20 pb-5">
                    <span className="w-12 shrink-0 font-[family-name:var(--titres)] text-3xl italic text-[#F2C9A8] tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="block font-[family-name:var(--titres)] text-2xl">{e.titre}</span>
                      <span className="text-lg leading-relaxed">{e.texte}</span>
                    </span>
                  </Apparition>
                ))}
              </ol>
            </div>
            <Apparition de="rideau">
              <Arche photo={photos.enveloppe} className="aspect-[4/5] w-full" />
            </Apparition>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-24 sm:px-8 md:grid-cols-[1fr_1fr] md:items-center">
        <Apparition className="relative aspect-[3/2] overflow-hidden rounded-[1.6rem] bg-[var(--sombre)]">
          <Image src={photos.lettres.src} alt={photos.lettres.alt} fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
        </Apparition>
        <div className="space-y-5">
          <TitreRevele
            texte="Ton adresse, *et rien d'autre.*"
            className="font-[family-name:var(--titres)] text-[clamp(2.4rem,4.4vw,3.8rem)] font-normal leading-[0.95] tracking-[-0.03em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
          <p className="text-lg leading-relaxed">
            Pour te poster ta lettre, il nous faut ton adresse. Elle ne sert qu&apos;à ça, et elle est
            effacée une fois la lettre partie. Si tu déménages d&apos;ici là, tu nous le dis : on change
            l&apos;enveloppe, pas la lettre.
          </p>
          <p className="text-[var(--doux)]">Sur ce site de démonstration, rien n&apos;est demandé, rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
