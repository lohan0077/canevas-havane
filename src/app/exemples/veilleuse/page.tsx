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
import Affiche from "./_composants/Affiche";
import { AppelFinal, Bouton, Surtitre } from "./_composants/Blocs";
import Devis from "./_composants/Devis";
import EspaceClient from "./_composants/EspaceClient";
import RapportDeNuit from "./_composants/RapportDeNuit";
import { DOSSIER, ETAPES, OFFRES, QUESTIONS, RONDES, entreprise, photos } from "./_composants/donnees";

// L'accueil de Veilleuse, la société de sécurité privée des deux vidéos de la
// sécurité. De « Créer une marque » : pas de bouclier, une veilleuse ; qui vient ce
// soir ; l'affiche « On veille. Tu dors. ». De « Remplir l'agenda » : un lundi matin où
// il ne s'est rien passé ; le rapport de 7 h (#rapport, filmé) ; le devis en trois
// questions ; une page par besoin ; les mentions du CNAPS en évidence au pied.
export const metadata: Metadata = {
  title: "Veilleuse — sécurité privée, site de démonstration",
  description:
    "Le site d'une société de sécurité privée imaginaire qui vend le sommeil, pas la peur : qui vient ce soir, le rapport de la nuit à 7 h, un devis en trois questions.",
  ...adressesDeLaPage("/exemples/veilleuse"),
};

const JOURNAL = RONDES.flatMap((r) => [r.heure, r.note]).concat(["07 h 00", "Rien à signaler."]);

