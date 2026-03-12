import Link from "next/link";
import { notFound } from "next/navigation";
import { CollectionGrid } from "@/components/collection-grid";
import { TagChip } from "@/components/tag-chip";
import { WallpaperGrid } from "@/components/wallpaper-grid";
import {
  getCategoryBySlug,
  getCollectionBySlug,
  getThemeHubBySlug,
  getThemeHubs,
  getWallpapersBySlugs
} from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return getThemeHubs().map((theme) => ({ slug: theme.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const theme = getThemeHubBySlug(slug);

  if (!theme) {
    return {};
  }

  return buildMetadata({
    title: `${theme.title} | WallpaperLaunchpad`,
    description: theme.description,
    pathname: `/themes/${theme.slug}`
  });
}

export default async function ThemePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const theme = getThemeHubBySlug(slug);

  if (!theme) {
    notFound();
  }

  const wallpapers = getWallpapersBySlugs(theme.wallpapers);
  const categories = theme.categories
    .map((categorySlug) => getCategoryBySlug(categorySlug))
    .filter((category) => Boolean(category));
  const collections = theme.collections
    .map((collectionSlug) => getCollectionBySlug(collectionSlug))
    .filter((collection): collection is NonNullable<typeof collection> => Boolean(collection));

  return (
    <div className="space-y-10">
      <section className="glass-panel rounded-[2rem] p-8">
        <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/80">Theme Hub</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">{theme.title}</h1>
        <p className="mt-4 max-w-4xl text-base leading-8 text-slate-300">{theme.intro}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {theme.tags.map((tag) => (
            <TagChip key={tag}>{tag}</TagChip>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="glass-panel rounded-[1.75rem] p-6">
          <h2 className="text-2xl font-semibold text-white">Related categories</h2>
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
          </div>
        </aside>
        <div className="glass-panel rounded-[1.75rem] p-6">
          <h2 className="text-2xl font-semibold text-white">Why this theme performs well</h2>
          <p className="mt-4 text-sm leading-8 text-slate-300">
            {theme.description} Theme hubs help users jump directly into the visual styles they are
            already searching for, while still linking deeper into related categories, collections,
            and downloadable wallpapers.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">Wallpapers for this theme</h2>
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
