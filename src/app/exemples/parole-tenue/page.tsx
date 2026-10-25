import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Accordeon from "../_kit/Accordeon";
import Apparition from "../_kit/Apparition";
import CarteLueur from "../_kit/CarteLueur";
import Defilant from "../_kit/Defilant";
import RecitColle from "../_kit/RecitColle";
import TitreRevele from "../_kit/TitreRevele";
import Billet from "./_composants/Billet";
import { AppelFinal, Bouton, Surtitre } from "./_composants/Blocs";
import FermeTesOnglets from "./_composants/FermeTesOnglets";
import ProchainDimanche from "./_composants/ProchainDimanche";
import { BUDGETS, DOSSIER, EPISODES, ETAPES, FAQ, MENTIONS_TOURISME, MUR_EXEMPLES, VOYAGES, euros, photos, total } from "./_composants/donnees";

// L'accueil de Parole Tenue. Un seul bouton (« Remplir l'agenda » : « Sur l'accueil, un
// seul bouton : ferme tes onglets. Trois questions : avec qui, quand, et quel budget. »),
// puis la marque (« Créer une marque ») : pas des destinations, des promesses ; la
// promesse qu'on écrit sur sa page ; le mur des billets ; et, de l'autre vidéo, la vidéo
// du dimanche 21 h et les budgets ligne par ligne.
export const metadata: Metadata = {
  title: "Parole Tenue — agence de voyage, site de démonstration",
  description:
    "Le site d'une agence de voyage imaginaire qui ne vend que les voyages promis : un seul bouton pour fermer tes quarante onglets, trente minutes avec un conseiller, ta promesse et sa date, des budgets détaillés ligne par ligne.",
  ...adressesDeLaPage("/exemples/parole-tenue"),
};

const PHOTOS_ETAPES = [photos.lisbonne, photos.venise, photos.bali, photos.islande];
const ANGLES = [-3, 2, -1.5, 3, -2.5, 1.5];

