import Link from "next/link";

/** Pied de page commun aux sites de démonstration : ce qui est inventé, qui l'a fait. */
export default function PiedDemonstration({ entreprise, className }: { entreprise: string; className: string }) {
  return (
    <footer className={`px-6 py-12 text-sm leading-relaxed ${className}`}>
      <div className="max-w-3xl mx-auto space-y-4 text-center">
        <p>
          {entreprise} est une entreprise fictive. Ce site de démonstration a été réalisé
          par Canevas Havane pour ses vidéos : les prix, les dates et les chantiers sont
          des exemples, et rien de ce que vous saisissez n&apos;est envoyé ni enregistré.
        </p>
        <p className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-semibold">
          <Link href="/exemples" className="underline underline-offset-4">Les autres sites de démonstration</Link>
          <Link href="/" className="underline underline-offset-4">Canevas Havane</Link>
          <Link href="/mentions-legales" className="underline underline-offset-4">Mentions légales</Link>
        </p>
      </div>
    </footer>
  );
}
