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
import { AppelFinal, Bouton, FairePart, MenuResto, Surtitre } from "./_composants/Blocs";
import Comparaison from "./_composants/Comparaison";
import Echantillons from "./_composants/Echantillons";
import Facade from "./_composants/Facade";
import Frigo from "./_composants/Frigo";
import { Cachet, Timbre } from "./_composants/Ornements";
import UnSeulBouton from "./_composants/UnSeulBouton";
import { DOSSIER, OBJETS, etapesPapier, photos, questions } from "./_composants/donnees";
import styles from "./_composants/Papier.module.css";

// L'accueil d'À Garder, l'imprimerie des deux vidéos des imprimeurs. De « Créer une
// marque » : on n'imprime que ce qu'on garde, le papier arrive par la poste avant la
// commande, les menus du restaurant d'en face. De « Remplir l'agenda » : un seul
// bouton pour envoyer la photo de sa façade (#boutique), l'avant / après de
// l'enseigne posée (#avant-apres), le dossier en mairie préparé.
export const metadata: Metadata = {
  title: "À Garder — imprimerie et enseignes, site de démonstration",
  description:
    "Le site d'une imprimerie imaginaire qui n'imprime que ce qu'on garde : faire-part, menus, cartes du frigo, enseignes. Le papier arrive par la poste avant la commande, et ta façade te revient avec son enseigne posée dessus.",
  ...adressesDeLaPage("/exemples/a-garder"),
};

const MOTS = ["Faire-part", "Menus de fête", "Cartes du frigo", "Dessins d'enfants", "Enseignes lumineuses", "Lettres découpées", "Coton 600 g", "Vergé 300 g", "Kraft 350 g", "Couché mat 400 g"];