export default function ParoleTenue() {
  const [noces] = BUDGETS;
  const [japon] = VOYAGES;
  return (
    <main>
      <FermeTesOnglets />

      {/* ---------- Les promesses qu'on se fait ---------- */}
      <div className="bg-[var(--accent)] py-5 text-[var(--sur-accent)]">
        <Defilant
          duree={52}
          separateur="✈"
          elements={VOYAGES.map((v) => `« ${v.phrase} »`)}
          classeElement="font-[family-name:var(--titres)] text-2xl italic md:text-3xl whitespace-nowrap"
        />
      </div>

      {/* ---------- Pas des destinations : des promesses ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-8 md:py-32">
        <div className="mb-14 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div className="space-y-6">
            <Apparition><Surtitre className="text-[var(--doux)]">Les voyages promis</Surtitre></Apparition>
            <TitreRevele
              texte="Pas des destinations. *Des promesses.*"
              className="font-[family-name:var(--titres)] text-[clamp(3.2rem,7.4vw,7rem)] leading-[0.9] tracking-[-0.02em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
          </div>
          <Apparition as="p" delai={200} className="text-xl leading-relaxed text-[var(--doux)]">
            Tout le monde a un voyage promis. « On ira au Japon, un jour. » On ne vend qu&apos;une chose :
            celui-là. Le bon mois pour partir, et un budget d&apos;exemple pour deux.
          </Apparition>
        </div>
        <ul className="grid gap-5 md:grid-cols-6">
          {VOYAGES.slice(0, 3).map((v, i) => {
            const p = v.photo ? photos[v.photo] : null;
            return (
              <Apparition as="li" key={v.id} de="zoom" delai={i * 130} className={i === 0 ? "md:col-span-6 lg:col-span-3 lg:row-span-2" : "md:col-span-3"}>
                <CarteLueur className="group h-full rounded-[2rem]">
                  <Link href={`${DOSSIER}/voyages`} className={`relative flex h-full flex-col justify-end overflow-hidden rounded-[2rem] bg-[var(--sombre)] p-7 text-[var(--sur-sombre)] ${i === 0 ? "min-h-[460px] lg:min-h-[600px]" : "min-h-[280px]"}`}>
                    {p && <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover opacity-70 transition-transform duration-[1.4s] ease-out group-hover:scale-[1.06]" />}
                    <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,48,42,0.05)_25%,rgba(22,48,42,0.95)_100%)]" />
                    <span className="relative space-y-2">
                      <span className="block font-[family-name:var(--titres)] text-[clamp(1.6rem,2.6vw,2.4rem)] italic leading-tight">«&nbsp;{v.phrase}&nbsp;»</span>
                      <span className="block text-[15px]">{v.nom} · {v.pourquoi} · {euros(v.budget)} pour deux, exemple</span>
                    </span>
                  </Link>
                </CarteLueur>
              </Apparition>
            );
          })}
        </ul>
        <Apparition delai={200} className="mt-8">
          <Bouton href={`${DOSSIER}/voyages`} variante="sombre">Les six voyages qu&apos;on promet le plus</Bouton>
        </Apparition>
      </section>

      {/* ---------- Ta promesse ---------- */}
      <section className="px-3 sm:px-5">
        <div className="kit-grain relative overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 sm:px-10 md:py-32 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="space-y-7">
              <Apparition><Surtitre>Ta promesse</Surtitre></Apparition>
              <TitreRevele
                texte="À qui, quel voyage, *depuis quand.*"
                className="font-[family-name:var(--titres)] text-[clamp(2.8rem,6vw,5.4rem)] leading-[0.92] tracking-[-0.02em]"
                classeAccent="italic text-[var(--accent)]"
              />
              <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed">
                Tu l&apos;écris sur le site. Il te dit depuis combien de temps tu la repousses, et te propose une
                date — avec ce qu&apos;il faut mettre de côté, chaque mois.
              </Apparition>
              <Apparition delai={250}>
                <Bouton href={`${DOSSIER}/ta-promesse`}>Écrire la mienne</Bouton>
              </Apparition>
            </div>
            <Apparition de="droite" delai={150} className="space-y-4">
              <div className="flex overflow-hidden rounded-[1.8rem] bg-[var(--fond)] text-[var(--encre)] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)]">
                <div className="flex-1 space-y-2 p-6">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[var(--accent-texte)]">Promis en 2019 · exemple</p>
                  <p className="font-[family-name:var(--titres)] text-[2.4rem] leading-none">
                    {japon.nom} <span className="italic text-[var(--accent-texte)]">avec Léo</span>
                  </p>
                  <p className="text-[15px] text-[var(--doux)]">Repoussée depuis 7 ans · départ proposé : avril 2028, pour les cerisiers</p>
                </div>
                <div aria-hidden="true" className="grid w-16 place-items-center border-l-2 border-dashed border-[var(--trait)] text-3xl">✈</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <p className="rounded-[1.4rem] bg-[#21433A] p-5">
                  <span className="block text-[12px] font-semibold uppercase tracking-[0.18em]">Budget pour deux</span>
                  <span className="mt-1 block font-[family-name:var(--titres)] text-[2.2rem] leading-none tabular-nums">{euros(japon.budget)}</span>
                </p>
                <p className="rounded-[1.4rem] bg-[var(--accent)] p-5 text-[var(--sur-accent)]">
                  <span className="block text-[12px] font-semibold uppercase tracking-[0.18em]">De côté, 18 mois</span>
                  <span className="mt-1 block whitespace-nowrap font-[family-name:var(--titres)] text-[1.9rem] leading-none tabular-nums sm:text-[2.2rem]">{euros(Math.ceil(japon.budget / 18))}<span className="text-[1rem]">&nbsp;/&nbsp;mois</span></span>
                </p>
              </div>
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Dimanche, 21 h ---------- */}
      <section id="dimanche" className="scroll-mt-20 mx-auto max-w-7xl px-4 py-24 sm:px-8 md:py-32">
        <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div className="space-y-6">
            <Apparition><Surtitre className="text-[var(--doux)]">Chaque dimanche, 21 h</Surtitre></Apparition>
            <TitreRevele
              texte="Pile quand les onglets s'ouvrent : *une vidéo.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.8rem,6vw,5.4rem)] leading-[0.92] tracking-[-0.02em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
          </div>
          <Apparition as="p" delai={150} className="text-xl leading-relaxed text-[var(--doux)]">
            Un voyage, son budget, en deux minutes. Prochaine : <strong className="font-semibold text-[var(--encre)]"><ProchainDimanche /></strong>.
          </Apparition>
        </div>
        <ul className="grid gap-5 md:grid-cols-3">
          {EPISODES.map((e, i) => {
            const p = photos[e.photo];
            return (
              <Apparition as="li" key={e.titre} de="zoom" delai={i * 120}>
                <div className="group relative aspect-[9/12] overflow-hidden rounded-[2rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
                  <Image src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover opacity-75 transition-transform duration-[1.4s] group-hover:scale-[1.05]" />
                  <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,48,42,0.1)_35%,rgba(22,48,42,0.95)_100%)]" />
                  <span aria-hidden="true" className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[var(--accent)] pl-1 text-2xl text-[var(--sur-accent)] transition-transform duration-500 group-hover:scale-110">▶</span>
                  <span className="absolute left-5 top-5 rounded-full bg-[var(--sombre)] px-3 py-1 text-[13px] font-semibold">Dimanche · {e.duree}</span>
                  <span className="absolute inset-x-5 bottom-5 space-y-1">
                    <span className="block font-[family-name:var(--titres)] text-[2rem] leading-none">{e.titre}</span>
                    <span className="block text-[15px]">{e.budget} pour deux, exemple</span>
                  </span>
                </div>
              </Apparition>
            );
          })}
        </ul>
      </section>

      {/* ---------- Les budgets ---------- */}
      <section className="bg-[var(--accent)] text-[var(--sur-accent)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-6">
            <Apparition><Surtitre>Ce qu&apos;on tape : « {noces.recherche} »</Surtitre></Apparition>
            <TitreRevele
              texte="Une page, trois budgets, *ligne par ligne.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.8rem,6vw,5.2rem)] leading-[0.92] tracking-[-0.02em]"
              classeAccent="italic"
            />
            <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed">
              Pas « à partir de ». Les vols, les nuits, les transferts, et le total. Des exemples datés, pour deux.
            </Apparition>
            <Apparition delai={250}>
              <Bouton href={`${DOSSIER}/budgets/${noces.slug}`} variante="sombre">Voyage de noces : les trois budgets</Bouton>
            </Apparition>
          </div>
          <ul className="space-y-3">
            {noces.voyages.map((v, i) => (
              <Apparition as="li" key={v.ou} de="droite" delai={i * 120} className="flex items-center justify-between gap-4 rounded-[1.6rem] bg-[var(--fond)] px-6 py-5 text-[var(--encre)]">
                <span>
                  <span className="block font-[family-name:var(--titres)] text-[2rem] leading-none">{v.ou}</span>
                  <span className="block text-[15px] text-[var(--doux)]">{v.duree} · vols, nuits, transferts</span>
                </span>
                <span className="font-[family-name:var(--titres)] text-[2rem] tabular-nums">{euros(total(v))}</span>
              </Apparition>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Comment on la tient ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36">
        <div className="mb-10 space-y-6 md:mb-4">
          <Apparition><Surtitre className="text-[var(--doux)]">Comment on la tient</Surtitre></Apparition>
          <TitreRevele
            texte="De quarante onglets *à un seul billet.*"
            className="max-w-4xl font-[family-name:var(--titres)] text-[clamp(2.8rem,6vw,5.4rem)] leading-[0.92] tracking-[-0.02em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
        </div>
        <RecitColle
          etapes={ETAPES.map((e, i) => ({
            surtitre: `Étape ${i + 1}`,
            titre: e.titre,
            texte: <p>{e.texte}</p>,
            visuel: <Image src={PHOTOS_ETAPES[i].src} alt={PHOTOS_ETAPES[i].alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />,
          }))}
        />
      </section>

      {/* ---------- Le mur ---------- */}
      <section id="mur" className="scroll-mt-20 border-y border-[var(--trait)] bg-[#F3EAD8]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="space-y-6">
            <Apparition><Surtitre className="text-[var(--doux)]">Dans la vitrine</Surtitre></Apparition>
            <TitreRevele
              texte="Un mur de voyages promis, *sur des billets en papier.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5vw,4.4rem)] leading-[0.95] tracking-[-0.02em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
            <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed text-[var(--doux)]">
              Les passants écrivent le leur, sans nom ni coordonnées. Le tien peut s&apos;y coller aussi.
            </Apparition>
            <Apparition delai={250}>
              <Bouton href={`${DOSSIER}/ta-promesse#mur`} variante="sombre">Coller mon billet</Bouton>
            </Apparition>
          </div>
          <ul className="mx-auto grid w-full max-w-sm grid-cols-1 gap-x-4 gap-y-5 sm:max-w-none sm:grid-cols-3" aria-label="Billets du mur (exemples)">
            {MUR_EXEMPLES.map((b, i) => (
              <Apparition as="li" key={b.ou} de="zoom" delai={i * 90}>
                <Billet ou={b.ou} pour={b.pour} angle={ANGLES[i]} />
              </Apparition>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Immatriculée, garantie, assurée ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6">
            <Apparition><Surtitre className="text-[var(--doux)]">Ce que dit le Code du tourisme</Surtitre></Apparition>
            <TitreRevele
              texte="Immatriculée, garantie, *assurée.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5vw,4.4rem)] leading-[0.95] tracking-[-0.02em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
            <Apparition as="p" delai={150} className="text-lg leading-relaxed text-[var(--doux)]">
              Art. R.211-2 : ces mentions sont sur le site, en bas de chaque page. Si l&apos;agence fait défaut, sa
              garantie financière rembourse les sommes versées.
            </Apparition>
          </div>
          <dl className="grid gap-4 sm:grid-cols-2">
            {MENTIONS_TOURISME.map((m, i) => (
              <Apparition key={m.libelle} delai={i * 100} className="space-y-2 rounded-[1.6rem] border border-[var(--trait)] bg-[var(--carte)] p-6">
                <dt className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">{m.libelle}</dt>
                <dd className="text-[16px] leading-relaxed">{m.valeur}</dd>
              </Apparition>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------- Questions ---------- */}
      <section id="questions" className="scroll-mt-24 border-t border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="space-y-6">
            <Apparition><Surtitre className="text-[var(--doux)]">Questions</Surtitre></Apparition>
            <TitreRevele
              texte="Avant *de partir.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.02em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
          </div>
          <Apparition delai={150}>
            <Accordeon questions={FAQ.map((q) => ({ question: q.q, reponse: q.r }))} />
          </Apparition>
        </div>
      </section>

      <div className="h-3 sm:h-5" />
      <AppelFinal />
    </main>
  );
}
