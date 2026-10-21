import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { HautDePage } from "../_composants/Blocs";
import Suivi from "../_composants/Suivi";
import { ANNONCES, DOSSIER, VISITES, euros, photos, prixHonorairesInclus } from "../_composants/donnees";

// La page d'un vendeur (exemple) : chaque visite a son compte rendu, le soir même. C'est
// la réponse à « pourquoi les agences immobilières ne répondent pas » (suggestion Google
// relevée le 15/10/2026). Les visiteurs ne sont jamais nommés.
export const metadata: Metadata = {
  title: "Le suivi du soir — Le Soir Même, site de démonstration",
  description: "La page d'un vendeur, visite par visite : le compte rendu de chaque visite tombe le soir même. Exemple d'une agence immobilière imaginaire.",
  ...adressesDeLaPage("/exemples/le-soir-meme/suivi"),
};

export default function PageSuivi() {
  const maison = ANNONCES[0];
  return (
    <>
      <HautDePage surtitre="Ta page de vendeur · exemple" titre={<>Ta maison, <span className="italic text-[var(--accent)]">visite par visite.</span></>}>
        Après chaque visite, le compte rendu tombe ici, le soir même. Tu n&apos;as plus à relancer
        l&apos;agence : tu sais tout.
      </HautDePage>

      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start" data-film="maison">
          <div className="flex items-center gap-4 rounded-[24px] border border-[var(--trait)] bg-[var(--carte)] p-4">
            <span className="relative h-24 w-20 shrink-0 overflow-hidden rounded-[16px]">
              <Image src={photos.voletsRouges.src} alt="" fill sizes="80px" className="object-cover" />
            </span>
            <span className="space-y-1">
              <span className="block font-[family-name:var(--titres)] text-[26px] leading-none">{maison.titre} · {maison.surface} m²</span>
              <span className="block text-[14px] text-[var(--doux)]">En vente depuis le 12 septembre · exemple</span>
              <Link href={`${DOSSIER}/annonces/${maison.slug}`} className="block text-[14px] font-semibold underline underline-offset-4">Voir l&apos;annonce</Link>
            </span>
          </div>
          <dl className="grid grid-cols-3 gap-3 text-center">
            {[
              ["Visites", String(VISITES.length)],
              ["2e visite", "1"],
              ["Relances", "0"],
            ].map(([t, v]) => (
              <div key={t} className="flex flex-col-reverse rounded-[20px] bg-[var(--carte)] p-4">
                <dt className="mt-1 text-[13px] text-[var(--doux)]">{t}</dt>
                <dd className="font-[family-name:var(--titres)] text-[40px] leading-none">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="text-[14px] text-[var(--doux)]">
            Chiffres d&apos;exemple. Prix affiché : {euros(prixHonorairesInclus(maison))} honoraires inclus ({euros(maison.horsHonoraires)} hors honoraires).
          </p>
        </aside>

        <section aria-label="Les visites" className="space-y-6">
          <Suivi />
          <p className="rounded-[20px] border border-dashed border-[var(--trait)] p-5 text-[15px] leading-relaxed text-[var(--doux)]">
            Les comptes rendus disent ce que les visiteurs ont dit et fait, jamais qui ils sont. Ils
            savent, avant la visite, qu&apos;un compte rendu anonyme est écrit pour le vendeur.
            Vendeur, visites et comptes rendus de cette page : exemple.
          </p>
        </section>
      </div>
    </>
  );
}
