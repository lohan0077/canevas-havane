import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Accordeon from "../_kit/Accordeon";
import Apparition from "../_kit/Apparition";
import CalculPalier from "../_kit/CalculPalier";
import CarteLueur from "../_kit/CarteLueur";
import Defilant from "../_kit/Defilant";
import RecitColle from "../_kit/RecitColle";
import TitreRevele from "../_kit/TitreRevele";
import Acheter from "./_composants/Acheter";
import { AppelFinal, Bouton, CHANFREIN, CHANFREIN_GRAND, Chapitre } from "./_composants/Blocs";
import Four from "./_composants/Four";
import Fournee from "./_composants/Fournee";
import Plaque from "./_composants/Plaque";
import Registre from "./_composants/Registre";
import Repas from "./_composants/Repas";
import Tour from "./_composants/Tour";
import { DOSSIER, ENVOI, boutonAchat, meubles, ouvertures, paliers, photos, pieceParSlug, prix, questions } from "./_composants/donnees";

export const metadata: Metadata = {
  title: "Après Nous — ébénisterie et céramique, site de démonstration",
  description:
    "Le site d'un atelier imaginaire, du bois et de la terre : sous chaque table, un numéro gravé ouvre son registre ; chaque bol a sa page et la vidéo de son tournage ; le four s'ouvre une fois par mois, en direct.",
  ...adressesDeLaPage("/exemples/apres-nous"),
};

const MATIERES = ["Chêne", "Noyer", "Frêne", "Grès moucheté", "Émail céladon", "Tenons et mortaises", "1 280 °C", "Trois couches d'huile", "Une seule de chaque"];

const RECIT = [
  { surtitre: "Le bois", titre: "On choisit l'arbre", texte: "Avant le dessin. Chêne, noyer ou frêne, scié en plateaux, séché à l'air au moins deux ans.", photo: photos.cernes },
  { surtitre: "Le bois", titre: "On l'assemble", texte: "Tenons, mortaises, queues d'aronde. Pas de vis là où le bois doit pouvoir bouger. Puis trois couches d'huile, poncées à la main.", photo: photos.assemblage },
  { surtitre: "La terre", titre: "On tourne, on filme", texte: "Centrer, ouvrir, monter, affiner. La pièce est filmée du début à la fin : vingt secondes vont sur sa page.", photo: photos.tournage },
  { surtitre: "La terre", titre: "On ouvre le four", texte: "1 280 °C, deux jours de refroidissement, puis l'ouverture, en direct. Le soir même, chaque pièce est en ligne.", photo: photos.etagere },
  { surtitre: "Les deux", titre: "On met la table", texte: "On livre la table, on la règle. Et si la famille le veut, on filme son premier repas — dans les bols de l'atelier.", photo: photos.tableRonde },
];

