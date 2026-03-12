import Image from "next/image";
import Link from "next/link";
import { buildCollectionAltText, buildWallpaperAltText } from "@/lib/seo";
import type { Collection, Wallpaper } from "@/lib/types";

export function Hero({
  spotlightWallpaper,
  featuredCollection
}: {
  spotlightWallpaper: Wallpaper;
  featuredCollection: Collection;
}) {
  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 px-6 py-16 shadow-glow sm:px-10 sm:py-24">
      <div className="grid-fade absolute inset-0" />
      <div className="absolute -right-16 top-8 h-48 w-48 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute bottom-0 left-12 h-56 w-56 rounded-full bg-pink-500/10 blur-3xl" />
      <div className="relative grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-200/80">
            Premium AI Wallpaper Platform
          </p>
          <h1 className="text-balance text-4xl font-semibold leading-tight text-white sm:text-6xl">
            Cinematic AI wallpapers curated for desktop setups and mobile screens
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Discover polished wallpaper drops, themed packs, and high-detail category libraries
            designed to feel like a premium visual platform from the first click.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/browse"
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-cyan-100"
            >
              Explore the Library
            </Link>
            <Link
              href="/collections"
              className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-6 py-3 text-sm font-medium text-cyan-100 transition hover:border-cyan-300/40 hover:bg-cyan-300/15"
            >
              View Featured Packs
            </Link>
            <Link
              href="/favorites"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition hover:border-cyan-300/40 hover:bg-white/5"
            >
              Saved Favorites
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Free downloads", value: "Original local files" },
              { label: "Formats", value: "Desktop and mobile" },
              { label: "Artwork", value: "Cinematic AI scenes" }
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
                <p className="mt-2 text-sm font-medium text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-5">
          <Link
            href={`/wallpapers/${spotlightWallpaper.slug}`}
            className="glass-panel group overflow-hidden rounded-[2rem]"
          >
            <div className="relative aspect-[16/11]">
              <Image
                src={spotlightWallpaper.image}
                alt={buildWallpaperAltText(spotlightWallpaper)}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-xs uppercase tracking-[0.22em] text-cyan-200/80">
                  Spotlight Wallpaper
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">{spotlightWallpaper.title}</h2>
              </div>
            </div>
          </Link>
          <Link
            href={`/collections/${featuredCollection.slug}`}
            className="glass-panel group grid gap-4 rounded-[2rem] p-5 sm:grid-cols-[0.95fr_1.05fr] sm:items-center"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
              <Image
                src={featuredCollection.coverImage}
                alt={buildCollectionAltText(featuredCollection)}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 18vw"
              />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-cyan-200/80">Featured Pack</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">{featuredCollection.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {featuredCollection.shortDescription}
              </p>
              <p className="mt-4 text-sm font-medium text-cyan-100">Open collection</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
