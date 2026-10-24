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
import { AppelFinal, Bouton, Surtitre } from "./_composants/Blocs";
import Gravure from "./_composants/Gravure";
import { OutilGrave } from "./_composants/Outils";
import Panne from "./_composants/Panne";
import styles from "./_composants/reviens.module.css";
import { DOSSIER, GAMME, HORAIRES, JOURNEE, SAMEDI, STOCK, euros, listes, outils, photos, questions, teintes, ttc } from "./_composants/donnees";

// L'accueil de Reviens. : la marque de la vidéo « Créer une marque » (l'outil qu'on te
// rend, gravé à ton prénom) et les idées de « Remplir l'agenda » (le gros bouton « En
// panne », le vrai stock, le samedi soir, la liste pour ouvrir un restaurant). Premier
// écran partagé en deux, inspiré de la composition d'un tableau de bord industriel :
// le nom à gauche, la console du comptoir à droite.
export const metadata: Metadata = {
  title: "Reviens. — matériel professionnel, site de démonstration",
  description:
    "Le site d'un dépôt de matériel professionnel imaginaire : l'outil gravé à ton prénom, vu en direct, et un gros bouton « En panne » qui trouve la pièce avec le vrai stock. Prix HT, vente aux professionnels.",
  ...adressesDeLaPage("/exemples/reviens"),
};

const pizzeria = listes[0];
const totalPizzeria = pizzeria.lignes.reduce((t, l) => t + l.prix, 0);

