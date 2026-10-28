import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { Tirage } from "../_composants/Blocs";
import { photos, studio } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Pour Plus Tard, site de démonstration",
  description: "Pour Plus Tard est un studio photo fictif : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/pour-plus-tard/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main className="kit-grain relative isolate overflow-hidden bg-[var(--sombre)] pt-24 text-[var(--sur-sombre)]">
      <div className="relative">
        <MentionsDemonstration
          site="pour-plus-tard"
          entreprise="Pour Plus Tard"
          polices="Playfair Display, DM Sans et Caveat"
          enPlus={
            <>
              <p>
                Ce site réunit les deux vidéos des photographes : « Créer une marque » (le nom, une seule
                formule — une séance et une boîte de vingt tirages livrée chez toi —, la vitrine des plus
                vieilles photos du quartier) et « Remplir l&apos;agenda » (pas de portfolio mais la minute 1
                et la minute 40, la page « s&apos;habiller », le prix affiché, la photo ratée, les créneaux).
              </p>
              <p>
                Sur un vrai site, cette page nommerait le studio, son adresse et son numéro SIRET. Ici, tout
                est exemple : SIRET 000&nbsp;000&nbsp;000&nbsp;00000, 12 rue de l&apos;Exemple, 00000
                Exemple-Ville. Le téléphone affiché, {studio.telephone}, appartient à la tranche que
                l&apos;ARCEP réserve aux œuvres de fiction. Les prix sont des prix TTC d&apos;exemple.
              </p>
              <p>
                Droit à l&apos;image (code civil, art. 9) : un vrai studio ne publie ni n&apos;expose aucune
                photo sans l&apos;accord écrit des personnes qui y figurent — et pour un enfant, celui de ses
                deux parents. Droit d&apos;auteur : exposer une photo en vitrine est une représentation
                publique (code de la propriété intellectuelle, art. L122-2), et une photo reste protégée
                soixante-dix ans après la mort de son auteur (art. L123-1).
              </p>
              <p>
                Les photos de ce site ne montrent aucun client : ce sont des photos libres, sans visage
                reconnaissable, créditées ci-dessous ; les tirages de la boîte et le mur de la vitrine sont
                dessinés.
              </p>
            </>
          }
        />
      </div>
      <div className="mx-auto flex max-w-3xl justify-end px-5 pb-16">
        <Tirage src={photos.pageQuiAttend.src} alt={photos.pageQuiAttend.alt} legende="la page qui attend" angle={-3} sizes="260px" className="w-[220px]" ratio="aspect-[4/3]" />
      </div>
    </main>
  );
}
