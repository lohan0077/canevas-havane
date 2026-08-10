// Lecture plafonnée du corps d'une requête.
//
// `request.json()` charge tout le corps en mémoire avant qu'on ait pu dire non.
// Un corps de 20 Mo était accepté, analysé, puis rejeté — le mal était fait.
// Ici on refuse avant d'avoir tout lu : d'abord sur l'en-tête `Content-Length`
// quand il est présent, puis morceau par morceau, en abandonnant dès le
// dépassement. Un envoi en `chunked` sans `Content-Length` ne contourne donc rien.

/** Un message de contact tient très largement dans 16 Ko (5 000 caractères au plus). */
export const TAILLE_MAX_CORPS = 16 * 1024;

export type LectureCorps =
  | { ok: true; texte: string }
  | { ok: false; raison: "trop-gros" | "illisible" };

export async function lireCorpsPlafonne(
  request: Request,
  maxOctets: number = TAILLE_MAX_CORPS,
): Promise<LectureCorps> {
  const annonce = Number(request.headers.get("content-length"));
  if (Number.isFinite(annonce) && annonce > maxOctets) {
    return { ok: false, raison: "trop-gros" };
  }

  const flux = request.body;
  if (!flux) {
    // Pas de corps du tout : ce n'est pas trop gros, c'est illisible.
    return { ok: false, raison: "illisible" };
  }

  const lecteur = flux.getReader();
  const morceaux: Uint8Array[] = [];
  let total = 0;

  try {
    for (;;) {
      const { done, value } = await lecteur.read();
      if (done) break;
      if (!value) continue;
      total += value.byteLength;
      if (total > maxOctets) {
        // On coupe la lecture : le reste du corps ne sera jamais mis en mémoire.
        await lecteur.cancel();
        return { ok: false, raison: "trop-gros" };
      }
      morceaux.push(value);
    }
  } catch {
    return { ok: false, raison: "illisible" };
  }

  const assemble = new Uint8Array(total);
  let position = 0;
  for (const morceau of morceaux) {
    assemble.set(morceau, position);
    position += morceau.byteLength;
  }

  try {
    return { ok: true, texte: new TextDecoder("utf-8", { fatal: true }).decode(assemble) };
  } catch {
    return { ok: false, raison: "illisible" };
  }
}
