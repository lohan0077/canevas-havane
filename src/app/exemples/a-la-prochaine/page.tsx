import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Accordeon from "../_kit/Accordeon";
import Apparition from "../_kit/Apparition";
import CarteLueur from "../_kit/CarteLueur";
import Defilant from "../_kit/Defilant";
import FondVivant from "../_kit/FondVivant";
import RecitColle from "../_kit/RecitColle";
import TitreRevele from "../_kit/TitreRevele";
import Anneau from "./_composants/Anneau";
import { AppelFinal, Bouton, Libelle } from "./_composants/Blocs";
import Bijou from "./_composants/Bijou";
import { Lettre } from "./_composants/Interactions";
import { Tampon } from "./_composants/Pieces";
import Registre from "./_composants/Registre";
import Vendredi from "./_composants/Vendredi";
import { DOSSIER, IMAGES, PIECES, PROCHAINE, QUESTIONS, REPONSES, euros, grave, pieceNumero } from "./_composants/donnees";

export const metadata: Metadata = {
  title: "À la Prochaine — bijoux, site de démonstration",
  description:
    "Le site d'une marque de bijoux imaginaire : chaque pièce est faite une fois et gravée d'un numéro qui a sa page — sa fabrication, le premier nom, une ligne vide pour la suite — et six pièces sortent chaque vendredi à 18 h.",
  ...adressesDeLaPage("/exemples/a-la-prochaine"),
};

const TRANSMETTRE = [
  { n: "I", titre: "Tu la portes", texte: "Ton prénom et l'année ouvrent sa page, sous le film de sa fabrication. Le premier nom, c'est le tien.", image: IMAGES.baguePortee },
  { n: "II", titre: "Tu la donnes", texte: "À ta fille, à ton filleul, à une amie. Le jour où tu veux, à qui tu veux. Une mise à taille est offerte à qui la reçoit.", image: IMAGES.boite },
  { n: "III", titre: "La ligne suivante s'écrit", texte: "La personne qui la reçoit ajoute son prénom sous le tien, avec votre accord à tous les deux. Et en dessous, une nouvelle ligne vide.", image: IMAGES.baguesLin },
];

const PROMESSES = [
  { titre: "Une de chaque", texte: "Chaque numéro est fait une fois, et jamais refait. Pas de collection, pas de stock." },
  { titre: "Un prénom, une année", texte: "Rien d'autre au registre : ni nom de famille, ni ville, ni photo. Chaque ligne s'efface sur demande." },
  { titre: "Une taille à chaque passage", texte: "La mise à taille pour la personne suivante est faite à l'atelier, sans frais." },
  { titre: "Le métal, poinçonné", texte: "Le numéro s'ajoute aux poinçons que la loi impose à l'argent et à l'or ; il ne les remplace pas." },
];

