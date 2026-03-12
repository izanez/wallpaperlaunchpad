"use client";

import { clsx } from "clsx";
import { useFavorites } from "@/components/favorites-provider";

export function FavoriteButton({
  slug,
  className,
  label = "Toggle favorite"
}: {
  slug: string;
  className?: string;
  label?: string;
}) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(slug);

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleFavorite(slug);
      }}
      className={clsx(
        "inline-flex h-11 w-11 items-center justify-center rounded-full border transition",
        active
          ? "border-rose-300/40 bg-rose-400/15 text-rose-200"
          : "border-white/10 bg-black/35 text-white hover:border-white/20 hover:bg-black/50",
        className
      )}
    >
      <span className="text-lg leading-none">{active ? "♥" : "♡"}</span>
    </button>
  );
}
