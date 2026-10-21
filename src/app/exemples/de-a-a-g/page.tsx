import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { Barres, Certification, Intitule, Section, Tuile } from "./_composants/Blocs";
import Diagnostics from "./_composants/Diagnostics";
import { COULEURS, DOSSIER, FAQ, LETTRES, PRIX, TARIFS, euros } from "./_composants/donnees";

// L'accueil de De A à G. Les idées de la vidéo, en état de marche : le client, c'est le
// propriétaire ; trois questions sur l'accueil, et le site sort la liste des diagnostics
// avec le prix (fiches Service-Public F10798 et F33463) ; une page par lettre du DPE ; le
// rendez-vous en ligne, la certification en vue. Aucune entreprise de travaux recommandée.
export const metadata: Metadata = {
  title: "De A à G — site de démonstration",
  description: "Site de démonstration d'un cabinet de diagnostic immobilier imaginaire, réalisé par Canevas Havane : trois questions, la liste de tes diagnostics et leur prix, sans appeler personne.",
  ...adressesDeLaPage("/exemples/de-a-a-g"),
};

const ETAPES = [
  { titre: "Trois questions", texte: "Ton bien, son permis de construire, vente ou location. La liste et le prix s'affichent." },
  { titre: "Ton créneau", texte: "Tu le choisis en ligne. La certification de celui qui vient est écrite dessus." },
  { titre: "La visite", texte: "Une à trois heures selon le bien. Tu peux suivre, poser tes questions." },
  { titre: "Le rapport", texte: "Sous 48 h (exemple), avec une page qui dit en clair ce qu'il contient." },
];