export default function ALaProchaine() {
  const p47 = pieceNumero(47)!;
  const p46 = pieceNumero(46)!;
  const p52 = pieceNumero(52)!;
  return (
    <main>
      {/* ---------- Premier écran : la typographie seule, sur l'écrin qui bouge ---------- */}
      <section data-film="ouverture" className="kit-grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <FondVivant couleurs={["#152B26", "#21443B", "#7A5E26"]} vitesse={0.7} />
        <div className="absolute inset-0 bg-[var(--sombre)]/40" />
        <div aria-hidden="true" className="absolute inset-y-0 left-1/4 hidden w-px bg-white/10 md:block" />
        <div aria-hidden="true" className="absolute inset-y-0 left-3/4 hidden w-px bg-white/10 md:block" />
        <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pb-10 pt-32 sm:px-8">
          <div className="flex items-center justify-between text-[13px] font-semibold uppercase tracking-[0.2em] text-[#C9A86A]">
            <Apparition as="p">[{grave(p47.numero)}]</Apparition>
            <Apparition as="p" delai={150}>Une sur une</Apparition>
          </div>
          <h1 className="relative my-6 text-center font-[family-name:var(--titres)] leading-[0.82] tracking-[-0.03em]">
            <Apparition as="span" de="flou" className="relative z-10 block text-[clamp(6rem,22vw,20rem)]">À toi.</Apparition>
            <span aria-hidden="true" className="relative z-0 mx-auto -my-[6vw] block w-[clamp(180px,30vw,380px)] md:-my-[4.5vw]">
              <Anneau id="ouverture" numero={grave(p46.numero)} className="w-full animate-[spin_70s_linear_infinite] drop-shadow-[0_30px_40px_rgba(0,0,0,0.5)] motion-reduce:animate-none" />
            </span>
            <Apparition as="span" de="flou" delai={350} className="relative z-10 block text-[clamp(3.6rem,13vw,12rem)] italic text-[#C9A86A]">Pour l&apos;instant.</Apparition>
          </h1>
          <div className="grid gap-8 border-t border-white/20 pt-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
            <Apparition as="p" delai={600} className="max-w-xl text-lg leading-relaxed text-[var(--sur-sombre)]/90">
              Des bijoux faits main, une seule fois chacun. Chaque pièce est gravée d&apos;un numéro, et ce numéro a sa page :
              le film de sa fabrication, puis le premier nom — le tien. En dessous, une ligne vide.
            </Apparition>
            <Apparition delai={800} className="flex flex-wrap gap-3 md:justify-end">
              <Bouton href={`${DOSSIER}#vendredi`} variante="clair">Vendredi, 18 h</Bouton>
              <Bouton href={`${DOSSIER}/registre`} variante="contour">Chercher un numéro</Bouton>
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Les pièces, numéro par numéro ---------- */}
      <div className="border-y border-[#A88A4E] bg-[var(--accent)] py-5 text-[var(--sur-accent)]">
        <Defilant
          duree={60}
          separateur="·"
          elements={PIECES.map((p) => `N° ${grave(p.numero)} ${p.nom}${p.partieLe ? " — partie" : ""}`)}
          classeElement="font-[family-name:var(--titres)] text-2xl whitespace-nowrap md:text-3xl"
        />
      </div>

      {/* ---------- Le contre-pied ---------- */}
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:grid-cols-[0.85fr_1.15fr] md:items-center md:py-36">
        <Apparition de="rideau" className="relative aspect-[4/5] overflow-hidden">
          <Image src={IMAGES.baguePortee.src} alt={IMAGES.baguePortee.alt} fill sizes="(min-width: 768px) 520px, 92vw" className="object-cover" />
          <span className="absolute bottom-0 left-0 bg-[var(--sombre)] px-4 py-2 font-[family-name:var(--titres)] text-3xl text-[var(--sur-sombre)]">1 sur 1</span>
        </Apparition>
        <div className="space-y-8">
          <Apparition><Libelle>Ce qu&apos;on vend</Libelle></Apparition>
          <TitreRevele
            texte="Pas un bijou pour toi. *Celui qu'on portera après toi.*"
            className="font-[family-name:var(--titres)] text-[clamp(3rem,6.5vw,6rem)] leading-[0.95] tracking-[-0.02em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
          <Apparition as="p" delai={150} className="max-w-xl text-lg leading-relaxed text-[var(--doux)]">
            Ailleurs, une bague ressemble à toutes les autres, et on trie par prix. Ici, chaque pièce est la seule qui
            existe : faite une fois, jamais refaite. Un bijou qui a une histoire, personne ne le jette. On le passe.
          </Apparition>
          <Apparition delai={250}>
            <Bouton href={`${DOSSIER}/pieces`}>Toutes les pièces</Bouton>
          </Apparition>
        </div>
      </section>

      {/* ---------- Chaque pièce a sa page : le bento ---------- */}
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 md:pb-36">
        <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <TitreRevele
            texte="Chaque pièce a *sa page.*"
            className="font-[family-name:var(--titres)] text-[clamp(3rem,7vw,6.6rem)] leading-[0.92] tracking-[-0.02em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
          <Apparition as="p" delai={150} className="text-lg leading-relaxed text-[var(--doux)]">
            Son numéro, sa matière, le film de sa fabrication. Et quand elle est vendue, sa page reste, avec un tampon :
            partie.
          </Apparition>
        </div>
        <div className="grid gap-4 md:grid-cols-4 md:grid-rows-[300px_300px]">
          <Apparition de="zoom" className="md:col-span-2 md:row-span-2">
            <CarteLueur className="h-full">
              <Link href={`${DOSSIER}/pieces/${p47.numero}`} className="group relative flex h-[440px] flex-col justify-end overflow-hidden bg-[var(--sombre)] p-7 text-[var(--sur-sombre)] md:h-full">
                <Image src={IMAGES.bagueMartelee.src} alt={IMAGES.bagueMartelee.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover opacity-70 transition-transform duration-[1.4s] group-hover:scale-105" />
                <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,43,38,0)_35%,rgba(21,43,38,0.95)_100%)]" />
                <span className="absolute left-5 top-5 bg-[var(--sombre)] px-3 py-1 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#C9A86A]">Pièce n° {grave(p47.numero)} · 1 sur 1</span>
                <span className="relative space-y-2">
                  <span className="block font-[family-name:var(--titres)] text-[3rem] leading-none">Bague <em>«&nbsp;{p47.nom}&nbsp;»</em></span>
                  <span className="block text-[15px] text-[var(--sur-sombre)]/90">{euros(p47.prix)} TTC, exemple · avec le film de sa fabrication →</span>
                </span>
              </Link>
            </CarteLueur>
          </Apparition>
          <Apparition de="zoom" delai={120}>
            <Link href={`${DOSSIER}/pieces/${p46.numero}`} className="group relative flex h-[300px] flex-col justify-between overflow-hidden bg-[var(--sombre)] p-5 text-[var(--sur-sombre)]">
              <span className="text-[13px] font-semibold tabular-nums tracking-[0.12em]">[{grave(p46.numero)}]</span>
              <Bijou piece={p46} className="absolute inset-0 m-auto h-[78%] w-[78%]" />
              <Tampon />
              <span className="relative font-[family-name:var(--titres)] text-2xl">Partie le {p46.partieLe}</span>
            </Link>
          </Apparition>
          <Apparition de="zoom" delai={200}>
            <Link href={`${DOSSIER}/pieces/${p52.numero}`} className="group relative flex h-[300px] flex-col justify-between overflow-hidden border border-[var(--trait)] bg-[var(--carte)] p-5">
              <span className="text-[13px] font-semibold tabular-nums tracking-[0.12em] text-[var(--accent-texte)]">[{grave(p52.numero)}] · encore là</span>
              <span className="absolute inset-x-8 bottom-16 top-10 bg-[var(--sombre)]">
                <Bijou piece={p52} className="h-full w-full p-3" />
              </span>
              <span className="relative font-[family-name:var(--titres)] text-2xl">{p52.nom} · {euros(p52.prix)}</span>
            </Link>
          </Apparition>
          <Apparition de="zoom" delai={280} className="md:col-span-2">
            <Link href={`${DOSSIER}/atelier`} className="group relative flex h-[300px] items-end overflow-hidden bg-[var(--sombre)] p-6 text-[var(--sur-sombre)]">
              <Image src={IMAGES.flamme.src} alt={IMAGES.flamme.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover opacity-60 transition-transform duration-[1.4s] group-hover:scale-105" />
              <span className="absolute inset-0 bg-[linear-gradient(90deg,rgba(21,43,38,0.95)_0%,rgba(21,43,38,0.35)_100%)]" />
              <span className="relative max-w-sm space-y-2">
                <span className="block font-[family-name:var(--titres)] text-[2.4rem] leading-none">Le film de sa fabrication</span>
                <span className="block text-[15px] text-[var(--sur-sombre)]/90">Souder, recuire, ajuster, marteler, graver. Quinze secondes, sur sa page.</span>
              </span>
            </Link>
          </Apparition>
        </div>
      </section>

      {/* ---------- L'outil de « Remplir l'agenda » : la sortie du vendredi ---------- */}
      <section id="vendredi" className="scroll-mt-20 border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-7">
            <Apparition><Libelle>Le rendez-vous</Libelle></Apparition>
            <TitreRevele
              texte={"Chaque vendredi, *18 h.*"}
              className="font-[family-name:var(--titres)] text-[clamp(3rem,6.5vw,6rem)] leading-[0.92] tracking-[-0.02em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
            <Apparition as="p" delai={150} className="text-lg leading-relaxed text-[var(--doux)]">
              Pas de collection, pas de stock : les six pièces finies dans la semaine, montrées le vendredi à 18 h. Les
              vraies. Quand elles sont parties, elles sont parties.
            </Apparition>
            <Apparition as="p" delai={200} data-film="abonnees" className="border-l-2 border-[var(--accent)] pl-4 text-lg leading-relaxed">
              Les abonnées à la lettre les voient en premier, à 17 h.
            </Apparition>
          </div>
          <div className="space-y-6">
            <Apparition de="droite" delai={100} className="space-y-6">
              <Vendredi />
              <p className="border border-[var(--trait)] bg-[var(--fond)] px-4 py-3 text-[15px]">
                Prochaine sortie : <strong>{PROCHAINE.date}, {PROCHAINE.heure}</strong> — les n° {PROCHAINE.numeros}, encore à l&apos;atelier.
              </p>
            </Apparition>
            <Apparition id="lettre" delai={150} className="scroll-mt-24 bg-[var(--sombre)] p-6 text-[var(--sur-sombre)] sm:p-8">
              <p className="mb-5 font-[family-name:var(--titres)] text-3xl">La lettre du vendredi</p>
              <Lettre />
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- L'outil de « Créer une marque » : le numéro gravé, le registre ---------- */}
      <section id="registre" className="scroll-mt-20 px-3 pt-5 sm:px-5">
        <div className="kit-grain relative overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-10 md:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="space-y-6">
              <Apparition><Libelle clair>Le numéro gravé</Libelle></Apparition>
              <TitreRevele
                texte="Gravé à l'intérieur. *Là où personne ne le voit.*"
                className="font-[family-name:var(--titres)] text-[clamp(2.8rem,5.5vw,5.2rem)] leading-[0.95] tracking-[-0.02em]"
                classeAccent="italic text-[#C9A86A]"
              />
              <Apparition as="p" delai={150} className="text-lg leading-relaxed text-[var(--sur-sombre)]/90">
                Quatre chiffres, dans l&apos;anneau, au dos de la plaque ou sur le fermoir. Ils ne disent rien à personne.
                Sauf au site : tape-les, la page de ton bijou s&apos;ouvre.
              </Apparition>
              <Apparition de="zoom" delai={200} className="mx-auto w-full max-w-[340px] lg:mx-0">
                <Anneau id="grave" numero={grave(p46.numero)} titre={`Un anneau d'or vu de face ; à l'intérieur, gravé : N° ${grave(p46.numero)} · À la prochaine`} className="w-full animate-[spin_90s_linear_infinite] motion-reduce:animate-none" />
              </Apparition>
            </div>
            <Apparition de="droite" delai={100}>
              <Registre sombre depart={grave(p46.numero)} />
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Transmettre : le récit ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36">
        <div className="mb-10 space-y-6 md:mb-4">
          <Apparition><Libelle>Transmettre</Libelle></Apparition>
          <TitreRevele
            texte="Trois lignes, *et une vide.*"
            className="max-w-4xl font-[family-name:var(--titres)] text-[clamp(3rem,6.5vw,6rem)] leading-[0.92] tracking-[-0.02em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
        </div>
        <RecitColle
          etapes={TRANSMETTRE.map((e) => ({
            surtitre: e.n,
            titre: e.titre,
            texte: <p>{e.texte}</p>,
            visuel: <Image src={e.image.src} alt={e.image.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />,
          }))}
        />
        <Apparition className="mt-6">
          <Bouton href={`${DOSSIER}/transmettre`}>Inscrire le nom suivant</Bouton>
        </Apparition>
      </section>

      {/* ---------- La question posée aux réseaux ---------- */}
      <section className="bg-[var(--accent)] text-[var(--sur-accent)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <Apparition><p className="text-[12px] font-semibold uppercase tracking-[0.24em]">[ Une seule question, sur les réseaux ]</p></Apparition>
            <TitreRevele
              texte={"C'est quoi le bijou le plus vieux *que tu portes ?*"}
              className="font-[family-name:var(--titres)] text-[clamp(3rem,6.5vw,6rem)] leading-[0.92] tracking-[-0.02em]"
              classeAccent="italic"
            />
            <Apparition as="p" delai={150} className="max-w-lg text-lg leading-relaxed">
              Les réponses deviennent notre campagne. Une photo n&apos;est repartagée qu&apos;avec l&apos;accord de qui
              l&apos;a prise et de qui la porte.
            </Apparition>
          </div>
          <ul className="space-y-3">
            {REPONSES.map((r, i) => (
              <Apparition as="li" key={r.texte} delai={i * 120} de="droite" className="bg-[var(--sombre)] px-6 py-5 text-[var(--sur-sombre)]" style={{ transform: `rotate(${[-1.5, 1, -0.6, 1.4][i]}deg)` }}>
                <p className="font-[family-name:var(--titres)] text-[30px] italic leading-tight">«&nbsp;{r.texte}&nbsp;»</p>
                <p className="mt-1 text-[15px] text-[var(--sur-sombre)]/90">{r.detail}</p>
              </Apparition>
            ))}
            <li className="pt-2 text-[14px]">Réponses imaginées, pour l&apos;exemple : la marque est fictive.</li>
          </ul>
        </div>
      </section>

      {/* ---------- Ce qu'on promet, et les questions ---------- */}
      <section id="questions" className="scroll-mt-24 mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 md:py-36 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-8">
          <Apparition><Libelle>Ce qu&apos;on promet</Libelle></Apparition>
          <dl className="space-y-6">
            {PROMESSES.map((p, i) => (
              <Apparition key={p.titre} delai={i * 100} className="space-y-1.5 border-t border-[var(--encre)] pt-5">
                <dt className="font-[family-name:var(--titres)] text-[34px] leading-tight">{p.titre}</dt>
                <dd className="leading-relaxed text-[var(--doux)]">{p.texte}</dd>
              </Apparition>
            ))}
          </dl>
        </div>
        <div className="space-y-8">
          <TitreRevele
            texte="Questions, *réponses.*"
            className="font-[family-name:var(--titres)] text-[clamp(2.8rem,5vw,4.8rem)] leading-[0.95] tracking-[-0.02em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
          <Apparition delai={150}>
            <Accordeon questions={QUESTIONS.map((q) => ({ question: q.q, reponse: q.r }))} />
          </Apparition>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
