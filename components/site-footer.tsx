import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/20 py-12 text-sm text-slate-400">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
        <div>
          <p className="text-lg font-semibold tracking-[0.16em] text-white">WallpaperLaunchpad</p>
          <p className="mt-4 max-w-md leading-7 text-slate-400">
            Premium-feeling AI wallpaper platform with static SEO pages, curated collections, and
            downloadable desktop and mobile artwork.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Browse</p>
          <div className="mt-4 grid gap-3">
            <Link href="/browse" className="transition hover:text-white">
              All wallpapers
            </Link>
            <Link href="/collections" className="transition hover:text-white">
              Collections
            </Link>
            <Link href="/favorites" className="transition hover:text-white">
              Favorites
            </Link>
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Popular Categories</p>
          <div className="mt-4 grid gap-3">
            <Link href="/categories/fantasy-wallpapers" className="transition hover:text-white">
              Fantasy
            </Link>
            <Link href="/categories/cyberpunk-wallpapers" className="transition hover:text-white">
              Cyberpunk
            </Link>
            <Link href="/categories/space-wallpapers" className="transition hover:text-white">
              Space
            </Link>
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Featured Packs</p>
          <div className="mt-4 grid gap-3">
            <Link href="/collections/dark-dragon-pack" className="transition hover:text-white">
              Dark Dragon Pack
            </Link>
            <Link href="/collections/neon-city-pack" className="transition hover:text-white">
              Neon City Pack
            </Link>
            <Link href="/collections/space-dreams-pack" className="transition hover:text-white">
              Space Dreams Pack
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-2 border-t border-white/10 px-6 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p>Free downloads for desktop and mobile wallpaper setups.</p>
        <p>Static JSON content, local files, and collection-ready pack structure.</p>
      </div>
    </footer>
  );
}
