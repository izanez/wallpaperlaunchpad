import Link from "next/link";
import { notFound } from "next/navigation";
import { WallpaperGrid } from "@/components/wallpaper-grid";
import {
  getTagSlugs,
  getWallpapersByTag
} from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return getTagSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const wallpapers = getWallpapersByTag(slug);

  if (wallpapers.length === 0) {
    return {};
  }

  return buildMetadata({
    title: `${slug} Wallpapers | WallpaperLaunchpad`,
    description: `Browse ${slug} wallpapers for desktop and mobile with related AI artwork, collections, and category links.`,
    pathname: `/tags/${slug}`
  });
}

export default async function TagPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const wallpapers = getWallpapersByTag(slug);

  if (wallpapers.length === 0) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <section className="glass-panel rounded-[2rem] p-8">
        <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/80">Tag Page</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">{slug} wallpapers</h1>
        <p className="mt-4 max-w-4xl text-base leading-8 text-slate-300">
          Browse AI wallpapers tagged with {slug}. Use this page to jump straight into a specific
          visual theme and continue into related category pages and collections.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/browse"
            className="rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-cyan-100"
          >
            Browse all wallpapers
          </Link>
          <Link
            href="/tags"
            className="rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-white transition hover:border-cyan-300/30 hover:bg-white/5"
          >
            View all tags
          </Link>
        </div>
      </section>

      <WallpaperGrid wallpapers={wallpapers} />
    </div>
  );
}
