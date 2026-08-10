import { beforeEach, describe, expect, it, vi } from "vitest";

// La route et le limiteur gardent leur état en mémoire (les seaux de jetons).
// Chaque test recharge donc les modules pour repartir d'un compteur neuf.
async function routeNeuve() {
  vi.resetModules();
  const route = await import("@/app/api/contact/route");
  return route.POST;
}

type Corps = string | ReadableStream<Uint8Array>;

function requete(corps: Corps, ip = "203.0.113.1", entetes: Record<string, string> = {}) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Forwarded-For": ip, ...entetes },
    body: corps,
    // Requis par Node dès que le corps est un flux.
    ...(typeof corps === "string" ? {} : { duplex: "half" }),
  } as RequestInit);
}

const messageValide = (extra: Record<string, unknown> = {}) =>
  JSON.stringify({
    name: "Client Réel",
    email: "client@exemple.fr",
    message: "Bonjour, je souhaite un devis.",
    ...extra,
  });

beforeEach(() => {
  // Aucune configuration SMTP : la route doit échouer en se fermant (503) plutôt
  // qu'essayer d'envoyer. C'est aussi ce qui garantit qu'aucun test n'envoie d'e-mail.
  delete process.env.SMTP_HOST;
  delete process.env.SMTP_USER;
  delete process.env.SMTP_PASSWORD;
  delete process.env.CONTACT_TO_EMAIL;
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

describe("validation d'entrée", () => {
  it("refuse un corps qui n'est pas du JSON", async () => {
    const POST = await routeNeuve();
    const reponse = await POST(requete("ceci n'est pas du json"));
    expect(reponse.status).toBe(400);
    expect(await reponse.json()).toEqual({ error: "Requête invalide." });
  });

  it("refuse une adresse email malformée", async () => {
    const POST = await routeNeuve();
    const reponse = await POST(requete(messageValide({ email: "pas-un-email" })));
    expect(reponse.status).toBe(400);
    expect(await reponse.json()).toEqual({ error: "Adresse email invalide." });
  });

  it("refuse un message de plus de 5 000 caractères", async () => {
    const POST = await routeNeuve();
    const reponse = await POST(requete(messageValide({ message: "x".repeat(5001) })));
    expect(reponse.status).toBe(400);
    expect(await reponse.json()).toEqual({ error: "Contenu trop long." });
  });

  it("refuse un champ vide", async () => {
    const POST = await routeNeuve();
    const reponse = await POST(requete(messageValide({ name: "   " })));
    expect(reponse.status).toBe(400);
    expect(await reponse.json()).toEqual({ error: "Merci de remplir tous les champs." });
  });

  // Non-régression : le 10/08/2026, un champ du mauvais type renvoyait au visiteur
  // « Invalid input: expected string, received number » — un message brut de Zod.
  it("ne laisse jamais fuiter un message brut de la bibliothèque de validation", async () => {
    const POST = await routeNeuve();
    for (const charge of [
      messageValide({ name: 123 }),
      messageValide({ email: null }),
      messageValide({ message: { texte: "coucou" } }),
      JSON.stringify([1, 2, 3]),
      JSON.stringify("une chaîne"),
    ]) {
      const reponse = await POST(requete(charge, `203.0.113.${Math.random()}`));
      expect(reponse.status).toBe(400);
      const { error } = (await reponse.json()) as { error: string };
      // On vise la formulation anglaise de Zod, pas le mot « invalide » qui est le nôtre.
      expect(error).not.toMatch(/Invalid input|expected \w+|received \w+/i);
      expect([
        "Requête invalide.",
        "Merci de remplir tous les champs.",
        "Contenu trop long.",
        "Adresse email invalide.",
      ]).toContain(error);
    }
  });

  it("ignore les champs inconnus au lieu de s'en servir", async () => {
    const POST = await routeNeuve();
    const reponse = await POST(requete(messageValide({ role: "admin", to: "ailleurs@exemple.fr" })));
    // 503 : la validation est passée, c'est la configuration SMTP qui manque.
    expect(reponse.status).toBe(503);
  });
});

describe("taille du corps", () => {
  it("refuse un corps annoncé au-delà de la limite", async () => {
    const POST = await routeNeuve();
    const reponse = await POST(requete(messageValide({ website: "A".repeat(200_000) })));
    expect(reponse.status).toBe(413);
    expect(await reponse.json()).toEqual({ error: "Contenu trop long." });
  });

  // Sans `Content-Length`, la seule défense est la lecture morceau par morceau.
  it("refuse un corps envoyé en flux, sans longueur annoncée", async () => {
    const POST = await routeNeuve();
    const gros = new ReadableStream<Uint8Array>({
      start(controller) {
        for (let i = 0; i < 40; i += 1) {
          controller.enqueue(new TextEncoder().encode("A".repeat(10_000)));
        }
        controller.close();
      },
    });
    const reponse = await POST(requete(gros));
    expect(reponse.status).toBe(413);
  });

  it("accepte un message de taille normale", async () => {
    const POST = await routeNeuve();
    const reponse = await POST(requete(messageValide({ message: "x".repeat(4_000) })));
    expect(reponse.status).toBe(503); // validé, puis bloqué par l'absence de SMTP
  });
});

describe("champ piège anti-robot", () => {
  it("répond « envoyé » sans rien envoyer quand le piège est rempli", async () => {
    const POST = await routeNeuve();
    const reponse = await POST(requete(messageValide({ website: "http://spam" })));
    expect(reponse.status).toBe(200);
    expect(await reponse.json()).toEqual({ ok: true });
  });
});

describe("échec fermé", () => {
  it("refuse d'envoyer quand la configuration SMTP manque", async () => {
    const POST = await routeNeuve();
    const reponse = await POST(requete(messageValide()));
    expect(reponse.status).toBe(503);
    const { error } = (await reponse.json()) as { error: string };
    expect(error).toContain("n'est pas configuré");
  });
});

describe("limitation de débit", () => {
  it("bloque la quatrième tentative venue de la même adresse", async () => {
    const POST = await routeNeuve();
    const codes: number[] = [];
    for (let i = 0; i < 4; i += 1) {
      codes.push((await POST(requete(messageValide(), "198.51.100.1"))).status);
    }
    expect(codes).toEqual([503, 503, 503, 429]);
  });

  // LE test de non-régression de l'audit du 10/08/2026.
  //
  // Le plafond global était décompté avant la lecture du corps : 42 requêtes dont le
  // contenu n'était même pas du JSON, réparties sur 14 adresses, vidaient les 40 jetons
  // et fermaient le formulaire à tout le monde pendant une heure — sans qu'un seul
  // e-mail soit envoyé. Ce test échoue si on remet le décompte trop tôt.
  it("des requêtes malformées ne ferment pas le formulaire aux visiteurs légitimes", async () => {
    const POST = await routeNeuve();

    for (let adresse = 1; adresse <= 14; adresse += 1) {
      for (let essai = 0; essai < 3; essai += 1) {
        await POST(requete("pas du json", `198.51.100.${adresse}`));
      }
    }

    const reponse = await POST(requete(messageValide(), "192.0.2.55"));
    expect(reponse.status).not.toBe(429);
    expect(reponse.status).toBe(503); // il ne reste que l'absence de SMTP pour l'arrêter
  });

  // Même chose avec le champ piège : un robot ne doit pas pouvoir fermer le formulaire.
  it("un robot piégé ne consomme pas le quota d'envoi", async () => {
    const POST = await routeNeuve();

    for (let adresse = 1; adresse <= 14; adresse += 1) {
      for (let essai = 0; essai < 3; essai += 1) {
        await POST(requete(messageValide({ website: "spam" }), `10.0.0.${adresse}`));
      }
    }

    const reponse = await POST(requete(messageValide(), "192.0.2.66"));
    expect(reponse.status).not.toBe(429);
    expect(reponse.status).toBe(503);
  });

  it("le plafond global finit par se déclencher sur de vrais envois", async () => {
    const POST = await routeNeuve();
    // 40 jetons globaux, 3 par adresse : il faut 14 adresses pour les épuiser.
    const codes: number[] = [];
    for (let adresse = 1; adresse <= 14; adresse += 1) {
      for (let essai = 0; essai < 3; essai += 1) {
        codes.push((await POST(requete(messageValide(), `172.16.0.${adresse}`))).status);
      }
    }
    expect(codes.filter((code) => code === 503)).toHaveLength(40);
    expect(codes.filter((code) => code === 429)).toHaveLength(2);
  });
});
