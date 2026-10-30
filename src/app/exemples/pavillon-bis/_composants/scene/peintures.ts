import * as THREE from "three";

// Les matières des trois pavillons, peintes dans le navigateur : aucun fichier chargé,
// aucun serveur tiers. Un tirage pseudo-aléatoire à graine fixe, pour que deux visites
// (et deux tournages) donnent exactement la même maison.

export function alea(graine: number) {
  let a = graine >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function toile(l: number, h: number, dessin: (ctx: CanvasRenderingContext2D, r: () => number) => void, graine = 7, srgb = true) {
  const c = document.createElement("canvas");
  c.width = l;
  c.height = h;
  dessin(c.getContext("2d")!, alea(graine));
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function grain(ctx: CanvasRenderingContext2D, r: () => number, l: number, h: number, n: number, clair: number, sombre: number, taille = 1.4) {
  for (let i = 0; i < n; i++) {
    const c = r() < 0.5;
    ctx.fillStyle = c ? `rgba(255,255,255,${clair * r()})` : `rgba(0,0,0,${sombre * r()})`;
    const s = 0.4 + r() * taille;
    ctx.fillRect(r() * l, r() * h, s, s);
  }
}

/* ------------------------------ dehors ------------------------------ */

/** Crépi projeté : un fond, et des milliers de grains. Un motif = 2 m. */
export const crepi = (fond: string, graine = 3) =>
  toile(256, 256, (ctx, r) => {
    ctx.fillStyle = fond;
    ctx.fillRect(0, 0, 256, 256);
    grain(ctx, r, 256, 256, 9000, 0.16, 0.14, 1.6);
    // salissures sous les appuis : quelques coulures verticales très légères
    for (let i = 0; i < 10; i++) {
      const x = r() * 256;
      const g = ctx.createLinearGradient(0, 0, 0, 256);
      g.addColorStop(0, "rgba(60,50,30,0)");
      g.addColorStop(1, "rgba(60,50,30,0.05)");
      ctx.fillStyle = g;
      ctx.fillRect(x, 0, 6 + r() * 14, 256);
    }
  }, graine);

/** Tuiles mécaniques de 1970 : rangs, côtes, teintes fatiguées et un peu de mousse. Un motif = 2 m. */
export const tuiles = () =>
  toile(512, 512, (ctx, r) => {
    const rangs = 6;
    const hr = 512 / rangs;
    const lt = 512 / 9;
    for (let j = 0; j < rangs; j++) {
      for (let i = 0; i < 10; i++) {
        const x = i * lt - (j % 2) * (lt / 2);
        const v = r();
        const base = v < 0.1 ? [112, 74, 58] : v < 0.2 ? [138, 92, 70] : [148 + r() * 12, 84 + r() * 10, 64 + r() * 8];
        const g = ctx.createLinearGradient(0, j * hr, 0, (j + 1) * hr);
        g.addColorStop(0, `rgb(${base[0] * 0.72},${base[1] * 0.72},${base[2] * 0.72})`);
        g.addColorStop(0.25, `rgb(${base[0]},${base[1]},${base[2]})`);
        g.addColorStop(1, `rgb(${base[0] * 0.92},${base[1] * 0.92},${base[2] * 0.92})`);
        ctx.fillStyle = g;
        ctx.fillRect(x + 1, j * hr, lt - 2, hr);
        // les deux côtes de la tuile
        ctx.fillStyle = "rgba(0,0,0,0.16)";
        ctx.fillRect(x + lt * 0.33, j * hr + 6, 2, hr - 8);
        ctx.fillRect(x + lt * 0.66, j * hr + 6, 2, hr - 8);
        ctx.fillStyle = "rgba(255,230,200,0.10)";
        ctx.fillRect(x + lt * 0.33 + 2, j * hr + 6, 2, hr - 8);
      }
      // l'ombre du rang du dessus
      ctx.fillStyle = "rgba(20,8,4,0.32)";
      ctx.fillRect(0, j * hr, 512, 4);
    }
    // mousse et lichen, par plaques
    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = `rgba(${80 + r() * 20},${84 + r() * 20},${60 + r() * 16},${0.06 + r() * 0.08})`;
      ctx.beginPath();
      ctx.arc(r() * 512, r() * 512, 3 + r() * 10, 0, Math.PI * 2);
      ctx.fill();
    }
    grain(ctx, r, 512, 512, 5000, 0.06, 0.12);
  }, 11);

/** Lames d'un volet roulant de l'époque, brun. Un motif = 1 m. */
export const lamelles = (fond: string) =>
  toile(128, 128, (ctx) => {
    ctx.fillStyle = fond;
    ctx.fillRect(0, 0, 128, 128);
    for (let y = 0; y < 128; y += 8) {
      ctx.fillStyle = "rgba(0,0,0,0.30)";
      ctx.fillRect(0, y + 6, 128, 2);
      ctx.fillStyle = "rgba(255,255,255,0.10)";
      ctx.fillRect(0, y, 128, 1.5);
    }
  });

/** Porte de garage basculante, à nervures verticales. Un motif = 1 m. */
export const nervures = (fond: string) =>
  toile(128, 128, (ctx) => {
    ctx.fillStyle = fond;
    ctx.fillRect(0, 0, 128, 128);
    for (let x = 0; x < 128; x += 16) {
      ctx.fillStyle = "rgba(0,0,0,0.22)";
      ctx.fillRect(x + 12, 0, 3, 128);
      ctx.fillStyle = "rgba(255,255,255,0.12)";
      ctx.fillRect(x + 2, 0, 3, 128);
    }
  });

/** Bardage vertical en bois clair, à claire-voie : la deuxième version. Un motif = 1 m. */
export const bardage = () =>
  toile(256, 256, (ctx, r) => {
    const n = 8;
    const l = 256 / n;
    for (let i = 0; i < n; i++) {
      const v = r() * 24;
      ctx.fillStyle = `rgb(${190 + v},${150 + v * 0.8},${106 + v * 0.6})`;
      ctx.fillRect(i * l, 0, l, 256);
      for (let k = 0; k < 9; k++) {
        ctx.strokeStyle = `rgba(110,70,35,${0.05 + r() * 0.08})`;
        ctx.beginPath();
        const x = i * l + r() * l;
        ctx.moveTo(x, 0);
        ctx.bezierCurveTo(x + 2, 90, x - 2, 170, x + 1, 256);
        ctx.stroke();
      }
      ctx.fillStyle = "rgba(40,24,12,0.75)";
      ctx.fillRect((i + 1) * l - 3, 0, 3, 256);
    }
  }, 21);

/** Pelouse un peu sèche de fin d'été. Un motif = 4 m. */
export const pelouse = () =>
  toile(256, 256, (ctx, r) => {
    ctx.fillStyle = "#6f8a4f";
    ctx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 9000; i++) {
      ctx.fillStyle = r() < 0.5 ? "rgba(40,60,20,0.22)" : "rgba(200,210,140,0.16)";
      ctx.fillRect(r() * 256, r() * 256, 1, 1 + r() * 2.5);
    }
  }, 5);