export default function ApresNous() {
  const bol = pieceParSlug("bol-112")!;
  return (
    <main>
      {/* ---------- Premier écran : un collage, le bois et la terre ---------- */}
      <section className="kit-grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_35%,rgba(200,149,90,0.22),transparent_60%)]" />
        <div className="relative mx-auto grid w-full max-w-7xl flex-1 items-center gap-12 px-5 pb-12 pt-32 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-8">
            <Apparition><Chapitre numero="I" clair>Ébénisterie · céramique</Chapitre></Apparition>
            <TitreRevele
              as="h1"
              auChargement
              texte="Après *Nous.*"
              className="font-[family-name:var(--titres)] text-[clamp(5rem,13vw,12rem)] leading-[0.86] tracking-[-0.04em]"
              classeAccent="italic text-[#E0B36A]"
            />
            <TitreRevele
              as="p"
              auChargement
              delai={300}
              texte="Des tables pour *ceux qui viendront après.* Et les bols qu'on pose dessus."
              className="max-w-xl font-[family-name:var(--titres)] text-[clamp(1.5rem,2.6vw,2.2rem)] leading-[1.18]"
              classeAccent="italic text-[#E0B36A]"
            />
            <Apparition delai={700} className="flex flex-wrap gap-3">
              <Bouton href={`${DOSSIER}/registre`}>Lire un registre</Bouton>
              <Bouton href={`${DOSSIER}/fournee`} variante="clair">La fournée</Bouton>
            </Apparition>
          </div>
          <div className="relative grid h-[460px] grid-cols-6 grid-rows-6 gap-3 sm:h-[560px]">
            <Apparition de="rideau" className={`relative col-span-4 row-span-6 overflow-hidden ${CHANFREIN_GRAND}`}>
              <Image src={photos.tableDuSoir.src} alt={photos.tableDuSoir.alt} fill priority sizes="(min-width: 1024px) 400px, 66vw" className="kit-cinema-img object-cover" />
              <span className="absolute bottom-3 left-3 bg-[var(--sombre)]/90 px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.16em]">Table n° 31</span>
            </Apparition>
            <Apparition de="rideau" delai={250} className={`relative col-span-2 row-span-3 overflow-hidden ${CHANFREIN}`}>
              <Image src={photos.tournage.src} alt={photos.tournage.alt} fill sizes="(min-width: 1024px) 200px, 33vw" className="object-cover" />
            </Apparition>
            <Apparition de="rideau" delai={450} className={`relative col-span-2 row-span-3 overflow-hidden ${CHANFREIN}`}>
              <Image src={photos.bol.src} alt={photos.bol.alt} fill sizes="(min-width: 1024px) 200px, 33vw" className="object-cover" />
              <span className="absolute bottom-2 left-2 bg-[var(--sombre)]/90 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]">Bol n° 112</span>
            </Apparition>
          </div>
        </div>
        <Apparition as="ul" delai={900} className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-3 px-5 pb-8 text-[15px] sm:grid-cols-3 sm:px-8">
          {[
            ["Un numéro sous chaque table", "et son registre"],
            ["Une page par pièce", "et son tournage"],
            [`Le four : ${ouvertures.prochaine.court}`, `${ouvertures.prochaine.heure}, en direct`],
          ].map(([fort, doux]) => (
            <li key={fort} className={`flex items-baseline justify-between gap-3 border border-white/15 bg-[var(--sombre)]/80 px-5 py-3 ${CHANFREIN}`}>
              <span className="font-[family-name:var(--titres)] text-[18px]">{fort}</span>
              <span className="text-[13px] text-[var(--sur-sombre)]/90">{doux}</span>
            </li>
          ))}
        </Apparition>
      </section>

      {/* ---------- Les matières ---------- */}
      <div className="bg-[var(--accent)] py-5 text-[var(--sur-accent)]">
        <Defilant duree={50} elements={MATIERES} separateur="◆" classeElement="font-[family-name:var(--titres)] text-2xl italic whitespace-nowrap md:text-3xl" />
      </div>

      {/* ---------- Le contre-pied, deux fois ---------- */}
      <section className="mx-auto grid max-w-7xl gap-16 px-5 py-24 sm:px-8 md:grid-cols-2 md:py-36">
        {[
          { non: "Pas une table.", oui: "Celle où tes petits-enfants *feront leurs devoirs.*", texte: "Beaucoup parlent de chêne massif et de savoir-faire. Nous, on parle de ce qui se passera dessus : les repas, les devoirs, les jeux qui finissent mal. Une image, pas une promesse de durée." },
          { non: "Pas un bol.", oui: "Les mains *qui l'ont fait.*", texte: "Un bol à quarante-huit euros ne se compare pas à un bol à six : on le voit naître, sur le tour, dans les vingt secondes de sa page. Prix d'exemple." },
        ].map((c, i) => (
          <div key={c.non} className="space-y-6">
            <Apparition delai={i * 150}>
              <p className="font-[family-name:var(--titres)] text-[clamp(2rem,4vw,3.2rem)] leading-none text-[var(--doux)]">
                <span className="kit-barre [background-image:linear-gradient(#7A5226,#7A5226)]">{c.non}</span>
              </p>
            </Apparition>
            <TitreRevele
              texte={c.oui}
              className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.98] tracking-[-0.02em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
            <Apparition as="p" delai={200} className="max-w-lg text-lg leading-relaxed text-[var(--doux)]">{c.texte}</Apparition>
          </div>
        ))}
      </section>

      {/* ---------- L'outil de « Créer une marque » : le registre ---------- */}
      <section id="registre" className="scroll-mt-20 px-3 sm:px-5">
        <div className="kit-grain relative overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 py-20 sm:px-10 md:py-28 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="min-w-0 space-y-6 lg:sticky lg:top-28">
              <Apparition><Chapitre numero="II" clair>Le registre</Chapitre></Apparition>
              <TitreRevele
                texte="Sous chaque table, *un numéro gravé.*"
                className="font-[family-name:var(--titres)] text-[clamp(2.8rem,5.5vw,5rem)] leading-[0.95] tracking-[-0.02em]"
                classeAccent="italic text-[#E0B36A]"
              />
              <Apparition as="p" delai={150} className="text-lg leading-relaxed text-[var(--sur-sombre)]/90">
                Retourne la chaise, regarde sous le plateau : le numéro est gravé au fer. Tape-le, et tu lis son registre.
                Les premières lignes, c&apos;est l&apos;atelier. Les suivantes sont vides : c&apos;est toi qui les écris.
              </Apparition>
              <Apparition de="zoom" delai={250}>
                <Plaque className="w-full max-w-[380px] rotate-[-2deg] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)]" />
              </Apparition>
            </div>
            <Apparition de="droite" delai={100} className="min-w-0 rounded-[1.5rem] bg-[var(--fond)] p-4 text-[var(--encre)] sm:p-6">
              <Registre depart="31" />
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Les tables ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36">
        <div className="mb-14 grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div className="space-y-6">
            <Apparition><Chapitre numero="III">Les tables</Chapitre></Apparition>
            <TitreRevele
              texte="Toutes sur mesure, *toutes numérotées.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.8rem,6vw,5.6rem)] leading-[0.95] tracking-[-0.02em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
          </div>
          <Apparition as="p" delai={150} className="text-lg leading-relaxed text-[var(--doux)]">
            Dis combien vous êtes le dimanche : on te dit la taille, et le prix de départ. Le devis détaille tout, la date
            de livraison comprise.
          </Apparition>
        </div>
        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <ul className="grid gap-5 sm:grid-cols-2">
            {meubles.map((m, i) => (
              <Apparition as="li" key={m.id} delai={i * 110} de="zoom">
                <CarteLueur className={`h-full ${CHANFREIN_GRAND}`}>
                  <Link href={`${DOSSIER}/meubles#${m.id}`} className="group relative flex h-[340px] flex-col justify-end overflow-hidden bg-[var(--sombre)] p-6 text-[var(--sur-sombre)]">
                    <Image src={photos[m.photo].src} alt={photos[m.photo].alt} fill sizes="(min-width: 1024px) 340px, (min-width: 640px) 50vw, 100vw" className="object-cover opacity-65 transition-transform duration-[1.4s] group-hover:scale-105" />
                    <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(42,25,14,0)_30%,rgba(42,25,14,0.95)_100%)]" />
                    <span className="relative space-y-1">
                      <span className="block font-[family-name:var(--titres)] text-[1.9rem] leading-tight">{m.nom}</span>
                      <span className="block text-[15px] text-[var(--sur-sombre)]/90">{m.prix} · exemple · {m.delai}</span>
                    </span>
                  </Link>
                </CarteLueur>
              </Apparition>
            ))}
          </ul>
          <Apparition de="droite" delai={150} className="lg:sticky lg:top-28 lg:self-start">
            <CalculPalier
              etiquette="Combien vous êtes à table"
              unite="couverts"
              min={2}
              max={14}
              depart={8}
              paliers={paliers}
              titreResultat="Ta table"
              legende="Prix de départ TTC, d'exemple. Le devis, fait chez toi, les fixe."
            />
          </Apparition>
        </div>
      </section>

      {/* ---------- L'outil de « Remplir l'agenda » : la page d'une pièce ---------- */}
      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="space-y-6">
            <Apparition><Chapitre numero="IV">La terre</Chapitre></Apparition>
            <TitreRevele
              texte="Chaque pièce a sa page. *Et son tournage.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.8rem,5.5vw,5rem)] leading-[0.95] tracking-[-0.02em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
            <Apparition as="p" delai={150} className="text-lg leading-relaxed text-[var(--doux)]">
              Vingt secondes de vidéo : ton bol, sur le tour, en train de naître. Une seule de chaque — quand elle est
              partie, elle est partie. On l&apos;achète ici, sans passer à l&apos;atelier.
            </Apparition>
            <Apparition delai={250} className="space-y-4">
              <p className="flex items-baseline gap-3">
                <span className="font-[family-name:var(--titres)] text-4xl">{bol.nom}</span>
                <span className="text-lg tabular-nums">{prix(bol.prix)} TTC · exemple</span>
              </p>
              <Acheter nom={bol.nom} bouton={boutonAchat(bol.forme)} prix={prix(bol.prix)} partie={bol.partie} envoi={`${ENVOI.prix}, ${ENVOI.delai}`} />
            </Apparition>
          </div>
          <Apparition de="zoom" delai={100} className="space-y-4">
            <Tour legende={`${bol.nom}, tourné le ${bol.tourneLe}. L'atelier est fictif : une animation remplace la vraie vidéo de son tournage.`} date={bol.tourneLe.replace(" 2026", "")} />
            <Link href={`${DOSSIER}/fournee/${bol.slug}`} className="inline-block text-[14px] font-semibold uppercase tracking-[0.16em] underline underline-offset-8">Sa page</Link>
          </Apparition>
        </div>
      </section>

      {/* ---------- L'ouverture du four ---------- */}
      <section className="kit-grain relative overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <Apparition>
              <p className="inline-flex items-center gap-2 border border-white/30 px-3 py-1.5 text-[12px] font-bold uppercase tracking-[0.16em]">
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#E5533D]" />
                En direct · le troisième jeudi du mois
              </p>
            </Apparition>
            <TitreRevele
              texte="L'ouverture *du four.*"
              className="font-[family-name:var(--titres)] text-[clamp(3rem,7vw,6.4rem)] leading-[0.92] tracking-[-0.02em]"
              classeAccent="italic text-[#E0B36A]"
            />
            <Apparition as="p" delai={150} className="max-w-lg text-lg leading-relaxed text-[var(--sur-sombre)]/90">
              Une fois par mois, on ouvre le four devant la caméra. Les pièces sortent, et le soir même, elles sont en
              ligne. Prochaine : {ouvertures.prochaine.date}, {ouvertures.prochaine.heure}.
            </Apparition>
            <Apparition delai={250}>
              <Bouton href={`${DOSSIER}/ouverture-du-four`}>La soirée, en quatre moments</Bouton>
            </Apparition>
          </div>
          <Apparition de="zoom" delai={100}>
            <Four />
          </Apparition>
        </div>
      </section>

      {/* ---------- La fournée ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="space-y-6">
            <Apparition><Chapitre numero="V">La fournée du {ouvertures.derniere.court}</Chapitre></Apparition>
            <TitreRevele
              texte="Une seule *de chaque.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.8rem,6vw,5.4rem)] leading-[0.95] tracking-[-0.02em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
          </div>
          <Bouton href={`${DOSSIER}/fournee`} variante="encre">Toute la fournée</Bouton>
        </div>
        <Fournee limite={4} />
      </section>

      {/* ---------- Le premier repas ---------- */}
      <section className="bg-[var(--accent)] text-[var(--sur-accent)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-6">
            <Apparition><p className="text-[12px] font-semibold uppercase tracking-[0.24em]">VI. Le premier repas</p></Apparition>
            <TitreRevele
              texte="Chaque table livrée, *on filme son premier repas.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.8rem,5.5vw,5rem)] leading-[0.95] tracking-[-0.02em]"
              classeAccent="italic"
            />
            <Apparition as="p" delai={150} className="max-w-lg text-lg leading-relaxed">
              Avec l&apos;accord écrit de la famille, qui dit où la vidéo sera publiée — et qui peut la retirer quand elle
              veut. La soupe est servie dans les bols de l&apos;atelier. Ça ne vend pas une table : ça vend une place
              dans la famille.
            </Apparition>
          </div>
          <Apparition de="zoom" delai={100} className="[&_figcaption]:text-[var(--sur-accent)]">
            <Repas />
          </Apparition>
        </div>
      </section>

      {/* ---------- Deux métiers, un atelier : le récit ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36">
        <div className="mb-10 space-y-6 md:mb-4">
          <Apparition><Chapitre numero="VII">L&apos;atelier</Chapitre></Apparition>
          <TitreRevele
            texte="Deux métiers, *un seul établi.*"
            className="max-w-4xl font-[family-name:var(--titres)] text-[clamp(2.8rem,6vw,5.6rem)] leading-[0.95] tracking-[-0.02em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
        </div>
        <RecitColle
          etapes={RECIT.map((e) => ({
            surtitre: e.surtitre,
            titre: e.titre,
            texte: <p>{e.texte}</p>,
            visuel: <Image src={e.photo.src} alt={e.photo.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />,
          }))}
        />
      </section>

      {/* ---------- Questions ---------- */}
      <section id="questions" className="scroll-mt-24 border-t border-[var(--trait)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="space-y-6">
            <Apparition><Chapitre numero="VIII">Questions</Chapitre></Apparition>
            <TitreRevele
              texte="Avant de *commander.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.8rem,5vw,4.6rem)] leading-[0.95] tracking-[-0.02em]"
              classeAccent="italic text-[var(--accent-texte)]"
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
