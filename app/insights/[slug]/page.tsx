import Link from "next/link";
import { notFound } from "next/navigation";
import { CollectionGrid } from "@/components/collection-grid";
import { WallpaperGrid } from "@/components/wallpaper-grid";
import {
  getCategoryBySlug,
  getCollectionBySlug,
  getIntentPageBySlug,
  getIntentPages,
  getWallpapersBySlugs
} from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return getIntentPages().map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getIntentPageBySlug(slug);

  if (!page) {
    return {};
  }

  return buildMetadata({
    title: `${page.title} | WallpaperLaunchpad`,
    description: page.description,
    pathname: `/insights/${page.slug}`
  });
}

export default async function InsightPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getIntentPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const categories = page.relatedCategories
    .map((categorySlug) => getCategoryBySlug(categorySlug))
    .filter((category): category is NonNullable<typeof category> => Boolean(category));
  const collections = page.relatedCollections
    .map((collectionSlug) => getCollectionBySlug(collectionSlug))
    .filter((collection): collection is NonNullable<typeof collection> => Boolean(collection));
  const wallpapers = getWallpapersBySlugs(page.featuredWallpapers);

  return (
    <div className="space-y-10">
      <section className="glass-panel rounded-[2rem] p-8">
        <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/80">Intent Page</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">{page.title}</h1>
        <p className="mt-4 max-w-4xl text-base leading-8 text-slate-300">{page.intro}</p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          {page.sections.map((section) => (
            <article key={section.heading} className="glass-panel rounded-[1.75rem] p-6">
              <h2 className="text-2xl font-semibold text-white">{section.heading}</h2>
              <p className="mt-4 text-sm leading-8 text-slate-300">{section.content}</p>
            </article>
          ))}
        </div>
        <aside className="glass-panel rounded-[1.75rem] p-6">
          <h2 className="text-2xl font-semibold text-white">Start browsing</h2>
          <div className="mt-5 grid gap-3">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="rounded-2xl border border-white/10 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-300/30 hover:text-white"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </aside>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">Recommended wallpapers</h2>
        <WallpaperGrid wallpapers={wallpapers} />
      </section>

      {collections.length > 0 ? (
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Matching collections</h2>
          <CollectionGrid collections={collections} />
        </section>
      ) : null}
    </div>
  );
}
