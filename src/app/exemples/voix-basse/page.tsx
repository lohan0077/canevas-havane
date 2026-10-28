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
import Annee, { Calendrier } from "./_composants/Annee";
import { AppelFinal, Bouton, Ciel, Croissant, Onde, Surtitre } from "./_composants/Blocs";
import Carnet from "./_composants/Carnet";
import Ouverture, { ChampSiSoir } from "./_composants/Ouverture";
import Question from "./_composants/Question";
import { ACTES, DATE_DES_TARIFS, DEROULE_CALME, DOSSIER, EQUIPE, ICI, QUESTIONS, SOIR, SOMBRE, cabinet, euros, photos } from "./_composants/donnees";

// Le site des deux vidéos des vétérinaires. De « Créer une marque » : le nom, « ici, on
// parle bas », la question du stress et le créneau calme, viens pour rien. De « Remplir
// l'agenda » : un seul champ sur l'accueil (sa date de naissance) et toute sa première
// année réservable, le visage du soir, la page de garde, les prix datés. Premier écran
// partagé en deux : la voix douce à gauche, le chat au soleil à droite.
export const metadata: Metadata = {
  title: "Voix Basse — cabinet vétérinaire, site de démonstration",
  description:
    "Le site d'un cabinet vétérinaire imaginaire où l'on parle bas : un créneau calme avant l'ouverture, toute la première année de ton chaton posée dès sa naissance, et un site qui change de visage le soir.",
  ...adressesDeLaPage("/exemples/voix-basse"),
};

const PHOTOS_CALME = [photos.chien, photos.caisse, photos.visite, photos.chaton];
const MIS_EN_AVANT = ["consultation", "rappel", "pour-rien"];

