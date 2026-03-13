import { AccessBadge } from "@/components/access-badge";
import { FavoriteButton } from "@/components/favorite-button";
import { StructuredData } from "@/components/structured-data";
import { UpgradeCTA } from "@/components/upgrade-cta";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TagChip } from "@/components/tag-chip";
import { WallpaperGrid } from "@/components/wallpaper-grid";
import {
  getCategoryBySlug,
  getRelatedCollectionsForWallpaper,
  getRelatedWallpapers,
  getWallpaperBySlug,
  getWallpapers
} from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { buildWallpaperAltText } from "@/lib/seo";
import { buildBreadcrumbSchema, buildWallpaperSchema } from "@/lib/structured-data";
import {
  getWallpaperFilename,
  getWallpaperOrientation,
  getWallpaperResolution
} from "@/lib/wallpaper";

export function generateStaticParams() {
  return getWallpapers().map((wallpaper) => ({ slug: wallpaper.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const wallpaper = getWallpaperBySlug(slug);

  if (!wallpaper) {
    return {};
  }

  return buildMetadata({
    title: `${wallpaper.title} | WallpaperLaunchpad`,
    description: wallpaper.description,
    pathname: `/wallpapers/${wallpaper.slug}`,
    image: wallpaper.image,
    imageWidth: wallpaper.width,
    imageHeight: wallpaper.height
  });
}

export default async function WallpaperPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const wallpaper = getWallpaperBySlug(slug);

  if (!wallpaper) {
    notFound();
  }

  const category = getCategoryBySlug(wallpaper.category);
  const relatedWallpapers = getRelatedWallpapers(wallpaper.slug, 6);
  const relatedCollections = getRelatedCollectionsForWallpaper(wallpaper.slug, 3);
  const orientation = getWallpaperOrientation(wallpaper);
  const resolution = getWallpaperResolution(wallpaper);
  const filename = getWallpaperFilename(wallpaper);

  return (
    <div className="space-y-10">
      <StructuredData
        data={[
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: category?.name ?? "Wallpapers", path: category ? `/categories/${category.slug}` : "/browse" },
            { name: wallpaper.title, path: `/wallpapers/${wallpaper.slug}` }
          ]),
          buildWallpaperSchema(wallpaper, category?.name)
        ]}
      />
      <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="glass-panel overflow-hidden rounded-[2rem]">
          <div className="relative aspect-[16/10] min-h-[320px]">
            <Image
              src={wallpaper.image}
              alt={buildWallpaperAltText(wallpaper, category?.name)}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
          </div>
        </div>
        <div className="glass-panel rounded-[2rem] p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/80">
                {category?.name ?? wallpaper.category}
              </p>
              <h1 className="mt-3 text-4xl font-semibold text-white">{wallpaper.title}</h1>
              <div className="mt-4 flex flex-wrap gap-2">
                <AccessBadge accessLevel={wallpaper.accessLevel} />
                {relatedCollections.length > 0
                  ? relatedCollections.map((collection) => (
                    <Link
                      key={collection.slug}
                      href={`/collections/${collection.slug}`}
                      className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-cyan-100 transition hover:border-cyan-300/40"
                    >
                      Pack
                    </Link>
                    ))
                  : null}
              </div>
            </div>
            <FavoriteButton slug={wallpaper.slug} label={`Favorite ${wallpaper.title}`} />
          </div>
          <p className="mt-4 text-base leading-8 text-slate-300">{wallpaper.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {wallpaper.tags.map((tag) => (
              <TagChip key={tag}>{tag}</TagChip>
            ))}
          </div>
          <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/80">
                  Download
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Original wallpaper file</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                <TagChip>{resolution}</TagChip>
                <TagChip>{orientation}</TagChip>
              </div>
            </div>

            <div className="mt-6 grid gap-3 rounded-3xl border border-white/10 bg-black/20 p-4 text-sm text-slate-300 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Resolution</p>
                <p className="mt-2 text-base text-white">{resolution}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Format</p>
                <p className="mt-2 text-base capitalize text-white">{orientation} wallpaper</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              {wallpaper.accessLevel === "premium" ? (
                <button
                  type="button"
                  disabled
                  className="cursor-not-allowed rounded-full border border-amber-300/20 bg-amber-300/12 px-6 py-3 text-sm font-medium text-amber-100 opacity-90"
                >
                  Premium Download Locked
                </button>
              ) : (
                <a
                  href={wallpaper.image}
                  download={filename}
                  className="rounded-full bg-white px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-cyan-100"
                >
                  Download Wallpaper
                </a>
              )}
              {category ? (
                <Link
                  href={`/categories/${category.slug}`}
                  className="rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-white transition hover:border-cyan-300/30 hover:bg-white/5"
                >
                  Back to Category
                </Link>
              ) : null}
            </div>

            <div className="mt-6 rounded-3xl border border-cyan-300/10 bg-cyan-300/5 p-5">
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-100">
                How to use
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Download the original file, then set it as your wallpaper from your device or
                operating system wallpaper settings for the sharpest result.
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Desktop wallpapers are best for monitors and laptops. Mobile wallpapers are built
                for portrait phone screens and lock screens.
              </p>
            </div>

            {wallpaper.accessLevel === "premium" ? (
              <div className="mt-6">
                <UpgradeCTA
                  compact
                  title="Premium wallpaper download placeholder"
                  description="This wallpaper is marked as premium. Later, this area can connect to access control and payment flows without changing the surrounding page structure."
                />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">You may also like</h2>
        <WallpaperGrid wallpapers={relatedWallpapers} />
      </section>

      {relatedCollections.length > 0 ? (
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Available in packs</h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {relatedCollections.map((collection) => (
              <Link
                key={collection.slug}
                href={`/collections/${collection.slug}`}
                className="glass-panel rounded-[1.75rem] p-5 transition hover:-translate-y-1"
              >
                <p className="text-sm uppercase tracking-[0.22em] text-cyan-200/80">Collection</p>
                <h3 className="mt-2 text-xl font-semibold text-white">{collection.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {collection.shortDescription}
                </p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
