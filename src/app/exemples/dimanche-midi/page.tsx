import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Accordeon from "../_kit/Accordeon";
import Apparition from "../_kit/Apparition";
import CarteLueur from "../_kit/CarteLueur";
import Defilant from "../_kit/Defilant";
import FondVivant from "../_kit/FondVivant";
import PhotoCinema from "../_kit/PhotoCinema";
import RecitColle from "../_kit/RecitColle";
import TitreRevele from "../_kit/TitreRevele";
import { ACCENT, ACCENT_CLAIR, Affiche, Bouton, Embleme, Surtitre, Telephone, TITRE } from "./_composants/Blocs";
import Carnet from "./_composants/Carnet";
import RendezVous from "./_composants/RendezVous";
import Ticket from "./_composants/Ticket";
import { DOSSIER, JAMAIS, SANS_FRAIS, dimanches, moments, photos, programme, questions, rubriques } from "./_composants/donnees";

// L'accueil de Dimanche Midi, qui réunit les deux vidéos des CGP. De « Créer une marque » :
// on en parle à table, ce que les enfants tapent un jour, le carnet de famille, l'affiche,
// un dimanche par mois. De « Remplir l'agenda » : le ticket « Ce que je gagne » (honoraires
// et rétrocessions, ligne par ligne), les moments de vie plutôt que des produits, et le
// rendez-vous au cabinet ou en visio — jamais chez soi. Premier écran partagé en deux : le
// titre sur la crème, la table dressée qui respire.
export const metadata: Metadata = {
  title: "Dimanche Midi — conseil en patrimoine, site de démonstration",
  description:
    "Site de démonstration d'un cabinet de gestion de patrimoine imaginaire : le carnet de famille qui reste chez toi, ce que le conseiller gagne écrit ligne par ligne, et un dimanche par mois où l'on parle d'argent à table.",
  ...adressesDeLaPage("/exemples/dimanche-midi"),
};

const PHOTOS_DIMANCHE = [photos.salle, photos.carnet, photos.lampe, photos.banc];