export default function AGarder() {
  return (
    <main>
      {/* ---------- Premier écran : le nom immense, en italique, autour d'un faire-part ---------- */}
      <section className="kit-grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[var(--fond)]">
        <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 pb-10 pt-28 sm:px-8 md:pt-32">
          <div className="relative h-[420px] sm:h-[560px] lg:h-[min(64svh,620px)]">
            {/* Le collage : deux photos de biais, un timbre, le faire-part au milieu. */}
            <Apparition de="zoom" delai={500} className="absolute right-0 top-2 z-0 w-[34%] max-w-[330px] rotate-[5deg] sm:right-[2%] lg:w-[26%]">
              <div className="relative aspect-[3/2] overflow-hidden rounded-[4px] shadow-[0_30px_60px_-30px_rgba(30,42,90,.6)]">
                <Image src={photos.enveloppe.src} alt={photos.enveloppe.alt} fill priority sizes="(min-width: 1024px) 330px, 34vw" className="kit-cinema-img object-cover" />
              </div>
            </Apparition>
            <Apparition de="zoom" delai={650} className="absolute bottom-0 left-0 z-0 w-[30%] max-w-[250px] -rotate-[4deg] sm:left-[3%] lg:w-[18%]">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[4px] shadow-[0_30px_60px_-30px_rgba(30,42,90,.6)]">
                <Image src={photos.casse.src} alt={photos.casse.alt} fill priority sizes="(min-width: 1024px) 250px, 30vw" className="kit-cinema-img object-cover" />
              </div>
            </Apparition>
            <Timbre className="absolute right-[30%] top-0 z-30 hidden w-20 rotate-[10deg] drop-shadow-md lg:block" />

            <h1 className="absolute inset-0 font-normal italic tracking-[-0.04em]">
              <Apparition as="span" de="flou" className="absolute left-[4%] top-[calc(-2%-0.26em)] z-0 block pt-[0.26em] text-[clamp(11rem,30vw,25rem)] leading-[0.82] sm:left-[14%]">
                À
              </Apparition>
              <Apparition as="span" de="bas" delai={250} className="absolute bottom-[4%] right-0 z-20 block text-[clamp(5.6rem,19vw,16.5rem)] leading-[0.85] sm:right-[2%]">
                garder.
              </Apparition>
            </h1>
            <Apparition de="zoom" delai={400} className="absolute left-1/2 top-[44%] z-10 w-[190px] -translate-x-[38%] -translate-y-1/2 sm:w-[270px]">
              <FairePart />
            </Apparition>
          </div>

          <div className="mt-8 grid gap-8 border-t border-[var(--trait)] pt-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="space-y-4">
              <TitreRevele
                as="p"
                auChargement
                delai={500}
                texte="On n'imprime que ce qu'on *garde.*"
                className="font-[family-name:var(--titres)] text-[clamp(2.1rem,4.4vw,3.6rem)] leading-[1.02] tracking-[-0.02em]"
                classeAccent="italic text-[var(--accent-texte)]"
              />
              <Apparition delai={800} as="p" className="max-w-xl text-lg leading-relaxed text-[var(--doux)]">
                Des faire-part, des menus, des cartes qu&apos;on aimante sur le frigo — et l&apos;enseigne
                de ta boutique. Ton papier arrive par la poste avant que tu choisisses.
              </Apparition>
            </div>
            <Apparition delai={950} className="flex flex-wrap gap-3 lg:justify-end">
              <Bouton href={`${DOSSIER}/echantillons`}>Recevoir mes échantillons</Bouton>
              <Bouton href={`${DOSSIER}#boutique`} variante="contour">Pour ma boutique</Bouton>
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Ce qu'on garde, qui défile ---------- */}
      <div className="bg-[var(--accent)] py-5 text-[var(--sur-accent)]">
        <Defilant
          duree={44}
          elements={MOTS}
          separateur="✶"
          classeElement="font-[family-name:var(--titres)] text-2xl italic whitespace-nowrap md:text-3xl"
        />
      </div>

      {/* ---------- Le contre-pied : pas de flyers ---------- */}
      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 md:grid-cols-[0.8fr_1.2fr] md:items-center md:py-36">
        <Apparition de="gauche" aria-hidden="true" className="relative mx-auto h-[260px] w-[220px]">
          <div className="absolute inset-0 rotate-[-6deg] bg-[#FFD400] p-6 text-[#1E2A5A] shadow-xl">
            <p className="text-[2.6rem] font-bold leading-none">500 flyers</p>
            <p className="mt-3 text-2xl font-bold">−50 % · 48 h</p>
            <p className="mt-10 text-xs uppercase tracking-[0.16em]">Prix cassés</p>
          </div>
          <span className="kit-barre absolute left-[-14%] top-1/2 block h-[0.5em] w-[128%] -rotate-[38deg] text-[60px]" />
        </Apparition>
        <div className="space-y-7">
          <Apparition><Surtitre>Notre camp</Surtitre></Apparition>
          <Apparition as="h2" delai={100} className="text-[clamp(3rem,7vw,6.2rem)] font-normal italic leading-[0.95] tracking-[-0.03em]">
            <span className="kit-barre text-[var(--doux)]">Des flyers, en 48 h.</span>{" "}
            <span className="not-italic">Ce qu&apos;on garde,</span> des années.
          </Apparition>
          <Apparition delai={250} as="p" className="max-w-xl text-xl leading-relaxed">
            Un flyer vit deux jours, puis finit à la poubelle. Un faire-part vit des années, au fond
            d&apos;une boîte ou sur la porte du frigo. Une enseigne, dix ans au-dessus d&apos;une
            vitrine. On a choisi notre camp.
          </Apparition>
        </div>
      </section>

      {/* ---------- Le frigo, en bento ---------- */}
      <section id="frigo" className="scroll-mt-24 border-y border-[var(--trait)] bg-[var(--carte)] py-24 md:py-32">
        <div className="mx-auto max-w-7xl space-y-14 px-5 sm:px-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <div className="space-y-6">
              <Apparition><Surtitre>Ce qu&apos;on imprime</Surtitre></Apparition>
              <TitreRevele
                texte="Ce qu'on aimante *sur le frigo.*"
                className="text-[clamp(3rem,7vw,6.2rem)] font-normal italic leading-[0.95] tracking-[-0.03em]"
                classeAccent="not-italic text-[var(--accent-texte)]"
              />
            </div>
            <Apparition as="p" delai={150} className="text-lg leading-relaxed text-[var(--doux)]">
              Touche un objet sur la porte : son papier, son prix. Ce qu&apos;on vend, montré là où ça
              finit.
            </Apparition>
          </div>

          <div className="grid gap-5 lg:grid-cols-12">
            <Apparition de="zoom" className="rounded-[2rem] border border-[var(--trait)] bg-[var(--fond)] p-5 sm:p-8 lg:col-span-8">
              <div className="mb-6 flex items-center justify-between gap-4 border-b border-[var(--trait)] pb-4">
                <p className="text-sm font-bold uppercase tracking-[0.18em]">La porte du frigo</p>
                <p className="text-sm text-[var(--doux)]">Prix TTC d&apos;exemple</p>
              </div>
              <Frigo />
            </Apparition>
            <div className="grid gap-5 lg:col-span-4">
              <Apparition delai={150} de="zoom" className="relative min-h-[260px] overflow-hidden rounded-[2rem]">
                <Image src={photos.cartes.src} alt={photos.cartes.alt} fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover transition-transform duration-[1.4s] hover:scale-105" />
              </Apparition>
              <Apparition delai={250} className="flex flex-col justify-between gap-6 rounded-[2rem] bg-[var(--sombre)] p-7 text-[var(--sur-sombre)]">
                <p className="font-[family-name:var(--titres)] text-4xl italic leading-tight">Faire-part, dès 129&nbsp;€.</p>
                <p className="text-[15px]">Trente faire-part en coton 600 g, enveloppes comprises. TTC, exemple.</p>
                <Bouton href={`${DOSSIER}/ce-qu-on-imprime#faire-part`} variante="clair">Combien en veux-tu&nbsp;?</Bouton>
              </Apparition>
            </div>
          </div>

          <ul className="grid gap-5 md:grid-cols-4">
            {OBJETS.map((o, i) => (
              <Apparition as="li" key={o.id} delai={i * 110} de="bas">
                <CarteLueur className="h-full rounded-[1.6rem] border border-[var(--trait)] bg-[var(--fond)]">
                  <Link href={`${DOSSIER}/ce-qu-on-imprime`} className="flex h-full flex-col gap-3 p-6">
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-texte)]">{o.genre}</span>
                    <span className="font-[family-name:var(--titres)] text-3xl italic leading-tight">{o.titre}</span>
                    <span className="text-[15px] text-[var(--doux)]">{o.papier}</span>
                    <span className="mt-auto pt-3 font-bold">{o.prix}</span>
                  </Link>
                </CarteLueur>
              </Apparition>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Le papier par la poste : l'outil, comme une application ---------- */}
      <section className="px-3 py-3 sm:px-5 sm:py-5">
        <div className="kit-grain relative overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <Cachet className="absolute -right-6 top-10 w-56 rotate-[-12deg] opacity-30 invert" />
          <div className="relative mx-auto grid max-w-6xl gap-14 px-6 py-24 sm:px-10 md:py-32 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="space-y-7">
              <Apparition><Surtitre clair>Avant de commander</Surtitre></Apparition>
              <TitreRevele
                texte="Ton papier, *par la poste.*"
                className="text-[clamp(3rem,7vw,6rem)] font-normal italic leading-[0.95] tracking-[-0.03em]"
                classeAccent="not-italic text-[#F5C76A]"
              />
              <Apparition as="p" delai={150} className="max-w-md text-xl leading-relaxed">
                Un écran ne dit rien d&apos;un papier. Alors on t&apos;envoie les quatre, dans une
                enveloppe, offerts. Tu touches chez toi, à ta lumière. Et après, tu choisis.
              </Apparition>
              <Apparition as="ol" delai={250} className="grid gap-3 sm:grid-cols-3">
                {["Tu touches un papier", "On l'envoie, offert", "Tu choisis chez toi"].map((t, i) => (
                  <li key={t} className="rounded-2xl border border-white/20 p-4">
                    <span className="block font-[family-name:var(--titres)] text-3xl italic text-[#F5C76A]">{i + 1}.</span>
                    <span className="mt-1 block font-bold">{t}</span>
                  </li>
                ))}
              </Apparition>
            </div>
            <Apparition de="droite" delai={200} className="text-[var(--encre)]">
              <div className="rounded-[2.2rem] bg-[color-mix(in_oklab,var(--fond)_14%,transparent)] p-2.5 shadow-[0_50px_100px_-40px_rgba(0,0,0,.8)] ring-1 ring-white/15">
                <Echantillons />
              </div>
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- La boutique, le soir : un seul bouton ---------- */}
      <section
        id="boutique"
        className="kit-grain relative scroll-mt-0 overflow-hidden bg-[#0E1424] text-[var(--sur-sombre)]"
        style={{ "--accent": "#F2B544", "--sur-accent": "#161E44" } as React.CSSProperties}
      >
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[34%] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(242,181,68,.26),transparent_65%)]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 pb-10 pt-24 sm:px-8 md:grid-cols-[1.05fr_0.95fr] md:pt-32">
          <div className="space-y-6">
            <Apparition><Surtitre clair>Pour les commerces</Surtitre></Apparition>
            <TitreRevele
              texte="Ta boutique, *allumée.*"
              className="text-[clamp(3.2rem,8vw,7rem)] font-normal leading-[0.92] tracking-[-0.03em]"
              classeAccent="italic text-[#F5C76A]"
            />
            <Apparition as="p" delai={150} className="max-w-md text-xl leading-relaxed">
              Une enseigne, ça se garde aussi : dix ans au-dessus d&apos;une vitrine. Envoie la photo de
              ta façade. Tu la reçois avec ton enseigne posée dessus.
            </Apparition>
            <div>
              <UnSeulBouton />
            </div>
            <Apparition as="p" delai={350} className="text-[15px]">Le montage est offert, que tu commandes ou non.</Apparition>
          </div>
          <Apparition de="zoom" delai={150} className="mx-auto w-full max-w-[300px] md:max-w-[440px]">
            <figure>
              <Facade id="ag-ouverture" enseigne="Boulangerie" nuit allumage className="rounded-[14px] shadow-[0_0_0_1px_rgba(244,241,234,.12),0_30px_80px_-20px_rgba(242,181,68,.4)]" />
              <figcaption className="sr-only">Une boutique la nuit, vue du trottoir d&apos;en face : son enseigne s&apos;allume au-dessus de la vitrine.</figcaption>
            </figure>
          </Apparition>
        </div>
        <p aria-hidden="true" className="relative -mb-[0.2em] mt-2 select-none text-center font-[family-name:var(--titres)] text-[24vw] italic leading-none text-[#F2B544] [text-shadow:0_0_40px_rgba(242,181,68,.5)] md:text-[17vw]">
          allumée
        </p>
      </section>

      {/* ---------- Avant / après ---------- */}
      {/* Sur téléphone : le titre, l'image, puis le texte — le film tient dans l'écran. */}
      <section id="avant-apres" className="scroll-mt-24 mx-auto grid max-w-7xl gap-x-12 gap-y-8 px-5 py-24 sm:px-8 md:grid-cols-[0.9fr_1.1fr] md:grid-rows-[auto_1fr] md:py-36">
        <h2 className="self-end text-[clamp(3.2rem,8vw,7rem)] font-normal leading-[0.92] tracking-[-0.03em]">
          Avant, <span className="italic text-[var(--accent-texte)]">après.</span>
        </h2>
        <Apparition de="zoom" className="mx-auto w-full max-w-[460px] md:col-start-2 md:row-span-2 md:row-start-1 md:self-center">
          <Comparaison
            id="fa-curseur"
            depart={45}
            etiquette="Glisser pour comparer la façade avant et après l'enseigne"
            avant={<Facade id="ag-aa-avant" />}
            apres={<Facade id="ag-aa-apres" enseigne="Boulangerie" />}
          />
        </Apparition>
        <div className="space-y-4">
          <Apparition as="p" className="max-w-md text-xl leading-relaxed">
            Glisse le trait : la même façade, sans puis avec son enseigne. Tu reçois exactement ça,
            sur ta photo à toi.
          </Apparition>
          <Apparition as="p" delai={120} className="text-[15px] text-[var(--doux)]">Montage d&apos;exemple, sur une façade dessinée.</Apparition>
        </div>
      </section>

      {/* ---------- Du papier au frigo ---------- */}
      <section className="border-t border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
          <div className="mb-6 space-y-6">
            <Apparition><Surtitre>Comment ça se passe</Surtitre></Apparition>
            <TitreRevele
              texte="Du papier *au frigo.*"
              className="text-[clamp(3rem,7vw,6.2rem)] font-normal italic leading-[0.95] tracking-[-0.03em]"
              classeAccent="not-italic text-[var(--accent-texte)]"
            />
          </div>
          <RecitColle
            etapes={etapesPapier.map((e) => ({
              surtitre: e.moment,
              titre: e.titre,
              texte: <p>{e.texte}</p>,
              visuel: <Image src={photos[e.photo].src} alt={photos[e.photo].alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />,
            }))}
          />
        </div>
      </section>

      {/* ---------- Le dossier en mairie, et la lumière ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
        <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
          <Apparition de="zoom" className="relative overflow-hidden rounded-[2.5rem] bg-[var(--accent)] p-8 text-[var(--sur-accent)] sm:p-12">
            <p className="text-sm font-bold uppercase tracking-[0.2em]">Le dossier en mairie</p>
            <blockquote className="mt-8 font-[family-name:var(--titres)] text-[clamp(2.2rem,4.6vw,4rem)] italic leading-[1.02]">
              « Une vue de l&apos;immeuble ou du lieu concerné avec et sans l&apos;enseigne »
            </blockquote>
            <p className="mt-4 text-[15px]">Code de l&apos;environnement, art. R. 581-16. Information générale : le règlement local de chaque commune s&apos;applique.</p>
            <p className="mt-10 max-w-lg text-xl leading-relaxed">
              Ton montage avant / après est justement une pièce du dossier, quand l&apos;enseigne doit être
              autorisée. On prépare les pièces : tu n&apos;as plus qu&apos;à signer et déposer.
            </p>
            <div className="mt-8">
              <Bouton href={`${DOSSIER}/dossier`} variante="clair">Voir le dossier</Bouton>
            </div>
          </Apparition>
          <div className="grid gap-5">
            <Apparition delai={150} className="relative min-h-[280px] overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
              <Image src={photos.ampoules.src} alt={photos.ampoules.alt} fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover opacity-50" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,30,68,.2),rgba(22,30,68,.95))]" />
              <div className="relative flex h-full flex-col justify-end gap-2 p-8">
                <p className="font-[family-name:var(--titres)] text-4xl italic leading-tight">Allumée. Jamais clignotante.</p>
                <p className="text-[15px]">Le clignotement est interdit, sauf pharmacies et services d&apos;urgence (art. R. 581-59).</p>
              </div>
            </Apparition>
            <Apparition delai={250} className="rounded-[2.5rem] border border-[var(--trait)] bg-[var(--carte)] p-8">
              <p className="font-[family-name:var(--titres)] text-3xl italic">Cinq façons d&apos;être vue.</p>
              <p className="mt-2 text-[var(--doux)]">Lettres boîtier, caisson, drapeau, lettres découpées, vitrophanie. Prix HT d&apos;exemple.</p>
              <Link href={`${DOSSIER}/enseignes`} className="mt-4 inline-block font-bold text-[var(--accent-texte)] underline underline-offset-4">Les enseignes et leurs prix</Link>
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Le lancement : les menus du restaurant d'en face ---------- */}
      <section className="overflow-hidden border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 md:grid-cols-2 md:items-center md:py-32">
          <Apparition de="zoom" className="relative py-6">
            <div aria-hidden="true" className={`absolute left-1/2 top-1/2 h-[90%] w-[70%] max-w-[300px] -translate-x-[62%] -translate-y-1/2 -rotate-[8deg] ${styles.kraft}`} />
            <MenuResto className="relative" />
          </Apparition>
          <div className="space-y-6">
            <Apparition><Surtitre>Restaurateurs du quartier</Surtitre></Apparition>
            <TitreRevele
              texte="Vos menus, *offerts.*"
              className="text-[clamp(3rem,7vw,6rem)] font-normal italic leading-[0.95] tracking-[-0.03em]"
              classeAccent="not-italic text-[var(--accent-texte)]"
            />
            <Apparition as="p" delai={150} className="text-xl leading-relaxed">
              Pour l&apos;ouverture de l&apos;atelier, on imprime gratuitement la première série de menus des
              restaurants d&apos;en face. Et en bas, en petit : imprimé par À Garder.
            </Apparition>
            <Apparition as="p" delai={250} className="text-[var(--doux)]">
              Le menu reste le vôtre : plats, prix et mentions sont ceux du restaurant. Nous, on
              l&apos;imprime. Séries suivantes hors taxes, sur devis.
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Questions ---------- */}
      <section id="questions" className="scroll-mt-24 mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-36 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="space-y-6">
          <Apparition><Surtitre>Vos questions</Surtitre></Apparition>
          <TitreRevele
            texte="Les questions *qu'on nous pose.*"
            className="text-[clamp(2.8rem,5.5vw,4.8rem)] font-normal italic leading-[0.95] tracking-[-0.03em]"
            classeAccent="not-italic text-[var(--accent-texte)]"
          />
        </div>
        <Apparition delai={150}>
          <Accordeon questions={questions.map((q) => ({ question: q.question, reponse: q.reponse }))} />
        </Apparition>
      </section>

      <AppelFinal />
    </main>
  );
}
