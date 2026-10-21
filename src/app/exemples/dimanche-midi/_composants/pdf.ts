// Fabrique, dans le navigateur, un PDF d'une ou plusieurs pages A4 à partir de lignes de
// texte : polices standard du format (Helvetica), encodage WinAnsi. Aucune bibliothèque,
// aucun envoi : le fichier naît dans la page et n'en sort que si la personne le télécharge.

export type LignePdf = { texte: string; taille?: number; gras?: boolean; couleur?: [number, number, number]; avant?: number };

const WINANSI: Record<string, number> = {
  "€": 0x80, "‚": 0x82, "„": 0x84, "…": 0x85, "‘": 0x91, "’": 0x92, "“": 0x93, "”": 0x94,
  "•": 0x95, "–": 0x96, "—": 0x97, "œ": 0x9c, "Œ": 0x8c, "Ÿ": 0x9f, " ": 0xa0,
};

/** Une chaîne en octets WinAnsi (un caractère = un octet), échappée pour un littéral PDF. */
function encoder(s: string): string {
  let sortie = "";
  for (const c of s) {
    let code = WINANSI[c] ?? c.codePointAt(0) ?? 63;
    if (code > 0xff || (code >= 0x80 && code <= 0x9f && !(c in WINANSI))) code = 63;
    const car = String.fromCharCode(code);
    sortie += car === "(" || car === ")" || car === "\\" ? `\\${car}` : car;
  }
  return sortie;
}

/** Coupe un texte en lignes d'au plus `max` caractères, aux espaces. */
function couper(texte: string, max: number): string[] {
  const mots = texte.split(/\s+/);
  const lignes: string[] = [];
  let ligne = "";
  for (const m of mots) {
    if (ligne && (ligne + " " + m).length > max) {
      lignes.push(ligne);
      ligne = m;
    } else ligne = ligne ? `${ligne} ${m}` : m;
  }
  if (ligne) lignes.push(ligne);
  return lignes;
}

export function fabriquerPdf(lignes: LignePdf[]): Uint8Array {
  const LARGEUR = 595, HAUTEUR = 842, MARGE = 56;
  const pages: string[] = [];
  let flux = "";
  let y = HAUTEUR - MARGE;
  for (const l of lignes) {
    const taille = l.taille ?? 11;
    const interligne = taille * 1.4;
    // Helvetica fait en moyenne une demi-taille de large par caractère.
    const max = Math.floor((LARGEUR - 2 * MARGE) / (taille * 0.5));
    y -= l.avant ?? 0;
    for (const morceau of couper(l.texte, max)) {
      if (y - interligne < MARGE) {
        pages.push(flux);
        flux = "";
        y = HAUTEUR - MARGE;
      }
      y -= interligne;
      const [r, g, b] = l.couleur ?? [0.13, 0.22, 0.17];
      flux += `BT /${l.gras ? "F2" : "F1"} ${taille} Tf ${r} ${g} ${b} rg ${MARGE} ${y.toFixed(1)} Td (${encoder(morceau)}) Tj ET\n`;
    }
  }
  pages.push(flux);

  const objets: string[] = [];
  const nbPages = pages.length;
  const kids = pages.map((_, i) => `${5 + i * 2} 0 R`).join(" ");
  objets.push("<< /Type /Catalog /Pages 2 0 R >>");
  objets.push(`<< /Type /Pages /Kids [${kids}] /Count ${nbPages} >>`);
  objets.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>");
  objets.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>");
  pages.forEach((contenu, i) => {
    objets.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${LARGEUR} ${HAUTEUR}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${6 + i * 2} 0 R >>`);
    objets.push(`<< /Length ${contenu.length} >>\nstream\n${contenu}endstream`);
  });

  let pdf = "%PDF-1.4\n";
  const positions: number[] = [];
  objets.forEach((o, i) => {
    positions.push(pdf.length);
    pdf += `${i + 1} 0 obj\n${o}\nendobj\n`;
  });
  const debutXref = pdf.length;
  pdf += `xref\n0 ${objets.length + 1}\n0000000000 65535 f \n`;
  for (const p of positions) pdf += `${String(p).padStart(10, "0")} 00000 n \n`;
  pdf += `trailer\n<< /Size ${objets.length + 1} /Root 1 0 R >>\nstartxref\n${debutXref}\n%%EOF\n`;

  const octets = new Uint8Array(pdf.length);
  for (let i = 0; i < pdf.length; i++) octets[i] = pdf.charCodeAt(i) & 0xff;
  return octets;
}