/** Thuyas taillés : la haie des lotissements. Un motif = 1,5 m. */
export const haie = () =>
  toile(128, 128, (ctx, r) => {
    ctx.fillStyle = "#2f4a2c";
    ctx.fillRect(0, 0, 128, 128);
    for (let i = 0; i < 2600; i++) {
      ctx.fillStyle = r() < 0.5 ? "rgba(12,30,12,0.35)" : "rgba(120,160,90,0.22)";
      ctx.beginPath();
      ctx.arc(r() * 128, r() * 128, 0.6 + r() * 1.8, 0, Math.PI * 2);
      ctx.fill();
    }
  }, 8);

/** La coupe du socle : terre et strates, comme une maquette d'architecte. */
export const strates = () =>
  toile(256, 256, (ctx, r) => {
    ["#3b3129", "#4a3c30", "#574636", "#463a2e"].forEach((c, i) => {
      ctx.fillStyle = c;
      ctx.fillRect(0, i * 64, 256, 64);
    });
    ctx.fillStyle = "#5d7a45";
    ctx.fillRect(0, 0, 256, 10);
    grain(ctx, r, 256, 256, 2200, 0.1, 0.2, 2.4);
  }, 9);

/** Béton balayé des allées et des marches. Un motif = 2 m. */
export const beton = (fond = "#a8a49c") =>
  toile(256, 256, (ctx, r) => {
    ctx.fillStyle = fond;
    ctx.fillRect(0, 0, 256, 256);
    grain(ctx, r, 256, 256, 6000, 0.12, 0.14);
    ctx.fillStyle = "rgba(0,0,0,0.18)";
    ctx.fillRect(0, 126, 256, 2);
  }, 13);

/* ------------------------------ dedans ------------------------------ */

/** Papier peint de 1974 : grands cercles orange et bruns sur fond moutarde pâle. Un motif = 0,8 m. */
export const papierPeint = () =>
  toile(256, 256, (ctx) => {
    ctx.fillStyle = "#c9a56a";
    ctx.fillRect(0, 0, 256, 256);
    const rond = (x: number, y: number) => {
      [["#7a4524", 58], ["#b0602b", 46], ["#d9893a", 34], ["#c9a56a", 22], ["#8c5a2b", 12]].forEach(([c, ray]) => {
        ctx.fillStyle = c as string;
        ctx.beginPath();
        ctx.arc(x, y, ray as number, 0, Math.PI * 2);
        ctx.fill();
      });
    };
    rond(64, 64);
    rond(192, 192);
    rond(-64, 192);
    rond(320, 64);
    rond(192, -64);
    rond(64, 320);
  });

