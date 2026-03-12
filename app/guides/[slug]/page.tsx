import Link from "next/link";
import { notFound } from "next/navigation";
import { CollectionGrid } from "@/components/collection-grid";
import { WallpaperGrid } from "@/components/wallpaper-grid";
import {
  getCategoryBySlug,
  getCollectionBySlug,
  getSeoGuideBySlug,
  getSeoGuides,
  getWallpapersBySlugs
} from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return getSeoGuides().map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getSeoGuideBySlug(slug);

  if (!guide) {
    return {};
  }

  return buildMetadata({
    title: `${guide.title} | WallpaperLaunchpad`,
    description: guide.description,
    pathname: `/guides/${guide.slug}`
  });
}

export default async function GuidePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getSeoGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const categories = guide.relatedCategories
    .map((categorySlug) => getCategoryBySlug(categorySlug))
    .filter((category) => Boolean(category));
  const collections = guide.relatedCollections
    .map((collectionSlug) => getCollectionBySlug(collectionSlug))
    .filter((collection): collection is NonNullable<typeof collection> => Boolean(collection));
  const wallpapers = getWallpapersBySlugs(guide.featuredWallpapers);

  return (
    <div className="space-y-10">
      <section className="glass-panel rounded-[2rem] p-8">
        <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/80">SEO Guide</p>
        <h1 className="mt-3 max-w-4xl text-4xl font-semibold text-white">{guide.title}</h1>
        <p className="mt-4 max-w-4xl text-base leading-8 text-slate-300">{guide.intro}</p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          {guide.sections.map((section) => (
            <article key={section.heading} className="glass-panel rounded-[1.75rem] p-6">
              <h2 className="text-2xl font-semibold text-white">{section.heading}</h2>
              <p className="mt-4 text-sm leading-8 text-slate-300">{section.content}</p>
            </article>
          ))}
        </div>
        <aside className="glass-panel rounded-[1.75rem] p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-200/80">Explore next</p>
          <div className="mt-5 grid gap-3">
            {categories.map((category) =>
              category ? (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  className="rounded-2xl border border-white/10 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-300/30 hover:text-white"
                >
                  {category.name}
                </Link>
              ) : null
            )}
            {collections.map((collection) =>
              collection ? (
                <Link
                  key={collection.slug}
                  href={`/collections/${collection.slug}`}
                  className="rounded-2xl border border-white/10 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-300/30 hover:text-white"
                >
                  {collection.title}
                </Link>
              ) : null
            )}
          </div>
        </aside>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">Featured wallpapers</h2>
        <WallpaperGrid wallpapers={wallpapers} />
      </section>

      {collections.length > 0 ? (
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Featured collections</h2>
          <CollectionGrid collections={collections} />
        </section>
      ) : null}
    </div>
  );
}
