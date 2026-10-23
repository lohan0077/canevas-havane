import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Accordeon from "../_kit/Accordeon";
import Apparition from "../_kit/Apparition";
import CarteLueur from "../_kit/CarteLueur";
import Defilant from "../_kit/Defilant";
import TitreRevele from "../_kit/TitreRevele";
import { AppelFinal, Bouton, Surtitre } from "./_composants/Blocs";
import DeuxPortes from "./_composants/DeuxPortes";
import Eligible from "./_composants/Eligible";
import TarifDepannage from "./_composants/TarifDepannage";
import TroisFois from "./_composants/TroisFois";
import { COURS, DOSSIER, FICHES, GOUTER, QUESTIONS, entreprise, euros, photos } from "./_composants/donnees";

// L'accueil de Sans Soupir, l'informaticien à domicile des deux vidéos du dépannage
// informatique. De « Créer une marque » : on répète, sans soupirer ; les fiches du
// frigo ; le goûter numérique. De « Remplir l'agenda » : les deux portes (filmées,
// [data-film=portes]) ; le dimanche où ton père ne t'appelle plus pour l'imprimante ;
// des cours qui donnent envie ; la vraie réponse sur le crédit d'impôt.
export const metadata: Metadata = {
  title: "Sans Soupir — informatique à domicile, site de démonstration",
  description:
    "Le site d'un informaticien à domicile imaginaire qui répète sans soupirer : deux portes (c'est cassé, je veux apprendre), des prix clairs, la vraie réponse sur le crédit d'impôt et des fiches gratuites à imprimer.",
  ...adressesDeLaPage("/exemples/sans-soupir"),
};

