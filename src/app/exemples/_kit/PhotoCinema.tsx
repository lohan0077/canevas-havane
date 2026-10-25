import Image from "next/image";

/**
 * Une photo plein cadre qui respire : un zoom très lent, aller-retour, et une
 * parallaxe au défilement là où le navigateur la sait. Le parent fixe la taille
 * (`relative` et une hauteur) ; `origine` choisit le point vers lequel on zoome.
 * Tout texte posé dessus va dans une section à fond `var(--sombre)`, avec un voile
 * (voir BRIEF) : c'est ce fond que la mesure de contraste lit.
 */
export default function PhotoCinema({
  src,
  alt,
  sizes = "100vw",
  priority = false,
  origine = "50% 45%",
  parallaxe = false,
  className = "",
}: {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  origine?: string;
  parallaxe?: boolean;
  className?: string;
}) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div className={`absolute -inset-[8%] ${parallaxe ? "kit-parallaxe" : ""}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="kit-cinema-img object-cover"
          style={{ "--kit-origine": origine } as React.CSSProperties}
        />
      </div>
    </div>
  );
}
