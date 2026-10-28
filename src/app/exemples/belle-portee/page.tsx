import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Accordeon from "../_kit/Accordeon";
import Apparition from "../_kit/Apparition";
import CarteLueur from "../_kit/CarteLueur";
import Defilant from "../_kit/Defilant";
import PhotoCinema from "../_kit/PhotoCinema";
import RecitColle from "../_kit/RecitColle";
import TitreRevele from "../_kit/TitreRevele";
import { Affiche, AppelFinal, Bouton, Cote, MurDeLaSemaine, PLAN, Surtitre, Verifications } from "./_composants/Blocs";
import { Bornes, Situations } from "./_composants/Outils";
import { DOSSIER, ETAPES, LIVRABLES, MISSIONS, QUESTIONS, bureau, photos } from "./_composants/donnees";

// L'accueil de Belle Portée. « Remplir l'agenda » : « Sur l'accueil, une seule question :
// qu'est-ce qui t'arrive ? Tu vends ? Ton voisin conteste la limite ? Tu touches, et tout
// s'explique. » « Créer une marque » : pas des calculs, le mur qui disparaît ; ton mur en
// photo ; jamais de oui à distance. Tout est information sur l'activité, avec modération.
export const metadata: Metadata = {
  title: "Belle Portée — bureau d'études et géomètre-expert, site de démonstration",
  description:
    "Le site d'un cabinet imaginaire, bureau d'études structure et géomètre-expert : une seule question à l'accueil, ton mur en photo sans oui à distance, le prix au nombre de bornes, le bornage expliqué.",
  ...adressesDeLaPage("/exemples/belle-portee"),
};

const PHOTOS_ETAPES = [photos.prairie, photos.parcelles, photos.champs, photos.cloture];