export default function Veilleuse() {
  return (
    <main>
      {/* ---------- Premier écran : la nuit, et quatre mots ---------- */}
      <section className="kit-grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <FondVivant couleurs={["#0C1813", "#1F3A2E", "#9C7A2C"]} vitesse={0.55} />
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_45%,rgba(26,43,36,0.35),rgba(26,43,36,0.85))]" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-9 px-5 pb-12 pt-36 text-center sm:px-8">
          <Apparition de="zoom" aria-hidden="true">
            <span className="relative block h-16 w-16">
              <span className="absolute inset-0 rounded-full bg-[var(--accent)] opacity-30 blur-xl motion-safe:animate-pulse" />
              <span className="absolute inset-[22%] rounded-full bg-[var(--accent)] shadow-[0_0_40px_14px_rgba(244,201,93,0.45)]" />
            </span>
          </Apparition>
          <Apparition delai={150}><Surtitre clair>Sécurité privée · {entreprise.ville}</Surtitre></Apparition>
          <TitreRevele
            as="h1"
            auChargement
            delai={200}
            texte="On veille. *Tu dors.*"
            className="max-w-5xl text-[clamp(4.4rem,15vw,13rem)] font-normal leading-[0.88] tracking-[-0.03em]"
            classeAccent="text-[var(--accent)]"
          />
          <Apparition delai={700} as="p" className="max-w-xl text-xl leading-relaxed">
            Ta maison quand tu pars, ton commerce la nuit, ton chantier le week-end. Chaque soir,
            tu sais qui vient. Chaque matin à 7 h, tu sais comment s&apos;est passée la nuit.
          </Apparition>
          <Apparition delai={900} className="flex flex-col gap-3 sm:flex-row">
            <Bouton href={`${DOSSIER}/ce-soir`}>Qui vient ce soir&nbsp;?</Bouton>
            <Bouton href={`${DOSSIER}/devis`} variante="contour">Devis en 3 questions</Bouton>
          </Apparition>
        </div>
        <Apparition as="ul" delai={1100} className="relative mx-auto grid w-full max-w-6xl gap-3 px-5 pb-8 text-[15px] sm:grid-cols-3 sm:px-8">
          {[
            ["Le rapport à 7 h", "les rondes, l'heure, la photo"],
            ["Dès 45 € TTC la nuit", "ta maison, prix d'exemple"],
            ["Autorisation CNAPS", "numéro au pied de chaque page"],
          ].map(([fort, doux]) => (
            <li key={fort} className="flex items-baseline justify-between gap-3 rounded-full border border-white/15 bg-[var(--sombre)]/80 px-5 py-3 backdrop-blur-md">
              <span className="font-bold">{fort}</span>
              <span className="text-[13px]">{doux}</span>
            </li>
          ))}
        </Apparition>
      </section>

      {/* ---------- Le journal de la nuit, qui défile ---------- */}
      <div className="bg-[var(--accent)] py-4 text-[var(--sur-accent)]">
        <Defilant
          duree={52}
          elements={JOURNAL}
          separateur="●"
          classeElement="font-[family-name:var(--titres)] text-xl whitespace-nowrap md:text-2xl"
        />
      </div>

      {/* ---------- Le contre-pied ---------- */}
      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 md:py-36 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div className="space-y-7">
          <Apparition><Surtitre>Pourquoi une veilleuse</Surtitre></Apparition>
          <TitreRevele
            texte="Tu ne veux pas avoir peur. *Tu veux dormir.*"
            className="text-[clamp(3rem,7vw,6.2rem)] font-normal leading-[0.98] tracking-[-0.02em]"
            classeAccent="text-[var(--accent-texte)]"
          />
          <Apparition as="p" delai={150} className="max-w-xl text-xl leading-relaxed text-[var(--doux)]">
            On ne vend pas de la peur. On vend un lundi matin où il ne s&apos;est rien passé. Comme la
            petite lumière qui reste allumée toute la nuit dans une chambre d&apos;enfant : elle ne
            fait pas peur, elle rassure.
          </Apparition>
        </div>
        <Apparition className="space-y-5">
          <ul className="space-y-1">
            {["Pas de bouclier.", "Pas d'aigle.", "Pas de noir.", "Pas de nom en anglais."].map((p) => (
              <li key={p} className="font-[family-name:var(--titres)] text-[clamp(2rem,4vw,3.2rem)] leading-tight text-[var(--doux)]">
                <span className="kit-barre">{p}</span>
              </li>
            ))}
          </ul>
          <p className="text-[15px] leading-relaxed text-[var(--doux)]">
            La loi va dans le même sens : ni le nom ni le logo d&apos;une société de sécurité privée ne
            doivent prêter à confusion avec la police (Code de la sécurité intérieure, art. L612-3
            et R631-12).
          </p>
        </Apparition>
      </section>

      {/* ---------- Le rapport de 7 h : l'outil, comme une application ---------- */}
      <section id="rapport" className="scroll-mt-0 px-3 sm:px-5">
        <div className="kit-grain relative overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(244,201,93,.22),transparent_65%)]" />
          <div className="relative mx-auto grid max-w-6xl gap-14 px-6 py-24 sm:px-10 md:py-32 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="space-y-7">
              <Apparition><Surtitre clair>Le rapport de 7 h</Surtitre></Apparition>
              <TitreRevele
                texte={"Chaque matin à 7 h, *la nuit racontée.*"}
                className="text-[clamp(3rem,6.6vw,5.8rem)] font-normal leading-[0.98] tracking-[-0.02em]"
                classeAccent="text-[var(--accent)]"
              />
              <Apparition as="ul" delai={150} className="space-y-3 text-lg">
                {["Les rondes, à des heures qui varient d'une nuit à l'autre.", "L'heure de chaque passage, et ce qui a été vérifié.", "Une photo du site à chaque ronde : jamais une personne."].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
                    {t}
                  </li>
                ))}
              </Apparition>
              <Apparition as="p" delai={250} className="text-[15px]">Rejoue la nuit d&apos;exemple avec le curseur : les rondes tombent à leur heure.</Apparition>
            </div>
            <Apparition de="droite" delai={150} className="text-[var(--encre)]">
              <div className="rounded-[2.2rem] bg-white/10 p-2.5 ring-1 ring-white/15 shadow-[0_50px_100px_-40px_rgba(0,0,0,.8)]">
                <RapportDeNuit />
              </div>
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Une page par besoin, en bento ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36">
        <div className="mb-14 grid gap-6 lg:grid-cols-[1fr_0.75fr] lg:items-end">
          <div className="space-y-6">
            <Apparition><Surtitre>Une page par besoin</Surtitre></Apparition>
            <TitreRevele
              texte="Tes mots, *pas les nôtres.*"
              className="text-[clamp(3rem,7vw,6.2rem)] font-normal leading-[0.98] tracking-[-0.02em]"
              classeAccent="text-[var(--accent-texte)]"
            />
          </div>
          <Apparition as="p" delai={150} className="text-lg leading-relaxed text-[var(--doux)]">
            « Gardiennage de chantier », « agent de sécurité pour un mariage » : ce que les gens
            tapent, une page chacun, avec le prix d&apos;exemple et le déroulé.
          </Apparition>
        </div>
        <ul className="grid gap-5 md:grid-cols-6">
          {OFFRES.map((o, i) => (
            <Apparition as="li" key={o.titre} delai={i * 110} de="zoom" className={i === 0 || i === 3 ? "md:col-span-4" : "md:col-span-2"}>
              <CarteLueur className="group h-full rounded-[2rem]">
                <Link href={o.href} className="relative flex h-[380px] flex-col justify-end overflow-hidden rounded-[2rem] bg-[var(--sombre)] p-7 text-[var(--sur-sombre)] md:h-[440px]">
                  <Image src={photos[o.photo].src} alt={photos[o.photo].alt} fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover opacity-55 transition-transform duration-[1.4s] ease-out group-hover:scale-[1.06]" />
                  <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,43,36,0.1)_25%,rgba(26,43,36,0.96)_100%)]" />
                  <span className="relative space-y-2">
                    <span className="block text-[13px] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">{o.prix} · exemple</span>
                    <span className="block font-[family-name:var(--titres)] text-[2rem] leading-[1.05]">{o.titre}</span>
                    <span className="block max-w-md text-[15px]">{o.texte}</span>
                  </span>
                </Link>
              </CarteLueur>
            </Apparition>
          ))}
        </ul>
      </section>

      {/* ---------- Qui vient ce soir ---------- */}
      <section className="border-y border-[var(--trait)] bg-[#E9DFCB]">
        <div className="mx-auto grid max-w-6xl gap-14 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-7">
            <Apparition><Surtitre>Ton espace client</Surtitre></Apparition>
            <TitreRevele
              texte="Qui vient ce soir. *Son prénom.*"
              className="text-[clamp(3rem,6.6vw,5.8rem)] font-normal leading-[0.98] tracking-[-0.02em]"
              classeAccent="text-[var(--accent-texte)]"
            />
            <Apparition as="p" delai={150} className="text-xl leading-relaxed">
              Et les références de sa carte professionnelle. La loi te permet de les demander : on
              te les donne avant que tu demandes, dans ton espace, et nulle part ailleurs.
            </Apparition>
            <Apparition as="blockquote" delai={250} className="rounded-[1.6rem] border border-[var(--trait)] bg-[var(--carte)] p-6">
              <p className="text-[17px] leading-relaxed">
                Qui a recours à une entreprise de sécurité privée « peut demander communication des
                références de la carte professionnelle de chacun des employés participant à
                l&apos;exécution de la prestation. »
              </p>
              <footer className="mt-3 text-sm text-[var(--doux)]">Code de la sécurité intérieure, art. L612-15</footer>
            </Apparition>
          </div>
          <Apparition de="droite" delai={150}>
            <div className="rounded-[2.4rem] bg-[var(--sombre)] p-3 shadow-[0_50px_100px_-50px_rgba(26,43,36,.9)]">
              <EspaceClient />
            </div>
          </Apparition>
        </div>
      </section>

      {/* ---------- Comment ça se passe ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
        <div className="mb-6 space-y-6">
          <Apparition><Surtitre>La première semaine</Surtitre></Apparition>
          <TitreRevele
            texte="Quatre choses, *et tu dors.*"
            className="text-[clamp(3rem,7vw,6.2rem)] font-normal leading-[0.98] tracking-[-0.02em]"
            classeAccent="text-[var(--accent-texte)]"
          />
        </div>
        <RecitColle
          etapes={ETAPES.map((e) => ({
            surtitre: e.moment,
            titre: e.titre,
            texte: <p>{e.texte}</p>,
            visuel: <Image src={photos[e.photo].src} alt={photos[e.photo].alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />,
          }))}
        />
      </section>

      {/* ---------- Le devis en trois questions ---------- */}
      <section className="px-3 sm:px-5">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[var(--accent)] text-[var(--sur-accent)]">
          <div className="mx-auto grid max-w-6xl gap-14 px-6 py-24 sm:px-10 md:py-32 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div className="space-y-7">
              <p className="text-[12px] font-bold uppercase tracking-[0.22em]">Le devis</p>
              <TitreRevele
                texte="Quoi. Où. *Combien de nuits.*"
                className="text-[clamp(3rem,6.6vw,5.8rem)] font-normal leading-[0.98] tracking-[-0.02em]"
              />
              <Apparition as="p" delai={150} className="max-w-md text-xl leading-relaxed">
                Trois réponses, et la fourchette s&apos;affiche tout de suite. HT pour un professionnel,
                TTC pour un particulier. Le prix ferme vient après la visite, gratuite.
              </Apparition>
            </div>
            <Apparition de="zoom" delai={150} className="text-[var(--encre)]">
              <Devis />
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- L'affiche de lancement ---------- */}
      <section className="mx-auto grid max-w-6xl gap-14 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-2 lg:items-center">
        <div className="space-y-7">
          <Apparition><Surtitre>Bientôt sur les murs</Surtitre></Apparition>
          <TitreRevele
            texte="Une seule *affiche.*"
            className="text-[clamp(3rem,7vw,6.2rem)] font-normal leading-[0.98] tracking-[-0.02em]"
            classeAccent="text-[var(--accent-texte)]"
          />
          <Apparition as="p" delai={150} className="max-w-md text-xl leading-relaxed text-[var(--doux)]">
            Quatre mots, une lune. Et en bas, comme sur tout ce que nous publions, le numéro de notre
            autorisation et la phrase que la loi impose.
          </Apparition>
        </div>
        <Apparition de="zoom"><Affiche /></Apparition>
      </section>

      {/* ---------- Questions ---------- */}
      <section id="questions" className="scroll-mt-24 border-t border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="space-y-6">
            <Apparition><Surtitre>Tes questions</Surtitre></Apparition>
            <TitreRevele
              texte="Ce qu'on nous demande, *la nuit.*"
              className="text-[clamp(2.8rem,5.4vw,4.6rem)] font-normal leading-[0.98] tracking-[-0.02em]"
              classeAccent="text-[var(--accent-texte)]"
            />
          </div>
          <Apparition delai={150}>
            <Accordeon questions={QUESTIONS} />
          </Apparition>
        </div>
      </section>

      <div className="h-3 bg-[var(--carte)] sm:h-5" />
      <div className="bg-[var(--carte)]">
        <AppelFinal />
      </div>
    </main>
  );
}
