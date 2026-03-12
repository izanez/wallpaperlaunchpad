import { FavoritesGrid } from "@/components/favorites-grid";
import { getWallpapers } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Favorites | WallpaperLaunchpad",
  description: "Your saved AI wallpapers stored locally in the browser.",
  pathname: "/favorites"
});

export default function FavoritesPage() {
  const wallpapers = getWallpapers();

  return (
    <div className="space-y-8">
      <section className="max-w-4xl space-y-4">
        <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/80">Saved Collection</p>
        <h1 className="text-4xl font-semibold text-white">Your favorites</h1>
        <p className="text-base leading-8 text-slate-300">
          Wallpapers you heart on cards or detail pages are stored in localStorage and listed here
          for quick access.
        </p>
      </section>

      <FavoritesGrid wallpapers={wallpapers} />
    </div>
  );
}
