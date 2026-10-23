import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Accordeon from "../_kit/Accordeon";
import Apparition from "../_kit/Apparition";
import CarteLueur from "../_kit/CarteLueur";
import Defilant from "../_kit/Defilant";
import Panier from "../_kit/Panier";
import RecitColle from "../_kit/RecitColle";
import TitreRevele from "../_kit/TitreRevele";
import { AppelFinal, Arche, Bouton, Surtitre } from "./_composants/Blocs";
import LettreDansUnAn from "./_composants/LettreDansUnAn";
import TroisQuestions from "./_composants/TroisQuestions";
import { CONSEILS, DOSSIER, FAQ, LETTRE, PRODUITS, SOIREE, euros, maison, photos } from "./_composants/donnees";

// L'accueil de Relue : la marque de la vidéo « Créer une marque » (la lettre qu'on garde
// quarante ans, la lettre dans un an, la lettre de la semaine) et les idées de « Remplir
// l'agenda » (trois questions, trois jeux choisis par la vendeuse, la soirée découverte).
// Premier écran éditorial centré : le nom en Bodoni géant, coupé par une photo dans une
// arche — le rabat d'une enveloppe.
export const metadata: Metadata = {
  title: "Relue — papeterie et jeux de société, site de démonstration",
  description:
    "Le site d'une papeterie et boutique de jeux imaginaire : une lettre qu'on s'écrit et qu'on reçoit dans un an, jour pour jour, et trois questions qui sortent trois jeux choisis par la vendeuse.",
  ...adressesDeLaPage("/exemples/relue"),
};

const PHOTOS_CONSEILS = [photos.plume, photos.enveloppe, photos.lettres, photos.cachet];

