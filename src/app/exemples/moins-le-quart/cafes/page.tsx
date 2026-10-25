import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, EnTetePage, Surtitre } from "../_composants/Blocs";
import Commande from "../_composants/Commande";
import { IconeMethode } from "../_composants/Icones";
import Sachet from "../_composants/Sachet";
import { CAFES, METHODES, ORDRE, ORDRE_METHODES, euros, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Les trois cafés — Moins le Quart, site de démonstration",
  description: "Les trois cafés de la marque Moins le Quart (entreprise fictive) : 6 h 45, 15 h 45, et le décaféiné de 21 h 45 — et pour chaque cafetière, les deux qui lui vont.",
  ...adressesDeLaPage("/exemples/moins-le-quart/cafes"),
};

export default function Cafes() {
  return (
    <main>
      <EnTetePage surtitre="La gamme" titre="Trois cafés. *Toujours moins le quart.*" photo={photos.aube}>
        L&apos;heure est un nom, pas une consigne : bois celui que tu veux, quand tu veux. Chacun torréfié
        le mardi, la date au tampon sur le sachet.
      </EnTetePage>

      {ORDRE.map((k, i) => {
        const c = CAFES[k];
        const pour = ORDRE_METHODES.filter((m) => METHODES[m].cafes.includes(k));
        return (
          <section key={k} id={k} className={`scroll-mt-20 ${i % 2 ? "bg-[var(--carte)]" : ""}`}>
            <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 md:py-28 md:grid-cols-[0.6fr_1.4fr] md:items-center">
              <Apparition de="zoom"><Sachet cafe={c} /></Apparition>
              <div className="space-y-6">
                <Apparition><Surtitre>{c.enLettres}</Surtitre></Apparition>
                <TitreRevele texte={c.nom} className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5vw,4.4rem)] font-extralight leading-[0.95] tracking-[-0.045em]" />
                <p className="text-xl leading-relaxed">{c.phrase}</p>
                <dl className="grid gap-3 border-y border-[var(--trait)] py-5 sm:grid-cols-[10rem_1fr]">
                  <dt className="font-semibold">Ingrédient</dt>
                  <dd className="text-[var(--doux)]">{c.ingredient} Aucun allergène réglementaire.</dd>
                  <dt className="font-semibold">Pour</dt>
                  <dd className="flex flex-wrap gap-3 text-[var(--doux)]">
                    {pour.map((m) => (
                      <span key={m} className="inline-flex items-center gap-2 rounded-full border border-[var(--trait)] px-3 py-1">
                        <IconeMethode methode={m} className="h-5 w-5" /> {METHODES[m].libelle} · {METHODES[m].mouture}
                      </span>
                    ))}
                  </dd>
                  <dt className="font-semibold">Prix</dt>
                  <dd className="text-[var(--doux)] tabular-nums">{euros(c.prix)} TTC les 250 g · exemple</dd>
                </dl>
              </div>
            </div>
          </section>
        );
      })}

      <section id="commander" className="scroll-mt-16 px-3 pb-16 sm:px-5">
        <div className="kit-grain relative overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-10 md:py-28 md:grid-cols-[0.8fr_1.2fr]">
            <div className="space-y-6">
              <Surtitre clair>Au sachet</Surtitre>
              <TitreRevele texte="Commander." className="font-[family-name:var(--titres)] text-[clamp(2.8rem,5.6vw,5rem)] font-extralight leading-[0.95] tracking-[-0.045em]" />
              <p className="text-xl leading-relaxed text-[var(--sur-sombre)]/90">La mouture d&apos;abord, puis les sachets. Tu les retires au comptoir dès mercredi et tu paies sur place.</p>
            </div>
            <div className="rounded-[2rem] bg-[var(--fond)] p-4 text-[var(--encre)] sm:p-6">
              <Commande />
            </div>
          </div>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
