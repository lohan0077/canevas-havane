import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, photos } from "../_composants/donnees";
import { Intitule, Photo, Surtitre } from "../_composants/Blocs";
import Carte from "../_composants/Carte";

export const metadata: Metadata = {
  title: "La carte professionnelle — Le Veilleur, site de démonstration",
  description:
    "Pourquoi une conciergerie imaginaire affiche sa carte professionnelle avant ses photos : ce que dit la loi Hoguet, la mention « Gestion immobilière », le garant.",
  ...adressesDeLaPage("/exemples/le-veilleur/la-carte"),
};

// Ce que dit la loi, cité exactement (Videos/regles-metiers/conciergeries-01-carte-professionnelle.md).
const TEXTES = [
  {
    ref: "Loi n° 70-9 du 2 janvier 1970, art. 1er",
    citation:
      "d'une manière habituelle, se livrent ou prêtent leur concours, même à titre accessoire, aux opérations portant sur les biens d'autrui",
    lecture: "La loi vise quiconque loue, de façon habituelle, le logement d'un autre, saisonnier ou non, meublé ou non. Même si ce n'est qu'une partie de son activité.",
  },
  {
    ref: "Même loi, art. 3",
    citation: "ne peuvent être exercées que par les personnes physiques ou morales titulaires d'une carte professionnelle",
    lecture: "Ces activités exigent la carte, délivrée par le président de la chambre de commerce et d'industrie territoriale.",
  },
  {
    ref: "Même loi, art. 14",
    citation: "six mois d'emprisonnement et de 7 500 Euros d'amende",
    lecture: "Ce que risque celui qui le fait de façon habituelle sans carte.",
  },
];

export default function LaCarte() {
  return (
    <div>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 pt-12 pb-16 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16 lg:pt-20">
        <Intitule niveau={1} surtitre="La carte" titre={<>Avant les photos, <em className="text-[var(--accent-texte)]">la carte.</em></>}>
          <p>
            Un propriétaire veut savoir à qui il confie ses clés. La réponse tient sur une carte :
            son numéro, qui l&apos;a délivrée, ce qu&apos;elle permet, et qui garantit l&apos;argent
            des loyers.
          </p>
        </Intitule>
        <Carte />
      </section>

      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto max-w-6xl space-y-10 px-5 py-20 sm:px-6">
          <Intitule surtitre="Ce que dit la loi" titre={<>Louer le logement d&apos;un autre, <em className="text-[var(--accent-texte)]">de façon habituelle.</em></>} />
          <ol className="grid gap-5 lg:grid-cols-3">
            {TEXTES.map((t) => (
              <li key={t.ref} className="flex flex-col gap-4 rounded-[22px] border border-[var(--trait)] bg-[var(--fond)] p-6">
                <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--accent-texte)]">{t.ref}</p>
                <blockquote className="font-[family-name:var(--titres)] text-[24px] leading-snug">« {t.citation} »</blockquote>
                <p className="mt-auto text-[15px] leading-relaxed text-[var(--doux)]">{t.lecture}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-10">
          <div className="space-y-3">
            <h2 className="text-[34px] font-normal sm:text-5xl">« Gestion immobilière »</h2>
            <p className="text-[16px] leading-relaxed text-[var(--doux)]">
              C&apos;est la mention de notre carte. Nous louons dans le cadre d&apos;un mandat de gestion :
              la loi range alors la location dans la gestion immobilière (art. 1-1). Une conciergerie
              qui loue sans mandat de gestion relève plutôt d&apos;une autre mention, « Transactions sur
              immeubles et fonds de commerce ».
            </p>
          </div>
          <div className="space-y-3">
            <h2 className="text-[34px] font-normal sm:text-5xl">Le garant</h2>
            <p className="text-[16px] leading-relaxed text-[var(--doux)]">
              Nous encaissons les loyers des voyageurs avant de les reverser : la loi exige alors une
              garantie financière (art. 3). Son nom et son adresse figurent sur la carte, et sur chacun
              de nos documents (décret n° 72-678 du 20 juillet 1972, art. 92).
            </p>
          </div>
          <div className="space-y-3">
            <h2 className="text-[34px] font-normal sm:text-5xl">Et le ménage ?</h2>
            <p className="text-[16px] leading-relaxed text-[var(--doux)]">
              Le ménage et le linge ne figurent pas dans la liste de la loi. Mais trouver les voyageurs,
              prendre les réservations, remettre les clés, encaisser les loyers : c&apos;est, à notre lecture, prêter son
              concours à la location.
            </p>
          </div>
        </div>
        <div className="space-y-6">
          <Photo photo={photos.cle} sizes="(min-width: 1024px) 540px, 100vw" className="aspect-[4/3]" />
          <div className="space-y-3 rounded-[22px] bg-[var(--sombre)] p-6 text-[var(--sur-sombre)]">
            <Surtitre clair>Vérifier une carte</Surtitre>
            <p className="text-[16px] leading-relaxed text-[#C9D0DB]">
              Le numéro d&apos;une carte se vérifie auprès de la chambre de commerce et d&apos;industrie qui
              l&apos;a délivrée. Celui affiché ici est un exemple : l&apos;entreprise est fictive.
            </p>
            <p className="text-[14px] leading-relaxed text-[#C9D0DB]">
              Aucune mention de ce site ne laisse croire à un agrément ni à une assermentation : la
              carte n&apos;est ni l&apos;un ni l&apos;autre (décret n° 72-678, art. 92).
            </p>
          </div>
          <Link href={`${DOSSIER}/bareme`} className="inline-block font-bold underline decoration-[var(--accent)] decoration-2 underline-offset-[6px]">
            Ensuite, le barème
          </Link>
        </div>
      </section>
    </div>
  );
}