export default function DeAaG() {
  return (
    <>
      <section id="questions" className="scroll-mt-20">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 pb-14 pt-8 sm:px-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-4">
            <div className="space-y-4 px-1 pt-2">
              <p className="inline-flex items-center gap-2 rounded-full bg-[var(--carte)] px-3.5 py-1.5 text-[13px] font-semibold text-[var(--accent-texte)] ring-1 ring-[var(--trait)]">
                <Barres />
                Diagnostic immobilier · vente et location
              </p>
              <h1 className="text-[44px] font-bold leading-[0.98] tracking-[-0.04em] sm:text-[68px]">
                Tes diagnostics, <span className="text-[var(--accent-texte)]">en trois questions.</span>
              </h1>
              <p className="max-w-lg text-[17px] leading-relaxed text-[var(--doux)]">
                Maison ou appartement, permis de construire, vente ou location : le site sort la liste
                de tes diagnostics, avec le prix. Sans appeler personne.
              </p>
            </div>
            <Diagnostics />
          </div>

          <div className="grid content-start gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <Tuile teinte="beurre" className="space-y-4">
              <p className="text-[14px] font-semibold text-[var(--doux)]">Chaque lettre a sa page</p>
              <ol className="space-y-1.5">
                {LETTRES.map((l, i) => (
                  <li key={l}>
                    <Link
                      href={`${DOSSIER}/dpe/${l}`}
                      className="flex h-9 items-center justify-between rounded-r-[10px] px-3 text-[15px] font-bold"
                      style={{ background: COULEURS[l][0], color: COULEURS[l][1], width: `${46 + i * 9}%` }}
                    >
                      {l.toUpperCase()}
                      <span aria-hidden="true" className="text-[13px]">→</span>
                      <span className="sr-only">: ce que le DPE {l.toUpperCase()} change pour toi</span>
                    </Link>
                  </li>
                ))}
              </ol>
              <p className="text-[14px] text-[var(--doux)]">Vendre, louer, l&apos;annonce : ce que ta lettre change.</p>
            </Tuile>
            <Tuile className="space-y-3">
              <div className="flex items-center gap-3 rounded-[18px] bg-[var(--fond)] p-3 ring-1 ring-[var(--trait)]">
                <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-[var(--sur-accent)]">✓</span>
                <span className="min-w-0">
                  <span className="block text-[14px] font-semibold">Rapport envoyé</span>
                  <span className="block text-[13px] text-[var(--doux)]">Maison · permis 1985 · 3 diagnostics · exemple</span>
                </span>
              </div>
              <p className="font-[family-name:var(--titres)] text-[34px] font-bold leading-none tracking-[-0.03em]">48&nbsp;h</p>
              <p className="text-[14px] text-[var(--doux)]">Le délai d&apos;envoi du rapport après la visite, dans cet exemple.</p>
            </Tuile>
            <Tuile teinte="lilas">
              <Certification />
            </Tuile>
          </div>
        </div>
      </section>

      <Section className="grid gap-4 pt-0 lg:grid-cols-3">
        <Tuile teinte="menthe" className="space-y-4 lg:col-span-2">
          <Intitule surtitre="Ton client, c'est toi" titre="Pas besoin qu'une agence t'envoie." >
            Le diagnostic, c&apos;est le propriétaire qui le commande et qui le paie. Alors le site lui parle
            à lui : la liste, le prix, le créneau. Ton agence peut te donner un nom ; tu restes libre de
            choisir ton diagnostiqueur.
          </Intitule>
          <p className="max-w-2xl rounded-[18px] bg-[var(--carte)] p-4 text-[15px] leading-relaxed ring-1 ring-[var(--trait)]">
            Comme tout diagnostiqueur : aucun lien avec l&apos;agence qui vend ton bien, ni avec une
            entreprise de travaux, et aucun avantage accordé à qui que ce soit pour être recommandé
            (code de la construction et de l&apos;habitation, art. L271-6 et R271-3).
          </p>
        </Tuile>
        <div className="relative min-h-[320px] overflow-hidden rounded-[28px]">
          <Image src="/exemples/de-a-a-g/radiateur-mur-vert.webp" alt="Un radiateur en fonte blanc contre un mur vert pâle, dans une ombre de fenêtre" fill sizes="(min-width: 1024px) 360px, 100vw" className="object-cover" />
        </div>
      </Section>

      <Section id="prix" className="space-y-10 pt-0">
        <Intitule surtitre="Combien ça coûte" titre="Les prix, avant de réserver.">
          Ce que les gens tapent : «&nbsp;combien coûte un diagnostic immobilier pour une vente&nbsp;». La réponse,
          diagnostic par diagnostic. Toutes taxes comprises, prix d&apos;exemple.
        </Intitule>
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <Tuile className="p-2 sm:p-3">
            <ul className="divide-y divide-[var(--trait)]">
              {TARIFS.map((t) => (
                <li key={t.nom} className="flex items-baseline justify-between gap-4 px-4 py-3.5">
                  <span className="text-[16px]">{t.nom}</span>
                  <span className="shrink-0 font-[family-name:var(--titres)] text-[20px] font-bold tabular-nums">{t.prix}</span>
                </li>
              ))}
            </ul>
          </Tuile>
          <div className="grid gap-4">
            <Tuile teinte="peche" className="space-y-2">
              <p className="text-[14px] font-semibold text-[var(--doux)]">Exemple : maison, permis de 1985, vente</p>
              <p className="font-[family-name:var(--titres)] text-[44px] font-bold leading-none tracking-[-0.03em] tabular-nums">{euros(PRIX.dpe + PRIX.amiante + PRIX.electricite)}</p>
              <p className="text-[15px]">DPE, amiante et électricité, TTC. Prix d&apos;exemple.</p>
            </Tuile>
            <Tuile teinte="menthe" className="space-y-2">
              <p className="text-[15px] leading-relaxed">
                Un diagnostic qui ne s&apos;applique pas à ton bien n&apos;est ni fait, ni facturé. Ce qui
                dépend de ton bien (le gaz, la zone) se vérifie à la visite.
              </p>
            </Tuile>
          </div>
        </div>
      </Section>

      <Section id="lettres" className="space-y-10 pt-0">
        <Intitule surtitre="Pourquoi DPE F&nbsp;?" titre="Le DPE, lettre par lettre.">
          C&apos;est mot pour mot ce que les gens tapent : «&nbsp;pourquoi DPE&nbsp;F&nbsp;». Chaque lettre a sa page :
          ce qu&apos;elle change si tu vends, si tu loues, et dans l&apos;annonce.
        </Intitule>
        <ul className="grid grid-cols-4 gap-3 sm:grid-cols-7">
          {LETTRES.map((l) => (
            <li key={l}>
              <Link
                href={`${DOSSIER}/dpe/${l}`}
                className="grid aspect-square place-items-center rounded-[22px] font-[family-name:var(--titres)] text-[38px] font-bold"
                style={{ background: COULEURS[l][0], color: COULEURS[l][1] }}
              >
                {l.toUpperCase()}
                <span className="sr-only"> : la page du DPE {l.toUpperCase()}</span>
              </Link>
            </li>
          ))}
          <li className="col-span-1 grid aspect-square place-items-center rounded-[22px] bg-[var(--carte)] p-2 text-center text-[13px] font-semibold leading-tight text-[var(--doux)] ring-1 ring-[var(--trait)] sm:hidden">
            Touche une lettre
          </li>
        </ul>
      </Section>

      <Section className="grid gap-4 pt-0 md:grid-cols-2">
        <div className="relative min-h-[420px] overflow-hidden rounded-[28px]">
          <Image src="/exemples/de-a-a-g/immeuble-balcons.webp" alt="Un immeuble ancien aux volets clairs et aux balcons de fer forgé, sous un ciel bleu" fill sizes="(min-width: 768px) 540px, 100vw" className="object-cover" />
          <p className="absolute bottom-4 left-4 rounded-full bg-[var(--carte)] px-3.5 py-1.5 text-[13px] font-semibold">Appartement : pas de condition de surface pour le DPE à la vente</p>
        </div>
        <div className="relative min-h-[420px] overflow-hidden rounded-[28px]">
          <Image src="/exemples/de-a-a-g/combles-lucarnes.webp" alt="Des combles en travaux, un isolant réfléchissant entre les chevrons, deux fenêtres de toit" fill sizes="(min-width: 768px) 540px, 100vw" className="object-cover" />
          <p className="absolute bottom-4 left-4 rounded-full bg-[var(--carte)] px-3.5 py-1.5 text-[13px] font-semibold">Les combles, on les regarde aussi</p>
        </div>
      </Section>

      <Section className="space-y-10 pt-0">
        <Intitule surtitre="Comment ça se passe" titre="Du questionnaire au rapport." />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ETAPES.map((e, i) => (
            <li key={e.titre}>
              <Tuile teinte={(["menthe", "beurre", "peche", "lilas"] as const)[i]} className="h-full space-y-3">
                <p className="grid h-10 w-10 place-items-center rounded-full bg-[var(--carte)] font-[family-name:var(--titres)] text-[18px] font-bold ring-1 ring-[var(--trait)]">{i + 1}</p>
                <h3 className="text-[22px] font-bold tracking-[-0.02em]">{e.titre}</h3>
                <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
              </Tuile>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="grid gap-10 pt-0 lg:grid-cols-[0.8fr_1.2fr]">
        <Intitule surtitre="Questions" titre="Ce qu'on nous demande." />
        <div className="space-y-3">
          {FAQ.map((f) => (
            <details key={f.q} className="group rounded-[22px] bg-[var(--carte)] px-5 py-4 ring-1 ring-[var(--trait)]">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[18px] font-semibold leading-snug">
                {f.q}
                <span aria-hidden="true" className="mt-0.5 text-[var(--accent-texte)] transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-[16px] leading-relaxed text-[var(--doux)]">{f.r}</p>
            </details>
          ))}
        </div>
      </Section>

      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-5 rounded-[32px] bg-[var(--sombre)] p-8 text-[var(--sur-sombre)] sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <h2 className="max-w-xl text-[34px] font-bold leading-[1.05] tracking-[-0.03em] sm:text-[44px]">Plus besoin qu&apos;on t&apos;envoie. Tu choisis ton créneau.</h2>
          <Link href={`${DOSSIER}/rendez-vous`} className="inline-flex h-14 items-center rounded-[16px] bg-[var(--accent)] px-7 text-[16px] font-semibold text-[var(--sur-accent)]">
            Prendre rendez-vous
          </Link>
        </div>
      </section>
    </>
  );
}
