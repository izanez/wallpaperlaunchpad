import Link from "next/link";
import { notFound } from "next/navigation";
import { StructuredData } from "@/components/structured-data";
import { WallpaperBrowser } from "@/components/wallpaper-browser";
import {
  getCategories,
  getCategoryBySlug,
  getCollectionsForWallpaper,
  getWallpaperFilterOptions,
  getWallpapersByCategory
} from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { buildBreadcrumbSchema, buildCategorySchema } from "@/lib/structured-data";

export function generateStaticParams() {
  return getCategories().map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {};
  }

  return buildMetadata({
    title: `${category.name} | WallpaperLaunchpad`,
    description: category.description,
    pathname: `/categories/${category.slug}`
  });
}

export default async function CategoryPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const wallpapers = getWallpapersByCategory(category.slug);
  const filterOptions = getWallpaperFilterOptions(wallpapers);
  const relatedCollections = Array.from(
    new Map(
      wallpapers
        .flatMap((wallpaper) => getCollectionsForWallpaper(wallpaper.slug))
        .map((collection) => [collection.slug, collection])
    ).values()
  );

  return (
    <div className="space-y-10">
      <StructuredData
        data={[
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Categories", path: "/browse" },
            { name: category.name, path: `/categories/${category.slug}` }
          ]),
          buildCategorySchema(category, wallpapers)
        ]}
      />
      <section className="glass-panel rounded-[2rem] p-8">
        <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/80">Collection</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">{category.name}</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">{category.intro}</p>
      </section>

      <section className="space-y-8">
        <WallpaperBrowser
          wallpapers={wallpapers}
          filterOptions={filterOptions}
          title={`${category.name} browser`}
          description="Search this collection by title, tag, mood, style, and format while keeping the category scope fixed."
          lockedCategorySlug={category.slug}
        />
      </section>

      <section className="glass-panel rounded-[2rem] p-8">
        <h2 className="text-2xl font-semibold text-white">Related categories</h2>
        <div className="mt-5 flex flex-wrap gap-3">
          {category.relatedCategories.map((relatedSlug) => {
            const related = getCategoryBySlug(relatedSlug);

            if (!related) {
              return null;
            }

            return (
              <Link
                key={related.slug}
                href={`/categories/${related.slug}`}
                className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-300/30 hover:text-white"
              >
                {related.name}
              </Link>
            );
          })}
        </div>
      </section>

      {relatedCollections.length > 0 ? (
        <section className="glass-panel rounded-[2rem] p-8">
          <h2 className="text-2xl font-semibold text-white">Related collections</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {relatedCollections.map((collection) => (
              <Link
                key={collection.slug}
                href={`/collections/${collection.slug}`}
                className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100 transition hover:border-cyan-300/35"
              >
                {collection.title}
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