export default function Relue() {
  return (
    <main>
      {/* ---------- 1. Premier écran : « Re·lue » ---------- */}
      <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[var(--fond)]">
        <div aria-hidden="true" className="absolute inset-0 bg-[repeating-linear-gradient(180deg,transparent_0,transparent_55px,rgba(30,43,74,0.07)_55px,rgba(30,43,74,0.07)_56px)]" />
        <div aria-hidden="true" className="absolute inset-y-0 left-[7%] w-px bg-[#B5452F]/25" />
        <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pb-10 pt-32 sm:px-8">
          <Apparition className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-[var(--trait)] pb-4 text-[13px] font-semibold uppercase tracking-[0.24em] text-[var(--doux)]">
            <span>Papeterie et jeux · Ta Ville</span>
            <span>Cette semaine · lettre n° {LETTRE.numero}</span>
          </Apparition>
          <h1 className="mt-8 flex items-center justify-center font-[family-name:var(--titres)] text-[clamp(5rem,30vw,23rem)] font-normal leading-[0.8] tracking-[-0.05em]">
            <Apparition as="span" de="flou">Re</Apparition>
            <Apparition as="span" de="zoom" delai={250} className="mx-[0.05em] inline-block">
              <span className="relative block h-[0.74em] w-[0.5em] -rotate-3 overflow-hidden rounded-t-full rounded-b-[0.06em] bg-[var(--sombre)] shadow-[0_30px_60px_-25px_rgba(30,43,74,0.7)]">
                <Image src={photos.cachet.src} alt="" fill priority sizes="(min-width: 1024px) 12rem, 30vw" className="kit-cinema-img object-cover" />
              </span>
            </Apparition>
            <Apparition as="span" de="flou" delai={150} className="italic text-[var(--accent-texte)]">lue</Apparition>
          </h1>
          <div className="mt-10 grid gap-8 border-t border-[var(--trait)] pt-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <TitreRevele
              as="p"
              auChargement
              delai={400}
              texte="Une lettre, ça s'écrit *pour être relue.* Un jeu, ça s'achète pour être rejoué."
              className="max-w-3xl font-[family-name:var(--titres)] text-[clamp(1.8rem,3.2vw,2.8rem)] leading-[1.12] tracking-[-0.01em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
            <Apparition delai={700} className="flex flex-wrap gap-3 lg:justify-end">
              <Bouton href={`${DOSSIER}/dans-un-an`}>T&apos;écrire une lettre</Bouton>
              <Bouton href={`${DOSSIER}#trois-questions`} variante="contour">Trois questions, trois jeux</Bouton>
            </Apparition>
          </div>
          <Apparition as="ul" delai={900} className="mt-10 grid gap-3 sm:grid-cols-3">
            {[
              ["Ta lettre dans un an", `${euros(maison.prixService)} TTC · exemple`, `${DOSSIER}/dans-un-an`],
              ["Soirée découverte", `${SOIREE.date}, ${SOIREE.heure}`, `${DOSSIER}/soiree-decouverte`],
              ["La lettre de la semaine", `n° ${LETTRE.numero} · ${LETTRE.lieu}`, `${DOSSIER}/lettre-de-la-semaine`],
            ].map(([fort, doux, href]) => (
              <li key={fort}>
                <Link href={href} className="flex h-full items-center justify-between gap-3 rounded-[14px] border border-dashed border-[var(--encre)]/40 bg-[var(--carte)] px-5 py-4 transition-colors hover:border-[var(--accent)]">
                  <span>
                    <span className="block font-[family-name:var(--titres)] text-xl">{fort}</span>
                    <span className="text-sm text-[var(--doux)]">{doux}</span>
                  </span>
                  <span aria-hidden="true" className="font-[family-name:var(--titres)] text-2xl italic text-[var(--accent-texte)]">→</span>
                </Link>
              </li>
            ))}
          </Apparition>
        </div>
      </section>

      {/* ---------- 2. Le bandeau ---------- */}
      <div className="bg-[var(--accent)] py-5 text-[var(--sur-accent)]">
        <Defilant
          duree={48}
          separateur="✉"
          elements={[
            "Personne n'encadre un texto",
            "Ta lettre, dans un an, jour pour jour",
            "Le fou rire de vingt-deux heures",
            "Un jeudi par mois, la soirée découverte",
            "Trois questions, trois jeux",
            "Lettre n° 12 : Brest, 1984",
          ]}
          classeElement="font-[family-name:var(--titres)] text-2xl md:text-3xl italic whitespace-nowrap"
        />
      </div>

      {/* ---------- 3. La lettre qu'on garde quarante ans ---------- */}
      <section className="px-3 py-24 sm:px-5 md:py-32">
        <div className="kit-grain relative overflow-hidden rounded-[2rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto grid max-w-6xl gap-14 px-6 py-24 sm:px-10 md:py-32 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-7">
              <Apparition><Surtitre clair>Ce qu&apos;on vend vraiment</Surtitre></Apparition>
              <TitreRevele
                texte="La lettre qu'on garde *quarante ans.*"
                className="font-[family-name:var(--titres)] text-[clamp(3rem,6.5vw,6rem)] font-normal leading-[0.95] tracking-[-0.03em]"
                classeAccent="italic text-[#F2C9A8]"
              />
              <Apparition as="p" delai={200} className="max-w-md text-xl leading-relaxed">
                Pas du papier joli. Celle qu&apos;on retrouve au grenier, dans une boîte à chaussures — et
                qu&apos;on relit debout.
              </Apparition>
              <Apparition delai={300} className="flex items-end gap-5 border-t border-white/20 pt-6">
                <span className="font-[family-name:var(--titres)] text-[6rem] italic leading-[0.8] text-[#F2C9A8]">40</span>
                <span className="pb-2 text-lg leading-snug">ans dans une boîte,
                  <br />
                  et toujours lisible.</span>
              </Apparition>
            </div>
            <div className="relative">
              <Apparition de="rideau">
                <Arche photo={photos.lettres} className="aspect-[4/5] w-full" />
              </Apparition>
              <Apparition de="droite" delai={350} className="absolute -bottom-8 -left-2 w-[78%] max-w-[330px] -rotate-2 sm:-left-8">
                <figure className="rounded-[6px] bg-[var(--carte)] px-6 py-5 text-[var(--encre)] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.7)]">
                  <blockquote className="space-y-1 font-[family-name:var(--titres)] text-xl italic leading-snug">
                    <p>{LETTRE.lignes[0]}</p>
                    <p>{LETTRE.lignes[1]}</p>
                    <p>{LETTRE.lignes[2]}</p>
                  </blockquote>
                  <figcaption className="mt-3 text-sm text-[var(--doux)]">{LETTRE.signature} — {LETTRE.lieu} · lettre inventée</figcaption>
                </figure>
              </Apparition>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- 4. Le service : ta lettre dans un an ---------- */}
      <section id="dans-un-an" className="scroll-mt-24 mx-auto grid max-w-7xl gap-14 px-5 pb-24 sm:px-8 md:pb-36 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="space-y-8 lg:sticky lg:top-28">
          <Apparition><Surtitre>Le service</Surtitre></Apparition>
          <TitreRevele
            texte="Ta lettre, dans un an. *Jour pour jour.*"
            className="font-[family-name:var(--titres)] text-[clamp(3rem,6vw,5.6rem)] font-normal leading-[0.95] tracking-[-0.03em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
          <Apparition as="p" delai={150} className="max-w-md text-xl leading-relaxed text-[var(--doux)]">
            Tu t&apos;écris quelques lignes. On les imprime sur notre papier, on cachette à la cire, et on te
            la poste dans un an. Entre les deux, personne ne la lit.
          </Apparition>
          <ol className="space-y-3">
            {["Tu écris", "On cachette", "On la garde", "On la poste, un an après"].map((t, i) => (
              <Apparition as="li" key={t} delai={200 + i * 100} de="gauche" className="flex items-baseline gap-4 border-b border-[var(--trait)] pb-3">
                <span className="font-[family-name:var(--titres)] text-2xl italic text-[var(--accent-texte)] tabular-nums">0{i + 1}</span>
                <span className="font-[family-name:var(--titres)] text-2xl">{t}</span>
              </Apparition>
            ))}
          </ol>
        </div>
        <div className="relative rounded-[2rem] border border-[var(--trait)] bg-[#F3EADA] p-4 sm:p-8">
          <span aria-hidden="true" className="absolute -right-3 -top-3 grid h-20 w-20 rotate-12 place-items-center rounded-full border-2 border-dashed border-[var(--accent)] bg-[var(--fond)] text-center font-[family-name:var(--titres)] text-sm italic leading-tight text-[var(--accent-texte)]">
            dans
            <br />
            un an
          </span>
          <LettreDansUnAn />
        </div>
      </section>

      {/* ---------- 5. Trois questions, trois jeux : le tapis ---------- */}
      <section id="trois-questions" className="scroll-mt-24 px-3 sm:px-5">
        <div className="kit-grain relative overflow-hidden rounded-[2rem] bg-[#24382E] text-[var(--sur-sombre)]">
          <div aria-hidden="true" className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/10" />
          <div aria-hidden="true" className="absolute -right-10 -top-10 h-52 w-52 rounded-full border border-white/10" />
          <div className="relative mx-auto max-w-6xl space-y-12 px-5 py-20 sm:px-10 md:py-28">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div className="space-y-6">
                <Apparition><Surtitre clair>Les jeux · choisis par {maison.vendeuse}</Surtitre></Apparition>
                <TitreRevele
                  texte="Pas deux mille boîtes. *Trois questions.*"
                  className="font-[family-name:var(--titres)] text-[clamp(2.8rem,6vw,5.4rem)] font-normal leading-[0.95] tracking-[-0.03em]"
                  classeAccent="italic text-[#E9B44C]"
                />
              </div>
              <Apparition as="p" delai={150} className="text-xl leading-relaxed">
                On n&apos;achète pas un jeu : on achète le fou rire de vingt-deux heures. Réponds, et{" "}
                {maison.vendeuse} te sort trois jeux qu&apos;elle a tous joués.
              </Apparition>
            </div>
            <TroisQuestions />
          </div>
        </div>
      </section>

      {/* ---------- 6. La boutique, en quatre cartes ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36">
        <div className="mb-14 grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <TitreRevele
            texte="Du papier, des jeux, *et des soirées.*"
            className="font-[family-name:var(--titres)] text-[clamp(2.8rem,6vw,5.4rem)] font-normal leading-[0.95] tracking-[-0.03em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
          <Apparition as="p" delai={150} className="text-xl leading-relaxed text-[var(--doux)]">
            Tout ce qui se fait à la main et à plusieurs. Et rien qui se range dans un téléphone.
          </Apparition>
        </div>
        <div className="grid gap-4 md:grid-cols-6">
          <Apparition de="zoom" className="md:col-span-4">
            <CarteLueur className="h-full rounded-[1.6rem]">
              <Link href={`${DOSSIER}/jeux-pour-deux`} className="group relative flex h-[420px] flex-col justify-end overflow-hidden rounded-[1.6rem] bg-[var(--sombre)] p-7 text-[var(--sur-sombre)]">
                <Image src={photos.pions.src} alt={photos.pions.alt} fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover opacity-70 transition-transform duration-[1.4s] group-hover:scale-105" />
                <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(30,43,74,0)_30%,rgba(30,43,74,0.92)_100%)]" />
                <span className="relative space-y-2">
                  <span className="block text-sm font-semibold uppercase tracking-[0.2em]">La question qu&apos;on nous pose le plus</span>
                  <span className="block font-[family-name:var(--titres)] text-[2.6rem] leading-[1]">Jeux de société <span className="italic">pour deux.</span></span>
                </span>
              </Link>
            </CarteLueur>
          </Apparition>
          <Apparition de="zoom" delai={120} className="md:col-span-2">
            <Link href={`${DOSSIER}/lettre-de-la-semaine`} className="flex h-full min-h-[300px] flex-col justify-between rounded-[1.6rem] bg-[var(--accent)] p-7 text-[var(--sur-accent)]">
              <span className="text-sm font-semibold uppercase tracking-[0.2em]">Chaque semaine</span>
              <span className="font-[family-name:var(--titres)] text-[2.2rem] leading-[1.02]">Une vraie lettre, <span className="italic">lue à voix haute.</span></span>
              <span className="text-[15px]">Avec l&apos;accord de celui qui l&apos;a écrite →</span>
            </Link>
          </Apparition>
          <Apparition de="zoom" delai={200} className="md:col-span-2">
            <Link href={`${DOSSIER}#papeterie`} className="flex h-full min-h-[300px] flex-col justify-between rounded-[1.6rem] border border-[var(--trait)] bg-[#E9DCC3] p-7 text-[var(--encre)]">
              <span className="text-sm font-semibold uppercase tracking-[0.2em]">La papeterie</span>
              <span className="font-[family-name:var(--titres)] text-[2.2rem] leading-[1.02]">Un papier qui ne jaunit <span className="italic">pas vite.</span></span>
              <span className="text-[15px]">Vergé crème, cire rouge, la boîte à garder →</span>
            </Link>
          </Apparition>
          <Apparition de="zoom" delai={280} className="md:col-span-4">
            <CarteLueur className="h-full rounded-[1.6rem]">
              <Link href={`${DOSSIER}/soiree-decouverte`} className="group relative flex h-[340px] flex-col justify-end overflow-hidden rounded-[1.6rem] bg-[var(--sombre)] p-7 text-[var(--sur-sombre)]">
                <Image src={photos.lancer.src} alt={photos.lancer.alt} fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover opacity-60 transition-transform duration-[1.4s] group-hover:scale-105" />
                <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(30,43,74,0)_20%,rgba(30,43,74,0.92)_100%)]" />
                <span className="relative space-y-2">
                  <span className="block text-sm font-semibold uppercase tracking-[0.2em]">Un jeudi par mois · gratuite</span>
                  <span className="block font-[family-name:var(--titres)] text-[2.6rem] leading-[1]">La soirée <span className="italic">découverte.</span></span>
                </span>
              </Link>
            </CarteLueur>
          </Apparition>
        </div>
      </section>

      {/* ---------- 7. La soirée découverte ---------- */}
      <section className="px-3 sm:px-5">
        <div className="relative overflow-hidden rounded-[2rem] bg-[var(--accent)] text-[var(--sur-accent)]">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-10 md:py-28 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-6">
              <Apparition>
                <p className="text-[13px] font-semibold uppercase tracking-[0.24em]">Un jeudi par mois · {SOIREE.places} places</p>
              </Apparition>
              <TitreRevele
                texte={"Jeudi, *20 h.* Tu testes dix jeux."}
                className="font-[family-name:var(--titres)] text-[clamp(3rem,7vw,6.4rem)] font-normal leading-[0.92] tracking-[-0.03em]"
                classeAccent="italic"
              />
              <Apparition as="p" delai={150} className="max-w-lg text-xl leading-relaxed">
                Et tu repars avec celui qui t&apos;a fait rire. Gratuite, sans rien acheter : on réserve
                seulement sa place, sur le site. Prochaine : {SOIREE.date.toLowerCase()}.
              </Apparition>
              <Apparition delai={250}>
                <Bouton href={`${DOSSIER}/soiree-decouverte`} variante="clair">Réserver ma place</Bouton>
              </Apparition>
            </div>
            <Apparition de="zoom" delai={150} className="grid grid-cols-2 gap-3">
              {SOIREE.prises.map((prises, t) => (
                <div key={t} className="rounded-[18px] bg-[var(--fond)] p-3 text-[var(--encre)]">
                  <svg viewBox="0 0 120 90" className="w-full" aria-hidden="true">
                    <rect x="30" y="22" width="60" height="46" rx="10" fill="#24382E" />
                    {[[42, 10], [60, 10], [78, 10], [42, 80], [60, 80], [78, 80]].map(([x, y], s) => (
                      <circle key={s} cx={x} cy={y} r="8" fill={prises.includes(s) ? "#585F70" : "#FFFDF8"} stroke="#1E2B4A" strokeWidth="2.5" />
                    ))}
                  </svg>
                  <p className="mt-1 flex justify-between text-sm">
                    <span className="font-[family-name:var(--titres)] text-base">Table {t + 1}</span>
                    <span className="tabular-nums">{6 - prises.length === 0 ? "complète" : `${6 - prises.length} libres`}</span>
                  </p>
                </div>
              ))}
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- 8. La papeterie ---------- */}
      <section id="papeterie" className="scroll-mt-24 mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 md:py-36 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <Apparition de="rideau">
          <Arche photo={photos.plume} className="aspect-[4/5] w-full" sizes="(min-width: 1024px) 35vw, 90vw" />
        </Apparition>
        <div className="space-y-8">
          <div className="space-y-6">
            <Apparition><Surtitre>La papeterie</Surtitre></Apparition>
            <TitreRevele
              texte="Tout ce qu'il faut *pour écrire.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.8rem,5.5vw,5rem)] font-normal leading-[0.95] tracking-[-0.03em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
            <Apparition as="p" delai={150} className="max-w-lg text-xl leading-relaxed text-[var(--doux)]">
              Mets de côté sur le site, règle à la boutique. Le reste, c&apos;est toi qui l&apos;écris.
            </Apparition>
          </div>
          <Apparition delai={200}>
            <Panier
              produits={PRODUITS}
              bouton="Mettre de côté"
              confirmation="C'est de côté : ça t'attend trois jours à la boutique."
              mention="Prix TTC d'exemple. Rien n'est payé en ligne : tu règles à la boutique."
            />
          </Apparition>
        </div>
      </section>

      {/* ---------- 9. Écrire une lettre qu'on garde ---------- */}
      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
          <div className="mb-10 space-y-6 md:mb-4">
            <Apparition><Surtitre>Quatre conseils</Surtitre></Apparition>
            <TitreRevele
              texte="Écrire une lettre *qu'on garde.*"
              className="max-w-4xl font-[family-name:var(--titres)] text-[clamp(2.8rem,6vw,5.4rem)] font-normal leading-[0.95] tracking-[-0.03em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
          </div>
          <RecitColle
            className="[&_h3]:font-normal [&_h3]:tracking-[-0.02em]"
            etapes={CONSEILS.map((c, i) => ({
              surtitre: `Conseil n° ${i + 1}`,
              titre: c.titre,
              texte: <p>{c.texte}</p>,
              visuel: <Image src={PHOTOS_CONSEILS[i].src} alt={PHOTOS_CONSEILS[i].alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />,
            }))}
          />
        </div>
      </section>

      {/* ---------- 10. Questions ---------- */}
      <section id="questions" className="scroll-mt-24 mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-36 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="space-y-6">
          <Apparition><Surtitre>Vos questions</Surtitre></Apparition>
          <TitreRevele
            texte="Ce qu'on nous *demande.*"
            className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5vw,4.6rem)] font-normal leading-[0.95] tracking-[-0.03em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
        </div>
        <Apparition delai={150}>
          <Accordeon questions={FAQ.map((q) => ({ question: q.q, reponse: q.r }))} />
        </Apparition>
      </section>

      <AppelFinal />
    </main>
  );
}
