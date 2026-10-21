import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, enseignes, entreprise, etapes, photos, questions } from "./_composants/donnees";
import Facade from "./_composants/Facade";
import Comparaison from "./_composants/Comparaison";
import UnSeulBouton from "./_composants/UnSeulBouton";
import Faq from "./_composants/Faq";

// L'accueil de Façade Allumée, le site imaginé dans la vidéo « Si je devais remplir
// le carnet de commandes d'un enseigniste » : un seul bouton (« Envoyer ma photo »),
// le montage avant / après, le dossier en mairie préparé. Autour, ce qu'un vrai
// enseigniste montrerait : ses enseignes, sa méthode, son atelier, ses réponses.
export const metadata: Metadata = {
  title: "Façade Allumée — site de démonstration",
  description: "Site de démonstration d'un enseigniste imaginaire, réalisé par Canevas Havane : envoie la photo de ta façade, reçois-la avec ton enseigne posée dessus.",
  ...adressesDeLaPage("/exemples/facade-allumee"),
};

export default function FacadeAllumee() {
  return (
    <>
      {/* 1 · L'ouverture : la boutique la nuit, son enseigne qui s'allume, un seul bouton. */}
      <section id="ouverture" className="relative overflow-hidden bg-[radial-gradient(60%_45%_at_50%_38%,#2A2540_0%,#0E1424_70%)]">
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[30%] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(242,181,68,.28),transparent_65%)]" />
        <div className="relative mx-auto max-w-6xl px-5 pt-6 sm:pt-10">
          <div className="flex items-start justify-between gap-6 text-[13px] leading-snug">
            <p className="max-w-[15rem] text-[var(--doux)]">
              Enseignes lumineuses pour les commerces, fabriquées à l&apos;atelier et posées par ceux qui les ont faites.
            </p>
            <p className="text-right font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Enseigniste</p>
          </div>
          <div className="mx-auto mt-5 grid max-w-5xl items-center gap-6 md:mt-2 md:grid-cols-[1fr_1.1fr]">
            <figure className="mx-auto w-full max-w-[250px] md:order-2 md:max-w-[440px]">
              <Facade id="fa-ouverture" enseigne="Boulangerie" nuit allumage className="rounded-[14px] shadow-[0_0_0_1px_rgba(244,241,234,.12),0_30px_80px_-20px_rgba(242,181,68,.35)]" />
              <figcaption className="sr-only">Une boutique la nuit, vue du trottoir d&apos;en face : son enseigne s&apos;allume au-dessus de la vitrine.</figcaption>
            </figure>
            <div className="space-y-5 text-center md:text-left">
              <h1 className="text-5xl sm:text-7xl">
                Ta boutique, <span className="italic text-[var(--accent-texte)]">allumée.</span>
              </h1>
              <UnSeulBouton />
              <p className="mx-auto max-w-md text-lg leading-relaxed text-[var(--doux)] md:mx-0">
                Envoie la photo de ta façade. Tu la reçois avec ton enseigne posée dessus, de jour
                et le soir. Le montage est offert.
              </p>
            </div>
          </div>
        </div>
        <p aria-hidden="true" className="relative -mb-[0.22em] mt-6 select-none text-center font-[family-name:var(--titres)] text-[25vw] italic leading-none text-[#F2B544] [text-shadow:0_0_40px_rgba(242,181,68,.55)] md:text-[17vw]">
          allumée
        </p>
      </section>

      {/* 2 · Le contre-pied. */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:py-28 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Ce qu&apos;on fait vraiment</p>
          <h2 className="text-5xl sm:text-6xl">
            <span className="text-[var(--doux)] line-through decoration-[var(--accent)] decoration-2">Pas une enseigne.</span>{" "}
            Ta boutique, vue du trottoir d&apos;en face.
          </h2>
          <p className="max-w-xl text-lg leading-relaxed">
            Personne ne choisit des lettres de quarante centimètres sur un catalogue. On choisit
            l&apos;air qu&apos;aura sa boutique un soir de novembre, à 18 h, quand la rue s&apos;allume
            et que les passants rentrent chez eux. C&apos;est ça qu&apos;on te montre, avant de
            fabriquer quoi que ce soit.
          </p>
        </div>
        <div className="relative mx-auto w-full max-w-sm">
          <Image src={photos.ampoules.src} alt={photos.ampoules.alt} width={photos.ampoules.largeur} height={photos.ampoules.hauteur} sizes="(min-width: 768px) 384px, 90vw" className="h-auto w-full rounded-[22px] object-cover" />
        </div>
      </section>

      {/* 3 · La méthode. */}
      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto max-w-6xl space-y-12 px-5 py-20 sm:py-24">
          <div className="max-w-2xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Comment ça se passe</p>
            <h2 className="text-5xl sm:text-6xl">De la photo <span className="italic">au premier soir.</span></h2>
          </div>
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {etapes.map((e, i) => (
              <li key={e.titre} className="space-y-3 border-t border-[var(--trait)] pt-5">
                <p className="font-[family-name:var(--titres)] text-5xl italic text-[var(--accent-texte)]">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="text-2xl">{e.titre}</h3>
                <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4 · Avant / après. */}
      <section id="avant-apres" className="scroll-mt-20 mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:py-28 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Ce que tu reçois</p>
          <h2 className="text-5xl sm:text-6xl">Avant, <span className="italic text-[var(--accent-texte)]">après.</span></h2>
          <p className="max-w-md text-lg leading-relaxed">
            Glisse le trait : la même façade, sans puis avec son enseigne. Tu reçois exactement
            ça, sur ta photo à toi.
          </p>
          <p className="text-sm text-[var(--doux)]">Montage d&apos;exemple, sur une façade dessinée.</p>
        </div>
        <div className="mx-auto w-full max-w-[440px]">
          <Comparaison
            id="fa-curseur"
            depart={45}
            etiquette="Glisser pour comparer la façade avant et après l'enseigne"
            avant={<Facade id="fa-aa-avant" />}
            apres={<Facade id="fa-aa-apres" enseigne="Boulangerie" />}
          />
        </div>
      </section>

      {/* 5 · Ce qu'on fabrique. */}
      <section className="mx-auto max-w-6xl space-y-10 px-5 pb-20 sm:pb-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Nos enseignes</p>
            <h2 className="text-5xl sm:text-6xl">Cinq façons <span className="italic">d&apos;être vue.</span></h2>
          </div>
          <Link href={`${DOSSIER}/enseignes`} className="font-semibold underline underline-offset-4 decoration-[var(--accent)]">Toutes les enseignes et leurs prix</Link>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {enseignes.map((e) => (
            <li key={e.id} className="flex flex-col justify-between gap-6 rounded-[22px] border border-[var(--trait)] bg-[var(--carte)] p-6">
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">{e.lumineuse ? "Lumineuse" : "Non lumineuse"}</p>
                <h3 className="text-2xl">{e.nom}</h3>
                <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
              </div>
              <p className="font-bold tabular-nums">{e.prix} <span className="font-normal text-[var(--doux)]">· exemple</span></p>
            </li>
          ))}
        </ul>
        <p className="text-sm text-[var(--doux)]">Prix hors taxes d&apos;exemple, pose comprise : nos clients sont des professionnels. Le devis dépend de la taille, de la lumière et de la façade.</p>
      </section>

      {/* 6 · Le dossier en mairie. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:py-28 md:grid-cols-2 md:items-center">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Le dossier en mairie</p>
            <h2 className="text-5xl sm:text-6xl">Le montage sert <span className="italic">aussi au dossier.</span></h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              Quand l&apos;enseigne doit être autorisée, la demande comporte trois pièces : la
              mise en situation, la vue de la façade avec et sans l&apos;enseigne, et un
              document graphique d&apos;intégration. On les prépare. Tu signes, tu déposes.
            </p>
            <Link href={`${DOSSIER}/dossier`} className="inline-flex min-h-[52px] items-center rounded-full border-2 border-[var(--accent)] px-6 font-bold">
              Comment se monte le dossier
            </Link>
          </div>
          <figure className="space-y-4 border-l-2 border-[var(--accent)] pl-6">
            <blockquote className="font-[family-name:var(--titres)] text-3xl italic leading-snug sm:text-4xl">
              « Une vue de l&apos;immeuble ou du lieu concerné avec et sans l&apos;enseigne »
            </blockquote>
            <figcaption className="text-sm text-[var(--doux)]">Code de l&apos;environnement, art. R. 581-16, 1°, b. Information générale : le règlement local de publicité de chaque commune s&apos;applique.</figcaption>
          </figure>
        </div>
      </section>

      {/* 7 · Allumée, jamais clignotante. */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:py-28 md:grid-cols-2 md:items-center">
        <Image src={photos.soudure.src} alt={photos.soudure.alt} width={photos.soudure.largeur} height={photos.soudure.hauteur} sizes="(min-width: 768px) 560px, 100vw" className="h-auto w-full rounded-[22px]" />
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">La lumière</p>
          <h2 className="text-5xl sm:text-6xl">Allumée. <span className="italic text-[var(--accent-texte)]">Jamais clignotante.</span></h2>
          <p className="text-lg leading-relaxed">
            Une enseigne qui clignote, c&apos;est interdit, sauf pour les pharmacies et les services
            d&apos;urgence. Les nôtres s&apos;allument doucement et restent allumées.
          </p>
          <p className="leading-relaxed text-[var(--doux)]">
            Elles s&apos;éteignent aussi la nuit : entre 1 h et 6 h quand la boutique est fermée,
            sauf règle locale (Code de l&apos;environnement, art. R. 581-59). Une horloge les règle à
            la pose.
          </p>
        </div>
      </section>

      {/* 8 · L'atelier. */}
      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:py-24 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <Image src={photos.atelier.src} alt={photos.atelier.alt} width={photos.atelier.largeur} height={photos.atelier.hauteur} sizes="(min-width: 768px) 640px, 100vw" className="h-auto w-full rounded-[22px]" />
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">L&apos;atelier</p>
            <h2 className="text-5xl">Fabriquée ici, <span className="italic">posée par nous.</span></h2>
            <ul className="space-y-3 leading-relaxed text-[var(--doux)]">
              <li><b className="text-[var(--encre)]">Aluminium, laiton, bois.</b> Découpés et assemblés à l&apos;atelier.</li>
              <li><b className="text-[var(--encre)]">Des LED, réglées à la main.</b> Une lumière chaude, jamais aveuglante.</li>
              <li><b className="text-[var(--encre)]">La pose et le raccordement.</b> Par l&apos;équipe qui a fabriqué l&apos;enseigne.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 9 · Les questions. */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:py-28 lg:grid-cols-[0.8fr_1.2fr]">
        <h2 className="text-5xl sm:text-6xl">Avant <span className="italic text-[var(--accent-texte)]">d&apos;appeler.</span></h2>
        <Faq questions={questions.slice(0, 5)} />
      </section>

      {/* 10 · L'appel. */}
      <section className="relative overflow-hidden bg-[radial-gradient(50%_80%_at_50%_100%,#3A2F2A_0%,#0E1424_70%)]">
        <div className="mx-auto max-w-3xl space-y-6 px-5 py-24 text-center">
          <h2 className="text-5xl sm:text-7xl">Ta façade, <span className="italic text-[var(--accent-texte)]">ce soir.</span></h2>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Le bouton est tout en haut. Une question avant ? L&apos;atelier répond en semaine.
          </p>
          <a href={`tel:${entreprise.telephoneLien}`} className="inline-block font-[family-name:var(--titres)] text-4xl underline decoration-[var(--accent)] underline-offset-8">
            {entreprise.telephone}
          </a>
          <p className="text-sm text-[var(--doux)]">Numéro réservé aux œuvres de fiction : il ne sonne chez personne.</p>
        </div>
      </section>
    </>
  );
}