export default function VoixBasse() {
  return (
    <main>
      <Annee>
        <Ouverture />

        {/* ---------- Ce qui change ici, en défilant ---------- */}
        <div className="bg-[var(--accent)] py-5 text-[var(--sur-accent)]">
          <Defilant
            duree={48}
            separateur={<Onde className="h-4 w-12" />}
            elements={["On parle bas", "Créneau calme à 8 h", "Les chats attendent à part", "Viens pour rien", "Trente minutes par consultation", "Prix affichés et datés", "Le soir, qui appeler"]}
            classeElement="font-[family-name:var(--titres)] text-2xl italic whitespace-nowrap md:text-3xl"
          />
        </div>

        {/* ---------- Sa première année ---------- */}
        <section id="annee" className="scroll-mt-20 mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="space-y-7 px-1 lg:sticky lg:top-28">
            <Apparition><Surtitre>Un seul champ, sa date de naissance</Surtitre></Apparition>
            <TitreRevele
              texte="Sa première année, *posée dès la naissance.*"
              className="text-[clamp(2.8rem,5.6vw,5.2rem)] leading-[0.95] tracking-[-0.02em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
            <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed text-[var(--doux)]">
              Le site sort son année : chaque visite, avec sa date, réservable d&apos;un geste.
              L&apos;agenda ne dépend plus des urgences : il se remplit dès la naissance.
            </Apparition>
            <Apparition delai={250}>
              <a href="#naissance" className="font-semibold text-[var(--accent-texte)] underline underline-offset-4">Revenir au champ ↑</a>
            </Apparition>
            <ChampSiSoir />
          </div>
          <Apparition de="zoom">
            <Calendrier />
          </Apparition>
        </section>
      </Annee>

      {/* ---------- Une seule question ---------- */}
      <section className="px-3 sm:px-5">
        <div style={SOMBRE} className="relative overflow-hidden rounded-[2.5rem] bg-[var(--fond)] text-[var(--encre)]">
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(45%_55%_at_90%_10%,rgba(201,182,228,0.25),transparent_70%)]" />
          <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-10 md:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <Question />
            <div className="space-y-5 lg:pt-16">
              <Apparition de="rideau" className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
                <Image src={photos.caisse.src} alt={photos.caisse.alt} fill sizes="(min-width: 1024px) 420px, 100vw" className="object-cover" />
              </Apparition>
              <Apparition as="p" delai={150} className="text-lg leading-relaxed text-[var(--doux)]">
                « Un peu » ou « Beaucoup » : on te propose un créneau calme, avant l&apos;ouverture.
                La salle d&apos;attente est à toi. Même consultation, même prix.
              </Apparition>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Le créneau calme, en récit ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
        <div className="mb-10 space-y-6 md:mb-4">
          <Apparition><Surtitre>Le créneau calme</Surtitre></Apparition>
          <TitreRevele
            texte="Une demi-heure *avant tout le monde.*"
            className="max-w-4xl text-[clamp(2.8rem,6vw,5.6rem)] leading-[0.95] tracking-[-0.02em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
        </div>
        <RecitColle
          etapes={DEROULE_CALME.map((d, i) => ({
            surtitre: d.heure,
            titre: ["Personne dans la cour.", "La salle est à toi.", "Il sort quand il veut.", "Déjà repartis."][i],
            texte: <p>{d.texte}</p>,
            visuel: <Image src={PHOTOS_CALME[i].src} alt={PHOTOS_CALME[i].alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />,
          }))}
        />
      </section>

      {/* ---------- Ce qui change ici ---------- */}
      <section id="ici" className="scroll-mt-24 border-y border-[var(--trait)] bg-[var(--carte)] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-14 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div className="space-y-6">
              <Apparition><Surtitre>Ce qui change ici</Surtitre></Apparition>
              <TitreRevele
                texte="Pas des soins d'abord. *Du calme.*"
                className="text-[clamp(2.8rem,6vw,5.6rem)] leading-[0.95] tracking-[-0.02em]"
                classeAccent="italic text-[var(--accent-texte)]"
              />
            </div>
            <Apparition as="p" delai={150} className="text-lg leading-relaxed text-[var(--doux)]">
              Tout commence quand ton chat voit sa caisse… et file sous le lit. Alors on change ce
              qui se passe avant, pendant et après.
            </Apparition>
          </div>
          <ul className="grid gap-4 md:grid-cols-3">
            {ICI.map((x, i) => (
              <Apparition as="li" key={x.titre} delai={(i % 3) * 110} de="zoom" className={i === 0 ? "md:row-span-2" : ""}>
                <CarteLueur className="h-full rounded-[2rem]">
                  <div className={`flex h-full flex-col justify-between gap-6 rounded-[2rem] border border-[var(--trait)] p-7 ${i === 0 ? "bg-[var(--accent)] text-[var(--sur-accent)]" : "bg-[var(--fond)]"}`}>
                    <p className="font-[family-name:var(--titres)] text-[1.1rem] italic tabular-nums">0{i + 1}</p>
                    <div className="space-y-2">
                      <h3 className={i === 0 ? "text-[3.4rem] leading-[0.95]" : "text-3xl"}>{x.titre}</h3>
                      <p className={`leading-relaxed ${i === 0 ? "" : "text-[var(--doux)]"}`}>{x.texte}</p>
                    </div>
                  </div>
                </CarteLueur>
              </Apparition>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Viens pour rien ---------- */}
      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div className="space-y-8">
          <Apparition><Surtitre>Pour l&apos;ouverture du cabinet</Surtitre></Apparition>
          <TitreRevele
            texte="Viens *pour rien.*"
            className="text-[clamp(4rem,10vw,9rem)] leading-[0.88] tracking-[-0.03em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
          <Apparition as="p" delai={150} className="max-w-md text-xl leading-relaxed text-[var(--doux)]">
            Tu passes avec ton chat. Il renifle, il a une friandise, il repart. Aucun soin. Pour
            que la prochaine fois, la caisse redevienne juste une caisse.
          </Apparition>
          <Apparition delai={250}>
            <Bouton href={`${DOSSIER}/pour-rien`}>Choisir un moment</Bouton>
          </Apparition>
        </div>
        <Apparition de="zoom" delai={200}>
          <Carnet />
        </Apparition>
      </section>

      {/* ---------- Les prix, datés ---------- */}
      <section id="tarifs" className="scroll-mt-24 px-3 sm:px-5">
        <div className="rounded-[2.5rem] bg-[#EFE8F7] px-5 py-20 text-[#2F4A3E] sm:px-10 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
              <div className="space-y-6">
                <p className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.2em] text-[#62489A]"><Onde className="h-4 w-12" />Tarifs au {DATE_DES_TARIFS}</p>
                <TitreRevele
                  texte="Le prix, *avant la question.*"
                  className="text-[clamp(2.8rem,6vw,5.6rem)] leading-[0.95] tracking-[-0.02em]"
                  classeAccent="italic text-[#62489A]"
                />
              </div>
              <Apparition as="p" delai={150} className="text-lg leading-relaxed">
                Ce qui est compris, ce qui peut s&apos;ajouter, et la date. Prix TTC d&apos;exemple :
                le cabinet est fictif.
              </Apparition>
            </div>
            <ul className="grid gap-4 md:grid-cols-3">
              {ACTES.filter((a) => MIS_EN_AVANT.includes(a.id)).map((a, i) => (
                <Apparition as="li" key={a.id} delai={i * 120} de="zoom">
                  <div className="flex h-full flex-col rounded-[2rem] bg-white p-7">
                    <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#62489A]">{a.nom}</p>
                    <p className="mt-4 font-[family-name:var(--titres)] text-[4.2rem] leading-none tabular-nums">{euros(a.prix)}</p>
                    <ul className="mt-6 space-y-1.5 border-t border-[#E4DDD0] pt-4 text-[15px]">
                      {a.compris.slice(0, 3).map((c) => (
                        <li key={c} className="flex gap-2"><span aria-hidden="true">✓</span>{c}</li>
                      ))}
                    </ul>
                  </div>
                </Apparition>
              ))}
            </ul>
            <Apparition delai={200} className="mt-10">
              <Link href={`${DOSSIER}/tarifs`} className="inline-flex min-h-13 items-center gap-3 rounded-full bg-[#2F4A3E] px-6 py-3 text-[15px] font-semibold text-[#FBF7EF]">
                Tous les actes, compris et ajouts <span aria-hidden="true">→</span>
              </Link>
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Le soir ---------- */}
      <section className="px-3 py-3 sm:px-5 sm:py-5">
        <div style={SOIR} className="relative isolate overflow-hidden rounded-[2.5rem] bg-[var(--fond)] text-[var(--encre)]">
          <Ciel />
          <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-10 md:py-28 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div className="space-y-7">
              <Apparition><Surtitre>Après 19 h, le dimanche</Surtitre></Apparition>
              <TitreRevele
                texte="Le soir, le site *change de visage.*"
                className="text-[clamp(2.8rem,6vw,5.6rem)] leading-[0.95] tracking-[-0.02em]"
                classeAccent="italic text-[var(--accent-texte)]"
              />
              <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed text-[var(--doux)]">
                Vingt-trois heures, ton chien ne tient plus debout. En haut de l&apos;accueil : qui
                appeler, où aller. Et une seule page pour tout le reste.
              </Apparition>
              <Apparition delai={250}>
                <Bouton href={`${DOSSIER}/garde`}>La page de garde</Bouton>
              </Apparition>
            </div>
            <Apparition de="zoom" delai={200} className="rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] p-7">
              <div className="flex items-center gap-3">
                <Croissant className="h-6 w-6 text-[var(--accent-texte)]" />
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Vétérinaire de garde</p>
              </div>
              <p className="mt-4 font-[family-name:var(--titres)] text-4xl">{cabinet.garde.nom}</p>
              <p className="mt-1 text-[var(--doux)]">à {cabinet.garde.distance} · {cabinet.garde.trajet} · exemple</p>
              <p className="mt-6 font-[family-name:var(--titres)] text-5xl tabular-nums">{cabinet.garde.telephone}</p>
              <p className="mt-2 text-sm text-[var(--doux)]">Numéro de fiction : il ne sonne chez personne.</p>
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- L'équipe ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
        <div className="mb-12 space-y-6">
          <Apparition><Surtitre>L&apos;équipe</Surtitre></Apparition>
          <TitreRevele
            texte="Trois voix, *toutes basses.*"
            className="text-[clamp(2.8rem,6vw,5.6rem)] leading-[0.95] tracking-[-0.02em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
        </div>
        <ul className="grid gap-4 md:grid-cols-3">
          {EQUIPE.map((e, i) => (
            <Apparition as="li" key={e.initiales} delai={i * 120} className="rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] p-7">
              <p aria-hidden="true" className="grid h-20 w-20 place-items-center rounded-full bg-[var(--accent)] font-[family-name:var(--titres)] text-3xl text-[var(--sur-accent)]">{e.initiales}</p>
              <p className="mt-6 text-sm font-bold uppercase tracking-[0.14em] text-[var(--accent-texte)]">{e.initiales} · {e.role}</p>
              <p className="mt-2 font-[family-name:var(--titres)] text-3xl italic leading-tight">{e.phrase}</p>
            </Apparition>
          ))}
        </ul>
        <p className="mt-6 text-sm text-[var(--doux)]">Équipe d&apos;exemple, présentée par ses initiales : le cabinet est fictif.</p>
      </section>

      {/* ---------- Questions ---------- */}
      <section id="questions" className="scroll-mt-24 mx-auto grid max-w-7xl gap-12 px-5 pb-24 sm:px-8 md:pb-32 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="space-y-6">
          <Apparition><Surtitre>Questions</Surtitre></Apparition>
          <TitreRevele
            texte="Tout bas, *tes questions.*"
            className="text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.95] tracking-[-0.02em]"
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
