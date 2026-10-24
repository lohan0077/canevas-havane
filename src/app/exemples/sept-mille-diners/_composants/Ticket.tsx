/** Le premier dîner, comme un bon de commande de restaurant : droit, sans tampon (version « carrée »). */
export default function Ticket({ className = "" }: { className?: string }) {
  const lignes = ["Le soir de la pose", "Cuisiné chez toi", "Dans ta nouvelle cuisine", "Menu choisi avec toi"];
  return (
    <div className={`relative mx-auto max-w-[340px] ${className}`}>
      <div className="bg-[#FFFCF6] text-[var(--encre)] px-7 pt-7 pb-8 shadow-[0_24px_40px_-20px_rgba(46,42,38,0.45)] [clip-path:polygon(0_0,100%_0,100%_calc(100%-10px),95%_100%,90%_calc(100%-10px),85%_100%,80%_calc(100%-10px),75%_100%,70%_calc(100%-10px),65%_100%,60%_calc(100%-10px),55%_100%,50%_calc(100%-10px),45%_100%,40%_calc(100%-10px),35%_100%,30%_calc(100%-10px),25%_100%,20%_calc(100%-10px),15%_100%,10%_calc(100%-10px),5%_100%,0_calc(100%-10px))]">
        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-[var(--doux)]">Sept Mille Dîners</p>
        <p className="mt-2 text-center font-[family-name:var(--titres)] text-4xl italic [font-variant-numeric:lining-nums]">Dîner n° 1</p>
        <ul className="mt-5 space-y-2 border-t border-dashed border-[var(--doux)] pt-4">
          {lignes.map((l) => (
            <li key={l} className="flex justify-between gap-3">
              <span>{l}</span>
              <span aria-hidden="true" className="text-[var(--accent-texte)]">✓</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 flex items-baseline justify-between border-t border-dashed border-[var(--doux)] pt-4 text-xl">
          <span>Le dîner</span>
          <span className="font-[family-name:var(--titres)] text-3xl italic">offert</span>
        </p>
        <p className="mt-1 text-xs text-[var(--doux)]">Sans condition : pas compté dans le prix de la cuisine.</p>
      </div>
    </div>
  );
}
