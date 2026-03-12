"use client";

import { useMemo } from "react";
import { useFavorites } from "@/components/favorites-provider";
import { WallpaperGrid } from "@/components/wallpaper-grid";
import type { Wallpaper } from "@/lib/types";

export function FavoritesGrid({ wallpapers }: { wallpapers: Wallpaper[] }) {
  const { favorites } = useFavorites();

  const favoriteWallpapers = useMemo(
    () => wallpapers.filter((wallpaper) => favorites.includes(wallpaper.slug)),
    [favorites, wallpapers]
  );

  if (favoriteWallpapers.length === 0) {
    return (
      <div className="glass-panel rounded-[2rem] px-6 py-14 text-center">
        <h2 className="text-2xl font-semibold text-white">No favorites yet</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-300">
          Tap the heart icon on any wallpaper card or detail page to save it here for quick access.
        </p>
      </div>
    );
  }

  return <WallpaperGrid wallpapers={favoriteWallpapers} />;
}
