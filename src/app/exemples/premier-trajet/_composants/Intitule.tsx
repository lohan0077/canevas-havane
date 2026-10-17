/** Le haut d'une section : une pastille, un titre, un chapeau. */
export default function Intitule({
  pastille,
  titre,
  children,
  niveau = 2,
  clair = false,
}: {
  pastille: string;
  titre: React.ReactNode;
  children?: React.ReactNode;
  niveau?: 1 | 2;
  clair?: boolean;
}) {
  const Titre = niveau === 1 ? "h1" : "h2";
  return (
    <div className="space-y-4 max-w-2xl">
      <p
        className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] ${
          clair ? "bg-[var(--sur-sombre)]/10 text-[var(--sur-sombre)]" : "bg-[var(--carte)] border border-[var(--trait)]"
        }`}
      >
        <span aria-hidden="true" className="w-2 h-2 rounded-full bg-[var(--accent)]" />
        {pastille}
      </p>
      <Titre className={`${niveau === 1 ? "text-5xl sm:text-6xl" : "text-4xl sm:text-5xl"} font-extrabold tracking-[-0.02em]`}>{titre}</Titre>
      {children && <p className={`text-lg leading-relaxed ${clair ? "text-[var(--sur-sombre)]" : "text-[var(--doux)]"}`}>{children}</p>}
    </div>
  );
}
