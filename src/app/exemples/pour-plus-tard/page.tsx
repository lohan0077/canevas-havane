import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Accordeon from "../_kit/Accordeon";
import Apparition from "../_kit/Apparition";
import Defilant from "../_kit/Defilant";
import RecitColle from "../_kit/RecitColle";
import TitreRevele from "../_kit/TitreRevele";
import { AppelFinal, Bouton, Surtitre, Tirage } from "./_composants/Blocs";
import BoiteTirages from "./_composants/BoiteTirages";
import CurseurMinutes from "./_composants/CurseurMinutes";
import { COMPARAISON, CONSEILS, DEROULE, DOSSIER, FORMULE, INVENTAIRE, MUR, PALETTES, QUESTIONS, VITRINE, photos, studio } from "./_composants/donnees";

// L'accueil de Pour Plus Tard. Pas de portfolio (« Remplir l'agenda » : « Sur l'accueil,
// pas de portfolio. Deux photos de la même famille : minute un, et minute quarante. »),
// une seule formule (« Créer une marque » : « Une séance, et une boîte de vingt tirages,
// livrée chez toi. »), et ce que les deux vidéos racontent autour : la photo ratée, comment
// s'habiller, que faire de ses photos numériques, la vitrine des plus vieilles photos.
export const metadata: Metadata = {
  title: "Pour Plus Tard — studio photo de famille, site de démonstration",
  description:
    "Le site d'un studio photo de famille imaginaire : pas de portfolio mais la minute 1 et la minute 40 d'une même famille, une seule formule — une séance et une boîte de vingt tirages livrée chez toi —, le prix affiché.",
  ...adressesDeLaPage("/exemples/pour-plus-tard"),
};

const COLLAGE = [
  { ...photos.minute40, legende: "minute 40", place: "left-[3%] top-[17%] w-[15%] min-w-[190px]", angle: -7, delai: 300 },
  { ...photos.vieuxTirage, legende: "la maison, 1957", place: "right-[4%] top-[13%] w-[13%] min-w-[170px]", angle: 6, delai: 450 },
  { ...photos.tirageMer, legende: "été 2026", place: "left-[6%] bottom-[9%] w-[14%] min-w-[180px]", angle: 4, delai: 600 },
  { ...photos.boite1942, legende: "1942", place: "right-[7%] bottom-[7%] w-[12%] min-w-[160px]", angle: -5, delai: 750 },
];

const RECIT_PHOTOS = [photos.minute1, photos.troisCouleurs, photos.minute40, photos.ratee];

