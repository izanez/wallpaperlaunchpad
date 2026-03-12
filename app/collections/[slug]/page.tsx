import { AccessBadge } from "@/components/access-badge";
import { UpgradeCTA } from "@/components/upgrade-cta";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TagChip } from "@/components/tag-chip";
import { WallpaperGrid } from "@/components/wallpaper-grid";
import {
  collectionHasPremiumContent,
  isPremiumAccess
} from "@/lib/access";
import {
  getCollectionBySlug,
  getCollections,
  getCategoryBySlug,
  getWallpapersBySlugs
} from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { buildCollectionAltText } from "@/lib/seo";

export function generateStaticParams() {
  return getCollections().map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    return {};
  }

  return buildMetadata({
    title: `${collection.title} | WallpaperLaunchpad`,
    description: collection.shortDescription,
    pathname: `/collections/${collection.slug}`,
    image: collection.coverImage,
    imageWidth: 1536,
    imageHeight: 1024
  });
}

export default async function CollectionPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  const wallpapers = getWallpapersBySlugs(collection.wallpapers);
  const premiumCollection = collectionHasPremiumContent(collection, wallpapers);
  const relatedCategories = Array.from(
    new Set(wallpapers.map((wallpaper) => wallpaper.category))
  )
    .map((categorySlug) => getCategoryBySlug(categorySlug))
    .filter((category) => Boolean(category));

  return (
    <div className="space-y-10">
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel overflow-hidden rounded-[2rem]">
          <div className="relative aspect-[16/10] min-h-[320px]">
            <Image
              src={collection.coverImage}
              alt={buildCollectionAltText(collection)}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>
        </div>
        <div className="glass-panel rounded-[2rem] p-8">
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/80">Collection Pack</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">{collection.title}</h1>
          <div className="mt-4 flex flex-wrap gap-2">
            <AccessBadge accessLevel={collection.accessLevel} />
            {premiumCollection && !isPremiumAccess(collection.accessLevel) ? (
              <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-amber-100">
                Contains premium wallpapers
              </span>
            ) : null}
          </div>
          <p className="mt-4 text-base leading-8 text-slate-300">{collection.shortDescription}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {collection.tags.map((tag) => (
              <TagChip key={tag}>{tag}</TagChip>
            ))}
          </div>

          <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/80">
                  Pack Download
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Download full collection</h2>
              </div>
              <TagChip>{wallpapers.length} wallpapers</TagChip>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              {premiumCollection ? (
                <button
                  type="button"
                  disabled
                  className="cursor-not-allowed rounded-full border border-amber-300/20 bg-amber-300/12 px-6 py-3 text-sm font-medium text-amber-100 opacity-90"
                >
                  Premium Pack Locked
                </button>
              ) : (
                <a
                  href={`/api/collections/${collection.slug}/download`}
                  className="rounded-full bg-white px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-cyan-100"
                >
                  Download Pack ZIP
                </a>
              )}
              <Link
                href="/collections"
                className="rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-white transition hover:border-cyan-300/30 hover:bg-white/5"
              >
                Back to Collections
              </Link>
            </div>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              Packs are served from local files and can later be gated as premium products without
              changing the collection structure.
            </p>

            {premiumCollection ? (
              <div className="mt-6">
                <UpgradeCTA
                  compact
                  title="Premium collection access placeholder"
                  description="This collection is prepared for future premium gating. A later payment flow can unlock the pack download and any included premium wallpapers."
                />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/80">Included</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Wallpapers in this pack</h2>
          </div>
        </div>
        <WallpaperGrid wallpapers={wallpapers} />
      </section>

      {relatedCategories.length > 0 ? (
        <section className="glass-panel rounded-[2rem] p-8">
          <h2 className="text-2xl font-semibold text-white">Explore related categories</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {relatedCategories.map((category) =>
              category ? (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-300/30 hover:text-white"
                >
                  {category.name}
                </Link>
              ) : null
            )}
          </div>
        </section>
      ) : null}
    </div>
  );
}