export default function BellePortee() {
  return (
    <main>
      {/* ---------- Premier écran : une seule question ---------- */}
      <section className={`relative border-b-2 border-[var(--encre)] ${PLAN}`}>
        <div className="mx-auto grid min-h-[100svh] max-w-7xl gap-8 px-4 pb-10 pt-24 sm:px-8 md:pt-28 lg:grid-cols-[1.35fr_0.65fr] lg:gap-12">
          <div className="flex flex-col justify-center gap-5 lg:gap-7">
            <Apparition><Surtitre>{bureau.titre}</Surtitre></Apparition>
            <TitreRevele
              as="h1"
              auChargement
              texte={"Qu'est-ce qui *t'arrive ?*"}
              className="font-black uppercase text-[clamp(2.9rem,6.6vw,6.4rem)] leading-[0.88] tracking-[-0.02em]"
              classeAccent="text-[var(--accent-texte)]"
            />
            <Apparition as="p" delai={300} className="max-w-xl text-[17px] leading-relaxed sm:text-lg">
              Un mur à ouvrir, une limite à fixer, un terrain à vendre : touche ta situation, tout
              s&apos;explique dessous.
            </Apparition>
            <Apparition delai={450}>
              <Situations />
            </Apparition>
          </div>
          <Apparition de="rideau" delai={250} className="relative min-h-[420px] border-2 border-[var(--encre)] bg-[var(--sombre)] lg:min-h-0">
            <PhotoCinema src={photos.cuisine.src} alt={photos.cuisine.alt} priority sizes="(min-width: 1024px) 45vw, 100vw" origine="55% 40%" />
            <div className="absolute inset-x-0 bottom-0 bg-[var(--sombre)] p-5 text-[var(--sur-sombre)]">
              <Cote texte="3,20 M" clair />
              <p className="mt-3 font-[family-name:var(--titres)] text-[clamp(2.4rem,4.5vw,4rem)] font-black uppercase leading-none">Ouvrez grand.</p>
              <p className="mt-2 text-sm text-[var(--sur-sombre)]/90">La portée, c&apos;est la longueur qu&apos;une poutre franchit.</p>
            </div>
          </Apparition>
        </div>
      </section>

      {/* ---------- Ce qu'on fait, en continu ---------- */}
      <div className="border-b-2 border-[var(--encre)] bg-[var(--encre)] py-4 text-[#F2B134]">
        <Defilant
          duree={44}
          separateur="■"
          elements={["Mur porteur", "Bornage", "Note de calcul", "Division", "Visite", "Plan du terrain", "Procès-verbal", "Implantation"]}
          classeElement="font-[family-name:var(--titres)] text-2xl font-black uppercase md:text-3xl whitespace-nowrap"
        />
      </div>

      {/* ---------- Ce qu'on vend vraiment ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-8 md:py-32">
        <div className="mb-12 space-y-6">
          <Apparition><Surtitre>Ce qu&apos;on vend vraiment</Surtitre></Apparition>
          <TitreRevele
            texte="Personne ne rêve *d'une note de calcul.*"
            className="max-w-5xl font-black uppercase text-[clamp(2.4rem,6vw,5.4rem)] leading-[0.92] tracking-[-0.01em]"
            classeAccent="text-[var(--accent-texte)]"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { barre: "Des calculs.", vrai: "Le mur qui disparaît.", texte: "La cuisine ouverte sur le salon, la lumière qui traverse. La note de calcul, c'est ce qui permet que le plafond reste où il est.", photo: photos.cuisine, lien: `${DOSSIER}/mon-mur`, libelle: "Mon mur en photo" },
            { barre: "Un bornage.", vrai: "La paix avec le voisin.", texte: "Derrière beaucoup de bornages, il y a une haie dont plus personne ne sait à qui elle est. Une limite mesurée, posée et signée par les deux, et on passe à autre chose.", photo: photos.cloture, lien: `${DOSSIER}/bornage`, libelle: "Le bornage" },
          ].map((c, i) => (
            <Apparition key={c.vrai} de={i ? "droite" : "gauche"}>
              <CarteLueur className="h-full">
                <Link href={c.lien} className="group relative flex h-[520px] flex-col justify-end overflow-hidden border-2 border-[var(--encre)] bg-[var(--sombre)] p-6 text-[var(--sur-sombre)] sm:p-8">
                  <Image src={c.photo.src} alt={c.photo.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover opacity-50 transition-transform duration-[1.4s] group-hover:scale-105" />
                  <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(30,42,56,0.1)_20%,rgba(30,42,56,0.96)_75%)]" />
                  <span className="relative block space-y-4">
                    <span className="block font-[family-name:var(--titres)] text-[clamp(2rem,4vw,3.4rem)] font-black uppercase leading-[0.92]">
                      <span className="block text-[var(--sur-sombre)]/85"><span className="kit-barre">{c.barre}</span></span>
                      <span className="block text-[#F2B134]">{c.vrai}</span>
                    </span>
                    <span className="block max-w-md text-[16px] leading-relaxed text-[var(--sur-sombre)]/90">{c.texte}</span>
                    <span className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.12em]">{c.libelle} <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span></span>
                  </span>
                </Link>
              </CarteLueur>
            </Apparition>
          ))}
        </div>
      </section>

      {/* ---------- Ton mur, en photo ---------- */}
      <section className="px-3 sm:px-5">
        <div className="relative overflow-hidden rounded-[1.5rem] border-2 border-[var(--encre)] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-10 md:py-28 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="space-y-6">
              <Apparition><Surtitre clair>Sur le site</Surtitre></Apparition>
              <TitreRevele
                texte="Ton mur, *en photo.*"
                className="font-black uppercase text-[clamp(2.6rem,6vw,5.4rem)] leading-[0.9]"
                classeAccent="text-[#F2B134]"
              />
              <Apparition as="p" delai={150} className="max-w-lg text-lg leading-relaxed text-[var(--sur-sombre)]/90">
                Tu prends ton mur en photo. Tu dis ce qu&apos;il y a au-dessus, et la largeur que tu veux
                ouvrir. On te répond ce qu&apos;on vérifiera — jamais « oui, ça passe ».
              </Apparition>
              <Apparition delai={250} className="flex flex-wrap gap-3">
                <Bouton href={`${DOSSIER}/mon-mur`}>Essayer avec mon mur</Bouton>
                <Bouton href={`${DOSSIER}/visite`} variante="contour">La visite</Bouton>
              </Apparition>
            </div>
            <Apparition de="zoom" delai={150} className="space-y-3 border-2 border-[#F3EEE4] bg-[#26354A] p-5">
              <p className="flex items-center gap-3 border-2 border-white/25 px-4 py-3 text-[15px]">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 shrink-0"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" /><path d="m15.5 15.5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                bureau d&apos;étude mur porteur
              </p>
              <ul>
                {["prix bureau d étude mur porteur", "bureau d étude ouverture mur porteur", "ouverture mur porteur sans bureau d étude"].map((r, i) => (
                  <li key={r} className={`px-4 py-2.5 ${i === 2 ? "bg-[var(--accent)] font-bold text-[var(--sur-accent)]" : ""}`}>{r}</li>
                ))}
              </ul>
              <p className="px-1 text-sm text-[var(--sur-sombre)]/90">Ce que tapent les particuliers (suggestions relevées le 15 octobre 2026). La troisième, on la comprend : on y répond dans les questions.</p>
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Avant de dire oui ---------- */}
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <Apparition><Surtitre>Avant de dire oui</Surtitre></Apparition>
          <TitreRevele
            texte="On vient *voir ton mur.*"
            className="font-black uppercase text-[clamp(2.4rem,5.5vw,4.8rem)] leading-[0.92]"
            classeAccent="text-[var(--accent-texte)]"
          />
          <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed">
            Une photo ne montre ni le sens des planchers ni l&apos;état des appuis. Alors on vient, et on
            regarde trois choses.
          </Apparition>
          <Apparition delai={250}><Bouton href={`${DOSSIER}/visite`} variante="encre">Choisir ma date de visite</Bouton></Apparition>
        </div>
        <Verifications />
      </section>

      {/* ---------- Le prix au nombre de bornes ---------- */}
      <section id="prix" className="scroll-mt-20 border-y-2 border-[var(--encre)] bg-[var(--accent)] text-[var(--sur-accent)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-6">
            <p className="flex items-center gap-2.5 text-[12px] font-bold uppercase tracking-[0.2em]"><span aria-hidden="true" className="h-2.5 w-2.5 bg-[var(--encre)]" />Le prix d&apos;un bornage</p>
            <TitreRevele
              texte={"Prix géomètre pour *4 bornes\u00a0?*"}
              className="font-black uppercase text-[clamp(2.4rem,5.5vw,4.8rem)] leading-[0.92]"
              classeAccent="underline decoration-[0.07em] underline-offset-[0.12em]"
            />
            <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed">
              C&apos;est ce que les gens tapent. Alors on répond au nombre de bornes : tu choisis, tu vois
              la fourchette.
            </Apparition>
            <Apparition delai={250}><Bouton href={`${DOSSIER}/prix`} variante="encre">Tous les prix</Bouton></Apparition>
          </div>
          <Apparition de="zoom" delai={100}>
            <Bornes />
          </Apparition>
        </div>
      </section>

      {/* ---------- Le bornage, étape par étape ---------- */}
      <section className={`border-b-2 border-[var(--encre)] py-24 md:py-32 ${PLAN}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="mb-10 grid gap-6 md:mb-4 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div className="space-y-6">
              <Apparition><Surtitre>Une page que personne ne fait</Surtitre></Apparition>
              <TitreRevele
                texte="Un bornage, *comment ça se passe ?*"
                className="font-black uppercase text-[clamp(2.4rem,5.5vw,4.8rem)] leading-[0.92]"
                classeAccent="text-[var(--accent-texte)]"
              />
            </div>
            <Apparition delai={150}><Bouton href={`${DOSSIER}/bornage`} variante="encre">Les 4 étapes en détail</Bouton></Apparition>
          </div>
          <RecitColle
            etapes={ETAPES.map((e, i) => ({
              surtitre: `Étape ${i + 1} sur 4`,
              titre: e.titre,
              texte: <p>{e.court}</p>,
              visuel: <Image src={PHOTOS_ETAPES[i].src} alt={PHOTOS_ETAPES[i].alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />,
            }))}
          />
        </div>
      </section>

      {/* ---------- Ce qu'on fait, dit simplement ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-8 md:py-32">
        <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div className="space-y-6">
            <Apparition><Surtitre>Le cabinet</Surtitre></Apparition>
            <TitreRevele
              texte="Six missions, *en mots simples.*"
              className="font-black uppercase text-[clamp(2.4rem,5.5vw,4.8rem)] leading-[0.92]"
              classeAccent="text-[var(--accent-texte)]"
            />
          </div>
          <Apparition as="p" delai={150} className="text-lg leading-relaxed text-[var(--doux)]">
            Pas de « topographie », pas de « servitudes » sans explication, pas de sigles en trois
            lettres. Le reste, on en parle au téléphone.
          </Apparition>
        </div>
        <ul className="grid border-l-2 border-t-2 border-[var(--encre)] sm:grid-cols-2 lg:grid-cols-3">
          {MISSIONS.map((m, i) => (
            <Apparition as="li" key={m.titre} delai={i * 80} className="border-b-2 border-r-2 border-[var(--encre)]">
              <CarteLueur className="h-full">
                <div className="flex h-full flex-col justify-between gap-8 bg-[var(--carte)] p-6">
                  <p className="flex items-center justify-between text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--doux)]">
                    <span>{m.metier}</span>
                    <span className="font-[family-name:var(--titres)] text-[var(--accent-texte)]">0{i + 1}</span>
                  </p>
                  <div className="space-y-2">
                    <h3 className="text-[26px] font-black uppercase leading-none">{m.titre}</h3>
                    <p className="leading-relaxed text-[var(--doux)]">{m.texte}</p>
                  </div>
                </div>
              </CarteLueur>
            </Apparition>
          ))}
        </ul>
      </section>

      {/* ---------- Trois prix, écrits ---------- */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-8 md:pb-32">
        <div className="grid border-2 border-[var(--encre)] md:grid-cols-[0.8fr_1fr_1fr_1fr]">
          <div className="flex flex-col justify-between gap-6 bg-[var(--encre)] p-6 text-[var(--sur-sombre)]">
            <p className="font-[family-name:var(--titres)] text-[32px] font-black uppercase leading-[0.95]">Le mur : trois prix, <span className="text-[#F2B134]">écrits.</span></p>
            <p className="text-sm text-[var(--sur-sombre)]/90">TTC d&apos;exemple pour un particulier. Le devis écrit précède toute intervention.</p>
          </div>
          {LIVRABLES.map((l, i) => (
            <Apparition key={l.titre} delai={i * 120} className="flex flex-col justify-between gap-6 border-t-2 border-[var(--encre)] bg-[var(--carte)] p-6 md:border-l-2 md:border-t-0">
              <div className="space-y-2">
                <h3 className="text-xl font-black uppercase">{l.titre}</h3>
                <p className="leading-relaxed text-[var(--doux)]">{l.texte}</p>
              </div>
              <p className="font-[family-name:var(--titres)] text-2xl font-black">{l.prix} <span className="text-sm font-normal text-[var(--doux)]">· exemple</span></p>
            </Apparition>
          ))}
        </div>
      </section>

      {/* ---------- Le mur de la semaine, et l'affiche ---------- */}
      <section className="border-y-2 border-[var(--encre)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 py-24 sm:px-8 md:py-32 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <Apparition><Surtitre>Chaque vendredi</Surtitre></Apparition>
            <TitreRevele
              texte="Le mur *de la semaine.*"
              className="font-black uppercase text-[clamp(2.4rem,5.5vw,4.8rem)] leading-[0.92]"
              classeAccent="text-[var(--accent-texte)]"
            />
            <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed">
              Une courte vidéo : un mur, avant, après, et la poutre qui le remplace. Tournée chez des
              clients, avec leur accord écrit.
            </Apparition>
            <Apparition delai={250}><MurDeLaSemaine /></Apparition>
          </div>
          <div className="space-y-8">
            <Apparition de="zoom"><Affiche /></Apparition>
            <Apparition delai={200} className="mx-auto max-w-sm space-y-2 text-center">
              <p className="font-[family-name:var(--titres)] text-xl font-black uppercase">Avant la masse, le calcul.</p>
              <p className="leading-relaxed text-[var(--doux)]">Notre affiche, au rayon des masses des magasins de bricolage, posée avec leur accord. Le meilleur moment pour y penser.</p>
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Celui qui peut fixer la limite ---------- */}
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-8 md:py-32 lg:grid-cols-2 lg:items-center">
        <Apparition de="rideau" className="relative aspect-[4/3] border-2 border-[var(--encre)] bg-[var(--sombre)]">
          <Image src={photos.parcelles.src} alt={photos.parcelles.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </Apparition>
        <div className="space-y-6">
          <Apparition><Surtitre>Le géomètre-expert</Surtitre></Apparition>
          <TitreRevele
            texte="Celui qui peut *fixer la limite.*"
            className="font-black uppercase text-[clamp(2.4rem,5.5vw,4.8rem)] leading-[0.92]"
            classeAccent="text-[var(--accent-texte)]"
          />
          <Apparition delai={150} className="space-y-4 text-lg leading-relaxed">
            <p>Quand un professionnel fixe la limite entre deux terrains, ce ne peut être qu&apos;un géomètre-expert inscrit à l&apos;Ordre (loi n° 46-942 du 7 mai 1946, art. 1er et 2).</p>
            <p className="text-[var(--doux)]">Tout ce site est de l&apos;information sur notre activité : c&apos;est ce que permet la déontologie des géomètres-experts, avec modération (décret n° 96-478, art. 53). Il a été communiqué au conseil régional de l&apos;Ordre.</p>
          </Apparition>
        </div>
      </section>

      {/* ---------- Questions ---------- */}
      <section className="border-t-2 border-[var(--encre)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="space-y-6">
            <Apparition><Surtitre>Les questions</Surtitre></Apparition>
            <TitreRevele
              texte="Ce qu'on nous *demande.*"
              className="font-black uppercase text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.92]"
              classeAccent="text-[var(--accent-texte)]"
            />
          </div>
          <Apparition delai={150}>
            <Accordeon questions={QUESTIONS.map((q) => ({ question: q.question, reponse: q.reponse }))} />
          </Apparition>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
