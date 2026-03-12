import { WallpaperCard } from "@/components/wallpaper-card";
import type { Wallpaper } from "@/lib/types";

export function WallpaperGrid({ wallpapers }: { wallpapers: Wallpaper[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {wallpapers.map((wallpaper) => (
        <WallpaperCard key={wallpaper.slug} wallpaper={wallpaper} />
      ))}
    </div>
  );
}
