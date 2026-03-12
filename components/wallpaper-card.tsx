import { AccessBadge } from "@/components/access-badge";
import Image from "next/image";
import Link from "next/link";
import { FavoriteButton } from "@/components/favorite-button";
import { TagChip } from "@/components/tag-chip";
import { getCollectionForWallpaper } from "@/lib/content";
import { buildWallpaperAltText } from "@/lib/seo";
import type { Wallpaper } from "@/lib/types";

export function WallpaperCard({ wallpaper }: { wallpaper: Wallpaper }) {
  const collection = getCollectionForWallpaper(wallpaper.slug);

  return (
    <article className="group glass-panel overflow-hidden rounded-3xl transition duration-300 hover:-translate-y-1">
      <div className="relative">
        <Link href={`/wallpapers/${wallpaper.slug}`} className="block">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={wallpaper.image}
              alt={buildWallpaperAltText(wallpaper)}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          </div>
        </Link>
        <FavoriteButton
          slug={wallpaper.slug}
          label={`Favorite ${wallpaper.title}`}
          className="absolute right-4 top-4 z-10"
        />
        {collection ? (
          <span className="absolute left-4 top-4 z-10 rounded-full border border-cyan-300/25 bg-cyan-300/15 px-3 py-1 text-xs uppercase tracking-[0.18em] text-cyan-100">
            Pack
          </span>
        ) : null}
        {wallpaper.accessLevel === "premium" ? (
          <AccessBadge accessLevel={wallpaper.accessLevel} className="absolute bottom-4 left-4 z-10" />
        ) : null}
      </div>
      <Link href={`/wallpapers/${wallpaper.slug}`} className="block p-5">
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-white">{wallpaper.title}</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-300">{wallpaper.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {wallpaper.tags.slice(0, 3).map((tag) => (
              <TagChip key={tag}>{tag}</TagChip>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}
