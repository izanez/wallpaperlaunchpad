import { WallpaperBrowser } from "@/components/wallpaper-browser";
import { getWallpapers, getWallpaperFilterOptions } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Browse Wallpapers | WallpaperLaunchpad",
  description:
    "Search and filter AI wallpapers by category, format, mood, style, tags, and sort order.",
  pathname: "/browse"
});

export default function BrowsePage() {
  const wallpapers = getWallpapers();
  const filterOptions = getWallpaperFilterOptions(wallpapers);

  return (
    <div className="space-y-8">
      <section className="max-w-4xl space-y-4">
        <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/80">Browse Library</p>
        <h1 className="text-4xl font-semibold text-white">Search across every wallpaper</h1>
        <p className="text-base leading-8 text-slate-300">
          Find wallpapers by title, tag, category, mood, style, or screen format with instant
          client-side filtering over the static JSON catalog.
        </p>
      </section>

      <WallpaperBrowser
        wallpapers={wallpapers}
        filterOptions={filterOptions}
        title="Wallpaper browser"
        description="Use the filters below to narrow the library and switch between newest, alphabetical, or random ordering."
      />
    </div>
  );
}
