import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Appeler from "../_composants/Appeler";
import { Faq, Intitule, Section } from "../_composants/Blocs";
import { Ciel, EtatDuCabinet } from "../_composants/Ouverture";
import Plan from "../_composants/Plan";
import { Croissant } from "../_composants/EnTete";
import { DOSSIER, cabinet } from "../_composants/donnees";

// La page de garde : celle qu'on ouvre à vingt-trois heures. Une seule page, qui dit
// qui appeler et où aller. Elle met en œuvre une obligation réelle : le vétérinaire
// assure la continuité des soins et en informe le public (Code rural, R242-48, IV).
// Le service de garde, son adresse et son numéro sont fictifs.
export const metadata: Metadata = {
  title: "La garde — Douze Lunes, site de démonstration",
  description: "Votre animal ne va pas bien et le cabinet est fermé : qui appeler cette nuit, où aller. Page de démonstration d'un cabinet vétérinaire imaginaire.",
  ...adressesDeLaPage("/exemples/douze-lunes/garde"),
};

const SIGNES = [
  "Il respire mal, la bouche ouverte, ou ses gencives sont pâles ou bleues",
  "Il ne tient plus debout, ou il est tombé et ne se relève pas",
  "Il a avalé un produit, un médicament ou une plante dont vous doutez",
  "Il saigne et cela ne s'arrête pas",
  "Son ventre gonfle et il essaie de vomir sans y arriver",
  "Un chat mâle va et revient de sa litière sans uriner",
];

const EMPORTER = ["Son carnet de santé", "L'emballage de ce qu'il a avalé, s'il y en a un", "Une couverture, et sa caisse pour un chat"];

const QUESTIONS_GARDE = [
  {
    q: "Combien coûte une consultation de garde ?",
    r: "Le service de garde a son propre tarif, plus élevé la nuit et le dimanche. Il vous le donne au téléphone, avant que vous partiez.",
  },
  {
    q: "Et si j'hésite à appeler ?",
    r: "Appelez quand même. Le vétérinaire de garde vous dira s'il faut venir tout de suite, ou si cela peut attendre l'ouverture du cabinet.",
  },
  {
    q: "Le cabinet aura-t-il le compte rendu ?",
    r: "Oui : le service de garde nous le transmet, et nous reprenons le suivi dès l'ouverture.",
  },
];

export default function Garde() {
  return (
    <main>
      <section data-film="garde" className="relative overflow-hidden">
        <Ciel />
        <div className="relative mx-auto max-w-3xl space-y-8 px-5 pb-16 pt-10 sm:px-6 sm:pt-16">
          <p className="inline-flex items-center gap-2 rounded-full border border-[var(--trait)] bg-[var(--carte)] px-4 py-2 text-sm font-bold">
            <Croissant className="h-4 w-4 text-[var(--accent-texte)]" />
            <EtatDuCabinet />
          </p>
          <div className="space-y-4">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Urgence cette nuit</p>
            <h1 className="text-[44px] sm:text-6xl">Votre animal ne va pas bien&nbsp;?</h1>
          </div>
          <div data-film="carte-garde" className="rounded-[28px] border border-[var(--trait)] bg-[var(--carte)] p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--doux)]">Vétérinaire de garde ce soir</p>
              <p className="font-[family-name:var(--titres)] text-3xl sm:text-4xl">{cabinet.garde.nom}</p>
              <p className="text-[var(--doux)]">à {cabinet.garde.distance} · ouvert toute la nuit · {cabinet.garde.adresse}</p>
            </div>
            <Appeler numero={cabinet.garde.telephone} />
            <Plan depart="Le cabinet" arrivee="La garde" duree={`${cabinet.garde.distance}, ${cabinet.garde.trajet}`} />
            <p className="text-sm text-[var(--doux)]">
              Exemple : le service de garde, son adresse et son numéro sont fictifs. Sur un vrai
              site, cette carte affiche la garde du soir, mise à jour chaque jour.
            </p>
          </div>
        </div>
      </section>

      <Section className="grid gap-12 lg:grid-cols-2">
        <div className="space-y-8">
          <Intitule surtitre="N'attendez pas" titre="Les signes qui n'attendent pas le matin." pleines={12} />
          <ul className="space-y-3">
            {SIGNES.map((s) => (
              <li key={s} className="flex gap-3 rounded-2xl border border-[var(--trait)] bg-[var(--carte)] p-4 leading-snug">
                <span aria-hidden="true" className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--accent)]" />
                {s}
              </li>
            ))}
          </ul>
          <p className="text-[var(--doux)]">En cas de doute, appelez : c&apos;est le rôle de la garde.</p>
        </div>
        <div className="space-y-8">
          <Intitule surtitre="Avant de partir" titre="Ce qu'il faut emporter." pleines={6} />
          <ul className="space-y-3">
            {EMPORTER.map((s) => (
              <li key={s} className="flex items-center gap-3 border-b border-[var(--trait)] pb-3 text-lg">
                <span aria-hidden="true" className="font-bold text-[var(--accent-texte)]">✓</span>
                {s}
              </li>
            ))}
          </ul>
          <p className="leading-relaxed text-[var(--doux)]">
            Ne lui donnez ni à manger ni médicament sans l&apos;avis du vétérinaire de garde :
            il vous dira au téléphone quoi faire en attendant.
          </p>
        </div>
      </Section>

      <Section className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Intitule surtitre="La continuité des soins" titre="Fermés, mais pas absents." pleines={9}>
          Hors de nos horaires, la garde est assurée par le service de garde du secteur, dans
          le cadre d&apos;une convention entre vétérinaires. Notre code de déontologie nous
          demande de vous le dire (Code rural, art. R242-48) : nous le disons en haut de
          l&apos;écran, le soir venu.
        </Intitule>
        <Faq questions={QUESTIONS_GARDE} />
      </Section>

      <Section className="pt-0 text-center">
        <Link href={DOSSIER} className="inline-flex min-h-[52px] items-center rounded-full border-2 border-[var(--accent)] px-7 font-bold">
          Revenir à l&apos;accueil
        </Link>
      </Section>
    </main>
  );
}