export default function DimancheMidi() {
  return (
    <main>
      {/* ---------- Premier écran, partagé en deux ---------- */}
      <section className="grid grid-cols-1 min-h-[100svh] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative flex flex-col justify-center gap-6 px-5 pb-14 pt-28 sm:px-10 lg:pl-[max(2.5rem,calc((100vw-80rem)/2+2rem))] lg:pr-14">
          <Apparition de="zoom"><Embleme taille={56} /></Apparition>
          <Apparition delai={100}><Surtitre>Conseil en patrimoine · Lyon</Surtitre></Apparition>
          <TitreRevele
            as="h1"
            auChargement
            texte={"On en parle *à\u00a0table.*"}
            className={`text-[clamp(4.4rem,9vw,8.6rem)] ${TITRE} leading-[0.86]`}
            classeAccent={ACCENT}
          />
          <Apparition as="p" delai={500} className="max-w-lg text-[18px] leading-relaxed text-[var(--doux)]">
            Je ne vends pas un placement. Je vends le dimanche midi où, enfin, on parle d&apos;argent
            en famille : ce que vous avez, où c&apos;est, qui appeler, ce qui est prévu. Et ce que je
            gagne, moi, écrit ligne par ligne.
          </Apparition>
          <Apparition delai={700} className="flex flex-wrap gap-3">
            <Bouton href={`${DOSSIER}/carnet`}>Ouvrir le carnet de famille</Bouton>
            <Bouton href={`${DOSSIER}#ticket`} variante="contour">Ce que je gagne</Bouton>
          </Apparition>
        </div>
        <div className="relative min-h-[70svh] overflow-hidden bg-[var(--sombre)] lg:min-h-0 lg:rounded-bl-[4rem]">
          <PhotoCinema src={photos.table.src} alt={photos.table.alt} priority sizes="(min-width: 1024px) 48vw, 100vw" origine="45% 40%" />
          <Apparition de="droite" delai={900} className="absolute bottom-6 left-5 right-5 sm:left-auto sm:right-8 sm:w-[300px] lg:bottom-24">
            <Link href={`${DOSSIER}/dimanche`} className="block rounded-[1.5rem] bg-[#FBF5EA] p-5 text-[#22382C] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] transition-transform hover:-translate-y-1">
              <span className="flex items-center justify-between text-[12px] font-semibold uppercase tracking-[0.18em] text-[#A3442E]">
                Un dimanche par mois
                <span aria-hidden="true">→</span>
              </span>
              <span className="mt-2 block font-[family-name:var(--titres)] text-[32px] leading-[1.02]">Le cabinet ouvre <em>à midi.</em></span>
              <span className="mt-2 block text-[14px] text-[#55604F]">Prochain : {dimanches[0].libelle.toLowerCase()} · exemple</span>
            </Link>
          </Apparition>
        </div>
      </section>

      {/* ---------- Ce qui arrive, qui défile ---------- */}
      <div className="bg-[#B5523B] py-5 text-[#FBF5EA]">
        <Defilant
          duree={44}
          separateur={<Embleme taille={26} clair />}
          elements={[...moments.map((m) => m.libelle), ...rubriques.map((r) => r.titre)]}
          classeElement="whitespace-nowrap font-[family-name:var(--titres)] text-[28px] italic md:text-[36px]"
        />
      </div>

      {/* ---------- Le jour où : une bande sombre ---------- */}
      <section className="px-3 pt-3 sm:px-5 sm:pt-5">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto grid grid-cols-1 max-w-6xl gap-12 px-6 py-20 sm:px-10 md:py-28 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-7">
              <Apparition><Surtitre clair>Le jour où</Surtitre></Apparition>
              <TitreRevele
                texte="En famille, l'argent, *on n'en parle pas.*"
                className={`text-[clamp(3rem,6.4vw,5.8rem)] ${TITRE}`}
                classeAccent={ACCENT_CLAIR}
              />
              <Apparition as="p" delai={150} className="text-[19px] leading-relaxed text-[#E9DDC2]">
                Et un jour, les enfants cherchent seuls. Ce qu&apos;ils tapent, c&apos;est ça :
              </Apparition>
              <Apparition delai={250} className="flex items-center gap-3 rounded-full bg-[#FBF5EA] px-5 py-4 text-[16px] text-[#22382C] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)]">
                <span aria-hidden="true" className="text-[20px]">⌕</span>
                <span>comment retrouver une assurance vie <span className="kit-surligne">d&apos;une personne décédée</span></span>
              </Apparition>
              <p className="text-[13px] text-[#E9DDC2]">Suggestion d&apos;un moteur de recherche, relevée le 15 octobre 2026.</p>
            </div>
            <Apparition de="rideau" className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <Image src={photos.salle.src} alt={photos.salle.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="kit-cinema-img object-cover" />
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Le carnet de famille, comme une application ---------- */}
      <section id="carnet" className="scroll-mt-24 mx-auto grid grid-cols-1 max-w-7xl gap-14 px-5 py-24 sm:px-8 md:py-36 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div className="space-y-7">
          <Apparition><Surtitre>Un seul outil</Surtitre></Apparition>
          <TitreRevele
            texte="Le carnet *de famille.*"
            className={`text-[clamp(3.2rem,7vw,6.4rem)] ${TITRE}`}
            classeAccent={ACCENT}
          />
          <Apparition as="p" delai={150} className="max-w-lg text-[19px] leading-relaxed text-[var(--doux)]">
            Où est quoi, qui appeler, ce qui est prévu. Tu le remplis chez toi, tu le télécharges, et
            tu le donnes à tes enfants. Il reste sur ton téléphone : le cabinet ne le voit pas.
          </Apparition>
          <ol className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {rubriques.map((r, i) => (
              <Apparition as="li" key={r.cle} delai={200 + i * 100} className="rounded-[1.5rem] border border-[var(--trait)] bg-[var(--carte)] p-5">
                <span className="block font-[family-name:var(--titres)] text-[15px] italic text-[var(--accent-texte)]">Page {i + 1}</span>
                <span className="mt-1 block font-[family-name:var(--titres)] text-[26px] leading-tight">{r.titre}</span>
              </Apparition>
            ))}
          </ol>
          <Apparition delai={500}><Bouton href={`${DOSSIER}/carnet`}>Remplir mon carnet</Bouton></Apparition>
        </div>
        <Apparition de="zoom" delai={150} className="relative">
          <div aria-hidden="true" className="absolute -inset-6 -z-10 rounded-[3rem] bg-[#F1E4C8]" />
          <Telephone className="rotate-[1.5deg]">
            <Carnet />
          </Telephone>
        </Apparition>
      </section>

      {/* ---------- Ce que je gagne : le ticket, sur le lac ---------- */}
      <section id="ticket" className="scroll-mt-24 kit-grain relative isolate overflow-hidden bg-[#22382C] text-[#FBF5EA]">
        <PhotoCinema src={photos.lac.src} alt="" origine="50% 60%" parallaxe className="opacity-45" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(34,56,44,0.95)_0%,rgba(34,56,44,0.8)_45%,rgba(34,56,44,0.35)_100%)]" />
        <div className="relative mx-auto grid grid-cols-1 max-w-7xl gap-14 px-5 py-24 sm:px-8 md:py-36 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-7">
            <Apparition><Surtitre clair>Ce que je gagne</Surtitre></Apparition>
            <TitreRevele
              texte="Pas ce que tu vas gagner. *Ce que je gagne.*"
              className={`text-[clamp(3rem,6.6vw,6rem)] ${TITRE}`}
              classeAccent={ACCENT_CLAIR}
            />
            <Apparition as="p" delai={150} className="max-w-xl text-[19px] leading-relaxed text-[#F1EADB]">
              Un ticket de caisse : mes honoraires, et ce que je touche des partenaires, ligne par
              ligne. Ces rétrocessions sont prises sur les frais que tu paies : je te les montre,
              parce que c&apos;est toi qui les paies. Mon conseil est donc « non indépendant ».
            </Apparition>
            <Apparition delai={250} className="flex flex-wrap gap-3">
              <Bouton href={`${DOSSIER}/ce-que-je-gagne`} variante="clair">Le calculer sur ton épargne</Bouton>
            </Apparition>
          </div>
          <Apparition de="zoom" delai={200}>
            <Ticket film="ticket" />
          </Apparition>
        </div>
      </section>

      {/* ---------- Des moments de vie, pas des produits ---------- */}
      <section className="mx-auto max-w-7xl space-y-14 px-5 py-24 sm:px-8 md:py-36">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div className="space-y-6">
            <Apparition><Surtitre>Ce qui t&apos;arrive</Surtitre></Apparition>
            <TitreRevele
              texte="Pas de produits. *Des moments de vie.*"
              className={`text-[clamp(3rem,6.6vw,6rem)] ${TITRE}`}
              classeAccent={ACCENT}
            />
          </div>
          <Apparition as="p" delai={150} className="text-[19px] leading-relaxed text-[var(--doux)]">
            D&apos;abord ta vie, ensuite l&apos;argent. Pour chaque moment, les questions à se poser,
            avant de parler du moindre placement.
          </Apparition>
        </div>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {moments.map((m, i) => (
            <Apparition as="li" key={m.cle} delai={i * 110} de="zoom">
              <CarteLueur className="h-full rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)]">
                <Link href={`${DOSSIER}/moments`} className="group flex h-full min-h-[320px] flex-col justify-between gap-8 p-7 sm:p-9">
                  <span className="flex items-start justify-between gap-4">
                    <span className="font-[family-name:var(--titres)] text-[clamp(2.4rem,4.4vw,3.6rem)] italic leading-[0.95]">{m.libelle}</span>
                    <span aria-hidden="true" className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-[var(--sur-accent)] transition-transform duration-500 group-hover:-rotate-45">→</span>
                  </span>
                  <span className="space-y-2">
                    <span className="block text-[12px] font-semibold uppercase tracking-[0.2em] text-[var(--accent-texte)]">Les questions d&apos;abord</span>
                    {m.questions.map((q) => (
                      <span key={q} className="block border-t border-[var(--trait)] pt-2 text-[16px] leading-snug text-[var(--doux)]">{q}</span>
                    ))}
                  </span>
                </Link>
              </CarteLueur>
            </Apparition>
          ))}
        </ul>
        <p className="text-[15px] text-[var(--doux)]">Aucun placement n&apos;est proposé avant d&apos;avoir répondu à ces questions.</p>
      </section>

      {/* ---------- Un dimanche par mois : le récit ---------- */}
      <section className="border-y border-[var(--trait)] bg-[#F3E7CF] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-10 grid grid-cols-1 gap-8 md:mb-4 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div className="space-y-6">
              <Apparition><Surtitre>Un dimanche par mois</Surtitre></Apparition>
              <TitreRevele
                texte="Le cabinet ouvre *à midi.*"
                className={`text-[clamp(3rem,6.6vw,6rem)] ${TITRE}`}
                classeAccent={ACCENT}
              />
            </div>
            <Apparition delai={150} className="space-y-4">
              <p className="text-[19px] leading-relaxed text-[var(--doux)]">
                Les parents viennent, avec leurs enfants. Au cabinet, jamais chez vous. Sur inscription,
                sans frais.
              </p>
              <ul className="divide-y divide-[#E0CFAE] border-y border-[#E0CFAE]">
                {dimanches.map((d) => (
                  <li key={d.cle} className="flex items-baseline justify-between gap-4 py-3">
                    <span className="font-[family-name:var(--titres)] text-[24px]">{d.libelle}</span>
                    <span className="text-[14px] text-[var(--doux)]">midi – 15 h</span>
                  </li>
                ))}
              </ul>
              <p className="text-[13px] text-[var(--doux)]">Dates d&apos;exemple : le deuxième dimanche du mois.</p>
            </Apparition>
          </div>
          <RecitColle
            etapes={programme.map((p, i) => ({
              surtitre: p.heure,
              titre: p.titre,
              texte: <p>{p.texte}</p>,
              visuel: <Image src={PHOTOS_DIMANCHE[i].src} alt={PHOTOS_DIMANCHE[i].alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />,
            }))}
          />
          <div className="mt-6 flex justify-center">
            <Bouton href={`${DOSSIER}/dimanche`}>Réserver notre place à table</Bouton>
          </div>
        </div>
      </section>

      {/* ---------- L'affiche ---------- */}
      <section className="mx-auto grid grid-cols-1 max-w-7xl gap-14 px-5 py-24 sm:px-8 md:py-36 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div className="space-y-7">
          <Apparition><Surtitre>Pour le lancement</Surtitre></Apparition>
          <TitreRevele
            texte="Une seule affiche, *une seule question.*"
            className={`text-[clamp(3rem,6.6vw,6rem)] ${TITRE}`}
            classeAccent={ACCENT}
          />
          <Apparition as="p" delai={150} className="max-w-lg text-[19px] leading-relaxed text-[var(--doux)]">
            Et en bas, lisibles, le statut écrit juste et le numéro ORIAS : jamais « agréé AMF ».
          </Apparition>
        </div>
        <Apparition de="zoom" className="relative">
          <div aria-hidden="true" className="absolute inset-x-6 -inset-y-6 -z-10 rounded-[3rem] bg-[var(--sombre)]" />
          <Affiche className="mx-auto max-w-md -rotate-2" />
        </Apparition>
      </section>

      {/* ---------- Ce que ça coûte, ce que je ne ferai jamais ---------- */}
      <section className="mx-auto max-w-7xl space-y-16 px-5 pb-24 sm:px-8 md:pb-36">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {SANS_FRAIS.map((s, i) => (
            <Apparition key={s.titre} delai={i * 100} className="flex min-h-[200px] flex-col justify-between rounded-[2rem] bg-[var(--sombre)] p-7 text-[var(--sur-sombre)]">
              <span className="font-[family-name:var(--titres)] text-[44px] italic leading-none text-[#E3C374]">Sans frais</span>
              <span>
                <span className="block font-[family-name:var(--titres)] text-[28px] leading-tight">{s.titre}</span>
                <span className="block text-[15px] text-[#E9DDC2]">{s.detail}</span>
              </span>
            </Apparition>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6">
            <Apparition><Surtitre>Jamais</Surtitre></Apparition>
            <TitreRevele
              texte="Quatre choses *que je ne ferai pas.*"
              className={`text-[clamp(2.8rem,5.6vw,5rem)] ${TITRE}`}
              classeAccent={ACCENT}
            />
          </div>
          <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {JAMAIS.map((j, i) => (
              <Apparition as="li" key={j.titre} delai={i * 140} className="grid grid-cols-1 gap-2 py-6 sm:grid-cols-[1fr_1fr] sm:items-baseline sm:gap-8">
                <span className="font-[family-name:var(--titres)] text-[clamp(1.8rem,3.2vw,2.6rem)] leading-tight"><span className="kit-barre">{j.titre}</span></span>
                <span className="text-[16px] leading-relaxed text-[var(--doux)]">{j.texte}</span>
              </Apparition>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Questions ---------- */}
      <section className="border-t border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid grid-cols-1 max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="space-y-6">
            <Apparition><Surtitre>Questions</Surtitre></Apparition>
            <TitreRevele
              texte="Avant de *passer à table.*"
              className={`text-[clamp(2.8rem,5.6vw,5rem)] ${TITRE}`}
              classeAccent={ACCENT}
            />
          </div>
          <Apparition delai={150}>
            <Accordeon questions={questions.map((q) => ({ question: q.q, reponse: q.r }))} />
          </Apparition>
        </div>
      </section>

      {/* ---------- Rendez-vous, sur le fond vivant ---------- */}
      <section id="rendez-vous" className="scroll-mt-24 px-3 pb-3 pt-3 sm:px-5 sm:pb-5 sm:pt-5">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <FondVivant couleurs={["#263D30", "#3E5F4C", "#A9573C"]} vitesse={0.8} />
          <div className="absolute inset-0 bg-[var(--sombre)]/45" />
          <div className="relative mx-auto grid grid-cols-1 max-w-6xl gap-12 px-5 py-20 sm:px-10 md:py-28 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div className="space-y-7">
              <Surtitre clair>Rendez-vous</Surtitre>
              <TitreRevele
                texte="C'est toi *qui viens.*"
                className={`text-[clamp(3.4rem,8vw,7.4rem)] ${TITRE}`}
                classeAccent={ACCENT_CLAIR}
              />
              <p className="max-w-md text-[19px] leading-relaxed text-[#F1EADB]">
                Le rendez-vous se prend en ligne. Seul, à deux ou en famille ; au cabinet ou en visio.
                Pas chez toi : ce serait du démarchage. Une heure, sans frais et sans engagement.
              </p>
            </div>
            <RendezVous />
          </div>
        </div>
      </section>
    </main>
  );
}
