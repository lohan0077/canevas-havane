import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Accordeon from "../_kit/Accordeon";
import Apparition from "../_kit/Apparition";
import CarteLueur from "../_kit/CarteLueur";
import Defilant from "../_kit/Defilant";
import PhotoCinema from "../_kit/PhotoCinema";
import TitreRevele from "../_kit/TitreRevele";
import { AppelFinal, Barres, Bouton, Certification, CommeTous, Etiquette } from "./_composants/Blocs";
import Diagnostics from "./_composants/Diagnostics";
import Regard from "./_composants/Regard";
import { CITATION, COULEURS, DOSSIER, FAQ, INTERETS, LETTRES, METHODE, PRIX, RAPPORT, TARIFS, euros, photos } from "./_composants/donnees";

// L'accueil de Tiers Regard. La marque (« Je dis ce que je vois », celui qui n'a aucun
// intérêt dans la vente, le rapport en une page, l'affiche) et les idées de « Remplir
// l'agenda » : « Sur l'accueil, trois questions. Maison ou appartement ? Permis de
// construire, quand ? Tu vends ou tu loues ? » puis la liste, avec le prix.
export const metadata: Metadata = {
  title: "Tiers Regard — diagnostic immobilier, site de démonstration",
  description:
    "Le site d'un diagnostiqueur immobilier imaginaire : trois questions donnent la liste de tes diagnostics et leur prix, chaque lettre du DPE a sa page, et ton rapport tient en une page.",
  ...adressesDeLaPage("/exemples/tiers-regard"),
};

const pack = PRIX.dpe + PRIX.amiante + PRIX.electricite;