export default function Reviens() {
  return (
    <main>
      {/* ---------- 1. Premier écran : le nom, et la console du comptoir ---------- */}
      <section className="kit-grain relative isolate overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(rgba(233,216,180,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(233,216,180,0.07)_1px,transparent_1px)] bg-[size:72px_72px]" />
        <div aria-hidden="true" className="absolute -right-40 top-1/3 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(179,74,52,0.35),transparent_65%)] blur-2xl" />
        <div className="relative mx-auto grid min-h-[100svh] max-w-7xl items-center gap-12 px-5 pb-14 pt-32 sm:px-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14 lg:pt-28">
          <div className="space-y-8">
            <Apparition><Surtitre clair n="01">Matériel pro · bâtiment et restauration</Surtitre></Apparition>
            <TitreRevele
              as="h1"
              auChargement
              texte="Reviens."
              className="font-[family-name:var(--titres)] text-[clamp(3rem,18vw,8.2rem)] font-black uppercase leading-[0.8] tracking-[-0.06em] lg:text-[clamp(5rem,9.6vw,10rem)]"
            />
            <TitreRevele
              as="p"
              auChargement
              delai={300}
              texte="Le matériel *qui revient.*"
              className="font-[family-name:var(--titres)] text-[clamp(1.6rem,3.2vw,2.7rem)] font-extrabold uppercase leading-[1] tracking-[-0.02em]"
              classeAccent="text-[#E9D8B4]"
            />
            <Apparition as="p" delai={550} className="max-w-xl text-lg leading-relaxed">
              Ta visseuse, gravée à ton prénom : celui qui l&apos;emprunte sait à qui la rendre. Ton frigo
              qui lâche un samedi soir : une photo de la plaque, et la pièce t&apos;attend au comptoir.
            </Apparition>
            <Apparition delai={700} className="flex flex-wrap gap-3">
              <Bouton href={`${DOSSIER}/graver`} variante="clair">Graver mon outil</Bouton>
              <Bouton href={`${DOSSIER}/ouvrir-un-restaurant`} variante="contour">Ouvrir un restaurant</Bouton>
            </Apparition>
          </div>

          <div>
            <div id="panne" className="relative isolate scroll-mt-24 overflow-hidden rounded-[22px] border border-white/15 bg-[#151E25] p-5 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.85)] sm:p-7">
              <Image src={photos.piano.src} alt="" fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="-z-10 object-cover opacity-25" />
              <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_55%,rgba(21,30,37,0.55),rgba(21,30,37,0.95)_70%)]" />
              <div className="mb-5 flex items-center justify-between gap-3 border-b border-dashed border-white/20 pb-3 font-[family-name:var(--titres)] text-[12px] font-bold uppercase tracking-[0.16em]">
                <span className="flex items-center gap-2 text-[#5CD68D]">
                  <span aria-hidden="true" className="h-2 w-2 animate-pulse rounded-full bg-[#5CD68D]" />
                  Comptoir pièces ouvert
                </span>
                <span className="text-[#B9C2CA]">Samedi · jusqu&apos;à 23 h</span>
              </div>
              <Panne />
            </div>
          </div>
        </div>
        <Apparition as="ul" delai={900} className="relative mx-auto grid max-w-7xl grid-cols-2 border-t border-dashed border-white/20 px-5 font-[family-name:var(--titres)] sm:px-8 md:grid-cols-4">
          {[
            ["2 340", "références au dépôt"],
            ["7 h", "retrait au comptoir, dès"],
            ["23 h", "le samedi, fermeture"],
            ["HT", "chaque prix est écrit"],
          ].map(([v, l]) => (
            <li key={l} className="space-y-1 py-6 pr-4">
              <span className="block text-3xl font-black tabular-nums md:text-4xl">{v}</span>
              <span className="block text-[12px] font-bold uppercase tracking-[0.16em] text-[#E9D8B4]">{l}</span>
            </li>
          ))}
        </Apparition>
      </section>

      {/* ---------- 2. Le bandeau du comptoir ---------- */}
      <div className="bg-[var(--accent)] py-4 text-[var(--sur-accent)]">
        <Defilant
          duree={44}
          separateur="■"
          elements={[
            "Thermostat TH-700 · en stock : 3",
            "Visseuse gravée « KARIM »",
            "Joint de porte JP-700 · sous 48 h",
            "Samedi : comptoir jusqu'à 23 h",
            "Niveau 80 cm gravé « SONIA »",
            "Pizzeria, 40 couverts : la liste de base",
            "Retrait dès 7 h",
          ]}
          classeElement="font-[family-name:var(--titres)] text-lg md:text-xl font-extrabold uppercase tracking-[0.02em] whitespace-nowrap"
        />
      </div>

      {/* ---------- 3. Le vrai problème : deux métiers, le même ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="space-y-6">
            <Apparition><Surtitre n="02">Le vrai problème</Surtitre></Apparition>
            <TitreRevele
              texte="Pas la puissance. *Ce qui revient.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.7rem,6.5vw,6rem)] font-black uppercase leading-[0.9] tracking-[-0.045em]"
              classeAccent="text-[var(--accent-texte)]"
            />
          </div>
          <Apparition as="p" delai={150} className="text-xl leading-relaxed text-[var(--doux)]">
            Les marques d&apos;outils vendent toutes des volts et des éclairs. Les fournisseurs, douze mille
            références et « prix sur demande ». Sur un chantier comme en cuisine, le problème est
            ailleurs.
          </Apparition>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-2">
          <Apparition de="zoom">
            <article className="relative flex h-[520px] flex-col justify-end overflow-hidden rounded-[18px] bg-[var(--sombre)] p-7 text-[var(--sur-sombre)] md:h-full md:min-h-[620px]">
              <Image src={photos.chantier.src} alt={photos.chantier.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover opacity-55" />
              <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(31,43,53,0.15)_25%,rgba(31,43,53,0.95)_100%)]" />
              <div className="relative space-y-4">
                <p className="font-[family-name:var(--titres)] text-[13px] font-bold uppercase tracking-[0.2em] text-[#E9D8B4]">Sur un chantier</p>
                <h3 className="font-[family-name:var(--titres)] text-[2.3rem] font-black uppercase leading-[0.95] tracking-[-0.03em]">La visseuse qui disparaît.</h3>
                <p className="max-w-md text-lg leading-relaxed">Elle était là ce matin. Gravée à ton prénom, sur le corps, en gros : impossible à rater, et facile à rendre.</p>
                <Link href={`${DOSSIER}/graver`} className="inline-flex font-[family-name:var(--titres)] font-extrabold uppercase tracking-[0.06em] text-[#E9D8B4] underline underline-offset-8">Graver la mienne →</Link>
              </div>
            </article>
          </Apparition>
          <div className="grid gap-4">
          <Apparition de="zoom" delai={120}>
            <article className="relative flex h-[380px] flex-col justify-end overflow-hidden rounded-[18px] bg-[var(--sombre)] p-7 text-[var(--sur-sombre)]">
              <Image src={photos.piano.src} alt={photos.piano.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover opacity-50" />
              <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(31,43,53,0.15)_15%,rgba(31,43,53,0.95)_100%)]" />
              <div className="relative space-y-3">
                <p className="font-[family-name:var(--titres)] text-[13px] font-bold uppercase tracking-[0.2em] text-[#E9D8B4]">En cuisine</p>
                <h3 className="font-[family-name:var(--titres)] text-[2.1rem] font-black uppercase leading-[0.95] tracking-[-0.03em]">Le frigo qui lâche un samedi soir.</h3>
                <p className="max-w-md text-lg leading-relaxed">Ton client, c&apos;est un chef. On ne lui vend pas du matériel : on lui vend son service.</p>
              </div>
            </article>
          </Apparition>
          <div className="grid gap-4 sm:grid-cols-2">
          {[
            { v: "Le vrai stock", d: "Mis à jour à chaque sortie. Quand une pièce manque, le délai est écrit.", fond: "bg-[var(--accent)] text-[var(--sur-accent)]" },
            { v: "Le prix écrit", d: "Hors taxes, le TTC à côté. Jamais « sur demande ».", fond: "bg-[#E9D8B4] text-[#1F2B35]" },
          ].map((c, i) => (
            <Apparition key={c.v} de="zoom" delai={200 + i * 120}>
              <div className={`flex h-full min-h-[200px] flex-col justify-between gap-6 rounded-[18px] p-7 ${c.fond}`}>
                <p className="font-[family-name:var(--titres)] text-[2.2rem] font-black uppercase leading-none tracking-[-0.03em]">{c.v}</p>
                <p className="max-w-sm text-lg leading-relaxed">{c.d}</p>
              </div>
            </Apparition>
          ))}
          </div>
          </div>
        </div>
      </section>

      {/* ---------- 4. Le vrai stock : une bande sombre ---------- */}
      <section className="px-3 sm:px-5">
        <div className="kit-grain relative overflow-hidden rounded-[22px] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div aria-hidden="true" className="absolute inset-4 rounded-[14px] border border-dashed border-[#E9D8B4]/25" />
          <div className="relative mx-auto grid max-w-6xl gap-12 px-7 py-24 sm:px-12 md:py-32 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="space-y-6">
              <Apparition><Surtitre clair n="03">Au dépôt, maintenant</Surtitre></Apparition>
              <TitreRevele
                texte={"Le vrai stock. *Pas «\u00a0appelez-nous\u00a0».*"}
                className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5.5vw,5rem)] font-black uppercase leading-[0.92] tracking-[-0.045em]"
                classeAccent="text-[#E9D8B4]"
              />
              <Apparition as="p" delai={200} className="max-w-md text-lg leading-relaxed">
                Ce que tu vois, c&apos;est ce qu&apos;il y a sur les étagères, mis à jour à chaque sortie.
                Pas « du lundi au vendredi » : le comptoir pièces tient le samedi soir.
              </Apparition>
              <Apparition delai={300}>
              <dl className="divide-y divide-white/15 border-y border-white/15">
                {HORAIRES.map((h) => (
                  <div key={h.jours} className="flex items-baseline justify-between gap-4 py-3">
                    <dt className="font-[family-name:var(--titres)] font-bold uppercase tracking-[0.04em]">
                      {h.jours}
                      {h.note && <span className="block font-[family-name:var(--texte)] text-sm font-normal normal-case tracking-normal">{h.note}</span>}
                    </dt>
                    <dd className={`shrink-0 font-[family-name:var(--titres)] font-black tabular-nums ${h.jours === "Samedi" ? "text-[#E9D8B4]" : ""}`}>{h.heures}</dd>
                  </div>
                ))}
              </dl>
              </Apparition>
            </div>
            <Apparition de="droite" delai={150}>
              <div className="overflow-hidden rounded-[16px] border border-white/15 bg-[#151E25]">
                <div className="flex items-center justify-between border-b border-white/15 px-5 py-3 font-[family-name:var(--titres)] text-[12px] font-bold uppercase tracking-[0.18em] text-[#B9C2CA]">
                  <span>Famille</span>
                  <span>Stock</span>
                </div>
                <ul className="divide-y divide-white/10">
                  {STOCK.map((s, i) => (
                    <Apparition as="li" key={s.nom} delai={i * 110} de="gauche" className="flex items-center justify-between gap-4 px-5 py-4">
                      <span>
                        <span className="block font-[family-name:var(--titres)] text-lg font-bold uppercase tracking-[0.02em] text-[#F2EEE6]">{s.nom}</span>
                        <span className="text-sm text-[#B9C2CA]">Réf. {s.ref}</span>
                      </span>
                      <span className={`flex items-center gap-2.5 font-[family-name:var(--titres)] text-2xl font-black tabular-nums ${s.etat === "ok" ? "text-[#5CD68D]" : "text-[#F2B84B]"}`}>
                        <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${s.etat === "ok" ? "bg-[#5CD68D]" : "bg-[#F2B84B]"}`} />
                        {s.n}
                      </span>
                    </Apparition>
                  ))}
                </ul>
                <p className="border-t border-white/15 px-5 py-3 text-xs text-[#B9C2CA]">Exemple · sur le vrai site, mis à jour à chaque sortie de pièce</p>
              </div>
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- 5. Samedi, 21 h 40 : le récit ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36">
        <div className="mb-10 space-y-6 md:mb-4">
          <Apparition><Surtitre n="04">Le service de samedi soir</Surtitre></Apparition>
          <TitreRevele
            texte={"Samedi, 21 h 40. *Le frigo lâche.*"}
            className="max-w-4xl font-[family-name:var(--titres)] text-[clamp(2.6rem,6vw,5.5rem)] font-black uppercase leading-[0.92] tracking-[-0.045em]"
            classeAccent="text-[var(--accent-texte)]"
          />
        </div>
        <RecitColle
          className="[&_h3]:font-black [&_h3]:uppercase [&_h3]:tracking-[-0.03em]"
          etapes={SAMEDI.map((s, i) => ({
            surtitre: s.heure,
            titre: s.titre,
            texte: <p>{s.texte}</p>,
            visuel:
              i === 1 ? (
                <div className="absolute inset-0 grid place-items-center bg-[#151E25]">
                  <div className="w-[78%] max-w-[340px] rotate-[-2deg] rounded-md border-2 border-[#8A9099] bg-[#C9CED3] bg-[linear-gradient(135deg,#D9DDE1,#B9BFC6)] px-6 py-5 text-[15px] font-semibold uppercase leading-7 tabular-nums text-[#15181C] shadow-[0_30px_50px_-20px_rgba(0,0,0,0.8)]">
                    <p className="text-lg font-bold tracking-[0.2em]">FABRICANT</p>
                    <p>Modèle AR-700</p>
                    <p>N° 2231-0457</p>
                    <p>230 V · 50 Hz</p>
                    <p className="text-xs tracking-[0.2em]">exemple</p>
                  </div>
                </div>
              ) : i === 2 ? (
                <div className="absolute inset-0 grid place-items-center bg-[#151E25] p-8">
                  <div className="w-full max-w-sm space-y-3 rounded-[14px] border border-white/15 bg-[#1E2A33] p-5 text-[#F2EEE6]">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#5CD68D]">Modèle reconnu · AR-700</p>
                    <p className="font-[family-name:var(--titres)] text-2xl font-black uppercase">Thermostat TH-700</p>
                    <p className="flex items-center gap-2 font-semibold text-[#5CD68D]"><span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#5CD68D]" />En stock : 3, au dépôt</p>
                    <p className="font-bold tabular-nums">{euros(64)} HT <span className="text-sm font-normal text-[#B9C2CA]">· {euros(ttc(64))} TTC · exemple</span></p>
                  </div>
                </div>
              ) : (
                <Image src={i === 0 ? photos.piano.src : photos.louches.src} alt={i === 0 ? photos.piano.alt : photos.louches.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              ),
          }))}
        />
        <Apparition className="mt-6">
          <Bouton href={`${DOSSIER}/en-panne`}>Ouvrir l&apos;outil « En panne »</Bouton>
        </Apparition>
      </section>

      {/* ---------- 6. La gravure en direct : l'application ---------- */}
      <section id="graver" className="scroll-mt-24 border-y border-[#D9C08A] bg-[#E9D8B4] py-24 [--accent-texte:#8E3524] text-[#1F2B35] md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="space-y-6">
            <Apparition><Surtitre n="05">L&apos;outil qu&apos;on te rend</Surtitre></Apparition>
            <TitreRevele
              texte="Tu tapes ton prénom. *Tu vois la gravure.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.5rem,5.2vw,4.8rem)] font-black uppercase leading-[0.92] tracking-[-0.045em]"
              classeAccent="text-[var(--accent-texte)]"
            />
            <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed">
              Choisis l&apos;outil, sa couleur, écris ton prénom : il se grave sous tes yeux, là où il le
              sera sur l&apos;outil. Au laser, en lettres de 12 mm, sur le corps — pas sur une étiquette
              qu&apos;on décolle.
            </Apparition>
            <Apparition delai={250}>
              <dl className="grid grid-cols-3 gap-2">
              {[
                ["12 mm", "la hauteur des lettres"],
                ["Laser", "dans le corps de l'outil"],
                ["1", "prénom par outil"],
              ].map(([v, l]) => (
                <div key={l} className="rounded-[12px] border-2 border-[#1F2B35] p-3">
                  <dt className="sr-only">{l}</dt>
                  <dd className="whitespace-nowrap font-[family-name:var(--titres)] text-2xl font-black">{v}</dd>
                  <dd className="mt-1 text-sm leading-snug">{l}</dd>
                </div>
              ))}
              </dl>
            </Apparition>
          </div>
          <Gravure outilDepart="visseuse" />
        </div>
      </section>

      {/* ---------- 7. La gamme : cinq outils, cinq prénoms ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <TitreRevele
            texte="Cinq outils. *Cinq prénoms.*"
            className="font-[family-name:var(--titres)] text-[clamp(2.6rem,6vw,5.5rem)] font-black uppercase leading-[0.92] tracking-[-0.045em]"
            classeAccent="text-[var(--accent-texte)]"
          />
          <Apparition as="p" delai={150} className="text-lg leading-relaxed text-[var(--doux)]">
            Prix hors taxes d&apos;exemple, gravure comprise. Vente réservée aux professionnels. Les prénoms
            sont inventés.
          </Apparition>
        </div>
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {outils.map((o, i) => {
            const t = teintes[i % teintes.length];
            return (
              <Apparition as="li" key={o.id} delai={i * 100} de="zoom">
                <CarteLueur className="h-full rounded-[18px] border border-[var(--trait)] bg-[var(--carte)]">
                  <div className="flex h-full flex-col justify-between gap-6 p-5">
                    <div className="grid h-32 place-items-center rounded-[12px] bg-[#EAE4D8] p-3">
                      <OutilGrave id={o.id} corps={t.corps} gravure={t.gravure} prenom={GAMME[i]} titre={`${o.nom} ${t.nom.toLowerCase()}, gravée « ${GAMME[i]} »`} className="h-full w-full" />
                    </div>
                    <div>
                      <h3 className="font-[family-name:var(--titres)] text-2xl font-black uppercase">{o.nom}</h3>
                      <p className="text-sm text-[var(--doux)]">{o.detail}</p>
                      <p className="mt-3 font-[family-name:var(--titres)] text-xl font-black tabular-nums">
                        {euros(o.prix)} HT
                      </p>
                      <p className="text-sm text-[var(--doux)] tabular-nums">soit {euros(ttc(o.prix))} TTC · exemple</p>
                    </div>
                  </div>
                </CarteLueur>
              </Apparition>
            );
          })}
        </ul>
      </section>

      {/* ---------- 8. Ouvrir un restaurant ---------- */}
      <section className="px-3 sm:px-5">
        <div className="relative overflow-hidden rounded-[22px] bg-[var(--accent)] text-[var(--sur-accent)]">
          <div className="mx-auto grid max-w-6xl gap-12 px-7 py-20 sm:px-12 md:py-28 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="space-y-6">
              <Apparition>
                <p className="font-[family-name:var(--titres)] text-[13px] font-bold uppercase tracking-[0.2em]">06 · Ce que les gens cherchent</p>
              </Apparition>
              <TitreRevele
                texte="La liste du matériel pour ouvrir un restaurant."
                className="font-[family-name:var(--titres)] text-[clamp(2.4rem,5vw,4.6rem)] font-black uppercase leading-[0.92] tracking-[-0.04em]"
              />
              <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed">
                Pizzeria, restaurant rapide, bar : la liste de base de chacun, chiffrée en hors taxes, à
                commander d&apos;un coup. Tu décoches ce que tu as déjà.
              </Apparition>
              <Apparition delai={250}>
                <Bouton href={`${DOSSIER}/ouvrir-un-restaurant`} variante="sombre">Voir la liste</Bouton>
              </Apparition>
            </div>
            <Apparition de="droite" delai={150}>
              <div className="rotate-[1.5deg] overflow-hidden rounded-[16px] bg-[var(--carte)] text-[var(--encre)] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
                <div className="flex items-end justify-between gap-4 border-b border-dashed border-[var(--trait)] p-5">
                  <p className="font-[family-name:var(--titres)] text-2xl font-black uppercase leading-tight">{pizzeria.titre}</p>
                  <span className="shrink-0 rounded-[6px] border-2 border-[var(--encre)] px-2 py-1 font-[family-name:var(--titres)] text-xs font-bold uppercase">{pizzeria.couverts}</span>
                </div>
                <ul className="divide-y divide-[var(--trait)]">
                  {pizzeria.lignes.map((l) => (
                    <li key={l.ref} className="flex items-center justify-between gap-4 px-5 py-2.5">
                      <span className="min-w-0">{l.nom}</span>
                      <span className="shrink-0 font-bold tabular-nums">{euros(l.prix)}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between gap-4 bg-[var(--sombre)] px-5 py-4 text-[var(--sur-sombre)]">
                  <span className="font-[family-name:var(--titres)] text-[12px] font-bold uppercase tracking-[0.18em] text-[#E9D8B4]">Total HT · exemple</span>
                  <span className="font-[family-name:var(--titres)] text-2xl font-black tabular-nums">{euros(totalPizzeria)}</span>
                </div>
              </div>
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- 9. La journée gravure, et l'affiche ---------- */}
      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 md:py-36 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Apparition de="zoom">
          <div className="relative mx-auto w-full max-w-sm">
            <div className="-rotate-3 rounded-[6px] bg-[var(--sombre)] p-9 shadow-[0_40px_70px_-30px_rgba(31,43,53,0.9)]">
              <p className="font-[family-name:var(--titres)] text-[3.3rem] font-black uppercase leading-[0.92] tracking-[-0.03em] text-[var(--sur-sombre)]">
                Rends-la <span className="text-[#E9D8B4]">à Karim.</span>
              </p>
              <div className={`mx-auto my-8 w-56 ${styles.flotte}`}>
                <OutilGrave id="visseuse" corps="#B34A34" gravure="#F7EBDD" prenom="KARIM" titre="Une visseuse brique, gravée « KARIM »" className="w-full" />
              </div>
              <p className="font-[family-name:var(--titres)] text-xs font-bold uppercase tracking-[0.22em] text-[var(--sur-sombre)]">Reviens. · outillage gravé</p>
            </div>
          </div>
        </Apparition>
        <div className="space-y-6">
          <Apparition><Surtitre n="07">Pour le lancement · gratuit</Surtitre></Apparition>
          <TitreRevele
            texte="La journée *gravure.*"
            className="font-[family-name:var(--titres)] text-[clamp(2.6rem,6vw,5.5rem)] font-black uppercase leading-[0.92] tracking-[-0.045em]"
            classeAccent="text-[var(--accent-texte)]"
          />
          <Apparition as="p" delai={150} className="max-w-xl text-lg leading-relaxed">
            Tu ramènes tes vieux outils, <strong>toutes marques</strong>, et on les grave à ton prénom.
            Gratuit, sans rien acheter : jusqu&apos;à {JOURNEE.maxOutils} outils par personne. Et une seule
            affiche, dans les dépôts qui l&apos;acceptent : « Rends-la à Karim. »
          </Apparition>
          <Apparition delai={250} className="inline-flex flex-col gap-1 rounded-[12px] border-2 border-dashed border-[var(--encre)] px-5 py-4">
            <span className="font-[family-name:var(--titres)] text-2xl font-black uppercase first-letter:uppercase">{JOURNEE.date}</span>
            <span className="text-[var(--doux)]">{JOURNEE.heures} · {JOURNEE.lieu}</span>
          </Apparition>
          <Apparition delai={320}>
            <Bouton href={`${DOSSIER}/journee-gravure`} variante="sombre">Réserver mon heure</Bouton>
          </Apparition>
        </div>
      </section>

      {/* ---------- 10. Les questions du comptoir ---------- */}
      <section id="questions" className="scroll-mt-24 border-t border-dashed border-[var(--trait)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="space-y-6">
            <Apparition><Surtitre n="08">Au comptoir</Surtitre></Apparition>
            <TitreRevele
              texte="Ce qu'on nous *demande.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.5rem,5vw,4.4rem)] font-black uppercase leading-[0.92] tracking-[-0.045em]"
              classeAccent="text-[var(--accent-texte)]"
            />
          </div>
          <Apparition delai={150}>
            <Accordeon questions={questions.map((q) => ({ question: q.q, reponse: q.r }))} />
          </Apparition>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
