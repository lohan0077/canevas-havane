import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle } from "../articles";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.image }],
      type: "article",
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const article = getArticle((await params).slug);
  if (!article) notFound();

  const others = articles.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <div className="layout-safe-zone min-h-screen" style={{ paddingBottom: "100px" }}>
      <div className="max-w-4xl mx-auto px-6">
        {/* Back link */}
        <Link
          href="/blog"
          className="group inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-[var(--color-foreground)]/30 hover:text-[var(--color-foreground)] transition-colors mb-16 md:mb-24"
        >
          <span className="w-8 h-[1px] bg-current group-hover:w-16 transition-all duration-500"></span>
          Retour au Journal
        </Link>

        {/* Header */}
        <header className="space-y-8 md:space-y-12 mb-16 md:mb-24">
          <div className="flex items-center gap-6 md:gap-8">
            <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-[var(--color-primary)] italic">
              {article.category}
            </span>
            <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-[var(--color-foreground)]/20">
              {article.date} — {article.readTime} de lecture
            </span>
          </div>
          <h1 className="text-4xl md:text-7xl font-medium uppercase tracking-tight leading-[0.9] font-serif">
            {article.title}
          </h1>
          <p className="text-xl md:text-2xl text-[var(--color-foreground)]/50 font-light leading-relaxed max-w-3xl">
            {article.excerpt}
          </p>
        </header>

        {/* Hero image */}
        <div className="relative aspect-[16/9] rounded-[2rem] md:rounded-[3rem] overflow-hidden glass-card mb-16 md:mb-24">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="space-y-16 md:space-y-24">
          {article.sections.map((section) => (
            <section key={section.heading} className="space-y-6 md:space-y-8">
              <h2 className="text-2xl md:text-4xl font-medium uppercase tracking-tight font-serif text-[var(--color-secondary)]">
                {section.heading}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-lg md:text-xl text-[var(--color-foreground)]/60 font-light leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-24 md:mt-32 glass-card rounded-[2rem] md:rounded-[3rem] p-10 md:p-20 text-center space-y-8">
          <h3 className="text-3xl md:text-5xl font-medium uppercase tracking-tight font-serif">
            Un projet en tête ?
          </h3>
          <p className="text-lg md:text-xl text-[var(--color-foreground)]/50 font-light max-w-xl mx-auto">
            Parlons de la manière dont ces principes peuvent servir votre marque.
          </p>
          <div>
            <Link href="/contact" className="btn-premium !px-12 md:!px-20 !py-5 md:!py-6 !text-[10px] md:!text-xs inline-block">
              Initier le Dialogue
            </Link>
          </div>
        </div>

        {/* Other articles */}
        <div className="mt-24 md:mt-32 space-y-12">
          <h4 className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.6em] text-[var(--color-primary)]">
            À lire ensuite
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {others.map((other) => (
              <Link
                key={other.slug}
                href={`/blog/${other.slug}`}
                className="group glass-card rounded-[2rem] p-8 md:p-12 space-y-4 hover:bg-[var(--color-foreground)]/[0.03] transition-colors duration-500"
              >
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--color-primary)] italic">
                  {other.category}
                </span>
                <h5 className="text-xl md:text-2xl font-medium uppercase tracking-tight font-serif group-hover:text-[var(--color-primary)] transition-colors">
                  {other.title}
                </h5>
                <p className="text-base text-[var(--color-foreground)]/50 font-light leading-relaxed">
                  {other.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