export default function PourPlusTard() {
  return (
    <main>
      {/* ---------- Premier écran : éditorial centré, des tirages posés autour ---------- */}
      <section className="kit-grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        {COLLAGE.map((c) => (
          <Apparition key={c.src} de="zoom" delai={c.delai} className={`absolute hidden xl:block ${c.place}`}>
            <Tirage src={c.src} alt={c.alt} legende={c.legende} angle={c.angle} sizes="240px" priority />
          </Apparition>
        ))}
        <div className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center gap-8 px-5 pb-14 pt-32 text-center sm:px-8">
          {/* Sur téléphone et tablette, trois tirages en éventail au-dessus du titre. */}
          <div className="relative h-[150px] w-[260px] xl:hidden" aria-hidden="true">
            {COLLAGE.slice(0, 3).map((c, i) => (
              <Apparition key={c.src} de="zoom" delai={200 + i * 140} className={`absolute top-0 w-[108px] ${["left-0", "left-[76px] -top-2", "left-[152px]"][i]}`}>
                <Tirage src={c.src} alt="" angle={[-8, 2, 9][i]} sizes="110px" priority />
              </Apparition>
            ))}
          </div>
          <Apparition>
            <Surtitre>{studio.metier}</Surtitre>
          </Apparition>
          <TitreRevele
            as="h1"
            auChargement
            texte="Des photos *qu'on garde.*"
            className="font-[family-name:var(--titres)] text-[clamp(3.8rem,7.6vw,8rem)] font-medium leading-[0.9] tracking-[-0.035em]"
            classeAccent="italic text-[#E0B48C]"
          />
          <Apparition as="p" delai={450} className="max-w-2xl text-[clamp(1.1rem,1.7vw,1.35rem)] leading-relaxed">
            Pas cinquante fichiers dans un lien qui expire : une heure ensemble, et une boîte de vingt
            tirages, livrée chez toi. La photo que tes petits-enfants retrouveront dans un tiroir.
          </Apparition>
          <Apparition delai={650} className="flex flex-wrap justify-center gap-3">
            <Bouton href={`${DOSSIER}#formule`}>Voir la boîte</Bouton>
            <Bouton href={`${DOSSIER}#minutes`} variante="contour">Minute 1, minute 40</Bouton>
          </Apparition>
        </div>
      </section>

      {/* ---------- Ce qu'il y a dans la boîte ---------- */}
      <div className="bg-[#C9A27E] py-5 text-[#2A211D]">
        <Defilant
          duree={46}
          separateur="✕"
          elements={INVENTAIRE.map((x) => x.titre)}
          classeElement="font-[family-name:var(--titres)] text-xl italic md:text-2xl whitespace-nowrap"
        />
      </div>

      {/* ---------- Pas de portfolio : minute 1, minute 40 ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-8 md:py-32">
        <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div className="space-y-6">
            <Apparition><Surtitre numero="1" className="text-[var(--doux)]">Pas de portfolio</Surtitre></Apparition>
            <TitreRevele
              texte="Minute 1. *Minute 40.*"
              className="font-[family-name:var(--titres)] text-[clamp(3.2rem,8vw,7.4rem)] font-medium leading-[0.92] tracking-[-0.035em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
          </div>
          <Apparition as="p" delai={200} className="text-xl leading-relaxed text-[var(--doux)]">
            Personne n&apos;aime être pris en photo. Alors on ne vend pas des photos : on vend la minute
            où tu oublies l&apos;appareil. Deux photos de la même famille — glisse, et regarde-la arriver.
          </Apparition>
        </div>
        <Apparition de="zoom">
          <CurseurMinutes />
        </Apparition>
      </section>

      {/* ---------- Une seule formule ---------- */}
      <section id="formule" className="scroll-mt-20 px-3 sm:px-5">
        <div className="kit-grain relative overflow-hidden rounded-[6px] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto grid max-w-6xl gap-14 px-6 py-24 sm:px-10 md:py-32 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="space-y-8">
              <Apparition><Surtitre numero="2">La formule</Surtitre></Apparition>
              <h2 data-film="formule" className="font-[family-name:var(--titres)] text-[clamp(3rem,6.6vw,5.8rem)] font-medium leading-[0.92] tracking-[-0.035em]">
                Une seule <em className="text-[#E0B48C]">formule.</em>
              </h2>
              <Apparition as="p" delai={150} className="max-w-md text-xl leading-relaxed">
                Une séance, et une boîte de vingt tirages, livrée chez toi. Pas de forfait « essentiel »,
                pas de pack « premium » : une seule chose, bien faite.
              </Apparition>
              <ul className="divide-y divide-white/15 border-y border-white/15">
                {FORMULE.details.map((d, i) => (
                  <Apparition as="li" key={d} delai={i * 90} className="flex items-baseline gap-4 py-3.5 text-[17px]">
                    <span className="font-[family-name:var(--titres)] italic text-[#E0B48C]">{i + 1}</span>
                    {d}
                  </Apparition>
                ))}
              </ul>
            </div>
            <Apparition de="zoom" delai={200} className="rounded-[6px] bg-[var(--fond)] px-5 pb-8 pt-6 text-[var(--encre)] sm:px-8">
              <BoiteTirages />
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- D'habitude / ici ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
        <div className="mb-12 max-w-4xl space-y-6">
          <Apparition><Surtitre numero="3" className="text-[var(--doux)]">Fichiers ou tirages</Surtitre></Apparition>
          <TitreRevele
            texte="Ces photos finissent dans un téléphone. *Que tu changeras.*"
            className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5.6vw,4.8rem)] font-medium leading-[0.98] tracking-[-0.03em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
        </div>
        <div className="overflow-hidden rounded-[6px] border border-[var(--trait)]">
          <div className="grid grid-cols-[1fr_1fr] bg-[var(--carte)] text-[12px] font-semibold uppercase tracking-[0.2em] sm:grid-cols-[0.8fr_1fr_1fr]">
            <span className="hidden px-5 py-4 sm:block" />
            <span className="px-5 py-4 text-[var(--doux)]">D&apos;habitude</span>
            <span className="bg-[var(--accent)] px-5 py-4 text-[var(--sur-accent)]">Ici</span>
          </div>
          {COMPARAISON.map((c, i) => (
            <Apparition key={c.quoi} delai={i * 100} className="grid grid-cols-[1fr_1fr] border-t border-[var(--trait)] sm:grid-cols-[0.8fr_1fr_1fr]">
              <span className="col-span-2 px-5 pt-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-[var(--doux)] sm:col-span-1 sm:py-6">{c.quoi}</span>
              <span className="px-5 py-4 text-[17px] text-[var(--doux)] line-through decoration-[var(--accent)] decoration-2 sm:py-6 sm:text-xl">{c.habitude}</span>
              <span className="px-5 py-4 font-[family-name:var(--titres)] text-xl italic sm:py-6 sm:text-[1.7rem]">{c.ici}</span>
            </Apparition>
          ))}
        </div>
      </section>

      {/* ---------- Que faire de ses photos numériques ---------- */}
      <section className="bg-[var(--accent)] text-[var(--sur-accent)]">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-7">
            <Apparition><Surtitre>Ce qu&apos;on tape sur Google</Surtitre></Apparition>
            <Apparition as="p" className="inline-block rounded-full bg-[var(--fond)] px-5 py-3 text-[17px] text-[var(--encre)] shadow-[0_18px_40px_-20px_rgba(0,0,0,0.6)]">
              <span aria-hidden="true">⌕ </span>que faire de ses photos numériques
            </Apparition>
            <TitreRevele
              texte={"Les imprimer. *Pas toutes\u00a0: vingt.*"}
              className="font-[family-name:var(--titres)] text-[clamp(2.8rem,6vw,5.2rem)] font-medium leading-[0.95] tracking-[-0.03em]"
              classeAccent="italic"
            />
          </div>
          <ol className="divide-y divide-white/25 self-end border-y border-white/25">
            {CONSEILS.map((c, i) => (
              <Apparition as="li" key={c.titre} delai={i * 120} className="grid grid-cols-[3rem_1fr] gap-4 py-7">
                <span className="font-[family-name:var(--titres)] text-[2.2rem] italic leading-none">{i + 1}</span>
                <span className="space-y-2">
                  <span className="block font-[family-name:var(--titres)] text-[1.6rem] font-medium leading-tight">{c.titre}</span>
                  <span className="block text-lg leading-relaxed">{c.texte}</span>
                </span>
              </Apparition>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- La séance, minute par minute ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36">
        <div className="mb-10 space-y-6 md:mb-4">
          <Apparition><Surtitre numero="4" className="text-[var(--doux)]">La séance</Surtitre></Apparition>
          <TitreRevele
            texte="Tout le monde est gêné *au début.*"
            className="max-w-4xl font-[family-name:var(--titres)] text-[clamp(2.8rem,6vw,5.4rem)] font-medium leading-[0.95] tracking-[-0.035em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
        </div>
        <RecitColle
          etapes={DEROULE.map((d, i) => ({
            surtitre: `Minute ${d.minute}`,
            titre: d.titre,
            texte: <p>{d.texte}</p>,
            visuel: <Image src={RECIT_PHOTOS[i].src} alt={RECIT_PHOTOS[i].alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />,
          }))}
        />
      </section>

      {/* ---------- La photo ratée ---------- */}
      <section className="px-3 sm:px-5">
        <div className="overflow-hidden rounded-[6px] bg-[#C9A27E] text-[#2A211D]">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-10 md:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <Apparition de="zoom" className="mx-auto w-full max-w-[360px]">
              <Tirage src={photos.ratee.src} alt={photos.ratee.alt} legende="la ratée, avec leur accord" angle={-4} sizes="360px" />
            </Apparition>
            <div className="space-y-7">
              <Apparition><Surtitre numero="5">Pour faire parler</Surtitre></Apparition>
              <TitreRevele
                texte="Chaque séance finit par *une photo ratée.*"
                className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5.4vw,4.6rem)] font-medium leading-[0.95] tracking-[-0.03em]"
                classeAccent="italic"
              />
              <Apparition as="p" delai={150} className="max-w-lg text-lg leading-relaxed">
                Ratée exprès, tout le monde en rit, et on se dit au revoir. Publiée seulement avec
                l&apos;accord écrit de chacun — et pour un enfant, celui de ses deux parents. Celui qui
                hésite voit que tout le monde est gêné au début.
              </Apparition>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- S'habiller ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-7">
            <Apparition><Surtitre numero="6" className="text-[var(--doux)]">Avant de venir</Surtitre></Apparition>
            <TitreRevele
              texte={"Comment s'habiller\u202f? *Trois couleurs,* pas de gros logo."}
              className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5.4vw,4.6rem)] font-medium leading-[0.98] tracking-[-0.03em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
            <Apparition as="p" delai={150} className="max-w-xl text-xl leading-relaxed text-[var(--doux)]">
              C&apos;est ce qu&apos;on tape avant de venir. La réponse a sa page, avec une palette à choisir
              pour toute la famille.
            </Apparition>
            <Apparition delai={250}>
              <Bouton href={`${DOSSIER}/s-habiller`}>Choisir ma palette</Bouton>
            </Apparition>
          </div>
          <ul className="grid grid-cols-2 gap-4">
            {PALETTES.map((p, i) => (
              <Apparition as="li" key={p.id} de="zoom" delai={i * 110}>
                <Link href={`${DOSSIER}/s-habiller#palettes`} className="group block rounded-[6px] border border-[var(--trait)] bg-[var(--carte)] p-4 transition-transform hover:-translate-y-1">
                  <span aria-hidden="true" className="grid h-28 grid-cols-3 overflow-hidden rounded-[4px]">
                    {p.couleurs.map((c) => <span key={c} style={{ background: c }} />)}
                  </span>
                  <span className="mt-3 block font-[family-name:var(--titres)] text-2xl">{p.nom}</span>
                  <span className="block text-[14px] text-[var(--doux)]">{p.noms.join(", ")}</span>
                </Link>
              </Apparition>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- La vitrine ---------- */}
      <section className="px-3 sm:px-5">
        <div className="kit-grain overflow-hidden rounded-[6px] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-10 md:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="space-y-7">
              <Apparition><Surtitre numero="7">La vitrine · {VITRINE.dates}</Surtitre></Apparition>
              <TitreRevele
                texte="Apporte ta plus vieille *photo.*"
                className="font-[family-name:var(--titres)] text-[clamp(2.8rem,6vw,5.2rem)] font-medium leading-[0.92] tracking-[-0.035em]"
                classeAccent="italic text-[#E0B48C]"
              />
              <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed">
                On l&apos;expose en vitrine, avec ton accord. Un mur entier de grands-parents — et chacun
                repart avec la même question : et nous, on a quoi&nbsp;?
              </Apparition>
              <Apparition delai={250}>
                <Bouton href={`${DOSSIER}/la-vitrine`} variante="clair">Préparer mon dépôt</Bouton>
              </Apparition>
            </div>
            <ul aria-label="Le mur de la vitrine, dessiné" className="grid grid-cols-4 gap-2.5 sm:gap-3">
              {MUR.slice(0, 7).map((annee, i) => (
                <Apparition as="li" key={annee} de="zoom" delai={i * 70} className={`bg-[#F3EBDD] p-1.5 pb-1 ${i % 3 === 1 ? "rotate-[1.5deg]" : i % 3 === 2 ? "-rotate-1" : ""}`}>
                  <span aria-hidden="true" className={`block aspect-[4/5] ${["bg-[linear-gradient(#b9a17f_0_55%,#7a6249_55%)]", "bg-[radial-gradient(circle_at_50%_40%,#cdb48e_0_30%,#8c735a_31%)]", "bg-[linear-gradient(160deg,#d3bf9c_0_50%,#6e5946_50%)]"][i % 3]} [filter:sepia(.4)]`} />
                  <span className="block pt-0.5 text-center font-[family-name:var(--f-caveat)] text-[19px] leading-tight text-[#3B2F2A]">{annee}</span>
                </Apparition>
              ))}
              <li className="grid border-2 border-dashed border-[#F3EBDD] p-1.5 pb-1">
                <span className="grid aspect-[4/5] place-items-center text-center font-[family-name:var(--titres)] text-lg italic">Et nous&nbsp;?</span>
                <span className="block pt-0.5 text-center font-[family-name:var(--f-caveat)] text-[19px] leading-tight">2026</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- Questions ---------- */}
      <section id="questions" className="scroll-mt-24 mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-36 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="space-y-6">
          <Apparition><Surtitre numero="8" className="text-[var(--doux)]">Questions</Surtitre></Apparition>
          <TitreRevele
            texte="Avant *d'appeler.*"
            className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.035em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
        </div>
        <Apparition delai={150}>
          <Accordeon questions={QUESTIONS.map((q) => ({ question: q.q, reponse: q.r }))} />
        </Apparition>
      </section>

      <AppelFinal />
    </main>
  );
}
