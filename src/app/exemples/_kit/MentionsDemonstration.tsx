import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import Link from "next/link";

type Credit = { fichier: string; auteur: string; source: string; licence: string; page: string };

/**
 * Le contenu de la page « Mentions légales et crédits » d'un site de démonstration :
 * qui publie vraiment (Canevas Havane), ce qui est inventé, ce qui n'est pas collecté,
 * et le crédit de chaque photo (lu dans public/exemples/<site>/credits.json, que
 * outils/photo-exemple.mjs tient à jour). Lu à la compilation : la page est statique.
 * `enPlus` : les mentions propres au métier, affichées sur le site et marquées exemple.
 */
export default function MentionsDemonstration({
  site,
  entreprise,
  polices,
  enPlus,
}: {
  site: string;
  entreprise: string;
  polices: string;
  enPlus?: React.ReactNode;
}) {
  const fichier = join(process.cwd(), "public/exemples", site, "credits.json");
  const credits: Credit[] = existsSync(fichier) ? JSON.parse(readFileSync(fichier, "utf8")) : [];

  return (
    <div className="max-w-3xl mx-auto px-5 py-14 space-y-10 leading-relaxed">
      <h1 className="text-4xl sm:text-5xl font-semibold">Mentions légales et crédits</h1>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Une entreprise fictive</h2>
        <p>
          {entreprise} n&apos;existe pas. Ce site est une démonstration, réalisée par Canevas
          Havane pour ses vidéos : les noms, les prix, les dates, les chiffres et les
          réalisations présentés sont des exemples. Aucune prestation ne peut y être
          commandée.
        </p>
        {enPlus}
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Éditeur et hébergement</h2>
        <p>
          Ce site est publié par Canevas Havane, sur canevas-havane.com. L&apos;éditeur,
          l&apos;hébergeur et les moyens de contact sont indiqués dans les{" "}
          <Link href="/mentions-legales" className="underline underline-offset-4">mentions légales de Canevas Havane</Link>.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Données personnelles</h2>
        <p>
          Aucune. Les formulaires, les calculs et les réservations fonctionnent entièrement
          dans votre navigateur : rien n&apos;est envoyé ni enregistré, et aucun traceur
          n&apos;est posé. Le détail est dans la{" "}
          <Link href="/confidentialite" className="underline underline-offset-4">politique de confidentialité de Canevas Havane</Link>.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Crédits</h2>
        <p>Polices : {polices}, sous licence SIL Open Font.</p>
        {credits.length > 0 && (
          <ul className="space-y-1.5">
            {credits.map((c) => (
              <li key={c.fichier}>
                Photo de {c.auteur}, publiée sur{" "}
                <a href={c.page} className="underline underline-offset-4" rel="noopener noreferrer">{c.source}</a>{" "}
                ({c.licence}), servie depuis ce domaine.
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
