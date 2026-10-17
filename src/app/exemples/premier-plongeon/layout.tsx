import { texte, libelles } from "./_composants/polices";
import PiedDePage from "./_composants/PiedDePage";
import BarreMobile from "./_composants/BarreMobile";
import Animations from "./_composants/Animations";
import { styles as s } from "./_composants/Habillage";

// Le gabarit commun du site Premier Plongeon : polices, fond de nuit, pied de page,
// barre d'action sur téléphone. Chaque page pose elle-même le bandeau de
// démonstration puis sa barre de navigation — l'accueil les sépare par l'ouverture.
// Le `noindex` vient du layout de /exemples.
export default function PremierPlongeonLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${s.site} ${texte.variable} ${libelles.variable} font-[family-name:var(--pp-texte)] min-h-screen bg-[#04070d] text-[#e6eaf5] pb-[76px] lg:pb-0`}>
      {children}
      <PiedDePage />
      <BarreMobile />
      <Animations />
    </div>
  );
}