/** Carrelage de 1974 : carreaux de 20 cm, bruns et caramel, en damier. Un motif = 0,8 m. */
export const carrelage70 = () =>
  toile(256, 256, (ctx, r) => {
    ctx.fillStyle = "#3a2618";
    ctx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 4; i++)
      for (let j = 0; j < 4; j++) {
        const v = r() * 14;
        ctx.fillStyle = (i + j) % 2 ? `rgb(${120 + v},${70 + v},${38})` : `rgb(${158 + v},${98 + v},${48})`;
        ctx.fillRect(i * 64 + 2, j * 64 + 2, 60, 60);
        ctx.strokeStyle = "rgba(255,220,170,0.18)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(i * 64 + 32, j * 64 + 32, 16, 0, Math.PI * 2);
        ctx.stroke();
      }
    grain(ctx, r, 256, 256, 2000, 0.05, 0.08);
  }, 17);

/** Moquette orange brûlé. Un motif = 1 m. */
export const moquette = () =>
  toile(128, 128, (ctx, r) => {
    ctx.fillStyle = "#7e4a2b";
    ctx.fillRect(0, 0, 128, 128);
    grain(ctx, r, 128, 128, 5000, 0.08, 0.22, 1.2);
  }, 19);

/** Lambris de pin verni, au plafond. Un motif = 1 m. */
export const lambris = () =>
  toile(256, 256, (ctx, r) => {
    const n = 8;
    const l = 256 / n;
    for (let i = 0; i < n; i++) {
      const v = r() * 20;
      ctx.fillStyle = `rgb(${196 + v},${140 + v * 0.7},${70})`;
      ctx.fillRect(i * l, 0, l, 256);
      for (let k = 0; k < 6; k++) {
        ctx.fillStyle = `rgba(120,60,20,${0.12 + r() * 0.15})`;
        ctx.beginPath();
        ctx.ellipse(i * l + r() * l, r() * 256, 1.5 + r() * 2, 4 + r() * 8, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = "rgba(60,30,10,0.55)";
      ctx.fillRect((i + 1) * l - 2, 0, 2, 256);
    }
  }, 23);

/** Parquet de chêne clair, lames décalées. Un motif = 2 m. */
export const parquet = () =>
  toile(512, 512, (ctx, r) => {
    const n = 12;
    const l = 512 / n;
    for (let i = 0; i < n; i++) {
      let y = -r() * 300;
      while (y < 512) {
        const long = 160 + r() * 200;
        const v = r() * 22;
        ctx.fillStyle = `rgb(${206 + v},${176 + v * 0.9},${136 + v * 0.7})`;
        ctx.fillRect(i * l, y, l, long);
        for (let k = 0; k < 5; k++) {
          ctx.strokeStyle = `rgba(150,110,70,${0.06 + r() * 0.06})`;
          ctx.beginPath();
          const x = i * l + 3 + r() * (l - 6);
          ctx.moveTo(x, y);
          ctx.lineTo(x + (r() - 0.5) * 3, y + long);
          ctx.stroke();
        }
        ctx.fillStyle = "rgba(90,60,30,0.35)";
        ctx.fillRect(i * l, y + long - 1.5, l, 1.5);
        y += long;
      }
      ctx.fillStyle = "rgba(90,60,30,0.35)";
      ctx.fillRect((i + 1) * l - 1.5, 0, 1.5, 512);
    }
  }, 29);

/** Enduit blanc, à peine nuancé. Un motif = 2 m. */
export const enduit = (fond = "#f1efea") =>
  toile(128, 128, (ctx, r) => {
    ctx.fillStyle = fond;
    ctx.fillRect(0, 0, 128, 128);
    grain(ctx, r, 128, 128, 1400, 0.05, 0.035, 2);
  }, 31);

/** Parpaings bruts du sous-sol, rangs de 20 cm. Un motif = 1 m. */
export const parpaing = () =>
  toile(256, 256, (ctx, r) => {
    ctx.fillStyle = "#6f6c66";
    ctx.fillRect(0, 0, 256, 256);
    const hr = 256 / 5;
    for (let j = 0; j < 5; j++)
      for (let i = -1; i < 3; i++) {
        const x = i * 128 + (j % 2) * 64;
        const v = r() * 18;
        ctx.fillStyle = `rgb(${138 + v},${134 + v},${126 + v})`;
        ctx.fillRect(x + 2, j * hr + 2, 124, hr - 4);
      }
    grain(ctx, r, 256, 256, 7000, 0.10, 0.2, 1.6);
  }, 37);

/** Dalle de béton du garage, avec ses taches d'huile. Un motif = 3 m. */
export const betonGarage = () =>
  toile(256, 256, (ctx, r) => {
    ctx.fillStyle = "#8d8a83";
    ctx.fillRect(0, 0, 256, 256);
    grain(ctx, r, 256, 256, 8000, 0.10, 0.16);
    for (let i = 0; i < 6; i++) {
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
      g.addColorStop(0, "rgba(30,26,22,0.35)");
      g.addColorStop(1, "rgba(30,26,22,0)");
      ctx.save();
      ctx.translate(r() * 256, r() * 256);
      ctx.scale(10 + r() * 30, 8 + r() * 20);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(0, 0, 1, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }, 41);

/** Béton ciré clair, la dalle d'après. Un motif = 3 m. */
export const betonCire = () =>
  toile(256, 256, (ctx, r) => {
    ctx.fillStyle = "#d9d6cf";
    ctx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = `rgba(${r() < 0.5 ? "255,255,255" : "120,115,105"},0.05)`;
      ctx.beginPath();
      ctx.ellipse(r() * 256, r() * 256, 10 + r() * 40, 6 + r() * 20, r() * 3, 0, Math.PI * 2);
      ctx.fill();
    }
    grain(ctx, r, 256, 256, 1500, 0.06, 0.05);
  }, 43);

/** Faïence de salle de bains de 1978, vert avocat. Un motif = 0,6 m. */
export const faience = () =>
  toile(128, 128, (ctx, r) => {
    ctx.fillStyle = "#cfc6a8";
    ctx.fillRect(0, 0, 128, 128);
    for (let i = 0; i < 4; i++)
      for (let j = 0; j < 4; j++) {
        const v = r() * 10;
        ctx.fillStyle = `rgb(${112 + v},${120 + v},${62})`;
        ctx.fillRect(i * 32 + 1.5, j * 32 + 1.5, 29, 29);
      }
  }, 47);

/**
 * L'isolant en coupe, dessiné comme sur un plan d'architecte : la ligne ondulée sur
 * fond jaune pâle. Un motif = 0,2 m, en hauteur.
 */
export const isolantCoupe = () =>
  toile(64, 128, (ctx) => {
    ctx.fillStyle = "#efe0a4";
    ctx.fillRect(0, 0, 64, 128);
    ctx.strokeStyle = "#8a7a3c";
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let y = 0; y <= 128; y += 2) {
      const x = 32 + Math.sin((y / 128) * Math.PI * 4) * 22;
      if (y === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  });

/** La coupe des murs : blanche comme une maquette, avec les hachures fines des plans. */
export const pocheCoupe = () =>
  toile(64, 64, (ctx) => {
    ctx.fillStyle = "#e6e6e2";
    ctx.fillRect(0, 0, 64, 64);
    ctx.strokeStyle = "rgba(0,0,0,0.07)";
    ctx.lineWidth = 2;
    for (let i = -64; i < 128; i += 12) {
      ctx.beginPath();
      ctx.moveTo(i, 64);
      ctx.lineTo(i + 64, 0);
      ctx.stroke();
    }
  });

/** Le fond du studio : un dégradé sombre, plus clair derrière les maisons. */
export const fondStudio = (centre: string, bord: string) => {
  const t = toile(512, 512, (ctx) => {
    const g = ctx.createRadialGradient(256, 230, 10, 256, 260, 380);
    g.addColorStop(0, centre);
    g.addColorStop(1, bord);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 512, 512);
  });
  t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
  return t;
};

/** Le sol du studio : une tache de lumière douce sous le plateau. */
export const solStudio = () => {
  const t = toile(512, 512, (ctx) => {
    const g = ctx.createRadialGradient(256, 256, 20, 256, 256, 256);
    g.addColorStop(0, "#3a3f45");
    g.addColorStop(0.55, "#22262a");
    g.addColorStop(1, "#15181c");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 512, 512);
  });
  t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
  return t;
};

/** Un rai de lumière : blanc au centre, qui s'efface sur les bords et vers le bas. */
export const rai = () => {
  const t = toile(64, 256, (ctx) => {
    const g = ctx.createLinearGradient(0, 0, 64, 0);
    g.addColorStop(0, "rgba(255,255,255,0)");
    g.addColorStop(0.5, "rgba(255,255,255,1)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 256);
    const v = ctx.createLinearGradient(0, 0, 0, 256);
    v.addColorStop(0, "rgba(0,0,0,0)");
    v.addColorStop(1, "rgba(0,0,0,1)");
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = v;
    ctx.fillRect(0, 0, 64, 256);
  });
  t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
  return t;
};