export default function TiersRegard() {
  return (
    <main>
      {/* ---------- Premier écran ---------- */}
      <section className="kit-grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <PhotoCinema src={photos.fenetres.src} alt="" priority origine="70% 60%" className="opacity-55" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,10,16,0.92)_0%,rgba(7,10,16,0.55)_55%,rgba(7,10,16,0.35)_100%),linear-gradient(180deg,rgba(7,10,16,0.5)_0%,rgba(7,10,16,0)_35%,rgba(7,10,16,0.95)_100%)]" />
        {/* Le viseur : quatre coins jaunes, comme un cadrage d'appareil. Décoratif. */}
        <div aria-hidden="true" className="pointer-events-none absolute right-[8%] top-[24%] hidden h-[38%] w-[30%] lg:block">
          {["left-0 top-0 border-l-2 border-t-2", "right-0 top-0 border-r-2 border-t-2", "bottom-0 left-0 border-b-2 border-l-2", "bottom-0 right-0 border-b-2 border-r-2"].map((c) => (
            <span key={c} className={`absolute h-10 w-10 border-[var(--accent)] ${c}`} />
          ))}
          <span className="absolute -top-8 left-0 font-mono text-[12px] uppercase tracking-[0.2em] text-[var(--accent)]">Vu · écrit tel quel</span>
        </div>
        <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end gap-8 px-4 pb-10 pt-36 sm:px-8 md:pb-14">
          <Apparition><Etiquette>Diagnostic immobilier · vente et location</Etiquette></Apparition>
          <TitreRevele
            as="h1"
            auChargement
            texte="Je dis ce que *je vois.*"
            className="max-w-5xl font-semibold text-[clamp(3.4rem,10.5vw,10.5rem)] leading-[0.88] tracking-[-0.06em]"
            classeAccent="text-[var(--accent-texte)]"
          />
          <div className="grid gap-8 border-t border-white/20 pt-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <Apparition as="p" delai={350} className="max-w-2xl text-lg leading-relaxed text-[var(--sur-sombre)]/90 sm:text-xl">
              Dans une vente, tout le monde a un intérêt. Le diagnostiqueur, aucun : c&apos;est la loi,
              pour tous. Trois questions te donnent la liste de tes diagnostics et leur prix ; ton
              rapport, lui, tient en une page.
            </Apparition>
            <Apparition delai={600} className="flex flex-wrap gap-3 lg:justify-end">
              <Bouton href={`${DOSSIER}#questions`}>Mes diagnostics</Bouton>
              <Bouton href={`${DOSSIER}/une-page`} variante="contour">Le rapport en une page</Bouton>
            </Apparition>
          </div>
          <Apparition as="ul" delai={800} className="grid grid-cols-1 gap-3 text-[15px] sm:grid-cols-3">
            {[
              [`Le pack : ${euros(pack)} TTC`, "maison, permis 1985 · exemple"],
              ["Rapport sous 48 h", "et sa page en clair · exemple"],
              ["Certifiée, assurée", "n° 0000 · exemple"],
            ].map(([fort, doux]) => (
              <li key={fort} className="flex items-baseline justify-between gap-3 rounded-[12px] border border-white/15 bg-[var(--sombre)]/70 px-4 py-3 backdrop-blur-md">
                <span className="font-semibold">{fort}</span>
                <span className="text-[13px] text-[var(--sur-sombre)]/85">{doux}</span>
              </li>
            ))}
          </Apparition>
        </div>
      </section>

      {/* ---------- Ce qu'on regarde, en continu ---------- */}
      <div className="bg-[var(--accent)] py-4 text-[var(--sur-accent)]">
        <Defilant
          duree={40}
          separateur="⅓"
          elements={["DPE", "Amiante", "Électricité", "Gaz", "Plomb", "Termites", "État des risques", "Assainissement", "Bruit"]}
          classeElement="font-[family-name:var(--titres)] text-2xl font-semibold uppercase tracking-[-0.01em] md:text-3xl whitespace-nowrap"
        />
      </div>

      {/* ---------- Trois questions ---------- */}
      <section id="questions" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-24 sm:px-8 md:py-32">
        <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div className="space-y-6">
            <Apparition><Etiquette>Ton client, c&apos;est toi</Etiquette></Apparition>
            <TitreRevele
              texte="Tes diagnostics, *en trois questions.*"
              className="font-semibold text-[clamp(2.6rem,6vw,5.4rem)] leading-[0.95] tracking-[-0.05em]"
              classeAccent="text-[var(--accent-texte)]"
            />
          </div>
          <Apparition as="p" delai={150} className="text-lg leading-relaxed text-[var(--doux)]">
            Maison ou appartement, permis de construire, vente ou location : le site sort la liste de
            tes diagnostics, avec le prix. Sans appeler personne — et sans qu&apos;une agence
            t&apos;envoie.
          </Apparition>
        </div>
        <Apparition de="zoom">
          <Diagnostics />
        </Apparition>
      </section>

      {/* ---------- Tout le monde a un intérêt ---------- */}
      <section className="bg-[#F3F2EC] text-[#111827]">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <Apparition><Etiquette clair>Dans une vente</Etiquette></Apparition>
            <TitreRevele
              texte="Tout le monde a *un intérêt.*"
              className="font-semibold text-[clamp(2.6rem,6vw,5.4rem)] leading-[0.95] tracking-[-0.05em]"
              classeAccent="kit-surligne"
            />
            <Apparition as="figure" delai={200} className="space-y-3 border-l-[3px] border-[#111827] pl-5">
              <blockquote className="font-[family-name:var(--titres)] text-[22px] font-medium leading-snug">«&nbsp;{CITATION}&nbsp;»</blockquote>
              <figcaption className="text-[14px] text-[#4B5563]">
                Code de la construction et de l&apos;habitation, art. L271-6 (extrait) · envers le
                propriétaire, son mandataire et les entreprises de travaux. Une obligation de tous les
                diagnostiqueurs.
              </figcaption>
            </Apparition>
          </div>
          <ul className="divide-y divide-[#D9D6CB] border-y border-[#111827]">
            {INTERETS.map((r, i) => (
              <Apparition as="li" key={r.qui} delai={i * 140} de="gauche" className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-7">
                <span className="font-[family-name:var(--titres)] text-[clamp(2rem,4.5vw,3.6rem)] font-semibold leading-none tracking-[-0.04em]">{r.qui}</span>
                <span className="text-[18px] text-[#4B5563]">{r.veut}</span>
              </Apparition>
            ))}
            <Apparition as="li" delai={460} de="gauche" className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 py-7">
              <span className="rounded-[10px] bg-[#111827] px-3 py-1 font-[family-name:var(--titres)] text-[clamp(2rem,4.5vw,3.6rem)] font-semibold leading-tight tracking-[-0.04em] text-[#F5D90A]">Le diagnostiqueur</span>
              <span className="text-[18px] font-semibold">n&apos;en a aucun. C&apos;est la loi, pour tous.</span>
            </Apparition>
          </ul>
        </div>
      </section>

      {/* ---------- Le rapport, en une page ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-8 md:py-36">
        <div className="mb-12 space-y-6">
          <Apparition><Etiquette>Le rapport</Etiquette></Apparition>
          <TitreRevele
            texte="Ton rapport, en *une seule page.*"
            className="max-w-4xl font-semibold text-[clamp(2.6rem,6vw,5.4rem)] leading-[0.95] tracking-[-0.05em]"
            classeAccent="text-[var(--accent-texte)]"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-6">
          <Apparition de="zoom" className="md:col-span-4 md:row-span-2">
            <CarteLueur className="h-full rounded-[1.5rem]">
              <Link href={`${DOSSIER}/une-page`} className="group flex h-full flex-col justify-between gap-6 rounded-[1.5rem] border border-[var(--trait)] bg-[var(--carte)] p-6 sm:p-8">
                <span className="flex items-start justify-between gap-4">
                  <span>
                    <span className="block text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--doux)]">Ton rapport · exemple</span>
                    <span className="mt-2 block font-[family-name:var(--titres)] text-[clamp(1.8rem,3.5vw,2.8rem)] font-semibold leading-tight tracking-[-0.04em]">Ta maison, en une page</span>
                    <span className="mt-1 block text-[15px] text-[var(--doux)]">{RAPPORT.bien}</span>
                  </span>
                  <span className="grid h-16 w-16 shrink-0 place-items-center rounded-[12px] bg-[#F4E70F] font-[family-name:var(--titres)] text-[36px] font-bold text-[#111111]">{RAPPORT.lettre}</span>
                </span>
                <span className="grid gap-3 sm:grid-cols-2">
                  <span className="rounded-[12px] border border-[var(--trait)] p-4">
                    <span className="block text-[12px] font-medium uppercase tracking-[0.18em] text-[#5CCB7F]">Ce qui va</span>
                    {RAPPORT.va.map((l) => <span key={l.id} className="mt-2 block text-[17px]">{l.titre}</span>)}
                  </span>
                  <span className="rounded-[12px] border border-[var(--trait)] p-4">
                    <span className="block text-[12px] font-medium uppercase tracking-[0.18em] text-[#FF8A5C]">Ce qui cloche</span>
                    {RAPPORT.cloche.map((l) => <span key={l.id} className="mt-2 block text-[17px]">{l.titre}</span>)}
                  </span>
                </span>
                <span className="flex items-center justify-between text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--accent-texte)]">
                  Ouvrir la page
                  <span aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-[8px] bg-[var(--accent)] text-[var(--sur-accent)] transition-transform group-hover:-rotate-45">→</span>
                </span>
              </Link>
            </CarteLueur>
          </Apparition>
          {[
            ["En clair, ou mot pour mot", "Chaque ligne se lit traduite, ou telle que le rapport l'écrit. Tu choisis."],
            ["Le rapport fait foi", "Des dizaines de pages, jointes, page par page. La page traduit, elle ne remplace rien."],
          ].map(([titre, texte], i) => (
            <Apparition key={titre} delai={120 + i * 120} className="md:col-span-2">
              <div className="h-full space-y-3 rounded-[1.5rem] border border-[var(--trait)] p-6">
                <p aria-hidden="true" className="font-[family-name:var(--titres)] text-[13px] font-semibold tabular-nums text-[var(--accent-texte)]">0{i + 1}</p>
                <h3 className="text-[22px] font-semibold tracking-[-0.03em]">{titre}</h3>
                <p className="leading-relaxed text-[var(--doux)]">{texte}</p>
              </div>
            </Apparition>
          ))}
          <Apparition delai={200} className="md:col-span-3">
            <div className="relative h-72 overflow-hidden rounded-[1.5rem] bg-[var(--sombre)] md:h-full md:min-h-72">
              <Image src={photos.priseAncienne.src} alt={photos.priseAncienne.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover opacity-80" />
              <p className="absolute bottom-3 left-3 rounded-[6px] bg-[var(--sombre)] px-2.5 py-1.5 text-[12px] font-medium uppercase tracking-[0.14em]">Vu · écrit tel quel</p>
            </div>
          </Apparition>
          <Apparition delai={300} className="md:col-span-3">
            <div className="flex h-full flex-col justify-between gap-6 rounded-[1.5rem] bg-[var(--accent)] p-6 text-[var(--sur-accent)] sm:p-8">
              <p className="font-[family-name:var(--titres)] text-[clamp(1.8rem,3.5vw,2.6rem)] font-semibold leading-[1] tracking-[-0.04em]">Aucune entreprise de travaux recommandée. Ni ici, ni dans le rapport.</p>
              <CommeTous />
            </div>
          </Apparition>
        </div>
      </section>

      {/* ---------- Ce qu'on regarde ---------- */}
      <section className="px-3 sm:px-5">
        <div className="kit-grain relative overflow-hidden rounded-[2rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto max-w-6xl space-y-10 px-4 py-24 sm:px-10 md:py-32">
            <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
              <div className="space-y-6">
                <Apparition><Etiquette>Ce qu&apos;on regarde · touche un point</Etiquette></Apparition>
                <TitreRevele
                  texte="Six endroits. *Une seule pièce.*"
                  className="font-semibold text-[clamp(2.6rem,6vw,5.4rem)] leading-[0.95] tracking-[-0.05em]"
                  classeAccent="text-[var(--accent-texte)]"
                />
              </div>
              <Apparition as="p" delai={150} className="text-lg leading-relaxed text-[var(--sur-sombre)]/90">
                Plafonds, peintures, fenêtres, prises, chauffage, planchers : ce que chaque diagnostic
                examine, et à quelle condition il est à faire.
              </Apparition>
            </div>
            <Apparition de="zoom">
              <Regard />
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Le DPE, lettre par lettre ---------- */}
      <section id="lettres" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-24 sm:px-8 md:py-36">
        <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div className="space-y-6">
            <Apparition><Etiquette>Pourquoi DPE F&nbsp;?</Etiquette></Apparition>
            <TitreRevele
              texte="Chaque lettre du DPE *a sa page.*"
              className="font-semibold text-[clamp(2.6rem,6vw,5.4rem)] leading-[0.95] tracking-[-0.05em]"
              classeAccent="text-[var(--accent-texte)]"
            />
          </div>
          <Apparition delai={150} className="space-y-4">
            <p className="flex items-center gap-3 rounded-[12px] border border-[var(--trait)] bg-[var(--carte)] px-4 py-3 text-[15px]">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 shrink-0 text-[var(--doux)]"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" /><path d="m15.5 15.5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
              pourquoi dpe f
            </p>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              Mot pour mot ce que les gens tapent. Chaque lettre a sa page : ce qu&apos;elle change si tu
              vends, si tu loues, et dans l&apos;annonce.
            </p>
          </Apparition>
        </div>
        <ul className="space-y-2">
          {LETTRES.map((l, i) => (
            <Apparition as="li" key={l} delai={i * 70} de="gauche">
              <Link
                href={`${DOSSIER}/dpe/${l}`}
                className="group flex h-16 items-center justify-between rounded-r-[14px] px-5 font-[family-name:var(--titres)] text-[28px] font-bold transition-[width] duration-500 md:h-20 md:text-[36px]"
                style={{ background: COULEURS[l][0], color: COULEURS[l][1], width: `${40 + i * 10}%` }}
              >
                {l.toUpperCase()}
                <span className="text-[13px] font-semibold uppercase tracking-[0.12em] max-sm:sr-only">Ce que ça change <span aria-hidden="true">→</span></span>
              </Link>
            </Apparition>
          ))}
        </ul>
      </section>

      {/* ---------- Les prix ---------- */}
      <section id="prix" className="scroll-mt-20 bg-[#F3F2EC] text-[#111827]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-24 sm:px-8 md:py-32 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-8">
            <div className="space-y-6">
              <Apparition><Etiquette clair>Combien ça coûte</Etiquette></Apparition>
              <TitreRevele
                texte="Les prix, *avant de réserver.*"
                className="font-semibold text-[clamp(2.6rem,6vw,5.4rem)] leading-[0.95] tracking-[-0.05em]"
                classeAccent="kit-surligne"
              />
              <p className="max-w-xl text-lg leading-relaxed text-[#4B5563]">Toutes taxes comprises, par diagnostic. Un diagnostic qui ne concerne pas ton bien n&apos;est ni fait, ni facturé. Prix d&apos;exemple.</p>
            </div>
            <ul className="divide-y divide-[#D9D6CB] border-y border-[#111827]">
              {TARIFS.map((t) => (
                <li key={t.nom} className="flex items-baseline justify-between gap-4 py-4">
                  <span>
                    <span className="block font-[family-name:var(--titres)] text-[20px] font-semibold tracking-[-0.02em]">{t.nom}</span>
                    <span className="block text-[14px] text-[#4B5563]">{t.condition}</span>
                  </span>
                  <span className="shrink-0 font-[family-name:var(--titres)] text-[22px] font-semibold tabular-nums">{euros(t.prix)}</span>
                </li>
              ))}
              <li className="flex items-baseline justify-between gap-4 py-4">
                <span>
                  <span className="block font-[family-name:var(--titres)] text-[20px] font-semibold tracking-[-0.02em]">Audit énergétique</span>
                  <span className="block text-[14px] text-[#4B5563]">Pour vendre une maison classée E, F ou G</span>
                </span>
                <span className="shrink-0 text-[16px] font-semibold">sur devis</span>
              </li>
            </ul>
          </div>
          <div className="grid content-start gap-4 lg:pt-28">
            <Apparition de="zoom" className="rounded-[1.5rem] bg-[#111827] p-8 text-[#F3F4F6]">
              <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-[#B3BAC6]">Maison · permis de 1985 · vente</p>
              <p className="mt-4 font-[family-name:var(--titres)] text-[clamp(4.5rem,10vw,7.5rem)] font-semibold leading-none tracking-[-0.06em] text-[#F5D90A] tabular-nums">{euros(pack)}</p>
              <p className="mt-3 text-[16px]">DPE, amiante et électricité, TTC. Prix d&apos;exemple.</p>
            </Apparition>
            <Apparition delai={150} className="rounded-[1.5rem] border border-[#111827] p-6 text-[15px] leading-relaxed">
              Conditions : Service-Public, fiches F10798 (vente, vérifiée le 07/03/2025) et F33463
              (location, vérifiée le 20/02/2026). Ce qui dépend de ton bien — le gaz, la zone — se
              vérifie à la visite.
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- La méthode, et qui vient ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-8 md:py-36">
        <div className="mb-12 space-y-6">
          <Apparition><Etiquette>Du questionnaire au rapport</Etiquette></Apparition>
          <TitreRevele
            texte="Quatre temps. *Rien de caché.*"
            className="font-semibold text-[clamp(2.6rem,6vw,5.4rem)] leading-[0.95] tracking-[-0.05em]"
            classeAccent="text-[var(--accent-texte)]"
          />
        </div>
        <ol className="grid gap-px overflow-hidden rounded-[1.5rem] border border-[var(--trait)] bg-[var(--trait)] sm:grid-cols-2 lg:grid-cols-4">
          {METHODE.map((m, i) => (
            <Apparition as="li" key={m.titre} delai={i * 110} className="space-y-3 bg-[var(--fond)] p-7">
              <p className="flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--accent-texte)]"><Barres /> Étape 0{i + 1}</p>
              <h3 className="font-[family-name:var(--titres)] text-[24px] font-semibold tracking-[-0.03em]">{m.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{m.texte}</p>
            </Apparition>
          ))}
        </ol>
        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1fr]">
          <Apparition delai={100} className="rounded-[1.5rem] border border-[var(--trait)] bg-[var(--carte)] p-7">
            <p className="mb-4 font-[family-name:var(--titres)] text-[26px] font-semibold tracking-[-0.03em]">Qui vient chez toi</p>
            <Certification />
          </Apparition>
          <Apparition delai={200} className="relative min-h-[280px] overflow-hidden rounded-[1.5rem]">
            <Image src={photos.priseOuverte.src} alt={photos.priseOuverte.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            <p className="absolute bottom-3 left-3 rounded-[6px] bg-[var(--sombre)] px-2.5 py-1.5 text-[12px] font-medium uppercase tracking-[0.14em]">
              <span className="text-[var(--accent-texte)]">Électricité</span> · installation de plus de 15 ans
            </p>
          </Apparition>
        </div>
      </section>

      {/* ---------- L'affiche ---------- */}
      <section className="bg-[var(--accent)] text-[var(--sur-accent)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-24 sm:px-8 md:py-32 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
          <div className="space-y-6">
            <p className="flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.22em]"><span aria-hidden="true" className="h-px w-7 bg-current" />Notre affiche</p>
            <TitreRevele
              texte="Aucun intérêt à ce que ta maison soit *belle.*"
              className="font-semibold text-[clamp(2.8rem,7vw,6.4rem)] leading-[0.92] tracking-[-0.055em]"
              classeAccent="underline decoration-[0.08em] underline-offset-[0.12em]"
            />
          </div>
          <Apparition delai={200} className="space-y-4 text-[16px] leading-relaxed">
            <p>Pas de mots pour adoucir, pas de mots pour inquiéter. Ce qu&apos;on voit, on l&apos;écrit : ni plus beau, ni plus grave.</p>
            <p className="font-semibold">Tiers Regard · diagnostic immobilier</p>
          </Apparition>
        </div>
      </section>

      {/* ---------- Questions ---------- */}
      <section id="faq" className="mx-auto grid max-w-7xl scroll-mt-24 gap-12 px-4 py-24 sm:px-8 md:py-36 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="space-y-6">
          <Apparition><Etiquette>Questions</Etiquette></Apparition>
          <TitreRevele
            texte="Ce qu'on nous *demande.*"
            className="font-semibold text-[clamp(2.6rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.05em]"
            classeAccent="text-[var(--accent-texte)]"
          />
        </div>
        <Apparition delai={150}>
          <Accordeon questions={FAQ.map((f) => ({ question: f.q, reponse: f.r }))} />
        </Apparition>
      </section>

      <AppelFinal />
    </main>
  );
}
