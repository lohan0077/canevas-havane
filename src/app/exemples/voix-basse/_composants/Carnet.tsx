/**
 * Le carnet de visite d'une « visite pour rien » : trois lignes écrites à la main et le
 * tampon « Aucun soin ». Exemple : Biscotte n'existe pas.
 */
export default function Carnet() {
  const lignes = ["A reniflé la salle.", "A eu une friandise.", "Est reparti tranquille."];
  return (
    <figure data-film="carnet" className="mx-auto w-full max-w-md rotate-[-1.5deg] rounded-[18px] border border-[var(--trait)] bg-[var(--carte)] p-7 shadow-[0_30px_60px_-40px_rgba(47,74,62,0.6)]">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-[var(--trait)] pb-3">
        <span className="font-[family-name:var(--titres)] text-3xl">Carnet de Biscotte</span>
        <span className="whitespace-nowrap text-sm text-[var(--doux)]">Visite du 12 mars</span>
      </figcaption>
      <ul className="mt-2 font-[family-name:var(--f-caveat)] text-[30px] leading-[1.6]">
        {lignes.map((l) => (
          <li key={l} className="border-b border-dashed border-[var(--trait)]">{l}</li>
        ))}
      </ul>
      <p data-film="tampon" className="ml-auto mt-4 w-fit rotate-[-8deg] rounded-xl border-[3px] border-[#62489A] px-3 py-1 text-lg font-bold uppercase tracking-[0.12em] text-[#62489A]">
        Aucun soin
      </p>
      <p className="mt-4 text-xs text-[var(--doux)]">Exemple de carnet : Biscotte est un chat imaginaire.</p>
    </figure>
  );
}
