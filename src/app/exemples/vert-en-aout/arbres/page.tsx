import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { AppelFinal, EnTetePage, Note } from "../_composants/Blocs";
import { ARBRES, DOSSIER, PHOTOS } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Quand tailler — Vert en Août (démonstration)",
  description: "Quand tailler un olivier, un cerisier, une haie : la réponse d'un paysagiste imaginaire en trois lignes, et un bouton pour réserver la taille.",
  ...adressesDeLaPage("/exemples/vert-en-aout/arbres"),
};

export default function Arbres() {
  return (
    <main>
      <EnTetePage surtitre="Une page par arbre" titre={"Quand *tailler\u00a0?*"} photo={PHOTOS.olivier} note="trois lignes, pas plus">
        La question qu&apos;on tape tous un jour. Notre réponse, en trois lignes, arbre par arbre, et
        un bouton pour réserver la taille.
      </EnTetePage>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
        <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
          {ARBRES.map((a, i) => (
            <Apparition as="li" key={a.slug} delai={i * 110}>
              <Link href={`${DOSSIER}/arbres/${a.slug}`} className="group grid gap-6 py-10 md:grid-cols-[1fr_auto] md:items-center">
                <span className="flex items-center gap-6">
                  <span className="relative hidden h-28 w-24 shrink-0 overflow-hidden rounded-t-[999px] rounded-b-[1rem] bg-[var(--sombre)] sm:block">
                    {a.photo && <Image src={a.photo.src} alt="" fill sizes="96px" className="object-cover" />}
                  </span>
                  <span>
                    <span className="block font-[family-name:var(--titres)] text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold leading-[1] tracking-[-0.03em] group-hover:underline group-hover:decoration-2 group-hover:underline-offset-8">
                      {a.question}
                    </span>
                    <span className="mt-3 block max-w-2xl text-[17px] leading-relaxed text-[var(--doux)]">{a.reponse[0]}</span>
                  </span>
                </span>
                <Note className="text-[var(--accent-texte)] md:text-right">{a.saison} →</Note>
              </Link>
            </Apparition>
          ))}
        </ul>
      </section>

      <AppelFinal />
    </main>
  );
}
