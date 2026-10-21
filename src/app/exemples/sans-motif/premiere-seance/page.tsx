import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import { BoutonRdv, Photographie, Questions, Surtitre, Trait } from "../_composants/Blocs";
import { cabinet, photos, premiereSeance } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "La première séance — Sans Motif, site de démonstration",
  description:
    "Comment se passe une première séance chez une psychologue imaginaire : rien à préparer, rien à justifier, la suite décidée ensemble.",
  ...adressesDeLaPage("/exemples/sans-motif/premiere-seance"),
};

export default function PremiereSeance() {
  return (
    <main>
      <section className="max-w-6xl mx-auto px-5 sm:px-6 pt-10 sm:pt-16 pb-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div className="space-y-6">
          <Surtitre>La première séance · {cabinet.seance.duree}</Surtitre>
          <h1 className="text-[44px] sm:text-7xl font-normal tracking-[-0.045em]">
            Vous n&apos;avez <span className="font-bold">rien à préparer.</span>
            <Trait className="mt-2 w-52 text-[var(--accent)]" />
          </h1>
          <p className="text-lg leading-relaxed text-[var(--doux)] max-w-xl">
            Pas de liste, pas de résumé, pas de « motif ». Voici comment se passent les
            cinquante premières minutes — un déroulé, pas une promesse.
          </p>
        </div>
        <Photographie photo={photos.fauteuil} priority sizes="(min-width: 1024px) 460px, 100vw" className="aspect-[4/3]" />
      </section>

      <section className="max-w-6xl mx-auto px-5 sm:px-6 pb-20">
        <ol className="relative space-y-3">
          {premiereSeance.map((p, i) => (
            <li key={p.titre} className="rounded-[28px] bg-[var(--carte)] p-6 sm:p-8 grid gap-3 sm:grid-cols-[120px_1fr] sm:items-baseline">
              <p className="font-[family-name:var(--titres)] text-5xl font-semibold tracking-[-0.05em] text-[var(--accent-texte)] tabular-nums">{String(i + 1).padStart(2, "0")}</p>
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.03em]">{p.titre}</h2>
                <p className="text-lg leading-relaxed text-[var(--doux)]">{p.texte}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="px-3 sm:px-6">
        <div className="max-w-6xl mx-auto rounded-[36px] bg-[var(--sombre)] text-[var(--sur-sombre)] px-6 py-14 sm:px-12 grid gap-6 lg:grid-cols-2 lg:items-center">
          <h2 className="text-[34px] sm:text-5xl font-normal tracking-[-0.04em]">
            La confidentialité, <span className="font-bold">et ses limites.</span>
          </h2>
          <p className="text-lg leading-relaxed text-[#C9D0DA]">
            Ce que vous dites en séance reste entre nous. Je vous explique dès la première
            séance les rares situations où la loi m&apos;autorise ou m&apos;oblige à en parler :
            vous savez à quoi vous en tenir avant de commencer.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-20 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-6">
          <Surtitre>Questions</Surtitre>
          <h2 className="text-[40px] sm:text-5xl font-normal tracking-[-0.045em]">Et <span className="font-bold">aussi.</span></h2>
          <BoutonRdv />
        </div>
        <Questions />
      </section>
    </main>
  );
}
