"use client";

import Link from "next/link";
import { useFavorites } from "@/components/favorites-provider";

export function FavoritesLink() {
  const { count } = useFavorites();

  return (
    <Link
      href="/favorites"
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-300/30 hover:text-white"
    >
      <span>Favorites</span>
      <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-cyan-100">{count}</span>
    </Link>
  );
}