export default function SansSoupir() {
  return (
    <main>
      {/* ---------- Premier écran, partagé en deux : la promesse, et la tablette ---------- */}
      <section className="relative overflow-hidden bg-[var(--fond)]">
        <div className="mx-auto grid min-h-[100svh] max-w-7xl items-center gap-12 px-5 pb-14 pt-28 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:pt-24">
          <div className="space-y-8">
            <Apparition><Surtitre>Informatique à domicile · {entreprise.ville}</Surtitre></Apparition>
            <TitreRevele
              as="h1"
              auChargement
              texte="On répète. *Sans soupirer.*"
              className="text-[clamp(3.6rem,10vw,8.6rem)] font-extrabold leading-[0.9] tracking-[-0.05em]"
              classeAccent="text-[var(--sombre)] underline decoration-[var(--accent)] decoration-[0.1em] underline-offset-[0.1em]"
            />
            <Apparition as="p" delai={600} className="max-w-xl text-[22px] leading-relaxed">
              Chez toi, sur ton ordinateur, ta tablette ou ton téléphone. On t&apos;explique trois fois
              s&apos;il le faut, et on te laisse la fiche, pour le frigo.
            </Apparition>
            <Apparition delai={800} className="flex flex-wrap gap-3">
              <Bouton href={`${DOSSIER}#portes`}>Je veux apprendre</Bouton>
              <Bouton href={`${DOSSIER}/c-est-casse`} variante="sombre">C&apos;est cassé</Bouton>
            </Apparition>
          </div>

          <div className="relative mx-auto w-full max-w-[560px]">
            <Apparition de="rideau" delai={200} className="relative aspect-[4/5] overflow-hidden rounded-[3rem] rounded-tl-[12rem] shadow-[0_50px_90px_-50px_rgba(34,50,61,.7)]">
              <Image src={photos.tablette.src} alt={photos.tablette.alt} fill priority sizes="(min-width: 1024px) 560px, 90vw" className="kit-cinema-img object-cover" />
            </Apparition>
            {/* La conversation : la question qu'on n'ose plus poser, et la réponse. */}
            <Apparition de="gauche" delai={900} className="absolute -left-2 top-[12%] max-w-[250px] rounded-[1.6rem] rounded-bl-md bg-[var(--carte)] px-5 py-4 shadow-[0_20px_40px_-20px_rgba(34,50,61,.5)] sm:-left-8">
              <p className="text-[17px] font-semibold leading-snug">Tu peux répéter ? C&apos;est la troisième fois…</p>
            </Apparition>
            <Apparition de="droite" delai={1400} className="absolute -right-2 top-[34%] max-w-[230px] rounded-[1.6rem] rounded-br-md bg-[var(--accent)] px-5 py-4 text-[var(--sur-accent)] shadow-[0_20px_40px_-20px_rgba(34,50,61,.5)] sm:-right-6">
              <p className="text-[17px] font-bold leading-snug">Bien sûr. On le refait ensemble ?</p>
            </Apparition>
            {/* La fiche n° 12, aimantée. */}
            <Apparition de="bas" delai={1100} className="absolute -bottom-6 left-4 w-[210px] rotate-[-5deg] rounded-[10px] bg-[var(--carte)] p-4 shadow-[0_24px_40px_-20px_rgba(34,50,61,.6)] sm:left-10">
              <span aria-hidden="true" className="absolute -top-2 left-1/2 h-5 w-5 -translate-x-1/2 rounded-full bg-[#FF9A80] shadow" />
              <p className="text-[12px] font-bold text-[var(--accent-texte)]">Fiche n° 12 · à imprimer</p>
              <p className="mt-1 font-[family-name:var(--titres)] text-[19px] font-extrabold leading-tight">Appeler Léa en vidéo</p>
              <ol className="mt-2 space-y-1 text-[13px] font-semibold">
                <li>1. La bulle verte</li>
                <li>2. « Léa »</li>
                <li>3. La caméra. Souris !</li>
              </ol>
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Les fiches, qui défilent ---------- */}
      <div className="bg-[var(--sombre)] py-5 text-[var(--sur-sombre)]">
        <Defilant
          duree={50}
          elements={FICHES.map((f) => `n° ${f.numero} · ${f.titre}`)}
          separateur="✺"
          classeElement="font-[family-name:var(--titres)] text-2xl font-bold whitespace-nowrap md:text-3xl"
        />
      </div>

      {/* ---------- Les deux portes ---------- */}
      <section id="portes" className="scroll-mt-24 mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="space-y-7">
          <Apparition><Surtitre>Sur l&apos;accueil, deux portes</Surtitre></Apparition>
          <TitreRevele
            texte="Choisis *ta porte.*"
            className="text-[clamp(3.2rem,7.5vw,6.6rem)] font-extrabold leading-[0.92] tracking-[-0.045em]"
            classeAccent="text-[var(--accent-texte)]"
          />
          <Apparition as="p" delai={150} className="max-w-md text-[21px] leading-relaxed text-[var(--doux)]">
            C&apos;est cassé : un dépannage, à prix clair. Tu veux apprendre : un cours chez toi, et le
            crédit d&apos;impôt possible. Deux métiers, deux portes, deux réponses franches.
          </Apparition>
        </div>
        <Apparition de="zoom" data-film="portes" className="rounded-[2.6rem] bg-[var(--carte)] p-5 shadow-[0_50px_90px_-60px_rgba(34,50,61,.8)] ring-1 ring-[var(--trait)] sm:p-8">
          <DeuxPortes />
        </Apparition>
      </section>

      {/* ---------- Le dimanche, libre ---------- */}
      <section className="px-3 sm:px-5">
        <div className="relative overflow-hidden rounded-[3rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto grid max-w-6xl gap-14 px-6 py-24 sm:px-10 md:py-32 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-7">
              <Apparition><Surtitre clair>Ce qu&apos;on vend vraiment</Surtitre></Apparition>
              <TitreRevele
                texte="Le dimanche où ton père ne t'appelle plus *pour son imprimante.*"
                className="text-[clamp(2.8rem,6vw,5.4rem)] font-extrabold leading-[0.98] tracking-[-0.04em]"
                classeAccent="text-[var(--accent)]"
              />
              <Apparition as="p" delai={150} className="max-w-xl text-[21px] leading-relaxed">
                On ne vend pas du dépannage. On vend l&apos;heure où il refait seul, la fiche sous les
                yeux. Et ton dimanche, rendu.
              </Apparition>
            </div>
            <Apparition de="droite" delai={150} aria-hidden="true" className="mx-auto w-full max-w-[320px] rounded-[2.6rem] border-[10px] border-[#1C2D38] bg-[var(--fond)] p-5 text-[var(--encre)] shadow-[0_50px_90px_-40px_rgba(0,0,0,.6)]">
              <p className="text-center text-sm font-bold">Dimanche</p>
              <p className="text-center font-[family-name:var(--titres)] text-5xl font-extrabold">10:12</p>
              <ul className="mt-6 space-y-3">
                {["Papa · « L'imprimante… »", "Papa · « Elle clignote »", "Papa · « Tu peux venir ? »"].map((a, i) => (
                  <li key={a} className="rounded-2xl bg-[var(--carte)] px-4 py-3 text-[15px] font-semibold" style={{ "--kit-delai": `${300 + i * 250}ms` } as React.CSSProperties}>
                    <span className="kit-barre">{a}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 rounded-2xl bg-[var(--accent)] px-4 py-3 text-center font-bold text-[var(--sur-accent)]">Aucun appel. Il a la fiche.</p>
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Trois fois, sans soupirer : l'outil ---------- */}
      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <Apparition de="zoom" className="order-2 lg:order-1">
          <div className="rounded-[2.8rem] bg-[var(--accent)] p-4 sm:p-6">
            <TroisFois />
          </div>
        </Apparition>
        <div className="order-1 space-y-7 lg:order-2">
          <Apparition><Surtitre>La marque</Surtitre></Apparition>
          <TitreRevele
            texte="Trois fois. *Sans soupirer.*"
            className="text-[clamp(3.2rem,7.5vw,6.6rem)] font-extrabold leading-[0.92] tracking-[-0.045em]"
            classeAccent="text-[var(--accent-texte)]"
          />
          <Apparition as="p" delai={150} className="max-w-md text-[21px] leading-relaxed text-[var(--doux)]">
            Touche « Tu peux répéter ? » : trois façons d&apos;expliquer la même chose. Et pas un soupir.
            C&apos;est une promesse qu&apos;on peut tenir.
          </Apparition>
        </div>
      </section>

      {/* ---------- Les fiches du frigo ---------- */}
      <section className="border-y border-[var(--trait)] bg-[#DCEBF3]">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
          <div className="mb-14 grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div className="space-y-7">
              <Apparition><Surtitre>Après chaque visite</Surtitre></Apparition>
              <TitreRevele
                texte="Une fiche *sur le frigo.*"
                className="text-[clamp(3.2rem,7.5vw,6.6rem)] font-extrabold leading-[0.92] tracking-[-0.045em]"
                classeAccent="text-[var(--sombre)] underline decoration-[var(--accent)] decoration-[0.1em] underline-offset-[0.1em]"
              />
            </div>
            <Apparition as="p" delai={150} className="text-[21px] leading-relaxed">
              En gros caractères, trois étapes. Et sur le site, toutes les fiches, gratuites, à
              imprimer : sans compte, sans adresse e-mail.
            </Apparition>
          </div>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FICHES.slice(0, 4).map((f, i) => (
              <Apparition as="li" key={f.numero} delai={i * 110} de="bas" className={i % 2 ? "lg:translate-y-8" : ""}>
                <CarteLueur className="h-full rounded-[12px]">
                  <Link href={`${DOSSIER}/fiches`} className="relative block h-full rounded-[12px] bg-[var(--carte)] p-6 pt-8 shadow-[0_24px_40px_-26px_rgba(34,50,61,.7)] transition-transform hover:-rotate-1" style={{ rotate: `${[-2, 1.5, -1, 2][i]}deg` }}>
                    <span aria-hidden="true" className="absolute -top-2.5 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full shadow" style={{ background: ["#FF9A80", "#7FD8BE", "#F6AE2D", "#2F4858"][i] }} />
                    <span className="block text-[13px] font-bold text-[var(--accent-texte)]">Fiche n° {f.numero}</span>
                    <span className="mt-2 block font-[family-name:var(--titres)] text-[24px] font-extrabold leading-tight">{f.titre}</span>
                    <span className="mt-4 block space-y-1.5 text-[15px] font-semibold">
                      {f.etapes.map((e, k) => (
                        <span key={e} className="block">{k + 1}. {e}</span>
                      ))}
                    </span>
                  </Link>
                </CarteLueur>
              </Apparition>
            ))}
          </ul>
          <Apparition delai={200} className="mt-16 flex justify-center">
            <Bouton href={`${DOSSIER}/fiches`} variante="sombre">Toutes les fiches, gratuites</Bouton>
          </Apparition>
        </div>
      </section>

      {/* ---------- Des cours qui donnent envie ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
        <div className="mb-14 space-y-7">
          <Apparition><Surtitre>Porte 2 · Je veux apprendre</Surtitre></Apparition>
          <TitreRevele
            texte="Des cours qui *donnent envie.*"
            className="text-[clamp(3.2rem,7.5vw,6.6rem)] font-extrabold leading-[0.92] tracking-[-0.045em]"
            classeAccent="text-[var(--accent-texte)]"
          />
        </div>
        <ul className="grid gap-5 md:grid-cols-6">
          {COURS.map((c, i) => (
            <Apparition as="li" key={c.id} delai={i * 110} de="zoom" className={i === 0 || i === 3 ? "md:col-span-4" : "md:col-span-2"}>
              <Link href={`${DOSSIER}/cours-a-domicile#cours-${c.id}`} className="flex h-full flex-col justify-between gap-8 rounded-[2.4rem] p-7 transition-transform hover:-translate-y-1 sm:p-9" style={{ background: c.teinte }}>
                <span className="flex items-center justify-between text-[15px] font-bold">
                  <span>Cours {i + 1}</span>
                  <span className="rounded-full bg-[var(--carte)] px-3 py-1">{c.duree} chez toi</span>
                </span>
                <span className="space-y-3">
                  <span className="block font-[family-name:var(--titres)] text-[clamp(1.9rem,3.4vw,2.8rem)] font-extrabold leading-[1.0] tracking-[-0.03em]">{c.titre}</span>
                  <span className="block text-[17px] leading-relaxed">{c.texte}</span>
                </span>
                <span className="flex flex-wrap items-baseline gap-x-3 border-t border-[var(--encre)]/15 pt-4">
                  <span className="font-[family-name:var(--titres)] text-3xl font-extrabold">{euros(c.ht * 1.2)} TTC</span>
                  <span className="text-[15px]">{euros(c.ht)} HT · exemple</span>
                </span>
              </Link>
            </Apparition>
          ))}
        </ul>
      </section>

      {/* ---------- Le crédit d'impôt, la vraie réponse ---------- */}
      <section className="px-3 sm:px-5">
        <div className="rounded-[3rem] bg-[#DDF6EC]">
          <div className="mx-auto grid max-w-6xl gap-14 px-6 py-24 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="space-y-7">
              <Apparition><Surtitre>Crédit d&apos;impôt</Surtitre></Apparition>
              <TitreRevele
                texte="La vraie réponse, *même si elle ne nous arrange pas.*"
                className="text-[clamp(2.6rem,5.6vw,4.8rem)] font-extrabold leading-[0.96] tracking-[-0.04em]"
                classeAccent="text-[#14614E]"
              />
              <Apparition as="p" delai={150} className="text-[20px] leading-relaxed">
                Le dépannage n&apos;ouvre pas droit au crédit d&apos;impôt. Les cours et l&apos;installation
                chez toi, oui, sous conditions. On te le dit avant, pas sur la facture.
              </Apparition>
              <Bouton href={`${DOSSIER}/credit-d-impot`} variante="sombre">Ta situation, ma réponse</Bouton>
            </div>
            <Apparition de="zoom" delai={150}><Eligible /></Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Porte 1 : le dépannage, prix clair ---------- */}
      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div className="space-y-7">
          <Apparition><Surtitre>Porte 1 · C&apos;est cassé</Surtitre></Apparition>
          <TitreRevele
            texte="Dépannage, *prix clair.*"
            className="text-[clamp(3.2rem,7.5vw,6.6rem)] font-extrabold leading-[0.92] tracking-[-0.045em]"
            classeAccent="text-[#A8391B]"
          />
          <Apparition as="p" delai={150} className="max-w-md text-[21px] leading-relaxed text-[var(--doux)]">
            Un déplacement, puis le temps passé, à la demi-heure. Tu sais combien avant qu&apos;on sonne.
          </Apparition>
          <Apparition de="rideau" delai={250} className="relative aspect-[3/2] overflow-hidden rounded-[2.4rem]">
            <Image src={photos.imprimante.src} alt={photos.imprimante.alt} fill sizes="(min-width: 1024px) 560px, 100vw" className="kit-cinema-img object-cover" />
          </Apparition>
        </div>
        <Apparition de="zoom" delai={150}>
          <div className="rounded-[2.8rem] bg-[#FF9A80] p-4 sm:p-6">
            <TarifDepannage />
          </div>
        </Apparition>
      </section>

      {/* ---------- Le goûter numérique ---------- */}
      <section className="px-3 sm:px-5">
        <div className="relative overflow-hidden rounded-[3rem] bg-[var(--accent)] text-[var(--sur-accent)]">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 sm:px-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="space-y-7">
              <p className="text-[15px] font-bold uppercase tracking-[0.16em]">Gratuit · à la médiathèque</p>
              <TitreRevele
                texte="Le goûter *numérique.*"
                className="text-[clamp(3.2rem,7.5vw,6.6rem)] font-extrabold leading-[0.92] tracking-[-0.045em]"
              />
              <Apparition as="p" delai={150} className="max-w-md text-[21px] leading-relaxed">
                Tu viens avec ta tablette, tu poses toutes tes questions. {GOUTER.date.charAt(0).toUpperCase() + GOUTER.date.slice(1)}, {GOUTER.heure}.
              </Apparition>
              <Bouton href={`${DOSSIER}/gouter-numerique`} variante="sombre">Je viens</Bouton>
            </div>
            <Apparition de="rideau" delai={200} className="relative aspect-[4/3] overflow-hidden rounded-[2.4rem] rounded-br-[8rem]">
              <Image src={photos.gouter.src} alt={photos.gouter.alt} fill sizes="(min-width: 1024px) 520px, 100vw" className="kit-cinema-img object-cover" />
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Questions ---------- */}
      <section id="questions" className="scroll-mt-24 mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="space-y-7">
          <Apparition><Surtitre>Tes questions</Surtitre></Apparition>
          <TitreRevele
            texte="Pose-les. *Toutes.*"
            className="text-[clamp(2.8rem,6vw,5rem)] font-extrabold leading-[0.94] tracking-[-0.045em]"
            classeAccent="text-[var(--accent-texte)]"
          />
        </div>
        <Apparition delai={150}>
          <Accordeon questions={QUESTIONS} />
        </Apparition>
      </section>

      <AppelFinal />
    </main>
  );
}
