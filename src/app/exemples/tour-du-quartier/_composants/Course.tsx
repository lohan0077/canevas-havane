import Velo from "./Velo";

const COULOIRS = [
  { couleur: "#F2C14E", duree: 16, retard: 0 },
  { couleur: "#E8553D", duree: 23, retard: -4 },
  { couleur: "#7FB08F", duree: 31, retard: -9 },
];

/**
 * La course de lenteur, dessinée : trois couloirs sur le parking, trois vélos qui
 * avancent chacun à son (petit) rythme vers la ligne d'arrivée. Décoratif ; avec
 * « animations réduites », les vélos restent à l'arrêt.
 */
export default function Course() {
  return (
    <figure className="space-y-4">
      <style>{`@keyframes tq-lent { from { left: 2%; } to { left: 74%; } } .tq-lent { animation: tq-lent var(--d) cubic-bezier(.45,.05,.55,.95) infinite alternate; animation-delay: var(--r); } @media (prefers-reduced-motion: reduce) { .tq-lent { animation: none; left: 30%; } }`}</style>
      <div aria-hidden="true" className="relative overflow-hidden rounded-[32px] bg-[#2A5E45] p-4">
        <div className="absolute inset-y-0 right-[16%] w-3 bg-[repeating-linear-gradient(180deg,#FFF8EC_0,#FFF8EC_12px,#1F3A2C_12px,#1F3A2C_24px)]" />
        {COULOIRS.map((c, i) => (
          <div key={i} className="relative h-24 border-b-2 border-dashed border-white/30 last:border-b-0">
            <span className="tq-lent absolute top-1/2 -translate-y-1/2" style={{ "--d": `${c.duree}s`, "--r": `${c.retard}s` } as React.CSSProperties}>
              <Velo couleur={c.couleur} roues="#FFF8EC" batterie={false} className="h-16 w-28" />
            </span>
          </div>
        ))}
      </div>
      <figcaption className="flex items-center justify-between gap-4 text-[15px]">
        <span>Vingt mètres · pied à terre, on recommence</span>
        <span className="rounded-full bg-[#F2C14E] px-3 py-1 font-bold text-[#1F3A2C]">Arrivée</span>
      </figcaption>
    </figure>
  );
}
